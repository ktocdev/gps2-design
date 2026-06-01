// PetStoreBackdrop.jsx — pet-shop scenery scattered behind the "Meet your new piggies"
// screen. All shapes are inline SVG, no external assets. Components are positioned
// absolute inside the parent (which must be position: relative + overflow: hidden).
//
// Vibe: warm, hand-drawn-ish, soft tones that don't compete with the foreground cages.
// Everything is rendered with low opacity / desaturated palette so it reads as background.

// ─── Individual SVG illustrations ────────────────────────────────────────────

// A potted plant — a chunky terracotta pot with leafy fronds.
const PottedPlant = ({ size = 160 }) => (
  <svg viewBox="0 0 120 160" width={size} height={size * (160/120)} aria-hidden="true">
    {/* Leaves — layered fronds */}
    <g transform="translate(60 78)">
      <ellipse cx="-22" cy="-30" rx="14" ry="34" fill="#5b8c3e" transform="rotate(-30 -22 -30)" opacity=".95" />
      <ellipse cx="22"  cy="-32" rx="14" ry="36" fill="#6ba348" transform="rotate(28  22 -32)" opacity=".95" />
      <ellipse cx="-6"  cy="-38" rx="13" ry="40" fill="#7cb854" opacity=".95" />
      <ellipse cx="12"  cy="-40" rx="11" ry="34" fill="#8ec964" transform="rotate(14 12 -40)" opacity=".95" />
      <ellipse cx="-14" cy="-20" rx="10" ry="22" fill="#4f7a36" transform="rotate(-50 -14 -20)" opacity=".9" />
      {/* Vein hints */}
      <path d="M-22 -54 Q-22 -30 -22 -8" stroke="#3d5f29" strokeWidth="1.2" fill="none" opacity=".5" />
      <path d="M22 -56 Q22 -32 22 -10"   stroke="#3d5f29" strokeWidth="1.2" fill="none" opacity=".5" />
      <path d="M-6 -74 Q-6 -42 -6 -10"   stroke="#3d5f29" strokeWidth="1.2" fill="none" opacity=".5" />
    </g>
    {/* Pot rim */}
    <path d="M16 80 L104 80 L100 90 L20 90 Z" fill="#c97b4d" />
    {/* Pot body — trapezoid */}
    <path d="M22 90 L98 90 L92 148 L28 148 Z" fill="#b46339" />
    <path d="M22 90 L98 90 L92 148 L28 148 Z" fill="url(#potShade)" opacity=".4" />
    {/* highlight */}
    <path d="M28 92 Q34 100 32 144" stroke="#d99064" strokeWidth="3" fill="none" opacity=".7" />
    <defs>
      <linearGradient id="potShade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity=".25" />
        <stop offset="50%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity=".35" />
      </linearGradient>
    </defs>
  </svg>
);

// A window with mullions, blue sky, and a bird silhouette.
const Window = ({ size = 220 }) => (
  <svg viewBox="0 0 220 240" width={size} height={size * (240/220)} aria-hidden="true">
    {/* Frame outer */}
    <rect x="6" y="6" width="208" height="228" rx="6" fill="#fff7e6" stroke="#92400e" strokeWidth="6" />
    {/* Sill */}
    <rect x="0" y="222" width="220" height="14" rx="3" fill="#92400e" />
    {/* Sky panes */}
    <rect x="18" y="18" width="88" height="98" fill="#bfe2f4" />
    <rect x="114" y="18" width="88" height="98" fill="#bfe2f4" />
    <rect x="18" y="124" width="88" height="98" fill="#a9d6ec" />
    <rect x="114" y="124" width="88" height="98" fill="#a9d6ec" />
    {/* Mullions */}
    <rect x="104" y="14" width="12" height="212" fill="#fff7e6" stroke="#92400e" strokeWidth="3" />
    <rect x="14" y="116" width="192" height="10" fill="#fff7e6" stroke="#92400e" strokeWidth="3" />
    {/* Clouds */}
    <ellipse cx="46" cy="46" rx="18" ry="7" fill="#fff" opacity=".9" />
    <ellipse cx="58" cy="42" rx="12" ry="6" fill="#fff" opacity=".9" />
    <ellipse cx="156" cy="62" rx="20" ry="8" fill="#fff" opacity=".9" />
    {/* Bird */}
    <path d="M150 38 q5 -5 10 0 q5 -5 10 0" stroke="#5a7385" strokeWidth="2" fill="none" />
    {/* Sun glow */}
    <circle cx="180" cy="40" r="14" fill="#ffd97a" opacity=".7" />
  </svg>
);

