# GITFLEX

> **Your GitHub is your resume. Stop looking like everyone else.**

![GitFlex Banner](https://img.shields.io/badge/VISUAL_AUTHORITY-EST_2026-000000?style=for-the-badge&labelColor=ccff00&color=000000)

GitFlex is a motion-native, identity-driven platform that turns chaotic code repositories into high-impact visual narratives. It rejects traditional "SaaS" aesthetics in favor of an **Editorial/Art Direction** approach—using noise, fluid typography, and physics-based motion to communicate confidence.

---

## ⚡ Core Philosophy

*   **Anti-SaaS**: No gradients, no rounded cards, no generic blue. We use "Broken Grid" layouts, raw noise textures, and massive typography (15vw+).
*   **Motion-Native**: Animations aren't decorations; they are the interface. Text assembles, buttons have magnetic physics, and content morphs.
*   **Show, Don't Tell**: We don't explain features. We visualize the transformation from "Code" to "Design" in real-time.

---

## 🛠 Tech Stack

Built on the bleeding edge of the React ecosystem.

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Fluid typography, CSS variables)
*   **Motion**: [Framer Motion](https://www.framer.com/motion/) (Orchestration, Layout Animations)
*   **Scroll**: [Lenis](https://lenis.darkroom.engineering/) (Smooth, momentum-based scrolling)
*   **Font**: Syne (Display) + Inter (Utility)

---

## 💎 Features

### 1. The Transformation (`RepoToReadme.tsx`)
A visual simulation where a raw file tree (`src`, `utils.ts`) floats in a void, getting "scanned" and morphing into a polished README card. It adheres to strict spring physics to feel organic.

### 2. Identity Engine (`PersonaSwitcher.tsx`)
Users don't just "choose a theme"; they claim an identity. Switching between **Architect**, **Artist**, and **Minimalist** fundamentally alters the page geometry, gradients, and motion feel.

### 3. Magnetic Interaction (`Magnetic.tsx`)
Interactive elements posses gravitational pull. The cursor doesn't just click; it engages with the UI, creating a sense of weight and premium quality.

### 4. Editorial Stacking (`ReadmeShowcase.tsx`)
Instead of a boring carousel, README variants are presented as a vertical "deck" of editorial spreads. As you scroll, cards lift and flip, simulating a magazine review process.

---

## 🚀 Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/your-username/gitflex.git
    cd gitflex
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to see the magic.

---

## 📂 Project Structure

```bash
├── app/
│   ├── layout.tsx       # SmoothScroll + Noise Overlay + Fonts
│   ├── page.tsx         # The Narrative Flow
│   └── globals.css      # Tailwind v4 theme + Fluid Typography
├── components/
│   ├── landing/         # Narrative Sections (Hero, RepoToReadme, etc.)
│   ├── layout/          # Footer, Header
│   └── ui/              # Primitives (Magnetic, TextReveal, Noise)
└── public/              # Static Assets
```

---

## 🎨 Design Tokens

| Property | Value | Usage |
| :--- | :--- | :--- |
| **Primary** | `#ccff00` (Electric Lime) | Accents, Selection, "Call" |
| **Background** | `#050505` (Deep Black) | Canvas |
| **Font (Hero)** | `Syne` | Headlines, Statements |
| **Font (Body)** | `Inter` | Technical details |

---

## 📄 License

MIT © [GitFlex Inc.](https://gitflex.dev)
