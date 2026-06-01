// Button.jsx — primary/secondary/tertiary/danger/warning × sm/md/lg
// Two families:
//   - flat (default): used by debug screens. minimal styling.
//   - tactile (pass `tactile` prop): in-game style — warm brown border, gradient body,
//     4px lower-shelf shadow, inset top highlight, depresses on click.

const TACTILE_VARIANTS = {
  primary: {
    bg: 'linear-gradient(180deg,#ec4899 0%,#db2777 100%)',
    hoverBg: 'linear-gradient(180deg,#f472b6 0%,#db2777 100%)',
    color: '#fff',
  },
  secondary: {
    bg: 'linear-gradient(180deg,#34d399 0%,#178740 100%)',
    hoverBg: 'linear-gradient(180deg,#6ee7b7 0%,#178740 100%)',
    color: '#fff',
  },
  tertiary: {
    bg: 'linear-gradient(180deg,#fffbeb 0%,#fde68a 100%)',
    hoverBg: 'linear-gradient(180deg,#fffbeb 0%,#fcd34d 100%)',
    color: '#7c2d12',
  },
  warning: {
    bg: 'linear-gradient(180deg,#fbbf24 0%,#ea580c 100%)',
    hoverBg: 'linear-gradient(180deg,#fcd34d 0%,#ea580c 100%)',
    color: '#fff',
  },
  danger: {
    bg: 'linear-gradient(180deg,#f87171 0%,#dc2626 100%)',
    hoverBg: 'linear-gradient(180deg,#fca5a5 0%,#dc2626 100%)',
    color: '#fff',
  },
  violet: {
    bg: 'linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%)',
    hoverBg: 'linear-gradient(180deg,#c4b5fd 0%,#7c3aed 100%)',
    color: '#fff',
  },
};

// Pill-shaped sizes — fully rounded, matches FAB language
const TACTILE_SIZES = {
  sm: { fontSize: 13, padding: '0 14px', height: 36, borderRadius: 999 },
  md: { fontSize: 14, padding: '0 18px', height: 44, borderRadius: 999 },
  lg: { fontSize: 15, padding: '0 22px', height: 52, borderRadius: 999 },
};

// Inject tactile press styles + ::before highlight overlay once per page
let __tactileStylesInjected = false;
function ensureTactileStyles() {
  if (__tactileStylesInjected || typeof document === 'undefined') return;
  __tactileStylesInjected = true;
  const s = document.createElement('style');
  s.textContent = `
    .gp-btn--tactile {
      position: relative;
      transition: transform 100ms ease, filter 120ms ease, box-shadow 150ms ease, background 150ms ease;
      text-shadow: 0 1px 0 rgba(0,0,0,.18);
    }
    .gp-btn--tactile.tertiary { text-shadow: none; }
    .gp-btn--tactile::before {
      content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: linear-gradient(180deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,0) 50%);
    }
    .gp-btn--tactile:not([disabled]):hover {
      transform: translateY(-1px);
      filter: brightness(1.04);
    }
    .gp-btn--tactile:not([disabled]):active {
      transform: translateY(2px);
      box-shadow: var(--gp-btn-shadow-pressed) !important;
    }
    .gp-btn--tactile[disabled] { opacity: .5; cursor: not-allowed; filter: grayscale(.3); }
  `;
  document.head.appendChild(s);
}

const Button = ({ variant = 'primary', size = 'md', tactile = false, children, onClick, disabled, style }) => {
  if (tactile) {
    ensureTactileStyles();
    const v = TACTILE_VARIANTS[variant] || TACTILE_VARIANTS.primary;
    const sz = TACTILE_SIZES[size] || TACTILE_SIZES.md;
    const shadow = '0 10px 15px -3px rgba(0,0,0,.25), 0 4px 6px -2px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.35)';
    const shadowPressed = '0 4px 6px -2px rgba(0,0,0,.25), 0 2px 4px -1px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.25)';
    return (
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`gp-btn--tactile ${variant}`}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, fontFamily: 'var(--font-family-body)', fontWeight: 600,
          border: 'none',
          background: v.bg, color: v.color,
          ...sz,
          boxShadow: shadow,
          ['--gp-btn-shadow-pressed']: shadowPressed,
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...style,
        }}
      >{children}</button>
    );
  }

  // Flat (debug)
  const btnStyles = {
    base: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 6, fontWeight: 500, border: '1px solid transparent', cursor: 'pointer',
      fontFamily: 'var(--font-family-body)', transition: 'all 150ms ease-in-out',
      userSelect: 'none',
    },
    sm: { fontSize: 14, padding: '6px 10px', minHeight: 36, borderRadius: 4 },
    md: { fontSize: 16, padding: '12px 16px', minHeight: 44, borderRadius: 6 },
    lg: { fontSize: 18, padding: '16px 24px', minHeight: 48, borderRadius: 8 },
    primary:   { background: '#db2777', borderColor: '#db2777', color: '#fff' },
    secondary: { background: '#178740', borderColor: '#178740', color: '#fff' },
    tertiary:  { background: 'transparent', borderColor: '#94a3b8', color: '#1e293b' },
    danger:    { background: '#dc2626', borderColor: '#dc2626', color: '#fff' },
    warning:   { background: '#ea580c', borderColor: '#ea580c', color: '#fff' },
    ghost:     { background: 'transparent', borderColor: 'transparent', color: '#1e293b' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...btnStyles.base, ...btnStyles[size], ...btnStyles[variant],
        opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >{children}</button>
  );
};

const Badge = ({ variant = 'primary', children, style }) => {
  const bg = {
    primary: '#db2777', secondary: '#cbd5e1', success: '#178740',
    info: '#2563eb', warning: '#ea580c', danger: '#dc2626',
    seasonal: '#10b981',
  }[variant];
  const color = variant === 'secondary' ? '#0f172a' : '#fff';
  return (
    <span style={{
      display: 'inline-block', padding: '4px 8px', fontSize: '.75rem',
      fontWeight: 600, lineHeight: 1, borderRadius: 3, textTransform: 'uppercase',
      letterSpacing: '.5px', background: bg, color, ...style,
    }}>{children}</span>
  );
};

Object.assign(window, { Button, Badge });
