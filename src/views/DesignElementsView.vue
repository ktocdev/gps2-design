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

  </PageLayout>
</template>
