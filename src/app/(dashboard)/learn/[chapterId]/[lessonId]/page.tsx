import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { LessonPlayer } from '@/components/lessons/LessonPlayer'

interface Props {
  params: Promise<{ chapterId: string; lessonId: string }>
}

export default async function LessonPage({ params }: Props) {
  const { chapterId, lessonId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch current lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .eq('chapter_id', chapterId)
    .single()

  if (!lesson) notFound()

  // Fetch all lessons in this chapter to determine prev/next
  const { data: siblings } = await supabase
    .from('lessons')
    .select('id, order_index')
    .eq('chapter_id', chapterId)
    .order('order_index')

  const idx = siblings?.findIndex(l => l.id === lessonId) ?? -1
  const prevLesson = idx > 0 ? siblings![idx - 1] : null
  const nextLesson = siblings && idx < siblings.length - 1 ? siblings[idx + 1] : null

  // If no next lesson in chapter, find next chapter
  let nextLessonHref: string | null = null
  if (nextLesson) {
    nextLessonHref = `/learn/${chapterId}/${nextLesson.id}`
  } else {
    const { data: chapter } = await supabase
      .from('chapters')
      .select('level_id, order_index')
      .eq('id', chapterId)
      .single()

    if (chapter) {
      const { data: nextChapter } = await supabase
        .from('chapters')
        .select('id, lessons(id, order_index)')
        .eq('level_id', chapter.level_id)
        .eq('order_index', chapter.order_index + 1)
        .single()

      if (nextChapter) {
        const firstLesson = (nextChapter.lessons as any[])
          ?.sort((a: any, b: any) => a.order_index - b.order_index)[0]
        if (firstLesson) nextLessonHref = `/learn/${nextChapter.id}/${firstLesson.id}`
      }
    }
  }

  const prevLessonHref = prevLesson ? `/learn/${chapterId}/${prevLesson.id}` : null

  return (
    <div className="h-full">
      <LessonPlayer
        lesson={lesson}
        chapterId={chapterId}
        nextLessonHref={nextLessonHref}
        prevLessonHref={prevLessonHref}
      />
    </div>
  )
}