// "Pet store contraband" — a cardboard CUBE stuffed with treats. Drawn in oblique
// projection: front face + slanted right side + an open top whose interior is visible
// as a parallelogram opening. Items inside (chew sticks, apple, hay bundle) are clipped
// to the union of (everything above the back rim) ∪ (the top opening), so the front and
// side walls properly mask the parts of each item that should be inside the box.
//
// Geometry (in the 200×170 viewBox):
//   front face:   (30,60)→(170,60)→(170,150)→(30,150)
//   right side:   (170,60)→(185,45)→(185,135)→(170,150)
//   top opening:  (30,60)→(170,60)→(185,45)→(45,45)         ← parallelogram
//   back-rim line is y=45 (left x=45, right x=185)
const PetStoreContraband = ({ size = 180 }) => (
  <svg viewBox="0 0 200 170" width={size} height={size * (170/200)} aria-hidden="true">
    <defs>
      <linearGradient id="treatsBoxFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="#c79b6a" />
        <stop offset="100%" stopColor="#9a6c43" />
      </linearGradient>
      <linearGradient id="treatsBoxSide" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="#a87a4f" />
        <stop offset="100%" stopColor="#754f2e" />
      </linearGradient>
      {/* Items show only above the back rim (y<45) OR inside the top opening
          parallelogram. Drawn as a single non-self-intersecting polygon: a big
          rectangle covering everything above y=45, with the parallelogram
          opening dipping down out of its bottom edge. */}
      <clipPath id="treatsBoxClip">
        <path d="M-200,-200 L400,-200 L400,45 L185,45 L170,60 L30,60 L45,45 L-200,45 Z" />
      </clipPath>
    </defs>

    {/* Inside back wall — visible through the top opening, darkened so it reads
        as "interior shadow." A second darker strip near the front lip adds depth. */}
    <path d="M30,60 L170,60 L185,45 L45,45 Z" fill="#3d2410" />
    <path d="M30,60 L170,60 L177,52 L37,52 Z" fill="#52331a" opacity=".7" />

    {/* Items — clipped to the visible volume so the front/side walls mask them */}
    <g clipPath="url(#treatsBoxClip)">
      {/* Hay bundle — sitting in the back-right of the box, top poking out */}
      <g transform="translate(112 22) rotate(8)">
        <rect x="0" y="0" width="40" height="34" fill="#e3c17a" rx="2" />
        <line x1="2" y1="6"  x2="38" y2="6"  stroke="#b89546" strokeWidth="1" />
        <line x1="2" y1="14" x2="38" y2="14" stroke="#b89546" strokeWidth="1" />
        <line x1="2" y1="22" x2="38" y2="22" stroke="#b89546" strokeWidth="1" />
        <line x1="2" y1="30" x2="38" y2="30" stroke="#b89546" strokeWidth="1" />
        {/* Twine */}
        <rect x="14" y="-3" width="6" height="40" fill="#8b5a2b" opacity=".7" />
      </g>
      {/* Chew sticks — leaning out the back-left */}
      <rect x="50" y="14" width="6" height="50" fill="#a87445" transform="rotate(-14 53 39)" />
      <rect x="60" y="10" width="6" height="52" fill="#bd8a55" transform="rotate(-6 63 36)" />
      {/* Apple — peeking just over the front rim */}
      <circle cx="44" cy="52" r="11" fill="#d94a4a" />
      <path d="M44 41 q2 -6 6 -6" stroke="#5b8c3e" strokeWidth="2" fill="none" />
      <ellipse cx="41" cy="48" rx="2" ry="3" fill="#fff" opacity=".5" />
    </g>

    {/* Right side face — slanted up-right to suggest depth */}
    <path d="M170,60 L185,45 L185,135 L170,150 Z" fill="url(#treatsBoxSide)" />
    {/* Right side top-edge highlight (the cardboard rim's top crease) */}
    <path d="M170,60 L185,45" stroke="#dcb380" strokeWidth="1.5" fill="none" />

    {/* Front face */}
    <path d="M30,60 L170,60 L170,150 L30,150 Z" fill="url(#treatsBoxFront)" />
    {/* Front-top rim highlight — the cardboard lip the items rest behind */}
    <path d="M30,60 L170,60" stroke="#e3c08a" strokeWidth="2.5" fill="none" />
    {/* Front-bottom shadow */}
    <path d="M30,150 L170,150" stroke="#5c3a1f" strokeWidth="1.5" fill="none" />
    {/* Vertical seam where front meets right side */}
    <path d="M170,60 L170,150" stroke="#7a5430" strokeWidth="1" fill="none" opacity=".5" />

    {/* Inner rim outline — thin band suggests cardboard thickness around the opening */}
    <path d="M33,58 L167,58 L182,46 L48,46 Z" fill="none" stroke="#dcb380" strokeWidth="1" opacity=".55" />
    <path d="M30,60 L170,60 L185,45 L45,45 Z" fill="none" stroke="#5c3a1f" strokeWidth="1.2" opacity=".65" />

    {/* TREATS label — pinned to the front face */}
    <g transform="translate(58 100) rotate(-4)">
      <rect x="0" y="0" width="80" height="22" fill="#fff7e6" stroke="#92400e" strokeWidth="2" rx="2" />
      <text x="40" y="16" textAnchor="middle" fontFamily="'Gaegu', cursive" fontSize="14" fontWeight="700" fill="#92400e">TREATS</text>
    </g>
  </svg>
);

