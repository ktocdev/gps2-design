// PetStore.jsx — habitat dioramas with wandering pigs, hover tooltips, click to select.
const FUR_COLORS = [
  { name: 'White',    hex: '#ffffff' },
  { name: 'Black',    hex: '#1a1a1a' },
  { name: 'Brown',    hex: '#8b4513' },
  { name: 'Cream',    hex: '#fffdd0' },
  { name: 'Tortoise', hex: '#d2691e' },
  { name: 'Tricolor', hex: '#e8cd9a' },
  { name: 'Orange',   hex: '#ff8c00' },
  { name: 'Gray',     hex: '#808080' },
];

const PIG = (name, breed, colors, personality, gender, age) => ({ name, breed, colors, personality, gender, age });

// Each habitat holds a single BONDED PAIR — adopt the habitat, take both pigs.
const CAGES = [
  { id: 'habitat-1', label: 'Habitat 1', tint: '#fbcfe8', hover: '#fef2f7', accent: '#db2777', accentDark: '#be185d', pigs: [
    PIG('Clementine', 'American',  ['Cream', 'Brown'],  'curious', 'sow', 7),
    PIG('Nutmeg',     'Abyssinian', ['Tortoise'],       'shy',     'sow', 12),
  ]},
  { id: 'habitat-2', label: 'Habitat 2', tint: '#bbf7d0', hover: '#f0fdf4', accent: '#178740', accentDark: '#166534', pigs: [
    PIG('Biscuit', 'Peruvian', ['Orange', 'White'], 'playful', 'boar', 5),
    PIG('Peanut',  'Teddy',    ['Brown', 'Black'],  'bold',    'boar', 9),
  ]},
  { id: 'habitat-3', label: 'Habitat 3', tint: '#ddd6fe', hover: '#f5f3ff', accent: '#8b5cf6', accentDark: '#7c3aed', pigs: [
    PIG('Muffin', 'Silkie',   ['Gray'],           'calm',   'sow', 22),
    PIG('Daisy',  'American', ['White', 'Black'], 'social', 'sow', 4),
  ]},
  { id: 'habitat-4', label: 'Habitat 4', tint: '#fed7aa', hover: '#fff7ed', accent: '#f59e0b', accentDark: '#d97706', pigs: [
    PIG('Ginger', 'Abyssinian', ['Orange', 'Cream'], 'curious', 'sow',  3),
    PIG('Toast',  'American',   ['Tortoise'],        'playful', 'boar', 6),
  ]},
  { id: 'habitat-5', label: 'Habitat 5', tint: '#bae6fd', hover: '#f0f9ff', accent: '#0ea5e9', accentDark: '#0369a1', pigs: [
    PIG('Mochi',  'Teddy',    ['Cream'],          'calm', 'boar', 6),
    PIG('Pepper', 'American', ['Black'],          'bold', 'sow', 8),
  ]},
  { id: 'habitat-6', label: 'Habitat 6', tint: '#fecdd3', hover: '#fff1f2', accent: '#e11d48', accentDark: '#9f1239', pigs: [
    PIG('Lulu',        'Silkie',   ['Tricolor'],       'shy',    'sow', 5),
    PIG('Marshmallow', 'Peruvian', ['White', 'Cream'], 'social', 'sow', 4),
  ]},
];

// How each personality moves
// shy: still, occasional small step. calm: gentle slow drift. curious/social: wander.
// playful/bold: wander + occasional popcorn hop.
const MOTION = {
  shy:     { speed: 0.05, hopChance: 0,    moveChance: 0.15 },
  calm:    { speed: 0.10, hopChance: 0,    moveChance: 0.55 },
  curious: { speed: 0.18, hopChance: 0.02, moveChance: 0.85 },
  social:  { speed: 0.18, hopChance: 0.03, moveChance: 0.90 },
  playful: { speed: 0.22, hopChance: 0.08, moveChance: 0.95 },
  bold:    { speed: 0.22, hopChance: 0.06, moveChance: 0.95 },
};

const PetStoreStyles = () => (
  <style>{`
    .ps-cage {
      /* Use top (not transform) so hover doesn't create a stacking context that
         would trap the negative-z-index legs in front of the frame. */
      top: 0;
      /* Avoid transitioning any property that creates a stacking context
         (filter, transform, opacity<1, etc.) — that would reparent the
         z-index:-1 legs forward and make them pop in on hover. */
      transition: top 220ms cubic-bezier(.34,1.56,.64,1), box-shadow 180ms ease;
    }
    .ps-cage:hover {
      top: -2px;
    }
    .ps-cage:active { top: 1px; }
    .ps-pig-sprite {
      transition: transform 700ms linear, filter 200ms ease;
      cursor: pointer;
    }
    .ps-pig-sprite.hopping { transition: transform 220ms cubic-bezier(.5,1.6,.5,1); }
    .ps-pig-sprite:hover { filter: drop-shadow(0 0 8px rgba(255,255,255,.9)) drop-shadow(0 2px 4px rgba(0,0,0,.25)); }
    .ps-pig-sprite.selected { filter: drop-shadow(0 0 0 3px #fff) drop-shadow(0 0 0 5px var(--ring,#db2777)) drop-shadow(0 4px 6px rgba(0,0,0,.25)); }
    .ps-tooltip { animation: psTooltipIn 160ms ease both; }
    @keyframes psTooltipIn { from { opacity: 0; transform: translate(-50%, -4px); } to { opacity: 1; transform: translate(-50%, -8px); } }
    @media (prefers-reduced-motion: reduce) {
      .ps-cage, .ps-pig-sprite { transition: none; }
      .ps-cage:hover { top: 0; }
    }
  `}</style>
);

