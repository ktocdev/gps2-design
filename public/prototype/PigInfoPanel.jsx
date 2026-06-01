// PigInfoPanel.jsx — per-pig profile + friendship + bond meters
// Used inside the per-pig drawer in <SimTopBar>. Loose interpretation of the in-game info panel:
// matches the dark slate aesthetic of the existing dropdowns (#1e293b body, #334155 dividers)
// but uses our gradient + inset-highlight visual language.

const GENDER_GLYPH = { sow: '♀', boar: '♂', female: '♀', male: '♂' };

// Format "2h ago" / "5m ago" / "just now" from a timestamp
function relTime(ts) {
  if (!ts) return '—';
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// Pretty-print a fur description from the colors array
function furLabel(colors, breed) {
  if (!colors || colors.length === 0) return '—';
  const palette = colors.join(' & ');
  // Suffix the breed-suggesting word for variety: Himalayan, Abyssinian etc
  return `${palette}`;
}

// Bond-tier label keyed off percentage
function bondTier(pct) {
  if (pct >= 80) return { label: 'Bonded',   color: '#ec4899' };
  if (pct >= 50) return { label: 'Friendly', color: '#f59e0b' };
  if (pct >= 20) return { label: 'Familiar', color: '#a16207' };
  return                { label: 'Neutral',  color: '#92400e' };
}

const SectionHeader = ({ icon, label }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '0 4px 6px',
    fontSize: 14, fontWeight: 800, color: '#451a03',
    fontFamily: "'Gaegu', 'Comic Sans MS', cursive", letterSpacing: 0.3,
  }}>
    <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
    <span>{label}</span>
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(146, 64, 14, .28)', margin: '12px 4px' }} />
);

const InfoRow = ({ label, value, valueIcon }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '4px 4px',
    fontSize: 13,
  }}>
    <span style={{ color: '#92400e' }}>{label}</span>
    <span style={{
      color: '#451a03', fontWeight: 800,
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      {valueIcon && <span style={{ fontSize: 14 }}>{valueIcon}</span>}
      {value}
    </span>
  </div>
);

const FriendshipBar = ({ value, target = 85 }) => {
  // Gradient: amber → orange like a ripening friendship meter
  const bg = 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 60%, #ea580c 100%)';
  return (
    <div style={{ position: 'relative', height: 14,
                  background: 'linear-gradient(180deg, #78350f 0%, #92400e 100%)',
                  borderRadius: 999, overflow: 'visible',
                  border: '1.5px solid #451a03',
                  boxShadow: 'inset 0 2px 3px rgba(0,0,0,.4)' }}>
      <div style={{
        height: '100%', width: `${value}%`,
        background: bg, borderRadius: 999,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.3)',
        transition: 'width 400ms ease',
      }} />
      {/* Target tick */}
      {target != null && (
        <div style={{ position: 'absolute', top: -4, bottom: -4, left: `${target}%`, width: 2,
                      background: '#451a03', borderRadius: 1 }} />
      )}
      {target != null && (
        <span style={{
          position: 'absolute', top: -16, left: `${target}%`, transform: 'translateX(-50%)',
          fontSize: 10, color: '#92400e', fontWeight: 800,
        }}>{target}%</span>
      )}
    </div>
  );
};

const BondBar = ({ value, color }) => (
  <div style={{ height: 8,
                background: 'linear-gradient(180deg, #78350f 0%, #92400e 100%)',
                borderRadius: 999, overflow: 'hidden',
                border: '1.5px solid #451a03',
                boxShadow: 'inset 0 2px 3px rgba(0,0,0,.4)' }}>
    <div style={{
      height: '100%', width: `${value}%`,
      background: `linear-gradient(90deg, #f472b6 0%, ${color} 100%)`,
      borderRadius: 999,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.3)',
      transition: 'width 400ms ease',
    }} />
  </div>
);

const PigInfoPanel = ({ pig, otherPigs = [] }) => {
  const friendship = Math.round(pig.friendship ?? 0);
  const target = pig.friendshipTarget ?? 85;
  const friendColor = friendship >= target ? '#ec4899' : '#ea580c';

  return (
    <div style={{ padding: '4px 4px 0' }}>
      {/* INFO */}
      <SectionHeader icon={pig.avatar?.emoji ?? '🐹'} label="Info" />
      <div style={{ padding: '0 4px' }}>
        <InfoRow label="Breed:"  value={pig.breed || '—'} />
        <InfoRow label="Gender:" value={pig.gender ? pig.gender[0].toUpperCase() + pig.gender.slice(1) : '—'}
                 valueIcon={GENDER_GLYPH[pig.gender]} />
        <InfoRow label="Fur:"    value={furLabel(pig.colors, pig.breed)} />
        {pig.age != null && <InfoRow label="Age:" value={`${pig.age} mo`} />}
        {pig.personality && <InfoRow label="Personality:" value={pig.personality} />}
      </div>

      <Divider />

      {/* USER FRIENDSHIP */}
      <SectionHeader icon="💖" label="User Friendship" />
      <div style={{ padding: '4px 4px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#451a03' }}>Friendship</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: friendColor,
                          fontFamily: "'Gaegu', 'Comic Sans MS', cursive" }}>{friendship}%</span>
        </div>
        <FriendshipBar value={friendship} target={target} />
        <div style={{ marginTop: 14 }}>
          <InfoRow label="Last interaction:"  value={relTime(pig.lastInteractionAt)} />
          <InfoRow label="Total interactions:" value={pig.totalInteractions ?? 0} />
        </div>
      </div>

      {/* BONDS — one section per other pig */}
      {otherPigs.length > 0 && (
        <>
          <Divider />
          {otherPigs.map(other => {
            const pct = Math.round((pig.bonds || {})[other.name] ?? 0);
            const t = bondTier(pct);
            return (
              <div key={other.name} style={{ marginBottom: 8 }}>
                <SectionHeader icon="🤝" label={`Bonding with ${other.name}`} />
                <div style={{ padding: '4px 4px 0' }}>
                  <BondBar value={pct} color={t.color} />
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: 10,
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: t.color,
                                   fontFamily: "'Gaegu', 'Comic Sans MS', cursive" }}>{pct}%</span>
                    <span style={{
                      padding: '4px 12px', borderRadius: 8,
                      background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
                      border: '2px solid #92400e',
                      color: '#451a03',
                      fontSize: 12, fontWeight: 800,
                      fontFamily: "'Gaegu', 'Comic Sans MS', cursive",
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 1px 2px rgba(69,26,3,.25)',
                    }}>{t.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

Object.assign(window, { PigInfoPanel });
