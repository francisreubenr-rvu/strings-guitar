import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { LeaderboardRow } from '@/types'

function getMondayOf(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d.toISOString().split('T')[0]
}

export default async function LeaderboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const weekStart = getMondayOf(new Date())

  const [{ data: weekly }, { data: allTime }] = await Promise.all([
    supabase
      .from('leaderboard')
      .select('*, profile:profiles(username, display_name, avatar_url)')
      .eq('week_start', weekStart)
      .order('score', { ascending: false })
      .limit(50),
    supabase
      .from('leaderboard')
      .select('user_id, score:score.sum(), lessons_completed:lessons_completed.sum(), profile:profiles(username, display_name, avatar_url)')
      .order('score', { ascending: false })
      .limit(50),
  ])

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Score = lessons completed × average accuracy. Resets every Monday.
        </p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-4">
          <LeaderboardList entries={(weekly ?? []) as unknown as LeaderboardRow[]} currentUserId={user.id} />
        </TabsContent>

        <TabsContent value="alltime" className="mt-4">
          <LeaderboardList entries={(allTime ?? []) as unknown as LeaderboardRow[]} currentUserId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LeaderboardList({ entries, currentUserId }: { entries: LeaderboardRow[]; currentUserId: string }) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No scores yet this period. Complete some lessons to appear here!</p>
  }

  return (
    <div className="space-y-2">
      {entries.map((entry: LeaderboardRow, i: number) => {
        const profile = entry.profile
        const isMe = entry.user_id === currentUserId
        const initials = (profile?.display_name ?? profile?.username ?? '?')
          .split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

        return (
          <div
            key={entry.id ?? entry.user_id}
            className={`flex items-center gap-4 p-3 rounded-lg border ${isMe ? 'bg-muted border-foreground/20' : ''}`}
          >
            {/* Rank */}
            <div className="w-8 text-center font-bold text-sm text-muted-foreground">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
            </div>

            {/* Avatar */}
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {profile?.display_name ?? profile?.username ?? 'Anonymous'}
                {isMe && <span className="text-xs text-muted-foreground ml-1">(you)</span>}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.lessons_completed} lessons · {Math.round(entry.avg_accuracy ?? 0)}% avg accuracy
              </p>
            </div>

            {/* Score */}
            <div className="text-right">
              <p className="font-bold">{entry.score?.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">pts</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