// A simple wooden chair, side view.
const Chair = ({ size = 150 }) => (
  <svg viewBox="0 0 120 180" width={size} height={size * (180/120)} aria-hidden="true">
    {/* Back posts — left + right (extend up to form backrest frame) */}
    <rect x="20" y="20" width="10" height="148" fill="#8b5a2b" rx="2" />
    <rect x="90" y="20" width="10" height="148" fill="#8b5a2b" rx="2" />
    {/* Front legs — left + right */}
    <rect x="14" y="92" width="9" height="76" fill="#a06b34" rx="2" />
    <rect x="97" y="92" width="9" height="76" fill="#a06b34" rx="2" />
    {/* Seat */}
    <rect x="10" y="78" width="100" height="14" fill="#a87445" rx="2" />
    <rect x="10" y="78" width="100" height="14" fill="url(#seatShade)" opacity=".5" />
    {/* Backrest slats — between the two back posts */}
    <rect x="30" y="28" width="60" height="6" fill="#a87445" rx="2" />
    <rect x="30" y="42" width="60" height="6" fill="#a87445" rx="2" />
    <rect x="30" y="56" width="60" height="6" fill="#a87445" rx="2" />
    {/* Cross brace — between front legs */}
    <rect x="14" y="130" width="92" height="6" fill="#8b5a2b" rx="2" />
    {/* Seat cushion */}
    <ellipse cx="60" cy="78" rx="48" ry="6" fill="#e6b07d" opacity=".6" />
    <defs>
      <linearGradient id="seatShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity=".4" />
        <stop offset="100%" stopColor="#000" stopOpacity=".3" />
      </linearGradient>
    </defs>
  </svg>
);

