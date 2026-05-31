# GPS2 -- Guinea Pig Simulator 2 Design System

A design system extracted from the **Guinea Pig Simulator 2 (GPS2)** Vue 3 codebase -- a cozy virtual pet simulator where players care for guinea pigs with unique personalities, monitor 10 wellness needs, and watch their pigs wander a 3D habitat.

## Sources

- **Local codebase:** `gps2/` (Vue 3 + TypeScript + Pinia + THREE.js + Vite). Attached read-only.
- **GitHub repo:** [ktocdev/gps2](https://github.com/ktocdev/gps2) (default branch `main`).
- **Proprietary** -- copyright © 2025 ktocdev. Extracted foundations only; no game logic.

## Product context

GPS2 is a single product: a **web-based 2D/3D guinea pig care simulator**. The main surfaces are:

1. **Game View** -- the primary playspace. A habitat with guinea pig sprites, food bowl, water bottle, hay rack, chew items; a sidebar for needs / inventory / activity feed; Floating Action Buttons (FABs) for quick actions.
2. **3D Habitat** -- a THREE.js powered first-person(ish) interactive habitat with guinea pig models, poop, food items, real-time behavior.
3. **Debug Dashboard** -- internal views for prototyping systems (needs controller, pet store manager, logging, inventory, habitat). Also uses the same component library.
4. **Home / landing** -- a "Coming Soon" hero with gradient background and the debug link.

The system revolves around **10 needs** (hunger, thirst, energy, shelter, play, social, stimulation, comfort, hygiene, nails, chew) and **reactive emoji-forward feedback** ("Wheek! I love this!") via chat bubbles + activity feed.

## Index

Root files in this design system:

- `README.md` -- this file
- `colors_and_type.css` -- CSS variables for colors, typography, spacing, radius, shadow
- `SKILL.md` -- Agent Skill descriptor
- `fonts/` -- Gaegu, Inter, Roboto (Google Fonts -- not bundled; loaded via CDN)
- `assets/` -- logos, favicon, brand illustrations, icon references
- `preview/` -- Design System tab cards (one HTML per card)
- `ui_kits/game/` -- UI kit for the main Game View (components + interactive index.html)

## Content fundamentals

**Voice:** warm, playful, first-person from the guinea pig's POV. Never stuffy.

**Copy is driven by two personas:**
- The **guinea pig** -- speaks in squeaks and short exclamations. *"Wheek!"*, *"Nom nom nom"*, *"Too tired..."*, *"My favorite!!"*. Uses lots of ellipses for uncertainty/tiredness and exclamation marks for joy. Doubled letters indicate excitement (*"Yum yum yum!"*). Trailing `~` is used softly (*"Munch munch~"*).
- The **system / UI** -- sentence case, short, direct, functional. *"Clear All"*, *"Load 20 more"*, *"No activity yet..."*, *"Activity feed is paused"*. Gentle, never authoritarian.

**Tone examples (real, from `src/data/guineaPigMessages.ts`):**
- Positive: "Wheek! I love this!", "Popcorn! So happy!", "Wheee!", "Fun fun fun!", "Pet me!"
- Neutral: "Okay...", "If I must...", "Sniff... okay", "A bit tired..."
- Negative: "No way!", "Leave me alone!", "Too stressed...", "Can't eat..."
- Warning: "Habitat is dirty!", "Clean my cage first!"

**Casing:** sentence case everywhere except BADGES (uppercase, letter-spaced 0.5px). Button labels are sentence case ("Clear All", "Load more"). Headings use sentence case.

**I vs you:** the guinea pig speaks in *first person* ("I'm full!", "I don't know you..."). System copy addresses the player in imperative/neutral ("Pause activity feed", "Load more").

**Emoji:** YES -- emoji is core to the brand. Messages pair with a single emoji (🎉, 😋, ✨, 🥰, 😴, 💤, 😰, 🚨, ⚠️, 🚫, 🧹, 🔊, 👋, 🐹, 🐭, 🎯). Section headers can use emoji too (🔧 Debug Dashboard, 💭 empty state, 🐹 placeholder).

**Vibe:** cozy, wholesome, slightly campy. Like a cross between Tamagotchi, Neko Atsume and a Casio calculator -- but pink.

## Visual foundations

**Colors.** The brand is built on **pink (primary) + light green (secondary)** over slate-neutral surfaces, with six supporting accent scales (pink, green, violet, yellow, cyan + warning orange) plus status (success green, warning orange, error red, info blue). Every need has a dedicated color: hunger=amber, thirst=cyan, energy=navy, shelter=brown, play=green, social=hot-pink, stimulation=orange, comfort=indigo, hygiene=sky, nails=slate, chew=beige. Supports system dark mode via `prefers-color-scheme` and `[data-theme="dark"]`.

**Type.** Three families: **Gaegu** (cursive, 300/400/700) for headings -- gives the cozy, hand-drawn feel. **Inter** (300–700, +italic) for body -- clean, readable. **Roboto** (400/500/700) for the stats grid (tabular feel). Mono fallback is Consolas/Monaco for timestamps and code. Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36px. Weights: 400 / 500 / 600 / 700.

**Spacing.** 4-based scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 px. Aliased as `--spacing-{2xs|xs|sm|md|lg|xl}`.

**Radii.** 0 / 2 / 4 / 6 / 8 / 12 / 16 / full (9999). Uses **logical properties** (`border-start-start-radius` etc.) for i18n. Panels are `md` (6) on mobile, `lg` (8) on tablet+. Pills and avatars are `full`. FABs are circles.

**Shadows.** 5-stop stack (sm/base/md/lg/xl) all sitting on a neutral black with tight spread. Lift on hover (`md` → `lg`). No colored shadows except branded FABs.

**Backgrounds.** Primarily solid surface colors (`--color-bg-primary/secondary/tertiary`). The one signature gradient is on the Home view: `linear-gradient(135deg, var(--color-primary-bg), var(--color-secondary-bg))` -- pink-50 to green-50. The 3D canvas uses pure black. No textures, no patterns, no full-bleed photography.

**Borders.** 1px light neutrals everywhere by default. 2px for `.panel--bordered` and high-contrast media. 3px `border-inline-start` accent for activity-feed messages and `.need-row` urgency states. Dashed (`panel--accent`) with a gradient accent bar for standout panels.

**Animation.** Three durations: 150ms (`--transition-fast`), 250ms (`--transition-normal`), 350ms (`--transition-slow`). All `ease-in-out`. No bezier easings beyond ease-in-out except a `cubic-bezier(0.4, 0, 0.6, 1)` pulse. Character animations are keyframed: `guinea-pig-walk` (subtle bounce, 0.6s), `guinea-pig-wiggle` (rotate + scale for playing/interacting, 0.4s), `guinea-pig-chomp` (vertical chomp for chewing, 0.5s), `pulse` (manual-control indicator). All respect `prefers-reduced-motion`.

**Hover states.** Buttons lift (`translateY(-1px)`) + deepen shadow (`md`). FABs scale to 1.05. Sprites scale to 1.05 + brightness 1.15. Panels deepen border + shadow. Links go from `primary` → `primary-hover` (pink-600 → pink-700).

**Press / active states.** Buttons return to `translateY(0)` + shallower shadow + darker color (`*-active`). FABs scale to 0.95.

**Focus states.** `outline: 2px solid var(--color-primary)` with `outline-offset: 2px`. FABs use 3px outline. Uses `:focus-visible` to avoid mouse focus rings.

**Transparency & blur.** Sparingly. `.panel--loading` overlay (`rgba(255,255,255,0.1)` + `backdrop-filter: blur(1px)`). Selection highlight on sprites is `rgba(255,255,255,0.3)` bg. Dark-mode accent backgrounds are `rgba(236, 72, 153, 0.1)` etc. No glassmorphism.

**Cards / panels.** Background `--color-bg-secondary`, 1px light border, radius `md`/`lg`, padding `var(--space-4)` mobile → `var(--space-6)` desktop, `--shadow-sm` → `--shadow-md` on hover. Variants: `panel--border-primary` (pink tint), `panel--border-secondary` (green tint), `panel--accent` (gradient left bar on dashed border), `panel--muted` (tertiary bg, 0.9 opacity), `panel--error/warning/success` (semantic).

**Layout rules.** Mobile-first. Uses **logical properties** throughout (`padding-block`, `inset-inline-end`, `margin-block-end`) for RTL readiness. Breakpoints 640 / 769 / 1024 / 1201. Fixed elements: FABs at bottom corners (`position: fixed`, `z-index: 9999`, safe-area-inset aware). Habitat sidebars are 360px wide, flip to full-width bottom on ≤768px.

**Z-index scale:** dropdown 1000 / sticky 1020 / fixed 1030 / modal-backdrop 1040 / modal 1050 / popover 1060 / tooltip 1070. FABs override with 9999.

**Imagery vibe.** Warm, cartoonish, emoji-forward. Guinea pigs themselves are rendered as 🐹/🐭 emoji sprites in 2D; as low-poly textured 3D models with realistic fur palettes (white, black, brown, cream, tortoiseshell, tricolor, orange, gray, red, gold, beige, chocolate, lilac, buff, dalmatian) and eye colors (brown, black, red, blue, pink). No photography. No illustrations beyond emoji + 3D models.

## Iconography

GPS2's icon strategy is **emoji-first**, with **Iconify flowbite** as a secondary vector set:

- **Emoji as icons** -- the PRIMARY approach. Used for everything: FAB icons (🍎 🎾 🧼 🏥), activity feed categories (💭 empty state), placeholders (🐹 🐭), reactions (all the ones listed above), UI affordances (🎯 manual-control, ⏸️ ▶️ media controls, 🔧 debug). Apple Color Emoji / system emoji -- no custom emoji font.
- **Iconify via `@iconify/vue` + `@iconify-json/flowbite`** -- this is the `<Icon>` component. Secondary, used for vector icons where emoji would be out of place (dropdown carets, chevrons, etc.). The default family is `flowbite`. The `Icon.vue` component supports any Iconify family via `<Icon icon="mdi:home" />` or `<Icon family="heroicons" icon="home" />`.
- **Sizes:** xs (12px), sm (16px), md (20px), lg (24px), xl (32px).

**No custom SVG icon set, no icon font, no PNG icons** in the codebase `public/` (which is empty). The `favicon.svg` is referenced but not committed to the repo. For this design system: we link **[Iconify flowbite via CDN](https://iconify.design/)** and use emoji liberally. If mocking a new view, prefer emoji first.

**Substitution flag ⚠️** -- we could not find a logo SVG, favicon, or any brand illustrations in the repo. `preview/logo.html` composes a placeholder wordmark using Gaegu + 🐹. **Please provide a real logo / favicon if you have one** and we'll swap it in.

## Font substitutions

All three fonts (Gaegu, Inter, Roboto) are Google Fonts and loaded from Google's CDN in `gps2/src/styles/base.css`. We load them the same way in `colors_and_type.css`. No local TTF files are needed -- but if you want bundled copies for offline work, let us know and we'll download them into `fonts/`.

## Index

Root:
- `README.md` -- this file
- `SKILL.md` -- Claude Code skill entrypoint; makes this system installable/invokable
- `colors_and_type.css` -- CSS vars + base type/element styles. Import on every page.

Folders:
- `preview/` -- one HTML card per token or component (colors, type, spacing, radii, shadows, buttons, badges, panels, need rows, FABs, chat bubbles, stats, logo, iconography, fur palette). Registered to the Design System tab.
- `ui_kits/web_app/` -- React components + `index.html` click-thru prototype: Header, NeedsPanel, HabitatGrid, ActivityFeed, FabMenu, PetStore, Inventory, Button, Badge.
- `assets/` -- logos / icons / imagery (currently minimal; see ICONOGRAPHY caveats).

## Caveats

- No real logo, favicon, or brand illustrations exist in the repo. Placeholders used throughout.
- Iconography is emoji-first. If the product later standardizes on an SVG icon set, replace emoji refs.
- The 3D habitat (THREE.js) is not recreated -- the UI kit models the 2D top-down grid fallback.
- No slide template was provided, so no `slides/` folder was created.
