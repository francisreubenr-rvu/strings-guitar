import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function SongsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: songs }, { data: weekly }] = await Promise.all([
    supabase.from('songs').select('*').eq('is_active', true).order('difficulty').order('title'),
    supabase.from('weekly_songs').select('*, song:songs(*)').order('created_at', { ascending: false }).limit(5),
  ])

  const byDifficulty = {
    beginner:     songs?.filter(s => s.difficulty === 'beginner') ?? [],
    intermediate: songs?.filter(s => s.difficulty === 'intermediate') ?? [],
    advanced:     songs?.filter(s => s.difficulty === 'advanced') ?? [],
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Songs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Public domain songs you can learn — all legally free to use.
        </p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">Two new songs every Monday.</p>
          {(weekly ?? []).map((ws: any) => (
            <SongCard key={ws.id} song={ws.song} note={ws.featured_note} weekly />
          ))}
          {(!weekly || weekly.length === 0) && (
            <p className="text-sm text-muted-foreground py-4">No weekly songs this week yet.</p>
          )}
        </TabsContent>

        {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
          <TabsContent key={level} value={level} className="space-y-3 mt-4">
            {byDifficulty[level].map((song: any) => <SongCard key={song.id} song={song} />)}
            {byDifficulty[level].length === 0 && (
              <p className="text-sm text-muted-foreground py-4">No songs at this level yet.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function SongCard({ song, note, weekly }: { song: any; note?: string; weekly?: boolean }) {
  return (
    <Card className="hover:bg-muted/40 transition-colors">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold">{song.title}</p>
              {weekly && <Badge variant="secondary" className="text-xs">Featured</Badge>}
              <Badge variant="outline" className="text-xs capitalize">{song.difficulty}</Badge>
              {song.is_premium && <Badge className="text-xs">Pro</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{song.composer}</p>
            {note && <p className="text-xs text-muted-foreground mt-1 italic">"{note}"</p>}
            <div className="flex gap-2 mt-2 flex-wrap">
              {song.key_signature && (
                <span className="text-xs text-muted-foreground">Key: {song.key_signature}</span>
              )}
              <span className="text-xs text-muted-foreground">·</span>
              {(song.chords as string[])?.slice(0, 5).map((c: string) => (
                <Badge key={c} variant="outline" className="text-xs py-0">{c}</Badge>
              ))}
              {(song.chords?.length ?? 0) > 5 && (
                <span className="text-xs text-muted-foreground">+{song.chords.length - 5} more</span>
              )}
            </div>
          </div>
          <Link
            href={`/songs/${song.id}`}
            className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground shrink-0"
          >
            View →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
