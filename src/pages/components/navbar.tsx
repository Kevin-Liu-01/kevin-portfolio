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
  RefreshCw, // For Reset
  Flag, // For Forfeit/Run
  Swords, // For Start Battle
  CheckSquare, // For Confirm Team
  Bot, // For Auto-Battle (WIP)
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "../providers/gameProvider"; // Import the game context hook

// Helper component for styled button groups with hover animation
const ClippedGroupContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`relative overflow-hidden bg-cyan-400/20 p-px ${className}`}
    style={{
      clipPath:
        "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
    }}
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {/* Animated sheen/glint effect on hover */}
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
    className={`p-2 text-slate-300 transition-colors duration-200 hover:bg-cyan-400/20 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-300 ${props.className}`}
    style={{
      clipPath:
        "polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
    }}
  />
);

// Special component for the author's nameplate
const AuthorBadge = () => (
  <div
    className="absolute bottom-1 right-[-0.75rem] z-20 p-px shadow-lg shadow-black/30"
    style={{
      clipPath:
        "polygon(5px 0, 100% 0, calc(100% - 10px) 100%, 5px 100%, 0 50%)", // Updated clipPath for parallelogram cut
      background: "linear-gradient(to bottom right, #a0aec0, #2d3748)", // Darker metallic border
    }}
  >
    <div
      className="relative flex items-center justify-center bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 py-0.5 pl-2 pr-3"
      style={{
        clipPath:
          "polygon(5px 0, 100% 0, calc(100% - 10px) 100%, 5px 100%, 0 50%)", // Updated clipPath for parallelogram cut
      }}
    >
      {/* Polished highlight glint */}
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
          textShadow: "0 1px 0px rgba(255, 255, 255, 0.4)", // Engraved text effect
        }}
      >
        Kevin Liu &apos;28
      </span>
    </div>
  </div>
);

// Logo component
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

