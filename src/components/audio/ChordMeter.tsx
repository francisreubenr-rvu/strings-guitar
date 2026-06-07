'use client'

import { useState, useEffect, useRef } from 'react'
import { ChordRecognizerEngine } from '@/lib/audio/chord-recognizer'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  targetChord: string | null
  onPass: () => void
}

export function ChordMeter({ targetChord, onPass }: Props) {
  const [detected, setDetected] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [consecutiveHits, setConsecutiveHits] = useState(0)
  const [passed, setPassed] = useState(false)
  const engineRef = useRef<ChordRecognizerEngine | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    let active = true

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (!active) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        engineRef.current = new ChordRecognizerEngine()
        await engineRef.current.start(stream, (reading) => {
          if (!active) return
          setDetected(reading.detected)
          setConfidence(reading.confidence)
        })
      } catch {}
    }

    init()
    return () => {
      active = false
      engineRef.current?.stop()
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  // Count consecutive correct chord readings
  useEffect(() => {
    if (!targetChord || !detected) { setConsecutiveHits(0); return }
    if (detected === targetChord && confidence > 0.7) {
      setConsecutiveHits(h => {
        const next = h + 1
        if (next >= 5 && !passed) {
          setPassed(true)
          onPass()
        }
        return next
      })
    } else {
      setConsecutiveHits(0)
    }
  }, [detected, targetChord, confidence, passed, onPass])

  const isCorrect = targetChord && detected === targetChord && confidence > 0.7

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className="text-xs text-muted-foreground mb-1">Chord detected</p>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-2xl font-bold transition-colors',
            isCorrect ? 'text-green-500' : detected ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {detected ?? '—'}
          </span>
          {targetChord && (
            <Badge variant={isCorrect ? 'default' : 'outline'} className="text-xs">
              {isCorrect ? `✓ ${targetChord}` : `Target: ${targetChord}`}
            </Badge>
          )}
        </div>
      </div>
      {targetChord && (
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Hold it</p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-colors',
                  i < consecutiveHits ? 'bg-green-500' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