// Cage interior dimensions (in % of cage box)
const CAGE_W = 320;
const CAGE_H = 200;
const PADDING = 14; // pig won't cross this edge inset

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// Deterministic per-habitat layout offsets — same cage always lays out the same way.
// Each prop has {top, left} measured from the top-left of the cage interior, in pixels.
const LAYOUTS = {
  'habitat-1': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 80,  left: 38  }, igloo: { top: 78,  left: 192 } },
  'habitat-2': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 32,  left: 4   }, igloo: { top: 110, left: 220 } },
  'habitat-3': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 70,  left: 200 }, igloo: { top: 40,  left: 14  } },
  'habitat-4': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 100, left: 6   }, igloo: { top: 50,  left: 110 } },
  'habitat-5': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 60,  left: 12  }, igloo: { top: 90,  left: 230 } },
  'habitat-6': { waterBottle: { top: 0,  left: 18 }, hayRack: { top: 110, left: 180 }, igloo: { top: 60,  left: 50  } },
};

const HabitatProps = ({ tint, layoutId, override }) => {
  const base = LAYOUTS[layoutId] || LAYOUTS['habitat-1'];
  const L = {
    waterBottle: { ...base.waterBottle, ...(override?.waterBottle || {}) },
    hayRack:     { ...base.hayRack,     ...(override?.hayRack     || {}) },
    igloo:       { ...base.igloo,       ...(override?.igloo       || {}) },
  };
  return (
  // Static furniture: water bottle, hay rack + igloo — all positioned per cage
  <>
    {/* Water bottle hanging from top */}
    <svg style={{ position: 'absolute', top: L.waterBottle.top, left: L.waterBottle.left, width: 22, height: 56 }} viewBox="0 0 22 56">
      <rect x="6" y="0" width="10" height="3" fill="#94a3b8" />
      <rect x="9" y="3" width="4" height="6" fill="#cbd5e1" />
      <rect x="3" y="9" width="16" height="32" rx="3" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />
      <rect x="3" y="9" width="16" height="14" rx="3" fill="rgba(255,255,255,.4)" />
      <rect x="9" y="41" width="4" height="6" fill="#94a3b8" />
      <circle cx="11" cy="50" r="3" fill="#94a3b8" />
    </svg>
    {/* Hay rack — wooden cylinder with vertical dowels and hay strands poking through */}
    <svg style={{ position: 'absolute', top: L.hayRack.top, left: L.hayRack.left, width: 56, height: 64 }} viewBox="0 0 56 64">
      <ellipse cx="28" cy="60" rx="24" ry="3" fill="rgba(0,0,0,.18)" />
      {/* Hay strands sticking out the top */}
      <g stroke="#a3a847" strokeWidth="1" strokeLinecap="round" fill="none">
        <line x1="18" y1="14" x2="14" y2="0" />
        <line x1="22" y1="13" x2="20" y2="-1" />
        <line x1="28" y1="12" x2="29" y2="-2" />
        <line x1="34" y1="13" x2="38" y2="0" />
        <line x1="38" y1="14" x2="42" y2="2" />
      </g>
      {/* Top wooden disc */}
      <ellipse cx="28" cy="14" rx="20" ry="5" fill="#e8c592" stroke="#92400e" strokeWidth="1.2" />
      <ellipse cx="28" cy="13" rx="16" ry="3" fill="#f3d8a8" />
      {/* Cylinder back wall (hay visible between dowels) */}
      <rect x="8" y="14" width="40" height="38" fill="#b8b865" />
      {/* Hay texture inside the cylinder */}
      <g stroke="#8a8c3a" strokeWidth=".8" strokeLinecap="round" fill="none" opacity=".7">
        <line x1="11" y1="20" x2="15" y2="28" />
        <line x1="14" y1="22" x2="11" y2="32" />
        <line x1="20" y1="18" x2="24" y2="30" />
        <line x1="26" y1="22" x2="22" y2="34" />
        <line x1="32" y1="18" x2="36" y2="28" />
        <line x1="38" y1="22" x2="34" y2="32" />
        <line x1="42" y1="20" x2="46" y2="32" />
        <line x1="16" y1="36" x2="20" y2="46" />
        <line x1="28" y1="38" x2="24" y2="48" />
        <line x1="36" y1="36" x2="40" y2="46" />
      </g>
      {/* Hay strands poking out the sides between dowels */}
      <g stroke="#a3a847" strokeWidth=".9" strokeLinecap="round" fill="none">
        <line x1="9" y1="26" x2="2" y2="22" />
        <line x1="9" y1="34" x2="3" y2="38" />
        <line x1="47" y1="28" x2="54" y2="24" />
        <line x1="47" y1="40" x2="53" y2="44" />
        <line x1="20" y1="52" x2="16" y2="58" />
        <line x1="34" y1="52" x2="38" y2="58" />
      </g>
      {/* Vertical dowels */}
      <g fill="#e8c592" stroke="#92400e" strokeWidth=".8">
        <rect x="8" y="14" width="3" height="38" rx="1" />
        <rect x="16" y="14" width="3" height="38" rx="1" />
        <rect x="24" y="14" width="3" height="38" rx="1" />
        <rect x="32" y="14" width="3" height="38" rx="1" />
        <rect x="40" y="14" width="3" height="38" rx="1" />
        <rect x="46" y="14" width="3" height="38" rx="1" />
      </g>
      {/* Bottom wooden disc */}
      <ellipse cx="28" cy="52" rx="20" ry="5" fill="#e8c592" stroke="#92400e" strokeWidth="1.2" />
      <ellipse cx="28" cy="53" rx="16" ry="3" fill="#d4a76a" opacity=".5" />
      {/* Stray hay on ground */}
      <g stroke="#a3a847" strokeWidth=".9" strokeLinecap="round" fill="none">
        <line x1="6" y1="58" x2="2" y2="60" />
        <line x1="50" y1="58" x2="55" y2="60" />
        <line x1="20" y1="60" x2="14" y2="62" />
      </g>
    </svg>
    {/* Igloo / little house */}
    <svg style={{ position: 'absolute', top: L.igloo.top, left: L.igloo.left, width: 60, height: 44 }} viewBox="0 0 60 44">
      <ellipse cx="30" cy="40" rx="28" ry="3" fill="rgba(0,0,0,.1)" />
      <path d="M2 38 Q2 8 30 8 Q58 8 58 38 Z" fill={tint} stroke="#475569" strokeWidth="1.5" />
      <path d="M2 38 Q2 8 30 8 Q58 8 58 38 Z" fill="rgba(255,255,255,.35)" />
      <ellipse cx="30" cy="38" rx="11" ry="13" fill="#1e293b" />
      <ellipse cx="30" cy="34" rx="9" ry="10" fill="#0f172a" />
    </svg>
  </>
  );
};

