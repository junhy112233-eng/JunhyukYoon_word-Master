import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AICommanderAvatar } from './GameCharacters';
import { Question } from '../types';
import { Volume2, ArrowRight, Sparkles } from 'lucide-react';
import { speakEnglish } from '../utils/audio';

interface AICommanderFeedbackProps {
  question: Question;
  isEvaluating: boolean;
  selectedOption: string | null;
  onNext: () => void;
}

export const AICommanderFeedback: React.FC<AICommanderFeedbackProps> = ({
  question,
  isEvaluating,
  selectedOption,
  onNext
}) => {
  const isCorrect = selectedOption === question.correctVerb;

  const handleSpeakRecast = () => {
    speakEnglish(question.recastSentence);
  };

  return (
    <div id="ai-commander-feedback" className="w-full flex items-start gap-3 bg-slate-900/90 text-white rounded-2xl p-3 sm:p-4 shadow-lg border border-indigo-500/30">
      {/* AI Commander Avatar */}
      <div className="shrink-0 mt-0.5">
        <AICommanderAvatar size="md" />
      </div>

      {/* Speech Bubble / Message */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-black text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            마법사 간달프 (Gandalf)
          </span>

          {/* If wrong, allow hearing the recast sentence again */}
          {isEvaluating && !isCorrect && (
            <button
              id="recast-audio-btn"
              onClick={handleSpeakRecast}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 px-2 py-0.5 rounded-full border border-amber-400/40 transition-colors"
            >
              <Volume2 className="w-3 h-3" />
              <span>올바른 발음 듣기</span>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isEvaluating ? (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed"
            >
              주어와 시간 힌트를 잘 보고 알맞은 주문을 선택하거나 마이크로 외쳐봐! ⚡
            </motion.p>
          ) : isCorrect ? (
            <motion.div
              key="correct"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between gap-2"
            >
              <div className="text-xs sm:text-sm font-bold text-emerald-400">
                ✨ 정답이야! 강력한 문법 마법이 몬스터에게 명중했어! (+10점)
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-1"
            >
              {/* Recast highlight */}
              <div className="text-xs sm:text-sm font-extrabold text-amber-300 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-400/40">
                "Oh, {question.recastSentence}"
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                {question.ruleExplanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Question Button if evaluation is done and wrong */}
        {isEvaluating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 flex justify-end"
          >
            <button
              id="next-question-btn"
              onClick={onNext}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl shadow-md active:scale-95 transition-all"
            >
              <span>다음 문제</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
