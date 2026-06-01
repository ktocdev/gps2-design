// PigSvg.jsx — breed-specific SVG illustrations with parameterized fur colors.
// Used in place of 🐹 emoji in the pet store and (optionally) habitat.
//
// Props:
//   breed: 'American' | 'Abyssinian' | 'Peruvian' | 'Teddy' | 'Silkie'
//   colors: array of hex strings (1–3). First is the primary body color;
//           additional colors are painted as large patches.
//   size: px

const FUR_NAME_TO_HEX = {
  White:    '#f5f5f0',
  Black:    '#2a2520',
  Brown:    '#8b5a2b',
  Cream:    '#f5e6c8',
  Tortoise: '#b8651e',
  Tricolor: '#d9b27c',
  Orange:   '#e8862a',
  Gray:     '#8a8a86',
};

const resolveColors = (colors) =>
  colors.map(c => FUR_NAME_TO_HEX[c] || c);

// Reusable parts
const Eye = ({ cx, cy, r = 3 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#1a1510" />
    <circle cx={cx - 0.8} cy={cy - 0.8} r={r * 0.35} fill="#fff" opacity=".9" />
  </g>
);

const Nose = ({ cx, cy }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx="3" ry="2" fill="#d88" />
    <path d={`M ${cx} ${cy + 1.5} V ${cy + 4}`} stroke="#7a4040" strokeWidth="1" strokeLinecap="round" />
  </g>
);

// Patch color overlay — second/third fur colors appear as organic splotches
const Patches = ({ colors }) => {
  if (colors.length < 2) return null;
  return (
    <g>
      {colors.length >= 2 && (
        <ellipse cx="85" cy="55" rx="22" ry="14" fill={colors[1]} opacity=".92" />
      )}
      {colors.length >= 3 && (
        <ellipse cx="52" cy="72" rx="14" ry="9" fill={colors[2]} opacity=".92" />
      )}
    </g>
  );
};

// --- American (smooth, short-haired, classic rounded body) ---
const AmericanBody = ({ colors }) => (
  <g>
    <ellipse cx="70" cy="62" rx="48" ry="28" fill={colors[0]} />
    <Patches colors={colors} />
    {/* head */}
    <ellipse cx="108" cy="50" rx="22" ry="20" fill={colors[0]} />
    {/* ears */}
    <ellipse cx="98" cy="33" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="98" cy="33" rx="3" ry="2.5" fill="#e8a9a9" />
    <ellipse cx="118" cy="33" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="118" cy="33" rx="3" ry="2.5" fill="#e8a9a9" />
    {/* face */}
    <Eye cx={113} cy={47} />
    <Eye cx={101} cy={47} />
    <Nose cx={107} cy={58} />
    {/* feet */}
    <ellipse cx="45" cy="88" rx="6" ry="3" fill="#4a3a2a" />
    <ellipse cx="85" cy="88" rx="6" ry="3" fill="#4a3a2a" />
  </g>
);

// --- Abyssinian (rosette whorls — short but tufted/spiky) ---
const AbyssinianBody = ({ colors }) => (
  <g>
    <ellipse cx="70" cy="62" rx="48" ry="28" fill={colors[0]} />
    <Patches colors={colors} />
    {/* rosettes */}
    {[[45,50],[70,55],[95,60],[55,75],[85,75]].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="7" fill="none" stroke={colors[0]} strokeWidth="2" opacity=".5" />
        <circle cx={cx} cy={cy} r="3" fill={colors[0]} />
      </g>
    ))}
    {/* spiky outline */}
    <path d="M 25 55 L 28 48 L 32 55 L 38 46 L 45 54 L 52 44 L 60 53 L 70 42 L 82 53 L 95 44 L 105 54"
          fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" />
    {/* head */}
    <ellipse cx="108" cy="50" rx="22" ry="20" fill={colors[0]} />
    <ellipse cx="98" cy="33" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="98" cy="33" rx="3" ry="2.5" fill="#e8a9a9" />
    <ellipse cx="118" cy="33" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="118" cy="33" rx="3" ry="2.5" fill="#e8a9a9" />
    <Eye cx={113} cy={47} />
    <Eye cx={101} cy={47} />
    <Nose cx={107} cy={58} />
    <ellipse cx="45" cy="88" rx="6" ry="3" fill="#4a3a2a" />
    <ellipse cx="85" cy="88" rx="6" ry="3" fill="#4a3a2a" />
  </g>
);

