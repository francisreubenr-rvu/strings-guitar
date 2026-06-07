'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Profile } from '@/types'

const NAV_ITEMS = [
  { href: '/dashboard',    label: 'Dashboard',    icon: '🏠' },
  { href: '/songs',        label: 'Songs',         icon: '🎸' },
  { href: '/leaderboard',  label: 'Leaderboard',   icon: '🏆' },
  { href: '/profile',      label: 'Profile',       icon: '👤' },
]

export function SideNav({ profile }: { profile: Profile | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = (profile?.display_name ?? profile?.username ?? 'U')
    .split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <aside className="w-56 border-r flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b">
        <span className="text-lg font-bold tracking-tight">Strings</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="border-t px-3 py-3">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{profile?.display_name ?? profile?.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{profile?.skill_level}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="w-full text-left text-xs text-muted-foreground hover:text-foreground px-1 py-1 rounded transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
