'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import type { Profile, SkillLevel, GuitarType } from '@/types'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('beginner')
  const [guitarType, setGuitarType] = useState<GuitarType>('acoustic')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data)
        setDisplayName(data.display_name ?? '')
        setSkillLevel(data.skill_level)
        setGuitarType(data.guitar_type)
      }
    }
    load()
  }, [])

  const save = async () => {
    if (!profile) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, skill_level: skillLevel, guitar_type: guitarType })
      .eq('id', profile.id)
    if (error) toast.error('Could not save changes')
    else toast.success('Profile updated')
    setSaving(false)
  }

  if (!profile) return (
    <div className="p-6 flex items-center justify-center text-muted-foreground">Loading...</div>
  )

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Account info */}
      <Card>
        <CardHeader><CardTitle className="text-base">Account</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
              {(profile.display_name ?? profile.username ?? 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium">@{profile.username}</p>
              <p className="text-sm text-muted-foreground">
                {profile.is_premium
                  ? <Badge className="text-xs">Pro</Badge>
                  : <span>Free plan · <a href="#" className="underline underline-offset-4">Upgrade to Pro</a></span>
                }
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Display name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning settings */}
      <Card>
        <CardHeader><CardTitle className="text-base">Learning Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Skill level</label>
            <Select value={skillLevel} onValueChange={v => setSkillLevel(v as SkillLevel)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Changing this will update which curriculum you see on the dashboard.</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Guitar type</label>
            <Select value={guitarType} onValueChange={v => setGuitarType(v as GuitarType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="acoustic">Acoustic</SelectItem>
                <SelectItem value="classical">Classical (Nylon)</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Button onClick={save} disabled={saving} className="w-full">
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}
