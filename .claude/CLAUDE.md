# GPS2 Design System Project

## Overview
GPS2 design system reference site built with Vue 3 + TypeScript + Vite. Interactive token explorer showing design colors, typography, spacing, radius, shadows, and animations.

## Architecture

### Key Files
- **src/views/TokensView.vue** — Main design tokens reference page
- **src/components/design/** — Reusable layout components
  - `PageLayout.vue` — Full-page shell with sidebar nav + IntersectionObserver
  - `Section.vue` — Section wrapper with header
  - `Notes.vue` — Gold-bordered notes callout
- **src/styles/tokens.css** — Source of truth for all design tokens
- **src/styles/base.css** — Font loading + semantic element styles
- **src/styles/tokens-page.css** — TokensView display widget styles

### Token System
All values (colors, spacing, typography, radius, shadows) are defined as CSS custom properties in `tokens.css`. Files reference tokens via `var(--token-name)`.

**Token families:**
- Colors: palettes (pink, green, etc.), semantic (primary, secondary, status), needs, wood, items
- Spacing: --space-1 through --space-16, --spacing-2xs through --spacing-xl
- Typography: --font-size-4xs through --font-size-4xl, --font-family-*, --font-weight-*, --line-height-*
- Radius: --radius-none through --radius-full
- Shadows: elevation (sm–xl), component (rivet, ball, cta, etc.)
- Z-index, transitions

### Styling Approach
- No hardcoded pixel values for spacing, colors, or sizing—use tokens exclusively
- Physical CSS properties (margin-bottom, border-left) → logical properties (margin-block-end, border-inline-start) for RTL
- Multi-line CSS formatting for readability; no minification

## Conventions

### Component Props
Vue SFC with `<script setup>` + TypeScript. Use `defineProps<{}>` generic syntax for type safety.

```vue
<script setup lang="ts">
interface Item { id: string; label: string }
const props = defineProps<{ title: string; items: Item[] }>()
</script>
```

### CSS Classes
Kebab-case, semantic naming. Top-level layout styles in `base.css`; page-specific widget styles in page CSS files.

### Imports
No @ path aliases; use relative paths (`../components/design/Section.vue`).

## Refactoring Guidelines

When adding or modifying tokens:
1. Add to `src/styles/tokens.css` with inline comments documenting hex values and production divergences
2. Update CSS files to use tokens instead of hardcoded values
3. Convert all physical properties to logical where possible
4. Format multi-line with 2-space indentation and blank lines between rule groups

When creating new pages/views:
1. Extract reusable layout as components in `src/components/design/`
2. Import `PageLayout`, `Section`, `Notes` from design folder
3. Scoped page styles in a new CSS file (e.g., `src/styles/my-page.css`)
4. Import styles directly in the Vue component, not in `main.ts`
