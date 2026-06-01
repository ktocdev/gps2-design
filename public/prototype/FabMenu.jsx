// FabMenu.jsx — wooden-plaque FAB cluster + parchment notice-board popover.
// Matches the Pet Store / Supplies Store aesthetic: striped awning cap on a
// brown-bordered cream signboard, with corner pin rivets and a tilted-tag badge.
// The grid popover is a pinned-up parchment board with brass studs.

const FAB_THEMES = {
  pink:    { stripe: '#ec4899', deep: '#be185d', soft: '#fce7f3', label: 'Give Food' },
  green:   { stripe: '#84cc16', deep: '#178740', soft: '#ecfccb', label: 'Help Play' },
  violet:  { stripe: '#a78bfa', deep: '#7c3aed', soft: '#ede9fe', label: 'Give Care' },
  orange:  { stripe: '#fb923c', deep: '#ea580c', soft: '#fff1d6', label: 'Socialize' },
  cyan:    { stripe: '#22d3ee', deep: '#0891b2', soft: '#e0f7fa', label: 'Encourage' },
  rose:    { stripe: '#fb7185', deep: '#e11d48', soft: '#ffe4e6', label: '' },
  amber:   { stripe: '#fbbf24', deep: '#d97706', soft: '#fef3c7', label: '' },
  blue:    { stripe: '#60a5fa', deep: '#2563eb', soft: '#dbeafe', label: '' },
};

