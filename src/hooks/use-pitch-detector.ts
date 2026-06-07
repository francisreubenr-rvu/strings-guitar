'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { PitchDetectorEngine } from '@/lib/audio/pitch-detector'
import type { PitchReading } from '@/types'

export function usePitchDetector(active: boolean, useLineIn = false) {
  const [reading, setReading] = useState<PitchReading>({
    frequency: null, note: null, octave: null, cents: 0, clarity: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const engineRef = useRef<PitchDetectorEngine | null>(null)

  const start = useCallback(async () => {
    try {
      engineRef.current = new PitchDetectorEngine()
      await engineRef.current.start(setReading, useLineIn)
      setError(null)
    } catch (e) {
      setError('Microphone access denied or unavailable.')
    }
  }, [useLineIn])

  const stop = useCallback(() => {
    engineRef.current?.stop()
    engineRef.current = null
  }, [])

  useEffect(() => {
    if (active) { start() }
    else { stop() }
    return () => { stop() }
  }, [active, start, stop])

  return { reading, error, restart: start }
}
