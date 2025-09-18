import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useGame } from "../../providers/gameProvider";
import { PortfolioMon, portfolioMonData } from "../../context/gameContext";

import { typeStyles } from "../battle/battle";
import {
  Mail as MailIcon,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
  Search,
  Zap,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  AlertTriangle,
  Biohazard,
  Flame,
  Snowflake,
  Moon,
  XCircle,
  FileText,
} from "lucide-react";

// --- BATTLE UI EFFECT COMPONENTS (Unchanged) ---
const BattleScannerRingHalf = ({
  delay,
  duration,
  mainColor,
  part,
}: {
  delay: number;
  duration: number;
  mainColor: string;
  part: "back" | "front";
}) => (
  <motion.div
    className="absolute inset-0 rounded-[50%] border-2"
    style={{
      borderColor: mainColor,
      boxShadow: `0 0 10px 1px ${mainColor}`,
      clipPath:
        part === "back"
          ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
          : "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
    }}
    initial={{ y: "10%" }}
    animate={{ y: ["10%", "-80%", "10%"] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

// --- DYNAMIC BACKGROUND & DECORATIVE ELEMENTS (Updated for Dark Mode) ---
export const AnimatedBackground = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-slate-100 dark:bg-slate-900">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "radial-gradient(circle at 25% 25%, rgba(0, 120, 255, 0.1), transparent 40%)",
          "radial-gradient(circle at 20% 30%, rgba(0, 120, 255, 0.15), transparent 40%)",
          "radial-gradient(circle at 25% 25%, rgba(0, 120, 255, 0.1), transparent 40%)",
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
    />
  </div>
);

// --- NEW & UPGRADED HELPER COMPONENTS (Updated for Dark Mode) ---

const UpgradedClippedContainer = ({
  children,
  className,
  clipPath,
  variants,
  showSheen = true,
}: {
  children: React.ReactNode;
  className?: string;
  clipPath: string;
  variants?: any;
  showSheen?: boolean;
}) => (
  <motion.div
    variants={variants}
    className={`relative overflow-hidden bg-slate-300/50 p-px dark:bg-cyan-400/20 ${className}`}
    style={{ clipPath }}
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {showSheen && (
      <motion.div
        className="absolute top-0 left-0 h-full w-12 bg-black/10 blur-md dark:bg-white/20"
        variants={{
          rest: { x: "-150%", skewX: -20 },
          hover: {
            x: "350%",
            skewX: -20,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
    )}
    <div
      className="relative h-full w-full bg-slate-100/80 backdrop-blur-sm dark:bg-slate-800/80"
      style={{ clipPath }}
    >
      {children}
    </div>
  </motion.div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative -ml-3 mb-2 w-fit bg-slate-300 p-px dark:bg-slate-700"
    style={{
      clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
    }}
  >
    <div
      className="bg-slate-200 px-3 py-0.5 dark:bg-cyan-900/50"
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
      }}
    >
      <h3 className="flex-shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-700 dark:text-cyan-300">
        {children}
      </h3>
    </div>
  </div>
);

const ActionButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  clipPath,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  clipPath: string;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`flex w-full items-center justify-center gap-2 p-px text-xs font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    style={{ clipPath }}
    {...props}
  >
    <div
      className="flex h-full w-full items-center justify-center gap-2 px-3 py-1.5"
      style={{ clipPath }}
    >
      {children}
    </div>
  </motion.button>
);

// --- (Unchanged Helper Components: TypeBadge, etc.) ---
const TypeBadge = ({
  type,
  size = "sm",
}: {
  type: string;
  size?: "sm" | "xs";
}) => {
  const style = typeStyles[type] || { bg: "bg-gray-700", text: "text-white" };
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-xs font-semibold"
      : "px-2 py-0.5 text-[9px] font-semibold";
  return (
    <span
      className={`tracking-wide ${sizeClasses} ${style.bg} ${style.text}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
    >
      {type}
    </span>
  );
};

// --- (Updated Helper Components) ---
const StatBar = ({
  label,
  value,
  maxValue = 320,
}: {
  label: string;
  value: number;
  maxValue?: number;
}) => (
  <div className="grid grid-cols-6 items-center gap-2">
    <span className="col-span-1 font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400">
      {label}
    </span>
    <div
      className="col-span-4 h-1.5 bg-slate-300 p-0.5 dark:bg-slate-900/70"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
      }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_theme(colors.cyan.500)]"
        initial={{ width: 0 }}
        animate={{ width: `${(value / maxValue) * 100}%` }}
        transition={{ duration: 0.8, ease: "circOut", delay: 0.5 }}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
        }}
      />
    </div>
    <span className="col-span-1 font-mono text-xs font-bold text-slate-900 dark:text-white">
      {value}
    </span>
  </div>
);
const statusIconMapping: { [key: string]: React.ReactNode } = {
  stun: <Zap className="h-3 w-3 text-yellow-400" />,
  poison: <Biohazard className="h-3 w-3 text-purple-400" />,
  burn: <Flame className="h-3 w-3 text-orange-400" />,
  freeze: <Snowflake className="h-3 w-3 text-blue-300" />,
  sleep: <Moon className="h-3 w-3 text-indigo-300" />,
};
const StatusEffectIcon = ({ move }: { move: Move }) => {
  if (!move.effect?.type) return null;
  const icon = statusIconMapping[move.effect.type];
  if (!icon) return null;

  return (
    <div className="group relative flex items-center">
      {icon}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded-sm border border-slate-300 bg-white p-0.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:border-cyan-400/50 dark:bg-slate-900"
        style={{
          clipPath: "polygon(0 5px, 5px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          className="bg-white px-2 py-1 text-[10px] text-slate-700 dark:bg-slate-900 dark:text-slate-300"
          style={{
            clipPath: "polygon(0 5px, 5px 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {move.effect.chance * 100}% chance to {move.effect.type} the enemy
        </div>
      </div>
    </div>
  );
};
const typeChart: { [attacker: string]: { [defender: string]: number } } = {
  AI: {
    Data: 2,
    Web: 0.5,
    Hardware: 0.5,
    Game: 2,
    Design: 1,
    Health: 1,
    Mobile: 1,
  },
  Data: {
    AI: 0.5,
    Design: 2,
    Health: 2,
    Game: 0.5,
    Web: 1,
    Hardware: 1,
    Mobile: 1,
  },
  Web: {
    Mobile: 2,
    AI: 2,
    Design: 0.5,
    Data: 0.5,
    Game: 1,
    Health: 1,
    Hardware: 1,
  },
  Design: {
    Web: 2,
    Game: 2,
    Data: 0.5,
    AI: 1,
    Hardware: 1,
    Health: 1,
    Mobile: 1,
  },
  Hardware: {
    AI: 2,
    Mobile: 2,
    Health: 0.5,
    Web: 0.5,
    Data: 1,
    Design: 1,
    Game: 1,
  },
  Health: {
    Hardware: 2,
    Game: 0.5,
    Data: 0.5,
    AI: 1,
    Web: 1,
    Design: 1,
    Mobile: 1,
  },
  Mobile: {
    Game: 2,
    Design: 2,
    Web: 0.5,
    Hardware: 0.5,
    AI: 1,
    Data: 1,
    Health: 1,
  },
  Game: {
    Health: 2,
    Data: 2,
    AI: 0.5,
    Design: 0.5,
    Mobile: 0.5,
    Web: 1,
    Hardware: 1,
  },
};
const DetailViewCornerBracket = ({ className }: { className?: string }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0.5, 1] }}
    transition={{
      duration: 1,
      delay: 0.5,
      repeat: Infinity,
      repeatType: "mirror",
    }}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute text-cyan-400 drop-shadow-[0_0_2px_currentColor] filter ${className}`}
  >
    <path
      d="M 22 2 L 2 2 L 2 22"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
  </motion.svg>
);
const MoveStatChip = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div
    className="bg-slate-300/70 p-px dark:bg-slate-900/70"
    style={{
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
    }}
  >
    <div
      className="bg-slate-200/80 px-1.5 py-0.5 dark:bg-slate-800/80"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
      }}
    >
      <div className="flex items-baseline justify-between gap-1">
        <span className="font-mono text-[8px] font-bold text-cyan-600/80 dark:text-cyan-400/80">
          {label}
        </span>
        <span className="font-mono text-[10px] font-semibold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>
    </div>
  </div>
);

// --- POKEDEX & DETAIL VIEW ---
const MonDetailView = ({
  mon,
  onTeamSelect,
  isSelectedOnTeam,
  isTeamFull,
}: {
  mon: PortfolioMon;
  onTeamSelect: (mon: PortfolioMon) => void;
  isSelectedOnTeam: boolean;
  isTeamFull: boolean;
}) => {
  const buttonDisabled = isTeamFull && !isSelectedOnTeam;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const mainColor = "#00dcff";
  const platformColor = "rgba(0, 220, 255,";

  const offensiveMatchups = { superEffective: new Set<string>() };
  new Set(mon.moves.map((m) => m.type)).forEach((moveType) => {
    Object.keys(typeChart).forEach((defendingType) => {
      if ((typeChart[moveType]?.[defendingType] ?? 1) > 1)
        offensiveMatchups.superEffective.add(defendingType);
    });
  });

  const defensiveMatchups = {
    weaknesses: new Set<string>(),
    resistances: new Set<string>(),
  };
  Object.keys(typeChart).forEach((attackingType) => {
    const mult1 = typeChart[attackingType]?.[mon.type1] ?? 1;
    const mult2 = mon.type2 ? typeChart[attackingType]?.[mon.type2] ?? 1 : 1;
    const finalMultiplier = mult1 * mult2;
    if (finalMultiplier > 1) defensiveMatchups.weaknesses.add(attackingType);
    if (finalMultiplier < 1) defensiveMatchups.resistances.add(attackingType);
  });

  const mainPanelClipPath =
    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))";

  return (
    <motion.div
      key={mon.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="relative flex h-full flex-col gap-3 p-3"
    >
      <div className="absolute inset-0 bg-slate-200/40 dark:bg-slate-900/40" />
      <motion.div
        variants={itemVariants}
        className="relative flex h-64 flex-shrink-0 items-center justify-center overflow-hidden bg-cyan-400/20 p-px"
        style={{ clipPath: mainPanelClipPath }}
      >
        <div
          className="relative h-full w-full bg-white/50 p-4 dark:bg-slate-900/50"
          style={{ clipPath: mainPanelClipPath }}
        >
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px bg-cyan-300/70 shadow-[0_0_10px_theme(colors.cyan.300)]"
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <DetailViewCornerBracket className="top-1 left-1" />
          <DetailViewCornerBracket className="bottom-1 right-1 scale-x-[-1] scale-y-[-1]" />
          <div className="absolute -bottom-4 right-0 font-mono text-[10rem] font-black leading-none text-slate-300/60 dark:text-slate-700/60">
            {String(mon.id).padStart(3, "0")}
          </div>
          <div className="absolute left-0 h-full w-full">
            <div className="relative h-full w-full [perspective:1000px]">
              <div
                className="absolute inset-0 mt-40 [transform-style:preserve-3d]"
                style={{ transform: "rotateX(45deg)" }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 rounded-[50%] bg-black blur-xl"
                />
                <div
                  className="absolute inset-0 rounded-[50%]"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${platformColor}0.3) 0%, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-[50%] opacity-30 mix-blend-color-dodge"
                  style={{
                    backgroundImage: `linear-gradient(${platformColor}0.3) 1px, transparent 1px), linear-gradient(90deg, ${platformColor}0.3) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <BattleScannerRingHalf
                    part="back"
                    duration={3}
                    delay={0}
                    mainColor={mainColor}
                  />
                  <BattleScannerRingHalf
                    part="back"
                    duration={2.5}
                    delay={0.5}
                    mainColor={mainColor}
                  />
                  <BattleScannerRingHalf
                    part="back"
                    duration={3.5}
                    delay={1}
                    mainColor={mainColor}
                  />
                </motion.div>
              </div>
              <motion.div
                className="relative z-10 h-56 w-full drop-shadow-[0_10px_30px_rgba(0,220,255,0.35)]"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={mon.image}
                  alt={mon.name}
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
              <div
                className="absolute inset-0 z-20 mt-40 [transform-style:preserve-3d]"
                style={{ transform: "rotateX(45deg)" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <BattleScannerRingHalf
                    part="front"
                    duration={3}
                    delay={0}
                    mainColor={mainColor}
                  />
                  <BattleScannerRingHalf
                    part="front"
                    duration={2.5}
                    delay={0.5}
                    mainColor={mainColor}
                  />
                  <BattleScannerRingHalf
                    part="front"
                    duration={3.5}
                    delay={1}
                    mainColor={mainColor}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute top-3 left-4 z-40">
            <h2 className="text-2xl font-black tracking-tighter text-cyan-500 [text-shadow:2px_2px_4px_rgba(255,255,255,0.3)] dark:text-white dark:[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
              {mon.name}
            </h2>
            <span className="font-mono text-base font-bold text-slate-600 [text-shadow:1px_1px_2px_rgba(255,255,255,0.2)] dark:text-slate-400 dark:[text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
              No.{String(mon.id).padStart(3, "0")}
            </span>
          </div>
          <div className="absolute top-3 right-8 z-40 flex gap-2">
            <TypeBadge type={mon.type1} size="sm" />
            {mon.type2 && <TypeBadge type={mon.type2} size="sm" />}
          </div>
        </div>
      </motion.div>
      <div className="flex min-h-0 flex-grow gap-3">
        <div className="flex w-1/2 flex-col gap-3">
          <UpgradedClippedContainer
            variants={itemVariants}
            clipPath="polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)"
          >
            <div className="p-2.5">
              <SectionHeader>Data Entry</SectionHeader>
              <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                {mon.description}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-300 pt-2 dark:border-slate-700">
                <Link href={mon.url} passHref legacyBehavior>
                  <ActionButton
                    as="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500/80 hover:bg-orange-500/100"
                    clipPath="polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </ActionButton>
                </Link>
                <ActionButton
                  onClick={() => onTeamSelect(mon)}
                  disabled={buttonDisabled}
                  className={
                    isSelectedOnTeam
                      ? "bg-red-600/80 hover:bg-red-500/100"
                      : "bg-green-600/80 hover:bg-green-500/100"
                  }
                  clipPath="polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)"
                >
                  {isSelectedOnTeam ? "Remove" : "Add"}
                  {isSelectedOnTeam ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                </ActionButton>
              </div>
            </div>
          </UpgradedClippedContainer>
          <UpgradedClippedContainer
            variants={itemVariants}
            clipPath="polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
          >
            <div className="p-2.5">
              <SectionHeader>Base Stats</SectionHeader>
              <div className="flex flex-col justify-center space-y-1">
                <StatBar label="HP" value={mon.stats.hp} />
                <StatBar label="ATK" value={mon.stats.atk} maxValue={150} />
                <StatBar label="DEF" value={mon.stats.def} maxValue={150} />
                <StatBar label="SPD" value={mon.stats.spd} maxValue={150} />
              </div>
            </div>
          </UpgradedClippedContainer>
          <UpgradedClippedContainer
            variants={itemVariants}
            className="flex-1"
            clipPath="polygon(0 12px, 12px 0, 100% 0, 100% 100%, 0 100%)"
          >
            <div className="flex h-full flex-col p-2.5">
              <SectionHeader>Type Matchups</SectionHeader>
              <div className="flex flex-grow flex-col justify-around gap-1 text-xs">
                <div className="flex items-start gap-2">
                  <Sparkles
                    title="Super-effective against"
                    className="mt-0.5 h-3 w-3 flex-shrink-0 text-cyan-400"
                  />
                  <div className="flex flex-wrap gap-1">
                    {[...offensiveMatchups.superEffective].map((t) => (
                      <TypeBadge key={t} type={t} size="xs" />
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    title="Weak against"
                    className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-400"
                  />
                  <div className="flex flex-wrap gap-1">
                    {[...defensiveMatchups.weaknesses].map((t) => (
                      <TypeBadge key={t} type={t} size="xs" />
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    title="Resistant to"
                    className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-400"
                  />
                  <div className="flex flex-wrap gap-1">
                    {[...defensiveMatchups.resistances].map((t) => (
                      <TypeBadge key={t} type={t} size="xs" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </UpgradedClippedContainer>
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <UpgradedClippedContainer
            variants={itemVariants}
            className="flex-1"
            clipPath="polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)"
          >
            <div className="flex h-full flex-col p-2.5">
              <SectionHeader>Moveset</SectionHeader>
              <div className="flex flex-grow flex-col gap-2">
                {mon.moves.map((move) => {
                  const bgClass = typeStyles[move.type].bg || "bg-slate-700";
                  const clipPath =
                    "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)";

                  return (
                    <div
                      key={move.name}
                      className={`group flex-1 p-px transition-all duration-300 ${bgClass} hover:brightness-110`}
                      style={{ clipPath }}
                    >
                      <div
                        className={`relative flex h-full w-full flex-col justify-between p-1.5 ${bgClass}`}
                        style={{ clipPath }}
                      >
                        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <p className="text-xs font-bold text-white">
                              {move.name}
                            </p>
                            <div className="flex flex-shrink-0 items-center gap-2">
                              <div className="flex items-center gap-1 text-[10px]">
                                <StatusEffectIcon move={move} />
                                {move.effect?.chance && (
                                  <span className="text-[10px]">
                                    {move.effect?.chance * 100}%
                                  </span>
                                )}
                              </div>
                              <TypeBadge type={move.type} size="xs" />
                            </div>
                          </div>
                          <p className="my-1 text-[11px] leading-tight text-slate-300">
                            {move.description}
                          </p>
                          <div className="mt-auto grid grid-cols-4 gap-1.5 pt-1">
                            <MoveStatChip
                              label="PWR"
                              value={move.power || "—"}
                            />
                            <MoveStatChip
                              label="ACC"
                              value={`${move.accuracy * 100}%`}
                            />
                            <MoveStatChip
                              label="CRIT"
                              value={`${move.critChance * 100}%`}
                            />
                            <MoveStatChip label="PP" value={move.pp} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </UpgradedClippedContainer>
        </div>
      </div>
    </motion.div>
  );
};

// --- (Unchanged Decorative Components) ---
export const PulsingCircuit = () => {
  const SvgLine = ({
    path,
    duration,
    delay,
  }: {
    path: string;
    duration: number;
    delay: number;
  }) => (
    <>
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.1"
      />
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: "drop-shadow(0 0 3px currentColor)",
        }}
      />
    </>
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 1440 128"
        className="text-cyan-500 dark:text-cyan-400"
      >
        <SvgLine
          path="M-10 110 h220 l20-20 h150 l20 20 h200 l20-20 h100 v-30 h120 l20 20 h200"
          duration={7}
          delay={0}
        />
        <SvgLine
          path="M300 90 l20 20 h100 l-20 20 h200 l20-20 h80 v-40 h-50 l-20-20"
          duration={5}
          delay={0.8}
        />
        <SvgLine
          path="M1450 60 h-250 l-20 20 h-150 l-20-20 h-100 v-30"
          duration={8}
          delay={0.4}
        />
        <SvgLine
          path="M800 110 l-20-20 h-100 l20-20 h-50 v40 l50 20 h100"
          duration={4}
          delay={1.2}
        />
      </svg>
    </div>
  );
};
export const HighTechEffects = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 h-1/3 w-full"
      style={{
        background:
          "linear-gradient(to bottom, rgba(6, 182, 212, 0.15), transparent)",
      }}
      animate={{ y: ["-100%", "300%"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
    />
  </div>
);
const AnimatedCircuitry = () => (
  <svg
    className="pointer-events-none absolute inset-0 z-0 h-full w-full text-cyan-400/10"
    fill="none"
  >
    <motion.path
      d="M-3,58.5V25.5C-3,24.9477,-2.55228,24.5,-2,24.5H1.5C2.05228,24.5,2.5,24.9477,2.5,25.5V107.5C2.5,108.052,2.05228,108.5,1.5,108.5H-2C-2.55228,108.5,-3,108.052,-3,107.5V91.5M10.5,91.5V16M38.5,16V91.5M66.5,91.5V16M10.5,53.5H38.5M24.5,16V1M66.5,53.5H94.5M122.5,53.5H150.5M178.5,53.5H206.5M234.5,53.5H262.5M290.5,53.5H318.5M346.5,53.5H374.5M374.5,16V91.5M346.5,16V91.5M318.5,91.5V16M290.5,91.5V16M262.5,16V91.5M234.5,16V91.5M206.5,91.5V16M178.5,91.5V16M150.5,16V91.5M122.5,16V91.5M94.5,91.5V16"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
    />
  </svg>
);
const workExperience = [
  {
    role: "Founding Engineer",
    company: "Ketspen - Game-Changing Agentic Research",
    date: "Jun 2025 – Present",
    description: "Building MVP for an end-to-end, agentic research workflow.",
  },
  {
    role: "Software Development Engineer Intern – FBA Inventory",
    company: "Amazon",
    date: "May 2025 - Aug 2025",
    description:
      "Built internal APIs for FBA inventory workflows, improving response time by 37% and refactoring a reconciliation pipeline to reduce technical debt.",
  },

  {
    role: "Software Engineering Intern – Core Products (DT-CADEA)",
    company: "Bloomberg L.P.",
    date: "Summer 2024",
    description:
      "Developed a Random Forest ML model to classify corporate filings, accelerating classification by 55%. Engineered high-uptime JIRA workflow tools.",
  },
  {
    role: "AI Research Intern – NLP & Intelligent Agents",
    company: "AT&T Labs Research",
    date: "Fall 2023",
    description:
      "Designed autonomous agents with Mixture-of-Experts LLMs to parse enterprise documents, reducing analysis time by 85%.",
  },
  {
    role: "Software Engineering Intern – Financial Instruments (DT-FI)",
    company: "Bloomberg L.P.",
    date: "Summer 2023",
    description:
      "Built a real-time market feed platform using Next.js to track treasury bonds, improving remediation speed by 4x and enhancing UI/backend stability.",
  },

  {
    role: "Full Stack Software Engineer",
    company: "Johns Hopkins University – UCredit.me",
    date: "Fall 2022",
    description:
      "Built a responsive full-stack course selection platform using React and AWS Lambda for 6k+ students in a CI/CD environment.",
  },
];
const TimelineItem = ({
  role,
  company,
  date,
  description,
  isLast,
}: {
  role: string;
  company: string;
  date: string;
  description: string;
  isLast: boolean;
}) => (
  <div className="relative pl-6 pb-4">
    {!isLast && (
      <div className="absolute top-2 left-[5px] h-full w-0.5 bg-slate-300 dark:bg-cyan-400/20"></div>
    )}
    <div className="absolute top-2 left-0 h-3 w-3 rounded-full border-2 border-cyan-500 bg-white dark:border-cyan-400 dark:bg-slate-800"></div>
    <p className="text-sm font-bold text-slate-900 dark:text-white">{role}</p>
    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
      {company}
    </p>
    <p className="mt-0.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
      {date}
    </p>
    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
      {description}
    </p>
  </div>
);

// --- NEW HELPER COMPONENTS FOR DEPLOY TEAM SECTION ---

const TargetingReticule = () => (
  <motion.svg
    className="pointer-events-none absolute inset-0 h-full w-full text-cyan-500/50 dark:text-cyan-400/50"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: 360 }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
  >
    <path
      d="M50,2 A 48,48 0 0 1 98,50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M50,98 A 48,48 0 0 1 2,50"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeOpacity="0.5" />
  </motion.svg>
);

const EnergyFlowLine = ({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}) => {
  const path = `M ${x1} ${y1} L ${x2} ${y2}`;
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <path
        d={path}
        stroke="url(#energyGradient)"
        strokeWidth="4"
        strokeOpacity="0.3"
        fill="none"
        style={{ filter: "blur(3px)" }}
      />
      <path
        d={path}
        stroke="rgba(100, 220, 255, 0.3)"
        strokeWidth="1"
        fill="none"
      />
      <motion.path
        d={path}
        stroke="url(#energyGradient)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -12 }}
        transition={{
          duration: 1,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "drop-shadow(0 0 3px rgba(0, 220, 255, 0.8))",
        }}
      />
    </motion.g>
  );
};

// --- Trainer Info Panel ---
const TrainerInfoPanel = ({
  playerTeam,
  onEnter,
  onRandomTeam,
}: {
  playerTeam: PortfolioMon[];
  onEnter: () => void;
  onRandomTeam: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [lineCoords, setLineCoords] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    slotRefs.current = slotRefs.current.slice(0, 3);

    const calculateLines = () => {
      if (!gridRef.current || playerTeam.length < 2) {
        setLineCoords([]);
        return;
      }

      const gridRect = gridRef.current.getBoundingClientRect();
      const coords = slotRefs.current
        .slice(0, playerTeam.length)
        .map((el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left - gridRect.left + rect.width / 2,
            y: rect.top - gridRect.top + rect.height / 2,
          };
        })
        .filter((c): c is { x: number; y: number } => c !== null);

      const newLines = [];
      for (let i = 0; i < coords.length - 1; i++) {
        if (coords[i] && coords[i + 1]) {
          newLines.push({
            x1: coords[i].x,
            y1: coords[i].y,
            x2: coords[i + 1].x,
            y2: coords[i + 1].y,
          });
        }
      }
      setLineCoords(newLines);
    };
    calculateLines();
    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, [playerTeam.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const springConfig = { stiffness: 200, damping: 30 };
  const rotateX = useSpring(
    useTransform(mouseY, [-400, 400], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-250, 250], [-10, 10]),
    springConfig
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
  };

  const popoutVariants = {
    hidden: { x: "-100%", opacity: 0.5 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imagePanelClipPath =
    "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)";
  const innerImageClipPath =
    "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)";

  const teamSlots = [...Array(3)].map((_, i) => playerTeam[i] || null);

  return (
    <motion.aside
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative z-20 col-span-12 flex h-full flex-col overflow-visible border-r border-slate-300 bg-white [perspective:1000px] dark:border-cyan-400/20 dark:bg-slate-900 lg:col-span-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-30 flex h-full flex-col gap-4 overflow-hidden p-4 pb-4">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,220,255,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(0,220,255,0.15),transparent_40%)]" />
          <AnimatedCircuitry />
        </div>
        <div className="relative z-10 flex flex-grow flex-col gap-4">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              clipPath: imagePanelClipPath,
            }}
            className="dark:shadow-slate-950/40 relative h-full w-full bg-cyan-400/20 p-px shadow-xl shadow-slate-300/40"
          >
            <div
              className="relative h-full w-full bg-slate-100/50 p-4 dark:bg-slate-800/50"
              style={{ clipPath: imagePanelClipPath }}
            >
              <div
                className="absolute inset-2 overflow-hidden"
                style={{ clipPath: innerImageClipPath }}
              >
                <Image
                  src="/images/kevin_sidebar.png"
                  fill
                  alt="Kevin Liu"
                  className="scale-110 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-slate-900/70" />
              </div>
              <div className="relative flex h-full flex-col justify-between [transform:translateZ(20px)]">
                <div>
                  <p className="font-mono text-xs text-cyan-600 [text-shadow:1px_1px_3px_rgba(255,255,255,0.5)] dark:text-cyan-300 dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
                    PRINCETON
                  </p>
                  <p className="font-mono text-xs text-cyan-600 [text-shadow:1px_1px_3px_rgba(255,255,255,0.5)] dark:text-cyan-300 dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
                    5/27/2024
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black tracking-tighter text-black [text-shadow:1px_1px_3px_rgba(255,255,255,0.5)] dark:text-white dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">
                    KEVIN LIU
                  </p>
                  <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400">
                    Full-Stack & AI Developer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-3">
            <UpgradedClippedContainer
              className="flex-shrink-0"
              clipPath="polygon(12px 0px, 100% 0px, 100% 100%, 0% 100%, 0px 12px)"
            >
              <div className="flex items-center justify-center gap-4 p-2.5">
                <Link
                  href="https://www.linkedin.com/in/kevin-liu-2495b6205/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/images/linkedin.svg"
                    className="h-5 w-5 dark:invert"
                    alt="Linkedin"
                  />
                </Link>
                <Link
                  href="https://github.com/Kevin-Liu-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/images/github.svg"
                    className="h-5 w-5 dark:invert"
                    alt="GitHub"
                  />
                </Link>
                <Link
                  href="mailto:k.bowen.liu@gmail.com"
                  className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  <MailIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://devpost.com/Kevin-Liu-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/images/devpost.svg"
                    className="h-5 w-5 dark:invert"
                    alt="Devpost"
                  />
                </Link>
              </div>
            </UpgradedClippedContainer>
            <UpgradedClippedContainer clipPath="polygon(0px 0px, 100% 0px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0px 100%)">
              <div className="space-y-2 p-3">
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <BrainCircuit className="h-4 w-4 flex-shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <span>{"Princeton University '28, B.S.E. in CS"}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                  I build digital experiences at the intersection of robust
                  engineering and intelligent design. This portfolio game is a
                  showcase of my passion. Have fun!
                </p>
              </div>
            </UpgradedClippedContainer>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-auto flex flex-col gap-4"
        >
          <UpgradedClippedContainer
            className="flex-shrink-0"
            clipPath="polygon(16px 0px, 100% 0px, 100% 100%, 0px 100%, 0px 16px)"
          >
            <div className="p-3">
              <SectionHeader>Deploy Team</SectionHeader>
              <div ref={gridRef} className="relative mt-2">
                <svg
                  className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="energyGradient"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#67e8f9" />
                    </linearGradient>
                  </defs>
                  <AnimatePresence>
                    {lineCoords.map((line, index) => (
                      <EnergyFlowLine
                        key={index}
                        {...line}
                        delay={index * 0.2}
                      />
                    ))}
                  </AnimatePresence>
                </svg>
                <div className="grid grid-cols-3 gap-3">
                  {teamSlots.map((mon, index) => (
                    <div
                      key={mon?.id || `empty-${index}`}
                      ref={(el) => (slotRefs.current[index] = el)}
                      className="relative z-10 mx-auto h-16 w-16"
                    >
                      <TargetingReticule />
                      <AnimatePresence>
                        {mon ? (
                          <motion.div
                            key={mon.id}
                            layoutId={`team-slot-${mon.id}`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                            className="absolute inset-0 cursor-pointer rounded-full bg-cyan-500/20 p-1 shadow-[0_0_15px_theme(colors.cyan.500)]"
                          >
                            <Image
                              src={mon.image}
                              alt={mon.name}
                              fill
                              className="object-contain p-1"
                            />
                          </motion.div>
                        ) : (
                          <motion.div
                            key={`empty-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="h-full w-full rounded-full border-2 border-slate-300 bg-slate-200/50 dark:border-slate-700 dark:bg-slate-800/50"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <motion.button
                  onClick={onRandomTeam}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 0px 25px rgba(168, 85, 247, 0.7)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg"
                  style={{
                    clipPath:
                      "polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
                  }}
                >
                  <Zap className="h-4 w-4" /> Random Team
                </motion.button>
                <motion.button
                  onClick={onEnter}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 0px 25px rgba(34, 211, 238, 0.7)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={playerTeam.length < 3}
                  className="inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 disabled:opacity-50"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                  }}
                >
                  Let&apos;s Battle! <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </UpgradedClippedContainer>
        </motion.div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-sidebar"
            variants={popoutVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-full z-20 h-full w-80 overflow-hidden border-r border-slate-300 bg-white dark:border-cyan-400/20 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,220,255,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(0,220,255,0.15),transparent_40%)]" />
              <AnimatedCircuitry />
            </div>
            <div className="custom-scrollbar relative z-10 flex h-full flex-col gap-6 overflow-y-auto p-4">
              <div>
                <SectionHeader>Work Experience</SectionHeader>
                <div className="mt-2 flex flex-col">
                  {workExperience.map((item, index) => (
                    <TimelineItem
                      key={item.company}
                      {...item}
                      isLast={index === workExperience.length - 1}
                    />
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader>Education</SectionHeader>
                <div className="mt-2 flex flex-col">
                  <TimelineItem
                    role="Undergraduate Student"
                    company="Princeton University"
                    date="Expected Graduation: 2028"
                    description="Pursuing a B.S.E. in Computer Science"
                    isLast={false}
                  />
                  <TimelineItem
                    role="Student"
                    company="High Technology High School"
                    date="Graduated "
                    description="Graduated with Honors"
                    isLast={true}
                  />
                </div>
              </div>
              <div className="mt-auto">
                <SectionHeader>Documents</SectionHeader>
                <a
                  href="/kevin_liu_resume_25.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <UpgradedClippedContainer
                    className="mt-2"
                    clipPath="polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)"
                  >
                    <div className="flex w-full items-center justify-center gap-3 px-4 py-2 text-sm font-bold text-cyan-600 transition-colors group-hover:bg-cyan-100 group-hover:text-cyan-800 dark:text-cyan-400 dark:group-hover:bg-cyan-900/40 dark:group-hover:text-white">
                      <FileText className="h-4 w-4" />
                      View Full CV / Resume
                    </div>
                  </UpgradedClippedContainer>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

const MonGridItem = ({
  mon,
  onClick,
  onTeamSelect,
  isSelected,
  isOnTeam,
  isTeamFull,
}: {
  mon: PortfolioMon;
  onClick: () => void;
  onTeamSelect: (mon: PortfolioMon) => void;
  isSelected: boolean;
  isOnTeam: boolean;
  isTeamFull: boolean;
}) => {
  const buttonDisabled = isTeamFull && !isOnTeam;

  return (
    <motion.div
      layout="position"
      className={`group relative w-full overflow-hidden p-px text-left transition-all duration-200 ${
        isSelected
          ? "bg-cyan-400 shadow-[0_0_15px_theme(colors.cyan.400)]"
          : "bg-cyan-400/20 hover:bg-cyan-400/40"
      }`}
      style={{
        clipPath:
          "polygon(0 12px, 12px 0, 100% 0, 100% 100%, 12px 100%, 0 100%)",
      }}
    >
      <button
        onClick={onClick}
        className="h-full w-full bg-slate-200/80 p-2 dark:bg-slate-800/80"
        style={{
          clipPath:
            "polygon(0 12px, 12px 0, 100% 0, 100% 100%, 12px 100%, 0 100%)",
        }}
      >
        {isOnTeam && (
          <CheckCircle2 className="absolute top-2 left-2 z-20 h-4 w-4 text-green-400 drop-shadow-[0_0_2px_currentColor]" />
        )}
        <div className="pointer-events-none absolute -bottom-2 -right-2 z-0 font-mono text-5xl font-black text-slate-900/5 dark:text-white/5">
          {String(mon.id).padStart(3, "0")}
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative h-10 w-12 flex-shrink-0">
            <Image
              src={mon.image}
              alt={mon.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {mon.name}
            </p>
            <div className="mt-1 flex gap-1">
              <TypeBadge type={mon.type1} size="xs" />
              {mon.type2 && <TypeBadge type={mon.type2} size="xs" />}
            </div>
          </div>
        </div>
        <span className="absolute top-1 right-2 z-10 font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
          No.{String(mon.id).padStart(3, "0")}
        </span>
      </button>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onTeamSelect(mon);
        }}
        disabled={buttonDisabled}
        className={`absolute bottom-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full transition-all group-hover:opacity-100 ${
          isOnTeam
            ? "bg-red-500 text-white opacity-100"
            : "bg-green-500 text-white opacity-0"
        } disabled:cursor-not-allowed disabled:bg-slate-600 disabled:opacity-0`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOnTeam ? (
          <XCircle className="h-4 w-4" />
        ) : (
          <PlusCircle className="h-4 w-4" />
        )}
      </motion.button>
    </motion.div>
  );
};

// --- PRIMARY UI ---
export const TeamSelectScreen = () => {
  const { playerTeam, handleTeamSelect, handleConfirmTeam } = useGame();
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const selectedMon = portfolioMonData.find((m) => m.id === selectedId);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRandomTeam = () => {
    const shuffled = [...portfolioMonData].sort(() => 0.5 - Math.random());
    const newTeam = shuffled.slice(0, 3);

    const newTeamIds = new Set(newTeam.map((m) => m.id));
    const currentTeamIds = new Set(playerTeam.map((m) => m.id));

    const toRemove = playerTeam.filter((m) => !newTeamIds.has(m.id));
    const toAdd = newTeam.filter((m) => !currentTeamIds.has(m.id));

    toRemove.forEach((mon) => handleTeamSelect(mon));
    toAdd.forEach((mon) => handleTeamSelect(mon));
  };

  const filteredMons = portfolioMonData.filter(
    (mon) =>
      mon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mon.type1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mon.type2?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 20px;
          border: 2px solid #f1f5f9; /* slate-100 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; /* slate-400 */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #0891b2; /* cyan-600 */
          border: 2px solid #0f172a; /* slate-900 */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #06b6d4; /* cyan-500 */
        }
      `}</style>
      <AnimatedBackground />
      <HighTechEffects />
      <div className="z-10 grid min-h-0 flex-grow grid-cols-12">
        <TrainerInfoPanel
          playerTeam={playerTeam}
          onEnter={handleConfirmTeam}
          onRandomTeam={handleRandomTeam}
        />
        <main className="relative col-span-12 flex min-h-0 flex-col lg:col-span-9 lg:grid lg:grid-cols-9">
          <aside className="flex min-h-0 flex-col border-r border-slate-300 dark:border-cyan-400/20 lg:col-span-4">
            <div className="flex-shrink-0 p-4">
              <div
                className="group relative bg-cyan-400/20 p-px transition-colors duration-300 focus-within:bg-cyan-400 focus-within:shadow-[0_0_15px_theme(colors.cyan.400)]"
                style={{
                  clipPath:
                    "polygon(0 10px, 10px 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="relative bg-white/80 dark:bg-slate-800/80"
                  style={{
                    clipPath:
                      "polygon(0 10px, 10px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-cyan-600 dark:text-slate-500 dark:group-focus-within:text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search Projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
            <div className="custom-scrollbar flex-grow overflow-y-auto p-4 pt-0 pb-24">
              <motion.div
                layout
                className="grid grid-cols-1 gap-2 xl:grid-cols-2"
              >
                {filteredMons.map((mon) => (
                  <MonGridItem
                    key={mon.id}
                    mon={mon}
                    onClick={() => setSelectedId(mon.id)}
                    onTeamSelect={handleTeamSelect}
                    isSelected={selectedId === mon.id}
                    isOnTeam={!!playerTeam.find((p) => p.id === mon.id)}
                    isTeamFull={playerTeam.length >= 3}
                  />
                ))}
              </motion.div>
            </div>
          </aside>
          <div className="custom-scrollbar relative h-full overflow-y-auto lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedMon ? (
                <MonDetailView
                  key={selectedMon.id}
                  mon={selectedMon}
                  onTeamSelect={handleTeamSelect}
                  isSelectedOnTeam={
                    !!playerTeam.find((p) => p.id === selectedMon.id)
                  }
                  isTeamFull={playerTeam.length >= 3}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4">
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Select a project to view details.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
