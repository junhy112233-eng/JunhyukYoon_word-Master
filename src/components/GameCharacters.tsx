import React from 'react';
import { motion } from 'motion/react';
import { BattleState } from '../types';

interface HeroProps {
  state: BattleState;
  combo?: number;
  showTierBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const HeroCharacter: React.FC<HeroProps> = ({ state, combo = 0, showTierBadge = true, size = 'md' }) => {
  const isAttacking = state === 'hero_attacking';
  const isHurt = state === 'hero_hurt';
  const isVictory = state === 'victory';

  // Sizing: default is 28x36 (w-28 h-36), 'lg' for start screen is w-36 h-44
  const sizeClasses = size === 'lg' ? 'w-36 h-44 sm:w-40 sm:h-48' : size === 'sm' ? 'w-24 h-32' : 'w-28 h-36';

  // Wizard Tier based on combo:
  // < 3: 초보 마법사 (Novice Wizard)
  // 3 ~ 5: 중급 마법사 (Adept Flame Wizard)
  // >= 6: 대마법사 (Archmage / Cosmic Grand Wizard)
  const isArchmage = combo >= 6;
  const isAdept = combo >= 3 && combo <= 5;
  const isNovice = !isAdept && !isArchmage;

  // Title and theme colors for each tier
  const tierInfo = isArchmage
    ? {
        title: '🌟 대마법사',
        badgeBg: 'bg-gradient-to-r from-cyan-400 via-white to-sky-300 text-slate-900 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]',
        robeColor: '#0F172A', // Cosmic dark/midnight robe with luminous trim
        robeStroke: '#38BDF8',
        capeColor: '#F8FAFC', // Radiant pure white cape
        capeStroke: '#38BDF8',
        hatBrim: '#0284C7',
        hatCone: '#0369A1',
        hatStar: '#FFFFFF',
        staffWood: '#334155',
        staffGem: '#FFFFFF',
        staffGemStroke: '#38BDF8',
        auraColor: 'bg-cyan-300/40'
      }
    : isAdept
    ? {
        title: '🔥 중급 마법사',
        badgeBg: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-300 shadow-[0_0_10px_rgba(59,130,246,0.6)]',
        robeColor: '#1E3A8A', // Deep sapphire/plasma robe
        robeStroke: '#60A5FA',
        capeColor: '#2563EB', // Blue flame cape
        capeStroke: '#93C5FD',
        hatBrim: '#1D4ED8',
        hatCone: '#1E40AF',
        hatStar: '#38BDF8',
        staffWood: '#475569',
        staffGem: '#38BDF8',
        staffGemStroke: '#93C5FD',
        auraColor: 'bg-blue-500/30'
      }
    : {
        title: '🌱 초보 마법사',
        badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
        robeColor: '#2563EB',
        robeStroke: '#1D4ED8',
        capeColor: '#DC2626',
        capeStroke: '#991B1B',
        hatBrim: '#1E3A8A',
        hatCone: '#1E40AF',
        hatStar: '#FBBF24',
        staffWood: '#78350F',
        staffGem: '#3B82F6',
        staffGemStroke: '#60A5FA',
        auraColor: 'bg-amber-400/30'
      };

  return (
    <motion.div
      id="hero-character"
      className={`relative flex flex-col items-center justify-center ${sizeClasses} select-none`}
      animate={
        isAttacking
          ? { x: [0, 45, 0], scale: [1, 1.15, 1], rotate: [0, 10, 0] }
          : isHurt
          ? { x: [0, -15, 10, -5, 0], rotate: [0, -12, 8, -4, 0] }
          : isVictory
          ? { y: [0, -20, 0], scale: [1, 1.1, 1] }
          : { y: [0, -4, 0] }
      }
      transition={{
        duration: isAttacking ? 0.45 : isHurt ? 0.4 : isVictory ? 0.6 : 2.2,
        repeat: isAttacking || isHurt ? 0 : Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Permanent Tier Aura for Adept & Archmage */}
      {isArchmage ? (
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-2 rounded-full bg-cyan-300/30 blur-lg pointer-events-none"
        />
      ) : isAdept ? (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full bg-blue-500/25 blur-md pointer-events-none"
        />
      ) : null}

      {/* Magic Casting Aura Sparkles */}
      {isAttacking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.6, 2.2] }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 rounded-full ${tierInfo.auraColor} blur-md pointer-events-none`}
        />
      )}

      <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-md overflow-visible">
        {/* Magic Staff / Wand */}
        <motion.g
          animate={
            isAttacking
              ? { rotate: [0, 45, -10, 0], x: [0, 10, 0] }
              : { rotate: [0, 5, 0] }
          }
          transition={{ duration: isAttacking ? 0.45 : 2, repeat: isAttacking ? 0 : Infinity }}
          className="origin-[45px_95px]"
        >
          {/* Wand wood / crystal stick */}
          <line x1="45" y1="95" x2="18" y2="40" stroke={tierInfo.staffWood} strokeWidth="5" strokeLinecap="round" />

          {/* Archmage additional staff ornaments */}
          {isArchmage && (
            <>
              {/* Dual orbiting crystal rings */}
              <circle cx="16" cy="38" r="14" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="16,14 23,28 30,38 23,48 16,62 9,48 2,38 9,28" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
            </>
          )}

          {/* Adept staff flaming aura */}
          {isAdept && (
            <circle cx="16" cy="38" r="12" fill="#3B82F6" opacity="0.3" />
          )}

          {/* Wand Gem Top */}
          <circle cx="16" cy="38" r={isArchmage ? 10 : 9} fill={tierInfo.staffGem} stroke={tierInfo.staffGemStroke} strokeWidth="2" />
          <polygon
            points="16,23 20,35 30,38 20,41 16,53 12,41 2,38 12,35"
            fill={isArchmage ? '#FFFFFF' : isAdept ? '#38BDF8' : '#FBBF24'}
          />

          {/* Glowing particle on attack */}
          {isAttacking && (
            <circle
              cx="16"
              cy="38"
              r={isArchmage ? 20 : isAdept ? 16 : 14}
              fill={isArchmage ? '#FFFFFF' : isAdept ? '#60A5FA' : '#FBBF24'}
              opacity="0.8"
            />
          )}
        </motion.g>

        {/* Hero Cape */}
        <path
          d="M 40 75 Q 30 115 25 130 Q 55 135 68 125 Q 75 105 75 75 Z"
          fill={tierInfo.capeColor}
          stroke={tierInfo.capeStroke}
          strokeWidth="2"
        />

        {/* Hero Body / Robe */}
        <path
          d="M 44 70 L 40 125 L 80 125 L 76 70 Z"
          fill={tierInfo.robeColor}
          stroke={tierInfo.robeStroke}
          strokeWidth="2.5"
        />

        {/* Archmage Royal Robe Trim / Rune Patterns */}
        {isArchmage && (
          <>
            <line x1="60" y1="70" x2="60" y2="125" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="60" cy="80" r="2" fill="#FFFFFF" />
            <circle cx="60" cy="105" r="2" fill="#FFFFFF" />
            <circle cx="60" cy="118" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Adept Flame Crest on Robe */}
        {isAdept && (
          <path d="M 57 80 Q 60 74 63 80 Q 65 77 62 85 Q 60 88 58 85 Z" fill="#60A5FA" />
        )}

        {/* Belt */}
        <rect
          x="42"
          y="90"
          width="36"
          height="8"
          rx="2"
          fill={isArchmage ? '#0284C7' : isAdept ? '#1E40AF' : '#D97706'}
        />
        <rect
          x="56"
          y="88"
          width="8"
          height="12"
          rx="2"
          fill={isArchmage ? '#FFFFFF' : isAdept ? '#38BDF8' : '#FDE047'}
          stroke={isArchmage ? '#38BDF8' : isAdept ? '#1D4ED8' : '#B45309'}
          strokeWidth="1.5"
        />

        {/* Head */}
        <circle cx="60" cy="52" r="22" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />

        {/* Hair bangs */}
        <path
          d="M 40 45 Q 50 35 60 40 Q 70 34 80 46 Q 72 38 60 38 Q 48 38 40 45 Z"
          fill={isArchmage ? '#E2E8F0' : isAdept ? '#1E293B' : '#78350F'}
        />

        {/* Eyes */}
        {isHurt ? (
          <g stroke="#451A03" strokeWidth="2.5" strokeLinecap="round">
            <line x1="50" y1="48" x2="56" y2="54" />
            <line x1="56" y1="48" x2="50" y2="54" />
            <line x1="64" y1="48" x2="70" y2="54" />
            <line x1="70" y1="48" x2="64" y2="54" />
          </g>
        ) : isVictory ? (
          <g stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 48 50 Q 53 45 58 50" />
            <path d="M 62 50 Q 67 45 72 50" />
          </g>
        ) : (
          <g>
            <circle cx="53" cy="50" r="3.5" fill={isArchmage ? '#0284C7' : '#1E293B'} />
            <circle cx="54.5" cy="48.5" r="1.2" fill="#FFFFFF" />
            <circle cx="67" cy="50" r="3.5" fill={isArchmage ? '#0284C7' : '#1E293B'} />
            <circle cx="68.5" cy="48.5" r="1.2" fill="#FFFFFF" />
            {isArchmage && (
              /* Glowing eyes for Archmage */
              <circle cx="60" cy="50" r="15" fill="#38BDF8" opacity="0.15" />
            )}
          </g>
        )}

        {/* Cheeks */}
        <ellipse cx="46" cy="55" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />
        <ellipse cx="74" cy="55" rx="3.5" ry="2" fill="#F87171" opacity="0.6" />

        {/* Smile */}
        {isHurt ? (
          <path d="M 55 60 Q 60 56 65 60" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 55 58 Q 60 64 65 58" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Wizard Hat */}
        <path
          d="M 32 44 Q 60 40 88 44 Q 60 36 32 44 Z"
          fill={tierInfo.hatBrim}
          stroke={tierInfo.hatCone}
          strokeWidth="2"
        />
        <path
          d="M 42 42 Q 58 10 70 8 Q 64 25 78 42 Z"
          fill={tierInfo.hatCone}
          stroke={tierInfo.hatBrim}
          strokeWidth="2"
        />

        {/* Archmage Crown/Halo Ring on Hat */}
        {isArchmage && (
          <ellipse cx="60" cy="22" rx="16" ry="6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        )}

        {/* Star / Crest on hat */}
        <polygon
          points="60,24 62,29 67,29 63,32 65,37 60,34 55,37 57,32 53,29 58,29"
          fill={tierInfo.hatStar}
        />

        {/* Hero Shoes */}
        <ellipse cx="48" cy="128" rx="8" ry="4" fill={isArchmage ? '#1E293B' : '#78350F'} />
        <ellipse cx="72" cy="128" rx="8" ry="4" fill={isArchmage ? '#1E293B' : '#78350F'} />
      </svg>

      {/* Hero Tier Badge (optional) */}
      {showTierBadge && (
        <motion.div
          key={tierInfo.title}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border mt-1 shadow-sm whitespace-nowrap ${tierInfo.badgeBg}`}
        >
          {tierInfo.title}
        </motion.div>
      )}
    </motion.div>
  );
};

