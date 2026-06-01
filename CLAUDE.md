# CLAUDE.md

Guidance for working in this repo (Vuong Vu's portfolio **v2**).

## What this is

A pixel-art personal portfolio built with **Astro 6 + React islands**. The signature UI is a
**Warcraft-3-main-menu-style page transition**: the left menu bounces out/in vertically while the
content panel bounces out/in horizontally on every navigation. Aesthetic is full pixel-art (chunky
borders, limited palette, pixel fonts) with optional chiptune sound effects.

It replaces the older v1 (`../my-page`, React+Vite) and an abandoned Next.js draft (`../porfolio-v2`).

## Commands

> ⚠️ **Requires Node ≥ 22.12** (Astro 6). The machine default is Node 20 — run `nvm use` first
> (an `.nvmrc` pins 22.15.1). Package manager is **pnpm**.

```bash
nvm use            # switch to Node 22 (once per shell)
pnpm dev           # dev server → http://localhost:4321
pnpm build         # static build to dist/
pnpm preview       # serve the built site
pnpm typecheck     # tsgo --noEmit — native TS (@typescript/native-preview), checks .ts/.tsx
pnpm typecheck:astro  # astro check — Astro-aware diagnostics for .astro files
pnpm lint          # biome check .   (lint + format + import-sort, read-only)
pnpm lint:fix      # biome check --write .
pnpm format        # biome format --write .
```

Before declaring work done, run `pnpm lint`, `pnpm typecheck`, `pnpm typecheck:astro`, and `pnpm build` — all should be clean.

**Type-checking note:** `pnpm typecheck` uses **`tsgo`** (the native, Go-based preview of tsc 7 from
`@typescript/native-preview`) — fast, and covers the `.ts`/`.tsx` code (islands, lib, data). It cannot
parse `.astro` files, so `.astro` coverage comes from `pnpm typecheck:astro` (`astro check`). The classic
`typescript` package is kept because `@astrojs/check` and the editor tooling peer-depend on it; `tsgo`
does not replace it yet.

## Architecture

```
src/
├── layouts/BaseLayout.astro   # <head>, <ClientRouter>, grid shell, persisted logo + sound toggle
├── pages/                     # one file per route; each wraps content in <MainContent>
├── components/
│   ├── astro/                 # MenuPanel, MainContent, AnimatedLogo (static chrome)
│   └── react/                 # interactive islands (see below)
├── lib/
│   ├── transitions.ts         # WC3 bounce descriptors for transition:animate
│   └── sound.ts               # window-singleton chiptune SFX engine (Web Audio)
├── data/                      # typed content: bio, projects, timeline, skills, contacts, hobbies, menu
└── styles/
    ├── global.css             # design tokens (CSS vars) + pixel primitives
    ├── transitions.css        # @keyframes for the bounce + reduced-motion overrides
    └── playground.css         # styles for the interactive islands
```

## Key conventions & gotchas

**Adding a page**
1. Create `src/pages/<name>.astro`, wrap body in `<MainContent title="…" flavor="…">` inside `<BaseLayout>`.
2. Add an entry to `src/data/menu.ts` (`{ href, label, flavor }`) — this drives the menu and active state.
   Content should live as data in `src/data/`, not hardcoded in the page.

**The page transition (don't break this)**
- Driven entirely by Astro's native View Transitions (`<ClientRouter />` in `BaseLayout`).
- `MenuPanel` has `transition:name="menu"` + `transition:animate={menuBounce}`;
  `MainContent` has `transition:name="content"` + `transition:animate={contentBounce}`.
- The menu is **re-rendered (animated) on every nav — do NOT add `transition:persist` to it**, or the
  bounce disappears. Keyframes live in `styles/transitions.css`; timing/easing in `lib/transitions.ts`.
- Menu links are plain `<a href>` — the router intercepts them. No onClick/router code.

**Pixel UI**: use the primitives in `global.css` (`.pixel-panel`, `.pixel-parchment`, `.pixel-btn`,
`.pixel-card`, `.pixel-tag`, `.pixel-divider`, `.pixel-scroll`, `.pixel-cursor`) and the CSS color vars
(`--c-*` raw, semantic aliases like `--heading`, `--link`, `--panel-fill`). Fonts: `--font-ui`
(Press Start 2P) for chrome, `--font-body` (VT323) for text.

**Sound**: SFX are synthesized at runtime in `lib/sound.ts` (no audio files). They're muted by default,
gated behind the first user gesture, and the mute state persists to localStorage. The only persisted
island (`SoundController`) delegates clicks/hovers globally: add `data-sfx="click"` (or `hover`/`nav`)
to any element to make it sound. The Lofi Radio is the one real audio file (`public/audio/lofi.mp3`).

**React islands + navigation cleanup (important)**: when `ClientRouter` swaps pages it replaces the DOM
*without* unmounting React, so a normal `useEffect` cleanup won't run on navigation. Islands that attach
`window`/`document` listeners or timers (SnakeGame, LofiRadio, DigitalClock) also register a one-shot
`astro:before-swap` handler that tears them down. Follow this pattern for any new island with global
side effects, or listeners/audio will leak across pages.

**Linting**: Biome (`biome.json`). Two deliberate config choices:
- `noImportantStyles` is off — `!important` is required to override Astro's generated view-transition
  animation CSS in the reduced-motion media query.
- For `**/*.astro`, `noUnusedImports`/`noUnusedVariables` are off: Biome only parses the frontmatter
  script, so it falsely flags components used only in the template. `.astro` template/CSS is otherwise
  not linted by Biome — rely on `pnpm typecheck` for those.
