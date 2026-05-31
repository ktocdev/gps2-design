<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SemToken { name: string; hex: string; alias?: string }
interface NeedToken { name: string; hex: string; var: string; ramp: string }
interface WoodToken { name: string; hex: string; var: string; use: string }
interface TypeEntry { token: string; rem: string; px: string; weight: number; heading: boolean; label: string }
interface SpaceEntry { token: string; rem: string; px: string }
interface RadiusEntry { token: string; val: string; px: string }
interface ShadowEntry { token: string; val: string; use: string; bg?: string }
interface PaletteDef { id: string; label: string; desc: string; code: string; colors: string[] }
interface GameColor { name: string; hex: string; use: string; alias: string }

// ── Palette data ───────────────────────────────────────────────────────────────

const steps = [50,100,200,300,400,500,600,700,800,900]

const paletteDefs: PaletteDef[] = [
  { id: 'pink',    label: 'Pink',    desc: '— Primary Accent',   code: '--color-pink-*',    colors: ['#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9f1239','#831843'] },
  { id: 'green',   label: 'Green',   desc: '— Secondary Accent', code: '--color-green-*',   colors: ['#f0fdf4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#178740','#15803d','#166534','#14532d'] },
  { id: 'violet',  label: 'Violet',  desc: '',                   code: '--color-violet-*',  colors: ['#f5f3ff','#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#5b21b6','#4c1d95'] },
  { id: 'yellow',  label: 'Yellow',  desc: '',                   code: '--color-yellow-*',  colors: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12'] },
  { id: 'cyan',    label: 'Cyan',    desc: '',                   code: '--color-cyan-*',    colors: ['#ecfeff','#cffafe','#a5f3fc','#67e8f9','#22d3ee','#06b6d4','#0891b2','#0e7490','#155e75','#164e63'] },
  { id: 'neutral', label: 'Neutral', desc: '',                   code: '--color-neutral-*', colors: ['#f8fafc','#f1f5f9','#e2e8f0','#cbd5e1','#94a3b8','#64748b','#475569','#334155','#1e293b','#0f172a'] },
  { id: 'gold',    label: 'Gold',    desc: '— Amber → Orange',   code: '--color-gold-*',    colors: ['#fffbeb','#fef3c7','#fde68a','#fbbf24','#f59e0b','#ea580c','#c2410c','#9a3412','#7c2d12','#431407'] },
  { id: 'red',     label: 'Red',     desc: '',                   code: '--color-red-*',     colors: ['#fef2f2','#fee2e2','#fecaca','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a'] },
  { id: 'blue',    label: 'Blue',    desc: '',                   code: '--color-blue-*',    colors: ['#eff6ff','#dbeafe','#bfdbfe','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#172554'] },
]

// ── Semantic color data ────────────────────────────────────────────────────────

const semAction: SemToken[][] = [
  [
    { name: '--color-primary-bg',     hex: '#fdf2f8', alias: '--color-pink-50' },
    { name: '--color-primary',        hex: '#db2777', alias: '--color-pink-600' },
    { name: '--color-primary-hover',  hex: '#be185d', alias: '--color-pink-700' },
    { name: '--color-primary-active', hex: '#9f1239', alias: '--color-pink-800' },
  ],
  [
    { name: '--color-secondary-bg',     hex: '#f0fdf4', alias: '--color-green-50' },
    { name: '--color-secondary',        hex: '#178740', alias: '--color-green-600' },
    { name: '--color-secondary-hover',  hex: '#15803d', alias: '--color-green-700' },
    { name: '--color-secondary-active', hex: '#166534', alias: '--color-green-800' },
  ],
]

const semStatus: SemToken[][] = [
  [
    { name: '--color-success-bg',     hex: '#f0fdf4', alias: '--color-green-50' },
    { name: '--color-success-border', hex: '#86efac', alias: '--color-green-300' },
    { name: '--color-success',        hex: '#178740', alias: '--color-green-600' },
  ],
  [
    { name: '--color-warning-bg',     hex: '#fffbeb', alias: '--color-gold-50' },
    { name: '--color-warning-border', hex: '#fbbf24', alias: '--color-gold-300' },
    { name: '--color-warning',        hex: '#ea580c', alias: '--color-gold-500' },
  ],
  [
    { name: '--color-error-bg',         hex: '#fef2f2', alias: '--color-red-50' },
    { name: '--color-danger-surface',   hex: '#fee2e2', alias: '--color-red-100' },
    { name: '--color-critical-surface', hex: '#fecaca', alias: '--color-red-200' },
  ],
  [
    { name: '--color-danger-border',   hex: '#f87171', alias: '--color-red-300' },
    { name: '--color-critical-border', hex: '#ef4444', alias: '--color-red-400' },
    { name: '--color-error',           hex: '#dc2626', alias: '--color-red-500' },
  ],
  [
    { name: '--color-info-bg', hex: '#eff6ff', alias: '--color-blue-50' },
    { name: '--color-info',    hex: '#2563eb', alias: '--color-blue-500' },
  ],
]

const semBgTxt: SemToken[][] = [
  [
    { name: '--color-bg-primary',   hex: '#ffffff', alias: 'Light mode default' },
    { name: '--color-bg-secondary', hex: '#f8fafc', alias: '' },
    { name: '--color-bg-tertiary',  hex: '#f1f5f9', alias: '' },
  ],
  [
    { name: '--color-text-inverse',   hex: '#ffffff', alias: 'On dark surfaces' },
    { name: '--color-text-muted',     hex: '#94a3b8', alias: '' },
    { name: '--color-text-tertiary',  hex: '#64748b', alias: '' },
    { name: '--color-text-secondary', hex: '#475569', alias: '' },
    { name: '--color-text-primary',   hex: '#1e293b', alias: '' },
  ],
]

const woodTokens: WoodToken[] = [
  { name: 'Wood Amber',  hex: '#d97706', var: '--color-wood-amber',  use: 'Bonded pair slot · aisle plaque' },
  { name: 'Wood Light',  hex: '#c2700d', var: '--color-wood-light',  use: 'SimTopBar plank' },
  { name: 'Wood Mid',    hex: '#b45309', var: '--color-wood-mid',    use: 'Cage frame · shelf · beam · GPS2 brand' },
  { name: 'Wood Dark',   hex: '#92400e', var: '--color-wood-dark',   use: 'Mid-grain shadow · sill' },
  { name: 'Wood Shadow', hex: '#78350f', var: '--color-wood-shadow', use: 'Dark edge · leg base' },
  { name: 'Wood Border', hex: '#451a03', var: '--color-wood-border', use: 'Darkest border · stud centres' },
]

const needs: NeedToken[] = [
  { name: 'Hunger',      hex: '#f59e0b', var: '--color-need-hunger',      ramp: '--color-gold-400' },
  { name: 'Thirst',      hex: '#06b6d4', var: '--color-need-thirst',      ramp: '--color-cyan-500' },
  { name: 'Energy',      hex: '#1e3a8a', var: '--color-need-energy',      ramp: '--color-blue-800' },
  { name: 'Shelter',     hex: '#9a3412', var: '--color-need-shelter',     ramp: '--color-gold-700' },
  { name: 'Play',        hex: '#22c55e', var: '--color-need-play',        ramp: '--color-green-500' },
  { name: 'Social',      hex: '#ec4899', var: '--color-need-social',      ramp: '--color-pink-500' },
  { name: 'Stimulation', hex: '#ea580c', var: '--color-need-stimulation', ramp: '--color-gold-500' },
  { name: 'Comfort',     hex: '#8b5cf6', var: '--color-need-comfort',     ramp: '--color-violet-500' },
  { name: 'Hygiene',     hex: '#67e8f9', var: '--color-need-hygiene',     ramp: '--color-cyan-300' },
  { name: 'Nails',       hex: '#64748b', var: '--color-need-nails',       ramp: '--color-neutral-500' },
  { name: 'Chew',        hex: '#fde68a', var: '--color-need-chew',        ramp: '--color-gold-200' },
]

const gameColors: GameColor[] = [
  { name: '--color-pink',       hex: '#ec4899', use: 'Give Food · Grocery · Primary CTA',     alias: '↳ --color-pink-500' },
  { name: '--color-pink-deep',  hex: '#db2777', use: 'Primary CTA bottom stop',                alias: '↳ --color-pink-600' },
  { name: '--color-orange',     hex: '#ea580c', use: 'Action board (play · social)',            alias: '↳ --color-gold-500' },
  { name: '--color-gold-deep',  hex: '#f59e0b', use: 'Activity icon border',                   alias: '↳ --color-gold-400' },
  { name: '--color-gold',       hex: '#fbbf24', use: 'Activity · Today\'s Picks',              alias: '↳ --color-gold-300' },
  { name: '--color-lime',       hex: '#4ade80', use: 'Habitat · Hay Loft',                     alias: '↳ --color-green-400' },
  { name: '--color-ivy',        hex: '#84cc16', use: 'Hay Loft · Habitat Status',              alias: '↳ bespoke' },
  { name: '--color-green',      hex: '#178740', use: 'Habitat icon border · player action',    alias: '↳ --color-green-600' },
  { name: '--color-sky',        hex: '#06b6d4', use: 'Habitat dept awning',                    alias: '↳ --color-cyan-500' },
  { name: '--color-cyan',       hex: '#22d3ee', use: 'Action board (hygiene · water)',          alias: '↳ --color-cyan-400' },
  { name: '--color-violet',     hex: '#a78bfa', use: 'Inventory pill · action board',          alias: '↳ --color-violet-400' },
  { name: '--color-violet-mid', hex: '#8b5cf6', use: 'Activity badge · Bedding awning',        alias: '↳ --color-violet-500' },
  { name: '--color-violet-deep',hex: '#7c3aed', use: 'Inventory icon border',                  alias: '↳ --color-violet-600' },
]

// ── Typography data ────────────────────────────────────────────────────────────

const typeScale: TypeEntry[] = [
  { token: '--font-size-xs',   rem: '0.75rem',  px: '12px', weight: 400, heading: false, label: 'Caption, helper text, tooltips' },
  { token: '--font-size-sm',   rem: '0.875rem', px: '14px', weight: 400, heading: false, label: 'Body small, labels, inputs' },
  { token: '--font-size-base', rem: '1rem',     px: '16px', weight: 400, heading: false, label: 'Body default (html root)' },
  { token: '--font-size-lg',   rem: '1.125rem', px: '18px', weight: 500, heading: false, label: 'Body large, subheadings' },
  { token: '--font-size-xl',   rem: '1.25rem',  px: '20px', weight: 600, heading: false, label: 'h4 equivalent, section labels' },
  { token: '--font-size-2xl',  rem: '1.5rem',   px: '24px', weight: 700, heading: true,  label: 'h3' },
  { token: '--font-size-3xl',  rem: '1.875rem', px: '30px', weight: 700, heading: true,  label: 'h2' },
  { token: '--font-size-4xl',  rem: '2.25rem',  px: '36px', weight: 700, heading: true,  label: 'h1' },
]

// ── Spacing data ──────────────────────────────────────────────────────────────

const spacingData: SpaceEntry[] = [
  { token: '--space-1',  rem: '0.25rem', px: '4px' },
  { token: '--space-2',  rem: '0.5rem',  px: '8px' },
  { token: '--space-3',  rem: '0.75rem', px: '12px' },
  { token: '--space-4',  rem: '1rem',    px: '16px' },
  { token: '--space-5',  rem: '1.25rem', px: '20px' },
  { token: '--space-6',  rem: '1.5rem',  px: '24px' },
  { token: '--space-8',  rem: '2rem',    px: '32px' },
  { token: '--space-10', rem: '2.5rem',  px: '40px' },
  { token: '--space-12', rem: '3rem',    px: '48px' },
  { token: '--space-16', rem: '4rem',    px: '64px' },
]

const spMaxPx = 64

// ── Radius data ───────────────────────────────────────────────────────────────

const radiusData: RadiusEntry[] = [
  { token: '--radius-none', val: '0',        px: '0px' },
  { token: '--radius-sm',   val: '0.125rem', px: '2px' },
  { token: '--radius-base', val: '0.25rem',  px: '4px' },
  { token: '--radius-md',   val: '0.375rem', px: '6px' },
  { token: '--radius-lg',   val: '0.5rem',   px: '8px' },
  { token: '--radius-xl',   val: '0.75rem',  px: '12px' },
  { token: '--radius-2xl',  val: '1rem',     px: '16px' },
  { token: '--radius-full', val: '9999px',   px: '9999px' },
]

// ── Shadow data ───────────────────────────────────────────────────────────────

const shadowData: ShadowEntry[] = [
  { token: '--shadow-sm',   val: '0 1px 2px 0 rgb(0 0 0 / 0.05)',                                                              use: 'Panel resting, subtle card lift' },
  { token: '--shadow-base', val: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',                             use: 'Elevated card surface' },
  { token: '--shadow-md',   val: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',                          use: 'Button hover, panel hover' },
  { token: '--shadow-lg',   val: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',                        use: 'Floating panel, dropdown' },
  { token: '--shadow-xl',   val: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',                       use: 'Modal, dialog' },
]

const componentShadowData: ShadowEntry[] = [
  { token: '--shadow-rivet',       val: 'inset 0 -1px 1px rgba(0,0,0,.42)',                                                                                                                         use: 'Decorative rivets',                bg: 'default' },
  { token: '--shadow-ball',        val: '0 2px 3px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.4)',                                                                                            use: 'Rod balls + connector orbs',       bg: 'default' },
  { token: '--shadow-badge',       val: '0 2px 3px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3)',                                                                                            use: 'Sign Pill badge + suffix tag',     bg: 'default' },
  { token: '--shadow-disc',        val: '0 2px 3px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.4)',                                                                                            use: 'Icon Sticker sm — Sign Pill disc', bg: 'default' },
  { token: '--shadow-lift-sm',     val: '0 3px 6px rgba(0,0,0,.2)',                                                                                                                                 use: 'Category label — default',         bg: 'default' },
  { token: '--shadow-lift-md',     val: '0 5px 8px rgba(0,0,0,.25)',                                                                                                                                use: 'Category label — hover',           bg: 'default' },
  { token: '--shadow-lift-lg',     val: '0 6px 10px -2px rgba(0,0,0,.3)',                                                                                                                           use: 'Category label — active',          bg: 'default' },
  { token: '--shadow-cta',         val: '0 10px 15px -3px rgba(0,0,0,.25), 0 4px 6px -2px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.35)',                                                   use: 'Primary CTA — default',            bg: 'default' },
  { token: '--shadow-cta-pressed', val: '0 4px 6px -2px rgba(0,0,0,.25), 0 2px 4px -1px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.25)',                                                     use: 'Primary CTA — pressed',            bg: 'default' },
  { token: '--shadow-cta-header',  val: '0 6px 10px -2px rgba(219,39,119,.45), 0 2px 4px -1px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.4), inset 0 -2px 0 rgba(0,0,0,.18)',               use: 'Primary CTA — header tab active',  bg: 'default' },
  { token: '--shadow-pill',        val: '0 6px 8px -2px rgba(69,26,3,.4), 0 2px 4px -1px rgba(69,26,3,.25), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(146,64,14,.22)',              use: 'Sign Pill — default',              bg: 'warm' },
  { token: '--shadow-pill-active', val: '0 10px 14px -4px rgba(69,26,3,.55), 0 4px 6px -2px rgba(69,26,3,.35), inset 0 2px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)',            use: 'Sign Pill — active/open',          bg: 'warm' },
  { token: '--shadow-frame',       val: '0 8px 14px -4px rgba(69,26,3,.45), 0 3px 6px -2px rgba(69,26,3,.3), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -2px 0 rgba(0,0,0,.18)',                 use: 'Action Board frame — default',     bg: 'warm' },
  { token: '--shadow-frame-hover', val: '0 14px 20px -4px rgba(69,26,3,.5), 0 6px 10px -2px rgba(69,26,3,.35), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -2px 0 rgba(0,0,0,.18)',               use: 'Action Board frame — hover',       bg: 'warm' },
  { token: '--shadow-amber-pill',  val: '0 6px 10px -2px rgba(120,53,15,.4), 0 2px 4px -1px rgba(120,53,15,.25), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)',          use: 'Currency display + Icon button',   bg: 'warm' },
  { token: '--shadow-confirm',     val: '0 6px 10px -2px rgba(0,0,0,.28), 0 2px 4px -1px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.4)',                                                     use: 'Confirm / Pause button',           bg: 'default' },
]

// ── Active nav tracking ───────────────────────────────────────────────────────

const activeSection = ref('colors')
const pageRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) activeSection.value = e.target.id
    })
  }, { rootMargin: '-10% 0px -70% 0px' })
  pageRef.value?.querySelectorAll('.section').forEach(s => observer!.observe(s))
})

