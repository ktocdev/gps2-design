// HelpOverlay.jsx — Live Mode help center.
// A full-screen parchment notice-board overlay with vertical topic tabs
// on the left and a scrollable content panel on the right. Matches the
// awning + brass-stud styling used by SimTopBar dropdowns and cage popovers.

const HELP_TOPICS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    emoji: '🏠',
    accent: '#ec4899',
    body: [
      { kind: 'lede', text: "Welcome to Live Mode — the cozy playspace where your guinea pigs wander, snack, snooze, and react to everything you do." },
      { kind: 'h', text: 'What you see on screen' },
      { kind: 'list', items: [
        { emoji: '🐹', label: 'Your guinea pigs', text: 'wander the tilted cage. Click any pig to inspect its needs.' },
        { emoji: '🧺', label: 'Habitat items', text: 'water bottle, hay rack, food bowl, igloo, chew — click them for details and actions.' },
        { emoji: '🎯', label: 'Quick action buttons', text: 'bottom-right cluster: feed, play, care, socialize, and encourage pig-to-pig bonding.' },
        { emoji: '📊', label: 'Top bar', text: 'shows per-pig health pills, habitat status, inventory, and the activity feed.' },
      ] },
      { kind: 'h', text: 'The basic loop' },
      { kind: 'steps', items: [
        'Watch your pigs and their needs.',
        'Use the action buttons to feed, play, clean, and pet them.',
        'Refill water and hay from the cage items as they run low.',
        'Buy more supplies from the Supplies Store when stocks dwindle.',
      ] },
      { kind: 'tip', text: 'Tap "Replay tutorial" in the Tweaks panel anytime to walk through Live Mode again.' },
    ],
  },
  {
    id: 'guinea-pigs',
    title: 'Your Guinea Pigs',
    emoji: '🐹',
    accent: '#ec4899',
    body: [
      { kind: 'lede', text: "Every pig has a personality, a breed, an age, and a unique relationship with you and the other pigs." },
      { kind: 'h', text: 'Inspecting a pig' },
      { kind: 'p', text: "Click any pig in the cage to open its needs popover. You'll see all ten needs with live progress bars." },
      { kind: 'h', text: 'The pig pills' },
      { kind: 'p', text: 'The colored pills along the top of Live Mode are one per adopted pig. Click a pill to open a full drawer with their profile, friendship meter, and pig-to-pig bonds.' },
      { kind: 'h', text: 'Friendship & bonds' },
      { kind: 'list', items: [
        { emoji: '💖', label: 'Friendship', text: 'how close YOU are with that pig. Grows every time you interact directly (pet, hold, feed).' },
        { emoji: '🤝', label: 'Bonds', text: 'how close two pigs are with each other. Grows when you use the Encourage actions on a pair.' },
      ] },
      { kind: 'tip', text: 'Pigs glow blue or amber when they are selectable as a target for an action.' },
    ],
  },
  {
    id: 'needs',
    title: 'The 10 Needs',
    emoji: '❤️',
    accent: '#ec4899',
    body: [
      { kind: 'lede', text: "Every guinea pig tracks ten needs that gradually decay over time. Your job is to keep them topped up." },
      { kind: 'grid', items: [
        { emoji: '🍎', label: 'Hunger',      color: '#f59e0b' },
        { emoji: '💧', label: 'Thirst',      color: '#06b6d4' },
        { emoji: '😴', label: 'Energy',      color: '#1e3a8a' },
        { emoji: '🏠', label: 'Shelter',     color: '#92400e' },
        { emoji: '🎾', label: 'Play',        color: '#16a34a' },
        { emoji: '💞', label: 'Social',      color: '#ec4899' },
        { emoji: '✨', label: 'Stimulation', color: '#ea580c' },
        { emoji: '🛏️', label: 'Comfort',     color: '#6366f1' },
        { emoji: '🧼', label: 'Hygiene',     color: '#0ea5e9' },
        { emoji: '💅', label: 'Nails',       color: '#64748b' },
        { emoji: '🪵', label: 'Chew',        color: '#a16207' },
      ] },
      { kind: 'h', text: 'Reading the bars' },
      { kind: 'list', items: [
        { emoji: '🟢', label: '60–100', text: 'all good. Pig is content.' },
        { emoji: '🟡', label: '20–60',  text: 'declining. Address soon.' },
        { emoji: '🔴', label: '0–20',   text: 'critical! The pig pill will glow red.' },
      ] },
      { kind: 'tip', text: "Pause time anytime if you want to plan without things ticking down." },
    ],
  },
  {
    id: 'actions',
    title: 'Quick Actions',
    emoji: '🎯',
    accent: '#16a34a',
    body: [
      { kind: 'lede', text: "The bottom-right cluster of round buttons is your main way to interact with pigs. Each one expands into a menu of options." },
      { kind: 'list', items: [
        { emoji: '🍎', label: 'Give Food',  text: 'carrot, lettuce, pepper, apple, parsley, berry. Boosts Hunger.' },
        { emoji: '🎾', label: 'Help Play',  text: 'ball, tunnel, chew, mirror. Boosts Play + Stimulation.' },
        { emoji: '🧼', label: 'Give Care',  text: 'clean, water, hay, bath, nails, brush. Boosts Hygiene & related needs.' },
        { emoji: '🤗', label: 'Socialize',  text: 'pet, hold, talk, vet. Boosts Social + Comfort, raises Friendship with you.' },
        { emoji: '💞', label: 'Encourage',  text: 'pig-to-pig only: greet, snuggle, groom, play together. Builds the bond between two pigs.' },
      ] },
      { kind: 'h', text: 'How targeting works' },
      { kind: 'steps', items: [
        "Click an action button to expand its menu.",
        "Pick the specific action (e.g. Carrot).",
        "If you have one pig, the action fires immediately.",
        "If you have multiple, pigs glow — click the pig (or two, for Encourage) to commit.",
        "Press Esc to cancel a pending action.",
      ] },
    ],
  },
  {
    id: 'items',
    title: 'Habitat Items',
    emoji: '🧺',
    accent: '#d97706',
    body: [
      { kind: 'lede', text: "The cage already comes furnished. Click any item to open its parchment popover with details and actions." },
      { kind: 'list', items: [
        { emoji: '🧴', label: 'Water Bottle', text: 'shows water level. Refill when it gets low to keep Thirst up.' },
        { emoji: '🌾', label: 'Hay Rack',     text: 'tracks freshness and serving count. Pigs nibble from here passively.' },
        { emoji: '🧺', label: 'Food Bowl',    text: 'holds up to 2 foods at once. Empty or refill it from the popover.' },
        { emoji: '🏠', label: 'Cozy Igloo',   text: 'shelter spot. Pigs nap here when Energy is low.' },
        { emoji: '🪵', label: 'Willow Chew',  text: 'durability decays as it gets gnawed on. Keeps Chew need topped up.' },
        { emoji: '💩', label: 'Droppings',    text: 'click to clean instantly. Builds up over time and tanks Cleanliness.' },
      ] },
      { kind: 'tip', text: 'Most popovers include a "Move to Inventory" button so you can swap out worn items.' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory & Placement',
    emoji: '📦',
    accent: '#d97706',
    body: [
      { kind: 'lede', text: "Inventory is the stack of supplies you own but haven't placed in the cage yet. Open it from the top bar." },
      { kind: 'h', text: 'Placing an item' },
      { kind: 'steps', items: [
        'Open Inventory from the top bar.',
        'Switch tabs to find the item (Hay, Food, Bedding, Habitat).',
        'Click a tile — you enter placement mode.',
        'Hover the cage to preview, then click a cell to drop it.',
        'Press Esc to cancel placement.',
      ] },
      { kind: 'h', text: 'Returning to inventory' },
      { kind: 'p', text: "Click any item you placed and choose 'Return to Inventory' to take it back. It re-stacks with the same kind." },
    ],
  },
  {
    id: 'supplies',
    title: 'Supplies Store',
    emoji: '🛒',
    accent: '#a78bfa',
    body: [
      { kind: 'lede', text: "Switch to the Supplies Store tab to buy more food, hay, bedding, and habitat items." },
      { kind: 'list', items: [
        { emoji: '🪙', label: 'Coins',  text: 'earn coins by caring for happy pigs. Your balance is in the top right.' },
        { emoji: '🛍️', label: 'Buy',     text: "purchases land in Inventory. You can place them in the cage afterward." },
        { emoji: '💰', label: 'Sell',   text: "sells back at half price. Frees up inventory and converts surplus into coins." },
      ] },
      { kind: 'tip', text: "Featured items are department picks — they auto-sort into the right inventory category." },
    ],
  },
  {
    id: 'habitat-status',
    title: 'Habitat Status',
    emoji: '🧹',
    accent: '#178740',
    body: [
      { kind: 'lede', text: "Open the Habitat panel in the top bar to see five at-a-glance bars for the cage as a whole." },
      { kind: 'list', items: [
        { emoji: '💧', label: 'Water Level',         text: 'how full the water bottle is. Drops slowly over time.' },
        { emoji: '🌾', label: 'Hay Freshness',       text: 'fresh hay is more nutritious. Empty and refill from the rack.' },
        { emoji: '💩', label: 'Poop Cleanliness',    text: '100 = no droppings. Click poops in the cage to clean.' },
        { emoji: '🛏️', label: 'Bedding Cleanliness', text: 'replace bedding from the inventory before it bottoms out.' },
        { emoji: '✨', label: 'Overall Cleanliness', text: 'the combined cage cleanliness — affects Hygiene for everyone.' },
      ] },
    ],
  },
  {
    id: 'activity-feed',
    title: 'Activity Feed',
    emoji: '📜',
    accent: '#06b6d4',
    body: [
      { kind: 'lede', text: "A running log of everything that happens in the habitat — what you do, what the pigs say, and system events." },
      { kind: 'h', text: 'Entry categories' },
      { kind: 'list', items: [
        { emoji: '👋', label: 'Player',   text: "things YOU did: 'Gave Pickle: Carrot'." },
        { emoji: '✨', label: 'Reaction', text: "what the pigs say back: 'Pickle: Wheek! I love this!'." },
        { emoji: '⚙️', label: 'System',   text: "events: 'Welcomed Pickle & Mochi home!', purchases, sales." },
      ] },
      { kind: 'tip', text: "Open the feed from the top bar's leftmost button. Latest activity is at the top." },
    ],
  },
  {
    id: 'pause-time',
    title: 'Pause & Time',
    emoji: '⏸️',
    accent: '#22c55e',
    body: [
      { kind: 'lede', text: "Time passes in Live Mode whether you're watching or not. Needs decay, hay goes stale, poops appear." },
      { kind: 'h', text: 'The Pause button' },
      { kind: 'p', text: "The big green pill in the top right. Green = playing, amber = paused. Click to toggle." },
      { kind: 'h', text: 'What pause freezes' },
      { kind: 'list', items: [
        { emoji: '🐹', label: 'Pig movement',  text: 'pigs stop wandering the cage.' },
        { emoji: '📉', label: 'Needs decay',   text: 'all 10 needs and habitat status bars hold steady.' },
        { emoji: '💭', label: 'Idle bubbles',  text: 'pigs stop saying things on their own.' },
      ] },
      { kind: 'tip', text: "Pausing is a great time to read this Help center, plan your next move, or take a screenshot." },
    ],
  },
];

function HelpOverlay({ open, onClose }) {
  const [active, setActive] = React.useState(HELP_TOPICS[0].id);
  // Reset to first topic each time the overlay is opened.
  React.useEffect(() => {
    if (open) setActive(HELP_TOPICS[0].id);
  }, [open]);
  // Esc closes
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const topic = HELP_TOPICS.find(t => t.id === active) || HELP_TOPICS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Live Mode help"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'rgba(45, 19, 4, .55)',
        backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'helpFadeIn 200ms ease',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(960px, 100%)',
          height: 'min(640px, 100%)',
          background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
          border: '4px solid #92400e',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 30px 60px -12px rgba(69,26,3,.6), 0 18px 28px -10px rgba(69,26,3,.45), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -2px 0 rgba(0,0,0,.18)',
          display: 'flex',
          flexDirection: 'column',
          color: '#451a03',
          animation: 'helpScaleIn 220ms cubic-bezier(.2,.9,.3,1.2)',
        }}
      >
        {/* awning stripe — uses the active topic's accent so the header re-tints as you switch tabs */}
        <div style={{
          height: 14,
          background: `repeating-linear-gradient(90deg, ${topic.accent} 0 18px, #fffbeb 18px 36px)`,
          borderBottom: '2px solid #92400e',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18)',
          transition: 'background 220ms ease',
          flex: '0 0 auto',
        }} />
        {/* brass studs */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], j) => (
          <span key={j} aria-hidden="true" style={{
            position: 'absolute', [v]: 6, [h]: 6, width: 9, height: 9, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.4)',
            pointerEvents: 'none', zIndex: 3,
          }} />
        ))}

        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 18px 10px',
          borderBottom: '1.5px dashed rgba(146,64,14,.4)',
          flex: '0 0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>📖</span>
            <span style={{
              fontFamily: "'Gaegu', cursive",
              fontSize: 26, fontWeight: 700,
              color: '#7c2d12', lineHeight: 1,
            }}>Help — Live Mode</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help"
            style={{
              border: '2px solid #92400e',
              background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
              color: '#7c2d12', fontWeight: 800, fontSize: 13,
              padding: '4px 12px', borderRadius: 999, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
              boxShadow: '0 2px 3px rgba(69,26,3,.3), inset 0 1px 0 rgba(255,255,255,.6)',
            }}
          >✕ Close</button>
        </div>

        {/* Body: two columns — tabs on the left, content on the right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '232px 1fr',
          flex: 1, minHeight: 0,
        }}>
          {/* Vertical tab rail */}
          <nav
            aria-label="Help topics"
            style={{
              borderRight: '2px solid rgba(146,64,14,.35)',
              background: 'rgba(255, 247, 219, .55)',
              padding: '14px 10px',
              overflowY: 'auto',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {HELP_TOPICS.map(t => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    width: '100%', textAlign: 'left',
                    background: isActive
                      ? 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)'
                      : 'transparent',
                    color: isActive ? '#451a03' : '#7c2d12',
                    border: isActive ? '2px solid #92400e' : '2px solid transparent',
                    borderInlineStart: isActive
                      ? `4px solid ${t.accent}`
                      : '4px solid transparent',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: isActive ? 800 : 700,
                    fontSize: 14,
                    boxShadow: isActive
                      ? '0 2px 4px rgba(69,26,3,.18), inset 0 1px 0 rgba(255,255,255,.6)'
                      : 'none',
                    transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(255, 235, 195, .55)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1, flex: '0 0 auto' }}>{t.emoji}</span>
                  <span style={{ lineHeight: 1.1 }}>{t.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Content panel */}
          <section
            key={topic.id /* re-trigger fade on tab change */}
            style={{
              padding: '20px 24px 24px',
              overflowY: 'auto',
              animation: 'helpPanelFade 220ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{
                fontSize: 30, lineHeight: 1,
                padding: 10, borderRadius: 12,
                background: `${topic.accent}1f`,
                border: `2px solid ${topic.accent}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5)',
              }}>{topic.emoji}</span>
              <h2 style={{
                margin: 0, fontFamily: "'Gaegu', cursive",
                fontSize: 30, fontWeight: 700, color: '#7c2d12', lineHeight: 1,
              }}>{topic.title}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, lineHeight: 1.5 }}>
              {topic.body.map((b, i) => <HelpBlock key={i} block={b} accent={topic.accent} />)}
            </div>
          </section>
        </div>

        <style>{`
          @keyframes helpFadeIn   { from { opacity: 0; } to { opacity: 1; } }
          @keyframes helpScaleIn  { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
          @keyframes helpPanelFade{ from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </div>
  );
}

function HelpBlock({ block, accent }) {
  switch (block.kind) {
    case 'lede':
      return (
        <p style={{
          margin: 0, fontSize: 16, fontWeight: 600,
          color: '#451a03',
          padding: '12px 14px',
          background: '#fff7e6',
          borderInlineStart: `4px solid ${accent}`,
          border: '1.5px solid #fcd5a5',
          borderRadius: 8,
        }}>{block.text}</p>
      );
    case 'h':
      return (
        <h3 style={{
          margin: '6px 0 -4px',
          fontFamily: "'Gaegu', cursive",
          fontSize: 22, fontWeight: 700, color: '#7c2d12',
          letterSpacing: '.01em',
        }}>{block.text}</h3>
      );
    case 'p':
      return <p style={{ margin: 0, fontSize: 14, color: '#451a03' }}>{block.text}</p>;
    case 'list':
      return (
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {block.items.map((it, i) => (
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '28px auto 1fr',
              gap: 10, alignItems: 'baseline',
              padding: '8px 12px',
              background: '#fff7e6',
              border: '1.5px solid #fcd5a5',
              borderRadius: 8,
              fontSize: 14,
            }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{it.emoji}</span>
              <strong style={{ color: '#7c2d12', fontWeight: 800 }}>{it.label}</strong>
              <span style={{ color: '#451a03' }}>{it.text}</span>
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol style={{
          margin: 0, paddingInlineStart: 0, listStyle: 'none',
          display: 'flex', flexDirection: 'column', gap: 6,
          counterReset: 'help-step',
        }}>
          {block.items.map((text, i) => (
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10,
              alignItems: 'baseline',
              fontSize: 14, color: '#451a03',
            }}>
              <span style={{
                width: 24, height: 24, borderRadius: '50%',
                background: `linear-gradient(180deg, ${accent} 0%, ${accent} 60%, rgba(0,0,0,.18) 100%)`,
                color: '#fffbeb', fontWeight: 800, fontSize: 13,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid #451a03',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), 0 1px 2px rgba(69,26,3,.3)',
              }}>{i + 1}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      );
    case 'grid':
      return (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 6,
        }}>
          {block.items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px',
              background: '#fff7e6',
              border: '1.5px solid #fcd5a5',
              borderInlineStart: `4px solid ${it.color}`,
              borderRadius: 8,
              fontSize: 13, fontWeight: 700, color: '#451a03',
            }}>
              <span style={{ fontSize: 18 }}>{it.emoji}</span>
              <span>{it.label}</span>
            </div>
          ))}
        </div>
      );
    case 'tip':
      return (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: '10px 12px',
          background: 'linear-gradient(180deg, #fde68a 0%, #fcd34d 100%)',
          border: '2px solid #92400e',
          borderRadius: 10,
          fontSize: 13, fontWeight: 700, color: '#451a03',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5)',
        }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>💡</span>
          <span><strong>Tip — </strong>{block.text}</span>
        </div>
      );
    default:
      return null;
  }
}

Object.assign(window, { HelpOverlay });
