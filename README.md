# Nexor Industrial — 3D Cable Technology Showcase

A cinematic, interactive 3D engineering product showcase website built with **React**, **Three.js**, **React Three Fiber**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

![3D Cable Showcase](https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80)

## Highlights

- **Photorealistic PBR 3D Cable Model**: Uses high-precision cutaway GLB model (`premium_power_cable_v3_cutaway.glb`) with realistic metals, polymers, and copper conductors.
- **Cinematic Dual Rim Lighting**: Dramatic `#168CFF` electric blue rim lighting on one side and warm `#FF7A18` industrial lighting on the other.
- **Scroll-Controlled 8-State Disassembly Sequence**:
  - `State 0`: Monolithic assembled cable preview.
  - `State 1`: Camera zoom and micro-surface inspection.
  - `State 2`: Outer sheath translates backward along X-axis.
  - `State 3 & 4`: Galvanized steel braided armour reveals and expands radially off the bedding.
  - `State 5`: Bedding layer & semi-conductive swelling tape buffer exposure.
  - `State 6`: Three phase cores (Blue, Black, White) separate outward in a 3D radial dispersion.
  - `State 7`: Annealed electrolytic copper conductor strands slide forward and flare out.
  - `State 8`: Full exploded view with technical connecting leader lines and data callouts.
- **Interactive Control Suite**:
  - Scroll wheel & trackpad scrubbing with Lenis smooth inertia.
  - Interactive timeline scrubber slider (`0%` to `100%`).
  - Auto-play / pause animation loop.
  - Quick milestone jump buttons (`0` to `8`).
  - One-click `EXPLODE` / `ASSEMBLE` toggle.
  - Dynamic 2D SVG callout lines projected from 3D world coordinates.
  - Detailed mechanical & electrical specifications modal.

## Tech Stack

- **React 18** + **Vite**
- **Three.js** (`three`)
- **React Three Fiber** (`@react-three/fiber`)
- **Drei** (`@react-three/drei`)
- **GSAP** & **ScrollTrigger** (`gsap`)
- **Lenis** smooth scrolling (`lenis`)
- **Tailwind CSS**
- **Lucide Icons** (`lucide-react`)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shamshadkhan36/cable3d.git

# Navigate into project directory
cd cable3d

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

*Designed and engineered for high-voltage industrial cable systems.*