// --- Peruvian (long hair cascading over body and face) ---
const PeruvianBody = ({ colors }) => (
  <g>
    <ellipse cx="70" cy="62" rx="48" ry="28" fill={colors[0]} />
    <Patches colors={colors} />
    {/* head (partially obscured by hair) */}
    <ellipse cx="108" cy="50" rx="22" ry="20" fill={colors[0]} />
    {/* ears poking up through hair */}
    <ellipse cx="98" cy="32" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="98" cy="32" rx="3" ry="2.5" fill="#e8a9a9" />
    <ellipse cx="118" cy="32" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="118" cy="32" rx="3" ry="2.5" fill="#e8a9a9" />
    {/* long flowing hair — wavy bottom edge */}
    <path d="M 22 62 Q 30 98 40 94 Q 50 100 60 92 Q 70 102 80 94 Q 90 100 100 92 Q 110 100 120 94 Q 118 82 118 62 Z"
          fill={colors[0]} />
    {/* face hair fringe — parted to reveal eyes */}
    <path d="M 86 36 Q 92 48 98 44 Q 102 42 108 42 Q 114 42 118 44 Q 124 48 130 38 Q 128 52 122 56 Q 118 58 108 58 Q 98 58 94 56 Q 88 52 86 36 Z"
          fill={colors[0]} opacity=".95" />
    {/* peek-through eyes between fringe parts */}
    <Eye cx={101} cy={48} r={2.5} />
    <Eye cx={115} cy={48} r={2.5} />
    <Nose cx={108} cy={62} />
    <ellipse cx="45" cy="88" rx="6" ry="3" fill="#4a3a2a" />
    <ellipse cx="85" cy="88" rx="6" ry="3" fill="#4a3a2a" />
  </g>
);

// --- Teddy (short dense plush fur — fluffy silhouette) ---
const TeddyBody = ({ colors }) => (
  <g>
    {/* scalloped fluffy outline */}
    <path d="M 24 62 Q 24 50 34 48 Q 40 38 52 42 Q 62 34 72 40 Q 84 32 96 42 Q 108 36 116 48 Q 120 60 116 72 Q 118 84 108 86 Q 100 94 88 88 Q 78 94 68 88 Q 58 94 48 88 Q 36 92 28 82 Q 22 74 24 62 Z"
          fill={colors[0]} />
    <Patches colors={colors} />
    {/* head bump */}
    <ellipse cx="108" cy="50" rx="20" ry="18" fill={colors[0]} />
    <ellipse cx="98" cy="35" rx="5" ry="4" fill={colors[0]} />
    <ellipse cx="118" cy="35" rx="5" ry="4" fill={colors[0]} />
    <Eye cx={113} cy={47} />
    <Eye cx={101} cy={47} />
    <Nose cx={107} cy={58} />
    <ellipse cx="45" cy="88" rx="6" ry="3" fill="#4a3a2a" />
    <ellipse cx="85" cy="88" rx="6" ry="3" fill="#4a3a2a" />
  </g>
);

// --- Silkie (long silky hair, no front part — sleek flowing coat) ---
const SilkieBody = ({ colors }) => (
  <g>
    <ellipse cx="70" cy="62" rx="48" ry="28" fill={colors[0]} />
    <Patches colors={colors} />
    {/* long silky coat */}
    <path d="M 22 58 Q 26 96 38 92 Q 52 100 68 92 Q 84 100 98 92 Q 112 96 118 88 Q 120 74 118 58 Z"
          fill={colors[0]} opacity=".95" />
    {/* silky highlights */}
    <path d="M 40 80 Q 55 94 70 82" fill="none" stroke="#fff" strokeWidth="1" opacity=".25" />
    <path d="M 70 82 Q 85 94 100 80" fill="none" stroke="#fff" strokeWidth="1" opacity=".25" />
    {/* head (no fringe) */}
    <ellipse cx="108" cy="50" rx="22" ry="20" fill={colors[0]} />
    <ellipse cx="98" cy="33" rx="6" ry="5" fill={colors[0]} />
    <ellipse cx="118" cy="33" rx="6" ry="5" fill={colors[0]} />
    <Eye cx={113} cy={47} />
    <Eye cx={101} cy={47} />
    <Nose cx={107} cy={58} />
    <ellipse cx="45" cy="88" rx="6" ry="3" fill="#4a3a2a" />
    <ellipse cx="85" cy="88" rx="6" ry="3" fill="#4a3a2a" />
  </g>
);

const BREED_BODY = {
  American: AmericanBody,
  Abyssinian: AbyssinianBody,
  Peruvian: PeruvianBody,
  Teddy: TeddyBody,
  Silkie: SilkieBody,
};

const PigSvg = ({ breed = 'American', colors = ['#f5e6c8'], size = 56, style }) => {
  const Body = BREED_BODY[breed] || AmericanBody;
  const hex = resolveColors(colors);
  return (
    <svg
      viewBox="0 0 140 100" width={size} height={size * (100/140)}
      style={{ display: 'block', flex: 'none', ...style }}
      aria-label={`${breed} guinea pig`}>
      {/* soft ground shadow */}
      <ellipse cx="70" cy="93" rx="42" ry="4" fill="#000" opacity=".1" />
      <Body colors={hex} />
    </svg>
  );
};

Object.assign(window, { PigSvg, FUR_NAME_TO_HEX });
