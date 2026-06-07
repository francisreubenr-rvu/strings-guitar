import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lessonId, chapterId, accuracy, timeSpentSeconds, completed } = await req.json()

  // Upsert progress
  const { data: existing } = await supabase
    .from('user_progress')
    .select('id, attempts, best_accuracy, time_spent_seconds')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  const updates = {
    user_id: user.id,
    lesson_id: lessonId,
    chapter_id: chapterId,
    attempts: (existing?.attempts ?? 0) + 1,
    best_accuracy: Math.max(existing?.best_accuracy ?? 0, accuracy),
    time_spent_seconds: (existing?.time_spent_seconds ?? 0) + timeSpentSeconds,
    completed: completed || (existing?.best_accuracy ?? 0) >= 80,
    completed_at: completed ? new Date().toISOString() : (existing ? undefined : null),
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert(updates, { onConflict: 'user_id,lesson_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Update leaderboard
  await updateLeaderboard(supabase, user.id, accuracy, completed)

  return NextResponse.json({ ok: true })
}

async function updateLeaderboard(supabase: any, userId: string, accuracy: number, completed: boolean) {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
  const weekStart = monday.toISOString().split('T')[0]

  const { data: existing } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('user_id', userId)
    .eq('week_start', weekStart)
    .single()

  const lessonsCompleted = (existing?.lessons_completed ?? 0) + (completed ? 1 : 0)
  const totalAccuracy = (existing?.total_accuracy ?? 0) + accuracy
  const attempts = lessonsCompleted || 1
  const avgAccuracy = totalAccuracy / attempts
  const score = Math.round(lessonsCompleted * avgAccuracy)

  await supabase.from('leaderboard').upsert({
    user_id: userId,
    week_start: weekStart,
    lessons_completed: lessonsCompleted,
    total_accuracy: totalAccuracy,
    avg_accuracy: avgAccuracy,
    score,
  }, { onConflict: 'user_id,week_start' })
}
