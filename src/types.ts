export type GameMode = 'third_person_s' | 'past_ed' | 'mixed';

export type GrammarCategory = 'third_person_s' | 'past_ed';

export interface Question {
  id: string;
  category: GrammarCategory;
  subject: string;
  sentenceBefore: string;
  sentenceAfter: string;
  koreanHint: string;
  timeHint?: string;
  correctVerb: string;
  options: string[];
  ruleExplanation: string;
  recastSentence: string;
}

export interface UserAnswerRecord {
  question: Question;
  selectedOption: string;
  isCorrect: boolean;
  inputMethod: 'touch' | 'voice';
}

export type BattleState = 'idle' | 'hero_attacking' | 'monster_hit' | 'monster_attacking' | 'hero_hurt' | 'victory';

export interface GameStats {
  score: number;
  totalQuestions: number;
  correctCount: number;
  thirdPersonTotal: number;
  thirdPersonCorrect: number;
  pastEdTotal: number;
  pastEdCorrect: number;
  mistakeSummary: {
    thirdPersonOmission: number;
    pastEdOmission: number;
  };
}
