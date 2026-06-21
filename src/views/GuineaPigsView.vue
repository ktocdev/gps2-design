<script setup lang="ts">
import '../styles/design-elements-page.css'

import PageLayout from '../components/design/PageLayout.vue'
import Section    from '../components/design/Section.vue'
import Notes      from '../components/design/Notes.vue'
import PigSvg, { type SpotKey, EYE_COLORS } from '../components/design/PigSvg.vue'

type IllustratedBreed = 'American' | 'Abyssinian' | 'Peruvian' | 'Teddy' | 'Silkie'

interface BreedEntry { name: string; illustrated: boolean }
interface BreedGroup { rarity: string; breeds: BreedEntry[] }

const BREED_GROUPS: BreedGroup[] = [
  {
    rarity: 'Common',
    breeds: [
      { name: 'American',   illustrated: true },
      { name: 'Abyssinian', illustrated: true },
    ],
  },
  {
    rarity: 'Uncommon',
    breeds: [
      { name: 'Peruvian', illustrated: true },
      { name: 'Teddy',    illustrated: true },
      { name: 'Rex',      illustrated: false },
    ],
  },
  {
    rarity: 'Rare',
    breeds: [
      { name: 'Silkie',       illustrated: true  },
      { name: 'Texel',        illustrated: false },
      { name: 'Coronet',      illustrated: false },
      { name: 'White Crested', illustrated: false },
    ],
  },
  {
    rarity: 'Very Rare',
    breeds: [
      { name: 'Alpaca', illustrated: false },
      { name: 'Merino', illustrated: false },
    ],
  },
  {
    rarity: 'Ultra Rare',
    breeds: [
      { name: 'Baldwin',    illustrated: false },
      { name: 'Skinny Pig', illustrated: false },
    ],
  },
]

const DEFAULT_COLORS = ['Orange']

const PATTERN_EXAMPLES: { label: string; colors: string[] }[] = [
  // Solid
  { label: 'Solid',                  colors: ['Orange'] },
  { label: 'Solid',                  colors: ['Chocolate'] },
  { label: 'Solid',                  colors: ['Lilac'] },
  // Bicolor
  { label: 'Bicolor',               colors: ['Cream', 'Black'] },
  { label: 'Bicolor',               colors: ['White', 'Tortoise'] },
  { label: 'Bicolor',               colors: ['Beige', 'Brown'] },
  { label: 'Bicolor',               colors: ['Gold', 'Chocolate'] },
  // Tricolor
  { label: 'Tricolor',              colors: ['Cream', 'Black', 'Tortoise'] },
  { label: 'Tricolor',              colors: ['White', 'Brown', 'Orange'] },
  { label: 'Tricolor',              colors: ['Buff', 'Chocolate', 'Red'] },
  { label: 'Tricolor',              colors: ['Tricolor', 'Brown', 'Black'] },
]

const SPOT_EXAMPLES: { label: string; colors: string[]; spots: Partial<Record<SpotKey, string>> }[] = [
  // single spots
  { label: 'Back',                   colors: ['Cream'],   spots: { back: 'Tortoise' } },
  { label: 'Belly',                  colors: ['Cream'],   spots: { belly: 'Brown' } },
  { label: 'Neck',                   colors: ['Cream'],   spots: { neck: 'Black' } },
  { label: 'Face',                   colors: ['Cream'],   spots: { face: 'Brown' } },
  // two-spot combos
  { label: 'Back + Belly',           colors: ['White'],   spots: { back: 'Black', belly: 'Brown' } },
  { label: 'Face + Neck',            colors: ['Gray'],    spots: { face: 'White', neck: 'White' } },
  { label: 'Back + Face',            colors: ['White'],   spots: { back: 'Tortoise', face: 'Brown' } },
  { label: 'Neck + Belly',           colors: ['Orange'],  spots: { neck: 'White', belly: 'Cream' } },
  // three spots
  { label: 'Back + Neck + Face',     colors: ['Cream'],   spots: { back: 'Black', neck: 'Tortoise', face: 'Brown' } },
  { label: 'Back + Belly + Face',    colors: ['White'],   spots: { back: 'Brown', belly: 'Tortoise', face: 'Black' } },
  // all four — same color
  { label: 'All four · same color',  colors: ['Orange'],  spots: { face: 'White', neck: 'White', back: 'White', belly: 'White' } },
  // all four — each different
  { label: 'All four · mixed',       colors: ['Cream'],   spots: { back: 'Black', belly: 'Brown', neck: 'Tortoise', face: 'Orange' } },
]

