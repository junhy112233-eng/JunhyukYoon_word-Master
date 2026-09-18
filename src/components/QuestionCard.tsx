import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { Volume2, Mic, MicOff, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { soundManager, speakEnglish } from '../utils/audio';
import { voiceRecognizer, SpeechStatus } from '../utils/speech';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  isEvaluating: boolean;
  onSelectOption: (option: string, method: 'touch' | 'voice') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  isEvaluating,
  onSelectOption
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isPlayingSentenceAudio, setIsPlayingSentenceAudio] = useState<boolean>(false);
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('idle');
  const [interimSpoken, setInterimSpoken] = useState<string>('');
  const [micCancelFn, setMicCancelFn] = useState<(() => void) | null>(null);

  // Stop mic if question changes
  useEffect(() => {
    setShowHint(false);
    setSpeechStatus('idle');
    setInterimSpoken('');
    if (micCancelFn) {
      micCancelFn();
      setMicCancelFn(null);
    }
  }, [question.id]);

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      if (micCancelFn) micCancelFn();
    };
  }, [micCancelFn]);

  // Read the full sentence
  const handlePlayFullSentence = () => {
    soundManager.playClick();
    setIsPlayingSentenceAudio(true);
    // Replace blank with the correct verb for natural listening
    const fullText = `${question.sentenceBefore} ${question.correctVerb} ${question.sentenceAfter}`.trim();
    speakEnglish(fullText, () => {
      setIsPlayingSentenceAudio(false);
    });
  };

  // Read single option word pronunciation
  const handlePlayWordAudio = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    soundManager.playClick();
    speakEnglish(word);
  };

  // Toggle voice recognition
  const handleToggleMic = () => {
    if (isEvaluating) return;

    if (speechStatus === 'listening') {
      soundManager.playMicBeep('stop');
      if (micCancelFn) {
        micCancelFn();
        setMicCancelFn(null);
      }
      setSpeechStatus('idle');
      return;
    }

    soundManager.playMicBeep('start');
    setSpeechStatus('listening');
    setInterimSpoken('');

    const cancel = voiceRecognizer.listen(
      question.options,
      (transcript) => {
        setInterimSpoken(transcript);
      },
      (matched, fullTranscript) => {
        if (matched) {
          setSpeechStatus('matched');
          setInterimSpoken(matched);
          onSelectOption(matched, 'voice');
        } else if (fullTranscript) {
          setSpeechStatus('no_match');
          setInterimSpoken(`"${fullTranscript}" (다시 말해보세요)`);
          setTimeout(() => {
            setSpeechStatus('idle');
            setInterimSpoken('');
          }, 2000);
        } else {
          setSpeechStatus('idle');
        }
        setMicCancelFn(null);
      },
      (err) => {
        if (err === 'unsupported') {
          setSpeechStatus('unsupported');
        } else {
          setSpeechStatus('error');
        }
        setTimeout(() => {
          setSpeechStatus('idle');
        }, 2200);
        setMicCancelFn(null);
      }
    );

    setMicCancelFn(() => cancel);
  };

  return (
    <div id="question-card" className="w-full flex flex-col items-center bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-slate-200/80 my-2">
      {/* Sentence with Blank & Speaker Button */}
      <div className="w-full flex flex-col items-center bg-indigo-50/70 border-2 border-indigo-100 rounded-2xl p-4 sm:p-5 mb-3 relative">
        <div className="flex items-center justify-between w-full mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-200/60 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            주문 영문장
          </span>

          {/* Speaker Button: Listen to sentence */}
          <button
            id="speaker-listen-sentence-btn"
            onClick={handlePlayFullSentence}
            aria-label="문장 발음 다시 듣기"
            title="문장 발음 다시 듣기"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
              isPlayingSentenceAudio
                ? 'bg-indigo-600 text-white animate-pulse shadow-indigo-300'
                : 'bg-white text-indigo-700 hover:bg-indigo-100/80 border border-indigo-200'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingSentenceAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingSentenceAudio ? '재생 중...' : '문장 듣기'}</span>
          </button>
        </div>

        {/* Big English Sentence */}
        <div className="text-xl sm:text-2xl font-bold text-slate-800 text-center tracking-wide leading-relaxed">
          <span>{question.sentenceBefore}</span>{' '}
          <span
            className={`inline-block min-w-[80px] px-3 py-1 mx-1 rounded-xl font-extrabold border-2 text-center transition-all ${
              selectedOption
                ? selectedOption === question.correctVerb
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-400 scale-105 shadow-sm'
                  : 'bg-rose-100 text-rose-700 border-rose-400'
                : 'bg-amber-100 text-amber-900 border-amber-300 border-dashed animate-pulse'
            }`}
          >
            {selectedOption || '______'}
          </span>{' '}
          <span>{question.sentenceAfter}</span>
        </div>

        {/* Korean Hint Accordion Toggle */}
        <div className="mt-2.5 flex flex-col items-center">
          <button
            id="hint-toggle-btn"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors py-0.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? '해석 힌트 닫기' : '💡 우리말 해석 힌트 보기'}</span>
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="text-xs sm:text-sm font-medium text-slate-600 bg-white/90 px-3 py-1.5 rounded-lg border border-indigo-100 mt-1.5 shadow-xs text-center">
                  "{question.koreanHint}"
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3 Verb Choice Buttons (Touchable & Finger-Friendly for Elementary Kids) */}
      <div className="w-full flex flex-col gap-2.5 my-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-600">
            👇 알맞은 동사 주문을 골라보세요!
          </span>
          <span className="text-[11px] text-slate-400">
            스피커 아이콘을 누르면 단어 발음 확인!
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === question.correctVerb;
            const showCorrectHighlight = isEvaluating && isCorrect;
            const showWrongHighlight = isEvaluating && isSelected && !isCorrect;

            let btnStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm active:scale-95';

            if (showCorrectHighlight) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-200 ring-4 ring-emerald-300 scale-105';
            } else if (showWrongHighlight) {
              btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-rose-200 ring-2 ring-rose-300';
            } else if (isEvaluating) {
              btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 pointer-events-none';
            }

            return (
              <motion.button
                key={option}
                id={`verb-option-btn-${idx}`}
                disabled={isEvaluating}
                onClick={() => {
                  soundManager.playClick();
                  onSelectOption(option, 'touch');
                }}
                whileHover={!isEvaluating ? { scale: 1.03 } : {}}
                whileTap={!isEvaluating ? { scale: 0.97 } : {}}
                className={`min-h-[58px] sm:min-h-[64px] rounded-2xl border-2 font-black text-base sm:text-xl flex flex-col items-center justify-center p-2 relative transition-colors select-none ${btnStyle}`}
              >
                <div className="flex items-center justify-center gap-1 w-full">
                  <span>{option}</span>
                  {showCorrectHighlight && (
                    <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                  )}
                  {showWrongHighlight && (
                    <XCircle className="w-5 h-5 text-white animate-shake" />
                  )}
                </div>

                {/* Pronunciation Listen Pin on Option */}
                <button
                  type="button"
                  aria-label={`${option} 발음 듣기`}
                  onClick={(e) => handlePlayWordAudio(e, option)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Voice Recognition Microphone Button */}
      <div className="w-full flex flex-col items-center mt-3 pt-3 border-t border-slate-100">
        <motion.button
          id="mic-voice-spell-btn"
          disabled={isEvaluating}
          onClick={handleToggleMic}
          whileHover={!isEvaluating ? { scale: 1.02 } : {}}
          whileTap={!isEvaluating ? { scale: 0.98 } : {}}
          className={`w-full max-w-sm py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 shadow-md border transition-all ${
            speechStatus === 'listening'
              ? 'bg-rose-500 text-white border-rose-600 shadow-rose-300 ring-4 ring-rose-200 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-amber-600 shadow-amber-200'
          }`}
        >
          {speechStatus === 'listening' ? (
            <>
              <MicOff className="w-5 h-5 animate-spin" />
              <span>듣고 있어요! 주문을 크게 외쳐보세요...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>🎙️ 음성으로 말하기 (주문 외치기)</span>
            </>
          )}
        </motion.button>

        {/* Live Mic Feedback Note */}
        <div className="h-6 flex items-center justify-center mt-1 text-xs">
          {speechStatus === 'listening' && (
            <span className="text-rose-600 font-bold animate-pulse">
              {interimSpoken ? `인식 중: "${interimSpoken}"` : `예: "${question.correctVerb}" 라고 말해보세요!`}
            </span>
          )}
          {speechStatus === 'no_match' && (
            <span className="text-amber-600 font-semibold">{interimSpoken}</span>
          )}
          {speechStatus === 'unsupported' && (
            <span className="text-slate-500">이 브라우저에서는 음성 인식을 지원하지 않습니다. 터치로 선택해주세요!</span>
          )}
          {speechStatus === 'error' && (
            <span className="text-slate-500">마이크 연결을 확인하거나 터치 버튼을 이용해주세요!</span>
          )}
          {speechStatus === 'idle' && (
            <span className="text-slate-400 text-[11px]">
              Tip: 손가락으로 터치하거나 마이크를 눌러 정답 단어를 말해보세요!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
