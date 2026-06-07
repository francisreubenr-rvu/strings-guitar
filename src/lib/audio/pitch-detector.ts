import { PitchDetector as PitchyDetector } from 'pitchy'
import type { PitchReading } from '@/types'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function frequencyToNote(frequency: number): { note: string; octave: number; cents: number } {
  const midiNumber = 12 * Math.log2(frequency / 440) + 69
  const roundedMidi = Math.round(midiNumber)
  const cents = Math.round((midiNumber - roundedMidi) * 100)
  const octave = Math.floor(roundedMidi / 12) - 1
  const noteIndex = roundedMidi % 12
  return { note: NOTE_NAMES[noteIndex], octave, cents }
}

export class PitchDetectorEngine {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private source: MediaStreamAudioSourceNode | null = null
  private stream: MediaStream | null = null
  private detector: PitchyDetector<Float32Array> | null = null
  private buffer: Float32Array<ArrayBuffer> | null = null
  private animationId: number | null = null
  private onReading: ((reading: PitchReading) => void) | null = null

  async start(onReading: (reading: PitchReading) => void, useLineIn = false) {
    this.onReading = onReading

    const constraints: MediaStreamConstraints = {
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        ...(useLineIn ? {} : {}),
      },
    }

    this.stream = await navigator.mediaDevices.getUserMedia(constraints)
    this.audioContext = new AudioContext()
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.source = this.audioContext.createMediaStreamSource(this.stream)
    this.source.connect(this.analyser)

    this.detector = PitchyDetector.forFloat32Array(this.analyser.fftSize)
    this.buffer = new Float32Array(this.analyser.fftSize) as Float32Array<ArrayBuffer>

    this.loop()
  }

  private loop() {
    this.animationId = requestAnimationFrame(() => this.loop())

    if (!this.analyser || !this.detector || !this.buffer || !this.audioContext) return

    this.analyser.getFloatTimeDomainData(this.buffer)
    const [frequency, clarity] = this.detector.findPitch(this.buffer, this.audioContext.sampleRate)

    if (clarity > 0.9 && frequency > 60 && frequency < 1400) {
      const { note, octave, cents } = frequencyToNote(frequency)
      this.onReading?.({ frequency, note, octave, cents, clarity })
    } else {
      this.onReading?.({ frequency: null, note: null, octave: null, cents: 0, clarity })
    }
  }

  stop() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId)
    this.source?.disconnect()
    this.stream?.getTracks().forEach(t => t.stop())
    this.audioContext?.close()
    this.audioContext = null
    this.analyser = null
    this.source = null
    this.stream = null
    this.detector = null
    this.buffer = null
    this.animationId = null
  }
}
