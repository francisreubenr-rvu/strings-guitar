import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SideNav } from '@/components/layout/SideNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile && !profile.onboarding_complete) redirect('/onboarding')

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav profile={profile} />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
}
