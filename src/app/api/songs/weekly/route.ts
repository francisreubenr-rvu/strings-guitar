import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Get Monday of current week
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
  const weekStart = monday.toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('weekly_songs')
    .select('*, song:songs(*)')
    .eq('week_start', weekStart)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ weekly: data ?? [], weekStart })
}
