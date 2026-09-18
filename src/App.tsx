import React, { useState, useEffect } from 'react';
import { GameMode, Question, UserAnswerRecord, BattleState } from './types';
import { generateQuizSession } from './data/questions';
import { soundManager, speakEnglish, stopSpeech } from './utils/audio';
import { StartScreen } from './components/StartScreen';
import { BattleStage } from './components/BattleStage';
import { QuestionCard } from './components/QuestionCard';
import { AICommanderFeedback } from './components/AICommanderFeedback';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'game' | 'result'>('start');
  const [mode, setMode] = useState<GameMode>('third_person_s');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(100);
  const [records, setRecords] = useState<UserAnswerRecord[]>([]);
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [spellText, setSpellText] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Toggle audio mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.isMuted = nextMuted;
    if (nextMuted) {
      stopSpeech();
    }
  };

  // Start new game session
  const handleStartGame = (chosenMode: GameMode) => {
    stopSpeech();
    const newQuestions = generateQuizSession(chosenMode, 10);
    setMode(chosenMode);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setMonsterHp(100);
    setRecords([]);
    setBattleState('idle');
    setSelectedOption(null);
    setIsEvaluating(false);
    setSpellText('');
    setCurrentScreen('game');
  };

  const currentQuestion = questions[currentIndex];

  // Handle user answer submission (either touch button or voice recognition)
  const handleSelectOption = (option: string, method: 'touch' | 'voice') => {
    if (isEvaluating || !currentQuestion) return;

    setIsEvaluating(true);
    setSelectedOption(option);
    setSpellText(option);

    const isCorrect = option.trim().toLowerCase() === currentQuestion.correctVerb.trim().toLowerCase();

    // Record answer
    const newRecord: UserAnswerRecord = {
      question: currentQuestion,
      selectedOption: option,
      isCorrect,
      inputMethod: method
    };
    const nextRecords = [...records, newRecord];
    setRecords(nextRecords);

    if (isCorrect) {
      // 1. Correct Flow: Hero casts spell -> hits monster -> fanfare sound
      const nextCombo = combo + 1;
      soundManager.playSpellCast(nextCombo);
      setBattleState('hero_attacking');
      setScore(prev => prev + 10);
      setCombo(nextCombo);

      // Monster HP decreases
      const remainingQuestions = questions.length - (currentIndex + 1);
      const newHp = Math.max(0, Math.round((remainingQuestions / questions.length) * 100));

      setTimeout(() => {
        soundManager.playHitMonster();
        soundManager.playCorrect();
        setBattleState('monster_hit');
        setMonsterHp(newHp);
      }, 400);

      // Auto-advance after triumphant feedback
      setTimeout(() => {
        handleProceedNext(nextRecords);
      }, 1600);
    } else {
      // 2. Incorrect Flow: Monster blocks -> Hero oops -> AI Recast
      soundManager.playWrong();
      setBattleState('monster_attacking');
      setCombo(0);

      setTimeout(() => {
        setBattleState('hero_hurt');
      }, 350);

      // AI Commander Recast speech
      if (!isMuted) {
        setTimeout(() => {
          speakEnglish(`Oh, ${currentQuestion.recastSentence}`);
        }, 500);
      }
    }
  };

  // Proceed to next question or result screen
  const handleProceedNext = (latestRecords = records) => {
    stopSpeech();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsEvaluating(false);
      setBattleState('idle');
      setSpellText('');
    } else {
      // Finished all 10 questions!
      soundManager.playVictoryFanfare();
      setCurrentScreen('result');
    }
  };

  // Handle retry
  const handleRetry = () => {
    handleStartGame(mode);
  };

  // Handle return to home
  const handleHome = () => {
    stopSpeech();
    setCurrentScreen('start');
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 text-slate-100">
      <div className="w-full max-w-md flex flex-col">
        {currentScreen === 'start' && (
          <StartScreen onSelectMode={handleStartGame} />
        )}

        {currentScreen === 'game' && currentQuestion && (
          <div className="w-full flex flex-col gap-2">
            {/* 1. Battle Stage (Score, Monster HP, Hero & Monster Characters) */}
            <BattleStage
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              score={score}
              combo={combo}
              mode={mode}
              battleState={battleState}
              monsterHp={monsterHp}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              spellText={spellText}
            />

            {/* 2. Question Card (Sentence, Blank, 3 Verb Choices, Microphone) */}
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              isEvaluating={isEvaluating}
              onSelectOption={handleSelectOption}
            />

            {/* 3. AI Commander Feedback (Recast & Grammar Tips) */}
            <AICommanderFeedback
              question={currentQuestion}
              isEvaluating={isEvaluating}
              selectedOption={selectedOption}
              onNext={() => handleProceedNext()}
            />
          </div>
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            records={records}
            mode={mode}
            onRetry={handleRetry}
            onHome={handleHome}
          />
        )}
      </div>
    </main>
  );
}