interface MonsterProps {
  stage: number;
  state: BattleState;
}

export const MonsterCharacter: React.FC<MonsterProps> = ({ stage, state }) => {
  const isHit = state === 'monster_hit';
  const isAttacking = state === 'monster_attacking';

  // Rotate monster visual based on stage
  const monsterType = stage <= 3 ? 'slime' : stage <= 7 ? 'imp' : 'golem';

  return (
    <motion.div
      id="monster-character"
      className="relative flex flex-col items-center justify-center w-28 h-36 select-none"
      animate={
        isHit
          ? { x: [0, 20, -10, 15, 0], scale: [1, 0.9, 1.05, 1], filter: ['brightness(1)', 'brightness(1.8) contrast(1.5)', 'brightness(1)'] }
          : isAttacking
          ? { x: [0, -35, 0], scale: [1, 1.2, 1] }
          : { y: [0, -5, 0], scaleY: [1, 1.04, 1] }
      }
      transition={{
        duration: isHit ? 0.45 : isAttacking ? 0.4 : 1.8,
        repeat: isHit || isAttacking ? 0 : Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Hit damage flash overlay */}
      {isHit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [1, 0], scale: [1, 1.5] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <span className="text-xl font-extrabold text-amber-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            💥 HIT!
          </span>
        </motion.div>
      )}

      {monsterType === 'slime' && (
        <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-md">
          {/* Slime Body */}
          <path
            d="M 25 95 C 10 95 10 60 30 45 C 45 30 55 20 60 15 C 65 20 75 30 90 45 C 110 60 110 95 95 95 C 80 95 75 90 60 90 C 45 90 40 95 25 95 Z"
            fill="#10B981"
            stroke="#047857"
            strokeWidth="3"
          />
          {/* Slime Highlight */}
          <ellipse cx="45" cy="45" rx="10" ry="6" fill="#6EE7B7" opacity="0.8" transform="rotate(-20 45 45)" />

          {/* Eyes */}
          {isHit ? (
            <g stroke="#064E3B" strokeWidth="3" strokeLinecap="round">
              <line x1="42" y1="60" x2="52" y2="70" />
              <line x1="52" y1="60" x2="42" y2="70" />
              <line x1="68" y1="60" x2="78" y2="70" />
              <line x1="78" y1="60" x2="68" y2="70" />
            </g>
          ) : (
            <g>
              <ellipse cx="48" cy="62" rx="6" ry="8" fill="#064E3B" />
              <circle cx="50" cy="59" r="2.5" fill="#FFFFFF" />
              <ellipse cx="72" cy="62" rx="6" ry="8" fill="#064E3B" />
              <circle cx="74" cy="59" r="2.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Cheeks */}
          <circle cx="36" cy="74" r="4" fill="#F43F5E" opacity="0.6" />
          <circle cx="84" cy="74" r="4" fill="#F43F5E" opacity="0.6" />

          {/* Mouth */}
          {isHit ? (
            <ellipse cx="60" cy="78" rx="8" ry="4" fill="#064E3B" />
          ) : (
            <path d="M 53 72 Q 60 80 67 72" stroke="#064E3B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
        </svg>
      )}

      {monsterType === 'imp' && (
        <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-md">
          {/* Bat Wings */}
          <path d="M 30 65 Q 10 35 5 50 Q 15 75 35 75 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="2" />
          <path d="M 90 65 Q 110 35 115 50 Q 105 75 85 75 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="2" />

          {/* Imp Body */}
          <circle cx="60" cy="70" r="32" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" />
          {/* Horns */}
          <polygon points="40,46 32,25 48,38" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <polygon points="80,46 88,25 72,38" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

          {/* Glowing Eyes */}
          {isHit ? (
            <g stroke="#312E81" strokeWidth="3" strokeLinecap="round">
              <line x1="45" y1="62" x2="55" y2="72" />
              <line x1="55" y1="62" x2="45" y2="72" />
              <line x1="65" y1="62" x2="75" y2="72" />
              <line x1="75" y1="62" x2="65" y2="72" />
            </g>
          ) : (
            <g>
              <polygon points="45,62 55,59 52,70" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
              <polygon points="75,62 65,59 68,70" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
            </g>
          )}

          {/* Grinning Mouth with fangs */}
          <path d="M 48 80 Q 60 92 72 80 Z" fill="#4C1D95" />
          <polygon points="53,80 56,86 59,80" fill="#FFFFFF" />
          <polygon points="61,80 64,86 67,80" fill="#FFFFFF" />
        </svg>
      )}

      {monsterType === 'golem' && (
        <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-md">
          {/* Golem Rock Head & Shoulders */}
          <path
            d="M 30 45 L 60 25 L 90 45 L 100 85 L 85 110 L 35 110 L 20 85 Z"
            fill="#64748B"
            stroke="#334155"
            strokeWidth="3.5"
          />
          {/* Rock Cracks */}
          <line x1="45" y1="40" x2="52" y2="55" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <line x1="75" y1="75" x2="85" y2="90" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

          {/* Glowing Lava Crystal Core */}
          <polygon points="60,70 68,82 60,94 52,82" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx="60" cy="82" r="3" fill="#FDE047" />

          {/* Visor Eyes */}
          {isHit ? (
            <line x1="40" y1="56" x2="80" y2="56" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <g>
              <rect x="38" y="52" width="18" height="8" rx="2" fill="#F59E0B" />
              <rect x="64" y="52" width="18" height="8" rx="2" fill="#F59E0B" />
            </g>
          )}
        </svg>
      )}

      <div className="text-[11px] font-bold text-rose-900 bg-rose-100/90 px-2 py-0.5 rounded-full border border-rose-200 mt-1">
        {monsterType === 'slime' ? 'Slime Lv.1' : monsterType === 'imp' ? 'Imp Lv.2' : 'Golem Boss'}
      </div>
    </motion.div>
  );
};

export const AICommanderAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dim = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  return (
    <div className={`relative ${dim} rounded-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 flex items-center justify-center p-0.5 shadow-md border-2 border-slate-400/60 overflow-visible`}>
      <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-sm">
        {/* Background glow behind Gandalf */}
        <circle cx="30" cy="30" r="26" fill="#1E293B" />
        <circle cx="30" cy="22" r="16" fill="#475569" opacity="0.3" />

        {/* Gandalf's Grey Wizard Robe / Cloak */}
        <path d="M 12 56 L 22 38 L 38 38 L 48 56 Z" fill="#475569" stroke="#334155" strokeWidth="1.5" />
        <path d="M 24 40 L 30 46 L 36 40 Z" fill="#64748B" />

        {/* Gandalf's Long Flowing White Hair Behind */}
        <path
          d="M 14 26 Q 10 38 15 50 Q 22 55 24 44 Q 18 36 20 25 Z"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <path
          d="M 46 26 Q 50 38 45 50 Q 38 55 36 44 Q 42 36 40 25 Z"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Face */}
        <circle cx="30" cy="27" r="11" fill="#FED7AA" />
        
        {/* Wise Eyebrows (Bushy Grey) */}
        <path d="M 22 21 Q 25 18 28 21" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 32 21 Q 35 18 38 21" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Wise Piercing Eyes */}
        <circle cx="25" cy="24" r="1.5" fill="#0284C7" />
        <circle cx="25.5" cy="23.5" r="0.6" fill="#FFFFFF" />
        <circle cx="35" cy="24" r="1.5" fill="#0284C7" />
        <circle cx="35.5" cy="23.5" r="0.6" fill="#FFFFFF" />

        {/* Gandalf's Signature Long White Beard */}
        <path
          d="M 21 28 Q 18 35 22 45 Q 27 57 30 59 Q 33 57 38 45 Q 42 35 39 28 Q 30 33 21 28 Z"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />
        {/* Beard Texture Strands */}
        <path d="M 27 34 Q 28 46 30 54" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M 33 34 Q 32 46 30 54" stroke="#E2E8F0" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M 25 38 Q 28 47 29 52" stroke="#E2E8F0" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M 35 38 Q 32 47 31 52" stroke="#E2E8F0" strokeWidth="0.8" strokeLinecap="round" fill="none" />

        {/* Moustache */}
        <path
          d="M 24 29 Q 30 32 36 29 Q 30 35 24 29 Z"
          fill="#E2E8F0"
        />

        {/* Gandalf's Pointed Grey Hat (Brim and Cone) */}
        {/* Hat Brim */}
        <ellipse cx="30" cy="18" rx="22" ry="4.5" fill="#475569" stroke="#334155" strokeWidth="1.5" />
        {/* Hat Cone (slightly crooked at the top) */}
        <path
          d="M 17 17 Q 27 10 27 3 Q 29 2 31 3 Q 32 10 43 17 Z"
          fill="#64748B"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Hat Band Ribbon */}
        <path d="M 18 16 Q 30 14 42 16 Q 30 18 18 16 Z" fill="#334155" />

        {/* Gandalf's Staff Tip glowing with crystal light */}
        <line x1="48" y1="12" x2="48" y2="48" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="48" cy="10" r="3.5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="48" cy="10" r="1.5" fill="#FFFFFF" />
      </svg>
      {/* Magic crystal pulse indicator */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border border-white shadow-sm"></span>
      </span>
    </div>
  );
};
