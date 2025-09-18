import { motion } from "framer-motion";
import { useGame } from "../../providers/gameProvider";
import { TypeBadge } from "../battle/battle";
import { AnimatedBackground, HighTechEffects, PulsingCircuit } from "./teamUI";
import Image from "next/image";

export const TeamPreviewScreen = () => {
  const { playerTeamState, cpuTeamState, startBattle } = useGame();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
      <AnimatedBackground />
      <HighTechEffects />
      <PulsingCircuit />
      <div className="relative z-10 flex flex-col items-center pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 drop-shadow-lg dark:text-white md:text-6xl">
            BATTLE START!
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            Your team is ready for the challenge.
          </p>
        </motion.div>
        <div className="mt-8 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            className="w-full space-y-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.2 }}
          >
            <h2 className="text-center text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              YOUR TEAM
            </h2>
            {playerTeamState.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="bg-slate-300 p-px shadow-lg backdrop-blur-sm dark:bg-slate-700"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="flex h-full w-full items-center gap-4 bg-slate-200/80 p-3 dark:bg-slate-800/80"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                  }}
                >
                  <div
                    className="relative h-16 w-16 flex-shrink-0 bg-slate-300/50 p-1 dark:bg-slate-900/50"
                    style={{
                      clipPath:
                        "polygon(0 10px, 10px 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-800 dark:text-white">
                      {p.name}
                    </p>
                    <div className="mt-1 flex gap-1">
                      <TypeBadge type={p.type1} size="xs" />
                      {p.type2 && <TypeBadge type={p.type2} size="xs" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
            className="mx-12 text-6xl font-black text-slate-400 dark:text-slate-600"
          >
            VS
          </motion.div>
          <motion.div
            className="w-full space-y-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, staggerChildren: 0.2 }}
          >
            <h2 className="text-center text-2xl font-bold text-red-500">
              CPU TEAM
            </h2>
            {cpuTeamState.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="bg-slate-300 p-px text-right shadow-lg backdrop-blur-sm dark:bg-slate-700"
                style={{
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
                }}
              >
                <div
                  className="flex h-full w-full items-center justify-end gap-4 bg-slate-200/80 p-3 dark:bg-slate-800/80"
                  style={{
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
                  }}
                >
                  <div>
                    <p className="text-base font-bold text-slate-800 dark:text-white">
                      {p.name}
                    </p>
                    <div className="mt-1 flex justify-end gap-1">
                      <TypeBadge type={p.type1} size="xs" />
                      {p.type2 && <TypeBadge type={p.type2} size="xs" />}
                    </div>
                  </div>
                  <div
                    className="relative h-16 w-16 flex-shrink-0 bg-slate-300/50 p-1 dark:bg-slate-900/50"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 10px, calc(100% - 10px) 100%, 0 100%)",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 1,
            },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(45, 212, 191, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={startBattle}
          className="relative mt-10 bg-green-500 px-10 py-4 text-2xl font-bold text-white shadow-lg transition"
          style={{
            clipPath:
              "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
          }}
        >
          FIGHT!
        </motion.button>
      </div>
    </div>
  );
};
