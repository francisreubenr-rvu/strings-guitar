'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { SkillLevel } from '@/types'

const SKILL_QUESTIONS = [
  { q: 'Have you ever held a guitar before?', yes: 1, no: 0 },
  { q: 'Can you play at least 3 open chords cleanly?', yes: 1, no: 0 },
  { q: 'Can you play barre chords (F, Bm)?', yes: 2, no: 0 },
  { q: 'Can you solo over a 12-bar blues?', yes: 3, no: 0 },
  { q: 'Are you comfortable with modes and jazz voicings?', yes: 3, no: 0 },
]

function scoreToLevel(score: number): SkillLevel {
  if (score <= 1) return 'beginner'
  if (score <= 4) return 'intermediate'
  return 'advanced'
}

export default function OnboardingPage() {
  const [mode, setMode] = useState<'choose' | 'quiz' | 'done'>('choose')
  const [answers, setAnswers] = useState<boolean[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [directLevel, setDirectLevel] = useState<SkillLevel | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAnswer = (yes: boolean) => {
    const next = [...answers, yes]
    setAnswers(next)
    if (currentQ + 1 < SKILL_QUESTIONS.length) {
      setCurrentQ(currentQ + 1)
    } else {
      setMode('done')
    }
  }

  const finalLevel: SkillLevel = directLevel ?? scoreToLevel(
    answers.reduce((sum, a, i) => sum + (a ? SKILL_QUESTIONS[i].yes : 0), 0)
  )

  const save = async (level: SkillLevel) => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    const { error } = await supabase.from('profiles')
      .update({ skill_level: level, onboarding_complete: true })
      .eq('id', user.id)
    if (error) { toast.error('Could not save level'); setSaving(false); return }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="text-2xl font-bold mb-1">Strings</div>
          <CardTitle>What's your level?</CardTitle>
          <CardDescription>We'll put you in the right chapter immediately.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          {mode === 'choose' && (
            <>
              <p className="text-sm text-muted-foreground text-center">Choose directly or answer 5 quick questions.</p>
              <div className="grid gap-3">
                {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => { setDirectLevel(lvl); setMode('done') }}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors text-left"
                  >
                    <div>
                      <div className="font-medium capitalize">{lvl}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {lvl === 'beginner' && 'Never played, or know very little'}
                        {lvl === 'intermediate' && 'Know open chords, want barre chords & theory'}
                        {lvl === 'advanced' && 'Comfortable soloing, want jazz, modes, composition'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center"><span className="bg-card px-2 text-xs text-muted-foreground">or</span></div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => setMode('quiz')}>
                Help me figure it out (5 questions)
              </Button>
            </>
          )}

          {mode === 'quiz' && (
            <div className="space-y-6">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Question {currentQ + 1} of {SKILL_QUESTIONS.length}</span>
                <span>{Math.round((currentQ / SKILL_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${(currentQ / SKILL_QUESTIONS.length) * 100}%` }} />
              </div>
              <p className="text-lg font-medium text-center">{SKILL_QUESTIONS[currentQ].q}</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleAnswer(false)}>No</Button>
                <Button onClick={() => handleAnswer(true)}>Yes</Button>
              </div>
            </div>
          )}

          {mode === 'done' && (
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground text-sm">We recommend starting at:</p>
              <div className="text-4xl font-bold capitalize">{finalLevel}</div>
              <Badge variant="secondary" className="text-sm">
                {finalLevel === 'beginner' && '8 chapters · Starts from scratch'}
                {finalLevel === 'intermediate' && '10 chapters · Barre chords through blues'}
                {finalLevel === 'advanced' && '9 chapters · Modes, jazz, composition'}
              </Badge>
              <Button className="w-full" onClick={() => save(finalLevel)} disabled={saving}>
                {saving ? 'Saving...' : `Start as ${finalLevel}`}
              </Button>
              <button
                onClick={() => { setMode('choose'); setAnswers([]); setCurrentQ(0); setDirectLevel(null) }}
                className="text-xs text-muted-foreground underline underline-offset-4"
              >
                Choose a different level
              </button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
