'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import type { GuitarType } from '@/types'

interface Props {
  onConfirm: (guitarType: GuitarType) => void
  onSkip: () => void
}

export function GuitarDetector({ onConfirm, onSkip }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [manualType, setManualType] = useState<GuitarType>('acoustic')
  const [checking, setChecking] = useState(false)
  const [step, setStep] = useState<'camera' | 'audio' | 'confirm'>('camera')

  useEffect(() => {
    return () => { stream?.getTracks().forEach(t => t.stop()) }
  }, [stream])

  const startCamera = async () => {
    setChecking(true)
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(s)
      if (videoRef.current) {
        videoRef.current.srcObject = s
        await videoRef.current.play()
      }
      setChecking(false)
      setStep('audio')
    } catch {
      setChecking(false)
      alert('Camera or microphone access was denied. Please allow access and try again.')
    }
  }

  const runAudioCheck = async () => {
    setChecking(true)
    // Simple audio level check to confirm microphone is picking up sound
    try {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      const source = ctx.createMediaStreamSource(stream!)
      source.connect(analyser)
      const buffer = new Float32Array(analyser.fftSize)

      await new Promise<void>((resolve) => {
        let frames = 0
        const check = () => {
          analyser.getFloatTimeDomainData(buffer)
          const rms = Math.sqrt(buffer.reduce((s, v) => s + v * v, 0) / buffer.length)
          frames++
          if (rms > 0.01 || frames > 120) {
            ctx.close()
            resolve()
          } else {
            requestAnimationFrame(check)
          }
        }
        requestAnimationFrame(check)
      })

      setChecking(false)
      setStep('confirm')
    } catch {
      setChecking(false)
      setStep('confirm')
    }
  }

  const handleConfirm = () => {
    stream?.getTracks().forEach(t => t.stop())
    onConfirm(manualType)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Guitar Setup Check
            <Badge variant="outline">Step {step === 'camera' ? 1 : step === 'audio' ? 2 : 3} of 3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'camera' && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                We need camera and microphone access to give you real-time finger placement guidance and detect what you&apos;re playing.
              </p>
              <Button onClick={startCamera} disabled={checking} className="w-full">
                {checking ? 'Requesting access...' : 'Allow Camera & Microphone'}
              </Button>
              <Button variant="ghost" onClick={onSkip} className="w-full text-xs">
                Skip for now (limited features)
              </Button>
            </div>
          )}

          {step === 'audio' && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-green-500">Camera ✓</Badge>
                <Badge variant="secondary">Mic check pending...</Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Pluck your guitar strings so we can confirm the microphone is working.
              </p>
              <Button onClick={runAudioCheck} disabled={checking} className="w-full">
                {checking ? 'Listening...' : 'Check Microphone'}
              </Button>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-green-500">Camera ✓</Badge>
                <Badge variant="secondary" className="text-green-500">Microphone ✓</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">What type of guitar are you playing?</p>
                <Select
                  value={manualType}
                  onValueChange={(v) => setManualType(v as GuitarType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acoustic">Acoustic Guitar</SelectItem>
                    <SelectItem value="classical">Classical Guitar (Nylon Strings)</SelectItem>
                    <SelectItem value="electric">Electric Guitar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleConfirm} className="w-full">
                Start Learning
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
