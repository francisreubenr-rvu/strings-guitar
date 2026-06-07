import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b">
        <span className="text-xl font-bold tracking-tight">Strings</span>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 gap-6">
        <Badge variant="secondary" className="text-sm">Webcam-powered guitar learning</Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
          Learn guitar.<br />
          <span className="text-muted-foreground">See exactly where</span><br />
          to put your fingers.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Real-time finger placement guidance via webcam. Live chord recognition via microphone.
          A complete curriculum from first chord to advanced techniques.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/signup">
            <Button size="lg">Start learning free</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Sign in</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-16 max-w-5xl mx-auto w-full">
        {[
          {
            icon: '📹',
            title: 'Webcam Finger Tracking',
            body: 'MediaPipe AI tracks your fretting hand in real time. Colour-coded overlays show exactly which fingers to move and where.',
          },
          {
            icon: '🎵',
            title: 'Live Chord Recognition',
            body: 'Play a chord and the app hears it. Instant feedback on whether you nailed it — before you move to the next lesson.',
          },
          {
            icon: '📚',
            title: 'Structured Curriculum',
            body: 'Researched from JustinGuitar, Fender Play, and Guitar Tricks. Beginner through advanced — every lesson building on the last.',
          },
        ].map(f => (
          <div key={f.title} className="flex flex-col gap-3 p-6 rounded-xl border bg-card">
            <span className="text-3xl">{f.icon}</span>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.body}</p>
          </div>
        ))}
      </section>

      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        © 2026 Strings. All webcam and audio processing stays in your browser — nothing is uploaded.
      </footer>
    </main>
  )
}