const Tooltip = ({ pig, accent, accentDark, x }) => {
  const swatches = pig.colors.map(c => FUR_COLORS.find(f => f.name === c)?.hex || '#ccc');
  return (
    <div className="ps-tooltip" style={{
      position: 'absolute', left: x, top: -8, transform: 'translate(-50%, -100%)',
      background: '#fff', borderRadius: 10, padding: '8px 12px',
      border: `2px solid ${accent}`, boxShadow: '0 8px 20px -6px rgba(0,0,0,.25)',
      minWidth: 160, zIndex: 30, pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: "'Gaegu', cursive", fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{pig.name}</span>
        <span style={{ fontSize: 9, color: accentDark, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>{pig.gender}</span>
      </div>
      <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
        <span style={{ fontWeight: 600 }}>{pig.breed}</span> · {pig.personality}
      </div>
      <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
        {swatches.map((c, i) => (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: '50%', background: c,
            border: '2px solid #fff', boxShadow: '0 0 0 1px #cbd5e1',
          }} />
        ))}
      </div>
      {/* tip */}
      <div style={{
        position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
        borderTop: `8px solid ${accent}`,
      }} />
    </div>
  );
};

const Habitat = ({ cage, isPicked, onSelect, layoutOverride, vibe = 'bright', energy = 0.5, fullness = 1 }) => {
  // Per-pig motion state
  const [pigState, setPigState] = React.useState(() =>
    cage.pigs.map((p, i) => ({
      x: PADDING + 50 + (i * 60) % (CAGE_W - 2 * PADDING - 100),
      y: PADDING + 60 + (i * 40) % (CAGE_H - 2 * PADDING - 80),
      tx: 0, ty: 0, // target offsets
      facing: 1,
      hopping: false,
    }))
  );
  const [hovered, setHovered] = React.useState(null);

  // Energy scales motion speed, hop chance, and tick rate; ranges 0..1
  const energyMul = 0.4 + energy * 1.6; // 0.4x at 0, 2.0x at 1

  // Tick wandering — faster ticks at higher energy
  React.useEffect(() => {
    const interval = Math.max(220, 900 - energy * 720); // 900ms at 0, ~180ms at 1
    const id = setInterval(() => {
      setPigState(state => state.map((s, i) => {
        const m = MOTION[cage.pigs[i].personality] || MOTION.calm;
        if (Math.random() > m.moveChance) return s;
        const dx = (Math.random() - 0.5) * 60 * (m.speed * 6) * energyMul;
        const dy = (Math.random() - 0.5) * 30 * (m.speed * 6) * energyMul;
        const nx = clamp(s.x + dx, PADDING + 24, CAGE_W - PADDING - 24);
        const ny = clamp(s.y + dy, PADDING + 30, CAGE_H - PADDING - 28);
        const hopping = Math.random() < (m.hopChance * energyMul);
        return { ...s, x: nx, y: ny, facing: dx < 0 ? -1 : 1, hopping };
      }));
    }, interval);
    return () => clearInterval(id);
  }, [cage.pigs, energy, energyMul]);

  const v = VIBES[vibe] || VIBES.bright;
  const pigSize = Math.round(40 + energy * 18); // 40 at 0, 58 at 1
  // Wooden legs that peek out at the bottom-left & bottom-right of the frame —
  // makes the habitat feel like a raised hutch rather than sitting on the page.
  // z-index: -1 tucks them behind the frame so the seam where leg meets frame is hidden.
  const legStyle = {
    position: 'absolute',
    bottom: -16, // protrude below the frame
    width: 18, height: 22,
    background: 'linear-gradient(180deg, #7a3408 0%, #5a2606 100%)',
    borderRadius: '0 0 4px 4px',
    boxShadow:
      'inset 0 -3px 4px rgba(0,0,0,.35), 0 4px 4px -2px rgba(60,30,10,.4)',
    pointerEvents: 'none',
    zIndex: -1,
  };
  return (
    <div
      className="ps-cage"
      role="button"
      tabIndex={0}
      aria-pressed={isPicked}
      aria-label={`Adopt the bonded pair in ${cage.label}: ${cage.pigs.map(p => p.name).join(' and ')}`}
      onClick={() => onSelect(cage.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(cage.id); }
      }}
      style={{
      position: 'relative',
      borderRadius: 14, padding: 12,
      // Wooden frame — vertical wood-grain gradient that matches the supplies-store shelves
      background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
      border: isPicked ? `3px solid ${cage.accentDark}` : '3px solid #451a03',
      boxShadow: isPicked
        ? `
          0 0 0 4px ${cage.accent},
          0 0 0 7px #fff,
          0 18px 28px -8px ${cage.accentDark}80,
          0 8px 12px -3px rgba(69,26,3,.35),
          inset 0 2px 0 rgba(255,255,255,.22),
          inset 0 -3px 0 rgba(69,26,3,.35)
        `
        : `
        0 14px 22px -8px rgba(69,26,3,.55),
        0 6px 10px -3px rgba(69,26,3,.35),
        inset 0 2px 0 rgba(255,255,255,.22),
        inset 0 -3px 0 rgba(69,26,3,.35)
      `,
      display: 'flex', flexDirection: 'column', gap: 10,
      // Leave breathing room below for the legs and their cast shadow
      marginBottom: 18,
      cursor: 'pointer',
      outline: 'none',
    }}>
      {/* Horizontal wood-grain hairlines */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 6, borderRadius: 8, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 18px, rgba(0,0,0,.18) 18px 19px, transparent 19px 21px, rgba(0,0,0,.10) 21px 22px, transparent 22px 38px)',
      }} />
      {/* Top edge highlight */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 3, left: 8, right: 8, height: 1,
        background: 'rgba(255,255,255,.22)', borderRadius: 1, pointerEvents: 'none',
      }} />
      {/* Bottom edge shadow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 3, left: 8, right: 8, height: 2,
        background: 'rgba(0,0,0,.32)', borderRadius: 1, pointerEvents: 'none',
      }} />
      {/* Wooden legs — bottom-left & bottom-right */}
      <div style={{ ...legStyle, left: 14 }} aria-hidden="true" />
      <div style={{ ...legStyle, right: 14 }} aria-hidden="true" />

      {/* Title — small accent chip.
          position:relative + zIndex lifts the chip above the absolutely-
          positioned wood-grain hairlines decoration above. */}
      <h3 style={{
        margin: 0,
        alignSelf: 'flex-start',
        position: 'relative', zIndex: 2,
        fontFamily: "'Gaegu', cursive", fontSize: 20, fontWeight: 700,
        color: '#fff', letterSpacing: '.01em',
        padding: '3px 12px',
        borderRadius: 999,
        background: `linear-gradient(180deg, ${cage.accent} 0%, ${cage.accentDark} 100%)`,
        border: '1px solid rgba(0,0,0,.25)',
        boxShadow: `
          0 3px 5px -2px rgba(0,0,0,.30),
          inset 0 1px 0 rgba(255,255,255,.30)
        `,
        textShadow: '0 1px 0 rgba(0,0,0,.25)',
      }}>{cage.label}</h3>

      {/* Diorama stage */}
      <div style={{
        position: 'relative', height: CAGE_H, width: '100%',
        background: v.bedding,
        borderRadius: 12, overflow: 'visible',
        border: `2px solid ${v.border}`,
        boxShadow: `inset 0 0 0 2px rgba(255,255,255,.5), inset 0 -8px 16px -4px ${v.border}40`,
      }}>
        {/* Bedding speckles — density tied to vibe */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 10,
          backgroundImage: `radial-gradient(circle at 20% 30%, ${v.specks} 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, ${v.specks} 1px, transparent 1.5px), radial-gradient(circle at 40% 80%, ${v.specks} 1px, transparent 1.5px), radial-gradient(circle at 85% 25%, ${v.specks} 1px, transparent 1.5px)`,
          backgroundSize: '40px 40px, 50px 50px, 35px 35px, 45px 45px',
          opacity: v.dotOpacity,
        }} />

        <HabitatProps tint={cage.tint} layoutId={cage.id} override={layoutOverride} />
        {fullness >= 2 && <ExtraProps cage={cage} variant="a" />}
        {fullness >= 3 && <ExtraProps cage={cage} variant="b" />}

        {/* Pigs */}
        {cage.pigs.map((p, i) => {
          const s = pigState[i];
          const isHovered = hovered === p.name;
          return (
            <div
              key={p.name}
              className={`ps-pig-sprite${s.hopping ? ' hopping' : ''}${isPicked ? ' selected' : ''}`}
              style={{
                position: 'absolute', left: 0, top: 0,
                transform: `translate(${s.x - 24}px, ${s.y - 24 - (s.hopping ? 12 : 0)}px) scaleX(${s.facing})`,
                zIndex: isHovered || isPicked ? 20 : 10,
                ['--ring']: cage.accent,
              }}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(h => h === p.name ? null : h)}
              onClick={(e) => { e.stopPropagation(); onSelect(cage.id); }}
            >
              <PigSvg breed={p.breed} colors={p.colors} size={pigSize} />
            </div>
          );
        })}

        {/* Tooltip overlay (anchored to hovered pig) */}
        {(() => {
          if (!hovered) return null;
          const i = cage.pigs.findIndex(p => p.name === hovered);
          if (i < 0) return null;
          const s = pigState[i];
          return (
            <Tooltip pig={cage.pigs[i]} accent={cage.accent} accentDark={cage.accentDark} x={s.x} />
          );
        })()}
      </div>
    </div>
  );
};

