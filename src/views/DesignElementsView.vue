<script setup lang="ts">
import '../styles/design-elements-page.css'

import PageLayout from '../components/design/PageLayout.vue'
import Section    from '../components/design/Section.vue'
import Notes      from '../components/design/Notes.vue'

const navGroups = [
  {
    label: 'Elements',
    items: [
      { id: 'wood', label: 'Wood' },
      { id: 'paper', label: 'Paper' },
      { id: 'awnings', label: 'Awnings' },
      { id: 'signs', label: 'Signs' },
      { id: 'hardware', label: 'Hardware' },
      { id: 'decorations', label: 'Decorations' },
      { id: 'stickers', label: 'Stickers' },
    ]
  }
]
</script>

<template>
  <PageLayout
    title="GPS2"
    title-accent="Design Elements"
    page-title="GPS2 Design Elements"
    :nav-groups="navGroups"
  >
    <template #brand-subtitle>Design Elements v1.0</template>
    <template #page-meta>
      <div class="page-meta">
        <span>CSS-only · no external assets · all rendered live</span>
        <span class="badge">Visual Language</span>
      </div>
    </template>

    <!-- ── WOOD ─────────────────────────────────────────────────────── -->
    <Section id="wood" title="Wood" count="6 variants · beams, planks, shelves, divider rule &amp; frames">

      <div class="subsection">
        <div class="sub-title">Horizontal Bars</div>

        <!-- Wooden Beam -->
        <div class="wood-item">
          <div class="wood-item-label">Wooden Beam <span>— SuppliesStore · 22px · awning support</span></div>
          <div class="el-demo">
            <div style="position:relative;height:32px;background:linear-gradient(180deg,var(--color-wood-mid) 0%,var(--color-wood-dark) 50%,var(--color-wood-shadow) 100%);border-top:3px solid var(--color-wood-border);border-bottom:3px solid var(--color-wood-border);box-shadow:inset 0 2px 0 rgba(255,255,255,.18),inset 0 -2px 0 rgba(0,0,0,.35),0 6px 8px -3px rgba(0,0,0,.35);">
              <div aria-hidden="true" style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 80px,rgba(0,0,0,.18) 80px 82px,transparent 82px 160px);pointer-events:none;"></div>
              <div aria-hidden="true" style="position:absolute;top:50%;transform:translateY(-50%);left:14px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
              <div aria-hidden="true" style="position:absolute;top:50%;transform:translateY(-50%);right:14px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
            </div>
          </div>
          <div class="el-spec">
            <div>
              <div class="el-label">Used In</div>
              <div class="el-value">SuppliesStore — horizontal beam awnings hang from above the storefront window</div>
            </div>
            <div>
              <div class="el-label">Dimensions</div>
              <div class="el-value">22px tall · full-width · border-top/bottom: 3px solid var(--color-wood-border)</div>
            </div>
            <div class="el-spec-full">
              <div class="el-label">CSS</div>
              <div class="el-code">
                background: linear-gradient(180deg, var(--color-wood-mid) 0%, var(--color-wood-dark) 50%, var(--color-wood-shadow) 100%)<br>
                grain: repeating-linear-gradient(90deg, transparent 0 80px, rgba(0,0,0,.18) 80px 82px, transparent 82px 160px) — vertical dots every 80px<br>
                2× brass rivets at horizontal ends · box-shadow: inset 0 2px 0 rgba(255,255,255,.18), inset 0 -2px 0 rgba(0,0,0,.35), 0 6px 8px -3px rgba(0,0,0,.35)
              </div>
            </div>
          </div>
        </div>

        <!-- Wood Plank -->
        <div class="wood-item">
          <div class="wood-item-label">Wood Plank <span>— SimTopBar · habitat secondary bar</span></div>
          <div class="el-demo">
            <div style="position:relative;height:52px;background:linear-gradient(180deg,var(--color-wood-light) 0%,var(--color-wood-dark) 50%,var(--color-wood-shadow) 100%);border-bottom:3px solid var(--color-wood-border);box-shadow:inset 0 2px 0 rgba(255,235,200,.22),inset 0 -2px 0 rgba(0,0,0,.4),0 6px 8px -3px rgba(0,0,0,.35);">
              <div aria-hidden="true" style="position:absolute;inset:0;overflow:hidden;background:repeating-linear-gradient(180deg,rgba(255,255,255,.04) 0 3px,transparent 3px 6px);pointer-events:none;"></div>
              <div aria-hidden="true" style="position:absolute;top:8px;left:8px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
              <div aria-hidden="true" style="position:absolute;top:8px;right:8px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
              <div aria-hidden="true" style="position:absolute;bottom:8px;left:8px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
              <div aria-hidden="true" style="position:absolute;bottom:8px;right:8px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);"></div>
            </div>
          </div>
          <div class="el-spec">
            <div>
              <div class="el-label">Used In</div>
              <div class="el-value">SimTopBar — secondary bar pinned below the main header in the habitat view</div>
            </div>
            <div>
              <div class="el-label">Dimensions</div>
              <div class="el-value">Full-width · padding: 12px 18px 14px · border-bottom: 3px solid var(--color-wood-border)</div>
            </div>
            <div class="el-spec-full">
              <div class="el-label">CSS</div>
              <div class="el-code">
                background: linear-gradient(180deg, var(--color-wood-light) 0%, var(--color-wood-dark) 50%, var(--color-wood-shadow) 100%)<br>
                grain: repeating-linear-gradient(180deg, rgba(255,255,255,.04) 0 3px, transparent 3px 6px) — absolute inset 0 overflow:hidden<br>
                4× brass rivets at all corners · box-shadow: inset 0 2px 0 rgba(255,235,200,.22), inset 0 -2px 0 rgba(0,0,0,.4), 0 6px 8px -3px rgba(0,0,0,.35)
              </div>
            </div>
          </div>
        </div>

        <!-- Wood Shelf -->
        <div class="wood-item">
          <div class="wood-item-label">Wood Shelf <span>— SuppliesStore · items rest on top · clip-path bracket legs</span></div>
          <div class="el-demo">
            <div style="position:relative;padding-bottom:26px;background:var(--color-gold-50);">
              <div style="position:relative;height:22px;background:linear-gradient(180deg,var(--color-wood-mid) 0%,var(--color-wood-dark) 50%,var(--color-wood-shadow) 100%);box-shadow:0 10px 14px -4px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.25),inset 0 -2px 0 rgba(0,0,0,.4);">
                <div style="position:absolute;top:5px;left:8%;right:8%;height:1px;background:rgba(0,0,0,.22);"></div>
                <div style="position:absolute;top:11px;left:14%;right:22%;height:1px;background:rgba(0,0,0,.18);"></div>
                <div style="position:absolute;top:16px;left:28%;right:10%;height:1px;background:rgba(0,0,0,.14);"></div>
                <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(180deg,transparent,rgba(0,0,0,.45));border-radius:0 0 3px 3px;"></div>
              </div>
              <div aria-hidden="true" style="position:absolute;bottom:0;left:6%;width:18px;height:26px;background:linear-gradient(180deg,var(--color-wood-shadow) 0%,var(--color-wood-border) 100%);clip-path:polygon(0 0, 100% 0, 100% 30%, 30% 100%);box-shadow:2px 2px 4px rgba(0,0,0,.35);"></div>
              <div aria-hidden="true" style="position:absolute;bottom:0;right:6%;width:18px;height:26px;background:linear-gradient(180deg,var(--color-wood-shadow) 0%,var(--color-wood-border) 100%);clip-path:polygon(0 0, 100% 0, 70% 100%, 0 30%);box-shadow:-2px 2px 4px rgba(0,0,0,.35);"></div>
            </div>
          </div>
          <div class="el-spec">
            <div>
              <div class="el-label">Used In</div>
              <div class="el-value">SuppliesStore — shelf boards separating item rows; optional label tag at right end</div>
            </div>
            <div>
              <div class="el-label">Dimensions</div>
              <div class="el-value">22px shelf height · bracket legs 18×26px · clip-path triangles</div>
            </div>
            <div class="el-spec-full">
              <div class="el-label">CSS</div>
              <div class="el-code">
                shelf: linear-gradient(180deg, var(--color-wood-mid) 0%, var(--color-wood-dark) 50%, var(--color-wood-shadow) 100%)<br>
                grain: 3 hardcoded hairlines at top:5/11/16px → rgba(0,0,0,.22/.18/.14) — irregular spacing for natural wood look<br>
                left bracket: clip-path: polygon(0 0, 100% 0, 100% 30%, 30% 100%) · gradient var(--color-wood-shadow)→var(--color-wood-border) · box-shadow: 2px 2px 4px rgba(0,0,0,.35)<br>
                right bracket: clip-path: polygon(0 0, 100% 0, 70% 100%, 0 30%)
              </div>
            </div>
          </div>
        </div>

        <!-- Section Divider Rule -->
        <div class="wood-item">
          <div class="wood-item-label">Section Divider Rule <span>— SuppliesStore department header · flex filler between title and currency badge</span></div>
          <div class="el-demo">
            <div style="padding:20px 24px;background:var(--color-gold-50);display:flex;align-items:center;gap:16px;">
              <span style="font-family:'Gaegu',cursive;font-size:24px;font-weight:700;color:var(--color-wood-border);white-space:nowrap;">Today's Picks</span>
              <div style="flex:1;height:6px;background:linear-gradient(180deg,var(--color-wood-mid) 0%,var(--color-wood-shadow) 100%);border-radius:3px;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),inset 0 -1px 0 rgba(0,0,0,.3);"></div>
            </div>
          </div>
          <div class="el-spec">
            <div>
              <div class="el-label">Used In</div>
              <div class="el-value">SuppliesStore department header — fills space between section title and currency badge in a flex row</div>
            </div>
            <div>
              <div class="el-label">Dimensions</div>
              <div class="el-value">height: 6px · flex: 1 (fills available space) · border-radius: 3px</div>
            </div>
            <div class="el-spec-full">
              <div class="el-label">CSS</div>
              <div class="el-code">
                background: linear-gradient(180deg, var(--color-wood-mid) 0%, var(--color-wood-shadow) 100%)<br>
                border-radius: 3px<br>
                box-shadow: inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(0,0,0,.3)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Frames</div>
        <div class="frame-grid">

          <!-- Cage Frame -->
          <div class="frame-card">
            <div class="frame-demo">
              <div style="position:relative;width:188px;height:128px;background:linear-gradient(180deg,var(--color-wood-mid) 0%,var(--color-wood-dark) 50%,var(--color-wood-shadow) 100%);border-radius:14px;border:3px solid var(--color-wood-border);box-shadow:0 8px 14px -3px rgba(69,26,3,.4),inset 0 2px 0 rgba(255,255,255,.18);">
                <div aria-hidden="true" style="position:absolute;inset:6px 8px;border-radius:8px;pointer-events:none;background-image:repeating-linear-gradient(180deg,transparent 0 18px,rgba(0,0,0,.18) 18px 19px,transparent 19px 21px,rgba(0,0,0,.10) 21px 22px,transparent 22px 38px);"></div>
                <div aria-hidden="true" style="position:absolute;top:3px;left:8px;right:8px;height:1px;background:rgba(255,255,255,.22);border-radius:1px;"></div>
                <div aria-hidden="true" style="position:absolute;bottom:3px;left:8px;right:8px;height:2px;background:rgba(0,0,0,.32);border-radius:1px;"></div>
                <div style="position:absolute;inset:16px;border-radius:8px;background:linear-gradient(180deg,var(--color-gold-50) 0%,var(--color-gold-100) 100%);border:1px solid rgba(146,64,14,.3);display:flex;align-items:center;justify-content:center;">
                  <span style="font-family:'Gaegu',cursive;font-size:13px;color:var(--color-wood-dark);opacity:.6;">cage interior</span>
                </div>
              </div>
            </div>
            <div class="el-spec">
              <div>
                <div class="el-label">Name</div>
                <div class="el-value" style="font-weight:700;">Cage Frame — Pet Store</div>
              </div>
              <div>
                <div class="el-label">Used In</div>
                <div class="el-value">Outer frame of each habitat cage on the Pick Your Bonded Pair screen</div>
              </div>
              <div class="el-spec-full">
                <div class="el-label">CSS</div>
                <div class="el-code">
                  background: linear-gradient(180deg, var(--color-wood-mid) 0%, var(--color-wood-dark) 50%, var(--color-wood-shadow) 100%)<br>
                  border-radius: 14px · border: 3px solid var(--color-wood-border) (selected: 3px solid {accentDark})<br>
                  grain: repeating-linear-gradient(180deg, transparent 0 18px, rgba(0,0,0,.18) 18px 19px, transparent 19px 21px, rgba(0,0,0,.10) 21px 22px, transparent 22px 38px)<br>
                  top highlight: rgba(255,255,255,.22) 1px · bottom shadow: rgba(0,0,0,.32) 2px
                </div>
              </div>
            </div>
          </div>

          <!-- Bonded Pair Slot Frame -->
          <div class="frame-card">
            <div class="frame-demo">
              <div style="position:relative;width:188px;height:128px;background:linear-gradient(180deg,var(--color-wood-amber) 0%,var(--color-wood-mid) 100%);border-radius:10px;border:3px solid var(--color-wood-border);box-shadow:0 22px 28px -8px rgba(69,26,3,.5),inset 0 2px 0 rgba(255,255,255,.2),inset 0 -3px 0 rgba(69,26,3,.3);">
                <div aria-hidden="true" style="position:absolute;inset:12px;border-radius:4px;pointer-events:none;background-image:repeating-linear-gradient(180deg,transparent 0 22px,rgba(0,0,0,.18) 22px 24px,transparent 24px 26px);"></div>
                <div aria-hidden="true" style="position:absolute;top:6px;left:6px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:inset 0 -1px 1px rgba(0,0,0,.4);"></div>
                <div aria-hidden="true" style="position:absolute;top:6px;right:6px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:inset 0 -1px 1px rgba(0,0,0,.4);"></div>
                <div aria-hidden="true" style="position:absolute;bottom:6px;left:6px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:inset 0 -1px 1px rgba(0,0,0,.4);"></div>
                <div aria-hidden="true" style="position:absolute;bottom:6px;right:6px;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:inset 0 -1px 1px rgba(0,0,0,.4);"></div>
                <div style="position:absolute;inset:22px;border-radius:6px;background:linear-gradient(180deg,var(--color-gold-50) 0%,var(--color-gold-100) 100%);display:flex;align-items:center;justify-content:center;">
                  <span style="font-family:'Gaegu',cursive;font-size:12px;color:var(--color-wood-dark);opacity:.6;">pig info</span>
                </div>
              </div>
            </div>
            <div class="el-spec">
              <div>
                <div class="el-label">Name</div>
                <div class="el-value" style="font-weight:700;">Bonded Pair Slot Frame</div>
              </div>
              <div>
                <div class="el-label">Used In</div>
                <div class="el-value">Pet Store — selected/adopted pair info slot · warmer amber tone</div>
              </div>
              <div class="el-spec-full">
                <div class="el-label">CSS</div>
                <div class="el-code">
                  background: linear-gradient(180deg, var(--color-wood-amber) 0%, var(--color-wood-mid) 100%)<br>
                  border-radius: 10px · border: 3px solid var(--color-wood-border)<br>
                  grain: repeating-linear-gradient(180deg, transparent 0 22px, rgba(0,0,0,.18) 22px 24px, transparent 24px 26px)<br>
                  4× dark brass studs: radial-gradient(circle at 30% 30%, var(--color-gold-200), var(--color-wood-border)) — darker centre than SimTopBar<br>
                  box-shadow: 0 22px 28px -8px rgba(69,26,3,.5), inset 0 2px 0 rgba(255,255,255,.2), inset 0 -3px 0 rgba(69,26,3,.3)
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Notes>
        <li>Three brown tiers: dark (<code>var(--color-wood-mid)→var(--color-wood-shadow)</code>) — beam, shelf, cage frame; medium (<code>var(--color-wood-light)→var(--color-wood-shadow)</code>) — SimTopBar plank; amber (<code>var(--color-wood-amber)→var(--color-wood-mid)</code>) — bonded pair slot + aisle plaque</li>
        <li>Grain is always an <code>aria-hidden="true" position:absolute; inset:0; pointer-events:none</code> overlay — never part of the base background shorthand</li>
        <li>Shelf bracket legs use <code>clip-path: polygon()</code> — no SVG needed</li>
        <li>Cage frame grain uses two interleaved hairlines per 20px repeat; Bonded Pair grain uses one hairline per 24px repeat — different spacing creates a distinct register</li>
      </Notes>
    </Section>

    <!-- ── PAPER ────────────────────────────────────────────────────── -->
    <Section id="paper" title="Paper" count="2 surfaces · parchment screen wash · ornate certificate">

      <div class="subsection">
        <div class="sub-title">Pick Your Bonded Pair — Parchment Wash + Paper Grain</div>
        <div class="el-demo">
          <div style="height:120px;position:relative;background:repeating-linear-gradient(0deg,rgba(146,64,14,.025) 0 1px,transparent 1px 9px),radial-gradient(ellipse at 50% 0%,var(--color-gold-50) 0%,var(--color-gold-100) 55%,#fde8b8 100%);">
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
              <span style="font-family:'Gaegu',cursive;font-size:28px;font-weight:700;color:var(--color-wood-dark);opacity:.35;">Pick your bonded pair</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Used In</div>
            <div class="el-value">PetStorePicker — full-bleed background behind the habitat cage cards (<code>.petstore</code>)</div>
          </div>
          <div>
            <div class="el-label">Source</div>
            <div class="el-value">chrome/PetStorePicker.vue · the only scrolling screen wash</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">CSS</div>
            <div class="el-code">
              background:<br>
              &nbsp;&nbsp;repeating-linear-gradient(0deg, rgba(146,64,14,.025) 0 1px, transparent 1px 9px),<br>
              &nbsp;&nbsp;radial-gradient(ellipse at 50% 0%, var(--color-gold-50) 0%, var(--color-gold-100) 55%, #fde8b8 100%)<br>
              Layer 1: horizontal paper-grain hairlines every 9px · rgba(146,64,14,.025) — near-invisible warm brown<br>
              Layer 2: radial warm bleed from top-centre · var(--color-gold-50) → var(--color-gold-100) 55% → #fde8b8 100% (literal warm gold, one notch past gold-200)
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Ornate Parchment — AdoptionCertificate only</div>
        <div style="border:3px solid var(--color-wood-border);border-radius:10px;overflow:hidden;padding:20px 32px 18px;background:repeating-linear-gradient(90deg,rgba(146,64,14,.025) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(146,64,14,.02) 0 1px,transparent 1px 7px),radial-gradient(ellipse at 50% 0%,#fffbeb 0%,#fef3c7 60%,#fde68a 100%);position:relative;margin-block-end:var(--space-3);box-shadow:0 24px 48px -12px rgba(0,0,0,.55),inset 0 0 0 1px rgba(146,64,14,.2);">
          <div aria-hidden="true" style="position:absolute;inset:10px;border:1px solid rgba(146,64,14,.35);border-radius:6px;pointer-events:none;"></div>
          <div style="text-align:center;position:relative;">
            <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--color-gold-800);font-weight:700;">— The Cuddly Cavies Adoption Bureau —</div>
            <div style="font-family:Georgia,serif;font-size:30px;font-weight:700;color:var(--color-wood-border);margin-block-start:4px;text-shadow:0 1px 0 rgba(255,255,255,.55);">Certificate <span style="font-style:italic;font-weight:400;">of</span> Adoption</div>
          </div>
        </div>
        <div class="spec-box">
          <div class="el-label" style="margin-block-end:var(--space-1);">CSS — Ornate Parchment</div>
          <div class="el-code">
            background:<br>
            &nbsp;&nbsp;repeating-linear-gradient(90deg, rgba(146,64,14,.025) 0 1px, transparent 1px 5px),<br>
            &nbsp;&nbsp;repeating-linear-gradient(0deg, rgba(146,64,14,.02) 0 1px, transparent 1px 7px),<br>
            &nbsp;&nbsp;radial-gradient(ellipse at 50% 0%, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)<br>
            border: 3px solid #451a03 (var(--color-wood-border)) · border-radius: 10px<br>
            box-shadow: 0 24px 48px -12px rgba(0,0,0,.55), inset 0 0 0 1px rgba(146,64,14,.2)<br>
            inner hairline: position:absolute; inset:10px; border: 1px solid rgba(146,64,14,.35); border-radius: 6px<br>
            corner flourishes: 4× rotated 42px SVG (stroke #451a03 1.6px + #b45309 dot) at 18px inset
          </div>
        </div>
      </div>

      <Notes>
        <li>The certificate uses a dual cross-grain (<code>90deg</code> 1px/5px @ .025 + <code>0deg</code> 1px/7px @ .02) over the radial wash; the picker screen uses a single horizontal grain (<code>0deg</code> 1px/9px). Same parchment palette, different texture density.</li>
        <li>The reusable <code>.parchment-panel</code> (inventory, dropdowns, banners) is a flat linear wash <code>var(--panel-bg-top)→var(--panel-bg-bot)</code> with an optional <code>--panel-grain</code> overlay — documented under Awnings / Hardware since its identity is the awning strip + studs.</li>
        <li>The Supplies Store screen is not parchment — it renders on a plain sky-blue ground, so it is intentionally omitted here.</li>
      </Notes>
    </Section>

    <!-- ── AWNINGS ──────────────────────────────────────────────────── -->
    <Section id="awnings" title="Awnings" count="2 strips · ParchmentPanel header · FabPlaque button cap">

      <div class="subsection">
        <div class="sub-title">Panel Header Strip — ParchmentPanel</div>
        <div class="el-demo">
          <div style="position:relative;background:linear-gradient(180deg,var(--panel-bg-top) 0%,var(--panel-bg-bot) 100%);border:4px solid var(--panel-border);border-radius:14px;overflow:hidden;color:var(--color-wood-border);">
            <div aria-hidden="true" style="height:14px;background:repeating-linear-gradient(90deg,var(--color-gold) 0 14px,var(--color-gold-50) 14px 28px);border-block-end:2px solid var(--panel-border);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.18);"></div>
            <span aria-hidden="true" style="position:absolute;top:5px;left:5px;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
            <span aria-hidden="true" style="position:absolute;top:5px;right:5px;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
            <span aria-hidden="true" style="position:absolute;bottom:5px;left:5px;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
            <span aria-hidden="true" style="position:absolute;bottom:5px;right:5px;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
            <div aria-hidden="true" style="position:absolute;left:0;right:0;top:14px;height:52px;background:linear-gradient(180deg,rgba(255,255,255,.42) 0%,transparent 100%);pointer-events:none;"></div>
            <div style="position:relative;padding:14px;">
              <div style="height:48px;border-radius:6px;background:repeating-linear-gradient(135deg,var(--color-gold-100) 0 8px,var(--color-gold-200) 8px 9px,var(--color-gold-100) 9px 17px);border:1.5px dashed var(--color-wood-amber);display:flex;align-items:center;justify-content:center;">
                <span style="font-family:var(--font-family-mono);font-size:10px;color:var(--color-wood-dark);opacity:.7;">panel body</span>
              </div>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Used In</div>
            <div class="el-value">Every ParchmentPanel — inventory, habitat status, activity feed, pill dropdowns, banners</div>
          </div>
          <div>
            <div class="el-label">Dimensions</div>
            <div class="el-value">14px tall strip · stripe unit 28px (14px accent + 14px gold-50) · border-block-end 2px</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">CSS</div>
            <div class="el-code">
              .parchment-panel__awning {<br>
              &nbsp;&nbsp;block-size: 14px;<br>
              &nbsp;&nbsp;background: repeating-linear-gradient(90deg, var(--accent, var(--color-gold)) 0 14px, var(--color-gold-50) 14px 28px);<br>
              &nbsp;&nbsp;border-block-end: 2px solid var(--panel-border);<br>
              &nbsp;&nbsp;box-shadow: inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18);<br>
              }<br>
              + 4× corner studs (7px, radial-gradient var(--color-gold-200)→var(--color-wood-border), var(--shadow-rivet)) · top sheen gradient
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">FAB Plaque Strip — bottom action buttons</div>
        <div class="el-demo">
          <div style="background:var(--color-gold-50);padding:24px;display:flex;justify-content:center;">
            <div style="position:relative;height:56px;width:120px;border-radius:12px;border:3px solid var(--color-wood-dark);background:linear-gradient(180deg,var(--color-gold-100) 0%,var(--color-gold-200) 100%);overflow:hidden;box-shadow:0 12px 16px -4px rgba(69,26,3,.5),0 5px 8px -2px rgba(69,26,3,.35),inset 0 2px 0 rgba(255,255,255,.55),inset 0 -2px 0 rgba(146,64,14,.3);">
              <span aria-hidden="true" style="position:absolute;left:50%;top:-10px;width:10px;height:10px;border-radius:50%;transform:translateX(-50%);background:radial-gradient(circle at 30% 30%,var(--color-gold-200) 0%,var(--color-wood-mid) 60%,var(--color-wood-border) 100%);box-shadow:0 2px 3px rgba(0,0,0,.35),inset 0 -1px 1px rgba(0,0,0,.3);z-index:2;"></span>
              <span aria-hidden="true" style="position:absolute;left:0;right:0;top:0;height:12px;background:repeating-linear-gradient(90deg,var(--color-pink) 0 10px,var(--color-gold-50) 10px 20px);border-block-end:2px solid var(--color-wood-dark);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.18);"></span>
              <span aria-hidden="true" style="position:absolute;top:3px;left:5px;width:5px;height:5px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);z-index:2;"></span>
              <span aria-hidden="true" style="position:absolute;top:3px;right:5px;width:5px;height:5px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);z-index:2;"></span>
              <span aria-hidden="true" style="position:absolute;bottom:3px;left:5px;width:5px;height:5px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);z-index:2;"></span>
              <span aria-hidden="true" style="position:absolute;bottom:3px;right:5px;width:5px;height:5px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);z-index:2;"></span>
              <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:10px;height:100%;padding:6px 16px 0;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-pink),var(--color-pink-700));border:2px solid var(--color-pink-700);font-size:20px;line-height:1;box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);">🍎</span>
                <span style="font-family:'Gaegu',cursive;font-weight:700;color:var(--color-gold-800);line-height:.875;">Feed</span>
              </div>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Used In</div>
            <div class="el-value">FabPlaque — bottom-center wooden action rail (Feed, Play, Care, etc.)</div>
          </div>
          <div>
            <div class="el-label">Dimensions</div>
            <div class="el-value">12px tall strip · stripe unit 20px (10px theme + 10px gold-50) · 5px studs · 10px hanging peg</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">CSS</div>
            <div class="el-code">
              .fab-plaque__awning {<br>
              &nbsp;&nbsp;block-size: 12px;<br>
              &nbsp;&nbsp;background: repeating-linear-gradient(90deg, var(--fab-stripe) 0 10px, var(--color-gold-50) 10px 20px);<br>
              &nbsp;&nbsp;border-block-end: 2px solid var(--color-wood-dark);<br>
              &nbsp;&nbsp;box-shadow: inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18);<br>
              }<br>
              --fab-stripe driven by FAB theme (see table) · plaque tilts via --tilt with transform-origin 50% -8px (hangs from peg)
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Accent Colors</div>
        <table class="de-table">
          <thead><tr><th>Context</th><th>Accent token</th><th>Hex</th><th style="width:120px;">Stripe</th></tr></thead>
          <tbody>
            <tr class="de-table__group"><td colspan="4">ParchmentPanel header accents (—accent)</td></tr>
            <tr><td>Activity feed · default</td><td><code>--color-gold</code></td><td><code>#fbbf24</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-gold) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr><td>Habitat status</td><td><code>--color-ivy</code></td><td><code>#84cc16</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-ivy) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr><td>Inventory</td><td><code>--color-violet</code></td><td><code>#a78bfa</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-violet) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr class="de-table__group"><td colspan="4">Store department pills (StoreView) · accent + accentDeep</td></tr>
            <tr><td>Hay Loft</td><td><code>--color-lime</code></td><td><code>#4ade80</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-lime) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr><td>Grocery</td><td><code>--color-pink</code></td><td><code>#ec4899</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-pink) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr><td>Bedding</td><td><code>--color-violet-mid</code></td><td><code>#8b5cf6</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-violet-mid) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr><td>Habitat</td><td><code>--color-sky</code></td><td><code>#06b6d4</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-sky) 0 14px,var(--color-gold-50) 14px 28px);"></div></td></tr>
            <tr class="de-table__group"><td colspan="4">FAB plaque themes (--fab-stripe · fabThemes.ts)</td></tr>
            <tr><td>pink</td><td><code>--color-pink</code></td><td><code>#ec4899</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-pink) 0 10px,var(--color-gold-50) 10px 20px);"></div></td></tr>
            <tr><td>green</td><td><code>--color-ivy</code></td><td><code>#84cc16</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-ivy) 0 10px,var(--color-gold-50) 10px 20px);"></div></td></tr>
            <tr><td>violet</td><td><code>--color-violet</code></td><td><code>#a78bfa</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-violet) 0 10px,var(--color-gold-50) 10px 20px);"></div></td></tr>
            <tr><td>orange</td><td><code>#fb923c</code></td><td><code>#fb923c</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,#fb923c 0 10px,var(--color-gold-50) 10px 20px);"></div></td></tr>
            <tr><td>cyan</td><td><code>--color-cyan</code></td><td><code>#22d3ee</code></td><td><div class="de-swatch" style="background:repeating-linear-gradient(90deg,var(--color-cyan) 0 10px,var(--color-gold-50) 10px 20px);"></div></td></tr>
          </tbody>
        </table>
      </div>

      <Notes>
        <li>Two stripe scales: ParchmentPanel uses a <code>14px</code> unit, FabPlaque a tighter <code>10px</code> unit. Both alternate the accent with <code>var(--color-gold-50)</code>, not white.</li>
        <li>Both always carry <code>border-block-end: 2px solid</code> (panel-border or wood-dark) + the same inset highlight/shadow pair <code>inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18)</code>.</li>
        <li>gps3 has no scalloped storefront awning — the striped strip is the only awning motif in the app.</li>
      </Notes>
    </Section>

    <!-- ── SIGNS ────────────────────────────────────────────────────── -->
    <Section id="signs" title="Signs" count="2 forms · white hutch plate · cream sign pill">

      <div class="subsection">
        <div class="sub-title">Hutch Plate — pig info card (PetStorePicker)</div>
        <div class="el-demo">
          <div style="background:var(--color-gold-50);padding:24px;display:flex;justify-content:center;">
            <div style="background:#fff;border:2px solid var(--color-wood-border);border-radius:6px;padding:6px 8px 8px;box-shadow:0 2px 4px rgba(0,0,0,.15);min-width:160px;">
              <div style="display:flex;align-items:baseline;justify-content:space-between;gap:6px;">
                <span style="font-family:'Gaegu',cursive;font-size:18px;font-weight:700;color:var(--color-gold-800);">Nutmeg</span>
                <span style="font-size:12px;font-weight:700;color:var(--color-wood-dark);">♀</span>
              </div>
              <div style="font-size:11px;font-weight:600;color:var(--color-neutral-600);">Abyssinian</div>
              <div style="display:flex;gap:4px;margin-block-start:4px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#c9803f;border:2px solid #fff;box-shadow:0 0 0 1px var(--color-wood-border);"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#f5f5f0;border:2px solid #fff;box-shadow:0 0 0 1px var(--color-wood-border);"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Used In</div>
            <div class="el-value">PetStorePicker — white card beneath each pig in a habitat (name · gender · breed · coat swatches)</div>
          </div>
          <div>
            <div class="el-label">Dimensions</div>
            <div class="el-value">border: 2px solid var(--color-wood-border) · border-radius: 6px · padding: 6px 8px 8px · no rivets · no rotation</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">CSS</div>
            <div class="el-code">
              card: background #fff · border 2px solid var(--color-wood-border) · border-radius 6px · box-shadow 0 2px 4px rgba(0,0,0,.15)<br>
              name: 'Gaegu' 700 · 1.125rem · var(--color-gold-800) · gender: 0.75rem 700 var(--color-wood-dark) · justified to opposite ends<br>
              breed: 0.6875rem 600 · var(--color-neutral-600)<br>
              coat swatch: 12px circle · border 2px solid #fff · box-shadow 0 0 0 1px var(--color-wood-border)
            </div>
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Sign Pill — cream signboard trigger</div>
        <div class="el-demo">
          <div style="background:var(--color-gold-50);padding:24px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <div style="position:relative;display:inline-flex;align-items:center;gap:8px;height:42px;padding-inline:14px;border-radius:10px;border:3px solid var(--color-wood-dark);background:linear-gradient(180deg,var(--panel-bg-top) 0%,var(--panel-bg-bot) 100%);color:var(--color-wood-border);font-family:'Nunito',sans-serif;font-weight:700;font-size:14px;box-shadow:var(--shadow-pill);transform:rotate(-1deg);">
              <span aria-hidden="true" style="position:absolute;top:3px;left:4px;width:4px;height:4px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
              <span aria-hidden="true" style="position:absolute;top:3px;right:4px;width:4px;height:4px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
              <span aria-hidden="true" style="position:absolute;bottom:3px;left:4px;width:4px;height:4px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
              <span aria-hidden="true" style="position:absolute;bottom:3px;right:4px;width:4px;height:4px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></span>
              <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-violet),var(--color-violet-deep));border:2px solid var(--color-violet-deep);font-size:15px;line-height:1;box-shadow:var(--shadow-disc);">🎒</span>
              <span style="color:var(--color-gold-800);">Inventory</span>
              <span aria-hidden="true" style="font-size:9px;color:var(--color-wood-dark);opacity:.7;margin-inline-start:-2px;">▾</span>
            </div>
          </div>
        </div>
        <div class="el-spec">
          <div>
            <div class="el-label">Used In</div>
            <div class="el-value">SimTopBar pills — Activity, Habitat, Inventory, per-pig drawer triggers</div>
          </div>
          <div>
            <div class="el-label">Dimensions</div>
            <div class="el-value">height: 42px · padding-inline: 14px · border: 3px solid var(--color-wood-dark) · border-radius: 10px</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">CSS</div>
            <div class="el-code">
              background: linear-gradient(180deg, var(--panel-bg-top) 0%, var(--panel-bg-bot) 100%) · box-shadow: var(--shadow-pill)<br>
              transform: rotate(var(--tilt, 0deg)) · active: border-color var(--accent-deep) + translateY(-2px) + var(--shadow-pill-active)<br>
              4× rivets (4px, radial var(--color-gold-200)→var(--color-wood-border), var(--shadow-rivet)) at 3px/4px insets<br>
              leading icon disc (26px) + label var(--color-gold-800) + ▾ caret
            </div>
          </div>
        </div>
      </div>

      <Notes>
        <li>Two distinct registers: the <strong>hutch plate</strong> is a flat printed-white card (no rivets, no tilt) read against parchment; the <strong>sign pill</strong> is a cream signboard button with 4 rivets and a slight tilt.</li>
        <li>The hutch plate border is <code>--color-wood-border</code> (darkest) to stay legible on white; the sign pill border is <code>--color-wood-dark</code> against its cream gradient.</li>
        <li>gps3 has no rotated "item label" or separate "pig nameplate" sign — the hutch plate is the single pig-info card.</li>
      </Notes>
    </Section>

    <!-- ── HARDWARE ─────────────────────────────────────────────────── -->
    <Section id="hardware" title="Hardware" count="4 elements · brass rivets · plaque peg · wax seal">

      <div class="hw-grid">

        <div class="hw-card">
          <div class="hw-demo">
            <div style="display:flex;gap:14px;align-items:center;">
              <div style="width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);box-shadow:0 1px 2px rgba(0,0,0,.4);"></div>
              <div style="width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),#1c1917);box-shadow:0 1px 2px rgba(0,0,0,.4);"></div>
              <span style="font-family:var(--font-family-mono);font-size:10px;color:var(--color-wood-dark);">#1c1917</span>
            </div>
          </div>
          <div class="hw-info">
            <div class="hw-name">Brass Rivet — Light</div>
            <div class="hw-use">SimTopBar wood bar end-caps · 8px</div>
            <div class="hw-css">background: radial-gradient(circle at 30% 30%, var(--color-gold-200), #1c1917)<br>size: 8px · border-radius: 50%</div>
          </div>
        </div>

        <div class="hw-card">
          <div class="hw-demo">
            <div style="display:flex;gap:14px;align-items:center;">
              <div style="width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></div>
              <div style="width:5px;height:5px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200),var(--color-wood-border));box-shadow:var(--shadow-rivet);"></div>
              <span style="font-family:var(--font-family-mono);font-size:10px;color:var(--color-wood-dark);">var(--color-wood-border)</span>
            </div>
          </div>
          <div class="hw-info">
            <div class="hw-name">Brass Rivet — Dark</div>
            <div class="hw-use">Parchment panel studs (7px) · sign pill (4px) · FAB plaque (5px)</div>
            <div class="hw-css">background: radial-gradient(circle at 30% 30%, var(--color-gold-200), var(--color-wood-border))<br>box-shadow: var(--shadow-rivet) — inset 0 -1px 1px rgba(0,0,0,.42)</div>
          </div>
        </div>

        <div class="hw-card">
          <div class="hw-demo">
            <div style="width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 30% 30%,var(--color-gold-200) 0%,var(--color-wood-mid) 60%,var(--color-wood-border) 100%);box-shadow:0 2px 3px rgba(0,0,0,.35),inset 0 -1px 1px rgba(0,0,0,.3);"></div>
          </div>
          <div class="hw-info">
            <div class="hw-name">Plaque Peg</div>
            <div class="hw-use">FabPlaque — wooden peg the button hangs from · 10px · top-center</div>
            <div class="hw-css">background: radial-gradient(circle at 30% 30%, var(--color-gold-200) 0%, var(--color-wood-mid) 60%, var(--color-wood-border) 100%)<br>box-shadow: 0 2px 3px rgba(0,0,0,.35), inset 0 -1px 1px rgba(0,0,0,.3)</div>
          </div>
        </div>

        <div class="hw-card">
          <div class="hw-demo">
            <div style="width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f59e0b 0%,#b91c1c 55%,#7f1d1d 100%);border:2px solid #450a0a;box-shadow:inset 0 -5px 8px rgba(0,0,0,.4),0 5px 8px rgba(69,26,3,.35);display:flex;align-items:center;justify-content:center;transform:rotate(-8deg);">
              <div style="width:54px;height:54px;border-radius:50%;border:1.5px dashed rgba(255,255,255,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fef3c7;font-family:Georgia,serif;text-shadow:0 1px 1px rgba(0,0,0,.5);">
                <div style="font-size:16px;line-height:1;">🐾</div>
                <div style="font-size:6px;letter-spacing:.16em;font-weight:800;margin-block-start:1px;">OFFICIAL</div>
                <div style="font-size:6px;letter-spacing:.16em;font-weight:800;">SEAL</div>
              </div>
            </div>
          </div>
          <div class="hw-info">
            <div class="hw-name">Wax Seal</div>
            <div class="hw-use">AdoptionCertificate only · 72px · bottom-right · rotate(-8deg)</div>
            <div class="hw-css">bg: radial-gradient(circle at 35% 30%, #f59e0b 0%, #b91c1c 55%, #7f1d1d 100%)<br>border: 2px solid #450a0a · inner: 60px 1.5px dashed rgba(255,255,255,.55)<br>shadow: inset 0 -5px 8px rgba(0,0,0,.4), 0 5px 8px rgba(69,26,3,.35)</div>
          </div>
        </div>

      </div>

      <Notes>
        <li>Two rivet families: <strong>light</strong> (<code>var(--color-gold-200)→#1c1917</code>) reads as brass against the dark SimTopBar wood; <strong>dark</strong> (<code>var(--color-gold-200)→var(--color-wood-border)</code>) reads as iron on cream parchment frames.</li>
        <li>All dark rivets/studs share <code>var(--shadow-rivet)</code> (<code>inset 0 -1px 1px rgba(0,0,0,.42)</code>); only the size changes (4 / 5 / 7px).</li>
        <li>The plaque peg adds a 3-stop gradient (gold-200 → wood-mid → wood-border) so it reads as a rounded wooden dowel rather than a flat stud.</li>
        <li>The wax seal is exclusive to AdoptionCertificate.vue. gps3 has no "OPEN" hanging sign and no aisle plaque component (the aisle-plaque token comment is unused).</li>
      </Notes>
    </Section>

    <!-- ── DECORATIONS ──────────────────────────────────────────────── -->
    <Section id="decorations" title="Decorations" count="inline SVG · window + room scenery · PetStoreBackdrop">

      <div class="subsection">
        <div class="sub-title">Window — assembled (framed, 2×2 mullion)</div>
        <div class="el-demo">
          <div style="background:var(--color-gold-50);padding:20px;display:flex;justify-content:center;">
            <svg viewBox="0 0 220 240" width="180" height="196" aria-hidden="true" style="display:block;">
              <rect x="6" y="6" width="208" height="228" rx="6" fill="#fff7e6" stroke="#92400e" stroke-width="6" />
              <rect x="0" y="222" width="220" height="14" rx="3" fill="#92400e" />
              <rect x="18" y="18" width="88" height="98" fill="#bfe2f4" />
              <rect x="114" y="18" width="88" height="98" fill="#bfe2f4" />
              <rect x="18" y="124" width="88" height="98" fill="#a9d6ec" />
              <rect x="114" y="124" width="88" height="98" fill="#a9d6ec" />
              <rect x="104" y="14" width="12" height="212" fill="#fff7e6" stroke="#92400e" stroke-width="3" />
              <rect x="14" y="116" width="192" height="10" fill="#fff7e6" stroke="#92400e" stroke-width="3" />
              <ellipse cx="46" cy="46" rx="18" ry="7" fill="#fff" opacity=".9" />
              <ellipse cx="58" cy="42" rx="12" ry="6" fill="#fff" opacity=".9" />
              <ellipse cx="156" cy="62" rx="20" ry="8" fill="#fff" opacity=".9" />
              <path d="M150 38 q5 -5 10 0 q5 -5 10 0" stroke="#5a7385" stroke-width="2" fill="none" />
              <circle cx="180" cy="40" r="14" fill="#ffd97a" opacity=".7" />
            </svg>
          </div>
        </div>
        <div class="spec-box" style="margin-block-end:var(--space-6);">
          <div class="el-label" style="margin-block-end:var(--space-1);">Usage — PetStoreBackdrop window</div>
          <div class="el-code">
            viewBox="0 0 220 240" · positioned top-left (-30px), opacity .55, rotate(-2deg)<br>
            frame: rect rx="6" fill="#fff7e6" stroke="#92400e" stroke-width="6" + sill rect fill="#92400e"<br>
            sky panes: top #bfe2f4 / bottom #a9d6ec · mullions: 12px vertical + 10px horizontal (cross divider)<br>
            clouds: paired #fff ellipses opacity .9 · sun: circle r="14" #ffd97a opacity .7 · bird: q-curve path stroke #5a7385
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Window elements — clouds, sun, bird</div>
        <div class="hw-grid">

          <div class="hw-card">
            <div class="hw-demo" style="background:#bfe2f4;">
              <svg viewBox="0 0 200 70" width="180" height="63" aria-hidden="true">
                <ellipse cx="62" cy="40" rx="30" ry="11" fill="#fff" opacity=".9" />
                <ellipse cx="82" cy="32" rx="20" ry="10" fill="#fff" opacity=".9" />
                <ellipse cx="150" cy="46" rx="34" ry="13" fill="#fff" opacity=".9" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Clouds</div>
              <div class="hw-use">Window sky panes · 2–3 overlapping ellipses</div>
              <div class="hw-css">ellipse pairs · fill="#fff" opacity=".9"<br>e.g. rx≈18/12 base+cap · larger isolated rx≈20</div>
            </div>
          </div>

          <div class="hw-card">
            <div class="hw-demo" style="background:#bfe2f4;">
              <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
                <circle cx="40" cy="40" r="20" fill="#ffd97a" opacity=".7" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Sun</div>
              <div class="hw-use">Window · top-right of sky pane</div>
              <div class="hw-css">circle r="14" fill="#ffd97a" opacity=".7"<br>(no halo ring in gps3)</div>
            </div>
          </div>

          <div class="hw-card">
            <div class="hw-demo" style="background:#bfe2f4;">
              <svg viewBox="0 0 120 60" width="120" height="60" aria-hidden="true">
                <path d="M30 34 q9 -9 18 0 q9 -9 18 0" stroke="#5a7385" stroke-width="2.5" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Bird</div>
              <div class="hw-use">Window · single gull near the sun</div>
              <div class="hw-css">path d="M150 38 q5 -5 10 0 q5 -5 10 0"<br>stroke="#5a7385" stroke-width="2" fill="none"</div>
            </div>
          </div>

        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Room — interior scenery (PetStoreBackdrop)</div>
        <div class="hw-grid">

          <div class="hw-card">
            <div class="hw-demo" style="background:var(--color-gold-50);height:130px;">
              <svg viewBox="0 0 120 160" width="80" height="107" aria-hidden="true">
                <g transform="translate(60 78)">
                  <ellipse cx="-22" cy="-30" rx="14" ry="34" fill="#5b8c3e" transform="rotate(-30 -22 -30)" opacity=".95" />
                  <ellipse cx="22" cy="-32" rx="14" ry="36" fill="#6ba348" transform="rotate(28 22 -32)" opacity=".95" />
                  <ellipse cx="-6" cy="-38" rx="13" ry="40" fill="#7cb854" opacity=".95" />
                  <ellipse cx="12" cy="-40" rx="11" ry="34" fill="#8ec964" transform="rotate(14 12 -40)" opacity=".95" />
                  <ellipse cx="-14" cy="-20" rx="10" ry="22" fill="#4f7a36" transform="rotate(-50 -14 -20)" opacity=".9" />
                </g>
                <path d="M16 80 L104 80 L100 90 L20 90 Z" fill="#c97b4d" />
                <path d="M22 90 L98 90 L92 148 L28 148 Z" fill="#b46339" />
                <path d="M28 92 Q34 100 32 144" stroke="#d99064" stroke-width="3" fill="none" opacity=".7" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Potted Plant</div>
              <div class="hw-use">×2 · mid-left rotate(-3deg) + bottom-right rotate(5deg) scale(.78)</div>
              <div class="hw-css">5 frond ellipses #5b8c3e/#6ba348/#7cb854/#8ec964/#4f7a36<br>pot: rim #c97b4d · body #b46339 + L→R white→black gradient<br>highlight stroke #d99064</div>
            </div>
          </div>

          <div class="hw-card">
            <div class="hw-demo" style="background:var(--color-gold-50);height:130px;">
              <svg viewBox="0 0 120 180" width="72" height="108" aria-hidden="true">
                <rect x="20" y="20" width="10" height="148" fill="#8b5a2b" rx="2" />
                <rect x="90" y="20" width="10" height="148" fill="#8b5a2b" rx="2" />
                <rect x="14" y="92" width="9" height="76" fill="#a06b34" rx="2" />
                <rect x="97" y="92" width="9" height="76" fill="#a06b34" rx="2" />
                <rect x="10" y="78" width="100" height="14" fill="#a87445" rx="2" />
                <rect x="30" y="28" width="60" height="6" fill="#a87445" rx="2" />
                <rect x="30" y="42" width="60" height="6" fill="#a87445" rx="2" />
                <rect x="30" y="56" width="60" height="6" fill="#a87445" rx="2" />
                <rect x="14" y="130" width="92" height="6" fill="#8b5a2b" rx="2" />
                <ellipse cx="60" cy="78" rx="48" ry="6" fill="#e6b07d" opacity=".6" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Chair</div>
              <div class="hw-use">mid-right · opacity .55 · no rotation</div>
              <div class="hw-css">back posts 10×148 #8b5a2b · front legs 9×76 #a06b34<br>seat + 3 slats #a87445 + vertical white→black gradient<br>seat highlight ellipse #e6b07d opacity .6</div>
            </div>
          </div>

          <div class="hw-card">
            <div class="hw-demo" style="background:var(--color-gold-50);height:130px;">
              <svg viewBox="0 0 200 170" width="120" height="102" aria-hidden="true">
                <defs>
                  <linearGradient id="de-treats-front" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#c79b6a" />
                    <stop offset="100%" stop-color="#9a6c43" />
                  </linearGradient>
                  <linearGradient id="de-treats-side" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#a87a4f" />
                    <stop offset="100%" stop-color="#754f2e" />
                  </linearGradient>
                  <clipPath id="de-treats-clip">
                    <path d="M-200,-200 L400,-200 L400,45 L185,45 L170,60 L30,60 L45,45 L-200,45 Z" />
                  </clipPath>
                </defs>
                <path d="M30,60 L170,60 L185,45 L45,45 Z" fill="#3d2410" />
                <path d="M30,60 L170,60 L177,52 L37,52 Z" fill="#52331a" opacity=".7" />
                <g clip-path="url(#de-treats-clip)">
                  <g transform="translate(112 22) rotate(8)">
                    <rect x="0" y="0" width="40" height="34" fill="#e3c17a" rx="2" />
                    <line x1="2" y1="6" x2="38" y2="6" stroke="#b89546" stroke-width="1" />
                    <line x1="2" y1="14" x2="38" y2="14" stroke="#b89546" stroke-width="1" />
                    <line x1="2" y1="22" x2="38" y2="22" stroke="#b89546" stroke-width="1" />
                    <line x1="2" y1="30" x2="38" y2="30" stroke="#b89546" stroke-width="1" />
                  </g>
                  <rect x="50" y="14" width="6" height="50" fill="#a87445" transform="rotate(-14 53 39)" />
                  <rect x="60" y="10" width="6" height="52" fill="#bd8a55" transform="rotate(-6 63 36)" />
                  <circle cx="44" cy="52" r="11" fill="#d94a4a" />
                  <path d="M44 41 q2 -6 6 -6" stroke="#5b8c3e" stroke-width="2" fill="none" />
                </g>
                <path d="M170,60 L185,45 L185,135 L170,150 Z" fill="url(#de-treats-side)" />
                <path d="M30,60 L170,60 L170,150 L30,150 Z" fill="url(#de-treats-front)" />
                <path d="M30,60 L170,60" stroke="#e3c08a" stroke-width="2.5" fill="none" />
                <g transform="translate(58 100) rotate(-4)">
                  <rect x="0" y="0" width="80" height="22" fill="#fff7e6" stroke="#92400e" stroke-width="2" rx="2" />
                  <text x="40" y="16" text-anchor="middle" font-family="'Gaegu', cursive" font-size="14" font-weight="700" fill="#92400e">TREATS</text>
                </g>
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Treats Box</div>
              <div class="hw-use">bottom-left · rotate(-5deg) · opacity .6</div>
              <div class="hw-css">oblique box: front #c79b6a→#9a6c43 · side #a87a4f→#754f2e<br>clipPath masks biscuits / sticks / apple to above the rim<br>label: cream sign #fff7e6, #92400e border, Gaegu 'TREATS' rotate(-4)</div>
            </div>
          </div>

          <div class="hw-card">
            <div class="hw-demo" style="background:var(--color-gold-50);height:130px;">
              <svg viewBox="0 0 280 180" width="190" height="122" aria-hidden="true">
                <rect x="0" y="148" width="280" height="10" fill="#92400e" />
                <rect x="0" y="158" width="280" height="4" fill="#5c2a0a" />
                <g transform="translate(10 60)">
                  <rect x="0" y="0" width="80" height="88" fill="#fde8b8" stroke="#92400e" stroke-width="3" rx="4" />
                  <line x1="12" y1="4" x2="12" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="24" y1="4" x2="24" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="36" y1="4" x2="36" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="48" y1="4" x2="48" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="60" y1="4" x2="60" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="72" y1="4" x2="72" y2="84" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <rect x="3" y="74" width="74" height="12" fill="#e9c878" rx="2" />
                  <rect x="58" y="14" width="6" height="22" fill="#a9d6ec" stroke="#3a5a72" stroke-width="1" rx="1" />
                </g>
                <g transform="translate(100 50)">
                  <rect x="0" y="0" width="80" height="98" fill="#fbcfe8" stroke="#92400e" stroke-width="3" rx="4" />
                  <line x1="12" y1="4" x2="12" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="24" y1="4" x2="24" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="36" y1="4" x2="36" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="48" y1="4" x2="48" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="60" y1="4" x2="60" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="72" y1="4" x2="72" y2="94" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <rect x="3" y="84" width="74" height="12" fill="#e9c878" rx="2" />
                  <path d="M28 84 q12 -16 24 0 Z" fill="#fff" stroke="#92400e" stroke-width="1.5" />
                </g>
                <g transform="translate(190 64)">
                  <rect x="0" y="0" width="80" height="84" fill="#bbf7d0" stroke="#92400e" stroke-width="3" rx="4" />
                  <line x1="12" y1="4" x2="12" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="24" y1="4" x2="24" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="36" y1="4" x2="36" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="48" y1="4" x2="48" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="60" y1="4" x2="60" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <line x1="72" y1="4" x2="72" y2="80" stroke="#92400e" stroke-width="1.5" opacity=".7" />
                  <rect x="3" y="70" width="74" height="12" fill="#e9c878" rx="2" />
                  <ellipse cx="40" cy="74" rx="14" ry="5" fill="#c4a55a" />
                </g>
                <path d="M14 158 L14 174 L24 174" stroke="#5c2a0a" stroke-width="3" fill="none" />
                <path d="M266 158 L266 174 L256 174" stroke="#5c2a0a" stroke-width="3" fill="none" />
              </svg>
            </div>
            <div class="hw-info">
              <div class="hw-name">Habitats</div>
              <div class="hw-use">top-right shelf of 3 starter cages · rotate(1.5deg) · opacity .5</div>
              <div class="hw-css">cage tints #fde8b8 / #fbcfe8 / #bbf7d0 · stroke #92400e rx="4"<br>6 vertical bars opacity .7 · bedding #e9c878<br>props: water bottle · igloo · food bowl · shelf #92400e + #5c2a0a brackets</div>
            </div>
          </div>

        </div>
      </div>

      <Notes>
        <li>All scenery is inline SVG in <code>PetStoreBackdrop.vue</code> — no external assets. The layer is full-bleed (<code>100vw</code>, centred) with <code>pointer-events:none; z-index:0; aria-hidden="true"</code>, sitting behind the cage cards.</li>
        <li>Each slot is desaturated via low opacity (window .55 · plant .6 · chair .55 · treats .6 · habitats .5) so it never competes with foreground content.</li>
        <li>The treats box uses a <code>clipPath</code> so the box walls occlude the biscuits/sticks/apple; the two plants share one SVG with per-instance gradient ids.</li>
        <li>gps3's window is the framed 220×240 form with a 2×2 mullion grid — there is no panoramic storefront window.</li>
      </Notes>
    </Section>

    <!-- ── STICKERS ─────────────────────────────────────────────────── -->
    <Section id="stickers" title="Stickers" count="glossy icon disc · 3 sizes · FAB · sign pill · portrait">

      <div class="subsection">
        <div class="sub-title">FAB Disc — 34px · 5 themes</div>
        <div class="sticker-board" style="margin-block-end:var(--space-5);">
          <div class="sticker-grid">
            <div class="sticker-cell">
              <div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-pink),var(--color-pink-700));border:2px solid var(--color-pink-700);box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">🍎</div>
              <div><div class="sticker-cell-name">pink</div><div class="sticker-cell-token">--color-pink</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-ivy),var(--color-green));border:2px solid var(--color-green);box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">🏠</div>
              <div><div class="sticker-cell-name">green</div><div class="sticker-cell-token">--color-ivy</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-violet),var(--color-violet-deep));border:2px solid var(--color-violet-deep);box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">🎒</div>
              <div><div class="sticker-cell-name">violet</div><div class="sticker-cell-token">--color-violet</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fb923c,var(--color-orange));border:2px solid var(--color-orange);box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">😊</div>
              <div><div class="sticker-cell-name">orange</div><div class="sticker-cell-token">#fb923c</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-cyan),var(--color-cyan-600));border:2px solid var(--color-cyan-600);box-shadow:0 3px 5px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">💧</div>
              <div><div class="sticker-cell-name">cyan</div><div class="sticker-cell-token">--color-cyan</div></div>
            </div>
          </div>
        </div>
        <div class="spec-box">
          <div class="el-label" style="margin-block-end:var(--space-1);">CSS — .fab-plaque__disc</div>
          <div class="el-code">
            inline-size: 34px; block-size: 34px; font-size: 20px; border-radius: 50%<br>
            background: radial-gradient(circle at 35% 30%, var(--fab-stripe), var(--fab-deep))<br>
            border: 2px solid var(--fab-deep)<br>
            box-shadow: 0 3px 5px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(0,0,0,.2)<br>
            themes (fabThemes.ts): pink · green(ivy) · violet · orange(#fb923c) · cyan
          </div>
        </div>
      </div>

      <div class="subsection">
        <div class="sub-title">Sign Pill Disc — 26px · accent variants</div>
        <div class="sticker-board" style="margin-block-end:var(--space-5);">
          <div class="sticker-grid">
            <div class="sticker-cell">
              <div style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-gold),var(--color-wood-amber));border:2px solid var(--color-wood-amber);box-shadow:var(--shadow-disc);display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1;">📓</div>
              <div><div class="sticker-cell-name">Activity</div><div class="sticker-cell-token">gold → wood-amber</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-ivy),var(--color-green));border:2px solid var(--color-green);box-shadow:var(--shadow-disc);display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1;">🏠</div>
              <div><div class="sticker-cell-name">Habitat</div><div class="sticker-cell-token">ivy → green</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-violet),var(--color-violet-deep));border:2px solid var(--color-violet-deep);box-shadow:var(--shadow-disc);display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1;">🎒</div>
              <div><div class="sticker-cell-name">Inventory</div><div class="sticker-cell-token">violet → violet-deep</div></div>
            </div>
            <div class="sticker-cell">
              <div style="width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--color-gold-100),var(--color-gold-300));border:2px solid var(--color-wood-dark);box-shadow:var(--shadow-disc);display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1;">🐹</div>
              <div><div class="sticker-cell-name">Pig portrait</div><div class="sticker-cell-token">gold-100 → gold-300</div></div>
            </div>
          </div>
        </div>
        <div class="el-spec" style="border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);">
          <div>
            <div class="el-label">Sign Pill Disc</div>
            <div class="el-code">26px · font 15px · radial(circle at 35% 30%, var(--accent), var(--accent-deep)) · border 2px var(--accent-deep) · var(--shadow-disc)</div>
          </div>
          <div>
            <div class="el-label">Portrait Disc</div>
            <div class="el-code">26px · font 18px · radial(circle at 35% 30%, var(--color-gold-100), var(--color-gold-300)) · border 2px var(--color-wood-dark)</div>
          </div>
          <div class="el-spec-full">
            <div class="el-label">Shared</div>
            <div class="el-code">var(--shadow-disc) = 0 2px 3px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.4) · disc sits inline in the pill flex row (not absolute)</div>
          </div>
        </div>
      </div>

      <Notes>
        <li>All discs share one recipe: a 2-stop <code>radial-gradient(circle at 35% 30%, light, deep)</code> with a matching <code>2px solid {deep}</code> ring — the off-centre highlight gives the glossy sphere read.</li>
        <li>Two sizes in gps3: <strong>34px / 20px icon</strong> on FAB plaques, <strong>26px / 15px icon</strong> in sign pills (the pig portrait uses the 26px disc at an 18px icon and a fixed gold gradient with a wood-dark ring).</li>
        <li>FAB discs derive their colors from <code>--fab-stripe</code> / <code>--fab-deep</code> (theme), so the disc always matches its plaque awning stripe; sign-pill discs follow the pill's <code>--accent</code>.</li>
        <li>gps3 has no 38px action-bar sphere and no per-need 3-stop muted gradient — discs are the FAB/sign-pill 2-stop form only.</li>
      </Notes>
    </Section>

  </PageLayout>
</template>