// A row of empty mini "habitats" — wire cages on shelves, like a pet-shop wall.
const Habitats = ({ size = 240 }) => (
  <svg viewBox="0 0 280 180" width={size} height={size * (180/280)} aria-hidden="true">
    {/* Shelf */}
    <rect x="0" y="148" width="280" height="10" fill="#92400e" />
    <rect x="0" y="158" width="280" height="4" fill="#5c2a0a" />
    {/* Cage 1 */}
    <g transform="translate(10 60)">
      <rect x="0" y="0" width="80" height="88" fill="#fde8b8" stroke="#92400e" strokeWidth="3" rx="4" />
      {/* Bars */}
      {[12, 24, 36, 48, 60, 72].map((x, i) => (
        <line key={i} x1={x} y1="4" x2={x} y2="84" stroke="#92400e" strokeWidth="1.5" opacity=".7" />
      ))}
      {/* Bedding */}
      <rect x="3" y="74" width="74" height="12" fill="#e9c878" rx="2" />
      {/* Tiny water bottle */}
      <rect x="58" y="14" width="6" height="22" fill="#a9d6ec" stroke="#3a5a72" strokeWidth="1" rx="1" />
    </g>
    {/* Cage 2 */}
    <g transform="translate(100 50)">
      <rect x="0" y="0" width="80" height="98" fill="#fbcfe8" stroke="#92400e" strokeWidth="3" rx="4" />
      {[12, 24, 36, 48, 60, 72].map((x, i) => (
        <line key={i} x1={x} y1="4" x2={x} y2="94" stroke="#92400e" strokeWidth="1.5" opacity=".7" />
      ))}
      <rect x="3" y="84" width="74" height="12" fill="#e9c878" rx="2" />
      {/* Igloo */}
      <path d="M28 84 q12 -16 24 0 Z" fill="#fff" stroke="#92400e" strokeWidth="1.5" />
    </g>
    {/* Cage 3 */}
    <g transform="translate(190 64)">
      <rect x="0" y="0" width="80" height="84" fill="#bbf7d0" stroke="#92400e" strokeWidth="3" rx="4" />
      {[12, 24, 36, 48, 60, 72].map((x, i) => (
        <line key={i} x1={x} y1="4" x2={x} y2="80" stroke="#92400e" strokeWidth="1.5" opacity=".7" />
      ))}
      <rect x="3" y="70" width="74" height="12" fill="#e9c878" rx="2" />
      {/* Hay pile */}
      <ellipse cx="40" cy="74" rx="14" ry="5" fill="#c4a55a" />
    </g>
    {/* Shelf brackets */}
    <path d="M14 158 L14 174 L24 174" stroke="#5c2a0a" strokeWidth="3" fill="none" />
    <path d="M266 158 L266 174 L256 174" stroke="#5c2a0a" strokeWidth="3" fill="none" />
  </svg>
);

// ─── The backdrop wrapper ───────────────────────────────────────────────────

const PetStoreBackdrop = () => (
  <div aria-hidden="true" style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    {/* Window — top left, hung on the wall */}
    <div style={{ position: 'absolute', top: 24,  left: -30, opacity: 0.55, transform: 'rotate(-2deg)' }}>
      <Window size={210} />
    </div>

    {/* Habitats row — top right, like a shelf of empty starter cages */}
    <div style={{ position: 'absolute', top: 60,  right: -40, opacity: 0.5, transform: 'rotate(1.5deg)' }}>
      <Habitats size={260} />
    </div>

    {/* Potted plant — mid-left, foreground-y feel */}
    <div style={{ position: 'absolute', top: '46%', left: -50, opacity: 0.6, transform: 'rotate(-3deg)' }}>
      <PottedPlant size={170} />
    </div>

    {/* Chair — mid-right */}
    <div style={{ position: 'absolute', top: '40%', right: -20, opacity: 0.55 }}>
      <Chair size={150} />
    </div>

    {/* Contraband box — bottom left, slightly tucked off-edge */}
    <div style={{ position: 'absolute', bottom: 20, left: 30, opacity: 0.6, transform: 'rotate(-5deg)' }}>
      <PetStoreContraband size={170} />
    </div>

    {/* A second smaller potted plant — bottom right for balance */}
    <div style={{ position: 'absolute', bottom: 10, right: 20, opacity: 0.55, transform: 'rotate(5deg) scale(.78)' }}>
      <PottedPlant size={130} />
    </div>
  </div>
);

Object.assign(window, { PetStoreBackdrop, PottedPlant, PetStoreWindow: Window, PetStoreContraband, PetStoreChair: Chair, PetStoreHabitats: Habitats });
