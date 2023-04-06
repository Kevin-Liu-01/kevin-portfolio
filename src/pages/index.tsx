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
            className="relative col-span-2 border-r-[1.5px]  border-gray-600 "
            onClick={() => setImageState(!imageState)}
          >
            <Image
              src="/images/kevin_sidebar2.jpg"
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
              src="/images/kevin_sidebar.jpg"
              height={980}
              width={980}
              className={
                imageState
                  ? "z-5  h-full w-auto translate-x-0 object-cover duration-150  "
                  : "z-5  h-full w-auto translate-x-[-100%] object-cover duration-150"
              }
              alt="Kevin"
            />
            <div className="absolute bottom-0 mx-auto h-full w-full font-semibold text-transparent duration-200 hover:text-black ">
              Me at PennApps XXIII!
            </div>
          </button>
          <div className="col-span-7">
            <div className={patternStyles()}></div>
            <div className="relative z-10 flex w-full flex-col border-b-[1.5px] border-gray-600 bg-gradient-to-r px-4 text-gray-900  dark:from-gray-800 dark:to-gray-900 dark:text-white lg:flex-row">
              <h1 className="mt-6  select-none text-2xl font-extrabold tracking-tight duration-75 lg:text-4xl 2xl:text-[5rem]">
                <span className="">Hi there, </span>
                <span className="text-orange-500">{"I'm Kevin."}</span>
              </h1>
              <div className="relative z-10 mr-2 ml-2 grid grid-cols-1 items-center justify-center border-gray-600 py-4 px-0 sm:grid-cols-2 lg:ml-auto lg:border-l-[1.5px] lg:px-4 lg:pl-6">
                <div className=" hidden flex-col dark:flex">
                  <Link
                    href="https://www.linkedin.com/in/kevin-liu-2495b6205/"
                    className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
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
                <div className="flex flex-col dark:hidden">
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
                <div className="flex flex-col">
                  <Link
                    href="mailto:kk23907751@gmail.com"
                    className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                  >
                    <MailIcon className="mr-1 inline h-6 w-6" />{" "}
                    kk23907751@gmail.com
                  </Link>
                  <Link
                    href="/"
                    className="duration-75 hover:text-orange-500 hover:underline dark:hover:text-orange-400"
                  >
                    <PhoneIcon className="mr-1 inline h-6 w-6" /> +1
                    732-810-5793
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="mt-28 ml-2 text-3xl">I love making web apps </div> */}
            <div className=" scrollbar max-h-auto relative max-h-[calc(100vh-9rem)] overflow-x-hidden overflow-y-scroll ">
              <div className="w-full border-b-[1.5px] border-gray-600 bg-gray-100 bg-opacity-60 p-4 text-sm dark:bg-gray-900">
                {
                  "I'm a high school junior with a passion for science and technology! I love exploring the latest innovations in computer science, software engineering, and AI/ML modeling. I'm an expert at full-stack MERN software development with all the latest frontend and backend languages and technologies, including React.js, Next13, MongoDB, and Tailwind. I've also got some serious design chops, which means I can create UIs that not only look amazing, but are also easy to use. But that's not all! I've also got plenty of experience in research and development, both in scientific study and in software projects. I'm always excited to dive into something new and push the boundaries of what's possible with technology. There's nothing quite like the feeling of building something from scratch and seeing it come to life!"
                }
              </div>
              <p className="px-4 pb-4 pt-2 font-semibold ">
                Here are some of my favorite projects:
              </p>
              <div className="grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 ">
                {projects.map((project) => (
                  <Link
                    href={project.url}
                    key={project.name}
                    className="relative flex flex-col items-center justify-center rounded-xl bg-white p-1 shadow-md duration-150 hover:scale-[1.02] dark:bg-gray-600"
                  >
                    <div className="absolute top-0 right-0 z-10 rounded-full bg-white p-2  duration-150 dark:bg-gray-600">
                      <ServerIcon className="h-6 w-6 text-gray-500 duration-150 dark:text-gray-300" />
                    </div>
                    <Image
                      src={"/images" + project.image}
                      height={980}
                      width={980}
                      className="h-full w-auto rounded-lg "
                      alt={project.name}
                    />
                    <div className="absolute flex h-full w-full items-center justify-center rounded-xl bg-gray-100 bg-opacity-80 text-center opacity-0 duration-150 hover:opacity-100 dark:bg-gray-600 dark:bg-opacity-70">
                      {project.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Chat translate={translate} setTranslate={setTranslate} />
      </div>
    </main>
  );
};

export default Home;
