// Inventory.jsx — slotted grid with department nav (flat, no subsections)
// Mirrors SuppliesStore taxonomy: Hay, Food, Bedding, Habitat.

const INV_DEPARTMENTS = [
  { key: 'hay',     label: 'Hay',     emoji: '🌾' },
  { key: 'food',    label: 'Food',    emoji: '🥗' },
  { key: 'bedding', label: 'Bedding', emoji: '🛏️' },
  { key: 'habitat', label: 'Habitat', emoji: '🏠' },
];

// Demo data for the standalone preview — the real app passes live `inv` in.
const INV_DATA = {
  hay: [
    { name: 'Timothy Hay', emoji: '🌾', qty: 50 },
    { name: 'Orchard Hay', emoji: '🌾', qty: 20 },
    { name: 'Alfalfa Hay', emoji: '🌾', qty: 10 },
    { name: 'Meadow Hay',  emoji: '🌾', qty: 15 },
  ],
  food: [
    { name: 'Romaine',     emoji: '🥬', qty: 8 },
    { name: 'Kale',        emoji: '🥬', qty: 4 },
    { name: 'Carrot',      emoji: '🥕', qty: 12 },
    { name: 'Bell Pepper', emoji: '🫑', qty: 4 },
    { name: 'Apple',       emoji: '🍎', qty: 3 },
    { name: 'Strawberry',  emoji: '🍓', qty: 2 },
    { name: 'Hay Cookie',  emoji: '🍪', qty: 4 },
    { name: 'Daily Pellets', emoji: '🌾', qty: 9 },
  ],
  bedding: [
    { name: 'Aspen Shavings', emoji: '🟫', qty: 15 },
    { name: 'Paper Bedding',  emoji: '🟦', qty: 8 },
    { name: 'Fleece Liner',   emoji: '🟪', qty: 3 },
    { name: 'Hemp Bedding',   emoji: '🟩', qty: 6 },
  ],
  habitat: [
    { name: 'Cozy House',  emoji: '🏠', qty: 2 },
    { name: 'Pigloo',      emoji: '🟦', qty: 1 },
    { name: 'Tunnel',      emoji: '🟠', qty: 1 },
    { name: 'Hay Hut',     emoji: '🛖', qty: 1 },
    { name: 'Water Bottle',emoji: '🧴', qty: 1 },
    { name: 'Food Bowl',   emoji: '🥣', qty: 2 },
    { name: 'Chew Stick',  emoji: '🪵', qty: 6 },
    { name: 'Treat Puzzle',emoji: '🧩', qty: 1 },
  ],
};

const Inventory = ({ onClose, inv }) => {
  const [dept, setDept] = React.useState('hay');
  const data = (inv && inv[dept]) || INV_DATA[dept] || [];

  const slots = [...data];
  while (slots.length < 18) slots.push(null);

  return (
    <div style={{
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      width: '100%',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', gap: 6, padding: '0 4px 10px', flexWrap: 'wrap',
                    borderBottom: '1.5px solid rgba(146,64,14,.25)' }}>
        {INV_DEPARTMENTS.map(d => {
          const active = dept === d.key;
          return (
            <button key={d.key} onClick={() => setDept(d.key)} style={{
              padding: '6px 12px', fontSize: 14, fontWeight: 800,
              border: active ? '2px solid #92400e' : '2px solid transparent',
              borderRadius: 10,
              background: active
                ? 'linear-gradient(180deg,#fffbeb 0%,#fef3c7 100%)'
                : 'transparent',
              color: active ? '#451a03' : '#92400e',
              fontFamily: "'Gaegu', 'Comic Sans MS', cursive",
              cursor: 'pointer',
              display: 'flex', gap: 6, alignItems: 'center',
              boxShadow: active
                ? 'inset 0 1px 0 rgba(255,255,255,.7), 0 2px 4px rgba(69,26,3,.18)'
                : 'none',
              transition: 'transform 100ms ease, box-shadow 150ms ease',
            }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#451a03'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#92400e'; }}
            >
              <span style={{ fontSize: 15 }}>{d.emoji}</span>{d.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '14px 4px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {slots.map((it, i) => (
            <div key={i} style={{
              aspectRatio: '1',
              background: it
                ? 'linear-gradient(180deg,#fffbeb 0%,#fde68a 100%)'
                : 'linear-gradient(180deg,#fef3c7 0%,#fde68a 100%)',
              border: it ? '2px solid #92400e' : '2px dashed rgba(146,64,14,.35)',
              borderRadius: 12,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
              cursor: it ? 'pointer' : 'default',
              boxShadow: it
                ? 'inset 0 1px 0 rgba(255,255,255,.7), 0 2px 4px rgba(69,26,3,.20)'
                : 'inset 0 2px 4px rgba(146,64,14,.18)',
              transition: 'transform 100ms ease, box-shadow 150ms ease',
            }}
              onMouseEnter={(e) => { if (it) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { if (it) e.currentTarget.style.transform = 'translateY(0)'; }}
              title={it?.name}
            >
              {it?.emoji}
              {it && (
                <span style={{
                  position: 'absolute', bottom: -6, right: -4,
                  padding: '1px 6px',
                  fontSize: 11, fontWeight: 800, color: '#fffbeb',
                  background: 'linear-gradient(180deg,#b45309 0%,#7c2d12 100%)',
                  border: '1.5px solid #451a03',
                  borderRadius: 999,
                  fontFamily: "'Gaegu', 'Comic Sans MS', cursive",
                  boxShadow: '0 1px 2px rgba(69,26,3,.4)',
                }}>×{it.qty}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Inventory, INV_DEPARTMENTS });
