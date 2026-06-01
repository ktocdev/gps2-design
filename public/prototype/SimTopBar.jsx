// SimTopBar.jsx — slim secondary bar below the header for the 3D habitat sim.
// Wood-shop aesthetic: a wooden plank below the header, with cream signboard
// pill triggers (brown borders, corner rivets, slight tilts). Dropdown panels
// are parchment notice-boards with a striped awning cap. Matches Pet Store /
// Supplies Store visual language so Live Mode feels like the same world.

// Panel: thin positioned wrapper around PanelShell.
// Defined at module scope so game-tick re-renders of the parent don't change
// the component's identity (was causing dropdowns to remount each tick).
const Panel = ({ side, width, accent = '#fbbf24', showGrain = false, children }) => (
  <div data-sim-panel="1" style={{
    position: 'absolute', top: 'calc(100% + 12px)',
    [side]: 0, width, zIndex: 50,
  }}>
    <PanelShell accent={accent} showGrain={showGrain}>{children}</PanelShell>
  </div>
);

// Reusable cream signboard pill trigger.
// active: cream stays cream but the awning-stripe accent flares + lift.
const SignPill = ({ icon, label, accent, accentDeep, badge, badgeColor, active, tilt = 0, onClick, suffix, children }) => (
  <button onClick={onClick} className="gp-sign-pill" style={{
    '--gp-tilt': `${tilt}deg`,
    position: 'relative',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    height: 42, paddingInline: 14, borderRadius: 10,
    border: `3px solid ${active ? accentDeep || '#7c2d12' : '#92400e'}`,
    cursor: 'pointer',
    background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
    color: '#451a03', fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
    transform: `rotate(${tilt}deg) translateY(${active ? -2 : 0}px)`,
    boxShadow: active
      ? `0 10px 14px -4px rgba(69,26,3,.55), 0 4px 6px -2px rgba(69,26,3,.35),
         inset 0 2px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)`
      : `0 6px 8px -2px rgba(69,26,3,.4), 0 2px 4px -1px rgba(69,26,3,.25),
         inset 0 2px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(146,64,14,.22)`,
    transition: 'transform 140ms cubic-bezier(.34,1.56,.64,1), box-shadow 160ms ease, border-color 140ms ease',
  }}>
    {/* corner rivets */}
    {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
      <span key={j} aria-hidden="true" style={{
        position: 'absolute', [v]: 3, [h]: 4,
        width: 4, height: 4, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
        boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.45)',
      }} />
    ))}
    {/* wax-seal icon disc */}
    {icon != null && (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 26, height: 26, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, ${accent}, ${accentDeep || accent})`,
        border: `2px solid ${accentDeep || accent}`,
        fontSize: 15, lineHeight: 1,
        boxShadow: `0 2px 3px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.4)`,
      }}>{icon}</span>
    )}
    <span style={{ color: '#7c2d12', whiteSpace: 'nowrap' }}>{label}</span>
    {children}
    {badge != null && badge > 0 && (
      <span style={{
        minWidth: 20, height: 20, padding: '0 6px',
        borderRadius: 6, background: badgeColor || '#dc2626',
        border: '1.5px solid #451a03',
        color: '#fff', fontSize: 11, fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transform: 'rotate(-3deg)',
        boxShadow: '0 2px 3px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3)',
        textShadow: '0 1px 0 rgba(0,0,0,.2)',
      }}>{badge > 99 ? '99+' : badge}</span>
    )}
    {suffix}
    <span style={{ fontSize: 9, color: '#92400e', opacity: .7, marginLeft: -2 }}>▾</span>
  </button>
);

const SimTopBar = ({
  feed, activityOpen, onToggleActivity,
  pigs, expandedPig, onTogglePig, pigHealth, NEED_META,
  pigDrawerTab, onPigDrawerTabChange,
  inventoryOpen, onToggleInventory, inventoryContent,
  dirty, habitatOpen, onToggleHabitat, habitatStatus,
}) => {
  const newCount = feed.length;
  const cleanliness = Math.round(100 - dirty);
  const cleanColor = dirty > 60 ? '#dc2626' : dirty > 30 ? '#ea580c' : '#178740';

  const rootRef = React.useRef(null);
  const anyOpen = activityOpen || inventoryOpen || habitatOpen || !!expandedPig;
  const closeAll = () => {
    if (activityOpen) onToggleActivity?.();
    if (inventoryOpen) onToggleInventory?.();
    if (habitatOpen) onToggleHabitat?.();
    if (expandedPig) onTogglePig?.(null);
  };

  React.useEffect(() => {
    if (!anyOpen) return;
    const onDown = (e) => {
      if (rootRef.current && rootRef.current.contains(e.target)) return;
      // Don't close the bar when the user clicks inside the tutorial overlay
      // (its parchment card is a portal on document.body, so it's "outside"
      // the bar — but the tutorial often KEEPS the bar open as part of a step).
      if (e.target.closest?.('[data-tutorial-overlay]')) return;
      closeAll();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [anyOpen, activityOpen, inventoryOpen, habitatOpen, expandedPig]);

  const onBarMouseDown = (e) => {
    let n = e.target;
    while (n && n !== rootRef.current) {
      if (n.tagName === 'BUTTON' || n.dataset?.simPanel === '1') return;
      n = n.parentElement;
    }
    closeAll();
  };

  return (
    <div ref={rootRef} onMouseDown={onBarMouseDown} style={{
      position: 'relative', zIndex: 25,
      padding: '12px 18px 14px',
      // Wood-plank background — slightly lighter shade than the header so it
      // reads as a separate plank pinned under it.
      background: 'linear-gradient(180deg, #c2700d 0%, #a05a0c 50%, #87470b 100%)',
      borderBottom: '3px solid #451a03',
      boxShadow: 'inset 0 2px 0 rgba(255,235,200,.22), inset 0 -2px 0 rgba(0,0,0,.4), 0 6px 8px -3px rgba(0,0,0,.35)',
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'inherit',
    }}>
      {/* horizontal wood-grain hairlines */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        background: 'repeating-linear-gradient(180deg, rgba(255,255,255,.04) 0 3px, transparent 3px 6px)',
      }} />
      {/* end caps with brass rivets — implies the plank is bolted to the frame */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 8, height: 8, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 8, left: 8, width: 8, height: 8, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 8, right: 8, width: 8, height: 8, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #fde68a, #1c1917)' }} />

      {/* LEFT: Activity */}
      <div data-tutorial="activity" style={{ position: 'relative', zIndex: 1 }}>
        <SignPill
          icon="📓"
          label="Activity"
          accent="#fbbf24" accentDeep="#d97706"
          badge={newCount} badgeColor="#8b5cf6"
          active={activityOpen}
          tilt={-1}
          onClick={onToggleActivity}
        />
        {activityOpen && (
          <Panel side="left" width={360} accent="#fbbf24" showGrain>
            <div style={{
              fontFamily: "'Gaegu', cursive", fontSize: 24, fontWeight: 700,
              color: '#7c2d12', borderBottom: '2px solid #d97706',
              paddingBottom: 6, marginBottom: 10, paddingLeft: 4,
            }}>📓 Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto' }}>
              {feed.length === 0 ? (
                <div style={{ color: '#78350f', fontStyle: 'italic', padding: '12px 4px', fontSize: 14 }}>💭 No activity yet...</div>
              ) : [...feed].reverse().map((e, i) => {
                const accent = {
                  player:      '#178740',
                  reaction:    '#ec4899',
                  auto:        '#92400e',
                  env:         '#0891b2',
                  achievement: '#d97706',
                  system:      '#7c3aed',
                }[e.type] || '#92400e';
                return (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', gap: 2,
                    padding: '8px 12px',
                    background: '#fff7e6',
                    border: '1.5px solid #fcd5a5',
                    borderInlineStart: `4px solid ${accent}`,
                    borderRadius: 8,
                  }}>
                    <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, letterSpacing: '.04em' }}>{e.time}</div>
                    <div style={{ fontSize: 14, color: '#451a03', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 16, lineHeight: 1.2 }}>{e.emoji}</span>
                      <span>{e.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        )}
      </div>

      {/* CENTER: Habitat + per-pig pills */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        position: 'relative', zIndex: 1,
      }}>
        {/* Habitat pill */}
        <div data-tutorial="habitat-status" style={{ position: 'relative' }}>
          <SignPill
            icon="🏠"
            label="Habitat"
            accent="#84cc16" accentDeep="#178740"
            active={habitatOpen}
            tilt={.6}
            onClick={onToggleHabitat}
            suffix={
              <span style={{
                minWidth: 42, padding: '2px 10px', borderRadius: 6,
                background: cleanColor, color: '#fff', fontSize: 12, fontWeight: 700,
                border: '1.5px solid #451a03',
                textAlign: 'center', textShadow: '0 1px 0 rgba(0,0,0,.25)',
                transform: 'rotate(-2deg)',
                boxShadow: '0 2px 3px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3)',
              }}>{cleanliness}%</span>
            }
          />
          {habitatOpen && (
            <div data-sim-panel="1" style={{
              position: 'absolute', top: 'calc(100% + 12px)',
              left: '50%', transform: 'translateX(-50%)',
              width: 380, zIndex: 50,
            }}>
              <PanelShell accent="#84cc16" showGrain>
                  <div style={{
                    fontFamily: "'Gaegu', cursive", fontSize: 24, fontWeight: 700,
                    color: '#7c2d12', borderBottom: '2px solid #d97706',
                    paddingBottom: 6, marginBottom: 10, paddingLeft: 4,
                  }}>🏠 Habitat Status</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {(habitatStatus || []).map((s) => {
                      const u = s.value <= 20 ? 'critical'
                              : s.value <= 40 ? 'warning'
                              : s.value <= 70 ? 'moderate' : 'satisfied';
                      const palette = {
                        critical:  { bg: '#fde2e2', border: '#dc2626', text: '#7f1d1d' },
                        warning:   { bg: '#fde9c8', border: '#ea580c', text: '#7c2d12' },
                        moderate:  { bg: '#fff7e6', border: '#a8a29e', text: '#451a03' },
                        satisfied: { bg: '#dcfce7', border: '#178740', text: '#14532d' },
                      }[u];
                      return (
                        <div key={s.key} style={{
                          display: 'flex', flexDirection: 'column', gap: 6,
                          padding: '10px 12px', borderRadius: 8,
                          background: palette.bg,
                          border: '1.5px solid #fcd5a5',
                          borderInlineStart: `4px solid ${palette.border}`,
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ display:'flex', gap:6, alignItems:'center', fontSize: 14, fontWeight: 600, color: palette.text }}>
                              <span>{s.emoji}</span>{s.label}
                            </span>
                            <span style={{ fontWeight: 700, fontSize: 13, color: palette.text }}>
                              {Math.round(s.value)}%
                            </span>
                          </div>
                          <div style={{ height: 8, background: '#fff7e6', border: '1px solid #d6a873', borderRadius: 9999, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.value}%`, background: s.color, borderRadius: 9999, transition: 'width 300ms ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
              </PanelShell>
            </div>
          )}
        </div>

        {/* Per-pig pills */}
        {pigs.map((p, i) => {
          const h = pigHealth(p);
          const open = expandedPig === p.name;
          const statusColor = h.status === 'critical' ? '#dc2626'
                            : h.status === 'warning'  ? '#ea580c' : '#178740';
          const worstMeta = h.worstNeed ? NEED_META[h.worstNeed] : null;
          const tilt = i % 2 === 0 ? -.5 : .5;
          return (
            <div key={p.name} data-tutorial={i === 0 ? 'pig-pill' : undefined} style={{ position: 'relative' }}>
              <button onClick={() => onTogglePig(open ? null : p.name)} className="gp-sign-pill" style={{
                position: 'relative',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                height: 42, paddingInline: 14, borderRadius: 10,
                border: `3px solid ${open ? '#7c2d12' : '#92400e'}`,
                cursor: 'pointer',
                background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
                color: '#451a03', fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
                transform: `rotate(${tilt}deg) translateY(${open ? -2 : 0}px)`,
                boxShadow: open
                  ? `0 10px 14px -4px rgba(69,26,3,.55), 0 4px 6px -2px rgba(69,26,3,.35),
                     inset 0 2px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.25)`
                  : `0 6px 8px -2px rgba(69,26,3,.4), 0 2px 4px -1px rgba(69,26,3,.25),
                     inset 0 2px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(146,64,14,.22)`,
                transition: 'transform 140ms cubic-bezier(.34,1.56,.64,1), box-shadow 160ms ease',
              }}>
                {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,hh], j) => (
                  <span key={j} aria-hidden="true" style={{
                    position: 'absolute', [v]: 3, [hh]: 4,
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
                    boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.45)',
                  }} />
                ))}
                {/* Pig portrait disc */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 30%, #fef3c7, #fbbf24)',
                  border: '2px solid #92400e',
                  fontSize: 18, lineHeight: 1,
                  boxShadow: '0 2px 3px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.4)',
                }}>
                  <span style={{ filter: `hue-rotate(${p.avatar.hue}deg)`, lineHeight: 1 }}>{p.avatar.emoji}</span>
                </span>
                <span style={{ color: '#7c2d12' }}>{p.name}</span>
                {h.status === 'ok' ? (
                  <span style={{
                    width: 9, height: 9, borderRadius: 999,
                    background: statusColor, border: '1.5px solid #14532d',
                    boxShadow: `0 0 0 3px ${statusColor}30, inset 0 1px 0 rgba(255,255,255,.4)`,
                  }} />
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    padding: '2px 7px', borderRadius: 6,
                    background: statusColor, color: '#fff',
                    border: '1.5px solid #451a03',
                    fontSize: 11, fontWeight: 700,
                    transform: 'rotate(-3deg)',
                    textShadow: '0 1px 0 rgba(0,0,0,.25)',
                    boxShadow: '0 2px 3px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3)',
                  }}>
                    {worstMeta && <span style={{ fontSize: 12 }}>{worstMeta.emoji}</span>}
                    <span>{h.count}</span>
                  </span>
                )}
                <span style={{ fontSize: 9, color: '#92400e', opacity: .7 }}>▾</span>
              </button>
              {open && (
                <div data-sim-panel="1" style={{
                  position: 'absolute', top: 'calc(100% + 12px)',
                  left: '50%', transform: 'translateX(-50%)',
                  width: 380, zIndex: 50,
                }}>
                  <PanelShell accent="#ec4899" noPadding flexCol style={{ maxHeight: '70vh' }}>
                    <PigDrawerTabs
                      pig={p}
                      otherPigs={pigs.filter(o => o.name !== p.name)}
                      activeTab={pigDrawerTab}
                      onTabChange={onPigDrawerTabChange}
                    />
                  </PanelShell>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT: Inventory */}
      <div data-tutorial="inventory" style={{ position: 'relative', zIndex: 1 }}>
        <SignPill
          icon="🎒"
          label="Inventory"
          accent="#a78bfa" accentDeep="#7c3aed"
          active={inventoryOpen}
          tilt={1}
          onClick={onToggleInventory}
        />
        {inventoryOpen && (
          <Panel side="right" width={400} accent="#a78bfa" showGrain>
            <div style={{
              fontFamily: "'Gaegu', cursive", fontSize: 24, fontWeight: 700,
              color: '#7c2d12', borderBottom: '2px solid #d97706',
              paddingBottom: 6, marginBottom: 10, paddingLeft: 4,
            }}>🎒 Inventory</div>
            {inventoryContent}
          </Panel>
        )}
      </div>
    </div>
  );
};

