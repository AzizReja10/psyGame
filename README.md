# 🧠 Signal-Reaction & Memory Test (PsyGame)

A sleek, modern web-based cognitive testing application grounded in real psychological research. Test your visual reaction speed and working memory span, compare your scores against typical human ranges, save your best runs to a local leaderboard, and export downloadable score cards.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### ⚡ 1. Reaction Time Test
- **Visual Stimulus:** Measures reaction time in milliseconds from the exact moment the stage transitions to green.
- **Percentile Calculation:** Dynamically calculates how you rank against average human performance (typical average visual reaction time is ~250ms).
- **False-Start Detection:** Prevents early clicking with randomized reaction delays (1.4s – 4s).
- **Downloadable Share Card:** Automatically draws and exports a clean canvas image card (`reaction-time.png`) showing your reaction time and percentile breakdown.

### 🔢 2. Working Memory Span Test
- **Digit Sequence Recall:** Tests short-term auditory/visual working memory using progressive digit sequences.
- **Dual Input Modes:** Enter digits via physical keyboard numbers (`0–9`) or an on-screen interactive numpad.
- **Cognitive Insights:** Evaluates digit span capacity based on George Miller's classic psychological model.
- **Share Card Export:** Generates an exportable score badge image (`memory-span.png`) with your highest remembered digit sequence.

### 🏆 3. Local Device Leaderboard
- Saves best scores persistently using browser `localStorage`.
- Toggle between Reaction Time (fastest ms) and Memory Span (longest digit sequence).
- Enter custom player names to track personal and peer records.

### 🎨 4. Aesthetic & Experience
- **Warm Beige Palette:** Clean, warm design with crisp typography (`Space Grotesk` & `IBM Plex Mono`).
- **Ambient Visuals:** Soft floating pastel aurora blobs and dynamic mouse-tracking spotlight.
- **Interactive Feedback:** Confetti celebrations via `canvas-confetti` and micro-animations with `motion`.

---

## 🔬 Scientific Background

This application benchmarks performance against established cognitive psychology literature:
- **Reaction Time:** Reference percentiles derived from *Deary et al. (2011)* on human visual processing speed.
- **Working Memory Span:** Based on George A. Miller's landmark paper *"The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information"* (1956).

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom design system
- **Typography:** Google Fonts (`Space Grotesk`, `IBM Plex Mono`)
- **Animation & Effects:** [Motion](https://motion.dev/), [Canvas-Confetti](https://github.com/catdad/canvas-confetti), `@cursorify/react`
- **Icons:** Lucide React & custom SVGs

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AzizReja10/psyGame.git
   cd psyGame
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
phyTest/
├── public/
│   ├── favicon.svg          # Application favicon
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Animated UI primitives (text-animate, etc.)
│   │   ├── Home.jsx         # Main landing & test selector screen
│   │   ├── ReactionTest.jsx # Reaction time test & share card logic
│   │   ├── MemoryTest.jsx   # Working memory test & keypad
│   │   └── Leaderboard.jsx  # Device leaderboard & rank tables
│   ├── lib/
│   │   ├── shareCard.js     # HTML5 Canvas card generator & downloader
│   │   ├── storage.js       # LocalStorage helper functions
│   │   └── utils.js         # Tailwind cn utility helper
│   ├── App.jsx              # Root component & state router
│   ├── index.css            # Global CSS tokens, animations & themes
│   └── main.jsx             # React DOM entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
