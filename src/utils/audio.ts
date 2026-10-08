/**
 * Web Audio API synthesized sound effects and calming oceanic ambient song.
 * Generates natural oceanic wave swells, tranquil pentatonic water bells,
 * and crisp tactile chess sounds without external audio asset dependencies.
 */

class OceanicAudioSystem {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicVolume: number = 0.45;
  private sfxVolume: number = 0.6;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private musicInterval: any = null;
  private waveGainNode: GainNode | null = null;
  private waveFilterNode: BiquadFilterNode | null = null;
  private waveTimer: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.musicGainNode = this.ctx.createGain();
        this.musicGainNode.gain.value = this.musicVolume;
        this.musicGainNode.connect(this.ctx.destination);

        this.sfxGainNode = this.ctx.createGain();
        this.sfxGainNode.gain.value = this.sfxVolume;
        this.sfxGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Calming Oceanic Ambient Song ---

  public toggleMusic(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.musicGainNode) return;
    this.stopMusic();

    this.isMusicPlaying = true;
    this.startOceanWaves();
    this.startMelodicChimes();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.waveTimer) {
      clearInterval(this.waveTimer);
      this.waveTimer = null;
    }
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.waveGainNode && this.ctx) {
      try {
        this.waveGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      } catch (e) {
        // ignore
      }
    }
  }

  /**
   * Generates continuous ocean wave swells (ebb & flow) using filtered noise
   */
  private startOceanWaves() {
    if (!this.ctx || !this.musicGainNode) return;

    // Create pinkish noise buffer
    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    filter.Q.value = 2.5;

    const waveGain = this.ctx.createGain();
    waveGain.gain.value = 0.18;

    whiteNoise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.musicGainNode);

    whiteNoise.start();

    this.waveGainNode = waveGain;
    this.waveFilterNode = filter;

    // Wave swell oscillation (6.5s wave cycle)
    const swellCycle = () => {
      if (!this.ctx || !this.isMusicPlaying || !this.waveFilterNode || !this.waveGainNode) return;
      const now = this.ctx.currentTime;
      // Inflow (swell)
      this.waveFilterNode.frequency.cancelScheduledValues(now);
      this.waveFilterNode.frequency.setValueAtTime(this.waveFilterNode.frequency.value, now);
      this.waveFilterNode.frequency.linearRampToValueAtTime(580, now + 3.2);

      this.waveGainNode.gain.cancelScheduledValues(now);
      this.waveGainNode.gain.setValueAtTime(this.waveGainNode.gain.value, now);
      this.waveGainNode.gain.linearRampToValueAtTime(0.32, now + 3.2);

      // Ebb (retreat)
      this.waveFilterNode.frequency.linearRampToValueAtTime(160, now + 6.8);
      this.waveGainNode.gain.linearRampToValueAtTime(0.12, now + 6.8);
    };

    swellCycle();
    this.waveTimer = setInterval(swellCycle, 6800);
  }

  /**
   * Generates tranquil pentatonic ambient melody chords (calming sea chimes)
   */
  private startMelodicChimes() {
    // Calming Eb oceanic pentatonic frequencies (Eb3, G3, Bb3, C4, Eb4, F4, G4, Bb4, C5)
    const scale = [155.56, 196.00, 233.08, 261.63, 311.13, 349.23, 392.00, 466.16, 523.25];
    const sequence = [
      [2, 4], [0, 3], [1, 5], [3, 7],
      [4, 8], [2, 6], [1, 4], [0, 2]
    ];
    let step = 0;

    const playChimeStep = () => {
      if (!this.ctx || !this.isMusicPlaying || !this.musicGainNode) return;

      const chordIndices = sequence[step % sequence.length];
      step++;

      chordIndices.forEach((idx, offset) => {
        const freq = scale[idx];
        const delay = offset * 0.18;
        setTimeout(() => {
          this.playAmbientBell(freq);
        }, delay * 1000);
      });
    };

    playChimeStep();
    this.musicInterval = setInterval(playChimeStep, 4600);
  }

  private playAmbientBell(freq: number) {
    if (!this.ctx || !this.isMusicPlaying || !this.musicGainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 2.01, now); // Gentle shimmering overtone

    bellGain.gain.setValueAtTime(0.0001, now);
    bellGain.gain.linearRampToValueAtTime(0.08, now + 0.08); // soft attack
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8); // lingering ocean tail

    osc.connect(bellGain);
    subOsc.connect(bellGain);
    bellGain.connect(this.musicGainNode);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 4);
    subOsc.stop(now + 4);
  }

  // --- Tactical & Amazing Chess Sound Effects ---

  /**
   * Crisp move sound: stone piece gliding across ocean basalt tile
   */
  public playMoveSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Amazing Capture Effect: Tidal splash surge + resonant golden oceanic chime!
   */
  public playCaptureSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;
    const now = this.ctx.currentTime;

    // 1. Water splash whoosh & crash
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.4);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.09));
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const splashFilter = this.ctx.createBiquadFilter();
    splashFilter.type = 'bandpass';
    splashFilter.frequency.setValueAtTime(900, now);
    splashFilter.frequency.exponentialRampToValueAtTime(350, now + 0.35);
    splashFilter.Q.value = 3.0;

    const splashGain = this.ctx.createGain();
    splashGain.gain.setValueAtTime(0.4, now);
    splashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noiseSource.connect(splashFilter);
    splashFilter.connect(splashGain);
    splashGain.connect(this.sfxGainNode);
    noiseSource.start(now);

    // 2. Resonant Golden Bell Chime (C5 -> G5 strike)
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(523.25, now);
    bellOsc.frequency.exponentialRampToValueAtTime(783.99, now + 0.06);

    bellGain.gain.setValueAtTime(0.3, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    bellOsc.connect(bellGain);
    bellGain.connect(this.sfxGainNode);
    bellOsc.start(now);
    bellOsc.stop(now + 0.7);

    // 3. Sub-bass oceanic rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.3);

    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGainNode);
    subOsc.start(now);
    subOsc.stop(now + 0.4);
  }

  /**
   * Check Sound: Ancient Oceanic Conch Horn / Resonant Depths Call
   */
  public playCheckSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;
    const now = this.ctx.currentTime;

    const horn = this.ctx.createOscillator();
    const hornGain = this.ctx.createGain();

    horn.type = 'sawtooth';
    horn.frequency.setValueAtTime(146.83, now); // D3
    horn.frequency.linearRampToValueAtTime(174.61, now + 0.3); // F3

    const hornFilter = this.ctx.createBiquadFilter();
    hornFilter.type = 'lowpass';
    hornFilter.frequency.setValueAtTime(320, now);
    hornFilter.frequency.linearRampToValueAtTime(650, now + 0.25);
    hornFilter.frequency.exponentialRampToValueAtTime(200, now + 0.8);

    hornGain.gain.setValueAtTime(0.001, now);
    hornGain.gain.linearRampToValueAtTime(0.28, now + 0.15);
    hornGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    horn.connect(hornFilter);
    hornFilter.connect(hornGain);
    hornGain.connect(this.sfxGainNode);

    horn.start(now);
    horn.stop(now + 0.9);
  }

  /**
   * Checkmate / Victory Fanfare: Radiant golden ocean chimes
   */
  public playVictorySound() {
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.sfxGainNode) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGainNode);
        osc.start(now);
        osc.stop(now + 1.3);
      }, idx * 160);
    });
  }

  /**
   * Bubble pop on tile select
   */
  public playSelectSound() {
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const soundSystem = new OceanicAudioSystem();