// Tabbed wrapper inside per-pig drawer.
//
// Controllable: pass `activeTab` + `onTabChange` to lift state up (the tutorial
// flips tabs as part of its choreography). Falls back to internal state when
// the props are not provided.
const PigDrawerTabs = ({ pig, otherPigs, activeTab, onTabChange }) => {
  const [internalTab, setInternalTab] = React.useState('info');
  const tab = activeTab ?? internalTab;
  const setTab = onTabChange ?? setInternalTab;
  const tabs = [
    { id: 'info',  icon: '🐹', label: 'Info' },
    { id: 'needs', icon: '📊', label: 'Needs' },
  ];
  return (
    <>
      <div style={{
        display: 'flex', gap: 4, padding: 8,
        borderBottom: '2px solid #d6a873',
        background: 'linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%)',
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} data-tutorial={t.id === 'needs' ? 'pig-needs-tab' : undefined} onClick={() => setTab(t.id)} style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              height: 36, border: `2px solid ${active ? '#92400e' : 'transparent'}`,
              borderRadius: 8, cursor: 'pointer',
              background: active
                ? 'linear-gradient(180deg, #fffbeb 0%, #fde68a 100%)'
                : 'transparent',
              color: active ? '#7c2d12' : '#92400e',
              fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
              boxShadow: active
                ? '0 2px 4px rgba(69,26,3,.25), inset 0 1px 0 rgba(255,255,255,.6)'
                : 'none',
              transition: 'background 140ms ease, color 140ms ease, border-color 140ms ease',
            }}>
              <span style={{ fontSize: 14, lineHeight: 1 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ padding: 14, overflowY: 'auto', flex: '1 1 auto' }}>
        {tab === 'info'  && <PigInfoPanel pig={pig} otherPigs={otherPigs} />}
        {tab === 'needs' && <NeedsPanel needs={pig.needs} />}
      </div>
    </>
  );
};

Object.assign(window, { SimTopBar, PigDrawerTabs });
