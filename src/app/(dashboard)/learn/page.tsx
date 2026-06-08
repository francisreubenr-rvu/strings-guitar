import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { STATIC_LEVELS } from '@/lib/curriculum'
import type { LevelWithChapters, ChapterWithLessons, LessonSummary, ProgressRow } from '@/types'

const LEVEL_COLORS: Record<string, { dot: string; label: string }> = {
  beginner:     { dot: 'var(--green)', label: 'var(--green)' },
  intermediate: { dot: 'var(--accent)', label: 'var(--accent)' },
  advanced:     { dot: '#ff7ac3', label: '#c9a7ff' },
}

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: serverLevels } = await supabase
    .from('curriculum_levels')
    .select('*, chapters(*, lessons(*))')
    .order('order_index')

  const levels: LevelWithChapters[] = (serverLevels && serverLevels.length > 0)
    ? (serverLevels as unknown as LevelWithChapters[])
    : (STATIC_LEVELS as unknown as LevelWithChapters[])

  const allLessonIds = levels.flatMap((l) =>
    (l.chapters ?? []).flatMap((c) =>
      (c.lessons ?? []).map((ls) => ls.id)
    )
  )

  const progressMap = new Map<string, { completed: boolean; best_accuracy: number }>()
  if (allLessonIds.length > 0) {
    const batchSize = 500
    for (let i = 0; i < allLessonIds.length; i += batchSize) {
      const batch = allLessonIds.slice(i, i + batchSize)
      const { data } = await supabase
        .from('user_progress')
        .select('lesson_id, completed, best_accuracy')
        .eq('user_id', user.id)
        .in('lesson_id', batch)
      for (const p of ((data ?? []) as ProgressRow[])) {
        progressMap.set(p.lesson_id, { completed: p.completed, best_accuracy: p.best_accuracy })
      }
    }
  }

  if (levels.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-muted-foreground mt-2">Curriculum coming soon.</p>
      </div>
    )
  }

  const defaultLevel = levels[0]?.slug ?? 'beginner'

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Step-by-step curriculum — 27 chapters, 135 lessons. Every lesson builds on the last.
        </p>
      </div>

      <Tabs defaultValue={defaultLevel}>
        <TabsList>
          {levels.map((level) => (
            <TabsTrigger key={level.id} value={level.slug} className="capitalize">
              {level.slug}
            </TabsTrigger>
          ))}
        </TabsList>

        {levels.map((level) => {
          const chapters = (level.chapters ?? []).sort(
            (a, b) => a.order_index - b.order_index
          )
          const colors = LEVEL_COLORS[level.slug] ?? LEVEL_COLORS.beginner

          return (
            <TabsContent key={level.id} value={level.slug} className="space-y-4 mt-4">
              {level.description && (
                <p className="text-sm text-muted-foreground">{level.description}</p>
              )}

              {chapters.map((chapter: ChapterWithLessons) => {
                const lessons = (chapter.lessons ?? []).sort(
                  (a, b) => a.order_index - b.order_index
                )
                const done = lessons.filter((l) => progressMap.get(l.id)?.completed).length
                const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0

                return (
                  <details
                    key={chapter.id}
                    className="group rounded-[14px] border overflow-hidden"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <summary className="list-none p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.02)]">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-sm shrink-0"
                            style={{ background: colors.dot }}
                          />
                          <h3 className="font-semibold text-[17px]">{chapter.title}</h3>
                          {chapter.is_premium && (
                            <Badge variant="secondary" className="text-[10px] py-0 h-5 shrink-0">
                              Pro
                            </Badge>
                          )}
                        </div>
                        {chapter.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {chapter.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2.5">
                          <div className="flex-1 max-w-[200px]">
                            <Progress value={pct} className="h-1.5" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {done}/{lessons.length} done
                          </span>
                        </div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>

                    <div
                      className="px-5 pb-5 border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div
                        className="divide-y"
                        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                      >
                        {lessons.map((lesson: LessonSummary, i: number) => {
                          const prog = progressMap.get(lesson.id)
                          const completed = prog?.completed
                          const bestAcc = prog?.best_accuracy

                          return (
                            <Link
                              key={lesson.id}
                              href={`/learn/${chapter.id}/${lesson.id}`}
                              className="flex items-center gap-3.5 py-3 group/row"
                            >
                              <span
                                className="w-[28px] h-[28px] rounded-full grid place-items-center shrink-0 text-xs font-semibold transition-all border text-muted-foreground group-hover/row:border-accent group-hover/row:text-foreground"
                                style={{
                                  background: completed ? 'var(--green)' : 'transparent',
                                  borderColor: completed ? 'transparent' : 'var(--border)',
                                  color: completed ? '#000' : undefined,
                                }}
                              >
                                {completed ? '✓' : i + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-sm font-medium"
                                  style={{
                                    color: completed ? 'var(--text-muted)' : 'var(--text)',
                                    textDecoration: completed ? 'line-through' : 'none',
                                  }}
                                >
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] py-0 h-5 capitalize"
                                  >
                                    {lesson.type}
                                  </Badge>
                                  {lesson.is_premium && (
                                    <Badge
                                      variant="secondary"
                                      className="text-[10px] py-0 h-5"
                                    >
                                      Pro
                                    </Badge>
                                  )}
                                  {completed && bestAcc != null && (
                                    <span className="text-[10px] text-muted-foreground">
                                      {bestAcc}% best
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span
                                className="text-xs font-medium shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity whitespace-nowrap"
                                style={{ color: 'var(--accent)' }}
                              >
                                {completed ? 'Review →' : 'Start →'}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </details>
                )
              })}

              {chapters.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No chapters yet for {level.slug}.
                </p>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
