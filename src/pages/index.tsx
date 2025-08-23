/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { api } from "~/utils/api";
import {
  ChatIcon,
  MailIcon,
  CursorClickIcon,
  ArchiveIcon,
  ArrowsExpandIcon,
  BookmarkAltIcon,
  CalculatorIcon,
  ChipIcon,
  CodeIcon,
  CreditCardIcon,
  DocumentSearchIcon,
  EyeIcon,
  IdentificationIcon,
  LibraryIcon,
  LightBulbIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PuzzleIcon,
  ScaleIcon,
  ServerIcon,
  SparklesIcon,
  TerminalIcon,
  TrashIcon,
  VariableIcon,
} from "@heroicons/react/solid";
import Navbar from "./components/navbar";
import Chat from "./components/chatgpt";

const projects = [
  {
    name: "Lumachor",
    url: "https://lumachor.vercel.app/home",
    description:
      "Lumachor is a context engine that gives every user the power of an expert prompt engineer by automatically injecting the perfect background knowledge into any conversation.",
    image: "/lumachor.png",
    icon: <ArrowsExpandIcon />,
  },
  {
    name: "HackPrinceton 2025S",
    url: "https://hack-princeton-fall-2025-demo.vercel.app/",
    description:
      "Main website/landing page for HackPrinceton Fall 2025, Princeton's premier hackathon.",
    image: "/hackprinceton25f.png",
    icon: <CodeIcon />,
  },
  {
    name: "Splitway",
    url: "https://splitway.vercel.app/",
    description: "Track expenses and split them with friends.",
    image: "/splitway.png",
    icon: <ArrowsExpandIcon />,
  },
  {
    name: "Lootbox Simulator",
    url: "https://lootboxsimulator.vercel.app/",
    description:
      "Simulator-style game where users can try opening different kinds of lootboxes.",
    image: "/lootboxsimulator.png",
    icon: <ArchiveIcon />,
  },
  {
    name: "PawPointClicker",
    url: "https://pawpointclicker.vercel.app/",
    description:
      "Cookie Clicker inspired game where you collect Princeton's Paw Points.",
    image: "/pawpointclicker.png",
    icon: <CreditCardIcon />,
  },
  {
    name: "HackPrinceton 2025S",
    url: "https://hack-princeton-spring-2025-demo.vercel.app/",
    description:
      "Main website/landing page for HackPrinceton Spring 2025, Princeton's premier hackathon.",
    image: "/hackprinceton25s.png",
    icon: <CodeIcon />,
  },
  {
    name: "HackPrinceton 2024F",
    url: "https://hack-princeton-fall-2024-demo.vercel.app/",
    description:
      "Main website/landing page for HackPrinceton Fall 2024, Princeton's premier hackathon.",
    image: "/hackprinceton24f.png",
    icon: <CodeIcon />,
  },
  {
    name: "SnellTech",
    url: "https://snelltech.vercel.app/",
    description:
      "Low-cost digital visual acuity exam using the Snellen Eye Chart.",
    image: "/snelltech.png",
    icon: <EyeIcon />,
  },
  {
    name: "LetMeCook",
    url: "https://letmecook.vercel.app/",
    description: "Scans your refrigerator to generate recipes using ChatGPT.",
    image: "/letmecook.png",
    icon: <LightBulbIcon />,
  },
  {
    name: "Balladeer",
    url: "https://balladeer.vercel.app/",
    description: "Generates full study guides for literary works.",
    image: "/balladeer.jpg",
    icon: <LibraryIcon />,
  },
  {
    name: "CompassUSA",
    url: "https://compass-usa.vercel.app/",
    description: "A tool to help immigrants find support and resources.",
    image: "/compassusa.jpg",
    icon: <IdentificationIcon />,
  },
  {
    name: "ApneaAlert",
    url: "https://apnea-alert-git-main-kevin-liu-01.vercel.app/",
    description:
      "Apnea Alert is an affordable wearable sensor to help you sleep soundly.",
    image: "/apnea-alert.png",
    icon: <ChipIcon />,
  },
  {
    name: "Iron Triangle",
    url: "https://iron-triangle.vercel.app/",
    description: "U.S. History II Final; Analyzes Military Industrial Complex.",
    image: "/irontriangle.png",
    icon: <ScaleIcon />,
  },
  {
    name: "AdventureGPT",
    url: "https://adventuregpt.vercel.app/",
    description:
      "Generates unique, exciting stories based on a user-inputted prompt.",
    image: "/adventuregpt.png",
    icon: <SparklesIcon />,
  },
  {
    name: "EditorGPT",
    url: "https://editorgpt.vercel.app/",
    description: "A code editor that allows ChatGPT to review your code.",
    image: "/editorgpt.png",
    icon: <DocumentSearchIcon />,
  },

  {
    name: "OMMC Portal",
    url: "https://ommc-test-portal.vercel.app/",
    description: "The official test portal of the OMMC competition.",
    image: "/ommcportal.jpg",
    icon: <CalculatorIcon />,
  },
  {
    name: "OMMC Sample Portal",
    url: "https://ommc-sample-portal.vercel.app/",
    description: "The official sample test portal of OMMC.",
    image: "/ommcsampleportal.png",
    icon: <CalculatorIcon />,
  },
  {
    name: "Enkrateia",
    url: "https://enkrateia.vercel.app/",
    description:
      "An application that accesses the ChatGPT 3.5 and GPT-4 models using the OpenAI API",
    image: "/enkrateia.png",
    icon: <TerminalIcon />,
  },
  {
    name: "HD Transcribe",
    url: "https://hd-transcribe.vercel.app",
    description:
      "Accesses a novel speech model designed to understand patients with Huntington's Disease",
    image: "/hd-transcribe.png",
    icon: <MicrophoneIcon />,
  },
  {
    name: "OMMC",
    url: "https://www.ommcofficial.org",
    description:
      "The official website of the Online Monmouth Math Competition, an online math competition for students across the country.",
    image: "/ommc.png",
    icon: <VariableIcon />,
  },
  {
    name: "OMMC Atlas",
    url: "https://ommc-atlas.vercel.app/",
    description:
      "The fullstack database for all OMMC questions. Includes all Year 1 questions from 2020-2021.",
    image: "/ommc-atlas.png",
    icon: <ServerIcon />,
  },
  {
    name: "RecyclAIble",
    url: "https://recyclaible.vercel.app/",
    description:
      "Hackathon project to use computer vision for smart recycling. Won 1st in Hardware at PennApps XXIII!",
    image: "/recyclaible.png",
    icon: <TrashIcon />,
  },
  {
    name: "PlantSTEM",
    url: "https://plant-stem.vercel.app/",
    description:
      "A website to help students learn about subjects like Math and Physics, as well as Chess!",
    image: "/plantstem.png",
    icon: <BookmarkAltIcon />,
  },
  {
    name: "Tutorial",
    url: "https://tutorial-nu.vercel.app/",
    description:
      "An app to help tutors and pupils connect with each other and create listings.",
    image: "/tutorial.png",
    icon: <PaperClipIcon />,
  },
  {
    name: "Satellite Crafter",
    url: "https://satellite-crafter.vercel.app/",
    description:
      "My first app! A game to create satellites from certain parts.",
    image: "/satellitecrafter.png",
    icon: <PuzzleIcon />,
  },
];

