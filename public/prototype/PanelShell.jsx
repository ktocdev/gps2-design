// PanelShell.jsx — GPS2 canonical floating panel visual shell.
//
// Provides: brown frame · striped awning header · cream parchment body ·
//           paper grain overlay · brass corner studs.
//
// Pure appearance — no positioning. Wrap in a positioned container as needed.
//
// Props:
//   accent     — awning stripe color (default: #fbbf24 amber)
//   style      — extra styles merged onto the outer div
//   noPadding  — skip the inner padding wrapper (for custom layouts like PigDrawerTabs)
//   animate    — play pop-in animation on mount (default true)
//   flexCol    — add display:flex + flexDirection:column (for drawers with internal scroll)
//   children   — panel content

let __panelShellStylesInjected = false;
function ensurePanelShellStyles() {
  if (__panelShellStylesInjected || typeof document === 'undefined') return;
  __panelShellStylesInjected = true;
  const el = document.createElement('style');
  el.id = 'panel-shell-styles';
  el.textContent = [
    '@keyframes panelPop {',
    '  from { opacity: 0; transform: translateY(-6px) scale(.97); }',
    '  to   { opacity: 1; transform: translateY(0)    scale(1);   }',
    '}',
  ].join('\n');
  document.head.appendChild(el);
}

const PanelShell = ({
  accent    = '#fbbf24',
  style,
  noPadding = false,
  animate   = true,
  flexCol   = false,
  showGrain = false,   // opt-in: lined paper texture. Use for log/list panels (Activity,
                       // Action Board). Leave off for data panels (Info, Needs, Habitat).
  children,
}) => {
  ensurePanelShellStyles();
  return (
    <div style={{
      background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
      border: '4px solid #92400e',
      borderRadius: 14,
      position: 'relative',
      overflow: 'hidden',
      boxShadow:
        '0 22px 30px -8px rgba(69,26,3,.55),' +
        '0 10px 14px -4px rgba(69,26,3,.4),' +
        'inset 0 2px 0 rgba(255,255,255,.55),' +
        'inset 0 -2px 0 rgba(0,0,0,.18)',
      color: '#451a03',
      fontFamily: 'inherit',
      ...(animate && { animation: 'panelPop 200ms cubic-bezier(.34,1.56,.64,1)' }),
      ...(flexCol && { display: 'flex', flexDirection: 'column' }),
      ...style,
    }}>
      {/* awning-stripe header */}
      <div aria-hidden="true" style={{
        height: 14,
        flexShrink: 0,
        background: `repeating-linear-gradient(90deg, ${accent} 0 14px, #fffbeb 14px 28px)`,
        borderBottom: '2px solid #92400e',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18)',
      }} />
      {/* brass corner studs */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
        <span key={j} aria-hidden="true" style={{
          position: 'absolute', [v]: 5, [h]: 5,
          width: 7, height: 7, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
          boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.4)',
          pointerEvents: 'none', zIndex: 3,
        }} />
      ))}
      {/* top-of-panel white sheen — bright highlight just below the awning */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, top: 14, height: 52,
        background: 'linear-gradient(180deg, rgba(255,255,255,.42) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      {/* paper grain overlay — only when showGrain=true */}
      {showGrain && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: '20px 6px 6px',
          backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 7px, rgba(120,53,15,.06) 7px 8px)',
          pointerEvents: 'none', borderRadius: 4,
        }} />
      )}
      {/* content */}
      {noPadding
        ? children
        : <div style={{ position: 'relative', padding: 14 }}>{children}</div>
      }
    </div>
  );
};

Object.assign(window, { PanelShell });
