'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { GuitarDetector } from '@/components/webcam/GuitarDetector'
import { FingerOverlay } from '@/components/webcam/FingerOverlay'
import { Tuner } from '@/components/audio/Tuner'
import { ChordMeter } from '@/components/audio/ChordMeter'
import { useHandTracker } from '@/hooks/use-hand-tracker'
import { usePitchDetector } from '@/hooks/use-pitch-detector'
import { toast } from 'sonner'
import type { Lesson, GuitarType, LessonContent } from '@/types'

interface Props {
  lesson: Lesson
  chapterId: string
  nextLessonHref: string | null
  prevLessonHref: string | null
}

type Phase = 'setup' | 'learning' | 'practice' | 'complete'

export function LessonPlayer({ lesson, chapterId, nextLessonHref, prevLessonHref }: Props) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [phase, setPhase] = useState<Phase>('setup')
  const [guitarType, setGuitarType] = useState<GuitarType | null>(null)
  const [accuracy, setAccuracy] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [bestAccuracy, setBestAccuracy] = useState(0)
  const [aiTip, setAiTip] = useState<string | null>(null)
  const [loadingTip, setLoadingTip] = useState(false)
  const [timeStart] = useState(Date.now())
  const [containerSize, setContainerSize] = useState({ w: 640, h: 360 })

  const isPracticeLesson = lesson.type === 'chord' || lesson.type === 'exercise' || lesson.type === 'scale'
  const isTuningLesson = lesson.type === 'tuning'

  const { hands, positions, ready: cameraReady } = useHandTracker(
    videoRef,
    phase === 'practice' && !!guitarType && !isTuningLesson,
    undefined
  )

  const { reading: pitchReading } = usePitchDetector(
    phase === 'practice' && (isTuningLesson || lesson.type === 'chord')
  )

  // Resize observer for the video container
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        setContainerSize({ w: e.contentRect.width, h: e.contentRect.height })
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Compute accuracy from finger positions vs target
  useEffect(() => {
    if (phase !== 'practice' || !lesson.target_finger_positions || positions.length === 0) return

    const targets = lesson.target_finger_positions
    let matched = 0
    targets.forEach(tp => {
      if (tp.muted) return
      const found = positions.find(p =>
        Math.abs(p.string - tp.string) <= 1 && Math.abs(p.fret - tp.fret) <= 1
      )
      if (found) matched++
    })
    const nonMuted = targets.filter(t => !t.muted).length
    const score = nonMuted > 0 ? Math.round((matched / nonMuted) * 100) : 0
    setAccuracy(score)
    if (score > bestAccuracy) setBestAccuracy(score)
  }, [positions, lesson.target_finger_positions, phase, bestAccuracy])

  const handleGuitarConfirm = (type: GuitarType) => {
    setGuitarType(type)
    setPhase('learning')
  }

  const handleGuitarSkip = () => {
    setGuitarType('acoustic')
    setPhase('learning')
  }

  const startPractice = () => {
    setAttempts(a => a + 1)
    setPhase('practice')
  }

  const handlePass = useCallback(async () => {
    const timeSpent = Math.round((Date.now() - timeStart) / 1000)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: lesson.id,
        chapterId,
        accuracy: bestAccuracy,
        timeSpentSeconds: timeSpent,
        completed: true,
      }),
    })
    setPhase('complete')
    toast.success('Lesson complete! Great work.')
  }, [lesson.id, chapterId, bestAccuracy, timeStart])

  const getAiTip = async () => {
    setLoadingTip(true)
    const res = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonTitle: lesson.title,
        lessonType: lesson.type,
        targetChord: lesson.target_chord,
        attempts,
        accuracy: bestAccuracy,
        struggleArea: bestAccuracy < 50 ? 'finger placement' : 'consistency',
      }),
    })
    const data = await res.json()
    setAiTip(data.tip ?? null)
    setLoadingTip(false)
  }

  const content: LessonContent = lesson.content as LessonContent

  return (
    <div className="flex flex-col h-full">
      {/* Guitar detector overlay */}
      {phase === 'setup' && (
        <GuitarDetector onConfirm={handleGuitarConfirm} onSkip={handleGuitarSkip} />
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="capitalize text-xs">{lesson.type}</Badge>
            {lesson.target_chord && <Badge variant="secondary">{lesson.target_chord}</Badge>}
          </div>
          <h1 className="text-xl font-bold mt-1 truncate">{lesson.title}</h1>
        </div>
        <div className="flex gap-2 shrink-0">
          {prevLessonHref && (
            <Button variant="outline" size="sm" onClick={() => router.push(prevLessonHref)}>← Prev</Button>
          )}
          {nextLessonHref && (
            <Button variant="outline" size="sm" onClick={() => router.push(nextLessonHref)}>Next →</Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: webcam + overlay */}
        {(phase === 'practice' || phase === 'complete') && !isTuningLesson && (
          <div className="w-1/2 border-r flex flex-col">
            <div ref={containerRef} className="relative flex-1 bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
              <FingerOverlay
                positions={positions}
                targetPositions={lesson.target_finger_positions}
                width={containerSize.w}
                height={containerSize.h}
              />
              {/* Accuracy meter */}
              {lesson.target_finger_positions && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/60 rounded-lg px-3 py-2 space-y-1">
                    <div className="flex justify-between text-xs text-white">
                      <span>Accuracy</span>
                      <span>{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} className="h-1.5" />
                  </div>
                </div>
              )}
            </div>
            {/* Audio meters */}
            {(lesson.type === 'chord' || lesson.type === 'song') && (
              <div className="p-3 border-t">
                <ChordMeter targetChord={lesson.target_chord} onPass={handlePass} />
              </div>
            )}
          </div>
        )}

        {/* Tuner lesson full panel */}
        {phase === 'practice' && isTuningLesson && (
          <div className="w-1/2 border-r flex items-center justify-center p-6">
            <Tuner reading={pitchReading} />
          </div>
        )}

        {/* Right panel: lesson content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Learning phase */}
          {(phase === 'learning' || phase === 'setup') && (
            <>
              {content.intro && (
                <p className="text-muted-foreground leading-relaxed">{content.intro}</p>
              )}

              {content.steps && (
                <div className="space-y-4">
                  {content.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.title}</p>
                        <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {content.tips && content.tips.length > 0 && (
                <Card className="bg-muted/50">
                  <CardContent className="pt-4 pb-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tips</p>
                    {content.tips.map((tip, i) => (
                      <p key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span>→</span><span>{tip}</span>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Separator />

              {isPracticeLesson ? (
                <Button onClick={startPractice} className="w-full" size="lg">
                  Start Practice — Enable Camera & Mic
                </Button>
              ) : (
                <Button onClick={handlePass} className="w-full" size="lg">
                  Mark as Read & Continue →
                </Button>
              )}
            </>
          )}

          {/* Practice phase */}
          {phase === 'practice' && (
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold">Practice Mode</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {lesson.target_chord
                    ? `Form the ${lesson.target_chord} chord. The overlay shows target positions in blue, your fingers in green/red.`
                    : 'Follow the steps on the left. The camera tracks your hand in real time.'}
                </p>
              </div>

              {/* Best accuracy */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Best this session</p>
                  <Progress value={bestAccuracy} className="h-2" />
                </div>
                <span className="text-lg font-bold">{bestAccuracy}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target: {lesson.accuracy_threshold}% to pass
              </p>

              {/* AI tip */}
              {aiTip && (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="pt-3 pb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">AI Coach tip</p>
                    <p className="text-sm leading-relaxed">{aiTip}</p>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 flex-wrap">
                {bestAccuracy >= (lesson.accuracy_threshold ?? 80) ? (
                  <Button onClick={handlePass} className="flex-1">
                    Pass — Continue →
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1" onClick={handlePass}>
                    Skip & continue anyway
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={getAiTip}
                  disabled={loadingTip}
                  className="shrink-0"
                >
                  {loadingTip ? '...' : '💡 Get tip'}
                </Button>
              </div>
            </div>
          )}

          {/* Complete phase */}
          {phase === 'complete' && (
            <div className="text-center space-y-4 py-8">
              <div className="text-5xl">🎸</div>
              <h2 className="text-2xl font-bold">Lesson complete!</h2>
              <p className="text-muted-foreground">Best accuracy: <strong>{bestAccuracy}%</strong></p>
              {nextLessonHref ? (
                <Button size="lg" onClick={() => router.push(nextLessonHref)}>
                  Next Lesson →
                </Button>
              ) : (
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Back to Dashboard
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
