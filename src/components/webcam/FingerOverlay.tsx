'use client'

import { useEffect, useRef } from 'react'
import type { FretboardPosition } from '@/lib/mediapipe/hand-tracker'
import type { FingerPosition } from '@/types'

interface Props {
  positions: FretboardPosition[]
  targetPositions: FingerPosition[] | null
  width: number
  height: number
}

const FINGER_COLORS = {
  correct: '#22c55e',
  incorrect: '#ef4444',
  target: '#3b82f6',
}

const FINGER_LABELS = ['T', 'I', 'M', 'R', 'P'] // thumb, index, middle, ring, pinky

export function FingerOverlay({ positions, targetPositions, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)

    // Draw fretboard grid overlay (subtle)
    const STRINGS = 6
    const FRETS = 5
    const boardLeft = width * 0.1
    const boardRight = width * 0.7
    const boardTop = height * 0.3
    const boardBottom = height * 0.7

    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1

    for (let s = 0; s <= STRINGS - 1; s++) {
      const y = boardTop + (s / (STRINGS - 1)) * (boardBottom - boardTop)
      ctx.beginPath()
      ctx.moveTo(boardLeft, y)
      ctx.lineTo(boardRight, y)
      ctx.stroke()
    }

    for (let f = 0; f <= FRETS; f++) {
      const x = boardLeft + (f / FRETS) * (boardRight - boardLeft)
      ctx.beginPath()
      ctx.moveTo(x, boardTop)
      ctx.lineTo(x, boardBottom)
      ctx.stroke()
    }

    // Draw target positions (blue hollow circles)
    if (targetPositions) {
      targetPositions.forEach(tp => {
        if (tp.muted) return
        const x = boardLeft + ((tp.fret - 0.5) / FRETS) * (boardRight - boardLeft)
        const y = boardTop + ((tp.string - 1) / (STRINGS - 1)) * (boardBottom - boardTop)

        ctx.beginPath()
        ctx.arc(x, y, 18, 0, Math.PI * 2)
        ctx.strokeStyle = FINGER_COLORS.target
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.fillStyle = 'rgba(59,130,246,0.2)'
        ctx.fill()

        ctx.fillStyle = FINGER_COLORS.target
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(tp.finger), x, y)
      })
    }

    // Draw detected finger positions
    positions.forEach(fp => {
      const x = boardLeft + ((fp.fret - 0.5) / FRETS) * (boardRight - boardLeft)
      const y = boardTop + ((fp.string - 1) / (STRINGS - 1)) * (boardBottom - boardTop)

      // Check if this matches a target position
      const isCorrect = targetPositions?.some(
        tp => Math.abs(tp.string - fp.string) <= 1 && Math.abs(tp.fret - fp.fret) <= 1
      ) ?? true

      ctx.beginPath()
      ctx.arc(x, y, 14, 0, Math.PI * 2)
      ctx.fillStyle = isCorrect ? FINGER_COLORS.correct : FINGER_COLORS.incorrect
      ctx.globalAlpha = 0.85
      ctx.fill()
      ctx.globalAlpha = 1

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 11px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(FINGER_LABELS[fp.fingerIndex], x, y)
    })
  }, [positions, targetPositions, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
