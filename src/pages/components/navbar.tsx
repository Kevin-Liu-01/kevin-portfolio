import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserCircle,
  Menu,
  X,
  Shield,
  RefreshCw,
  Flag,
  Swords,
  CheckSquare,
  Bot,
  Layers,
  Save,
  FolderDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "../providers/gameProvider";

// Helper component for styled button groups with hover animation
const ClippedGroupContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`relative bg-cyan-400/20 p-px ${className}`}
    style={{
      clipPath:
        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
    }}
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    <motion.div
      className="absolute top-0 left-0 h-full w-12 bg-white/25 blur-md"
      variants={{
        rest: { x: "-150%", skewX: -20 },
        hover: {
          x: "350%",
          skewX: -20,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    />
    <div
      className="relative flex h-full w-full items-center gap-1 bg-slate-900/80 px-1 py-1"
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
      }}
    >
      {children}
    </div>
  </motion.div>
);

// Helper for individual buttons
const ClippedButton = (props: React.ComponentProps<"button">) => (
  <button
    {...props}
    className={`relative p-2 text-slate-300 transition-colors duration-200 hover:bg-cyan-400/20 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-300 ${props.className}`}
    style={{
      clipPath:
        "polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
    }}
  />
);

// --- NEW SCI-FI AUTO-BATTLE BUTTON ---
const AutoBattleButton = () => {
  const { isAutoBattleActive, toggleAutoBattle } = useGame();

  const reticleVariants = {
    active: {
      opacity: [0, 1, 1, 0],
      pathLength: [0, 1, 1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1],
      },
    },
    inactive: { opacity: 0 },
  };

  return (
    <ClippedButton
      onClick={toggleAutoBattle}
      title="Toggle Auto-Battle"
      className="!flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {isAutoBattleActive && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(4px)" }}
            />
            <motion.svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-cyan-300"
              style={{ filter: "drop-shadow(0 0 2px currentColor)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                fill="none"
                variants={reticleVariants}
                animate="active"
              />
            </motion.svg>
            <motion.svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-cyan-300"
              style={{ filter: "drop-shadow(0 0 2px currentColor)" }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            >
              <motion.path
                d="M4 12 L8 12 M16 12 L20 12 M12 4 L12 8 M12 16 L12 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={reticleVariants}
                animate="active"
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
      <Bot
        className={`relative h-5 w-5 transition-colors ${
          isAutoBattleActive ? "text-white" : "text-slate-300"
        }`}
      />
    </ClippedButton>
  );
};

const BackgroundPreview = ({ nextBgIndex }: { nextBgIndex: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-[calc(100%+0.5rem)] right-0 z-[100] mb-3 w-48 rounded-md border border-cyan-400/50 bg-slate-900/80 p-1 shadow-2xl backdrop-blur-md"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded">
        <Image
          src={`/images/backgrounds/background-${nextBgIndex}.jpg`}
          alt={`Preview of background ${nextBgIndex}`}
          fill
          className="object-cover"
        />
      </div>
      <p className="mt-1 text-center text-xs font-bold text-slate-300">
        Next Arena
      </p>
    </motion.div>
  );
};

const AuthorBadge = () => (
  <div
    className="absolute bottom-1 right-[-0.75rem] z-20 p-px shadow-lg shadow-black/30"
    style={{
      clipPath:
        "polygon(5px 0, 100% 0, calc(100% - 10px) 100%, 5px 100%, 0 50%)",
      background: "linear-gradient(to bottom right, #a0aec0, #2d3748)",
    }}
  >
    <div
      className="relative flex items-center justify-center bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 py-0.5 pl-2 pr-3"
      style={{
        clipPath:
          "polygon(5px 0, 100% 0, calc(100% - 10px) 100%, 5px 100%, 0 50%)",
      }}
    >
      <div
        className="absolute left-0 top-0.5 h-[1px] w-full opacity-50"
        style={{
          background:
            "linear-gradient(to right, transparent, white, transparent)",
        }}
      />
      <span
        className="font-hanken text-[7px] font-bold uppercase tracking-wider text-slate-800"
        style={{
          textShadow: "0 1px 0px rgba(255, 255, 255, 0.4)",
        }}
      >
        Kevin Liu &apos;28
      </span>
    </div>
  </div>
);

const PortfolioMonLogo = () => {
  const LogoIcon = (props: React.ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <path d="M4 62 L12 54 H 52 L 60 62 Z" className="fill-slate-700" />
      <path d="M12 54 H 52" className="stroke-cyan-400/50" strokeWidth="2" />
      <g className="fill-cyan-400">
        <path d="M2 32 C 8 36, 12 36, 12 36 V 28 C 12 28, 8 28, 2 32 Z" />
        <path d="M62 32 C 56 36, 52 36, 52 36 V 28 C 52 28, 56 28, 62 32 Z" />
      </g>
      <path
        d="M32 4 L 56 16 V 36 C 56 42, 48 48, 32 54 C 16 48, 8 42, 8 36 V 16 Z"
        className="fill-slate-800 stroke-slate-600"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 28 C 20 20, 44 20, 52 28 V 36 C 44 28, 20 28, 12 36 V 28 Z"
        className="fill-cyan-400"
      />
      <path
        d="M14 30 C 22 24, 42 24, 50 30"
        className="stroke-cyan-200/75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M32 10 V 20 M 24 26 L 32 20 L 40 26"
        className="stroke-red-500/70"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const glitchLayer1Variants = {
    rest: { x: -1, y: 1 },
    hover: { x: -2.5, y: 1.5 },
  };
  const glitchLayer2Variants = {
    rest: { x: 1, y: -1 },
    hover: { x: 2.5, y: -1.5 },
  };
  const showdownPlateVariants = { rest: { x: 2, y: 2 }, hover: { x: 1, y: 1 } };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative flex cursor-pointer items-center gap-3"
    >
      <div className="relative z-10 flex items-center gap-3">
        <LogoIcon className="h-12 w-12 flex-shrink-0" />
        <div className="relative">
          <div className="relative">
            <motion.div
              variants={glitchLayer1Variants}
              className="absolute top-0 left-0 select-none font-orbiter text-2xl font-black uppercase tracking-wide text-cyan-400/60"
              aria-hidden="true"
            >
              PortfolioMon
            </motion.div>
            <motion.div
              variants={glitchLayer2Variants}
              className="absolute top-0 left-0 select-none font-orbiter text-2xl font-black uppercase tracking-wide text-red-500/60"
              aria-hidden="true"
            >
              PortfolioMon
            </motion.div>
            <div
              className="relative font-orbiter text-2xl font-black uppercase tracking-wide text-slate-100"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
            >
              PortfolioMon
            </div>
          </div>
          <div className="relative -mt-1 w-[150px]">
            <motion.div
              variants={showdownPlateVariants}
              className="absolute top-0 left-0 h-full w-full bg-slate-700"
              style={{
                clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
              }}
            />
            <div
              className="relative bg-red-600"
              style={{
                clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
              }}
            >
              <div className="justify-left flex items-center gap-2 truncate px-2 py-0.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900">
                  <Shield className="h-3 w-3 text-red-400" />
                </div>
                <div className="font-orbiter text-xs font-extrabold tracking-[0.2em] text-white">
                  SHOWDOWN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthorBadge />
    </motion.div>
  );
};

const LogoContainer = ({ children }: { children: React.ReactNode }) => {
  const lineContainerVariants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const lineFromLeft = {
    rest: { opacity: 0.1, x: -30 },
    hover: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const lineFromRight = {
    rest: { opacity: 0.1, x: 30 },
    hover: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative flex w-1/3 min-w-fit items-center overflow-hidden bg-slate-800/90 py-3 pl-4 pr-12 sm:pl-6 lg:pl-8"
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
      }}
    >
      <motion.div
        variants={lineContainerVariants}
        className="absolute inset-0 z-0"
      >
        <motion.div
          variants={lineFromLeft}
          className="absolute inset-0 bg-cyan-400/40"
          style={{
            clipPath: "polygon(0 100%, 15% 100%, 85% 0, 70% 0)",
          }}
        />
        <motion.div
          variants={lineFromLeft}
          className="absolute inset-0 bg-yellow-300/40"
          style={{
            clipPath: "polygon(0% 0%, 5% 0%, 100% 100%, 95% 100%)",
          }}
        />
        <motion.div
          variants={lineFromRight}
          className="absolute inset-0 bg-cyan-300/70"
          style={{
            clipPath:
              "polygon(100% 0, calc(100% - 3px) 0, calc(100% - 43px) 100%, calc(100% - 40px) 100%)",
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const Navbar = (props: {
  menuHandler: () => void;
  fontInitializer: () => void;
}) => {
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const {
    gameState,
    playerTeam,
    handleReset,
    handleRun,
    handleConfirmTeam,
    startBattle,
    cycleBackground,
    background,
  } = useGame();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBgPreview, setShowBgPreview] = useState(false);

  // Assuming 5 backgrounds, named background-1.jpg to background-5.jpg
  const nextBgIndex = (background % 5) + 1;

  useEffect(() => setMounted(true), []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return (
      <ClippedButton
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      >
        {currentTheme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </ClippedButton>
    );
  };

  const octagonalClipPath =
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  return (
    <motion.nav
      className="relative top-0 z-50 border-b border-cyan-400/20 bg-slate-900 backdrop-blur-md"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundSize: "20px 20px",
            backgroundImage:
              "linear-gradient(to right, #083344 1px, transparent 1px), linear-gradient(to bottom, #083344 1px, transparent 1px)",
          }}
          variants={{
            rest: { opacity: 0, x: -20 },
            hover: { opacity: 0.15, x: 0 },
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="relative h-full w-full opacity-40">
          <div
            className="absolute inset-0 bg-cyan-300/50"
            style={{ clipPath: "polygon(0% 48%, 100% 35%, 100% 37%, 0% 50%)" }}
          />
          <div
            className="absolute inset-0 bg-yellow-300/25"
            style={{ clipPath: "polygon(0% 62%, 100% 75%, 100% 77%, 0% 64%)" }}
          />
          <div
            className="absolute inset-0 ml-72 bg-cyan-400/50"
            style={{ clipPath: "polygon(15% 0, 16% 0, 10% 100%, 9% 100%)" }}
          />
          <motion.div
            variants={{
              rest: { opacity: 0.2 },
              hover: {
                opacity: 0.5,
                x: -5,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="absolute inset-0 bg-cyan-200/50"
            style={{ clipPath: "polygon(50% 0, 51% 0, 65% 100%, 64% 100%)" }}
          />
          <motion.div
            className="absolute inset-0 bg-cyan-400"
            style={{ clipPath: "polygon(80% 0, 81% 0, 81% 100%, 80% 100%)" }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-yellow-300"
            style={{ clipPath: "polygon(0% 15%, 25% 15%, 25% 16%, 0% 16%)" }}
            animate={{ opacity: [0.3, 0.1, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        <motion.div
          className="absolute left-0 right-0 h-px bg-cyan-300/70 shadow-[0_0_10px_theme(colors.cyan.300)]"
          initial={{ y: "0%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full items-stretch justify-start">
        <LogoContainer>
          <PortfolioMonLogo />
        </LogoContainer>

        <div className="ml-auto flex items-center gap-3 pr-4 sm:pr-6 lg:pr-8">
          <div className="hidden items-center gap-3 sm:flex">
            <ClippedGroupContainer>
              <div
                className="relative h-8 w-8 bg-cyan-400/20 p-px"
                style={{ clipPath: octagonalClipPath }}
              >
                <div
                  className="relative h-full w-full bg-slate-800"
                  style={{ clipPath: octagonalClipPath }}
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserCircle className="h-full w-full text-slate-600" />
                  )}
                </div>
              </div>
              <ClippedButton
                onClick={session ? () => void signOut() : () => void signIn()}
                title={session ? "Sign Out" : "Sign In"}
              >
                {session ? (
                  <LogOut className="h-5 w-5" />
                ) : (
                  <LogIn className="h-5 w-5" />
                )}
              </ClippedButton>
            </ClippedGroupContainer>

            {/* Game State Controls */}
            {(gameState === "fight" ||
              gameState === "gameOver" ||
              gameState === "forcedSwitch" ||
              gameState === "teamSelect" ||
              gameState === "teamPreview") && (
              <ClippedGroupContainer>
                {(gameState === "fight" ||
                  gameState === "gameOver" ||
                  gameState === "forcedSwitch") && (
                  <>
                    <ClippedButton onClick={handleReset} title="Reset Game">
                      <RefreshCw className="h-5 w-5" />
                    </ClippedButton>
                    <ClippedButton onClick={handleRun} title="Forfeit Match">
                      <Flag className="h-5 w-5" />
                    </ClippedButton>
                    <AutoBattleButton />
                  </>
                )}
                {gameState === "teamSelect" && (
                  <ClippedButton
                    onClick={handleConfirmTeam}
                    title="Confirm Team"
                    disabled={playerTeam.length !== 3}
                  >
                    <CheckSquare className="h-5 w-5" />
                  </ClippedButton>
                )}
                {gameState === "teamPreview" && (
                  <ClippedButton onClick={startBattle} title="Start Battle">
                    <Swords className="h-5 w-5" />
                  </ClippedButton>
                )}
              </ClippedGroupContainer>
            )}

            {/* Game/Visuals Controls */}
            <div className="relative">
              <ClippedGroupContainer>
                <div
                  onMouseEnter={() => setShowBgPreview(true)}
                  onMouseLeave={() => setShowBgPreview(false)}
                >
                  <ClippedButton
                    onClick={cycleBackground}
                    title="Change Background"
                  >
                    <Layers className="h-5 w-5" />
                  </ClippedButton>
                </div>
              </ClippedGroupContainer>
              <AnimatePresence>
                {showBgPreview && (
                  <BackgroundPreview nextBgIndex={nextBgIndex} />
                )}
              </AnimatePresence>
            </div>

            {/* General Settings */}
            <ClippedGroupContainer>
              <ClippedButton
                onClick={() => props.fontInitializer()}
                className="font-mono text-lg font-bold"
                title="Change Font"
              >
                <div className="flex h-5 w-5 items-center justify-center">
                  F
                </div>
              </ClippedButton>
              {renderThemeChanger()}
            </ClippedGroupContainer>
          </div>

          <div className="sm:hidden">
            <ClippedButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </ClippedButton>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-cyan-400/20 bg-slate-900/95 sm:hidden"
          >
            <div className="space-y-3 p-4">
              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="relative h-8 w-8"
                      style={{ clipPath: octagonalClipPath }}
                    >
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <UserCircle className="h-full w-full text-slate-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                      {session?.user?.name ?? "Guest"}
                    </span>
                  </div>
                  <ClippedButton
                    onClick={
                      session ? () => void signOut() : () => void signIn()
                    }
                  >
                    {session ? (
                      <LogOut className="h-5 w-5" />
                    ) : (
                      <LogIn className="h-5 w-5" />
                    )}
                  </ClippedButton>
                </div>
              </ClippedGroupContainer>

              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-around">
                  {(gameState === "fight" ||
                    gameState === "gameOver" ||
                    gameState === "forcedSwitch") && (
                    <>
                      <ClippedButton onClick={handleReset} title="Reset Game">
                        <RefreshCw className="h-5 w-5" />
                      </ClippedButton>
                      <ClippedButton onClick={handleRun} title="Forfeit Match">
                        <Flag className="h-5 w-5" />
                      </ClippedButton>
                      <AutoBattleButton />
                    </>
                  )}
                  {gameState === "teamSelect" && (
                    <ClippedButton
                      onClick={handleConfirmTeam}
                      title="Confirm Team"
                      disabled={playerTeam.length !== 3}
                    >
                      <CheckSquare className="h-5 w-5" />
                    </ClippedButton>
                  )}
                  {gameState === "teamPreview" && (
                    <ClippedButton onClick={startBattle} title="Start Battle">
                      <Swords className="h-5 w-5" />
                    </ClippedButton>
                  )}
                </div>
              </ClippedGroupContainer>

              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-around">
                  <ClippedButton
                    onClick={cycleBackground}
                    title="Change Background"
                  >
                    <Layers className="h-5 w-5" />
                  </ClippedButton>
                </div>
              </ClippedGroupContainer>

              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-around">
                  <ClippedButton
                    onClick={() => props.fontInitializer()}
                    className="font-mono text-lg font-bold"
                  >
                    <div className="flex h-5 w-5 items-center justify-center">
                      F
                    </div>
                  </ClippedButton>
                  {renderThemeChanger()}
                </div>
              </ClippedGroupContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