const VIBES = {
  cozy:   { bedding: 'linear-gradient(180deg, #fffaf0 0%, #fce8c8 100%)', border: '#92400e', specks: '#a16207', cardBg: null, dotOpacity: 0.45 },
  bright: { bedding: 'linear-gradient(180deg, #fffef5 0%, #fdf3c4 100%)', border: '#92400e', specks: '#d97706', cardBg: null, dotOpacity: 0.35 },
  wild:   { bedding: 'linear-gradient(180deg, #f4faec 0%, #d4e8b8 100%)', border: '#3f6212', specks: '#365314', cardBg: null, dotOpacity: 0.55 },
};

const ExtraProps = ({ cage, variant }) => {
  // Tiny "extra props" — a hay pile and a water bowl/toy ball — to add clutter as fullness rises
  const positions = variant === 'a'
    ? { hayPile: { top: 156, left: 138 }, bowl: { top: 22, left: 248 } }
    : { hayPile: { top: 28,  left: 110 }, bowl: { top: 158, left: 36  } };
  return (
    <>
      {/* Hay pile */}
      <svg style={{ position: 'absolute', top: positions.hayPile.top, left: positions.hayPile.left, width: 40, height: 22 }} viewBox="0 0 40 22">
        <ellipse cx="20" cy="20" rx="18" ry="2" fill="rgba(0,0,0,.18)" />
        <g stroke="#a3a847" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <line x1="6" y1="18" x2="14" y2="6" />
          <line x1="10" y1="20" x2="18" y2="4" />
          <line x1="16" y1="20" x2="22" y2="2" />
          <line x1="22" y1="20" x2="28" y2="6" />
          <line x1="28" y1="18" x2="34" y2="8" />
          <line x1="14" y1="14" x2="26" y2="14" />
          <line x1="12" y1="18" x2="32" y2="18" />
        </g>
      </svg>
      {/* Water bowl / toy ball alternate */}
      <svg style={{ position: 'absolute', top: positions.bowl.top, left: positions.bowl.left, width: 28, height: 16 }} viewBox="0 0 28 16">
        <ellipse cx="14" cy="14" rx="13" ry="2" fill="rgba(0,0,0,.18)" />
        <ellipse cx="14" cy="11" rx="12" ry="3.5" fill={cage.accent} stroke={cage.accentDark} strokeWidth="1" />
        <ellipse cx="14" cy="9" rx="10" ry="2" fill="#7dd3fc" />
        <ellipse cx="11" cy="8" rx="3" ry=".8" fill="rgba(255,255,255,.7)" />
      </svg>
    </>
  );
};