const Home: NextPage = () => {
  const [pattern, setPattern] = useState("cross");
  const [translate, setTranslate] = useState(false);
  const [font, setFont] = useState("font-general");
  const [imageState, setImageState] = useState(true);

  const patternBG = () => {
    if (pattern === "cross") {
      setPattern("dots");
    } else if (pattern === "dots") {
      setPattern("paper");
    } else {
      setPattern("cross");
    }
  };

  const patternStyles = () => {
    const defaultPattern =
      "z-5 absolute h-full w-full pattern-gray-500 dark:pattern-gray-400 pattern-bg-gray-300 dark:pattern-bg-gray-800 pattern-opacity-20 pattern-size-8 duration-150";
    if (pattern === "cross") {
      return defaultPattern + " pattern-cross";
    } else if (pattern === "dots") {
      return defaultPattern + " pattern-dots";
    } else {
      return defaultPattern + " pattern-paper";
    }
  };

  const menuHandler = () => {
    setTranslate(!translate);
  };

  const fontInitializer = () => {
    if (font === "font-general") {
      setFont("font-satoshi");
    } else if (font === "font-satoshi") {
      // setFont("font-azeret");
      setFont("font-clash");
    } else if (font === "font-azeret") {
      setFont("font-clash");
    } else {
      setFont("font-general");
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div className={font}>
        <Navbar
          pattern={pattern}
          patternBG={patternBG}
          menuHandler={menuHandler}
          fontInitializer={fontInitializer}
        />
        <button
          className="absolute bottom-4 right-4 z-20 rounded-2xl bg-gptLight p-2 text-white shadow-lg  duration-150 hover:bg-orange-500"
          onClick={() => menuHandler()}
        >
          <ChatIcon className="h-12 w-12" />
        </button>
        <Chat translate={translate} setTranslate={setTranslate} />
        <div className="min-h-[calc(100vh-4.8rem)] overflow-hidden bg-gradient-to-b  from-gray-100 to-gray-200 duration-150 dark:from-gray-800 dark:to-gray-900 sm:max-h-[calc(100vh-4.8rem)] ">
          <div className="relative z-10 grid w-full sm:h-[calc(100vh-4.8rem)] lg:grid-cols-9">
            <button
              className="relative col-span-2 hidden border-r-[1.5px] border-gray-600 bg-gray-900 lg:block"
              onClick={() => setImageState(!imageState)}
            >
              <Image
                src="/images/kevin_sidebar2.png"
                height={980}
                width={980}
                className={
                  imageState
                    ? "z-5 absolute h-full w-auto translate-x-[-100%] object-cover duration-150"
                    : "z-5 absolute h-full w-auto translate-x-0 object-cover duration-150"
                }
                alt="Kevin2"
              />
              <Image
                src="/images/kevin_sidebar.png"
                height={980}
                width={980}
                className={
                  imageState
                    ? "z-5  h-full w-auto translate-x-0 object-cover duration-150  "
                    : "z-5  h-full w-auto translate-x-[-100%] object-cover duration-150"
                }
                alt="Kevin"
              />
              <div className="absolute bottom-0 mx-auto h-full w-full font-medium text-transparent duration-200 hover:text-orange-400 ">
                Go Tigers!
              </div>
            </button>
            <div className="col-span-7">
              <div className={patternStyles()}></div>

              <div className="relative z-10 flex w-full flex-row border-b-[1.5px] border-gray-600 bg-gradient-to-r text-gray-900  dark:from-gray-800 dark:to-gray-900 dark:text-white ">
                <button
                  className="block max-w-[10rem] sm:max-w-[5rem] lg:hidden"
                  onClick={() => setImageState(!imageState)}
                >
                  <Image
                    src="/images/kevin_sidebar2.png"
                    height={980}
                    width={980}
                    className={
                      imageState
                        ? "z-5 absolute h-full w-auto translate-x-[-100%] object-cover duration-150"
                        : "z-5 absolute h-full w-auto translate-x-0 object-cover duration-150"
                    }
                    alt="Kevin2"
                  />
                  <Image
                    src="/images/kevin_sidebar.png"
                    height={980}
                    width={980}
                    className={
                      imageState
                        ? "z-5  h-full w-auto translate-x-0 object-cover duration-150  "
                        : "z-5  h-full w-auto translate-x-[-100%] object-cover duration-150"
                    }
                    alt="Kevin"
                  />
                </button>
                <h1 className="hidden select-none items-center px-0 text-[1.4rem] font-extrabold tracking-tight duration-75 sm:flex sm:pl-4 md:text-[1.2rem] lg:text-[2.5rem] xl:text-[3.3rem] 2xl:text-[4.5rem]">
                  <span className="inline pl-3 pr-1 sm:pl-0 xl:pr-2">
                    Hi there,{" "}
                  </span>
                  <span className="text-orange-500">{" I'm Kevin."}</span>
                </h1>
                <div className="relative z-10 mr-2 ml-2 grid items-center justify-center border-gray-600 py-4 px-0 sm:border-l-[1.5px] sm:px-4 md:grid-cols-2 lg:ml-auto lg:pl-6">
                  <h1 className="inline-block select-none flex-wrap px-0 text-2xl font-extrabold tracking-tight duration-75 sm:hidden sm:px-4 lg:text-[2rem] xl:text-[3.5rem] 2xl:text-[4.5rem]">
                    <span className="">Hi there, </span>
                    <span className="text-orange-500">{"I'm Kevin."}</span>
                  </h1>
                  <div className=" hidden flex-col gap-1 text-xs dark:flex sm:text-sm xl:text-lg">
                    <Link
                      href="https://www.linkedin.com/in/kevin-liu-2495b6205/"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <Image
                        width={400}
                        height={400}
                        src="/images/linkedin.svg"
                        className="svgfill mr-2 mb-1 inline h-6 w-6 rounded-sm"
                        alt="Linkedin"
                      />
                      Kevin Liu
                    </Link>
                    <Link
                      href="https://github.com/Kevin-Liu-01"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <Image
                        width={400}
                        height={400}
                        src="/images/github.svg"
                        className="svgfill mr-2 inline h-6 w-6"
                        alt="GitHub"
                      />
                      Kevin-Liu-01
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1 text-xs dark:hidden sm:text-sm xl:text-lg">
                    <Link
                      href="https://www.linkedin.com/in/kevin-liu-2495b6205/"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <Image
                        width={400}
                        height={400}
                        src="/images/linkedin.svg"
                        className=" mr-2 inline h-6 w-6 rounded-sm"
                        alt="Linkedin"
                      />
                      Kevin Liu
                    </Link>
                    <Link
                      href="https://github.com/Kevin-Liu-01"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <Image
                        width={400}
                        height={400}
                        src="/images/github.svg"
                        className=" mr-2 inline h-6 w-6"
                        alt="GitHub"
                      />
                      Kevin-Liu-01
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1 text-xs sm:text-sm xl:text-lg">
                    <Link
                      href="mailto:k.bowen.liu@gmail.com"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <MailIcon className="mr-1 inline h-6 w-6 " />
                      k.bowen.liu
                      <span className="">@gmail.com</span>
                    </Link>
                    <Link
                      href="https://devpost.com/Kevin-Liu-01"
                      className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                    >
                      <Image
                        width={400}
                        height={400}
                        src="/images/devpost.svg"
                        className="mr-2 inline h-6 w-6 dark:invert"
                        alt="Devpost"
                      />
                      Kevin-Liu-01
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="mt-28 ml-2 text-3xl">I love making web apps </div> */}
              <div className=" scrollbar max-h-auto relative max-h-[calc(100vh-16rem)] overflow-x-hidden overflow-y-scroll sm:max-h-[calc(100vh-10rem)] ">
                <div className="w-full border-b-[1.5px] border-gray-600 bg-gray-100 bg-opacity-60 p-4 text-xs dark:bg-gray-900 lg:text-sm xl:text-base">
                  {
                    "I'm a freshman at Princeton University with a passion for science and technology! I love exploring the latest innovations in computer science, software engineering, and AI/ML modeling. I'm an expert at full-stack MERN software development with all the latest frontend and backend languages and technologies, including React.js, Next13, MongoDB, and Tailwind. I've also got some serious design chops, which means I can create UIs that not only look amazing, but are also easy to use. But that's not all! I've also got plenty of experience in research and development, both in scientific study and in software projects. I'm always excited to dive into something new and push the boundaries of what's possible with technology. There's nothing quite like the feeling of building something from scratch and seeing it come to life!"
                  }
                </div>
                <p className="flex px-4 pb-4 pt-2 font-semibold ">
                  <CursorClickIcon className="mr-1 inline h-6 w-6 " /> Hover
                  over to view some of my favorite projects:
                </p>
                <div className="grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 ">
                  {projects.map((project) => (
                    <Link
                      href={project.url}
                      key={project.name}
                      className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gptLight p-0.5 shadow-md duration-150 hover:scale-[1.02] dark:bg-gptDark"
                    >
                      <div className="absolute top-0 right-0 z-10 rounded-bl-full  bg-gptLight p-2 pl-4 pb-4  duration-150 dark:bg-gptDark">
                        <div className="h-6 w-6 text-gray-900 duration-150 dark:text-gray-50">
                          {project.icon}
                        </div>
                      </div>
                      <Image
                        src={"/images" + project.image}
                        height={980}
                        width={980}
                        className="h-full w-full rounded-[0.65rem] object-cover"
                        alt={project.name}
                      />
                      <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-xl bg-gpt bg-opacity-90 px-4 text-center font-semibold opacity-0 duration-150 hover:opacity-100 dark:bg-gptDark">
                        <span className="mb-2 rounded-md border border-black bg-gpt px-2 font-bold dark:border-white dark:bg-gptDark ">
                          {project.name}
                        </span>
                        {project.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
