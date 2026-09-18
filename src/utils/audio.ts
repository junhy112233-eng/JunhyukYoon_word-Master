// Web Audio API Retro/Arcade SFX Synthesizer & Web Speech API Helper

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playClick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  public playSpellCast(comboLevel: number = 1): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (comboLevel >= 6) {
      // Hyper destructive white beam sound (cosmic sweeping laser beam + deep resonance)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.35);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.48);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.48);
      osc2.stop(ctx.currentTime + 0.48);
    } else if (comboLevel >= 3) {
      // Blue flame surge sound (crackling roaring plasma)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else {
      // Magical sweeping spell sound (Normal 1~2 combo)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  }

  public playHitMonster(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Deep impact & crunch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  public playCorrect(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Happy bright arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.16);
    });
  }

  public playWrong(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Gentle "oops" low buzzer
    const osc1 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(196, ctx.currentTime); // G3
    osc1.frequency.linearRampToValueAtTime(164, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc1.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.28);
  }

  public playVictoryFanfare(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, t: 0.0 },
      { f: 523.25, t: 0.12 },
      { f: 523.25, t: 0.24 },
      { f: 659.25, t: 0.36 },
      { f: 783.99, t: 0.5 },
      { f: 1046.5, t: 0.7 }
    ];

    notes.forEach(({ f, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + t);

      gain.gain.setValueAtTime(0.25, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.23);
    });
  }

  public playMicBeep(type: 'start' | 'stop'): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const freq = type === 'start' ? 700 : 450;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }
}

export const soundManager = new SoundManager();

/**
 * Text-to-Speech Helper using Web Speech API
 */
export function speakEnglish(text: string, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel(); // cancel previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.88; // friendly, elementary school-friendly pace
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('English')));
  if (enVoice) {
    utterance.voice = enVoice;
  }

  if (onEnd) {
    utterance.onend = () => onEnd();
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
