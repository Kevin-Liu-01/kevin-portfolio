// --- HELPER & NEW UI COMPONENTS ---
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  XCircle,
  ArrowLeft,
  Heart,
  PlusCircle,
  HelpCircle,
  ExternalLink,
  X,
} from "lucide-react";
import type {
  PlayerInventory,
  Item,
  BattleReadyMon,
  AnimationState,
} from "../../context/gameContext";

// --- TYPE & STATUS STYLING ---
export const typeStyles: {
  [key: string]: { bg: string; border: string; text: string };
} = {
  AI: { bg: "bg-purple-500", border: "border-purple-400", text: "text-white" },
  Data: { bg: "bg-blue-500", border: "border-blue-400", text: "text-white" },
  Web: { bg: "bg-green-500", border: "border-green-400", text: "text-white" },
  Design: { bg: "bg-pink-500", border: "border-pink-400", text: "text-white" },
  Hardware: {
    bg: "bg-gray-500",
    border: "border-gray-400",
    text: "text-white",
  },
  Health: { bg: "bg-red-500", border: "border-red-400", text: "text-white" },
  Mobile: {
    bg: "bg-yellow-500",
    border: "border-yellow-400",
    text: "text-black",
  },
  Game: {
    bg: "bg-orange-500",
    border: "border-orange-400",
    text: "text-white",
  },
};

export const TypeBadge = ({ type }: { type: string }) => {
  const style = typeStyles[type] || {
    bg: "bg-gray-200",
    border: "border-gray-300",
    text: "text-black",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-bold ${style.bg} ${style.text}`}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
    >
      {type}
    </span>
  );
};

export const ForcedSwitchScreen = () => (
  <motion.div
    key="forced-switch"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex h-full flex-col items-center justify-center text-center"
  >
    <XCircle className="h-12 w-12 text-red-500" />
    <p className="mt-4 text-lg font-bold">Your Project has fainted!</p>
    <p className="text-sm text-slate-400">
      Choose another Project from your team to continue.
    </p>
  </motion.div>
);

export const BackgroundEffects = ({
  playerAnimation,
  cpuAnimation,
}: {
  playerAnimation: AnimationState;
  cpuAnimation: AnimationState;
}) => {
  return (
    <>
      {playerAnimation === "attack" && (
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 30% 65%, rgba(0, 220, 255, 0.4), transparent 40%)",
          }}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        />
      )}

      {cpuAnimation === "hit" && (
        <motion.div
          className="absolute right-[10%] top-[15%] h-1/4 w-1/4"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 60%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {cpuAnimation === "attack" && (
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(255, 80, 80, 0.4), transparent 40%)",
          }}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        />
      )}

      {playerAnimation === "hit" && (
        <motion.div
          className="absolute bottom-[40%] left-[12%] h-1/3 w-1/3"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 60%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </>
  );
};

export const ActionButton = ({
  onClick,
  disabled = false,
  children,
  icon,
  color,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon: JSX.Element;
  color: string;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-50 ${color}`}
    disabled={disabled} // Sci-fi Update: Added clip-path for angular button style
    style={{
      clipPath:
        "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
    }}
  >
    {icon} {children}
  </motion.button>
);

export const SwitchItemView = ({
  onCancel,
  title,
}: {
  onCancel: () => void;
  title: string;
}) => (
  <motion.div
    key="switch-item-view"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex h-full flex-col items-center justify-center text-center"
  >
    <p className="mb-4 text-lg font-bold">{title}</p>
    <motion.button
      onClick={onCancel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-2 bg-red-600 px-6 py-2 font-bold text-white shadow-md transition-colors hover:bg-red-500" // Sci-fi Update: Added clip-path
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
      }}
    >
      <ArrowLeft className="h-5 w-5" /> Back
    </motion.button>
  </motion.div>
);

export const ItemMenu = ({
  inventory,
  onItemSelect,
  onCancel,
}: {
  inventory: PlayerInventory;
  onItemSelect: (item: Item) => void;
  onCancel: () => void;
}) => {
  const items = Object.values(inventory).filter((i) => i.quantity > 0);

  const itemIcons: { [key: string]: JSX.Element } = {
    "API Key": <Heart className="h-5 w-5 text-red-400" />,
    Debugger: <PlusCircle className="h-5 w-5 text-green-400" />,
  };

  return (
    <motion.div
      key="items"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="relative flex h-full flex-col"
    >
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-bold">Your Items</h3>
        <button
          onClick={onCancel}
          className="rounded-full bg-slate-600 p-1 text-white shadow-md transition hover:bg-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-grow space-y-2 overflow-y-auto pr-2">
        {items.length > 0 ? (
          items.map(({ item, quantity }) => (
            <motion.button
              key={item.name}
              onClick={() => onItemSelect(item)}
              className="w-full bg-slate-700/80 p-2 text-left shadow-sm transition hover:bg-slate-700"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {itemIcons[item.name] || (
                    <HelpCircle className="h-5 w-5 text-slate-400" />
                  )}

                  <div>
                    <p className="font-bold">{item.name}</p>

                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </div>

                <span
                  className="bg-slate-600 px-3 py-1 text-sm font-bold"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  x{quantity}
                </span>
              </div>
            </motion.button>
          ))
        ) : (
          <p className="pt-8 text-center text-slate-400">No items available.</p>
        )}
      </div>
    </motion.div>
  );
};