let __fabStylesInjected = false;
function ensureFabStyles() {
  if (__fabStylesInjected || typeof document === 'undefined') return;
  __fabStylesInjected = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes fabPlaqueSway {
      0%, 100% { transform: translateY(0) rotate(var(--gp-tilt, 0deg)); }
      50%      { transform: translateY(-1px) rotate(calc(var(--gp-tilt, 0deg) + .25deg)); }
    }
    .gp-plaque {
      transition: transform 160ms cubic-bezier(.34,1.56,.64,1), filter 140ms ease,
                  box-shadow 180ms ease;
      transform-origin: 50% -8px; /* swing from the peg */
    }
    .gp-plaque:not([disabled]):hover {
      transform: translateY(-2px) rotate(calc(var(--gp-tilt, 0deg) - .8deg));
      filter: brightness(1.04);
    }
    .gp-plaque:not([disabled]):active {
      transform: translateY(1px) rotate(calc(var(--gp-tilt, 0deg) + .6deg));
      filter: brightness(.98);
    }
    .gp-plaque-tile {
      transition: transform 140ms cubic-bezier(.34,1.56,.64,1), filter 120ms ease,
                  box-shadow 160ms ease;
    }
    .gp-plaque-tile:hover  { transform: translateY(-2px) rotate(-1deg); filter: brightness(1.05); }
    .gp-plaque-tile:active { transform: translateY(0)    rotate(0deg);  filter: brightness(.97); }
  `;
  document.head.appendChild(s);
}

// Parchment board nailed up over the scene. Brown frame, awning-stripe header
// in the FAB's theme color, brass studs in the corners, tile grid inside.
const GridPopover = ({ show, actions, theme, onSelect, onClose, anchorRect }) => {
  if (!show) return null;
  const t = FAB_THEMES[theme] || FAB_THEMES.pink;
  return (
    <React.Fragment>
      {/* backdrop to capture outside-click */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
      <PanelShell
        accent={t.stripe}
        animate={false}
        showGrain
        style={{
          position: 'absolute',
          right: anchorRect.right,
          bottom: anchorRect.bottom,
          minWidth: 252, zIndex: 45,
          animation: 'fabPop 200ms cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        }}>
          {actions.map((a, i) => {
            const tilt = (i % 4 === 0) ? -1.2 : (i % 4 === 1) ? .9 : (i % 4 === 2) ? -.5 : 1.4;
            return (
              <button key={a.id} onClick={() => { onSelect(a.id); onClose(); }}
                className="gp-plaque-tile"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '10px 6px',
                  background: `linear-gradient(180deg, #fffbeb 0%, ${t.soft} 100%)`,
                  border: `2.5px solid ${t.deep}`,
                  borderRadius: 10,
                  cursor: 'pointer', color: '#451a03',
                  fontFamily: 'inherit',
                  transform: `rotate(${tilt}deg)`,
                  boxShadow: `0 4px 6px rgba(69,26,3,.28),
                              inset 0 1px 0 rgba(255,255,255,.7),
                              inset 0 -1px 0 rgba(146,64,14,.18)`,
                }}
              >
                <span style={{ fontSize: 26, lineHeight: 1, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.15))' }}>{a.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#7c2d12', letterSpacing: '.01em' }}>{a.label}</span>
              </button>
            );
          })}
        </div>
        <style>{`@keyframes fabPop { from { opacity: 0; transform: translateY(8px) scale(.94); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      </PanelShell>
    </React.Fragment>
  );
};

// Single FAB: hanging painted-wood plaque with awning-stripe header,
// emoji on a colored "wax-seal" disc, and a tilted cream label below.
const Fab = ({ theme, icon, label, actions, onAction }) => {
  ensureFabStyles();
  const [open, setOpen] = React.useState(false);
  const t = FAB_THEMES[theme] || FAB_THEMES.pink;
  // Use the theme key as a stable seed so each FAB sits at a slightly different angle.
  const tilt = ({ pink: -1.2, green: .8, violet: -.6, orange: 1.1, cyan: -.4 })[theme] ?? 0;
  return (
    <div style={{ position: 'relative' }}>
      {/* peg above the plaque (the "nail" it hangs from) */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: -10,
        width: 10, height: 10, borderRadius: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle at 30% 30%, #fde68a 0%, #b45309 60%, #451a03 100%)',
        boxShadow: '0 2px 3px rgba(0,0,0,.35), inset 0 -1px 1px rgba(0,0,0,.3)',
        zIndex: 2,
      }} />
      <button
        title={label}
        onClick={() => setOpen(o => !o)}
        className="gp-plaque"
        style={{
          '--gp-tilt': `${tilt}deg`,
          position: 'relative',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          height: 56, paddingInline: 0, borderRadius: 12,
          border: '3px solid #92400e',
          background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
          color: '#451a03',
          fontFamily: "'Gaegu', cursive", fontWeight: 700, fontSize: 19,
          letterSpacing: '.01em',
          cursor: 'pointer', overflow: 'hidden',
          boxShadow: `0 12px 16px -4px rgba(69,26,3,.5),
                      0 5px 8px -2px rgba(69,26,3,.35),
                      inset 0 2px 0 rgba(255,255,255,.55),
                      inset 0 -2px 0 rgba(146,64,14,.3)`,
          transform: `rotate(${tilt}deg)`,
        }}
      >
        {/* Awning cap — striped header strip across the top */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, top: 0, height: 12,
          background: `repeating-linear-gradient(90deg, ${t.stripe} 0 10px, #fffbeb 10px 20px)`,
          borderBottom: '2px solid #92400e',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18)',
        }} />
        {/* corner studs */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
          <span key={j} aria-hidden="true" style={{
            position: 'absolute', [v]: 3, [h]: 5,
            width: 5, height: 5, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.45)',
            zIndex: 2,
          }} />
        ))}
        {/* paper grain hairlines */}
        <span aria-hidden="true" style={{
          position: 'absolute', inset: '14px 4px 4px',
          background: 'repeating-linear-gradient(180deg, transparent 0 6px, rgba(120,53,15,.06) 6px 7px)',
          pointerEvents: 'none', borderRadius: 4,
        }} />
        <span style={{
          position: 'relative', zIndex: 1,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          width: '100%',
          padding: '6px 16px 0',
        }}>
          {/* wax-seal emoji disc */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 34, height: 34, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, ${t.stripe}, ${t.deep})`,
            border: `2px solid ${t.deep}`,
            fontSize: 20, lineHeight: 1,
            boxShadow: `0 3px 5px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(0,0,0,.2)`,
          }}>{icon}</span>
          <span style={{ color: '#7c2d12', lineHeight: 0.875, display: 'inline-block' }}>{label}</span>
        </span>
      </button>
      <GridPopover
        show={open}
        actions={actions}
        theme={theme}
        onSelect={onAction}
        onClose={() => setOpen(false)}
        anchorRect={{ right: 0, bottom: 78 }}
      />
    </div>
  );
};

// Container that positions a cluster of FABs (bottom-center).
// Sits on a wooden display rail so the plaques have something to "hang from".
const FabCluster = ({ fabs, onAction }) => (
  <div data-tutorial="fabs" style={{
    position: 'absolute', left: '50%', bottom: 16, zIndex: 30,
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
    pointerEvents: 'none',
  }}>
    {/* wooden rail behind the plaques */}
    <div aria-hidden="true" style={{
      position: 'absolute', left: -28, right: -28, top: 4, height: 8,
      background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
      borderRadius: 4,
      boxShadow: '0 4px 6px -2px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,235,200,.25), inset 0 -1px 0 rgba(0,0,0,.4)',
    }} />
    <div style={{
      position: 'relative',
      display: 'flex', gap: 20, alignItems: 'flex-start',
      padding: '14px 8px 4px',
      pointerEvents: 'auto',
    }}>
      {fabs.map(f => (
        <Fab key={f.theme} theme={f.theme} icon={f.icon} label={f.label}
             actions={f.actions} onAction={(id) => onAction(f.theme, id)} />
      ))}
    </div>
  </div>
);

Object.assign(window, { Fab, FabCluster });
