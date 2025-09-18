import { type NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/navbar";
import GameScreenManager from "../components/game/gameScreenManager";

const Home: NextPage = () => {
  const [translate, setTranslate] = useState(false);
  // --- PAGE LAYOUT STATE ---
  // const [pattern, setPattern] = useState("cross");
  const [font, setFont] = useState("font-exo");

  // --- PAGE LAYOUT HANDLERS ---
  // const patternBG = () =>
  //   setPattern((p) =>
  //     p === "cross" ? "dots" : p === "dots" ? "paper" : "cross"
  //   );
  const fontInitializer = () =>
    setFont((f) =>
      f === "font-orbiter"
        ? "font-hanken"
        : f === "font-hanken"
        ? "font-racing"
        : "font-orbiter"
    );
  // const patternStyles = () =>
  //   `absolute inset-0 z-0 h-full w-full pattern-gray-500/10 pattern-bg-transparent pattern-size-6 transition-opacity duration-300 ${
  //     pattern === "cross"
  //       ? "pattern-cross"
  //       : pattern === "dots"
  //       ? "pattern-dots"
  //       : "pattern-paper"
  //   }`;

  return (
    <main
      className={`relative h-screen overflow-hidden bg-slate-900 ${font}`}
      style={{
        fontFamily:
          font === "font-orbiter" ? "'Orbiter', sans-serif" : undefined,
      }}
    >
      {/* <div className={patternStyles()} /> */}
      <div className="relative z-20">
        <Navbar
          menuHandler={() => setTranslate(!translate)}
          fontInitializer={fontInitializer}
        />
      </div>

      <div className="relative z-10 h-[calc(100vh-4.8rem)] w-full">
        <GameScreenManager />
      </div>
    </main>
  );
};

export default Home;
