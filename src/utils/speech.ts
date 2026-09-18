// Web Speech Recognition Wrapper for English Voice Spells

// Augment browser window types
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export type SpeechStatus = 'idle' | 'listening' | 'recognizing' | 'matched' | 'no_match' | 'error' | 'unsupported';

export class VoiceSpellRecognizer {
  private recognition: any = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const win = window as IWindow;
      const SpeechRecognitionConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        this.recognition = new SpeechRecognitionConstructor();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 3;
        this.isSupported = true;
      }
    }
  }

  public getSupported(): boolean {
    return this.isSupported;
  }

  public listen(
    options: string[],
    onInterim: (transcript: string) => void,
    onResult: (matchedOption: string | null, fullTranscript: string) => void,
    onError: (err: string) => void
  ): () => void {
    if (!this.recognition) {
      onError('unsupported');
      return () => {};
    }

    try {
      this.recognition.abort();
    } catch {
      // ignore
    }

    let resolved = false;

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let finals: string[] = [];

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const transcript = item[0]?.transcript?.trim().toLowerCase() || '';
        if (item.isFinal) {
          finals.push(transcript);
          // check other alternatives too
          for (let j = 0; j < item.length; j++) {
            if (item[j]?.transcript) {
              finals.push(item[j].transcript.trim().toLowerCase());
            }
          }
        } else {
          interim += transcript + ' ';
        }
      }

      if (interim) {
        onInterim(interim.trim());
      }

      if (finals.length > 0 && !resolved) {
        resolved = true;
        const matched = this.matchOption(finals, options);
        onResult(matched, finals[0]);
      }
    };

    this.recognition.onerror = (event: any) => {
      if (!resolved) {
        resolved = true;
        onError(event.error || 'error');
      }
    };

    this.recognition.onend = () => {
      if (!resolved) {
        resolved = true;
        onResult(null, '');
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      onError('start_failed');
    }

    // Return cancellation function
    return () => {
      try {
        this.recognition.abort();
      } catch {
        // ignore
      }
    };
  }

  private matchOption(spokenList: string[], options: string[]): string | null {
    // Check direct match or if spoken phrase contains one of the options
    const normalizedOptions = options.map(o => o.trim().toLowerCase());

    for (const spoken of spokenList) {
      const words = spoken.split(/[\s,.-]+/).map(w => w.trim());
      
      // 1. Direct word match
      for (const opt of normalizedOptions) {
        if (words.includes(opt) || spoken === opt) {
          return options[normalizedOptions.indexOf(opt)];
        }
      }

      // 2. Substring match for verbs (e.g. "played" inside "he played soccer")
      for (const opt of normalizedOptions) {
        if (spoken.includes(opt)) {
          return options[normalizedOptions.indexOf(opt)];
        }
      }
    }

    return null;
  }
}

export const voiceRecognizer = new VoiceSpellRecognizer();
