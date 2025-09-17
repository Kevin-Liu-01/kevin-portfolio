# PortfolioMon Showdown

Welcome to PortfolioMon Showdown, a dynamic and interactive gamified portfolio where my software projects come to life as battle-ready creatures\! Inspired by the classic Pokémon battle system, this application showcases my full-stack development and UI/UX design skills in a fun, engaging, and memorable way.

**[➡️ View the Live Demo Here\!](https://kevin-portfolio.vercel.app/en-US)** _(Replace with your actual deployment URL)_

_(Replace this with a high-quality screenshot or GIF of your application)_

## ✨ Key Features

- **Gamified Portfolio:** My projects aren't just lines on a resume; they're "PortfolioMons" with unique types, stats, and movesets derived from their real-world tech stacks and functionalities.
- **Strategic Turn-Based Combat:** Engage in a complex battle system against a CPU opponent. The system features:
  - **Type Effectiveness:** A custom type chart (AI \> Data, Web \> Mobile, etc.) adds strategic depth.
  - **Status Effects:** Moves can burn, poison, stun, or put opponents to sleep.
  - **Items & Inventory:** Use items like "API Key" (Potion) or "Debugger" (Antidote) to turn the tide of battle.
  - **Detailed Battle Logs & Stats:** Track every action and review a comprehensive battle report upon victory or defeat.
- **Dynamic Team Building:** Choose a strategic team of 3 projects from my portfolio to take into battle.
- **Advanced UI/UX:** A sleek, high-tech interface built with **Tailwind CSS** and heavily animated with **Framer Motion** for a fluid and polished user experience.
- **Robust State Management:** The entire game state is managed centrally using React's Context API, ensuring a scalable and maintainable codebase.
- **User Authentication:** Secure user sign-in implemented with **NextAuth.js**, supporting providers like GitHub.
- **Fully Responsive:** The application is designed to be fully functional and visually appealing on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack & Tools

This project was built with a modern, type-safe, and performant technology stack.

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State Management:** React Context API
- **Authentication:** NextAuth.js
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📂 Project Structure

The codebase is organized to be modular and easy to navigate, separating concerns for UI, state management, and static data.

```
src/
├── components/
│   ├── battleUI.tsx         # Main battle screen components
│   ├── gameOverScreen.tsx   # Victory/Defeat screen
│   ├── navbar.tsx           # Application navigation and game controls
│   ├── teamPreviewUI.tsx    # Pre-battle team matchup screen
│   └── teamUI.tsx           # Main portfolio/team selection screen
│
├── context/
│   └── gameContext.ts       # Static types, data, and pure utility functions
│
├── providers/
│   └── gameProvider.tsx     # The core React Context provider with all game state and logic
│
├── pages/                   # Next.js pages and API routes (for NextAuth)
│   ├── api/
│   └── index.tsx            # Main application entry point
│
└── public/
    └── images/              # All static assets (project images, trainer sprites, etc.)
```

## 🚀 Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/portfoliomon-showdown.git
cd portfoliomon-showdown
```

**2. Install dependencies:**

```bash
npm install
# or
yarn install
```

**3. Set up environment variables:**
Create a file named `.env.local` in the root of your project and add the following variables. You'll need to create a GitHub OAuth App to get your client ID and secret.

```env
# .env.local

# GitHub OAuth App credentials
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Secret for NextAuth.js JWT signing
# Generate one here: https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=a_very_secure_random_string
```

**4. Run the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application running.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

---

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
