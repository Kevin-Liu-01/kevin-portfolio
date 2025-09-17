import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Star,
  Zap,
  Sparkles,
  Flame,
  AlertTriangle,
  ArrowRightLeft,
  XCircle,
  BookOpen,
  ShoppingBag,
  ArrowLeft,
  X,
  BedDouble,
  Bubbles,
} from "lucide-react";
import type {
  BattleReadyMon,
  BattleReadyMove,
  StatusEffect,
  AnimationState,
  TrainerState,
  DialogueState,
  PlayerInventory,
  Item,
  NotificationType,
  ActionState,
} from "../../context/gameContext";
import {
  statusEffectStyles,
  statusEffectIcons,
  getTypeEffectiveness as importedGetTypeEffectiveness,
} from "../../context/gameContext";
import {
  GuideModal,
  BackgroundEffects,
  InfoBox,
  ForcedSwitchScreen,
  ActionButton,
  TypeBadge,
  typeStyles,
} from "./battle";

// --- IMPROVED INLINE COMPONENT: ItemMenu ---
const ItemMenu = ({
  inventory,
  onItemSelect,
  onCancel,
}: {
  inventory: PlayerInventory;
  onItemSelect: (item: Item) => void;
  onCancel: () => void;
}) => {
  const hasItems = Object.values(inventory).some(
    (invItem) => invItem.quantity > 0
  );

  return (
    <motion.div
      key="items"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex h-full flex-col overflow-auto"
    >
      <div className="flex flex-shrink-0 items-center justify-between pb-2">
        <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-300">
          Inventory
        </h2>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Moves
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {hasItems ? (
          <div className="grid grid-cols-1 gap-2">
            {Object.values(inventory)
              .filter(({ quantity }) => quantity > 0)
              .map(({ item, quantity }) => (
                <motion.button
                  layout
                  key={item.name}
                  onClick={() => onItemSelect(item)}
                  className="w-full bg-slate-700 p-0.5 pl-2 text-left transition-colors hover:bg-cyan-400"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="bg-slate-900/80 p-2"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-xs text-slate-400">
                          {item.description}
                        </p>
                      </div>
                      <p className="flex-shrink-0 pl-4 font-mono text-lg font-bold text-cyan-300">
                        x{quantity}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500">No items available.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- NEW INLINE COMPONENT: SwitchItemView ---
const SwitchItemView = ({
  onCancel,
  title,
}: {
  onCancel: () => void;
  title: string;
}) => (
  <motion.div
    key="switch-item-view"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="flex h-full flex-col items-center justify-center text-center"
  >
    <p className="text-lg font-semibold text-white">{title}</p>
    <p className="text-sm text-slate-400">
      Select a Project from the list on the left.
    </p>
    <button
      onClick={onCancel}
      className="mt-4 flex items-center gap-2 rounded-full bg-red-600/80 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-500"
    >
      <ArrowLeft className="h-4 w-4" /> Cancel
    </button>
  </motion.div>
);

const StatusIcon = ({
  status,
  size = "md",
}: {
  status: StatusEffect;
  size?: "sm" | "md";
}) => {
  if (!status) return null;

  const styles: {
    [key in StatusEffect & string]: { icon: JSX.Element; className: string };
  } = {
    burn: {
      icon: <Flame className="h-full w-full" />,
      className: "bg-orange-500 text-white",
    },
    poison: {
      icon: <Bubbles className="h-full w-full" />,
      className: "bg-purple-600 text-white",
    },
    sleep: {
      icon: <BedDouble className="h-full w-full" />,
      className: "bg-gray-400 text-black",
    },
    stun: {
      icon: <Zap className="h-full w-full" />,
      className: "bg-yellow-400 text-black",
    },
  };

  const style = styles[status];
  const containerSizeClasses = size === "md" ? "h-6 w-6" : "h-5 w-5";
  const iconSizeClasses = size === "md" ? "h-4 w-4" : "h-3 w-3";

  return (
    <div
      title={status.charAt(0).toUpperCase() + status.slice(1)}
      className={`flex flex-shrink-0 items-center justify-center shadow-md ${style.className} ${containerSizeClasses}`}
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      <div className={iconSizeClasses}>{style.icon}</div>
    </div>
  );
};

// --- IMPROVED STATUS EFFECT ANIMATIONS ---
const StatusEffectDisplay = ({ status }: { status: StatusEffect }) => {
  if (!status) return null;
  const effects: { [key in StatusEffect & string]: JSX.Element } = {
    burn: (
      <>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 h-4 w-2 rounded-full bg-orange-500"
            style={{
              left: `${Math.random() * 90 + 5}%`, // Random horizontal position
              boxShadow: "0 0 10px 4px #f97316",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -60, -80], // Rise higher
              opacity: [1, 0.5, 0],
              scaleY: [1, 2, 0.5],
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.8, // Random duration
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </>
    ),
    poison: (
      <>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-[5%] h-5 w-5 rounded-full border-2 border-green-300 bg-purple-600/60"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              scale: Math.random() * 0.6 + 0.5,
            }}
            animate={{
              y: [0, -80],
              opacity: [0.9, 0],
              scale: [1, 0.5], // Shrink as it rises
            }}
            transition={{
              duration: Math.random() * 1 + 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeIn",
            }}
          />
        ))}
      </>
    ),
    sleep: (
      <>
        {[...Array(3)].map((_, i) => (
          <motion.p
            key={i}
            className="absolute top-1/2 left-1/2 text-4xl font-black text-slate-400/80"
            style={{
              originX: `${Math.random() * 40 - 20}%`, // Randomize horizontal origin for drift
            }}
            animate={{
              y: [0, -60],
              x: [0, Math.random() * 40 - 20],
              opacity: [1, 0],
              scale: [0.5, 1.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          >
            Z
          </motion.p>
        ))}
      </>
    ),
    stun: (
      <>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-8 bg-yellow-300"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              rotate: Math.random() * 180,
              boxShadow: "0 0 10px 2px #facc15",
            }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              scaleX: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 1,
              delay: Math.random(),
              ease: "easeInOut",
            }}
          />
        ))}
      </>
    ),
  };
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {effects[status]}
    </div>
  );
};

