import { useSyncExternalStore } from "react"

/* Sound is off until the visitor turns it on. Every cue is synthesised, so
   there are no audio files to load. */

let on = false
let ctx: AudioContext | null = null
const listeners = new Set<() => void>()

export function setSound(next: boolean) {
  on = next
  if (on) ctx ??= new AudioContext()
  listeners.forEach((l) => l())
}

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => on,
  )
}

/** A short, soft blip. `pitch` in Hz. */
export function blip(pitch = 660, length = 0.06, level = 0.05) {
  if (!on || !ctx) return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = "sine"
  osc.frequency.setValueAtTime(pitch, t)
  osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, t + length)
  gain.gain.setValueAtTime(level, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + length)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + length)
}