const GAME_COLORS = {
  common: [
    { name: 'White',    hex: '#f5f5f0' },
    { name: 'Black',    hex: '#2a2520' },
    { name: 'Brown',    hex: '#8b5a2b' },
    { name: 'Cream',    hex: '#f5e6c8' },
    { name: 'Tortoise', hex: '#b8651e' },
    { name: 'Tricolor', hex: '#d9b27c' },
    { name: 'Orange',   hex: '#e8862a' },
    { name: 'Gray',     hex: '#8a8a86' },
  ],
  uncommon: [
    { name: 'Red',      hex: '#db3a00' },
    { name: 'Gold',     hex: '#daa520' },
    { name: 'Beige',    hex: '#f5f5dc' },
  ],
  rare: [
    { name: 'Chocolate', hex: '#5c3317' },
    { name: 'Lilac',     hex: '#c8a2c8' },
    { name: 'Buff',      hex: '#f0dc82' },
    { name: 'Dalmatian', hex: '#f5f5f5' },
  ],
}

const navGroups = [
  {
    label: 'Characters',
    items: [
      { id: 'game-colors',    label: 'Game Colors' },
      { id: 'patterns',       label: 'Fur Patterns' },
      { id: 'pattern-colors', label: 'Fur Pattern Colors' },
      { id: 'feet',           label: 'Feet' },
      { id: 'breeds',         label: 'Breeds (Deferred)' },
    ]
  }
]
</script>

