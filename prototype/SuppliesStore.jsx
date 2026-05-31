// SuppliesStore.jsx — in-game shop, "storefront window with awnings + crates on shelves" treatment.
// Flat catalog: each department has a single list (no subsections).
// Items have { name, emoji, price, blurb }.

const SUPPLIES_CATALOG = {
  hay: {
    label: 'Hay Loft', emoji: '🌾',
    tagline: "The good stuff. Long-stem, fragrant, crunchable.",
    items: [
      { name: 'Timothy Hay',  emoji: '🌾', price: 4,  blurb: 'The GOAT of grasses.' },
      { name: 'Orchard Hay',  emoji: '🌾', price: 5,  blurb: 'Sweet & soft. Picky eaters approved.' },
      { name: 'Alfalfa Hay',  emoji: '🌾', price: 7,  blurb: 'Protein-packed. Babies love it.' },
      { name: 'Meadow Hay',   emoji: '🌾', price: 4,  blurb: 'A wildflower mixtape.' },
      { name: 'Oat Hay',      emoji: '🌾', price: 5,  blurb: 'Breakfast of champions.' },
    ],
  },
  food: {
    label: 'Grocery', emoji: '🥗',
    tagline: "Fresh greens, herbs & treats. The grocery aisle.",
    items: [
      { name: 'Romaine',      emoji: '🥬', price: 3, blurb: 'Crisp. Reliable. A real lettuce.' },
      { name: 'Kale',         emoji: '🥬', price: 4, blurb: 'Earthy. Probably won the gym.' },
      { name: 'Carrot',       emoji: '🥕', price: 2, blurb: 'A classic for a reason.' },
      { name: 'Bell Pepper',  emoji: '🫑', price: 4, blurb: 'Sweet, crunchy, photogenic.' },
      { name: 'Apple',        emoji: '🍎', price: 5, blurb: 'A whole vibe.' },
      { name: 'Strawberry',   emoji: '🍓', price: 6, blurb: "Limit one — or four. We don't judge." },
      { name: 'Hay Cookie',   emoji: '🍪', price: 3, blurb: 'A cookie. From hay. Trust us.' },
      { name: 'Daily Pellets',emoji: '🌾', price: 6, blurb: 'Boring but balanced.' },
    ],
  },
  bedding: {
    label: 'Bedding', emoji: '🛏️',
    tagline: "Soft floors. Cozy naps. Maximum snuggle.",
    items: [
      { name: 'Aspen Shavings', emoji: '🟫', price: 6,  blurb: 'Classic & woodsy.' },
      { name: 'Paper Bedding',  emoji: '🟦', price: 8,  blurb: 'Fluffy. Absorbent. A cloud.' },
      { name: 'Fleece Liner',   emoji: '🟪', price: 18, blurb: 'Reusable & extremely chic.' },
      { name: 'Hemp Bedding',   emoji: '🟩', price: 9,  blurb: 'Eco-warrior approved.' },
      { name: 'Cozy Cotton',    emoji: '⬜', price: 12, blurb: "A pillow fort's dream." },
    ],
  },
  habitat: {
    label: 'Habitat', emoji: '🏠',
    tagline: "Houses, tunnels, toys. Build the dream pad.",
    items: [
      { name: 'Cozy House',  emoji: '🏠', price: 20, blurb: 'A small home for a small soul.' },
      { name: 'Pigloo',      emoji: '🟦', price: 14, blurb: 'Like an igloo. But for pigs.' },
      { name: 'Tunnel',      emoji: '🟠', price: 12, blurb: 'Zoomies, accelerated.' },
      { name: 'Hay Hut',     emoji: '🛖', price: 16, blurb: 'House you can also eat.' },
      { name: 'Water Bottle',emoji: '🧴', price: 8,  blurb: 'Hydration station.' },
      { name: 'Food Bowl',   emoji: '🥣', price: 5,  blurb: 'A bowl. For food. Iconic.' },
      { name: 'Chew Stick',  emoji: '🪵', price: 3,  blurb: 'Teeth maintenance, deluxe.' },
      { name: 'Treat Puzzle',emoji: '🧩', price: 13, blurb: 'Brain food (kinda).' },
    ],
  },
};

