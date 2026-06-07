import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: levels }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('curriculum_levels').select('*, chapters(*, lessons(*))').order('order_index'),
  ])

  const skillLevel = profile?.skill_level ?? 'beginner'
  const currentLevel = levels?.find(l => l.slug === skillLevel)
  const chapters = currentLevel?.chapters ?? []

  // Fetch progress for this user
  const lessonIds = chapters.flatMap((c: any) => c.lessons?.map((l: any) => l.id) ?? [])
  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, best_accuracy')
    .eq('user_id', user.id)
    .in('lesson_id', lessonIds)

  const completedIds = new Set(progress?.filter(p => p.completed).map(p => p.lesson_id) ?? [])
  const totalLessons = lessonIds.length
  const completedCount = completedIds.size
  const overallPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  // Find next incomplete lesson
  let nextLessonHref = ''
  outer: for (const chapter of (chapters as any[])) {
    for (const lesson of (chapter.lessons ?? [])) {
      if (!completedIds.has(lesson.id)) {
        nextLessonHref = `/learn/${chapter.id}/${lesson.id}`
        break outer
      }
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {completedCount === 0
              ? "Let's start your guitar journey."
              : `${completedCount} lesson${completedCount !== 1 ? 's' : ''} completed — keep going.`}
          </p>
        </div>
        <Badge variant="outline" className="capitalize text-sm">{skillLevel}</Badge>
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{currentLevel?.name} Curriculum</CardTitle>
            <span className="text-sm text-muted-foreground">{completedCount} / {totalLessons} lessons</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={overallPct} className="h-2" />
          {nextLessonHref && (
            <Link href={nextLessonHref}>
              <Button className="mt-2">Continue Learning →</Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Chapters grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Your Chapters</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(chapters as any[]).sort((a: any, b: any) => a.order_index - b.order_index).map((chapter: any) => {
            const chapterLessons: any[] = chapter.lessons ?? []
            const done = chapterLessons.filter((l: any) => completedIds.has(l.id)).length
            const pct = chapterLessons.length > 0 ? Math.round((done / chapterLessons.length) * 100) : 0
            const firstLesson = chapterLessons.sort((a: any, b: any) => a.order_index - b.order_index)[0]

            return (
              <Link
                key={chapter.id}
                href={firstLesson ? `/learn/${chapter.id}/${firstLesson.id}` : '#'}
              >
                <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="pt-4 pb-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm leading-tight">{chapter.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{chapter.description}</p>
                      </div>
                      {chapter.is_premium && !profile?.is_premium && (
                        <Badge variant="secondary" className="text-xs shrink-0">Pro</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground shrink-0">{done}/{chapterLessons.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