<template>
  <PageLayout
    title="GPS2"
    title-accent="Guinea Pigs"
    page-title="GPS2 Guinea Pigs"
    :nav-groups="navGroups"
  >
    <template #brand-subtitle>Guinea Pig Reference</template>
    <template #page-meta>
      <div class="page-meta">
        <span>13 breeds · 5 rarity tiers · 5 illustrated · 15 fur colors · PigSvg component</span>
        <span class="badge">Characters</span>
      </div>
    </template>

    <!-- ── GAME COLORS ───────────────────────────────────────────────────── -->
    <Section id="game-colors" title="Game Colors" count="15 fur colors · common · uncommon · rare">

      <div class="wood-item">
        <div class="wood-item-label">Common <span>— 8 colors</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div v-for="c in GAME_COLORS.common" :key="c.name" class="pig-breed-card">
              <PigSvg :colors="[c.name]" :size="90" :uid="`gc-${c.name}`" />
              <span class="pig-breed-label">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="wood-item">
        <div class="wood-item-label">Uncommon <span>— 3 colors</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div v-for="c in GAME_COLORS.uncommon" :key="c.name" class="pig-breed-card">
              <PigSvg :colors="[c.name]" :size="90" :uid="`gu-${c.name}`" />
              <span class="pig-breed-label">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="wood-item">
        <div class="wood-item-label">Rare <span>— 4 colors</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div v-for="c in GAME_COLORS.rare" :key="c.name" class="pig-breed-card">
              <PigSvg :colors="[c.name]" :size="90" :uid="`gr-${c.name}`" />
              <span class="pig-breed-label">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="el-spec" style="border-radius: var(--radius-lg); border: 1px solid var(--color-neutral-200); margin-block-end: var(--space-4);">
        <div>
          <div class="el-label">Common</div>
          <div class="pig-swatches">
            <div v-for="c in GAME_COLORS.common" :key="c.name" class="pig-swatch"
              :style="{ background: c.hex, color: ['Black','Brown','Chocolate'].includes(c.name) ? '#f5f5f0' : '#2a2520' }">
              <span>{{ c.hex }}</span><span class="pig-swatch-name">{{ c.name }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="el-label">Uncommon</div>
          <div class="pig-swatches">
            <div v-for="c in GAME_COLORS.uncommon" :key="c.name" class="pig-swatch"
              :style="{ background: c.hex, color: c.name === 'Red' ? '#f5f5f0' : '#2a2520' }">
              <span>{{ c.hex }}</span><span class="pig-swatch-name">{{ c.name }}</span>
            </div>
          </div>
        </div>
        <div class="el-spec-full">
          <div class="el-label">Rare</div>
          <div class="pig-swatches">
            <div v-for="c in GAME_COLORS.rare" :key="c.name" class="pig-swatch"
              :style="{ background: c.hex, color: c.name === 'Chocolate' ? '#f5f5f0' : '#2a2520' }">
              <span>{{ c.hex }}</span><span class="pig-swatch-name">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <Notes>
        <li>Rarity tiers match <code>gps2/src/constants/guineaPigColors.ts</code> — hex values converted from 0x notation and tuned for SVG rendering</li>
        <li>Dalmatian is an off-white base (#f5f5f5) — Dalmatian pigs use this base color with dark spots applied via the <code>spots</code> prop</li>
        <li>Tricolor is shown as a solid tan base — multi-color pigs use additional colors via the <code>colors</code> array or <code>spots</code> prop</li>
      </Notes>
    </Section>

    <!-- ── FUR PATTERNS ────────────────────────────────────────────────── -->
    <Section id="patterns" title="Fur Patterns" count="4 named spots · any combination · each independently colored">

      <div class="wood-item">
        <div class="wood-item-label">Spot Positions <span>— face · neck · back · belly</span></div>
        <div class="el-spec">
          <div>
            <div class="el-label">back</div>
            <div class="el-value">Upper back / saddle — largest patch, covers most of the back</div>
          </div>
          <div>
            <div class="el-label">belly</div>
            <div class="el-value">Lower belly / rear — elongated strip along the bottom</div>
          </div>
          <div>
            <div class="el-label">neck</div>
            <div class="el-value">Neck / above-eye junction — smaller oval where neck meets head</div>
          </div>
          <div>
            <div class="el-label">face</div>
            <div class="el-value">Cheek / lower face — rounded patch on the visible cheek area</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">Usage</div>
            <div class="el-code">
              &lt;PigSvg :spots="&#123; back: 'Black', belly: 'Brown', face: 'White' &#125;" /&gt;<br>
              — any subset of the four keys may be provided<br>
              — accepts named color strings (from FUR_COLORS) or raw hex values<br>
              — omitted keys render no spot at that position
            </div>
          </div>
        </div>
      </div>

      <div class="wood-item">
        <div class="wood-item-label">Combinations <span>— American breed · Cream base unless noted</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-color-grid">
            <div v-for="(ex, i) in SPOT_EXAMPLES" :key="i" class="pig-color-card">
              <PigSvg breed="American" :colors="ex.colors" :spots="ex.spots" :size="110" :uid="`spot-${i}`" />
              <span class="pig-breed-label">{{ ex.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <Notes>
        <li>Spots render over the base body color inside the body clipPath — they are always contained within the pig silhouette</li>
        <li>Breed textures (Abyssinian rosettes, Teddy tufts, Silkie sheen) layer on top of spots</li>
        <li><code>SpotKey</code> is a named export from <code>PigSvg.vue</code> — <code>import &#123; type SpotKey &#125; from './PigSvg.vue'</code> for typed spot objects</li>
        <li>Spots and the <code>colors</code> multi-patch system coexist — spots render after <code>colors[1]</code>/<code>colors[2]</code> patches and take visual priority where they overlap</li>
      </Notes>
    </Section>

    <!-- ── FUR PATTERN COLORS ─────────────────────────────────────────── -->
    <Section id="pattern-colors" title="Fur Pattern Colors" count="solid · bicolor · tricolor · up to 3 colors per pig">

      <div class="wood-item">
        <div class="wood-item-label">Pattern Examples <span>— American breed · solid · bicolor · tricolor</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-color-grid">
            <div v-for="(ex, i) in PATTERN_EXAMPLES" :key="i" class="pig-color-card">
              <PigSvg breed="American" :colors="ex.colors" :size="110" :uid="`pat-${i}`" />
              <span class="pig-breed-label">{{ ex.label }}</span>
              <span class="pig-breed-label" style="opacity:.6;">{{ ex.colors.join(' · ') }}</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div class="el-spec-full">
            <div class="el-label">Color Slots</div>
            <div class="el-code">
              colors[0] — base body fill (required)<br>
              colors[1] — saddle patch + ear color + neck spot<br>
              colors[2] — rear/belly patch + face/cheek patch (falls back to colors[1] if omitted)<br>
              1 color = solid · 2 colors = bicolor · 3 colors = tricolor
            </div>
          </div>
        </div>
      </div>

      <!-- Eye colors -->
      <div class="wood-item">
        <div class="wood-item-label">Eye Colors <span>— 5 named values · White base shown</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div v-for="name in Object.keys(EYE_COLORS)" :key="name" class="pig-breed-card">
              <PigSvg :colors="['White']" :eye="name" :size="110" :uid="`eye-${name}`" />
              <span class="pig-breed-label">{{ name }}</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div class="el-spec-full">
            <div class="el-label">Named Eye Colors</div>
            <div class="pig-swatches">
              <div v-for="(hex, name) in EYE_COLORS" :key="name"
                class="pig-swatch"
                :style="{ background: hex, color: name === 'pink' ? '#333' : '#fff' }"
              >
                <span>{{ hex }}</span>
                <span class="pig-swatch-name">{{ name }}</span>
              </div>
            </div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">Usage</div>
            <div class="el-code">
              &lt;PigSvg eye="blue" /&gt;<br>
              — default: 'black' · accepts named strings from EYE_COLORS or raw hex<br>
              — EYE_COLORS is a named export from PigSvg.vue<br>
              — matches gps2 guineaPigColors.ts names and hex values exactly
            </div>
          </div>
        </div>
      </div>

      <Notes>
        <li>Any named color from <code>FUR_COLORS</code> (all 15 game colors) can be used in any slot — see Game Colors section for the full palette</li>
        <li>Ear color follows <code>colors[1]</code>; falls back to <code>colors[0]</code> for solid pigs</li>
        <li>Feet turn black automatically when the base or belly area carries the Black color — see Fur Patterns section</li>
      </Notes>
    </Section>

    <!-- ── FEET ──────────────────────────────────────────────────────────── -->
    <Section id="feet" title="Feet" count="pink default · black when lower body carries black fur">

      <div class="wood-item">
        <div class="wood-item-label">Pink feet <span>— default · no black in lower body area</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div class="pig-breed-card">
              <PigSvg :colors="['Orange']" :size="110" uid="feet-1" />
              <span class="pig-breed-label">Solid · Orange</span>
            </div>
            <div class="pig-breed-card">
              <PigSvg :colors="['Cream', 'Black', 'Tortoise']" :size="110" uid="feet-2" />
              <span class="pig-breed-label">Black saddle only</span>
              <span class="pig-breed-label" style="opacity:.6;">Cream · Black · Tortoise</span>
            </div>
            <div class="pig-breed-card">
              <PigSvg :colors="['Cream']" :spots="{ back: 'Black' }" :size="110" uid="feet-3" />
              <span class="pig-breed-label">Black back spot only</span>
              <span class="pig-breed-label" style="opacity:.6;">Cream + spot: back=Black</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Color</div>
            <div class="el-value">#f0a8a8 — soft pink</div>
          </div>
          <div>
            <div class="el-label">When</div>
            <div class="el-value">All cases where black does not reach the lower body — solid non-black, or black only on the saddle / back spot</div>
          </div>
        </div>
      </div>

      <div class="wood-item">
        <div class="wood-item-label">Black feet <span>— black present in lower body area</span></div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <div class="pig-breed-card">
              <PigSvg :colors="['Black']" :size="110" uid="feet-4" />
              <span class="pig-breed-label">Solid Black</span>
            </div>
            <div class="pig-breed-card">
              <PigSvg :colors="['White', 'Black']" :size="110" uid="feet-5" />
              <span class="pig-breed-label">Bicolor · black rear</span>
              <span class="pig-breed-label" style="opacity:.6;">White · Black</span>
            </div>
            <div class="pig-breed-card">
              <PigSvg :colors="['Cream']" :spots="{ belly: 'Black' }" :size="110" uid="feet-6" />
              <span class="pig-breed-label">Black belly spot</span>
              <span class="pig-breed-label" style="opacity:.6;">Cream + spot: belly=Black</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Color</div>
            <div class="el-value">#2a2520 — matches Black fur</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">Trigger conditions (any one is sufficient)</div>
            <div class="el-code">
              colors[0] === Black — solid black body<br>
              rearColor (colors[2] ?? colors[1]) === Black — black reaches the belly/face patches<br>
              spots.belly === Black — black belly spot explicitly set
            </div>
          </div>
        </div>
      </div>

      <Notes>
        <li>The saddle patch (colors[1]) is only on the upper back — it does not darken the feet on its own</li>
        <li>In a tricolor pig (colors[0], colors[1], colors[2]), colors[2] controls the belly/face area; if colors[2] is non-black, feet stay pink even when colors[1] is Black</li>
        <li>A back spot (<code>spots.back</code>) also does not affect feet — only <code>spots.belly</code> does</li>
      </Notes>
    </Section>

    <!-- ── BREEDS (DEFERRED) ─────────────────────────────────────────────── -->
    <Section id="breeds" title="Breeds" count="Deferred · 13 breeds · 5 rarity tiers">

      <Notes>
        <li><strong>Breed-specific 2D and 3D graphics are deferred.</strong> The plan is to create breed illustrations more professionally in a future pass — proper concept art, consistent silhouettes, and 3D model variants — rather than extending the current hand-coded SVG approach.</li>
        <li>In the 2D chrome (desktop pig, cage cards, selection screens), all guinea pigs currently render as the <strong>American shorthair</strong> variant regardless of their actual breed.</li>
        <li>In the 3D game (gps2), breed is stored as metadata and influences the weighted breed pool, but is not surfaced to the player.</li>
      </Notes>

      <div v-for="group in BREED_GROUPS" :key="group.rarity" class="wood-item">
        <div class="wood-item-label">
          {{ group.rarity }}
          <span>— {{ group.breeds.map(b => b.name).join(' · ') }}</span>
        </div>
        <div class="el-demo pig-demo">
          <div class="pig-breed-row">
            <template v-for="breed in group.breeds" :key="breed.name">
              <div class="pig-breed-card" v-if="breed.illustrated">
                <PigSvg
                  :breed="(breed.name as IllustratedBreed)"
                  :colors="DEFAULT_COLORS"
                  :size="130"
                  :uid="breed.name"
                />
                <span class="pig-breed-label">{{ breed.name }}</span>
              </div>
              <div class="pig-breed-card pig-breed-card--placeholder" v-else>
                <div class="pig-placeholder">?</div>
                <span class="pig-breed-label">{{ breed.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="el-spec">
        <div>
          <div class="el-label">Used In</div>
          <div class="el-value">Desktop pig · pet store cage cards · bonded pair selection screen</div>
        </div>
        <div>
          <div class="el-label">Dimensions</div>
          <div class="el-value">viewBox 0 0 180 120 · default size 110px wide · scales via size prop</div>
        </div>
        <div class="el-spec-full">
          <div class="el-label">Illustrated Breed Differences (prototype only)</div>
          <div class="el-code">
            American — smooth base body, no overlay<br>
            Abyssinian — rosette whorl circles + spiky top ridge clipped to body<br>
            Peruvian — long hair skirt below body + face fringe strands<br>
            Teddy — bumpy scalloped top body path (TEDDY_PATH) + fur tuft dots<br>
            Silkie — smooth coat below body + white sheen lines over body
          </div>
        </div>
      </div>

      <Notes>
        <li>8 breeds (Rex, Texel, Coronet, White Crested, Alpaca, Merino, Baldwin, Skinny Pig) are in the game's weighted breed pool but do not have a <code>PigSvg</code> illustration</li>
        <li>Pass a unique <code>uid</code> prop when multiple <code>PigSvg</code> components appear on the same page — it namespaces the internal <code>clipPath</code> id</li>
        <li>Teddy uses a separate <code>TEDDY_PATH</code> with quadratic bezier bumps along the top edge; all other breeds share <code>BODY_PATH</code></li>
      </Notes>
    </Section>

  </PageLayout>
</template>
