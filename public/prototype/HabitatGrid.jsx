// HabitatGrid.jsx — top-down 8×6 cage grid with placed items and wandering pigs
const CELL = 44;
const COLS = 8, ROWS = 6;

const ITEM_EMOJI = {
  house: '🏠', water: '🧴', food: '🥣', hay: '🌾',
  bed: '🛏️', toy: '🎾', chew: '🪵', litter: '🟫',
};

const HabitatGrid = ({ items = [], pigs = [], dirty = 20, targetingPigs = false, onPigClick }) => {
  // build a cell map for quick lookup
  const map = {};
  items.forEach(it => { map[`${it.x},${it.y}`] = it; });

  // dirt patches (randomly scattered based on dirty value)
  const dirtCount = Math.round((dirty / 100) * COLS * ROWS * 0.3);
  const dirts = [];
  for (let i = 0; i < dirtCount; i++) {
    dirts.push({ x: (i * 3 + 1) % COLS, y: (i * 2) % ROWS });
  }

  return (
    <div style={{
      position: 'relative', display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
      gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
      gap: 1, background: '#92400e', padding: 6, borderRadius: 10,
      boxShadow: 'inset 0 2px 6px rgba(0,0,0,.25)',
      width: 'fit-content',
    }}>
      {/* bedding cells */}
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const x = i % COLS, y = Math.floor(i / COLS);
        const item = map[`${x},${y}`];
        const hasDirt = dirts.some(d => d.x === x && d.y === y);
        return (
          <div key={i} style={{
            width: CELL, height: CELL,
            background: hasDirt ? '#a16207' : '#d4a373',
            backgroundImage: hasDirt
              ? 'radial-gradient(circle at 30% 40%, #713f12 0 3px, transparent 4px), radial-gradient(circle at 70% 60%, #713f12 0 2px, transparent 3px)'
              : 'repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,.04) 3px 4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, borderRadius: 2,
          }}>
            {item && ITEM_EMOJI[item.type]}
          </div>
        );
      })}
      {/* pigs absolutely positioned */}
      {pigs.map((p, i) => (
        <div key={i}
          onClick={(e) => { if (targetingPigs && onPigClick) { e.stopPropagation(); onPigClick(p); } }}
          style={{
            position: 'absolute',
            left: 6 + p.x * (CELL + 1) + CELL / 2 - 14,
            top: 6 + p.y * (CELL + 1) + CELL / 2 - 14,
            fontSize: 28, transition: 'left 600ms ease, top 600ms ease',
            filter: targetingPigs
              ? 'drop-shadow(0 0 10px #fbbf24) drop-shadow(0 2px 3px rgba(0,0,0,.25))'
              : 'drop-shadow(0 2px 3px rgba(0,0,0,.25))',
            cursor: targetingPigs ? 'pointer' : 'grab',
            zIndex: targetingPigs ? 3 : 1,
          }} title={p.name}>
          {targetingPigs && (
            <span style={{
              position: 'absolute', inset: -6,
              border: '3px solid #fbbf24', borderRadius: '50%',
              animation: 'pigPulse 1.1s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          )}
          🐹
        </div>
      ))}
      <style>{`@keyframes pigPulse { 0%, 100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.25); opacity: .3; } }`}</style>
    </div>
  );
};

Object.assign(window, { HabitatGrid });
