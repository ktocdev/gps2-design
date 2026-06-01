// Header.jsx — top nav bar for GPS2
// Pet Store is a one-time onboarding flow (not in nav). Supplies Store replaces it for in-game shopping.
const Header = ({ activeTab, onTab, paused, onTogglePause, onOpenHelp, pigsAdopted, coins, gradientColor1 = '#fed7aa', gradientColor2 = '#fef3c7', headerFont = "'Gaegu', cursive", buttonFont = "'Nunito', sans-serif" }) => {
  const tabs = [
    { key: 'habitat',   label: 'Live Mode' },
    { key: 'supplies',  label: 'Supplies Store' },
    { key: 'debug',     label: 'Debug' },
  ];
  // Before adoption, hide the entire nav + pause controls — the Pet Store takes over the screen.
  const preAdoption = pigsAdopted === 0;
  return (
    <header style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 20px',
      background: 'linear-gradient(180deg, #b45309 0%, #92400e 50%, #78350f 100%)',
      borderTop: '3px solid #451a03',
      borderBottom: '3px solid #451a03',
      boxShadow: '0 10px 14px -4px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,235,200,.25), inset 0 -2px 0 rgba(0,0,0,.4)',
      fontFamily: 'var(--font-family-body)',
    }}>
      {/* horizontal wood grain hairlines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        background: 'repeating-linear-gradient(180deg, rgba(255,255,255,.04) 0 3px, transparent 3px 6px)' }} />
      {/* top edge highlight */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(180deg, rgba(255,255,255,.35), transparent)', pointerEvents: 'none' }} />
      {/* bottom edge shadow */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.45))', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 32 }}>🐹</span>
        <span style={{
          fontFamily: headerFont, fontSize: 28, fontWeight: 700,
          color: '#fffbeb',
          textShadow: '0 1px 0 rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.3)',
          letterSpacing: '.01em',
        }}>Guinea Pig Simulator</span>
      </div>
      {!preAdoption ? (
        <nav style={{ display: 'flex', gap: 6, position: 'relative', zIndex: 1 }}>
          {tabs.map(t => {
            const active = activeTab === t.key;
            return (
              <button key={t.key} onClick={() => onTab(t.key)}
                data-tutorial={t.key === 'supplies' ? 'supplies-tab' : undefined}
                className="gp-btn--tactile"
                style={{
                padding: '0 20px', height: 44,
                fontSize: 19, fontWeight: 700,
                fontFamily: headerFont,
                letterSpacing: '.01em',
                border: active ? '2px solid #7c2d12' : '2px solid rgba(124,45,18,.55)',
                borderRadius: 999,
                background: active
                  ? 'linear-gradient(180deg,#ec4899 0%,#db2777 100%)'
                  : 'linear-gradient(180deg,#fffbeb 0%,#fde68a 100%)',
                color: active ? '#fff' : '#7c2d12',
                boxShadow: active
                  ? '0 6px 10px -2px rgba(219,39,119,.45), 0 2px 4px -1px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.4), inset 0 -2px 0 rgba(0,0,0,.18)'
                  : 'inset 0 1px 0 rgba(255,255,255,.65), 0 2px 3px rgba(69,26,3,.22)',
                textShadow: active ? '0 1px 0 rgba(69,26,3,.25)' : 'none',
                cursor: 'pointer',
                transition: 'transform 100ms ease, box-shadow 150ms ease, filter 140ms ease',
              }}
              >{t.label}</button>
            );
          })}
        </nav>
      ) : (
        <span />
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {!preAdoption && (
          <React.Fragment>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 38, padding: '0 14px',
              borderRadius: 999,
              border: '2px solid #78350f',
              background: 'linear-gradient(180deg, #fffbeb 0%, #fcd34d 100%)',
              color: '#7c2d12',
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15,
              boxShadow: '0 6px 10px -2px rgba(120,53,15,.4), 0 2px 4px -1px rgba(120,53,15,.25), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)',
              textShadow: '0 1px 0 rgba(255,255,255,.45)',
            }}><span style={{ fontSize: 17, filter: 'drop-shadow(0 1px 0 rgba(120,53,15,.35))' }}>🪙</span>{coins}</span>
            {/* Help — opens the Live Mode help overlay (vertical tabs + content panel).
                Parchment circular icon button so it sits quietly next to Pause without
                competing for attention. */}
            <button
              onClick={onOpenHelp}
              type="button"
              aria-label="Open help"
              title="Help (?)"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'brightness(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(1px)';
                e.currentTarget.style.filter = 'brightness(.94)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'brightness(1.06)';
              }}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                border: '2px solid #78350f',
                background: 'linear-gradient(180deg, #fffbeb 0%, #fcd34d 100%)',
                color: '#7c2d12',
                fontFamily: buttonFont, fontWeight: 900, fontSize: 18,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 10px -2px rgba(120,53,15,.4), 0 2px 4px -1px rgba(120,53,15,.25), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)',
                transition: 'transform 100ms ease, filter 140ms ease',
              }}
            >?</button>
            {/* Pause/Resume — single consolidated toggle. Replaces the
                separate Playing/Paused badge: color signals current state
                (green = playing, amber = paused), label shows the action
                that fires on click. */}
            <button
              onClick={onTogglePause}
              type="button"
              data-tutorial="pause"
              aria-pressed={paused}
              aria-label={paused ? 'Resume simulation' : 'Pause simulation'}
              title={paused ? 'Resume simulation' : 'Pause simulation'}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'brightness(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.filter = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(1px)';
                e.currentTarget.style.filter = 'brightness(.94)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.filter = 'brightness(1.06)';
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 38, padding: '0 18px', borderRadius: 999,
                border: paused ? '2px solid #78350f' : '1px solid rgba(20,83,45,.45)', cursor: 'pointer',
                // Green when playing, amber when paused.
                background: paused
                  ? 'linear-gradient(180deg,#fbbf24 0%,#d97706 100%)'
                  : 'linear-gradient(180deg,#86efac 0%,#22c55e 100%)',
                color: paused ? '#451a03' : '#0b3a1d', // ≥7:1 contrast on both gradients
                fontFamily: buttonFont, fontWeight: 800, fontSize: 15,
                letterSpacing: '.01em',
                boxShadow: '0 6px 10px -2px rgba(0,0,0,.28), 0 2px 4px -1px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.4)',
                transition: 'transform 100ms ease, filter 140ms ease',
              }}
            >
              <span>{paused ? '▶ Resume' : '⏸ Pause'}</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

Object.assign(window, { Header });
