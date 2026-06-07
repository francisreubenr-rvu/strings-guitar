import type { ChordReading } from '@/types'

// Chord templates: note classes present (0=C, 1=C#, ... 11=B)
const CHORD_TEMPLATES: Record<string, number[]> = {
  'C':   [0, 4, 7],
  'Cm':  [0, 3, 7],
  'C7':  [0, 4, 7, 10],
  'D':   [2, 6, 9],
  'Dm':  [2, 5, 9],
  'D7':  [2, 6, 9, 0],
  'E':   [4, 8, 11],
  'Em':  [4, 7, 11],
  'E7':  [4, 8, 11, 2],
  'F':   [5, 9, 0],
  'Fm':  [5, 8, 0],
  'G':   [7, 11, 2],
  'Gm':  [7, 10, 2],
  'G7':  [7, 11, 2, 5],
  'A':   [9, 1, 4],
  'Am':  [9, 0, 4],
  'A7':  [9, 1, 4, 7],
  'B':   [11, 3, 6],
  'Bm':  [11, 2, 6],
  'B7':  [11, 3, 6, 9],
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function frequencyToNoteClass(freq: number): number {
  return Math.round(12 * Math.log2(freq / 440) + 69) % 12
}

export class ChordRecognizerEngine {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private source: MediaStreamAudioSourceNode | null = null
  private stream: MediaStream | null = null
  private animationId: number | null = null
  private onReading: ((reading: ChordReading) => void) | null = null
  private frameCount = 0

  async start(stream: MediaStream, onReading: (reading: ChordReading) => void) {
    this.onReading = onReading
    this.stream = stream
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 4096
    this.source = this.audioContext.createMediaStreamSource(stream)
    this.source.connect(this.analyser)
    this.loop()
  }

  private loop() {
    this.animationId = requestAnimationFrame(() => this.loop())
    this.frameCount++

    // Run chord detection every 10 frames (~166ms at 60fps)
    if (this.frameCount % 10 !== 0) return
    if (!this.analyser || !this.audioContext) return

    const freqData = new Float32Array(this.analyser.frequencyBinCount)
    this.analyser.getFloatFrequencyData(freqData)

    const sampleRate = this.audioContext.sampleRate
    const binCount = this.analyser.frequencyBinCount
    const chromagram = new Float32Array(12).fill(0)

    for (let i = 0; i < binCount; i++) {
      const freq = (i * sampleRate) / (2 * binCount)
      if (freq < 60 || freq > 1400) continue
      const amplitude = Math.pow(10, freqData[i] / 20)
      if (amplitude < 0.01) continue
      const noteClass = frequencyToNoteClass(freq)
      chromagram[noteClass] += amplitude
    }

    // Normalize chromagram
    const max = Math.max(...chromagram)
    if (max < 0.1) {
      this.onReading?.({ detected: null, confidence: 0, notes: [] })
      return
    }
    const normalized = chromagram.map(v => v / max)

    // Find active notes (above 0.5 threshold)
    const activeNotes: number[] = []
    normalized.forEach((v, i) => { if (v > 0.5) activeNotes.push(i) })
    const noteNames = activeNotes.map(n => NOTE_NAMES[n])

    // Match against chord templates
    let bestChord = ''
    let bestScore = 0

    for (const [chord, template] of Object.entries(CHORD_TEMPLATES)) {
      const matched = template.filter(n => activeNotes.includes(n)).length
      const score = matched / Math.max(template.length, activeNotes.length)
      if (score > bestScore) {
        bestScore = score
        bestChord = chord
      }
    }

    this.onReading?.({
      detected: bestScore > 0.6 ? bestChord : null,
      confidence: bestScore,
      notes: noteNames,
    })
  }

  stop() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId)
    this.source?.disconnect()
    this.audioContext?.close()
    this.audioContext = null
    this.analyser = null
    this.source = null
    this.animationId = null
  }
}
