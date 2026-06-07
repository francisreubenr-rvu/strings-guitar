'use client'

import { STANDARD_TUNING } from '@/types'
import type { PitchReading } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  reading: PitchReading
}

export function Tuner({ reading }: Props) {
  const { note, octave, cents, frequency, clarity } = reading

  const noteLabel = note && octave !== null ? `${note}${octave}` : '--'
  const inTune = Math.abs(cents) <= 5
  const flat = cents < -5
  const sharp = cents > 5

  // Match to standard string
  const matchedString = frequency
    ? STANDARD_TUNING.reduce((best, s) =>
        Math.abs(s.frequency - frequency!) < Math.abs(best.frequency - frequency!) ? s : best
      )
    : null

  return (
    <div className="flex flex-col items-center gap-6 py-8 w-full max-w-sm mx-auto">
      <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Chromatic Tuner</p>

      {/* Note display */}
      <div className={cn(
        'text-8xl font-bold tabular-nums transition-colors',
        inTune && clarity > 0.8 ? 'text-green-500' : 'text-foreground'
      )}>
        {noteLabel}
      </div>

      {/* Cents meter */}
      <div className="w-full space-y-2">
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          {/* Center marker */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-foreground/30 -translate-x-1/2" />
          {/* Cents indicator */}
          <div
            className={cn(
              'absolute top-1 h-1 w-4 rounded-full transition-all',
              inTune ? 'bg-green-500' : flat ? 'bg-blue-400' : 'bg-red-400'
            )}
            style={{ left: `calc(50% + ${(cents / 50) * 45}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-50¢ flat</span>
          <span className={cn('font-medium', inTune && clarity > 0.8 ? 'text-green-500' : '')}>
            {clarity > 0.5 ? `${cents > 0 ? '+' : ''}${cents}¢` : 'Pluck a string'}
          </span>
          <span>+50¢ sharp</span>
        </div>
      </div>

      {/* Matched string */}
      {matchedString && clarity > 0.8 && (
        <p className="text-sm text-muted-foreground">
          Closest string: <strong>{matchedString.name}</strong>
          {' '}({matchedString.frequency.toFixed(0)} Hz)
        </p>
      )}

      {/* String reference */}
      <div className="grid grid-cols-6 gap-2 w-full">
        {STANDARD_TUNING.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={cn(
              'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors',
              matchedString?.name === s.name && clarity > 0.8 && inTune
                ? 'border-green-500 bg-green-500/10 text-green-500'
                : matchedString?.name === s.name && clarity > 0.8
                ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                : 'border-muted text-muted-foreground'
            )}>
              {s.name.replace(/\d/, '')}
            </div>
            <span className="text-[10px] text-muted-foreground">{s.name.match(/\d/)?.[0]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
