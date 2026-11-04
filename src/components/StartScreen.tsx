import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroCharacter, AICommanderAvatar } from './GameCharacters';
import { GameMode } from '../types';
import { Sparkles, Play, Zap, Clock, ShieldAlert, BookOpen, Volume2, FileSpreadsheet } from 'lucide-react';
import { soundManager, speakEnglish } from '../utils/audio';
import { getCurrentPlayCount, getSheetsWebAppUrl } from '../utils/sheetLogger';

interface StartScreenProps {
  onSelectMode: (mode: GameMode) => void;
  onOpenSheetModal: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onSelectMode, onOpenSheetModal }) => {
  const [showModeSelection, setShowModeSelection] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const playCount = getCurrentPlayCount();
  const hasSheetUrl = Boolean(getSheetsWebAppUrl());

  const handleStartClick = () => {
    soundManager.playClick();
    setShowModeSelection(true);
  };

  const handleChooseMode = (mode: GameMode) => {
    soundManager.playSpellCast();
    onSelectMode(mode);
  };

  const handleGreetSpeaker = () => {
    soundManager.playClick();
    speakEnglish("I am Gandalf the Grey! Wield your word magic with courage and vanquish the foes!");
  };

  return (
    <div id="start-screen" className="w-full flex flex-col items-center justify-between min-h-[580px] max-w-md mx-auto bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-indigo-400/40 relative overflow-hidden">
      {/* Background magical circles */}
      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Title Logo & AI Commander (간달프) */}
      <div className="w-full flex items-start justify-between z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 액션 문법 게임</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-md">
            Word Master
          </h1>
          <p className="text-[11px] sm:text-xs text-indigo-200/80 font-medium mt-0.5">
            -s와 -ed 동사변형 마법 주문으로 몬스터를 물리쳐요!
          </p>
        </div>

        {/* AI Commander Logo & Greeting (우측 상단: 대마법사 간달프) */}
        <div className="flex flex-col items-end">
          <button
            id="ai-commander-greet-btn"
            onClick={handleGreetSpeaker}
            className="group flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-400/50 p-1.5 pl-2.5 rounded-2xl shadow-md transition-all active:scale-95"
            title="마법사 간달프 인사 듣기"
          >
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-300">AI 지휘관</div>
              <div className="text-xs font-black text-amber-300 flex items-center gap-1 justify-end">
                <span>간달프</span>
                <Volume2 className="w-3 h-3 text-slate-300 group-hover:text-amber-300" />
              </div>
            </div>
            <AICommanderAvatar size="sm" />
          </button>
        </div>
      </div>

      {/* Central Hero Character Illustration (Enlarged & No '초보 마법사' text) */}
      <div className="my-auto py-2 flex flex-col items-center justify-center relative z-10">
        {/* Magic circle ring behind hero */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border-2 border-indigo-400/30 border-dashed pointer-events-none"
        />

        {/* Word Hero with increased size and without '초보 마법사' badge */}
        <HeroCharacter state="idle" size="lg" showTierBadge={false} />

        {/* Pills: How-to-play & Google Sheets Sync */}
        <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
          <button
            id="how-to-play-btn"
            onClick={() => {
              soundManager.playClick();
              setShowGuideModal(true);
            }}
            className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>30초 게임 방법</span>
          </button>

          <button
            id="google-sheet-settings-btn"
            onClick={() => {
              soundManager.playClick();
              onOpenSheetModal();
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm border ${
              hasSheetUrl
                ? 'text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40'
                : 'text-teal-200 bg-slate-800/80 hover:bg-slate-700/80 border-teal-400/30'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>구글 시트 연동</span>
            {playCount > 0 && (
              <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-extrabold px-1.5 py-0.2 rounded-full ml-0.5">
                {playCount}회
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Section: [게임 시작] or Mode Selection Cards */}
      <div className="w-full z-10 mt-auto">
        <AnimatePresence mode="wait">
          {!showModeSelection ? (
            <motion.div
              key="start-btn-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col items-center"
            >
              <button
                id="start-game-main-btn"
                onClick={handleStartClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/30 border-2 border-amber-300 active:scale-95 transition-transform"
              >
                <Play className="w-6 h-6 fill-current text-slate-950" />
                <span>게임 시작</span>
              </button>
              <span className="text-[11px] text-indigo-300/70 mt-2 font-medium">
                초등 3~5학년 맞춤 CEFR A1~A2 문법 훈련
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="mode-selection-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-amber-300">
                  🎯 학습할 문법 모드를 선택하세요:
                </span>
                <button
                  onClick={() => setShowModeSelection(false)}
                  className="text-[11px] text-indigo-300 hover:underline"
                >
                  뒤로
                </button>
              </div>

              {/* Mode 1: 3rd person singular -s */}
              <button
                id="mode-third-person-btn"
                onClick={() => handleChooseMode('third_person_s')}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-600 hover:to-blue-600 border border-indigo-400/40 flex items-center gap-3 text-left shadow-lg active:scale-98 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>3인칭 단수 -s 모드</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold">추천</span>
                  </div>
                  <p className="text-[11px] text-indigo-200">
                    주어(He/She vs I/They)를 읽고 -s 붙이기 & 원형 구분하기! (120+ 무작위 문장)
                  </p>
                </div>
              </button>

              {/* Mode 2: Past tense -ed */}
              <button
                id="mode-past-ed-btn"
                onClick={() => handleChooseMode('past_ed')}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 border border-purple-400/40 flex items-center gap-3 text-left shadow-lg active:scale-98 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-300/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-white">
                    과거형 -ed 모드
                  </div>
                  <p className="text-[11px] text-purple-200">
                    시간 힌트(yesterday vs every day)를 보고 -ed와 현재형 판별하기! (120+ 무작위 문장)
                  </p>
                </div>
              </button>

              {/* Mode 3: Mixed challenge */}
              <button
                id="mode-mixed-btn"
                onClick={() => handleChooseMode('mixed')}
                className="w-full p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 flex items-center gap-3 text-left active:scale-98 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white">
                    ⚔️ 종합 마스터 챌린지
                  </div>
                  <p className="text-[10px] text-slate-300">
                    -s와 -ed를 섞어서 실력을 완벽 검증해요!
                  </p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 30-Second How To Play Guide Modal */}
      <AnimatePresence>
        {showGuideModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white text-slate-800 rounded-3xl p-5 max-w-sm w-full shadow-2xl border-2 border-indigo-200"
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h3 className="font-black text-lg text-indigo-950 flex items-center gap-1.5">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  30초 마스터 게임 방법
                </h3>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-indigo-900">문장의 주어와 힌트를 살펴봐요!</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      "He", "She"인지, "yesterday(어제)"가 들어있는지 확인해요.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-amber-900">터치 또는 마이크로 주문 발동!</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      3개 보기 중 올바른 동사를 손으로 터치하거나 마이크를 눌러 소리쳐요!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-emerald-900">몬스터 격파 &amp; AI 지휘관 피드백!</strong>
                    <p className="text-slate-600 text-xs mt-0.5">
                      정답 시 마법 공격! 틀려도 AI 지휘관이 바른 문장으로 다시 알려줘요.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                이해했어요! 게임하러 가기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
