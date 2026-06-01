// SidePanel.jsx — edge-docked overlay that slides in from left or right
// Mirrors SidePanel3D.vue: a square tab button peeks out when collapsed, expands to a full-height panel
const SidePanel = ({ open, side, color, title, icon, onToggle, children, width = 320 }) => {
  const colors = {
    yellow: { tab: '#fbbf24', tabHover: '#f59e0b', headerBg: '#fffbeb', headerBorder: '#fcd34d' },
    pink:   { tab: '#db2777', tabHover: '#be185d', headerBg: '#fdf2f8', headerBorder: '#fbcfe8' },
    green:  { tab: '#178740', tabHover: '#166534', headerBg: '#f0fdf4', headerBorder: '#86efac' },
    violet: { tab: '#8b5cf6', tabHover: '#7c3aed', headerBg: '#f5f3ff', headerBorder: '#c4b5fd' },
  };
  const c = colors[color] || colors.yellow;

  return (
    <React.Fragment>
      {/* Edge tab — visible when collapsed */}
      {!open && (
        <button
          onClick={onToggle}
          title={`Open ${title}`}
          style={{
            position: 'absolute',
            top: 12,
            [side === 'left' ? 'left' : 'right']: 12,
            width: 48, height: 48,
            padding: 0, border: 'none',
            borderRadius: 8,
            background: c.tab, color: '#fff', fontSize: 22,
            cursor: 'pointer', zIndex: 5,
            boxShadow: '0 2px 8px rgba(0,0,0,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 150ms ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >{icon}</button>
      )}

      {/* Panel body — slides in */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [side === 'left' ? 'left' : 'right']: 0,
        width,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(8px)',
        borderInlineStart: side === 'right' ? `1px solid ${c.headerBorder}` : 'none',
        borderInlineEnd:   side === 'left'  ? `1px solid ${c.headerBorder}` : 'none',
        boxShadow: open ? (side === 'left'
          ? '4px 0 16px rgba(0,0,0,.1)'
          : '-4px 0 16px rgba(0,0,0,.1)') : 'none',
        transform: open ? 'translateX(0)' : `translateX(${side === 'left' ? '-100%' : '100%'})`,
        transition: 'transform 260ms cubic-bezier(.2,.9,.3,1.2)',
        zIndex: 25, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', borderBottom: `1px solid ${c.headerBorder}`,
          background: c.headerBg, flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Gaegu', cursive", fontSize: 22, fontWeight: 700,
            color: '#1e293b', display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <span>{icon}</span>{title}
          </span>
          <button onClick={onToggle} title="Close" style={{
            border: 'none', background: 'transparent', fontSize: 18,
            cursor: 'pointer', color: c.tab, fontWeight: 700,
            width: 32, height: 32, borderRadius: 4,
          }}>{side === 'left' ? '◀' : '▶'}</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

Object.assign(window, { SidePanel });