const SUPPLIES_FEATURED = [
  { name: 'Timothy Hay', emoji: '🌾', price: 4,  blurb: 'The GOAT of grasses.' },
  { name: 'Strawberry',  emoji: '🍓', price: 6,  blurb: 'Limit one — or four.' },
  { name: 'Pigloo',      emoji: '🟦', price: 14, blurb: 'Like an igloo. But for pigs.' },
  { name: 'Tunnel',      emoji: '🟠', price: 12, blurb: 'Zoomies, accelerated.' },
];

const SUPPLIES_DEPARTMENTS = [
  { key: 'featured', label: "Today's Picks", emoji: '⭐' },
  { key: 'hay',      label: 'Hay Loft',      emoji: '🌾' },
  { key: 'food',     label: 'Grocery',       emoji: '🥗' },
  { key: 'bedding',  label: 'Bedding',       emoji: '🛏️' },
  { key: 'habitat',  label: 'Habitat',       emoji: '🏠' },
];

const SS_AWNING_COLORS = {
  featured: ['#fbbf24', '#fef3c7'],
  hay:      ['#84cc16', '#ecfccb'],
  food:     ['#ec4899', '#fce7f3'],
  bedding:  ['#8b5cf6', '#ede9fe'],
  habitat:  ['#0ea5e9', '#e0f2fe'],
};

function ssGetItems(deptKey) {
  if (deptKey === 'featured') return SUPPLIES_FEATURED;
  return SUPPLIES_CATALOG[deptKey]?.items || [];
}
function ssGetDept(deptKey) {
  if (deptKey === 'featured') return { label: "Today's Picks", tagline: 'Hand-picked goodies. Fresh batch every visit.' };
  return SUPPLIES_CATALOG[deptKey];
}

// Reusable wood-shelf board
const SSWoodShelf = ({ children, label }) => (
  <div style={{ position: 'relative' }}>
    {children}
    <div style={{
      marginTop: 8, height: 22,
      background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
      borderRadius: 3,
      boxShadow: '0 10px 14px -4px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.25), inset 0 -2px 0 rgba(0,0,0,.4)',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 5, left: '6%', right: '6%', height: 1, background: 'rgba(0,0,0,.22)' }} />
      <div style={{ position: 'absolute', top: 11, left: '14%', right: '22%', height: 1, background: 'rgba(0,0,0,.18)' }} />
      <div style={{ position: 'absolute', top: 16, left: '28%', right: '10%', height: 1, background: 'rgba(0,0,0,.14)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.45))', borderRadius: '0 0 3px 3px' }} />
      <div style={{ position: 'absolute', bottom: -26, left: '6%', width: 18, height: 26,
        background: 'linear-gradient(180deg, #78350f 0%, #451a03 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 100%)',
        boxShadow: '2px 2px 4px rgba(0,0,0,.35)' }} />
      <div style={{ position: 'absolute', bottom: -26, right: '6%', width: 18, height: 26,
        background: 'linear-gradient(180deg, #78350f 0%, #451a03 100%)', clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 30%)',
        boxShadow: '-2px 2px 4px rgba(0,0,0,.35)' }} />
      {label && (
        <div style={{
          position: 'absolute', right: 12, top: -14,
          background: '#fef3c7', border: '2px solid #7c2d12',
          borderRadius: 4, padding: '1px 8px 2px',
          fontSize: 12, fontWeight: 700, color: '#7c2d12',
          textTransform: 'uppercase', letterSpacing: '.1em',
          transform: 'rotate(2deg)',
          boxShadow: '0 2px 3px rgba(0,0,0,.2)',
        }}>{label}</div>
      )}
    </div>
  </div>
);