// --- BATTLE UI SUB-COMPONENTS ---

const ScannerRing = ({
  delay,
  duration,
  isThin = false,
  mainColor,
}: {
  delay: number;
  duration: number;
  isThin?: boolean;
  mainColor: string;
}) => (
  <motion.div
    className={`absolute inset-0 rounded-[50%] ${
      isThin ? "border" : "border-2"
    }`}
    style={{
      borderColor: mainColor,
      boxShadow: `0 0 10px 1px ${mainColor}`,
      opacity: isThin ? 0.5 : 1,
    }}
    initial={{ y: "10%" }}
    animate={{ y: ["10%", "-80%", "10%"] }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GeometricBurst = () => (
  <>
    {[...Array(12)].map((_, i) => {
      const angle = (i / 12) * 360;
      const distance = 50 + Math.random() * 30;
      return (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-3 w-1 bg-yellow-300"
          style={{
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            rotate: angle + 90,
            origin: "center center",
          }}
          animate={{
            x: [0, Math.cos((angle * Math.PI) / 180) * distance],
            y: [0, Math.sin((angle * Math.PI) / 180) * distance],
            opacity: [1, 0],
            scale: [1, 0.5],
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      );
    })}
  </>
);

const PlatformEffects = ({
  isPlayer,
  animationState,
  part,
}: {
  isPlayer: boolean;
  animationState: AnimationState;
  part: "back" | "front";
}) => {
  const platformColor = isPlayer ? "rgba(0, 220, 255," : "rgba(255, 80, 80,";
  const mainColor = isPlayer ? "#00dcff" : "#ff5050";

  const shadowVariants = {
    idle: { scale: 1, opacity: 0.5 },
    attack: { scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] },
    hit: { scale: 1.1, opacity: 0.6 },
    faint: { scale: 0.8, opacity: 0 },
    switchIn: { scale: [0, 1], opacity: [0, 0.5] },
    switchOut: { scale: 0, opacity: 0 },
  };

  if (part === "back") {
    return (
      <div className="absolute inset-0 bottom-[-15rem]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: "rotateX(75deg)" }}
        >
          <motion.div
            variants={shadowVariants}
            animate={animationState}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[50%] bg-black blur-xl"
          />

          <div
            className="absolute inset-0 rounded-[50%]"
            style={{
              backgroundImage: `radial-gradient(circle, ${platformColor}0.3) 0%, transparent 60%)`,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-[50%] opacity-30"
            style={{
              "--hex-color": `${platformColor}0.5)`,
              background: `
        linear-gradient(30deg, transparent 48%, var(--hex-color) 49%, var(--hex-color) 51%, transparent 52%),
        linear-gradient(-30deg, transparent 48%, var(--hex-color) 49%, var(--hex-color) 51%, transparent 52%),
        linear-gradient(90deg, transparent 48%, var(--hex-color) 49%, var(--hex-color) 51%, transparent 52%)`,
              backgroundSize: `34.64px 20px`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: "rotateX(75deg)" }}
        >
          <AnimatePresence>
            {animationState === "idle" && (
              <motion.div
                key="scanner-rings"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              >
                <ScannerRing duration={3} delay={0} mainColor={mainColor} />
                <ScannerRing
                  duration={2.5}
                  delay={0.5}
                  isThin
                  mainColor={mainColor}
                />
                <ScannerRing
                  duration={3.5}
                  delay={1}
                  isThin
                  mainColor={mainColor}
                />
              </motion.div>
            )}

            {animationState === "switchIn" && (
              <motion.div
                key="switchIn"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0 rounded-[50%] border-4"
                  style={{ borderColor: mainColor }}
                  animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 0.7, ease: "circOut" }}
                />
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-1/2 left-1/2 w-1 origin-bottom"
                    style={{
                      backgroundColor: mainColor,
                      rotate: i * 60,
                      height: "50%",
                    }}
                    animate={{ scaleY: [0, 1, 0], opacity: [0.8, 1, 0] }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}

            {animationState === "attack" && (
              <motion.div
                key="attack"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0 rounded-[50%] border-4"
                  style={{ borderColor: mainColor }}
                  animate={{ scale: [0.5, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-[50%] border-2"
                  style={{ borderColor: mainColor }}
                  animate={{ scale: [0, 1], opacity: [1, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </motion.div>
            )}

            {animationState === "hit" && (
              <motion.div
                key="hit"
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <GeometricBurst />
                <motion.div
                  className="absolute inset-0 rounded-[50%] border-4 border-yellow-300"
                  animate={{ scale: [0.5, 1.8], opacity: [1, 0] }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-[50%] border-2 border-white"
                  animate={{ scale: [0.3, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
                />
              </motion.div>
            )}

            {(animationState === "faint" || animationState === "switchOut") && (
              <motion.div
                key="faint"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: mainColor }}
                    animate={{
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      scale: [1, 0],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: Math.random() * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (part === "front") {
    return (
      <div className="absolute inset-0 bottom-[-15rem]">
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: "rotateX(75deg)" }}
        >
          <AnimatePresence>
            {animationState === "idle" && (
              <motion.div
                key="scanner-rings-front"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                }}
              >
                <ScannerRing duration={3} delay={0} mainColor={mainColor} />
                <ScannerRing
                  duration={2.5}
                  delay={0.5}
                  isThin
                  mainColor={mainColor}
                />
                <ScannerRing
                  duration={3.5}
                  delay={1}
                  isThin
                  mainColor={mainColor}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return null;
};

const HealthBar = ({
  currentHp,
  maxHp,
  showText = false,
}: {
  currentHp: number;
  maxHp: number;
  showText?: boolean;
}) => {
  const healthPercentage = maxHp > 0 ? currentHp / maxHp : 0;
  const [prevHealth, setPrevHealth] = useState(healthPercentage);

  useEffect(() => {
    const timeout = setTimeout(() => setPrevHealth(healthPercentage), 500);
    return () => clearTimeout(timeout);
  }, [healthPercentage]);

  const barColor =
    healthPercentage < 0.2
      ? "#ef4444" // red-500
      : healthPercentage < 0.5
      ? "#f59e0b" // amber-500
      : "#22c55e"; // green-500

  return (
    <div className="relative w-full">
      <div
        className="w-full bg-slate-700/80 shadow-inner"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        }}
      >
        <motion.div
          className="absolute h-full bg-white/70"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            height: showText ? "15px" : "12px",
          }}
          initial={false}
          animate={{ width: `${prevHealth * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        <motion.div
          className="h-full"
          style={{
            backgroundColor: barColor,
            height: showText ? "15px" : "12px",
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
          initial={{ width: `${prevHealth * 100}%` }}
          animate={{ width: `${healthPercentage * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            {currentHp} / {maxHp}
          </span>
        </div>
      )}
    </div>
  );
};

const TeamStatusIcon = React.memo(
  ({ isHealthy, isPlayer }: { isHealthy: boolean; isPlayer: boolean }) => {
    const frameColorClass = isHealthy
      ? isPlayer
        ? "bg-cyan-300"
        : "bg-red-400"
      : "bg-slate-500";
    const fillColorClass = isHealthy
      ? isPlayer
        ? "bg-cyan-500"
        : "bg-red-600"
      : "bg-slate-700";
    const shadowColor = isPlayer ? "rgb(34 211 238)" : "rgb(239 68 68)";
    const hexagonClipPath =
      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

    return (
      <motion.div
        className="relative h-5 w-5"
        style={{
          filter: isHealthy ? `drop-shadow(0 0 3px ${shadowColor})` : "none",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className={`absolute inset-0 transition-colors ${frameColorClass}`}
          style={{ clipPath: hexagonClipPath }}
        />
        <div
          className={`absolute inset-[2px] transition-colors ${fillColorClass}`}
          style={{ clipPath: hexagonClipPath }}
        />
        {!isHealthy && (
          <X className="relative z-10 h-full w-full p-1 text-slate-400" />
        )}
      </motion.div>
    );
  }
);
TeamStatusIcon.displayName = "TeamStatusIcon";

const Hud = ({
  mon,
  team,
  isPlayer,
}: {
  mon: BattleReadyMon;
  team: BattleReadyMon[];
  isPlayer: boolean;
}) => {
  const mainClipPath = isPlayer
    ? "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)"
    : "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))";

  const hudStyle = isPlayer
    ? {
        background: "linear-gradient(to right, #06b6d4, #22d3ee)", // cyan-500, cyan-400
        filter: "drop-shadow(0 0 10px #06b6d4)",
      }
    : {
        background: "linear-gradient(to right, #ef4444, #f87171)", // red-500, red-400
        filter: "drop-shadow(0 0 10px #ef4444)",
      };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: isPlayer ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className={`relative w-full`}
    >
      <div
        className="relative p-0.5"
        style={{
          clipPath: mainClipPath,
          ...hudStyle,
        }}
      >
        <div
          className="relative bg-slate-900/90 p-3 pb-5 backdrop-blur-sm"
          style={{ clipPath: mainClipPath }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="truncate text-lg uppercase tracking-wider">
                    {mon.name}
                  </span>
                  <StatusIcon status={mon.status} size="md" />
                </div>
              </div>

              <div
                className={`my-1.5 flex items-center gap-2 ${
                  isPlayer ? "justify-start" : "justify-end"
                }`}
              >
                <TypeBadge type={mon.type1} />
                {mon.type2 && <TypeBadge type={mon.type2} />}
              </div>
            </div>
          </div>

          <div className="relative mt-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-bold ${
                  isPlayer ? "text-cyan-400" : "text-red-400"
                }`}
              >
                HP
              </span>

              <HealthBar currentHp={mon.currentHp} maxHp={mon.hp} />
            </div>

            <p className="absolute -bottom-4 right-0 px-3 font-mono text-xs text-slate-300">
              {mon.currentHp} / {mon.hp}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute flex items-center gap-1.5 ${
          isPlayer ? "-bottom-2 left-6" : "-top-2 right-6"
        }`}
      >
        {team.map((teamMon) => (
          <TeamStatusIcon
            key={`status-${teamMon.id}`}
            isHealthy={teamMon.currentHp > 0}
            isPlayer={isPlayer}
          />
        ))}
      </div>
    </motion.div>
  );
};

const PortfolioMonSprite = ({
  mon,
  animationState,
  isPlayer,
}: {
  mon: BattleReadyMon;
  animationState: AnimationState;
  isPlayer: boolean;
}) => {
  const mainColor = isPlayer ? "#00dcff" : "#ff5050";
  const defaultShadow = "drop-shadow(0px 5px 10px rgba(0,0,0,0.5))";

  const variants = {
    idle: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: `brightness(100%) ${defaultShadow}`,
      transition: { duration: 0.4 },
    },
    attack: {
      x: isPlayer ? [0, 60, 0] : [0, -60, 0],
      y: [0, -15, 0],
      scale: [1, 0.9, 1.15, 1],
      filter: [
        `brightness(100%) ${defaultShadow}`,
        `brightness(120%) drop-shadow(0px 0px 15px ${mainColor})`,
        `brightness(100%) ${defaultShadow}`,
      ],
      transition: { duration: 0.5, ease: "easeInOut", times: [0, 0.4, 1] },
    },
    hit: {
      x: [0, -8, 8, -8, 8, 0],
      y: [0, -4, 0],
      scale: [1, 0.95, 1.05, 1],
      rotate: [0, -2, 2, -2, 2, 0],
      filter: [
        `brightness(100%) ${defaultShadow}`,
        `brightness(300%) ${defaultShadow}`,
        `brightness(100%) ${defaultShadow}`,
        `brightness(200%) ${defaultShadow}`,
        `brightness(100%) ${defaultShadow}`,
      ],
      transition: { duration: 0.5 },
    },
    faint: {
      y: 40,
      opacity: 0,
      scale: 0.8,
      filter: `brightness(50%) ${defaultShadow}`,
      transition: { duration: 1, ease: "easeIn" },
    },
    switchOut: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    switchIn: {
      opacity: [0, 1],
      scale: [0.5, 1],
      y: [50, 0],
      filter: [
        `brightness(150%) drop-shadow(0px 0px 25px ${mainColor})`,
        `brightness(100%) ${defaultShadow}`,
      ],
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={animationState}
      className="relative h-full w-full"
    >
      <motion.div
        className="absolute h-full w-full"
        animate={{ y: animationState === "idle" ? [0, -10, 0] : 0 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Image
          src={mon.image}
          fill
          alt={mon.name}
          priority
          className="object-scale-down"
        />
      </motion.div>
    </motion.div>
  );
};

const TeamBar = ({
  team,
  onSwitch,
  isSwitchView,
  activeMonId,
  onItemTargetSelect,
  isItemTargetView,
}: {
  team: BattleReadyMon[];
  onSwitch: (index: number) => void;
  isSwitchView: boolean;
  activeMonId: number;
  onItemTargetSelect?: (index: number) => void;
  isItemTargetView: boolean;
}) => {
  const cardClipPath =
    "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)";

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto pr-2">
      {team.map((mon, index) => {
        const isActive = mon.id === activeMonId;
        const isDisabled =
          (!isSwitchView && !isItemTargetView) ||
          mon.currentHp <= 0 ||
          (isSwitchView && isActive);

        return (
          <motion.button
            layout
            key={mon.id}
            disabled={isDisabled}
            onClick={() => {
              if (isSwitchView) onSwitch(index);
              if (isItemTargetView && onItemTargetSelect)
                onItemTargetSelect(index);
            }}
            whileHover={{ scale: isDisabled ? 1 : 1.02 }}
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            className={`group relative w-full text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <div
              className={`p-0.5 ${
                isActive
                  ? "bg-cyan-500"
                  : "bg-slate-700 enabled:hover:bg-cyan-400"
              }`}
              style={{ clipPath: cardClipPath }}
            >
              <div
                className="bg-slate-900/80 p-2"
                style={{ clipPath: cardClipPath }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative h-12 w-12 flex-shrink-0 bg-slate-800 p-1 ${
                      mon.currentHp <= 0 ? "grayscale" : ""
                    }`}
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    <Image
                      src={mon.image}
                      fill
                      alt={mon.name}
                      className="object-contain"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-bold">{mon.name}</p>

                      <div className="flex gap-1">
                        <TypeBadge type={mon.type1} />

                        {mon.type2 && <TypeBadge type={mon.type2} />}
                      </div>
                    </div>

                    <div className="mt-2">
                      <HealthBar
                        currentHp={mon.currentHp}
                        maxHp={mon.hp}
                        showText
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-slate-700 pt-2">
                  {mon.moves.map((move) => (
                    <div
                      key={move.name}
                      className="flex justify-between text-xs text-slate-400"
                    >
                      <span className="truncate">{move.name}</span>

                      <span className="font-mono">
                        {move.currentPp}/{move.pp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {isActive && (
              <Star className="absolute left-1 top-1 z-10 h-4 w-4 text-yellow-400 drop-shadow-[0_0_2px_#facc15]" />
            )}
            <div className="absolute right-1 top-1 z-10">
              <StatusIcon status={mon.status} size="sm" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

const BattleLogMessage = ({ msg }: { msg: string }) => {
  const turnMatch = msg.match(/--- Turn (\d+) ---/i);
  if (turnMatch) {
    const turnNumber = parseInt(turnMatch[1], 10);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative my-3 flex items-center text-center"
        aria-hidden="true"
      >
        <div className="flex-grow border-t border-slate-700/50" />

        <span className="flex-shrink-0 px-4 text-xs font-bold uppercase tracking-widest text-cyan-500">
          Turn {turnNumber}
        </span>
        <div className="flex-grow border-t border-slate-700/50" />
      </motion.div>
    );
  }

  const getMessageInfo = (message: string) => {
    const lowerMsg = message.toLowerCase();
    const statusInfo: {
      [key in StatusEffect & string]: {
        icon: JSX.Element;
        color: string;
        verb: string;
      };
    } = {
      burn: {
        icon: <Flame className="h-full w-full" />,
        color: "text-orange-400",
        verb: "burn",
      },
      poison: {
        icon: <Bubbles className="h-full w-full" />,
        color: "text-purple-400",
        verb: "poison",
      },
      sleep: {
        icon: <BedDouble className="h-full w-full" />,
        color: "text-gray-400",
        verb: "asleep",
      },
      stun: {
        icon: <Zap className="h-full w-full" />,
        color: "text-yellow-400",
        verb: "stun",
      },
    };

    for (const status in statusInfo) {
      if (lowerMsg.includes(status)) {
        const { icon, color, verb } = statusInfo[status as StatusEffect];
        const correctedText = message.replace(
          new RegExp(`(is|was) ${status}`, "gi"),
          `$1 ${verb}`
        );
        return { icon, color, text: correctedText };
      }
    }

    if (lowerMsg.includes("super effective"))
      return {
        icon: <Sparkles className="h-full w-full" />,
        color: "text-green-400 font-bold",
        text: message,
      };
    if (lowerMsg.includes("not very effective"))
      return {
        icon: <ShieldCheck className="h-full w-full" />,
        color: "text-red-400 font-bold",
        text: message,
      };
    if (lowerMsg.includes("critical hit"))
      return {
        icon: <AlertTriangle className="h-full w-full" />,
        color: "text-yellow-400 font-bold",
        text: message,
      };
    if (lowerMsg.includes("fainted"))
      return {
        icon: <XCircle className="h-full w-full" />,
        color: "text-red-500 font-bold",
        text: message,
      };
    if (lowerMsg.includes("missed"))
      return {
        icon: <XCircle className="h-full w-full" />,
        color: "text-gray-500 italic",
        text: message,
      };
    if (lowerMsg.includes("switched"))
      return {
        icon: <ArrowRightLeft className="h-full w-full" />,
        color: "text-cyan-400",
        text: message,
      };
    if (lowerMsg.includes("ran away"))
      return {
        icon: <ArrowRightLeft className="h-full w-full" />,
        color: "text-gray-400",
        text: message,
      };
    if (lowerMsg.includes("used"))
      return {
        icon: <Star className="h-full w-full" />,
        color: "text-white",
        text: message,
      };

    return { icon: null, color: "text-slate-400", text: message };
  };

  const { icon, color, text } = getMessageInfo(msg);

  return (
    <motion.p
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-2 text-sm transition-colors duration-300 ${color}`}
    >
      {icon && <span className="mt-0.5 h-4 w-4 flex-shrink-0">{icon}</span>}
      <span>{text}</span>
    </motion.p>
  );
};

const EffectivenessTag = ({ multiplier }: { multiplier: number }) => {
  if (multiplier === 1) return null;
  const tagColor =
    multiplier > 1
      ? "bg-green-500"
      : multiplier < 1
      ? "bg-red-500"
      : "bg-gray-600";
  return (
    <span
      className={`absolute -right-1 -top-2 z-20 px-2 py-0.5 text-[10px] font-bold text-white ${tagColor}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
    >
      {multiplier}x
    </span>
  );
};

const MoveInfoHover = ({
  move,
  clipPath,
}: {
  move: BattleReadyMove;
  clipPath: string;
}) => {
  const statusType = move.effect?.type;
  const statusStyle =
    statusType && statusEffectStyles[statusType as StatusEffect];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div className="bg-cyan-400/80 p-0.5" style={{ clipPath }}>
        <div
          className="h-full bg-slate-900/95 backdrop-blur-sm"
          style={{ clipPath }}
        >
          <div className="flex h-full flex-col justify-between p-2">
            <div className="flex min-h-0 flex-grow items-start gap-2">
              <div className="flex-grow basis-3/5">
                <p className="text-xs leading-snug text-slate-300">
                  {move.description}
                </p>
              </div>

              <div className="flex basis-2/5 flex-col justify-center gap-1 border-l border-slate-700/50 pl-2">
                <div className="flex flex-col items-end">
                  <p className="text-[9px] font-bold uppercase text-slate-400">
                    Accuracy
                  </p>
                  <p className="font-mono text-sm font-bold text-cyan-300">
                    {move.accuracy * 100}%
                  </p>
                </div>
                {move.critChance > 0 && (
                  <div className="flex flex-col items-end">
                    <p className="text-end text-[9px] font-bold uppercase text-slate-400">
                      Crit Chance
                    </p>
                    <p className="font-mono text-sm font-bold text-yellow-300">
                      {move.critChance * 100}%
                    </p>
                  </div>
                )}
              </div>
            </div>

            {move.effect && statusType && statusStyle && (
              <div className="mt-1 flex-shrink-0 border-t border-slate-700/50 pt-1 text-center">
                <div
                  className={`inline-flex items-center gap-2 rounded px-2 py-0.5 ${statusStyle.bg}`}
                >
                  <div className={`h-3.5 w-3.5 ${statusStyle.text}`}>
                    {statusEffectIcons[statusType as StatusEffect]}
                  </div>
                  <p
                    className={`text-[10px] font-bold uppercase ${statusStyle.text}`}
                  >
                    {move.effect.chance * 100}% CHANCE FOR {move.effect.type}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MoveButton = ({
  move,
  onSelect,
  disabled,
  opponentMon,
  getTypeEffectiveness,
}: {
  move: BattleReadyMove;
  onSelect: (move: BattleReadyMove) => void;
  disabled: boolean;
  opponentMon: BattleReadyMon;
  getTypeEffectiveness: typeof importedGetTypeEffectiveness;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { multiplier } = getTypeEffectiveness(move.type, opponentMon);

  const outOfPP = move.currentPp <= 0;
  const isHighPower = move.power && move.power >= 90;
  const hasStatusEffect = !!move.effect;
  const statusType = move.effect?.type;

  const typeStyle = typeStyles[move.type] || {
    bg: "bg-gray-600",
    border: "border-gray-500",
    text: "text-white",
  };
  const statusStyle =
    hasStatusEffect && statusType
      ? statusEffectStyles[statusType as StatusEffect]
      : null;

  let frameBgClass = "bg-slate-600 enabled:hover:bg-cyan-400";
  let contentBgClass = `${typeStyle.bg}/50`;
  let textColorClass = "text-white";
  let isAccented = false;

  if (hasStatusEffect && statusStyle) {
    frameBgClass = statusStyle.border;
    contentBgClass = statusStyle.bg;
    textColorClass = statusStyle.text;
  } else if (isHighPower) {
    frameBgClass = typeStyle.border.replace("border-", "bg-");
    contentBgClass = typeStyle.bg;
    textColorClass = typeStyle.text;
    isAccented = true;
  } else {
    frameBgClass = "bg-slate-600 enabled:hover:bg-cyan-400";
    contentBgClass = `${typeStyle.bg}/50`;
    textColorClass = "text-white";
  }

  if (outOfPP) {
    frameBgClass = "bg-red-500/50";
    contentBgClass = "bg-slate-800";
    textColorClass = "text-slate-500";
    isAccented = false;
  }

  const buttonClipPath =
    "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))";

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative h-full text-left shadow-lg transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
      disabled={disabled || outOfPP}
      onClick={() => onSelect(move)}
    >
      <div
        className={`p-0.5 transition-colors duration-300 ${frameBgClass}`}
        style={{ clipPath: buttonClipPath }}
      >
        <div
          className={`relative flex h-full flex-col justify-start p-2 ${contentBgClass}`}
          style={{ clipPath: buttonClipPath }}
        >
          {isAccented && (
            <div
              className="pointer-events-none absolute inset-0 border-2 border-black/30"
              style={{ clipPath: buttonClipPath }}
            />
          )}
          <div className="relative z-10 flex h-full flex-col">
            <div
              className={`flex w-full items-start justify-between ${textColorClass}`}
            >
              <p className="text-sm font-bold">{move.name}</p>
              <p className="font-mono text-xs">Pwr: {move.power || "--"}</p>
            </div>
            {hasStatusEffect && move.effect && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 flex h-8 items-center justify-center">
                <div
                  className={`flex items-center gap-2 bg-white/40 px-3 py-1 text-sm ${textColorClass}`}
                  style={{
                    clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)",
                  }}
                >
                  <div className="size-4">
                    {statusEffectIcons[statusType as StatusEffect]}
                  </div>
                  <span className="text-sm font-bold">
                    {move.effect.chance * 100}%
                  </span>
                </div>
              </div>
            )}
            <div className="mt-auto grid grid-cols-3 items-center gap-1 pt-1">
              <div className="flex justify-start">
                <TypeBadge type={move.type} />
              </div>
              <div className="flex justify-center"></div>
              <div className="flex justify-end">
                <p
                  className={`font-mono text-xs font-bold ${
                    outOfPP ? "text-red-500" : textColorClass
                  }`}
                >
                  PP {move.currentPp}/{move.pp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && !disabled && (
          <MoveInfoHover move={move} clipPath={buttonClipPath} />
        )}
      </AnimatePresence>

      <EffectivenessTag multiplier={multiplier} />
    </motion.button>
  );
};

const SpeechBubble = ({
  text,
  isPlayer,
}: {
  text: string;
  isPlayer: boolean;
}) => {
  const shadowColor = isPlayer
    ? "rgba(34, 211, 238, 0.5)"
    : "rgba(239, 68, 68, 0.5)";

  const playerClipPath =
    "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)";
  const gruntClipPath =
    "polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))";

  const clipPath = isPlayer ? playerClipPath : gruntClipPath;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute z-[80] w-48 ${
        isPlayer ? "bottom-[90%] left-[-10%]" : "bottom-[90%] right-[-10%]"
      }`}
      style={{
        filter: `drop-shadow(0 4px 8px ${shadowColor})`,
      }}
    >
      <div
        className={`p-0.5 ${isPlayer ? "bg-cyan-400" : "bg-red-500"}`}
        style={{ clipPath }}
      >
        <div
          className="bg-slate-900/90 px-4 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm"
          style={{ clipPath }}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
};

const NotificationDisplay = ({
  notification,
}: {
  notification: { id: number; message: string; type: NotificationType } | null;
}) => {
  const getNotificationStyle = (
    type: NotificationType,
    message: string = ""
  ) => {
    const lowerMsg = message.toLowerCase();
    switch (type) {
      case "critical":
        return {
          bg: "bg-yellow-500/90",
          borderBg: "bg-yellow-300",
          text: "text-white",
          icon: <AlertTriangle className="h-full w-full" />,
        };
      case "effectiveness":
        return {
          bg: "bg-green-500/90",
          borderBg: "bg-green-300",
          text: "text-white",
          icon: <Sparkles className="h-full w-full" />,
        };
      case "status":
        let icon: JSX.Element = <AlertTriangle className="h-full w-full" />;
        if (lowerMsg.includes("burn"))
          icon = <Flame className="h-full w-full" />;
        if (lowerMsg.includes("poison"))
          icon = <Bubbles className="h-full w-full" />;
        if (lowerMsg.includes("sleep"))
          icon = <BedDouble className="h-full w-full" />;
        if (lowerMsg.includes("stun")) icon = <Zap className="h-full w-full" />;
        return {
          bg: "bg-purple-500/90",
          borderBg: "bg-purple-300",
          text: "text-white",
          icon: icon,
        };
      case "turn":
        return {
          bg: "bg-cyan-500/90",
          borderBg: "bg-cyan-300",
          text: "text-white",
          icon: <ArrowRightLeft className="h-full w-full" />,
        };
      case "miss":
        return {
          bg: "bg-slate-600/90",
          borderBg: "bg-slate-400",
          text: "text-slate-100",
          icon: <XCircle className="h-full w-full" />,
        };
      default:
        return {
          bg: "bg-slate-700/90",
          borderBg: "bg-slate-500",
          text: "text-slate-100",
          icon: null,
        };
    }
  };

  const style = notification
    ? getNotificationStyle(notification.type, notification.message)
    : getNotificationStyle("info");
  const clipPath =
    "polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)";
  return (
    <div className="pointer-events-none absolute top-16 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 flex-col items-center gap-2 px-4">
      <AnimatePresence mode="popLayout">
        {notification && (
          <motion.div
            key={notification.id}
            layout
            className={`w-auto p-0.5 shadow-lg backdrop-blur-md ${style.borderBg}`}
            style={{ clipPath }}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div
              className={`flex items-center gap-4 px-5 py-3 ${style.bg}`}
              style={{ clipPath }}
            >
              {style.icon && (
                <div className={`h-7 w-7 flex-shrink-0 ${style.text}`}>
                  {style.icon}
                </div>
              )}

              <span className={`text-lg font-bold tracking-wide ${style.text}`}>
                {notification.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN BATTLE SCREEN COMPONENT ---
interface FightScreenProps {
  playerMon: BattleReadyMon;
  cpuMon: BattleReadyMon;
  playerTeam: BattleReadyMon[];
  cpuTeam: BattleReadyMon[];
  battleLog: string[];
  isPlayerTurn: boolean;
  onMoveSelect: (move: BattleReadyMove) => void;
  onSwitchSelect: (index: number) => void;
  onRun: () => void;
  playerAnimation: AnimationState;
  cpuAnimation: AnimationState;
  playerTrainerState: TrainerState;
  gruntTrainerState: TrainerState;
  dialogue: DialogueState;
  getTypeEffectiveness: typeof importedGetTypeEffectiveness;
  inventory: PlayerInventory;
  onItemUse: (itemName: string, targetIndex: number) => void;
  turnCount: number;
  notification: { id: number; message: string; type: NotificationType } | null;
  gameState: "fight" | "forcedSwitch";
}

const Corner = ({ position }: { position: string }) => (
  <motion.div
    className={`pointer-events-none absolute z-[60] h-12 w-12 text-cyan-400 ${position}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: [0.5, 1, 0.7, 1] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
  >
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      style={{ filter: "drop-shadow(0 0 5px currentColor)" }}
    >
      <path
        d="M0 20V0H20"
        stroke="currentColor"
        strokeWidth="3"
        transform={
          position.includes("top-8 left-8")
            ? ""
            : position.includes("top-8 right-8")
            ? "rotate(90 25 25)"
            : position.includes("bottom") && position.includes("right")
            ? "rotate(180 25 25)"
            : "rotate(270 25 25)"
        }
      />
    </svg>
  </motion.div>
);

const SciFiFrame = () => {
  return (
    <>
      <div className="scanline-effect pointer-events-none fixed inset-0 z-[70] opacity-10 mix-blend-soft-light" />

      <div
        className="grid-overlay pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 220, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 220, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <Corner position="top-4 left-4 rotate-90" />
      <Corner position="bottom-[35%] right-4" />
    </>
  );
};

const TargetingReticule = () => (
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      style={{ filter: "drop-shadow(0 0 5px #ff5050)" }}
    >
      <motion.path
        d="M50 10 V 0 M50 90 V 100 M10 50 H 0 M90 50 H 100"
        stroke="#ff5050"
        strokeWidth="2"
      />

      <motion.circle
        cx="50"
        cy="50"
        r="30"
        stroke="#ff5050"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.circle
        cx="50"
        cy="50"
        r="20"
        stroke="#ff5050"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </motion.div>
);

export const FightScreen = ({
  playerMon,
  cpuMon,
  playerTeam,
  cpuTeam,
  battleLog,
  isPlayerTurn,
  onMoveSelect,
  onSwitchSelect,
  onRun,
  playerAnimation,
  cpuAnimation,
  playerTrainerState,
  gruntTrainerState,
  dialogue,
  getTypeEffectiveness,
  inventory,
  onItemUse,
  turnCount,
  notification,
  gameState,
}: FightScreenProps) => {
  const [actionState, setActionState] = useState<ActionState>("moves");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isPlayerHudHovered, setPlayerHudHovered] = useState(false);
  const [isCpuHudHovered, setCpuHudHovered] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlayerTurn && gameState !== "forcedSwitch") {
      setActionState("moves");
      setSelectedItem(null);
    }
  }, [isPlayerTurn, playerMon, gameState]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [battleLog]);

  const handleItemSelect = (item: Item) => {
    if (item.effect.type === "heal" || item.effect.type === "cureStatus") {
      setSelectedItem(item);
      setActionState("itemTarget");
    }
  };

  const handleSwitch = (index: number) => {
    onSwitchSelect(index);
    if (gameState !== "forcedSwitch") {
      setActionState("moves");
    }
  };

  const playerTrainerVariants = {
    idle: { y: 0 },
    commanding: { y: -5, x: 5 },
    win: {
      y: -10,
      rotate: [0, 5, -5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    },
    lose: { y: 5, rotate: 2, opacity: 0.8 },
  };
  const cpuTrainerVariants = {
    idle: { y: 0 },
    commanding: { y: -5, x: -5 },
    win: {
      y: -10,
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    },
    lose: { y: 5, rotate: -2, opacity: 0.8 },
  };

  return (
    <div
      className="relative h-full w-full select-none overflow-hidden bg-slate-900 text-white"
      style={{
        backgroundImage: "url(/images/bg-space.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SciFiFrame />
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
      <NotificationDisplay notification={notification} />
      <div className="z-5 pointer-events-none absolute inset-0">
        <AnimatePresence>
          <BackgroundEffects
            key={turnCount}
            playerAnimation={playerAnimation}
            cpuAnimation={cpuAnimation}
          />
        </AnimatePresence>
      </div>

      <div className="absolute left-1/2 top-4 z-50 -translate-x-1/2">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={turnCount}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: [1, 1.2, 1] }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="bg-black/50 px-4 py-1.5 text-sm font-bold tracking-wider backdrop-blur-sm"
            style={{
              clipPath:
                "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)",
            }}
          >
            TURN {turnCount}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute top-[8%] right-[5%] z-10 aspect-[2/1] w-[45%] max-w-lg [perspective:1000px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -bottom-[20%] -left-[25%] z-20 h-[120%] w-[60%]">
          <AnimatePresence>
            {dialogue.cpu && (
              <SpeechBubble text={dialogue.cpu} isPlayer={false} />
            )}
          </AnimatePresence>

          <motion.div
            variants={cpuTrainerVariants}
            animate={gruntTrainerState}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-full w-full -scale-x-100"
          >
            <Image
              src={`/images/cynthia/${gruntTrainerState}.png`}
              key={`/images/cynthia/${gruntTrainerState}.png`}
              fill
              alt="CPU Trainer"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 right-[-5%] h-full w-[75%]">
          <PlatformEffects
            isPlayer={false}
            animationState={cpuAnimation}
            part="front"
          />

          <div className="absolute inset-0 z-20 ">
            <AnimatePresence>
              {isPlayerTurn && actionState === "moves" && <TargetingReticule />}
            </AnimatePresence>

            <PortfolioMonSprite
              key={cpuMon.id}
              mon={cpuMon}
              animationState={cpuAnimation}
              isPlayer={false}
            />

            <StatusEffectDisplay
              key={`${cpuMon.id}-status`}
              status={cpuMon.status}
            />
          </div>

          <PlatformEffects
            isPlayer={false}
            animationState={cpuAnimation}
            part="back"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[35%] left-[5%] z-10 aspect-[2/1] w-[55%] max-w-2xl [perspective:1000px]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -bottom-[20%] -right-[18%] z-20 h-[110%] w-[55%]">
          <AnimatePresence>
            {dialogue.player && (
              <SpeechBubble text={dialogue.player} isPlayer={true} />
            )}
          </AnimatePresence>

          <motion.div
            variants={playerTrainerVariants}
            animate={playerTrainerState}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-full w-full"
          >
            <Image
              src={`/images/trainer/${playerTrainerState}.png`}
              key={`/images/trainer/${playerTrainerState}.png`}
              fill
              alt="Player Trainer"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-[-5%] z-10 h-full w-[75%]">
          <PlatformEffects
            isPlayer={true}
            animationState={playerAnimation}
            part="back"
          />

          <div className="absolute inset-0 z-10 [transform:translateY(-15%)]">
            <PortfolioMonSprite
              key={playerMon.id}
              mon={playerMon}
              animationState={playerAnimation}
              isPlayer={true}
            />

            <StatusEffectDisplay
              key={`${playerMon.id}-status`}
              status={playerMon.status}
            />
          </div>

          <PlatformEffects
            isPlayer={true}
            animationState={playerAnimation}
            part="front"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none relative z-30 h-full w-full p-4">
        <div
          onMouseEnter={() => setCpuHudHovered(true)}
          onMouseLeave={() => setCpuHudHovered(false)}
          className="pointer-events-auto absolute top-4 right-4 w-full max-w-xs sm:max-w-sm"
        >
          <Hud mon={cpuMon} team={cpuTeam} isPlayer={false} />

          <AnimatePresence>
            {isCpuHudHovered && cpuMon.currentHp > 0 && (
              <InfoBox mon={cpuMon} isPlayer={false} />
            )}
          </AnimatePresence>
        </div>

        <div
          onMouseEnter={() => setPlayerHudHovered(true)}
          onMouseLeave={() => setPlayerHudHovered(false)}
          className="pointer-events-auto absolute bottom-[35%] left-4 w-full max-w-xs sm:max-w-sm"
        >
          <Hud mon={playerMon} team={playerTeam} isPlayer={true} />

          <AnimatePresence>
            {isPlayerHudHovered && playerMon.currentHp > 0 && (
              <InfoBox mon={playerMon} isPlayer={true} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-40 h-[33.33%] bg-slate-800/80 p-1 backdrop-blur-sm"
        style={{
          clipPath: "polygon(0 15px, 15px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          className="relative h-full w-full bg-cyan-400 p-0.5"
          style={{
            clipPath: "polygon(0 15px, 15px 0, 100% 0, 100% 100%, 0 100%)",
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)",
          }}
        >
          <div
            className="flex h-full w-full bg-slate-900/90"
            style={{
              clipPath: "polygon(0 15px, 15px 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="relative w-[35%]">
              <div
                ref={logContainerRef}
                className="flex h-full flex-col gap-1.5 overflow-y-auto scroll-smooth bg-gradient-to-t from-slate-900/80 to-slate-800/80 p-4 pt-2 [mask-image:linear-gradient(to_bottom,transparent_0,_black_24px,_black_calc(100%-24px),transparent_100%)]"
              >
                {battleLog.map((msg, i) => (
                  <BattleLogMessage key={`${i}-${msg}`} msg={msg} />
                ))}
              </div>

              <div
                className="pointer-events-none absolute inset-0 bg-cyan-400"
                style={{
                  clipPath:
                    "polygon(calc(100% - 2px) 0, 100% 0, 100% 100%, calc(100% - 2px) 100%)",
                  opacity: 0.5,
                }}
              />
            </div>

            <div className="flex w-[65%]">
              <div className="relative w-[40%] p-2">
                <TeamBar
                  team={playerTeam}
                  onSwitch={handleSwitch}
                  isSwitchView={
                    (actionState === "switch" ||
                      gameState === "forcedSwitch") &&
                    isPlayerTurn
                  }
                  activeMonId={playerMon.id}
                  isItemTargetView={actionState === "itemTarget"}
                  onItemTargetSelect={(index) => {
                    if (selectedItem) onItemUse(selectedItem.name, index);
                  }}
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-cyan-400"
                  style={{
                    clipPath:
                      "polygon(calc(100% - 2px) 0, 100% 0, 100% 100%, calc(100% - 2px) 100%)",
                    opacity: 0.5,
                  }}
                />
              </div>

              <div className="flex w-[60%] flex-col p-4">
                <div className="h-[calc(100%-3.5rem)] flex-grow">
                  <AnimatePresence mode="wait">
                    {gameState === "forcedSwitch" ? (
                      <ForcedSwitchScreen />
                    ) : actionState === "moves" ? (
                      <motion.div
                        key="moves"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="grid h-full grid-cols-2 grid-rows-2 gap-3"
                      >
                        {playerMon.moves.map((move) => (
                          <MoveButton
                            key={move.name}
                            move={move}
                            onSelect={onMoveSelect}
                            disabled={!isPlayerTurn || playerMon.currentHp <= 0}
                            opponentMon={cpuMon}
                            getTypeEffectiveness={getTypeEffectiveness}
                          />
                        ))}
                      </motion.div>
                    ) : actionState === "switch" ? (
                      <SwitchItemView
                        onCancel={() => setActionState("moves")}
                        title="Choose a Project to switch to."
                      />
                    ) : actionState === "items" ? (
                      <div className="h-full overflow-y-auto">
                        <ItemMenu
                          inventory={inventory}
                          onItemSelect={handleItemSelect}
                          onCancel={() => setActionState("moves")}
                        />
                      </div>
                    ) : actionState === "itemTarget" ? (
                      <SwitchItemView
                        onCancel={() => setActionState("items")}
                        title={`Use ${selectedItem?.name || "Item"} on...`}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="mt-3 grid flex-shrink-0 grid-cols-4 gap-2 border-t-2 border-cyan-400/50 pt-2">
                  <ActionButton
                    icon={<ArrowRightLeft className="h-4 w-4" />}
                    onClick={() => setActionState("switch")}
                    disabled={!isPlayerTurn || gameState === "forcedSwitch"}
                    color="bg-yellow-600/80 hover:bg-yellow-500"
                  >
                    Switch
                  </ActionButton>

                  <ActionButton
                    icon={<ShoppingBag className="h-4 w-4" />}
                    onClick={() => setActionState("items")}
                    disabled={!isPlayerTurn || gameState === "forcedSwitch"}
                    color="bg-blue-600/80 hover:bg-blue-500"
                  >
                    Items
                  </ActionButton>

                  <ActionButton
                    icon={<BookOpen className="h-4 w-4" />}
                    onClick={() => setShowGuide(true)}
                    color="bg-green-600/80 hover:bg-green-500"
                  >
                    Guide
                  </ActionButton>

                  <ActionButton
                    icon={<XCircle className="h-4 w-4" />}
                    onClick={onRun}
                    disabled={!isPlayerTurn || gameState === "forcedSwitch"}
                    color="bg-slate-600/80 hover:bg-slate-500"
                  >
                    Run
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
