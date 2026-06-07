import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Props {
  params: Promise<{ songId: string }>
}

export default async function SongPage({ params }: Props) {
  const { songId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: song } = await supabase.from('songs').select('*').eq('id', songId).single()
  if (!song) notFound()

  const tabs: any[] = song.tabs ?? []
  const chordChart: any[] = song.chord_chart ?? []

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge variant="outline" className="capitalize">{song.difficulty}</Badge>
          {song.genre && <Badge variant="secondary">{song.genre}</Badge>}
          {song.is_premium && <Badge>Pro</Badge>}
        </div>
        <h1 className="text-3xl font-bold">{song.title}</h1>
        <p className="text-muted-foreground mt-1">{song.composer}</p>
        {song.description && <p className="text-sm text-muted-foreground mt-2">{song.description}</p>}
      </div>

      {/* Meta */}
      <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
        {song.key_signature && <span>Key: <strong className="text-foreground">{song.key_signature}</strong></span>}
        {song.time_signature && <span>Time: <strong className="text-foreground">{song.time_signature}</strong></span>}
        {song.bpm && <span>BPM: <strong className="text-foreground">{song.bpm}</strong></span>}
      </div>

      <Separator />

      {/* Chords used */}
      <div>
        <h2 className="font-semibold mb-2">Chords in this song</h2>
        <div className="flex gap-2 flex-wrap">
          {(song.chords as string[])?.map((c: string) => (
            <Badge key={c} variant="outline" className="text-base px-3 py-1">{c}</Badge>
          ))}
        </div>
      </div>

      {/* Chord chart */}
      {chordChart.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Chord Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap font-mono text-sm">
              {chordChart.map((beat: any, i: number) => (
                <div key={i} className="flex flex-col items-center min-w-[40px]">
                  <span className="font-bold">{beat.chord}</span>
                  <span className="text-xs text-muted-foreground">b{beat.beat}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab */}
      {tabs.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tab</CardTitle>
            <p className="text-xs text-muted-foreground">Numbers = fret position · x = mute · h = hammer-on · p = pull-off</p>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm space-y-1 overflow-x-auto">
              {tabs.map((line: any, i: number) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-muted-foreground w-3 shrink-0">{line.string_name}</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="tracking-widest whitespace-nowrap">
                    {(line.positions as (number | string)[]).map((p, j) => (
                      <span key={j} className="mr-1">{p === 0 ? '0' : p}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
