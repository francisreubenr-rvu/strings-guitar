'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { HandTrackerEngine, type FretboardPosition, type FretboardBounds } from '@/lib/mediapipe/hand-tracker'
import type { DetectedHand } from '@/types'

export function useHandTracker(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  active: boolean,
  bounds?: FretboardBounds
) {
  const [hands, setHands] = useState<DetectedHand[]>([])
  const [positions, setPositions] = useState<FretboardPosition[]>([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const engineRef = useRef<HandTrackerEngine | null>(null)

  const start = useCallback(async () => {
    if (!videoRef.current) return
    try {
      engineRef.current = new HandTrackerEngine({
        onHands: setHands,
        onFretboardPositions: setPositions,
      })
      if (bounds) engineRef.current.setFretboardBounds(bounds)
      await engineRef.current.init(videoRef.current)
      setReady(true)
      setError(null)
    } catch (e) {
      setError('Camera access denied or MediaPipe failed to load.')
    }
  }, [videoRef, bounds])

  const stop = useCallback(() => {
    engineRef.current?.stop()
    engineRef.current = null
    setReady(false)
  }, [])

  useEffect(() => {
    if (active) { start() }
    else { stop() }
    return () => { stop() }
  }, [active, start, stop])

  return { hands, positions, ready, error }
}
