// NeedsPanel.jsx — 10-need urgency-tinted grid
const NEED_META = {
  hunger:      { label: 'Hunger',      emoji: '🍎', color: '#f59e0b' },
  thirst:      { label: 'Thirst',      emoji: '💧', color: '#06b6d4' },
  energy:      { label: 'Energy',      emoji: '💤', color: '#1e3a8a' },
  shelter:     { label: 'Shelter',     emoji: '🏠', color: '#92400e' },
  play:        { label: 'Play',        emoji: '🎾', color: '#10b981' },
  social:      { label: 'Social',      emoji: '💕', color: '#ec4899' },
  stimulation: { label: 'Stimulation', emoji: '🧩', color: '#f97316' },
  comfort:     { label: 'Comfort',     emoji: '🛏️', color: '#818cf8' },
  hygiene:     { label: 'Hygiene',     emoji: '🧼', color: '#0ea5e9' },
  nails:       { label: 'Nails',       emoji: '💅', color: '#64748b' },
  chew:        { label: 'Chew',        emoji: '🌿', color: '#65a30d' },
};

const urgencyOf = (v) => {
  if (v <= 20) return 'critical';
  if (v <= 40) return 'warning';
  if (v <= 70) return 'moderate';
  return 'satisfied';
};

const urgencyStyles = {
  critical:  { bg: 'rgba(220,38,38,.14)',  border: '#dc2626', text: '#991b1b' },
  warning:   { bg: 'rgba(234,88,12,.14)',  border: '#ea580c', text: '#9a3412' },
  moderate:  { bg: 'rgba(146,64,14,.10)',  border: '#a16207', text: '#78350f' },
  satisfied: { bg: 'rgba(22,163,74,.14)',  border: '#16a34a', text: '#166534' },
};

const NeedRow = ({ needKey, value }) => {
  const meta = NEED_META[needKey];
  const u = urgencyOf(value);
  const us = urgencyStyles[u];
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 6,
      padding: '10px 12px', borderRadius: 6,
      background: us.bg, borderInlineStart: `3px solid ${us.border}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ display:'flex', gap:6, alignItems:'center', fontSize: 14, fontWeight: 700, color: '#451a03' }}>
          <span>{meta.emoji}</span>{meta.label}
        </span>
        <span style={{ fontFamily: "'Gaegu', 'Comic Sans MS', cursive", fontWeight: 800, fontSize: 14, color: us.text }}>
          {Math.round(value)}%
        </span>
      </div>
      <div style={{ height: 8, background: 'linear-gradient(180deg, #78350f 0%, #92400e 100%)', borderRadius: 9999, overflow: 'hidden', border: '1.5px solid #451a03', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.4)' }}>
        <div style={{ height: '100%', width: `${value}%`, background: meta.color, borderRadius: 9999, transition: 'width 300ms ease', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35)' }} />
      </div>
    </div>
  );
};

const NeedsPanel = ({ needs }) => (
  <div style={{
    background: 'transparent', border: 'none', borderRadius: 8,
    padding: 8,
  }}>
    <div style={{
      fontFamily: "'Gaegu', cursive", fontSize: 22, fontWeight: 700,
      marginBottom: 10, color: '#451a03', borderBottom: '1px solid rgba(146, 64, 14, .28)', paddingBottom: 6,
    }}>
      Needs
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {Object.keys(NEED_META).map((k) => (
        <NeedRow key={k} needKey={k} value={needs[k]} />
      ))}
    </div>
  </div>
);

Object.assign(window, { NeedsPanel, NEED_META });