// UPDATED: LogoContainer with a Smash Bros.-inspired animated line aesthetic
const LogoContainer = ({ children }: { children: React.ReactNode }) => {
  const lineContainerVariants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  // Adjusted rest opacity for subtle visibility
  const lineFromLeft = {
    rest: { opacity: 0.1, x: -30 },
    hover: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const lineFromRight = {
    rest: { opacity: 0.1, x: 30 }, // Adjusted rest opacity for subtle visibility
    hover: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative flex w-1/3 min-w-fit items-center overflow-hidden bg-slate-800/90 py-3 pl-4 pr-12 sm:pl-6 lg:pl-8"
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
      }}
    >
      {/* Container for the new line effects that activate on hover */}
      <motion.div
        variants={lineContainerVariants}
        className="absolute inset-0 z-0"
      >
        {/* --- SMASH BROS INSPIRED LINES --- */}
        {/* Main diagonal cross (bottom-left to top-right) */}
        <motion.div
          variants={lineFromLeft}
          className="absolute inset-0 bg-cyan-400/40"
          style={{
            clipPath: "polygon(0 100%, 15% 100%, 85% 0, 70% 0)",
          }}
        />
        {/* Secondary cross line (top-left to bottom-right, extends to top) */}
        <motion.div
          variants={lineFromLeft}
          className="absolute inset-0 bg-yellow-300/40"
          style={{
            clipPath: "polygon(0% 0%, 5% 0%, 100% 100%, 95% 100%)",
          }}
        />
        {/* Diagonal Line parallel to the container's edge (kept from original) */}
        <motion.div
          variants={lineFromRight}
          className="absolute inset-0 bg-cyan-300/70"
          style={{
            clipPath:
              "polygon(100% 0, calc(100% - 3px) 0, calc(100% - 43px) 100%, calc(100% - 40px) 100%)",
          }}
        />
      </motion.div>

      {/* The actual logo, placed on top of the effects */}
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
    isAutoBattleActive,
    toggleAutoBattle,
  } = useGame();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const speedLineVariant = {
    rest: { opacity: 0.2 },
    hover: {
      opacity: 0.5,
      x: -5,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      className="relative top-0 z-50 overflow-hidden border-b border-cyan-400/20 bg-slate-900 backdrop-blur-md"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* CONTAINER FOR ALL BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0">
        {/* Gradient fill that appears on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
        />

        {/* --- Targeting reticle that fades in on hover --- */}
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

        {/* Container for static and animated circuit lines */}
        <div className="relative h-full w-full opacity-40">
          {/* Static lines from original design */}
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
            variants={speedLineVariant}
            className="absolute inset-0 bg-cyan-200/50"
            style={{ clipPath: "polygon(50% 0, 51% 0, 65% 100%, 64% 100%)" }}
          />

          {/* --- Additional pulsing circuit lines for more activity --- */}
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

        {/* --- Perpetual vertical scanning line --- */}
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

      {/* Main content layout */}
      <div className="relative z-10 flex h-full w-full items-stretch justify-start">
        <LogoContainer>
          <PortfolioMonLogo />
        </LogoContainer>

        {/* Container for all buttons, pushed to the right */}
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

            {/* NEW: Game State Controls Section */}
            <ClippedGroupContainer>
              {/* Reset Button */}
              {(gameState === "fight" ||
                gameState === "gameOver" ||
                gameState === "forcedSwitch") && (
                <ClippedButton onClick={handleReset} title="Reset Game">
                  <RefreshCw className="h-5 w-5" />
                </ClippedButton>
              )}

              {/* Forfeit Button */}
              {(gameState === "fight" || gameState === "forcedSwitch") && (
                <ClippedButton onClick={handleRun} title="Forfeit Match">
                  <Flag className="h-5 w-5" />
                </ClippedButton>
              )}

              {/* Auto-Battle Button (Placeholder) */}
              {(gameState === "fight" || gameState === "forcedSwitch") && (
                <ClippedButton
                  onClick={toggleAutoBattle}
                  title="Toggle Auto-Battle"
                  className={
                    isAutoBattleActive ? "bg-cyan-400/20 text-cyan-300" : ""
                  }
                >
                  <Bot className="h-5 w-5" />
                </ClippedButton>
              )}

              {/* Confirm Team Button */}
              {gameState === "teamSelect" && (
                <ClippedButton
                  onClick={handleConfirmTeam}
                  title="Confirm Team"
                  disabled={playerTeam.length !== 3}
                >
                  <CheckSquare className="h-5 w-5" />
                </ClippedButton>
              )}

              {/* Start Battle Button */}
              {gameState === "teamPreview" && (
                <ClippedButton onClick={startBattle} title="Start Battle">
                  <Swords className="h-5 w-5" />
                </ClippedButton>
              )}
            </ClippedGroupContainer>

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

            <ClippedGroupContainer>
              <ClippedButton onClick={() => props.menuHandler()} title="Ask AI">
                <Image
                  src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                  alt="ChatGPT"
                  height={20}
                  width={20}
                  className="dark:invert"
                />
              </ClippedButton>
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

              {/* NEW: Game State Controls for Mobile */}
              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-around">
                  {/* Reset Button */}
                  {(gameState === "fight" ||
                    gameState === "gameOver" ||
                    gameState === "forcedSwitch") && (
                    <ClippedButton onClick={handleReset} title="Reset Game">
                      <RefreshCw className="h-5 w-5" />
                    </ClippedButton>
                  )}

                  {/* Forfeit Button */}
                  {(gameState === "fight" || gameState === "forcedSwitch") && (
                    <ClippedButton onClick={handleRun} title="Forfeit Match">
                      <Flag className="h-5 w-5" />
                    </ClippedButton>
                  )}

                  {/* Auto-Battle Button */}
                  {(gameState === "fight" || gameState === "forcedSwitch") && (
                    <ClippedButton
                      onClick={toggleAutoBattle}
                      title="Toggle Auto-Battle"
                      className={
                        isAutoBattleActive ? "bg-cyan-400/20 text-cyan-300" : ""
                      }
                    >
                      <Bot className="h-5 w-5" />
                    </ClippedButton>
                  )}

                  {/* Confirm Team Button */}
                  {gameState === "teamSelect" && (
                    <ClippedButton
                      onClick={handleConfirmTeam}
                      title="Confirm Team"
                      disabled={playerTeam.length !== 3}
                    >
                      <CheckSquare className="h-5 w-5" />
                    </ClippedButton>
                  )}

                  {/* Start Battle Button */}
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
              <ClippedGroupContainer className="w-full">
                <div className="flex w-full items-center justify-center">
                  <ClippedButton onClick={() => props.menuHandler()}>
                    <Image
                      src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                      alt="ChatGPT"
                      height={20}
                      width={20}
                      className="dark:invert"
                    />
                  </ClippedButton>
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
