import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserAnswerRecord, GameMode } from '../types';
import { Star, RotateCcw, Home, Volume2, CheckCircle, AlertTriangle, Trophy, Sparkles } from 'lucide-react';
import { soundManager, speakEnglish } from '../utils/audio';

interface ResultScreenProps {
  records: UserAnswerRecord[];
  mode: GameMode;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  records,
  mode,
  onRetry,
  onHome
}) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const totalQuestions = records.length;
  const correctCount = records.filter(r => r.isCorrect).length;
  const score = correctCount * 10;

  // Star calculation
  let stars = 1;
  let titleGrade = '초보 주문사';
  let message = '조금만 더 연습하면 멋진 Word Master가 될 수 있어요!';

  if (score >= 80) {
    stars = 3;
    titleGrade = '전설의 Word Master!';
    message = '대단해요! 3인칭 단수와 과거형 주문을 완벽하게 마스터했어요!';
  } else if (score >= 50) {
    stars = 2;
    titleGrade = '숙련된 마법사';
    message = '잘했어요! 헷갈리는 동사 규칙들을 조금만 더 복습해봐요!';
  }

  // Mistakes analysis: -s omission vs -ed omission
  const wrongRecords = records.filter(r => !r.isCorrect);
  const thirdPersonMistakes = wrongRecords.filter(r => r.question.category === 'third_person_s').length;
  const pastEdMistakes = wrongRecords.filter(r => r.question.category === 'past_ed').length;

  const handleSpeakSentence = (questionId: string, sentence: string) => {
    soundManager.playClick();
    setPlayingAudioId(questionId);
    speakEnglish(sentence, () => {
      setPlayingAudioId(null);
    });
  };

  return (
    <div id="result-screen" className="w-full flex flex-col items-center max-w-lg mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200">
      {/* Top Trophy / Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shadow-md border-2 border-amber-300 mb-2"
      >
        <Trophy className="w-9 h-9" />
      </motion.div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-800 text-center">
        {titleGrade}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 text-center mt-0.5 mb-3">
        {message}
      </p>

      {/* 1~3 Star Rating Animation */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 2, 3].map((starIdx) => {
          const isFilled = starIdx <= stars;
          return (
            <motion.div
              key={starIdx}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.15 * starIdx, type: 'spring', stiffness: 260, damping: 15 }}
            >
              <Star
                className={`w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400 animate-pulse'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Total Score Display */}
      <div className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200/80 rounded-2xl p-4 flex flex-col items-center mb-4 shadow-sm">
        <span className="text-xs font-bold text-indigo-600">최종 점수</span>
        <div className="flex items-baseline gap-1 my-0.5">
          <span className="text-4xl sm:text-5xl font-black text-indigo-900 tracking-tight">
            {score}
          </span>
          <span className="text-lg font-bold text-indigo-400">/ 100점</span>
        </div>
        <span className="text-xs font-semibold text-slate-600">
          총 {totalQuestions}문제 중 <strong className="text-indigo-700 font-extrabold">{correctCount}문제 정답</strong>
        </span>
      </div>

      {/* Frequent Mistake Grammar Analysis */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>나의 문법 약점 분석</span>
        </div>

        {wrongRecords.length === 0 ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
            <CheckCircle className="w-4 h-4" />
            <span>오답 없음! 3인칭 단수(-s)와 과거형(-ed)을 100% 이해했어요! 🎉</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border ${thirdPersonMistakes > 0 ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}`}>
              <div className="font-bold text-[11px] text-slate-500">3인칭 단수 (-s) 실수</div>
              <div className="text-base font-black mt-0.5">{thirdPersonMistakes}회</div>
              <p className="text-[10px] text-slate-500 mt-1">He / She / It 주어 확인 필요</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${pastEdMistakes > 0 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}`}>
              <div className="font-bold text-[11px] text-slate-500">과거형 (-ed) 실수</div>
              <div className="text-base font-black mt-0.5">{pastEdMistakes}회</div>
              <p className="text-[10px] text-slate-500 mt-1">yesterday, last 등 과거 힌트 확인</p>
            </div>
          </div>
        )}
      </div>

      {/* Wrong Answer Review List with Grammar Tips */}
      {wrongRecords.length > 0 && (
        <div className="w-full flex flex-col mb-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              틀린 문장 오답노트 &amp; 문법 팁 ({wrongRecords.length}개)
            </span>
            <span className="text-[11px] text-slate-400">스피커를 눌러 올바른 발음 듣기</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
            {wrongRecords.map((item, idx) => {
              const fullSentence = `${item.question.sentenceBefore} ${item.question.correctVerb} ${item.question.sentenceAfter}`.trim();
              const isPlaying = playingAudioId === item.question.id;

              return (
                <div
                  key={item.question.id || idx}
                  className="bg-white border border-rose-200/90 rounded-2xl p-3 shadow-xs hover:border-rose-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      <span>{item.question.sentenceBefore}</span>{' '}
                      <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-extrabold underline decoration-emerald-400">
                        {item.question.correctVerb}
                      </span>{' '}
                      <span>{item.question.sentenceAfter}</span>
                    </div>

                    <button
                      type="button"
                      aria-label="문장 발음 듣기"
                      onClick={() => handleSpeakSentence(item.question.id, fullSentence)}
                      className={`p-1.5 rounded-full border transition-all shrink-0 active:scale-95 ${
                        isPlaying
                          ? 'bg-indigo-600 text-white animate-pulse'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mb-1.5">
                    <span>내가 고른 답: <span className="text-rose-600 font-bold line-through">{item.selectedOption}</span></span>
                    <span>정답: <span className="text-emerald-600 font-bold">{item.question.correctVerb}</span></span>
                  </div>

                  {/* Grammar Tip Box */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2 text-[11px] text-amber-900 leading-snug">
                    <strong className="text-amber-800">💡 문법 팁: </strong>
                    {item.question.ruleExplanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons: [다시 하기] (하단 왼쪽) · [처음으로] (하단 오른쪽) */}
      <div className="grid grid-cols-2 gap-3 w-full mt-2 pt-3 border-t border-slate-100">
        <button
          id="retry-quiz-btn"
          onClick={() => {
            soundManager.playClick();
            onRetry();
          }}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-sm sm:text-base transition-all border border-slate-200 shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-indigo-600" />
          <span>다시 하기</span>
        </button>

        <button
          id="go-home-btn"
          onClick={() => {
            soundManager.playClick();
            onHome();
          }}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-95 text-white font-extrabold text-sm sm:text-base transition-all shadow-md shadow-indigo-200"
        >
          <Home className="w-4 h-4" />
          <span>처음으로</span>
        </button>
      </div>
    </div>
  );
};
