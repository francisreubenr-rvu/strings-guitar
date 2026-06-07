export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'
export type GuitarType = 'acoustic' | 'classical' | 'electric' | 'unknown'
export type LessonType = 'theory' | 'chord' | 'scale' | 'exercise' | 'song' | 'tuning'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  skill_level: SkillLevel
  guitar_type: GuitarType
  is_premium: boolean
  onboarding_complete: boolean
  created_at: string
  updated_at: string
}

export interface CurriculumLevel {
  id: string
  slug: SkillLevel
  name: string
  description: string | null
  order_index: number
}

export interface Chapter {
  id: string
  level_id: string
  title: string
  description: string | null
  order_index: number
  estimated_minutes: number
  thumbnail_url: string | null
  is_premium: boolean
}

export interface FingerPosition {
  string: number   // 1-6 (1 = high e)
  fret: number     // 0 = open
  finger: number   // 1=index, 2=middle, 3=ring, 4=pinky, 0=open/muted
  muted?: boolean
}

export interface LessonContent {
  intro?: string
  steps?: { title: string; body: string }[]
  chord_diagram?: FingerPosition[]
  tab_lines?: string[]
  theory_blocks?: { heading: string; body: string }[]
  tips?: string[]
  video_url?: string
}

export interface Lesson {
  id: string
  chapter_id: string
  title: string
  description: string | null
  order_index: number
  type: LessonType
  content: LessonContent
  target_chord: string | null
  target_finger_positions: FingerPosition[] | null
  target_notes: string[] | null
  accuracy_threshold: number
  estimated_minutes: number
  is_premium: boolean
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  chapter_id: string
  completed: boolean
  completed_at: string | null
  best_accuracy: number
  attempts: number
  time_spent_seconds: number
}

export interface Song {
  id: string
  title: string
  composer: string
  era: string | null
  genre: string | null
  difficulty: Difficulty
  key_signature: string | null
  time_signature: string
  bpm: number | null
  tabs: TabLine[]
  chords: string[]
  chord_chart: ChordBeat[]
  description: string | null
  is_premium: boolean
}

export interface TabLine {
  string_name: string  // E A D G B e
  positions: (number | 'x' | 'h' | 'p' | 'b')[]
  beats?: number[]
}

export interface ChordBeat {
  beat: number
  chord: string
  position?: number  // measure
}

export interface WeeklySong {
  id: string
  song: Song
  week_start: string
  featured_note: string | null
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  profile: Pick<Profile, 'username' | 'display_name' | 'avatar_url'>
  week_start: string
  lessons_completed: number
  avg_accuracy: number
  streak_days: number
  score: number
}

// Webcam / MediaPipe types
export interface HandLandmark {
  x: number
  y: number
  z: number
}

export interface DetectedHand {
  landmarks: HandLandmark[]
  handedness: 'Left' | 'Right'
}

export interface FretboardPosition {
  string: number
  fret: number
  confidence: number
}

// Audio types
export interface PitchReading {
  frequency: number | null
  note: string | null
  octave: number | null
  cents: number   // deviation from perfect pitch (-50 to +50)
  clarity: number // 0-1
}

export interface ChordReading {
  detected: string | null
  confidence: number
  notes: string[]
}

export type TuningString = { name: string; frequency: number; midi: number }
export const STANDARD_TUNING: TuningString[] = [
  { name: 'E2', frequency: 82.41, midi: 40 },
  { name: 'A2', frequency: 110.00, midi: 45 },
  { name: 'D3', frequency: 146.83, midi: 50 },
  { name: 'G3', frequency: 196.00, midi: 55 },
  { name: 'B3', frequency: 246.94, midi: 59 },
  { name: 'E4', frequency: 329.63, midi: 64 },
]
