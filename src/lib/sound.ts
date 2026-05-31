/**
 * Tiny chiptune SFX engine. Sounds are synthesized at runtime with the Web Audio
 * API (oscillators + gain envelopes) — no audio files to ship.
 *
 * Lives as a singleton on `window` so audio + mute state survive Astro view
 * transitions and persisted-island lifecycles. Respects autoplay policy: nothing
 * plays until the first user gesture. Mute state persists to localStorage.
 */

export type SfxName = "hover" | "click" | "nav" | "toggle" | "back" | "error";

type ToneStep = {
  freq: number;
  to?: number; // glide target
  type?: OscillatorType;
  dur: number; // seconds
  at?: number; // start offset in seconds
  vol?: number; // 0..1 multiplier
};

const RECIPES: Record<SfxName, ToneStep[]> = {
  hover: [{ freq: 740, to: 920, type: "square", dur: 0.04, vol: 0.35 }],
  click: [{ freq: 420, to: 680, type: "square", dur: 0.07, vol: 0.5 }],
  nav: [
    { freq: 760, to: 220, type: "triangle", dur: 0.18, vol: 0.5 },
    { freq: 300, to: 520, type: "square", dur: 0.1, at: 0.1, vol: 0.3 },
  ],
  toggle: [
    { freq: 523, type: "square", dur: 0.06, vol: 0.5 },
    { freq: 784, type: "square", dur: 0.09, at: 0.06, vol: 0.5 },
  ],
  back: [{ freq: 640, to: 360, type: "square", dur: 0.08, vol: 0.45 }],
  error: [{ freq: 200, to: 110, type: "sawtooth", dur: 0.16, vol: 0.4 }],
};

const STORAGE_KEY = "pf:muted";

class SoundManager {
  private ctx: AudioContext | null = null;
  private unlocked = false;
  muted = true; // default off; the first toggle turns it on
  volume = 0.28;
  private listeners = new Set<(muted: boolean) => void>();

  constructor() {
    try {
      // Default muted unless the user has explicitly enabled it before.
      this.muted = localStorage.getItem(STORAGE_KEY) !== "0";
    } catch {
      /* localStorage unavailable */
    }
    const unlock = () => {
      this.unlocked = true;
      this.ensureCtx();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
  }

  private ensureCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) this.ctx = new AC();
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private emit() {
    for (const fn of this.listeners) fn(this.muted);
  }

  setMuted(value: boolean) {
    this.muted = value;
    try {
      localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {
      /* ignore */
    }
    this.emit();
  }

  toggle() {
    this.setMuted(!this.muted);
    if (!this.muted) {
      this.unlocked = true; // the toggle click is itself a gesture
      this.forcePlay("toggle");
    }
  }

  play(name: SfxName) {
    if (this.muted || !this.unlocked) return;
    this.forcePlay(name);
  }

  private forcePlay(name: SfxName) {
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const recipe = RECIPES[name];
    const start = ctx.currentTime;
    for (const step of recipe) {
      const t0 = start + (step.at ?? 0);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = step.type ?? "square";
      osc.frequency.setValueAtTime(step.freq, t0);
      if (step.to && step.to !== step.freq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, step.to), t0 + step.dur);
      }
      const peak = Math.max(0.0001, this.volume * (step.vol ?? 1));
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + step.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + step.dur + 0.03);
    }
  }
}

declare global {
  interface Window {
    __pfSound?: SoundManager;
  }
}

export function getSound(): SoundManager | null {
  if (typeof window === "undefined") return null;
  return (window.__pfSound ??= new SoundManager());
}