onUnmounted(() => { observer?.disconnect() })

// ── Helpers ───────────────────────────────────────────────────────────────────

function spBarWidth(px: string): string {
  return Math.round((parseInt(px) / spMaxPx) * 100) + '%'
}

function typeFamily(heading: boolean): string {
  return heading ? "'Gaegu', cursive" : "'Nunito', sans-serif"
}
</script>

<template>
  <div class="tokens-page" ref="pageRef">

    <!-- ── Sidebar ──────────────────────────────────────────────────────── -->
    <nav class="sidebar">
      <div class="sidebar-brand">
        <h1>GPS2</h1>
        <span>Design Tokens v1.0</span>
      </div>
      <span class="nav-label">Tokens</span>
      <a href="#colors"      class="nav-item" :class="{ active: activeSection === 'colors' }">Colors</a>
      <a href="#typography"  class="nav-item" :class="{ active: activeSection === 'typography' }">Typography</a>
      <a href="#spacing"     class="nav-item" :class="{ active: activeSection === 'spacing' }">Spacing</a>
      <a href="#radius"      class="nav-item" :class="{ active: activeSection === 'radius' }">Border Radius</a>
      <a href="#shadows"     class="nav-item" :class="{ active: activeSection === 'shadows' }">Shadows</a>
      <a href="#z-index"     class="nav-item" :class="{ active: activeSection === 'z-index' }">Z-Index</a>
      <a href="#transitions" class="nav-item" :class="{ active: activeSection === 'transitions' }">Transitions</a>
    </nav>

    <!-- ── Main ─────────────────────────────────────────────────────────── -->
    <main class="tokens-main">

      <header class="page-header">
        <h1 class="page-title">GPS2 <span>Design Tokens</span></h1>
        <div class="page-meta">
          <span>Source: <code>src/styles/variables.css</code></span>
          <span class="badge">v1.0 · May 2026</span>
        </div>
      </header>

      <!-- ── COLORS ──────────────────────────────────────────────────────── -->
      <section class="section" id="colors">
        <div class="section-header">
          <h2 class="section-title">Colors</h2>
          <span class="section-count">11 palettes · 10-step scales · 12 game colors · 11 need tokens</span>
        </div>

        <!-- Palette rows -->
        <div class="subsection" v-for="p in paletteDefs" :key="p.id">
          <div class="sub-title">
            {{ p.label }}
            <span v-if="p.desc || p.code" style="font-weight:400;color:#94a3b8;text-transform:none;letter-spacing:0">
              {{ p.desc ? p.desc + ' · ' : '' }}<code style="font-family:Consolas,monospace;font-size:10px;">{{ p.code }}</code>
            </span>
          </div>
          <div class="palette-row">
            <div class="swatch" v-for="(hex, i) in p.colors" :key="i">
              <div class="swatch-color" :style="{ background: hex }"></div>
              <div class="swatch-info">
                <div class="swatch-step">{{ steps[i] }}</div>
                <div class="swatch-hex">{{ hex.toUpperCase() }}</div>
                <div class="swatch-var">--color-{{ p.id }}-{{ steps[i] }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic — Action -->
        <div class="subsection">
          <div class="sub-title">Semantic — Primary &amp; Secondary Action</div>
          <div class="semantic-grid">
            <div class="sem-row" v-for="(row, ri) in semAction" :key="ri">
              <div class="sem-token" v-for="t in row" :key="t.name">
                <div class="sem-swatch" :style="{ background: t.hex, outline: t.hex === '#ffffff' ? '1px solid #e2e8f0' : undefined }"></div>
                <div class="sem-info">
                  <div class="sem-name">{{ t.name }}</div>
                  <div class="sem-hex">{{ t.hex.toUpperCase() }}</div>
                  <div v-if="t.alias" class="sem-alias">{{ t.alias }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic — Status -->
        <div class="subsection">
          <div class="sub-title">Semantic — Status</div>
          <div class="semantic-grid">
            <div class="sem-row" v-for="(row, ri) in semStatus" :key="ri">
              <div class="sem-token" v-for="t in row" :key="t.name">
                <div class="sem-swatch" :style="{ background: t.hex }"></div>
                <div class="sem-info">
                  <div class="sem-name">{{ t.name }}</div>
                  <div class="sem-hex">{{ t.hex.toUpperCase() }}</div>
                  <div v-if="t.alias" class="sem-alias">{{ t.alias }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic — Bg & Text -->
        <div class="subsection">
          <div class="sub-title">Semantic — Background &amp; Text</div>
          <div class="semantic-grid">
            <div class="sem-row" v-for="(row, ri) in semBgTxt" :key="ri">
              <div class="sem-token" v-for="t in row" :key="t.name">
                <div class="sem-swatch" :style="{ background: t.hex, outline: t.hex === '#ffffff' ? '1px solid #e2e8f0' : undefined }"></div>
                <div class="sem-info">
                  <div class="sem-name">{{ t.name }}</div>
                  <div class="sem-hex">{{ t.hex.toUpperCase() }}</div>
                  <div v-if="t.alias" class="sem-alias">{{ t.alias }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wood tokens -->
        <div class="subsection">
          <div class="sub-title">Wood — Structural UI Surfaces</div>
          <div class="needs-grid">
            <div class="need-token" v-for="n in woodTokens" :key="n.var">
              <div class="need-swatch" :style="{ background: n.hex }"></div>
              <div class="need-info">
                <div class="need-name">{{ n.name }}</div>
                <div class="need-var">{{ n.var }}</div>
                <div class="need-hex">{{ n.hex.toUpperCase() }}</div>
                <div style="font-size:9px;color:#94a3b8;margin-top:3px;">{{ n.use }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Needs -->
        <div class="subsection">
          <div class="sub-title">Needs — Game-Specific Semantic Colors</div>
          <div class="needs-grid">
            <div class="need-token" v-for="n in needs" :key="n.var">
              <div class="need-swatch" :style="{ background: n.hex }"></div>
              <div class="need-info">
                <div class="need-name">{{ n.name }}</div>
                <div class="need-var">{{ n.var }}</div>
                <div class="need-hex">{{ n.hex.toUpperCase() }}</div>
                <div style="font-family:Consolas,monospace;font-size:9px;color:#a78bfa;margin-top:2px;">↳ {{ n.ramp }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Game colors -->
        <div class="subsection">
          <div class="sub-title">Game Colors <span style="font-weight:400;color:#94a3b8;text-transform:none;letter-spacing:0">— Panel header strips · icon discs · awning stripes · action boards</span></div>
          <div class="needs-grid">
            <div class="need-token" v-for="c in gameColors" :key="c.name">
              <div class="need-swatch" :style="{ background: c.hex }"></div>
              <div class="need-info">
                <div class="need-name">{{ c.name }}</div>
                <div style="font-family:Consolas,monospace;font-size:9px;color:#94a3b8;">{{ c.hex.toUpperCase() }}</div>
                <div style="font-size:9px;color:#94a3b8;margin-top:2px;">{{ c.use }}</div>
                <div style="font-family:Consolas,monospace;font-size:9px;color:#a78bfa;margin-top:2px;">{{ c.alias }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>Only use semantic colors when used purposefully in an appropriate component, like warning colors in a warning icon.</li>
            <li><code>--color-primary</code> = <code>--color-pink-600</code> (#DB2777) — selected for WCAG AA contrast on white</li>
            <li>Dark mode overrides via <code>@media (prefers-color-scheme: dark)</code> and <code>[data-theme="dark"]</code>; accent scales stay fixed in both modes</li>
            <li>Needs colors are semantic-only (no scale) — use only within the needs/wellness UI, not as general purpose colors</li>
            <li><code>--color-bg-canvas: #000000</code> is reserved for the 3D/WebGL viewport background</li>
          </ul>
        </div>
      </section>

      <!-- ── TYPOGRAPHY ──────────────────────────────────────────────────── -->
      <section class="section" id="typography">
        <div class="section-header">
          <h2 class="section-title">Typography</h2>
          <span class="section-count">4 families + 2 screen-specific · 8 sizes · 4 weights · 3 line-heights</span>
        </div>

        <div class="subsection">
          <div class="sub-title">Font Families</div>
          <div class="ff-grid">
            <div class="ff-card">
              <div class="ff-sample" style="font-family:'Gaegu',cursive;font-weight:700;">Guinea Pig Sim</div>
              <div class="ff-label">Heading</div>
              <div class="ff-var">--font-family-heading</div>
              <div class="ff-note">Gaegu · wght 300, 400, 700</div>
              <div class="ff-note" style="margin-top:3px;">h1–h6, panel titles, game UI</div>
            </div>
            <div class="ff-card">
              <div class="ff-sample" style="font-family:'Nunito',sans-serif;">The quick brown fox</div>
              <div class="ff-label">Body</div>
              <div class="ff-var">--font-family-body</div>
              <div class="ff-note">Nunito · wght 300–700, italic</div>
              <div class="ff-note" style="margin-top:3px;">Body copy, labels, inputs, buttons</div>
            </div>
            <div class="ff-card">
              <div class="ff-sample" style="font-family:Consolas,monospace;font-size:17px;">#db2777 · 0.375rem</div>
              <div class="ff-label">Mono</div>
              <div class="ff-var">--font-family-mono</div>
              <div class="ff-note">Consolas, Monaco · system</div>
              <div class="ff-note" style="margin-top:3px;">Code, token values, debug UI</div>
            </div>
            <div class="ff-card">
              <div class="ff-sample" style="font-family:'Roboto',sans-serif;">42 / 100 · 3.2 oz</div>
              <div class="ff-label">Stats</div>
              <div class="ff-var">--font-family-stats</div>
              <div class="ff-note">Roboto · wght 400, 500, 700</div>
              <div class="ff-note" style="margin-top:3px;">Numeric stat grids (stats.css)</div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Screen-Specific Fonts — Adoption Certificate <span style="font-weight:400;text-transform:none;letter-spacing:0;color:#94a3b8;">not global tokens</span></div>
          <div style="background:#fffbeb;border:1px solid #fde68a;border-left:3px solid #f59e0b;border-radius:8px;padding:16px 20px;">
            <div style="font-size:11px;color:#92400e;margin-bottom:14px;">Hardcoded in <code style="font-family:Consolas,monospace;font-size:11px;background:rgba(245,158,11,.15);padding:1px 5px;border-radius:3px;">AdoptionCertificate.jsx</code> for the parchment certificate aesthetic — do not use globally.</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">
              <div class="ff-card" style="border-color:#fde68a;">
                <div class="ff-sample" style="font-family:Georgia,'Times New Roman',serif;font-size:18px;">Certificate of Adoption</div>
                <div class="ff-label" style="color:#92400e;">Serif — Certificate Formal</div>
                <div class="ff-var" style="color:#b45309;">Georgia, "Times New Roman", serif</div>
                <div class="ff-note">System font — no import needed</div>
                <div class="ff-note" style="margin-top:3px;">Certificate title, stats table, preamble body, footer meta, signature titles, wax seal, ADOPTED stamp</div>
              </div>
              <div class="ff-card" style="border-color:#fde68a;">
                <div class="ff-sample" style="font-family:'Caveat',cursive;font-size:26px;font-weight:700;">Hazel Whiskers</div>
                <div class="ff-label" style="color:#92400e;">Script — Handwritten Signatures</div>
                <div class="ff-var" style="color:#b45309;">'Caveat', cursive</div>
                <div class="ff-note">Caveat · Google Fonts · wght 400, 700</div>
                <div class="ff-note" style="margin-top:3px;">Endorsement signatures, pig display name in card header, name callout in preamble</div>
              </div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Type Scale</div>
          <div class="type-scale">
            <div class="type-row" v-for="t in typeScale" :key="t.token">
              <div>
                <div class="type-token-name">{{ t.token }}</div>
                <div class="type-token-value">{{ t.rem }} · {{ t.px }}</div>
              </div>
              <div :style="{ fontSize: t.rem, fontWeight: t.weight, fontFamily: typeFamily(t.heading), overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }">
                {{ t.label }}
              </div>
              <div class="type-props">
                <span class="type-prop">family: {{ t.heading ? 'heading' : 'body' }}</span>
                <span class="type-prop">weight: {{ t.weight }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Font Weights</div>
          <div class="weight-list">
            <div class="weight-row">
              <div class="weight-meta"><div class="weight-var">--font-weight-normal</div><div class="weight-val">400</div></div>
              <span style="font-size:18px;font-weight:400;">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div class="weight-row">
              <div class="weight-meta"><div class="weight-var">--font-weight-medium</div><div class="weight-val">500</div></div>
              <span style="font-size:18px;font-weight:500;">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div class="weight-row">
              <div class="weight-meta"><div class="weight-var">--font-weight-semibold</div><div class="weight-val">600</div></div>
              <span style="font-size:18px;font-weight:600;">The quick brown fox jumps over the lazy dog</span>
            </div>
            <div class="weight-row">
              <div class="weight-meta"><div class="weight-var">--font-weight-bold / --font-weight-heading</div><div class="weight-val">700</div></div>
              <span style="font-size:18px;font-weight:700;">The quick brown fox jumps over the lazy dog</span>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Line Heights</div>
          <div class="lh-table">
            <div class="lh-row" style="background:#f8fafc;">
              <span class="lh-token">--line-height-tight</span>
              <span class="lh-val">1.25</span>
              <p class="lh-text" style="line-height:1.25;">Social animals that thrive with companionship. Regular interaction builds trust and deepens the bond between pet and owner over time.</p>
            </div>
            <div class="lh-row">
              <span class="lh-token">--line-height-normal</span>
              <span class="lh-val">1.5</span>
              <p class="lh-text" style="line-height:1.5;">Social animals that thrive with companionship. Regular interaction builds trust and deepens the bond between pet and owner over time.</p>
            </div>
            <div class="lh-row" style="background:#f8fafc;">
              <span class="lh-token">--line-height-relaxed</span>
              <span class="lh-val">1.75</span>
              <p class="lh-text" style="line-height:1.75;">Social animals that thrive with companionship. Regular interaction builds trust and deepens the bond between pet and owner over time.</p>
            </div>
          </div>
        </div>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>Body font is <code>Nunito</code> (replaced Inter) — loaded via <code>colors_and_type.css</code> at wght 300–700 + italic</li>
            <li>Base font size is <code>16px</code> on <code>html</code>; all <code>rem</code> values scale from this root</li>
            <li>Responsive heading scale: h1–h3 scale ×1.125 at 640px, ×1.25 at 1024px via <code>calc()</code> inside media queries</li>
            <li><code>--font-weight-heading</code> is an alias for 700 — always use for h1–h6 elements</li>
            <li><code>-webkit-font-smoothing: antialiased</code> applied globally on <code>body</code></li>
            <li>Heading font (Gaegu) is a handwritten-style display face — avoid using below 14px</li>
            <li>Georgia and Caveat are not global tokens — scoped exclusively to <code>AdoptionCertificate.jsx</code>; do not use elsewhere</li>
            <li><code>--font-family-stats</code> (Roboto) is used only in <code>stats.css</code> stat grid components</li>
          </ul>
        </div>
      </section>

      <!-- ── SPACING ─────────────────────────────────────────────────────── -->
      <section class="section" id="spacing">
        <div class="section-header">
          <h2 class="section-title">Spacing</h2>
          <span class="section-count">10 base steps · 6 semantic aliases · 4px base unit</span>
        </div>

        <div class="subsection">
          <div class="sub-title">Base Scale — --space-*</div>
          <div class="spacing-list">
            <div class="sp-row" v-for="s in spacingData" :key="s.token">
              <span class="sp-var">{{ s.token }}</span>
              <span class="sp-rem">{{ s.rem }}</span>
              <span class="sp-px">{{ s.px }}</span>
              <div><div class="sp-bar" :style="{ width: spBarWidth(s.px) }"></div></div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Semantic Aliases — --spacing-*</div>
          <table class="token-table">
            <thead><tr><th>Token</th><th>Resolves To</th><th>px</th><th>Intended Usage</th></tr></thead>
            <tbody>
              <tr><td><code>--spacing-2xs</code></td><td><code>--space-1</code></td><td>4px</td><td>Tight gaps, icon nudges, inline offsets</td></tr>
              <tr><td><code>--spacing-xs</code></td><td><code>--space-2</code></td><td>8px</td><td>Compact item gaps, badge padding</td></tr>
              <tr><td><code>--spacing-sm</code></td><td><code>--space-3</code></td><td>12px</td><td>Inline gaps, compact list items</td></tr>
              <tr><td><code>--spacing-md</code></td><td><code>--space-4</code></td><td>16px</td><td>Default component padding, standard gap</td></tr>
              <tr><td><code>--spacing-lg</code></td><td><code>--space-5</code></td><td>20px</td><td>Section internal spacing, looser gaps</td></tr>
              <tr><td><code>--spacing-xl</code></td><td><code>--space-6</code></td><td>24px</td><td>Panel padding (desktop), section dividers</td></tr>
            </tbody>
          </table>
        </div>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>All spacing tokens defined in <code>rem</code>; pixel values assume <code>html { font-size: 16px }</code></li>
            <li>Scale skips <code>--space-7</code> and <code>--space-9</code> — intentional gaps to avoid ambiguity</li>
            <li>Prefer <code>--spacing-*</code> semantic aliases in component code; use <code>--space-*</code> for precise one-off values</li>
            <li>Min touch targets: button sm=40px, md=44px, lg=48px (iOS HIG minimum)</li>
            <li>Habitat sidebar width: 360px fixed; collapses to 100% width / max-height 300px on mobile</li>
          </ul>
        </div>
      </section>

      <!-- ── BORDER RADIUS ───────────────────────────────────────────────── -->
      <section class="section" id="radius">
        <div class="section-header">
          <h2 class="section-title">Border Radius</h2>
          <span class="section-count">8 tokens · logical property variants</span>
        </div>

        <div class="subsection">
          <div class="sub-title">Radius Scale</div>
          <div class="radius-grid">
            <div class="radius-card" v-for="r in radiusData" :key="r.token">
              <div class="radius-box" :style="{ borderRadius: r.val }"></div>
              <div class="radius-var">{{ r.token }}</div>
              <div class="radius-val">{{ r.px }}</div>
            </div>
          </div>
        </div>

        <div class="subsection">
          <div class="sub-title">Logical Property Variants (RTL support)</div>
          <table class="token-table">
            <thead><tr><th>Token</th><th>Default Value</th><th>Resolves To (LTR)</th></tr></thead>
            <tbody>
              <tr><td><code>--border-radius-start-start</code></td><td><code>--radius-base · 4px</code></td><td>Top-left</td></tr>
              <tr><td><code>--border-radius-start-end</code></td><td><code>--radius-base · 4px</code></td><td>Top-right</td></tr>
              <tr><td><code>--border-radius-end-start</code></td><td><code>--radius-base · 4px</code></td><td>Bottom-left</td></tr>
              <tr><td><code>--border-radius-end-end</code></td><td><code>--radius-base · 4px</code></td><td>Bottom-right</td></tr>
            </tbody>
          </table>
        </div>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>Components use logical border-radius properties (<code>border-start-start-radius</code> etc.) throughout for LTR/RTL parity</li>
            <li>Button radii: sm → <code>--radius-base</code> (4px), md → <code>--radius-md</code> (6px), lg → <code>--radius-lg</code> (8px)</li>
            <li>Panel: <code>--radius-md</code> on mobile → <code>--radius-lg</code> on desktop (769px+)</li>
            <li><code>--radius-full</code> (9999px) used for pill badges, chips, FABs, and segmented controls overflow container</li>
            <li>Subpanel accent bar (<code>.panel--accent::before</code>) has no border-radius — it's a 4px-wide flush strip</li>
          </ul>
        </div>
      </section>

      <!-- ── SHADOWS ─────────────────────────────────────────────────────── -->
      <section class="section" id="shadows">
        <div class="section-header">
          <h2 class="section-title">Shadows</h2>
          <span class="section-count">5 elevation · 16 component tokens</span>
        </div>

        <div class="subsection">
          <div class="sub-title">Elevation Scale</div>
          <div class="shadow-grid">
            <div class="shadow-card" v-for="s in shadowData" :key="s.token">
              <div class="shadow-box" :style="{ boxShadow: s.val }"></div>
              <div class="shadow-var">{{ s.token }}</div>
              <div class="shadow-val" style="margin-top:4px;">{{ s.val }}</div>
              <div class="shadow-use">{{ s.use }}</div>
            </div>
          </div>
        </div>

        <div class="subsection" style="margin-top:28px;">
          <div class="sub-title">Component tokens — game-specific · warm-brown + inset families</div>
          <div class="shadow-grid">
            <div class="shadow-card" v-for="s in componentShadowData" :key="s.token">
              <div :class="['shadow-box', { 'shadow-box--warm': s.bg === 'warm' }]" :style="{ boxShadow: s.val }"></div>
              <div class="shadow-var">{{ s.token }}</div>
              <div class="shadow-val" style="margin-top:4px;">{{ s.val }}</div>
              <div class="shadow-use">{{ s.use }}</div>
            </div>
          </div>
        </div>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>All shadows use <code>rgb(0 0 0 / alpha)</code> modern syntax — not compatible with IE11</li>
            <li>Panel resting state: <code>--shadow-sm</code>; hover state: <code>--shadow-md</code> (set via <code>transition: all var(--transition-normal)</code>)</li>
            <li>Modal / dialog elevation: <code>--shadow-xl</code></li>
            <li>Disabled buttons: <code>box-shadow: none !important</code> overrides all elevation</li>
            <li>Colored hover shadows (primary/danger/warning) are per-component RGBA values at 0.1 opacity — not tokens</li>
            <li>Tooltip backdrop blur: <code>backdrop-filter: blur(1px)</code> used on loading panel overlay, not as a token</li>
          </ul>
        </div>
      </section>

      <!-- ── Z-INDEX ─────────────────────────────────────────────────────── -->
      <section class="section" id="z-index">
        <div class="section-header">
          <h2 class="section-title">Z-Index</h2>
          <span class="section-count">7 layers · increments of 10</span>
        </div>

        <table class="token-table">
          <thead><tr><th>Token</th><th>Value</th><th>Layer</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td><code>--z-index-dropdown</code></td><td>1000</td><td>1 / 7</td><td>Dropdown menus, context menus, select popouts</td></tr>
            <tr><td><code>--z-index-sticky</code></td><td>1020</td><td>2 / 7</td><td>Sticky headers, sticky sidebars</td></tr>
            <tr><td><code>--z-index-fixed</code></td><td>1030</td><td>3 / 7</td><td>Fixed navigation bars, FAB buttons, game HUD</td></tr>
            <tr><td><code>--z-index-modal-backdrop</code></td><td>1040</td><td>4 / 7</td><td>Modal overlay scrim / background dimmer</td></tr>
            <tr><td><code>--z-index-modal</code></td><td>1050</td><td>5 / 7</td><td>Modal dialogs, bottom sheets, drawers</td></tr>
            <tr><td><code>--z-index-popover</code></td><td>1060</td><td>6 / 7</td><td>Popovers, floating info panels, command palettes</td></tr>
            <tr><td><code>--z-index-tooltip</code></td><td>1070</td><td>7 / 7</td><td>Tooltips — always topmost, above all other layers</td></tr>
          </tbody>
        </table>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li>All layers increment by 10, leaving room for intermediate values if a future component needs them</li>
            <li>Tooltip (1070) is always the ceiling — it must appear above modals and popovers per UX convention</li>
            <li>3D WebGL canvas (<code>--color-bg-canvas: #000000</code>) lives at <code>z-index: 0</code>; all UI layers stack above</li>
            <li>FAB subnavigation uses <code>position: fixed</code> — respect <code>--z-index-fixed</code> (1030)</li>
            <li>Do not use arbitrary z-index values in components — always reference a token</li>
          </ul>
        </div>
      </section>

      <!-- ── TRANSITIONS ─────────────────────────────────────────────────── -->
      <section class="section" id="transitions">
        <div class="section-header">
          <h2 class="section-title">Transitions</h2>
          <span class="section-count">3 speeds · ease-in-out easing</span>
        </div>

        <table class="token-table">
          <thead><tr><th>Token</th><th>Value</th><th>Usage</th><th style="width:80px;">Demo ↗ hover</th></tr></thead>
          <tbody>
            <tr>
              <td><code>--transition-fast</code></td>
              <td><code>150ms ease-in-out</code></td>
              <td>Button states, focus rings, hover color shifts, tooltip opacity fade</td>
              <td><div class="transition-box" style="transition:transform 150ms ease-in-out, background 150ms ease-in-out;"></div></td>
            </tr>
            <tr>
              <td><code>--transition-normal</code></td>
              <td><code>250ms ease-in-out</code></td>
              <td>Panel hover states, accordion expand/collapse, page-level transitions</td>
              <td><div class="transition-box" style="transition:transform 250ms ease-in-out, background 250ms ease-in-out;"></div></td>
            </tr>
            <tr>
              <td><code>--transition-slow</code></td>
              <td><code>350ms ease-in-out</code></td>
              <td>Modal open/close, slide-in drawers, complex layout animations</td>
              <td><div class="transition-box" style="transition:transform 350ms ease-in-out, background 350ms ease-in-out;"></div></td>
            </tr>
          </tbody>
        </table>

        <div class="notes">
          <h4>Notes</h4>
          <ul>
            <li><code>@media (prefers-reduced-motion: reduce)</code> — transitions set to <code>none</code> in panel, button, and tooltip components</li>
            <li>Button hover: adds <code>translateY(-1px)</code>; active state removes it — both via <code>--transition-fast</code></li>
            <li>Avoid <code>transition: all</code> on performance-critical components; specify individual properties explicitly</li>
            <li>3D WebGL animations and frame pacing are managed separately outside this token system</li>
            <li>Tooltip opacity fade uses <code>--transition-fast</code>; the tooltip itself has no transform animation</li>
          </ul>
        </div>
      </section>

    </main>
  </div>
</template>