const EditableName = ({ value, editing, onStartEdit, onCommit, onCancel, accentDark }) => {
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);

  // Sync draft when entering edit mode (or value changes externally)
  React.useEffect(() => {
    if (editing) {
      setDraft(value);
      // focus + select-all on next tick so the user can immediately retype
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
    }
  }, [editing, value]);

  const commit = () => onCommit(draft);
  const cancel = () => { setDraft(value); onCancel(); };

  if (editing) {
    return (
      <span style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: "'Gaegu', cursive", fontSize: 28, fontWeight: 700,
        lineHeight: 1,
        maxWidth: '100%',
      }}>
        {/* Invisible sizer mirrors the draft so the input fits its text */}
        <span aria-hidden="true" style={{
          visibility: 'hidden',
          whiteSpace: 'pre',
          padding: '0 6px',
          // Match input borders so widths line up exactly
          border: '2px solid transparent',
        }}>{draft || ' '}</span>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, 18))}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); }
            else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
          }}
          maxLength={18}
          size={1}
          style={{
            position: 'absolute', inset: 0,
            fontFamily: "'Gaegu', cursive", fontSize: 28, fontWeight: 700,
            color: accentDark, lineHeight: 1,
            background: 'rgba(255,255,255,.7)',
            border: `2px solid ${accentDark}`,
            borderRadius: 6,
            padding: '0 6px',
            width: '100%', minWidth: 0,
            outline: 'none',
            boxShadow: `0 0 0 3px ${accentDark}22`,
          }}
        />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onStartEdit}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Click to rename"
      style={{
        appearance: 'none', background: 'transparent',
        border: 'none', padding: '0 4px 0 0', margin: '-2px -4px -2px 0',
        cursor: 'text',
        fontFamily: "'Gaegu', cursive", fontSize: 28, fontWeight: 700,
        color: accentDark, lineHeight: 1,
        textAlign: 'left',
        display: 'inline-flex', alignItems: 'baseline', gap: 6,
        borderRadius: 4,
        transition: 'background 160ms ease, box-shadow 160ms ease',
        ...(hovered && {
          background: 'rgba(255,255,255,.55)',
          boxShadow: `inset 0 -2px 0 ${accentDark}55`,
        }),
      }}
    >
      <span>{value}</span>
      <span aria-hidden="true" style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 11, fontWeight: 600,
        color: accentDark,
        opacity: hovered ? 0.85 : 0.45,
        transform: 'translateY(-2px)',
        transition: 'opacity 160ms ease',
      }}>✎</span>
    </button>
  );
};

