import type { DetectedHand, HandLandmark } from '@/types'

// MediaPipe Hands landmark indices
const FINGERTIP_INDICES = [4, 8, 12, 16, 20]       // thumb, index, middle, ring, pinky

// Shape of the results object MediaPipe Hands passes to onResults.
interface HandResults {
  multiHandLandmarks?: HandLandmark[][]
  multiHandedness?: { label: string }[]
}

// Minimal surface of the MediaPipe Hands instance we use.
interface MediaPipeHands {
  setOptions(options: Record<string, unknown>): void
  onResults(cb: (results: HandResults) => void): void
  send(input: { image: HTMLVideoElement }): Promise<void>
  close(): void
}

// Minimal surface of the MediaPipe Camera utility we use.
interface MediaPipeCamera {
  start(): Promise<void>
  stop(): void
}

export interface HandTrackerCallbacks {
  onHands: (hands: DetectedHand[]) => void
  onFretboardPositions: (positions: FretboardPosition[]) => void
}

export interface FretboardBounds {
  nutX: number         // x coordinate of nut (fret 0)
  bridgeX: number      // x coordinate furthest fret tracked
  highStringY: number  // y coordinate of string 1 (high e)
  lowStringY: number   // y coordinate of string 6 (low E)
  fretCount: number    // number of frets tracked (default 5)
}

export interface FretboardPosition {
  fingerIndex: number  // 0=thumb, 1=index, 2=middle, 3=ring, 4=pinky
  string: number       // 1-6
  fret: number         // 1-12
  confidence: number   // 0-1
  x: number            // normalized x
  y: number            // normalized y
}

export class HandTrackerEngine {
  private hands: MediaPipeHands | null = null  // mediapipe Hands instance
  private camera: MediaPipeCamera | null = null
  private callbacks: HandTrackerCallbacks
  private fretboardBounds: FretboardBounds | null = null

  constructor(callbacks: HandTrackerCallbacks) {
    this.callbacks = callbacks
  }

  setFretboardBounds(bounds: FretboardBounds) {
    this.fretboardBounds = bounds
  }

  async init(videoElement: HTMLVideoElement) {
    // Dynamic import — mediapipe is heavy, don't load until needed
    const { Hands } = await import('@mediapipe/hands')
    const { Camera } = await import('@mediapipe/camera_utils')

    this.hands = new Hands({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    }) as unknown as MediaPipeHands

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    })

    this.hands.onResults((results: HandResults) => this.handleResults(results))

    this.camera = new Camera(videoElement, {
      onFrame: async () => {
        await this.hands?.send({ image: videoElement })
      },
      width: 1280,
      height: 720,
    }) as unknown as MediaPipeCamera

    await this.camera.start()
  }

  private handleResults(results: HandResults) {
    if (!results.multiHandLandmarks) {
      this.callbacks.onHands([])
      this.callbacks.onFretboardPositions([])
      return
    }

    const hands: DetectedHand[] = results.multiHandLandmarks.map(
      (landmarks: HandLandmark[], i: number) => ({
        landmarks,
        handedness: (results.multiHandedness?.[i]?.label as 'Left' | 'Right') ?? 'Right',
      })
    )

    this.callbacks.onHands(hands)

    // Map fretting hand landmarks to fretboard positions
    const frettingHand = hands.find(h => h.handedness === 'Left') ?? hands[0]
    if (frettingHand && this.fretboardBounds) {
      const positions = this.mapToFretboard(frettingHand.landmarks)
      this.callbacks.onFretboardPositions(positions)
    }
  }

  private mapToFretboard(landmarks: HandLandmark[]): FretboardPosition[] {
    if (!this.fretboardBounds) return []

    const { nutX, bridgeX, highStringY, lowStringY, fretCount } = this.fretboardBounds
    const positions: FretboardPosition[] = []

    FINGERTIP_INDICES.forEach((tipIdx, fingerIndex) => {
      const tip = landmarks[tipIdx]

      // Map x to fret (0=nut, fretCount=last fret)
      const fretFloat = ((tip.x - nutX) / (bridgeX - nutX)) * fretCount
      const fret = Math.max(0, Math.min(fretCount, Math.round(fretFloat)))

      // Map y to string (1=high e, 6=low E)
      const stringFloat = ((tip.y - highStringY) / (lowStringY - highStringY)) * 5 + 1
      const string = Math.max(1, Math.min(6, Math.round(stringFloat)))

      // Confidence: is the finger close to the fretboard plane?
      const inRange =
        tip.x >= nutX - 0.05 &&
        tip.x <= bridgeX + 0.05 &&
        tip.y >= highStringY - 0.05 &&
        tip.y <= lowStringY + 0.05

      positions.push({
        fingerIndex,
        string,
        fret,
        confidence: inRange ? 0.9 : 0.3,
        x: tip.x,
        y: tip.y,
      })
    })

    return positions.filter(p => p.confidence > 0.5)
  }

  stop() {
    this.camera?.stop()
    this.hands?.close()
  }
}
