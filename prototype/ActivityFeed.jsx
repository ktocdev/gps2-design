// ActivityFeed.jsx — category-colored timestamped log, parchment panel style
const CAT_COLOR = {
  player: '#db2777', reaction: '#178740', auto: '#92400e',
  env: '#0891b2', achievement: '#d97706', system: '#7c3aed',
};

const ActivityFeed = ({ entries }) => (
  <PanelShell accent="#fbbf24" noPadding flexCol showGrain style={{ height: '100%' }}>
    {/* header row */}
    <div style={{ position: 'relative', padding: '10px 14px 8px', flexShrink: 0 }}>
      <div style={{
        fontFamily: "'Gaegu', cursive", fontSize: 22, fontWeight: 700,
        color: '#7c2d12', borderBottom: '2px solid #d97706', paddingBottom: 6,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>📓 Activity</div>
    </div>
    {/* entry list */}
    <div style={{
      overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse',
      gap: 6, flex: 1, padding: '0 14px 14px', minHeight: 0,
    }}>
      {[...entries].reverse().map((e, i) => {
        const accent = CAT_COLOR[e.cat] || CAT_COLOR.system;
        return (
          <div key={i} style={{
            padding: '7px 11px',
            background: '#fff7e6',
            border: '1.5px solid #fcd5a5',
            borderRadius: 8,
            borderInlineStart: `4px solid ${accent}`,
          }}>
            <div style={{
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: 11, color: '#92400e', marginBottom: 2,
            }}>{e.time}</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 13, color: '#451a03' }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{e.emoji}</span>
              <span>{e.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  </PanelShell>
);

Object.assign(window, { ActivityFeed });