export const StatBar = ({
  label,
  value,
  maxValue = 200,
}: {
  label: string;
  value: number;
  maxValue?: number;
}) => (
  <div className="grid grid-cols-6 items-center gap-2 text-xs">
    <span className="col-span-1 font-bold uppercase text-slate-400">
      {label}
    </span>

    <div
      className="col-span-4 w-full bg-slate-600/50"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
      }}
    >
      <motion.div
        className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${(value / maxValue) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
        }}
      />
    </div>
    <span className="col-span-1 font-bold text-white">{value}</span>
  </div>
);

export const InfoBox = ({
  mon,
  isPlayer,
}: {
  mon: BattleReadyMon;
  isPlayer: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    transition={{ ease: "easeOut", duration: 0.2 }}
    className={`pointer-events-auto absolute left-0 z-20 w-full border border-slate-600 bg-slate-800/90 p-3 text-white shadow-lg backdrop-blur-sm ${
      isPlayer ? "bottom-[calc(100%+0.5rem)]" : "top-[calc(100%+0.5rem)]"
    }`}
    style={{
      clipPath: isPlayer
        ? "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)"
        : "polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)",
    }}
  >
    <h4 className="font-bold text-cyan-300">{mon.name}</h4>
    <p className="my-2 text-sm text-slate-300">{mon.description}</p>
    <div className="my-3 space-y-1 border-t border-slate-600 pt-2">
      <h5 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
        Base Stats
      </h5>
      <StatBar label="HP" value={mon.stats.hp} />
      <StatBar label="ATK" value={mon.stats.atk} />
      <StatBar label="DEF" value={mon.stats.def} />
      <StatBar label="SPD" value={mon.stats.spd} />
    </div>

    <Link
      href={mon.url}
      className="mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-cyan-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
      }}
    >
      Visit Project <ExternalLink className="h-4 w-4" />
    </Link>
  </motion.div>
);

export const GuideModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const typeChart: { [attacker: string]: { [defender: string]: number } } = {
    AI: { Data: 2, Web: 0.5, Hardware: 0.5, Game: 2 },
    Data: { AI: 0.5, Design: 2, Health: 2, Game: 0.5 },
    Web: { Mobile: 2, AI: 2, Design: 0.5, Data: 0.5 },
    Design: { Web: 2, Game: 2, Data: 0.5 },
    Hardware: { AI: 2, Health: 0.5, Mobile: 2, Web: 0.5 },
    Health: { Hardware: 2, Game: 0.5, Data: 0.5 },
    Mobile: { Web: 0.5, Hardware: 0.5, Game: 2, Design: 2 },
    Game: { AI: 0.5, Design: 0.5, Health: 2, Data: 2, Mobile: 0.5 },
  };
  const types = Object.keys(typeChart);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex h-full max-h-[90vh] w-full max-w-3xl flex-col border border-slate-600 bg-slate-800 shadow-2xl"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            style={{
              clipPath:
                "polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)",
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-700 p-4">
              <h2 className="text-2xl font-bold text-cyan-300">Battle Guide</h2>

              <button
                onClick={onClose}
                className="rounded-full bg-slate-700 p-1 text-white transition hover:bg-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Turn Actions</h3>

                  <ul className="list-inside list-disc space-y-2 text-slate-300">
                    <li>
                      <strong>Fight:</strong> Attack with a chosen move.
                    </li>

                    <li>
                      <strong>Switch:</strong> Swap your active Project with
                      another.
                    </li>

                    <li>
                      <strong>Items:</strong> Use an item from your bag.
                    </li>

                    <li>
                      <strong>Run:</strong> Forfeit the battle.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Status Conditions
                  </h3>

                  <ul className="list-inside list-disc space-y-2 text-slate-300">
                    <li>
                      <strong className="text-orange-400">Burn:</strong> Takes
                      damage each turn.
                    </li>

                    <li>
                      <strong className="text-purple-400">Poison:</strong> Takes
                      damage each turn.
                    </li>

                    <li>
                      <strong className="text-gray-400">Sleep:</strong>{" "}
                      Can&apos;t move for 1-3 turns.
                    </li>

                    <li>
                      <strong className="text-yellow-400">Stun:</strong> 25%
                      chance to be unable to move.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-2 text-lg font-semibold">
                  Type Effectiveness Chart
                </h3>

                <p className="mb-4 text-sm text-slate-400">
                  Rows are Attacking types, Columns are Defending types.
                </p>

                <div
                  className="overflow-x-auto border border-slate-700"
                  style={{
                    clipPath:
                      "polygon(0 8px, 8px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <table className="w-full min-w-[500px] border-collapse text-center text-xs">
                    <thead>
                      <tr className="bg-slate-900/50">
                        <th className="sticky left-0 z-10 bg-slate-800 p-2 font-semibold text-slate-400">
                          ATK \ DEF
                        </th>

                        {types.map((def) => (
                          <th key={def} className="p-1">
                            <TypeBadge type={def} />
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-700">
                      {types.map((atk) => (
                        <tr key={atk} className="hover:bg-slate-700/50">
                          <td className="sticky left-0 z-10 bg-slate-800 p-1">
                            <TypeBadge type={atk} />
                          </td>

                          {types.map((def) => {
                            const multiplier = typeChart[atk]?.[def] ?? 1;
                            return (
                              <td key={def} className="p-1 font-mono">
                                <span
                                  className={`flex h-6 w-8 items-center justify-center text-white ${
                                    multiplier > 1
                                      ? "bg-green-500/80"
                                      : multiplier < 1
                                      ? "bg-red-500/80"
                                      : "bg-slate-700 text-slate-400"
                                  }`}
                                  style={{
                                    clipPath:
                                      "polygon(0 0, 100% 0, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
                                  }}
                                >
                                  {multiplier}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