const SuppliesStore = ({ coins = 0, inv = {}, onBuy, onSell }) => {
  const [dept, setDept] = React.useState('featured');
  const [hoverCrate, setHoverCrate] = React.useState(null);
  const [hoverDept, setHoverDept] = React.useState(null);
  const items = ssGetItems(dept);
  const meta = ssGetDept(dept);

  // Look up qty across all inventory categories (item names are unique)
  const ownedCount = (name) => {
    for (const k of Object.keys(inv)) {
      const found = (inv[k] || []).find(it => it.name === name);
      if (found) return found.qty || 0;
    }
    return 0;
  };

  // Chunk items into rows of 4 for shelves
  const shelves = [];
  for (let i = 0; i < items.length; i += 4) shelves.push(items.slice(i, i + 4));

  return (
    <div style={{
      fontFamily: "'Gaegu', cursive",
      background: 'linear-gradient(180deg, #fef9e7 0%, #fef3c7 60%, #fde68a 100%)',
      minHeight: '100%',
      padding: '0 0 60px',
      position: 'relative',
    }}>
      <style>{`
        .ss-btn-add, .ss-btn-sell {
          transition: transform 140ms cubic-bezier(.34,1.56,.64,1),
                      box-shadow 140ms ease, filter 140ms ease;
        }
        .ss-btn-add:hover  { transform: translateY(-1px); filter: brightness(1.06);
          box-shadow: 0 6px 10px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.45); }
        .ss-btn-add:active { transform: translateY(0); filter: brightness(.97); }
        .ss-btn-sell:hover { transform: translateY(-1px); filter: brightness(1.04);
          box-shadow: 0 5px 7px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.55); }
        .ss-btn-sell:active{ transform: translateY(0); filter: brightness(.97); }
        .ss-btn-add[disabled] { opacity: .55; filter: grayscale(.3); cursor: not-allowed; }
      `}</style>

      {/* === WOODEN BEAM that the awnings hang from === */}
      <div style={{
        position: 'relative', zIndex: 5,
        height: 22, marginTop: 18,
        background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
        borderTop: '3px solid #451a03',
        borderBottom: '3px solid #451a03',
        boxShadow: 'inset 0 2px 0 rgba(255,255,255,.18), inset 0 -2px 0 rgba(0,0,0,.35), 0 6px 8px -3px rgba(0,0,0,.35)',
      }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent 0 80px, rgba(0,0,0,.18) 80px 82px, transparent 82px 160px)',
          pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 5, left: 14, width: 8, height: 8, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
        <div style={{ position: 'absolute', top: 5, right: 14, width: 8, height: 8, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
      </div>

      {/* === STOREFRONT WINDOW === */}
      <div style={{ position: 'relative', padding: '0 24px 0' }}>
        <svg viewBox="0 0 1100 190" width="100%" height="190" preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
          <defs>
            <linearGradient id="ssWinFrame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="1088" height="172" rx="14" ry="14"
            fill="#fff7e6" stroke="url(#ssWinFrame)" strokeWidth="10" strokeLinejoin="round" />
          <rect x="0" y="162" width="1100" height="22" rx="4" fill="url(#ssWinFrame)" />
          <rect x="20" y="20" width="1060" height="142" fill="#bfe2f4" />
          {/* clouds */}
          <ellipse cx="240" cy="135" rx="34" ry="11" fill="#fff" opacity=".95" />
          <ellipse cx="262" cy="128" rx="22" ry="9"  fill="#fff" opacity=".95" />
          <ellipse cx="640" cy="128" rx="38" ry="12" fill="#fff" opacity=".95" />
          <ellipse cx="666" cy="120" rx="24" ry="10" fill="#fff" opacity=".95" />
          <ellipse cx="430" cy="148" rx="28" ry="9"  fill="#fff" opacity=".9" />
          {/* sun */}
          <circle cx="1015" cy="42" r="22" fill="#ffd97a" opacity=".95" />
          <circle cx="1015" cy="42" r="22" fill="none" stroke="#f5b945" strokeWidth="2" opacity=".5" />
          {/* birds */}
          <path d="M520 142 q6 -6 12 0 q6 -6 12 0" stroke="#5a7385" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M820 150 q5 -5 10 0 q5 -5 10 0"  stroke="#5a7385" strokeWidth="2"   fill="none" strokeLinecap="round" />
          {/* OPEN sign */}
          <g transform="translate(70 136)">
            <line x1="0" y1="-26" x2="0" y2="-12" stroke="#451a03" strokeWidth="1.5" />
            <circle cx="0" cy="-26" r="2" fill="#451a03" />
            <g transform="rotate(-3)">
              <rect x="-36" y="-12" width="72" height="30" rx="5" fill="#fff7e6" stroke="#92400e" strokeWidth="3" />
              <circle cx="-30" cy="-6" r="1.6" fill="#92400e" />
              <circle cx="30" cy="-6" r="1.6" fill="#92400e" />
              <text x="0" y="9" fontFamily="'Gaegu', cursive" fontSize="20" fontWeight="700" fill="#92400e" textAnchor="middle"
                style={{ letterSpacing: '.04em' }}>OPEN</text>
            </g>
          </g>
          {/* Potted plant */}
          <g transform="translate(1010 138)">
            <ellipse cx="-16" cy="-14" rx="8" ry="16" fill="#5b8c3e" transform="rotate(-28 -16 -14)" opacity=".95" />
            <ellipse cx="16"  cy="-15" rx="8" ry="18" fill="#6ba348" transform="rotate(26 16 -15)" opacity=".95" />
            <ellipse cx="-4"  cy="-22" rx="9" ry="22" fill="#7cb854" opacity=".95" />
            <ellipse cx="9"   cy="-18" rx="7" ry="16" fill="#8ec964" transform="rotate(12 9 -18)" opacity=".95" />
            <ellipse cx="-10" cy="-9"  rx="6" ry="11" fill="#4f7a36" transform="rotate(-50 -10 -9)" opacity=".9" />
            <path d="M-16 -28 Q-16 -16 -16 -4" stroke="#3d5f29" strokeWidth="1" fill="none" opacity=".5" />
            <path d="M16 -30 Q16 -17 16 -5"   stroke="#3d5f29" strokeWidth="1" fill="none" opacity=".5" />
            <path d="M-4 -42 Q-4 -22 -4 -4"   stroke="#3d5f29" strokeWidth="1" fill="none" opacity=".5" />
            <path d="M-22 0 L22 0 L20 4 L-20 4 Z" fill="#c97b4d" />
            <path d="M-20 4 L20 4 L17 24 L-17 24 Z" fill="#b46339" />
            <path d="M-16 5 Q-14 14 -15 22" stroke="#d99064" strokeWidth="2" fill="none" opacity=".7" />
          </g>
        </svg>

        {/* Awning row — hangs from the wooden beam, over the window */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
          display: 'flex', justifyContent: 'center', gap: 0, padding: '0 24px',
        }}>
          {SUPPLIES_DEPARTMENTS.map(d => {
            const active = dept === d.key;
            const hover = hoverDept === d.key && !active;
            const [c1, c2] = SS_AWNING_COLORS[d.key];
            return (
              <button key={d.key}
                onClick={() => setDept(d.key)}
                onMouseEnter={() => setHoverDept(d.key)}
                onMouseLeave={() => setHoverDept(null)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: 0, fontFamily: 'inherit',
                  width: 180,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  position: 'relative',
                  marginTop: active ? 0 : (hover ? -3 : -8),
                  transition: 'margin-top 220ms cubic-bezier(.34,1.56,.64,1)',
                }}>
                <div style={{
                  width: '88%',
                  height: active ? 64 : (hover ? 56 : 48),
                  background: `repeating-linear-gradient(90deg, ${c1} 0 18px, #fff 18px 36px)`,
                  border: '3px solid #92400e',
                  borderTop: 'none', borderBottom: 'none',
                  boxShadow: hover
                    ? 'inset 0 4px 0 rgba(255,255,255,.55), 0 4px 8px -2px rgba(0,0,0,.18)'
                    : 'inset 0 4px 0 rgba(255,255,255,.4)',
                  transition: 'height 220ms ease, box-shadow 200ms ease',
                }} />
                <svg width="100%" height="22" viewBox="0 0 180 22" preserveAspectRatio="none" style={{ display: 'block', marginTop: -1 }}>
                  <path d={`M 4 0 ${[0,1,2,3,4,5].map(i => `Q ${10 + i*30} 24 ${20 + i*30} 0`).join(' ')} L 176 0 L 176 -2 L 4 -2 Z`}
                    fill={c1} stroke="#92400e" strokeWidth="3" />
                </svg>
                <div style={{
                  marginTop: 8,
                  background: active ? '#fff' : c2,
                  border: '2px solid #92400e', borderRadius: 12,
                  padding: '6px 14px',
                  fontSize: 18, fontWeight: 700, color: '#7c2d12',
                  boxShadow: active
                    ? '0 6px 10px -2px rgba(0,0,0,.3)'
                    : (hover ? '0 6px 12px -2px rgba(0,0,0,.28)' : '0 3px 6px rgba(0,0,0,.22)'),
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 6,
                  transform: hover ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
                  transition: 'transform 200ms cubic-bezier(.34,1.56,.64,1), box-shadow 200ms ease, background 160ms ease',
                }}>
                  <span style={{ fontSize: 20 }}>{d.emoji}</span>{d.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aisle title plaque */}
      <div style={{
        maxWidth: 1080, margin: '34px auto 28px', padding: '0 32px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #d97706 0%, #b45309 100%)',
          border: '3px solid #451a03', borderRadius: 8,
          padding: '8px 18px 10px',
          boxShadow: '0 6px 10px -2px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.2), inset 0 -2px 0 rgba(0,0,0,.3)',
          fontSize: 14, fontWeight: 700, color: '#fef3c7',
          textTransform: 'uppercase', letterSpacing: '.14em',
          transform: 'rotate(-1deg)',
        }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 6,
            background: 'repeating-linear-gradient(180deg, transparent 0 5px, rgba(0,0,0,.06) 5px 6px)',
            pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 4, left: 4, width: 6, height: 6, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
          <div style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
          AISLE {SUPPLIES_DEPARTMENTS.findIndex(x => x.key === dept) + 1}
        </div>
        <h2 style={{ margin: 0, fontSize: 44, fontWeight: 700, color: '#451a03', lineHeight: 1,
          textShadow: '2px 2px 0 rgba(255,255,255,.5)' }}>
          {meta.label}
        </h2>
        <div style={{ flex: 1, height: 6,
          background: 'linear-gradient(180deg, #b45309 0%, #78350f 100%)', borderRadius: 3,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(0,0,0,.3)' }} />
        <div style={{
          background: 'linear-gradient(180deg, #fef3c7 0%, #fbbf24 100%)',
          border: '3px solid #92400e', borderRadius: 999,
          padding: '6px 16px',
          fontSize: 20, fontWeight: 700, color: '#7c2d12',
          boxShadow: '0 6px 10px rgba(0,0,0,.3), inset 0 2px 0 rgba(255,255,255,.5)',
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
        }}>🪙 {coins}</div>
      </div>
      <div style={{ maxWidth: 1080, margin: '0 auto 32px', padding: '0 32px',
        fontSize: 18, color: '#78350f', fontStyle: 'italic' }}>
        {meta.tagline}
      </div>

      {/* === SHELVES OF CRATES === */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 32px' }}>
        {shelves.map((row, sIdx) => (
          <div key={sIdx} style={{ marginBottom: 60 }}>
            <SSWoodShelf>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.max(row.length, 4)}, 1fr)`,
                gap: 24, padding: '0 12px', alignItems: 'end',
              }}>
                {row.map((it, i) => {
                  const idx = sIdx * 4 + i;
                  const tilt = (idx % 4 === 0) ? -1.5 : (idx % 4 === 1) ? 1 : (idx % 4 === 2) ? -0.5 : 1.5;
                  const isHover = hoverCrate === it.name;
                  const owned = ownedCount(it.name);
                  const sellPrice = Math.max(1, Math.floor(it.price / 2));
                  const affordable = coins >= it.price;
                  return (
                    <div key={it.name}
                      onMouseEnter={() => setHoverCrate(it.name)}
                      onMouseLeave={() => setHoverCrate(null)}
                      style={{
                        position: 'relative',
                        background: 'linear-gradient(180deg, #d97706 0%, #b45309 100%)',
                        borderRadius: 10, padding: 12,
                        boxShadow: isHover
                          ? '0 28px 36px -10px rgba(69,26,3,.55), 0 14px 18px -6px rgba(69,26,3,.4), inset 0 2px 0 rgba(255,255,255,.25), inset 0 -3px 0 rgba(69,26,3,.3)'
                          : '0 22px 28px -8px rgba(69,26,3,.5), 0 10px 14px -4px rgba(69,26,3,.35), inset 0 2px 0 rgba(255,255,255,.2), inset 0 -3px 0 rgba(69,26,3,.3)',
                        transform: `rotate(${isHover ? 0 : tilt}deg) translateY(${isHover ? -6 : 0}px)`,
                        transition: 'all 200ms cubic-bezier(.34,1.56,.64,1)',
                      }}>
                      <div style={{
                        position: 'absolute', inset: 12, borderRadius: 4,
                        backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 22px, rgba(0,0,0,.18) 22px 24px, transparent 24px 26px)',
                        pointerEvents: 'none',
                      }} />
                      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
                        <div key={j} style={{
                          position: 'absolute', [v]: 6, [h]: 6, width: 8, height: 8, borderRadius: '50%',
                          background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
                          boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.4)',
                          pointerEvents: 'none',
                        }} />
                      ))}
                      {owned > 0 && (
                        <div style={{
                          position: 'absolute', top: -10, left: -8, zIndex: 3,
                          transform: 'rotate(-9deg)',
                          background: 'linear-gradient(180deg, #fef9c3 0%, #fde68a 100%)',
                          border: '2px solid #451a03', borderRadius: 6,
                          padding: '4px 10px 5px',
                          fontSize: 13, fontWeight: 700, color: '#7c2d12',
                          letterSpacing: '.06em', textTransform: 'uppercase',
                          boxShadow: '0 4px 6px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.5)',
                          display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%',
                            background: 'radial-gradient(circle at 30% 30%, #fef3c7, #1c1917)' }} />
                          Owned ×{owned}
                        </div>
                      )}
                      <div style={{
                        background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
                        borderRadius: 6, padding: '24px 14px 18px',
                        position: 'relative',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,.18)',
                        textAlign: 'center',
                      }}>
                        <div style={{ fontSize: 64, lineHeight: 1, filter: 'drop-shadow(0 4px 5px rgba(0,0,0,.22))' }}>
                          {it.emoji}
                        </div>
                        <div style={{
                          marginTop: 14,
                          background: '#fff', border: '2px solid #451a03', borderRadius: 6,
                          padding: '6px 8px 8px',
                          position: 'relative',
                          boxShadow: '0 2px 4px rgba(0,0,0,.15)',
                        }}>
                          <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                          <div style={{ position: 'absolute', top: 3, right: 3, width: 5, height: 5, borderRadius: '50%', background: '#451a03' }} />
                          <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', lineHeight: 1.1 }}>
                            {it.name}
                          </div>
                          <div style={{ fontSize: 12, color: '#78716c', fontStyle: 'italic', marginTop: 2, lineHeight: 1.2 }}>
                            {it.blurb}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        marginTop: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 8, padding: '0 4px',
                        position: 'relative', zIndex: 2,
                      }}>
                        <div style={{
                          background: '#fef08a', border: '2px solid #451a03', borderRadius: 999,
                          padding: '4px 12px',
                          fontSize: 16, fontWeight: 700, color: '#7c2d12',
                          transform: 'rotate(-3deg)',
                          boxShadow: '0 2px 4px rgba(0,0,0,.2)',
                          whiteSpace: 'nowrap', flexShrink: 0,
                        }}>🪙 {it.price}</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          {owned > 0 && onSell && (
                            <button className="ss-btn-sell" onClick={() => onSell(it, dept)} title={`Sell for 🪙 ${sellPrice}`} style={{
                              background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
                              color: '#7c2d12', border: '2px solid #92400e', borderRadius: 999,
                              padding: '4px 12px', fontSize: 14, fontWeight: 700,
                              fontFamily: 'inherit', cursor: 'pointer',
                              boxShadow: '0 3px 5px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.5)',
                              display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                            }}>Sell <span style={{ fontSize: 12, opacity: .85 }}>🪙{sellPrice}</span></button>
                          )}
                          <button className="ss-btn-add"
                            disabled={!affordable}
                            onClick={() => affordable && onBuy?.(it, dept)} style={{
                            background: 'linear-gradient(180deg, #ec4899 0%, #be185d 100%)',
                            color: '#fff', border: 'none', borderRadius: 999,
                            padding: '6px 16px', fontSize: 16, fontWeight: 700,
                            fontFamily: 'inherit', cursor: affordable ? 'pointer' : 'not-allowed',
                            boxShadow: '0 4px 6px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.4)',
                            textShadow: '0 1px 0 rgba(0,0,0,.2)',
                          }}>Add</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {Array.from({ length: Math.max(0, 4 - row.length) }).map((_, k) => (
                  <div key={`spacer-${k}`} />
                ))}
              </div>
            </SSWoodShelf>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { SuppliesStore, SUPPLIES_CATALOG, SUPPLIES_DEPARTMENTS, SUPPLIES_FEATURED });
