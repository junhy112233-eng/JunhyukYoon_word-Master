import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroCharacter, MonsterCharacter } from './GameCharacters';
import { BattleState, GameMode } from '../types';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface BattleStageProps {
  currentIndex: number;
  totalQuestions: number;
  score: number;
  combo: number;
  mode: GameMode;
  battleState: BattleState;
  monsterHp: number; // 0 to 100
  isMuted: boolean;
  onToggleMute: () => void;
  spellText?: string;
}

export const BattleStage: React.FC<BattleStageProps> = ({
  currentIndex,
  totalQuestions,
  score,
  combo,
  mode,
  battleState,
  monsterHp,
  isMuted,
  onToggleMute,
  spellText
}) => {
  const modeLabel =
    mode === 'third_person_s'
      ? '⚡ 3인칭 단수 (-s)'
      : mode === 'past_ed'
      ? '⏳ 과거형 (-ed)'
      : '⚔️ 종합 챌린지';

  return (
    <div id="battle-stage-container" className="w-full flex flex-col bg-gradient-to-b from-indigo-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-3 sm:p-4 shadow-xl border-2 border-indigo-400/40 relative overflow-hidden">
      {/* Background Star Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-2 left-6 w-1 h-1 bg-white rounded-full animate-ping" />
        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" />
      </div>

      {/* Top Status Bar */}
      <div className="flex items-center justify-between z-10 text-xs sm:text-sm font-semibold mb-2">
        {/* Question Counter */}
        <div className="flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-400/30 px-3 py-1 rounded-full shadow-inner">
          <span className="text-indigo-300 font-medium">문제</span>
          <span className="text-amber-400 font-extrabold text-sm sm:text-base">
            {currentIndex + 1}
          </span>
          <span className="text-indigo-400">/ {totalQuestions}</span>
        </div>

        {/* Mode Badge */}
        <div className="hidden xs:inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-700/50 border border-indigo-300/30 text-[11px] font-bold text-indigo-200">
          {modeLabel}
        </div>

        {/* Score & Mute Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-2.5 py-1 rounded-full text-xs sm:text-sm font-extrabold">
            <span>⭐</span>
            <span>{score}점</span>
          </div>
          <button
            id="mute-toggle-btn"
            onClick={onToggleMute}
            aria-label={isMuted ? '음소거 해제' : '음소거'}
            className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 active:scale-95 border border-slate-600 transition-all text-slate-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Monster HP Bar */}
      <div className="w-full flex items-center gap-2 mb-2 z-10 px-1">
        <span className="text-[11px] font-bold text-rose-300 whitespace-nowrap">👹 Monster HP</span>
        <div className="flex-1 h-3.5 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-rose-500/40 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400"
            initial={{ width: '100%' }}
            animate={{ width: `${Math.max(0, monsterHp)}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[10px] text-slate-300 font-mono font-bold w-7 text-right">
          {Math.max(0, monsterHp)}%
        </span>
      </div>

      {/* Battle Arena Floor */}
      <div className="relative w-full h-40 sm:h-44 flex items-center justify-between px-2 sm:px-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border border-indigo-500/20 overflow-hidden">
        {/* Arena Ground Ellipse Shadow */}
        <div className="absolute bottom-2 left-4 w-32 h-6 bg-indigo-950/80 rounded-full blur-sm" />
        <div className="absolute bottom-2 right-4 w-32 h-6 bg-indigo-950/80 rounded-full blur-sm" />

        {/* Hero Character with Tier Evolution */}
        <div className="relative z-10">
          <HeroCharacter state={battleState} combo={combo} />
        </div>

        {/* Spell Animation Projectile / Lightning Effect / Flame / White Destroyer Beam */}
        <AnimatePresence>
          {battleState === 'hero_attacking' && (
            (() => {
              // Determine spell tier based on combo:
              // 1~2 combo: current version (lightning ⚡)
              // 3~5 combo: blue flame (파란색 flame 🔥)
              // > 5 combo: white destroyer beam (하얀색 파괴광선 ✨/💥)
              const isBeam = combo >= 6;
              const isBlueFlame = combo >= 3 && combo <= 5;

              if (isBeam) {
                return (
                  <motion.div
                    key="spell-beam"
                    initial={{ x: -70, y: 0, scaleX: 0.2, scaleY: 0.6, opacity: 0 }}
                    animate={{
                      x: [-40, 20, 80],
                      scaleX: [0.6, 2.8, 3.4],
                      scaleY: [0.8, 1.8, 2.2],
                      opacity: [0, 1, 1]
                    }}
                    exit={{ opacity: 0, scale: 2.5 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute left-[30%] top-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none"
                  >
                    {/* Concentrated White Laser Core + Cosmic Glow (No text label) */}
                    <div className="relative flex items-center justify-center">
                      {/* Outer destructive shockwave aura */}
                      <div className="absolute -inset-4 bg-cyan-300/40 rounded-full blur-xl animate-pulse" />
                      <div className="absolute -inset-2 bg-white/70 rounded-full blur-md" />
                      
                      {/* Destroyer Beam Cylinder */}
                      <div className="relative h-10 w-28 bg-gradient-to-r from-white via-cyan-100 to-white rounded-full flex items-center justify-between px-3 shadow-[0_0_35px_rgba(255,255,255,0.95),0_0_50px_rgba(56,189,248,0.8)] border-2 border-cyan-200">
                        <span className="text-xl animate-spin">✨</span>
                        <div className="h-4 flex-1 mx-1 bg-white rounded-full shadow-[0_0_12px_#fff]" />
                        <span className="text-2xl drop-shadow-[0_0_8px_#fff]">💥</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (isBlueFlame) {
                return (
                  <motion.div
                    key="spell-flame"
                    initial={{ x: -60, y: 0, scale: 0.4, opacity: 0 }}
                    animate={{
                      x: [-40, 50, 105],
                      y: [0, -20, 0],
                      scale: [0.7, 1.5, 2.0],
                      opacity: [0, 1, 1]
                    }}
                    exit={{ opacity: 0, scale: 2.2 }}
                    transition={{ duration: 0.42, ease: 'easeInOut' }}
                    className="absolute left-1/3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
                  >
                    {/* Blue Flame Ball (No text label) */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-2 bg-blue-500/50 rounded-full blur-md animate-pulse" />
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 via-cyan-400 to-sky-200 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.9),0_0_12px_rgba(6,182,212,0.9)] border border-cyan-300">
                        <span className="text-2xl drop-shadow-[0_0_8px_rgba(147,197,253,1)]">🔥</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // 1~2 Combo: Original Yellow Lightning
              return (
                <motion.div
                  key="spell-lightning"
                  initial={{ x: -60, y: 0, scale: 0.4, opacity: 0 }}
                  animate={{
                    x: [-40, 60, 110],
                    y: [0, -25, 0],
                    scale: [0.6, 1.4, 1.8],
                    opacity: [0, 1, 1]
                  }}
                  exit={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute left-1/3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 blur-xs flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                    <span className="text-xl">⚡</span>
                  </div>
                  {spellText && (
                    <span className="text-xs font-black text-yellow-300 bg-indigo-950/90 px-2 py-0.5 rounded-full border border-yellow-400 mt-1 whitespace-nowrap shadow-md">
                      Spell: {spellText}!
                    </span>
                  )}
                </motion.div>
              );
            })()
          )}
        </AnimatePresence>

        {/* Monster Counter Attack Smoke */}
        <AnimatePresence>
          {battleState === 'monster_attacking' && (
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: [60, -80], opacity: [0, 1, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute right-1/3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-2xl font-bold text-rose-400"
            >
              💨 Block!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Combo Badge Floating in Center */}
        {combo >= 2 && (
          <motion.div
            key={`combo-${combo}`}
            initial={{ scale: 0.5, y: 10, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 font-black text-xs px-3 py-1 rounded-full shadow-lg ${
              combo >= 6
                ? 'bg-gradient-to-r from-cyan-400 via-white to-sky-300 text-slate-900 border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.9)]'
                : combo >= 3
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-white border border-cyan-300 shadow-[0_0_12px_rgba(59,130,246,0.7)]'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-amber-300'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 fill-current animate-bounce ${
              combo >= 6 ? 'text-cyan-500' : combo >= 3 ? 'text-blue-200' : 'text-yellow-200'
            }`} />
            <span>
              {combo >= 6 ? `⚡ ${combo} MAX COMBO!` : combo >= 3 ? `🔥 ${combo} FLAME COMBO!` : `${combo} COMBO!`}
            </span>
          </motion.div>
        )}

        {/* Monster Character */}
        <div className="relative z-10">
          <MonsterCharacter stage={currentIndex + 1} state={battleState} />
        </div>
      </div>
    </div>
  );
};
