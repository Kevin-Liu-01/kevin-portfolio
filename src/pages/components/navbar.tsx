import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  PlusIcon,
  ViewGridIcon,
  DotsHorizontalIcon,
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = (props: {
  pattern: string;
  patternBG: () => void;
  menuHandler: () => void;
  fontInitializer: () => void;
}) => {
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return (
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        className="rounded-xl border-2 border-white/10 p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {currentTheme === "dark" ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>
    );
  };

  const patternSelector = () => {
    switch (props.pattern) {
      case "cross":
        return <PlusIcon className="h-5 w-5" />;
      case "dots":
        return <DotsHorizontalIcon className="h-5 w-5" />;
      default:
        return <ViewGridIcon className="h-5 w-5" />;
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/triangle.png"
            alt="logo"
            height={28}
            width={28}
            className="rotate-90 transition hover:rotate-180"
          />
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Kevin Liu{" "}
            <span className="ml-1 text-sm font-medium text-orange-500">
              {"'28"}
            </span>
          </h1>
        </div>

        {/* Desktop Groups */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* User group */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/60 px-1 py-1 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <UserCircleIcon className="h-full w-full text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <button
              onClick={session ? () => void signOut() : () => void signIn()}
              className="rounded-xl border-2 border-white/10 p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {session ? (
                <LogoutIcon className="h-5 w-5" />
              ) : (
                <LoginIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Customization group */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/60 px-1 py-1 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
            <button
              onClick={() => props.patternBG()}
              className="rounded-xl border-2 border-white/10 p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {patternSelector()}
            </button>

            <button
              onClick={() => props.fontInitializer()}
              className="rounded-xl border-2 border-white/10 p-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <div className="h-5 w-5">F</div>
            </button>

            {renderThemeChanger()}
          </div>

          {/* Integration group */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/60 px-1 py-1 shadow-sm dark:border-gray-700 dark:bg-gray-800/60">
            <button
              onClick={() => props.menuHandler()}
              className="rounded-xl border-2 border-white/10 p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Image
                src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                alt="ChatGPT"
                height={20}
                width={20}
                className="dark:invert"
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border-2 border-white/10 p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {menuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu with framer-motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-200 bg-white/95 shadow-md dark:border-gray-700 dark:bg-gray-900/95 sm:hidden"
          >
            <div className="space-y-3 p-4">
              {/* User group */}
              <div className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white/60 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/60">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-full w-full text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {session?.user?.name ?? "Guest"}
                  </span>
                </div>
                <button
                  onClick={session ? () => void signOut() : () => void signIn()}
                  className="rounded-xl border-2 border-white/10 p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {session ? (
                    <LogoutIcon className="h-5 w-5" />
                  ) : (
                    <LoginIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Customization group */}
              <div className="flex items-center justify-around gap-2 rounded-xl border border-gray-200 bg-white/60 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/60">
                <button
                  onClick={() => props.patternBG()}
                  className="rounded-xl border-2 border-white/10 p-2"
                >
                  {patternSelector()}
                </button>
                <button
                  onClick={() => props.fontInitializer()}
                  className="rounded-xl border-2 border-white/10 p-2 text-sm font-semibold"
                >
                  <div className="h-5 w-5">F</div>
                </button>
                {renderThemeChanger()}
              </div>

              {/* Integration group */}
              <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/60 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/60">
                <button
                  onClick={() => props.menuHandler()}
                  className="rounded-xl border-2 border-white/10 p-2"
                >
                  <Image
                    src="https://cdn.cdnlogo.com/logos/c/38/ChatGPT.svg"
                    alt="ChatGPT"
                    height={20}
                    width={20}
                    className="dark:invert"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