const PetStore = ({ onAdopt, layouts = {}, vibe = 'bright', energy = 0.5, fullness = 1 }) => {
  // Which habitat (id) the user has selected. Adopting takes BOTH pigs in it —
  // they're a bonded pair.
  const [pickedId, setPickedId] = React.useState(null);
  const pickedCage = pickedId ? CAGES.find(c => c.id === pickedId) : null;
  const pickedPigs = pickedCage ? pickedCage.pigs : [];
  // Map of originalName → user-edited custom name. Empty/missing = use original.
  const [customNames, setCustomNames] = React.useState({});
  // Which slot is currently being edited (0 or 1, or null)
  const [editingSlot, setEditingSlot] = React.useState(null);
  const selectHabitat = (id) => {
    setPickedId(prev => prev === id ? null : id);
    setEditingSlot(null);
  };
  const displayNameFor = (orig) => (customNames[orig] && customNames[orig].trim()) || orig;
  // Rotating tagline carousel — cycles every 3.2s with a soft cross-fade
  const TAGLINES = [
    'Pick a habitat — adopt the bonded pair inside!',
    'Each habitat holds best friends. Take the pair home.',
    'Guinea pigs need a companion. Adopt a bonded pair!',
    'Hover the pigs to meet their personalities',
    'Click a habitat to take both pigs home',
  ];
  const [tagIdx, setTagIdx] = React.useState(0);
  const [tagFading, setTagFading] = React.useState(false);
  React.useEffect(() => {
    if (pickedId) return; // pause carousel once user has picked a habitat
    const interval = setInterval(() => {
      setTagFading(true);
      setTimeout(() => {
        setTagIdx(i => (i + 1) % TAGLINES.length);
        setTagFading(false);
      }, 360);
    }, 3200);
    return () => clearInterval(interval);
  }, [pickedId]);
  return (
    <div style={{
      position: 'relative', minHeight: '100%',
      // Parchment wash — soft radial warmth + faint horizontal "paper grain"
      // hairlines. Picks up the same cream palette the cert uses but at a
      // much lower density so the screen still feels open.
      background:
        'repeating-linear-gradient(0deg, rgba(146,64,14,.025) 0 1px, transparent 1px 9px),' +
        'radial-gradient(ellipse at 50% 0%, #fffbeb 0%, #fef3c7 55%, #fde8b8 100%)',
    }}>
      {window.PetStoreBackdrop && <window.PetStoreBackdrop />}
      <div style={{ position: 'relative', zIndex: 1, padding: 24, maxWidth: 1040, margin: '0 auto' }}>
      <PetStoreStyles />

      <h1 style={{
        fontFamily: "'Gaegu', cursive",
        fontSize: 48,
        fontWeight: 700,
        color: '#92400e',
        textAlign: 'center',
        margin: '8px 0 4px',
        lineHeight: 1.1,
      }}>
        Pick your bonded pair
      </h1>
      <p style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14, fontWeight: 500,
        color: '#9a6a2a',
        textAlign: 'center',
        margin: '0 0 18px',
        letterSpacing: '.02em',
      }}>
        Each habitat holds two pigs who've grown up together. Adopt the habitat — take both home.
      </p>

      {/* Picture-frame slots — fill with the selected habitat's bonded pair.
          Wrapped in a relative container so the single shared × button can sit
          at the top-right of the pair (you can't drop one half of a bond). */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        {pickedId && (
          <button
            onClick={() => setPickedId(null)}
            aria-label="Cancel — unselect this habitat"
            style={{
              position: 'absolute', top: -12, right: -12, zIndex: 4,
              width: 32, height: 32, borderRadius: '50%',
              background: '#fffbeb', border: '3px solid #92400e',
              color: '#7c2d12', fontSize: 18, fontWeight: 700,
              cursor: 'pointer', lineHeight: 1, padding: 0,
              boxShadow: '0 4px 6px rgba(0,0,0,.28)',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
        )}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
        {[0, 1].map(slot => {
          const pig = pickedPigs[slot];
          const cage = pickedCage;
          const accent = cage?.accent || '#cbd5e1';
          const accentDark = cage?.accentDark || '#64748b';
          const tint = cage?.tint || '#f8fafc';
          const swatches = pig ? pig.colors.map(c => FUR_COLORS.find(f => f.name === c)?.hex || '#ccc') : [];

          const tilt = pig ? (slot === 0 ? -1 : 1) : 0;

          if (!pig) {
            return (
              <div key={slot} style={{
                position: 'relative',
                padding: 8,
                background: 'rgb(226, 240, 232)',
                border: '1px solid rgba(100, 116, 139, .25)',
                borderRadius: 12,
                boxShadow: '0 1px 2px rgba(15, 23, 42, .06)',
                transition: 'all 280ms ease',
              }}>
                <div style={{
                  background: 'transparent',
                  border: '2px dashed #cbd5e1',
                  borderRadius: 8,
                  padding: '12px 14px',
                  minHeight: 116,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: .6,
                }}>
                  <svg width="64" height="48" viewBox="0 0 64 48" style={{ opacity: .4 }}>
                    <ellipse cx="32" cy="32" rx="24" ry="14" fill="#94a3b8" />
                    <ellipse cx="22" cy="46" rx="3" ry="2.5" fill="#94a3b8" />
                    <ellipse cx="42" cy="46" rx="3" ry="2.5" fill="#94a3b8" />
                    <circle cx="50" cy="22" r="9" fill="#94a3b8" />
                    <circle cx="46" cy="21" r="1.6" fill="#fff" />
                    <circle cx="53" cy="21" r="1.6" fill="#fff" />
                    <ellipse cx="55" cy="14" rx="3" ry="4" fill="#94a3b8" />
                    <ellipse cx="44" cy="14" rx="3" ry="4" fill="#94a3b8" />
                  </svg>
                </div>
              </div>
            );
          }

          // Crate-style card matching the supplies store aesthetic
          return (
            <div key={slot} style={{
              position: 'relative',
              background: 'linear-gradient(180deg, #d97706 0%, #b45309 100%)',
              borderRadius: 10, padding: 12,
              boxShadow: '0 22px 28px -8px rgba(69,26,3,.5), 0 10px 14px -4px rgba(69,26,3,.35), inset 0 2px 0 rgba(255,255,255,.2), inset 0 -3px 0 rgba(69,26,3,.3)',
              transform: `rotate(${tilt}deg)`,
              transition: 'all 200ms cubic-bezier(.34,1.56,.64,1)',
            }}>
              {/* Vertical wood-plank striping */}
              <div style={{
                position: 'absolute', inset: 12, borderRadius: 4,
                backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 22px, rgba(0,0,0,.18) 22px 24px, transparent 24px 26px)',
                pointerEvents: 'none',
              }} />
              {/* Brass corner studs */}
              {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
                <div key={j} style={{
                  position: 'absolute', [v]: 6, [h]: 6, width: 8, height: 8, borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
                  boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.4)',
                  pointerEvents: 'none',
                }} />
              ))}

              {/* Cream paper interior */}
              <div style={{
                background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: 6, padding: '20px 14px 16px',
                position: 'relative',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,.18)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                {/* Pig portrait — replaces the supplies-store emoji */}
                <div style={{
                  position: 'relative',
                  width: 96, height: 96, flexShrink: 0,
                  background: `radial-gradient(circle at 50% 70%, ${tint} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: 'drop-shadow(0 4px 5px rgba(0,0,0,.22))',
                }}>
                  <PigSvg breed={pig.breed} colors={pig.colors} size={92} />
                </div>

                {/* Name plaque — white with black studs, just like supplies store */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    background: '#fff', border: '2px solid #451a03', borderRadius: 6,
                    padding: '8px 10px 10px',
                    position: 'relative',
                    boxShadow: '0 2px 4px rgba(0,0,0,.15)',
                  }}>
                    <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                    <div style={{ position: 'absolute', top: 3, right: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                    <div style={{ position: 'absolute', bottom: 3, left: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                    <div style={{ position: 'absolute', bottom: 3, right: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, minWidth: 0 }}>
                      <span style={{ minWidth: 0, flex: '1 1 auto', display: 'inline-flex' }}>
                        <EditableName
                          value={displayNameFor(pig.name)}
                          editing={editingSlot === slot}
                          onStartEdit={() => setEditingSlot(slot)}
                          onCommit={(next) => {
                            const trimmed = (next || '').trim();
                            setCustomNames(cn => {
                              const copy = { ...cn };
                              if (!trimmed || trimmed === pig.name) delete copy[pig.name];
                              else copy[pig.name] = trimmed;
                              return copy;
                            });
                            setEditingSlot(null);
                          }}
                          onCancel={() => setEditingSlot(null)}
                          accentDark="#7c2d12"
                        />
                      </span>
                      <span style={{
                        fontSize: 10, color: '#7c2d12', textTransform: 'uppercase',
                        letterSpacing: '.06em', fontWeight: 700, flexShrink: 0,
                      }}>{pig.gender}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#78716c', fontStyle: 'italic', marginTop: 2, lineHeight: 1.2 }}>
                      <span style={{ fontWeight: 600, fontStyle: 'normal', color: '#1e293b' }}>{pig.breed}</span> · {pig.personality}
                    </div>
                  </div>

                  {/* Color swatches sit below the plaque, like a price/tag row */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center', paddingLeft: 4 }}>
                    {swatches.map((c, i) => (
                      <div key={i} style={{
                        width: 14, height: 14, borderRadius: '50%', background: c,
                        border: '2px solid #fff', boxShadow: '0 0 0 1px #451a03',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Adopt CTA */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        padding: '4px 4px 0', marginBottom: 20,
      }}>
        <span style={{
          fontFamily: "'Gaegu', cursive",
          fontSize: 26,
          fontWeight: 700,
          color: '#92400e',
          lineHeight: 1.2,
          flex: 1,
          minHeight: '2.4em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            display: 'inline-block',
            opacity: (!pickedId && tagFading) ? 0 : 1,
            transform: (!pickedId && tagFading) ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'opacity 360ms ease, transform 360ms ease',
          }}>
            {!pickedId && TAGLINES[tagIdx]}
            {pickedId && `${pickedPigs.map(p => displayNameFor(p.name)).join(' & ')} are ready to come home with you.`}
          </span>
        </span>
        <button
          disabled={!pickedId}
          onClick={() => onAdopt(pickedPigs.map(p => ({ originalName: p.name, name: displayNameFor(p.name) })))}
          className="gp-btn--tactile"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 28px', height: 52,
            fontFamily: "'Gaegu', 'Comic Sans MS', cursive",
            fontSize: 22, fontWeight: 700,
            letterSpacing: '.02em',
            color: '#fff',
            background: 'linear-gradient(180deg,#ec4899 0%,#db2777 100%)',
            border: '2px solid #7c2d12',
            borderRadius: 999,
            cursor: pickedId ? 'pointer' : 'not-allowed',
            boxShadow: '0 4px 8px -2px rgba(219,39,119,.4), inset 0 1px 0 rgba(255,255,255,.35)',
            textShadow: '0 1px 0 rgba(69,26,3,.25)',
          }}>
          Adopt pair
        </button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20, marginBottom: 20,
      }}>
        {CAGES.map(c => (
          <Habitat key={c.id} cage={c} isPicked={pickedId === c.id} onSelect={selectHabitat} layoutOverride={layouts[c.id]} vibe={vibe} energy={energy} fullness={fullness} />
        ))}
      </div>
      </div>
    </div>
  );
};

Object.assign(window, { PetStore, CAGES });
