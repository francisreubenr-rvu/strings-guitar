import { createOpenRouterClient, TUTOR_MODEL } from '@/lib/openrouter/client'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lessonTitle, lessonType, targetChord, attempts, accuracy, struggleArea } =
    await req.json()

  const prompt = `You are a friendly, encouraging guitar teacher. A student is working on:

Lesson: "${lessonTitle}" (${lessonType})
${targetChord ? `Target chord: ${targetChord}` : ''}
Attempts: ${attempts}
Best accuracy: ${accuracy}%
${struggleArea ? `They are struggling with: ${struggleArea}` : ''}

Give one short, specific, actionable tip (2-3 sentences max). Be warm and encouraging. Focus on technique, not just repetition. Do NOT repeat the lesson title or add greetings.`

  try {
    const client = createOpenRouterClient()
    const completion = await client.chat.completions.create({
      model: TUTOR_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0.7,
    })

    return NextResponse.json({
      tip: completion.choices[0]?.message?.content?.trim() ?? '',
    })
  } catch (e) {
    console.error('OpenRouter error:', e)
    return NextResponse.json({ error: 'Tutor unavailable' }, { status: 500 })
  }
}
