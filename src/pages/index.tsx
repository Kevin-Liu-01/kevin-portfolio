import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  useState,
  useEffect,
  type SetStateAction,
  type FormEvent,
} from "react";
// import { api } from "~/utils/api";
import {
  UserCircleIcon,
  ServerIcon,
  AnnotationIcon,
  ArrowNarrowRightIcon,
  ClockIcon,
  TrashIcon,
  XIcon,
  PhoneIcon,
  MailIcon,
} from "@heroicons/react/solid";
import { env } from "../env.mjs";
import Navbar from "./components/navbar";
import Chat from "./components/chatgpt";

const projects = [
  {
    name: "Enkrateia",
    url: "https://enkrateia.vercel.app/",
    description: "An application to access the GPT-4 API.",
    image: "/enkrateia.png",
  },
  {
    name: "HD Transcribe",
    url: "https://hd-transcribe.vercel.app",
    description:
      "Accesses a speech model designed to understand patients with Huntington's Disease",
    image: "/hd-transcribe.png",
  },
  {
    name: "OMMC",
    url: "https://www.ommcofficial.org",
    description: "The official website of the Online Monmouth Math Competition",
    image: "/ommc.png",
  },
  {
    name: "OMMC Atlas",
    url: "https://ommc-atlas.vercel.app/",
    description: "The fullstack database for all OMMC questions",
    image: "/ommc-atlas.png",
  },
  {
    name: "RecyclAIble",
    url: "https://recyclaible.vercel.app/",
    description: "Hackathon project to use computer vision for smart recycling",
    image: "/recyclaible.png",
  },
  {
    name: "PlantSTEM",
    url: "https://plant-stem.vercel.app/",
    description:
      "A website to help students learn about subjects like Math and Physics",
    image: "/plantstem.png",
  },
  {
    name: "Tutorial",
    url: "https://tutorial-nu.vercel.app/",
    description: "An app to help tutors and pupils connect with each other",
    image: "/tutorial.png",
  },
  {
    name: "Satellite Crafter",
    url: "https://satellite-crafter.vercel.app/",
    description: "My first app! A game to create satellites from certain parts",
    image: "/satellitecrafter.png",
  },
];

const Home: NextPage = () => {
  const { data: session } = useSession();
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
      "z-5 absolute h-full w-full pattern-gray-500 dark:pattern-gray-500 pattern-bg-gray-300 dark:pattern-bg-gray-900 pattern-opacity-20 pattern-size-8 duration-150";
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
    <main className={font}>
      <Navbar
        pattern={pattern}
        patternBG={patternBG}
        menuHandler={menuHandler}
        fontInitializer={fontInitializer}
      />
      <div className="max-h-[calc(100vh-3.6rem)] min-h-[calc(100vh-3.6rem)] overflow-hidden  bg-gradient-to-b from-gray-100 to-gray-200 duration-150 dark:from-gray-800 dark:to-gray-900 ">
        <div className="relative z-10 grid h-[calc(100vh-3.6rem)] w-full grid-cols-9">
          <button
            className="relative col-span-2"
            onClick={() => setImageState(!imageState)}
          >
            <Image
              src="/images/kevin_sidebar2.jpg"
              height={980}
              width={980}
              className={
                imageState
                  ? "z-5 absolute h-full w-auto translate-x-[-100%] border-r border-gray-600 object-cover duration-150"
                  : "z-5 absolute h-full w-auto translate-x-0 border-r border-gray-600 object-cover duration-150"
              }
              alt="Kevin2"
            />
            <Image
              src="/images/kevin_sidebar.jpg"
              height={980}
              width={980}
              className={
                imageState
                  ? "z-5  h-full w-auto translate-x-0 border-r border-gray-600 object-cover duration-150  "
                  : "z-5  h-full w-auto translate-x-[-100%] border-r border-gray-600 object-cover duration-150"
              }
              alt="Kevin"
            />
          </button>
          <div className="col-span-7 px-2">
            <div className="flex h-[6rem] flex-row">
              <div className={patternStyles()}></div>
              <h1 className="absolute top-0 mt-6  hidden select-none text-2xl font-extrabold tracking-tight duration-75 dark:text-white lg:inline lg:text-4xl 2xl:text-[5rem]">
                <span className="">Hi there, </span>
                <span className="text-orange-500">{"I'm Kevin."}</span>
              </h1>
              <div className="relative z-10 ml-auto mr-2 grid grid-cols-1 items-center justify-center  p-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <Link
                    href="https://www.linkedin.com/in/kevin-liu-2495b6205/"
                    className="hover:underline"
                  >
                    <Image
                      width={400}
                      height={400}
                      src="/images/linkedin.svg"
                      className="svgfill mr-2 inline h-6 w-6 rounded-sm"
                      alt="Linkedin"
                    />
                    Kevin Liu
                  </Link>
                  <Link
                    href="https://github.com/Kevin-Liu-01"
                    className="hover:underline dark:text-white"
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
                <div className="flex flex-col">
                  <Link
                    href="mailto:kk23907751@gmail.com"
                    className="hover:underline"
                  >
                    <MailIcon className="mr-1 inline h-6 w-6" />{" "}
                    kk23907751@gmail.com
                  </Link>
                  <Link href="/" className="hover:underline">
                    <PhoneIcon className="mr-1 inline h-6 w-6" /> +1
                    732-810-5793
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="mt-28 ml-2 text-3xl">I love making web apps </div> */}
            <div className="scrollbar relative mt-2 max-h-[calc(100vh-11rem)] overflow-hidden overflow-y-scroll rounded-3xl ">
              <div className="p-2">
                <p className="pb-4 font-semibold">
                  Here are some of my favorite projects:
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Link
                      href={project.url}
                      key={project.name}
                      className="relative flex flex-col items-center justify-center rounded-[1.2rem] bg-white p-4 shadow-md duration-150 hover:scale-[1.02] dark:bg-gray-800"
                    >
                      <div className="absolute top-0 right-0 z-10 rounded-full bg-white p-2  dark:bg-gray-800">
                        <ServerIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                      </div>
                      <Image
                        src={"/images" + project.image}
                        height={980}
                        width={980}
                        className="h-full w-auto rounded-lg "
                        alt={project.name}
                      />
                      <div className="absolute flex h-full w-full items-center justify-center rounded-[1.2rem] bg-gray-200 bg-opacity-80 text-center opacity-0 duration-150 hover:opacity-100 dark:bg-gray-600 dark:bg-opacity-70">
                        {project.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {translate && <Chat />}
      </div>
    </main>
  );
};

export default Home;
