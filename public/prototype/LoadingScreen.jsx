// LoadingScreen.jsx — animated splash with running pigs that resolve into a big "GPS2" logo.
//
// Phases:
//   1. RUN   (0 → ~2700ms):  each pig makes ONE trip across the screen, entering from one
//                            edge, exiting the other. Pigs are staggered so they don't all
//                            arrive at once. By the end of this window, every pig is off-screen.
//   2. DROP  (~2700 → 4400ms): pigs reappear above the viewport at their final X positions,
//                              fading in as they fall down (ease-out, soft landing).
//   3. REVEAL (~4400ms+):    the GPS2 wordmark + tagline crossfades in over a soft blurred
//                            spotlight; pigs gently bob in place.
//
// Component owns its own React.useState for the phase clock. Calls onDone() when finished
// so the host can hide it. Uses PigSvg (already a global component).

// Each pig makes a single trip across the screen. `startDelay` staggers the entries so
// the herd flows in waves rather than all-at-once. `lane` is both the vertical row AND
// the direction (lanes 0 + 2 run left→right, lane 1 runs right→left). `speed` scales the
// travel time — higher = faster. The full run window is RUN_TRAVEL_MS, so the slowest
// (speed=0.86) needs RUN_TRAVEL_MS / 0.86 = ~2100ms to cross. With max startDelay below
// that, every pig is guaranteed off-screen by ~startDelay + 2100ms.
const RUN_TRAVEL_MS = 1800; // base time to cross at speed=1
const LOADING_PIGS = [
  { breed: 'American',   colors: ['Cream', 'Brown'],   size: 92,  lane: 0, startDelay: 0,    speed: 1.0  },
  { breed: 'Silkie',     colors: ['Gray'],             size: 96,  lane: 1, startDelay: 120,  speed: 0.98 },
  { breed: 'Peruvian',   colors: ['Orange', 'White'],  size: 100, lane: 2, startDelay: 240,  speed: 0.86 },
  { breed: 'Teddy',      colors: ['Brown', 'Black'],   size: 88,  lane: 0, startDelay: 380,  speed: 1.06 },
  { breed: 'Abyssinian', colors: ['Tortoise'],         size: 84,  lane: 1, startDelay: 520,  speed: 0.92 },
  { breed: 'American',   colors: ['Black'],            size: 80,  lane: 2, startDelay: 660,  speed: 1.04 },
  { breed: 'Silkie',     colors: ['Tricolor'],         size: 92,  lane: 0, startDelay: 800,  speed: 0.9  },
  { breed: 'Abyssinian', colors: ['Orange', 'Cream'],  size: 86,  lane: 1, startDelay: 940,  speed: 1.0  },
  { breed: 'American',   colors: ['White', 'Black'],   size: 90,  lane: 2, startDelay: 1080, speed: 0.94 },
];

const LoadingScreen = ({ onDone, onSkip }) => {
  const [phase, setPhase] = React.useState('run'); // 'run' | 'drop' | 'reveal' | 'gone'
  const [revealing, setRevealing] = React.useState(false);
  // Refs so the click/key handlers below can read live phase + cancel pending
  // timeouts when the user skips ahead.
  const phaseRef = React.useRef(phase);
  React.useEffect(() => { phaseRef.current = phase; }, [phase]);
  const timersRef = React.useRef([]);

  React.useEffect(() => {
    // Slowest pig: startDelay 1080 + travel 1800/0.86 ≈ 1080 + 2093 = 3173ms.
    // Wait until ~3200ms to ensure all pigs are off-screen, then drop.
    const t1 = setTimeout(() => setPhase('drop'),   3200);
    const t2 = setTimeout(() => { setPhase('reveal'); setRevealing(true); }, 4900);
    timersRef.current = [t1, t2];
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Two-stage skip:
  //   1st click during run/drop → jump to the GPS2 reveal screen (don't leave the splash).
  //   click on the reveal screen → dismiss the splash and continue into the game.
  const handleSkip = React.useCallback(() => {
    const p = phaseRef.current;
    if (p === 'run' || p === 'drop') {
      // Cancel pending phase-advance timers and snap to reveal.
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setPhase('reveal');
      setRevealing(true);
      return;
    }
    if (p === 'reveal') {
      setPhase('gone');
      setTimeout(() => onDone && onDone(), 360);
    }
  }, [onDone]);

  // Allow user to skip with click / key
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') handleSkip(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  const fadingOut = phase === 'gone';

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 35%, #fff7e0 0%, #fde8b8 50%, #f5cf80 100%)',
        overflow: 'hidden',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 540ms ease',
        pointerEvents: fadingOut ? 'none' : 'auto',
        cursor: 'pointer',
        fontFamily: "'Gaegu', cursive",
      }}
    >
      <LoadingStyles />

      {/* Skip-intro hint — always visible in lower-right */}
      <div style={{
        position: 'absolute', right: 22, bottom: 18, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        background: 'rgba(255,247,224,.7)',
        border: '1.5px solid rgba(120,53,15,.35)',
        borderRadius: 999,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 600,
        fontSize: 13,
        color: '#7c2d12',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        boxShadow: '0 4px 8px rgba(120,53,15,.18), inset 0 1px 0 rgba(255,255,255,.6)',
        backdropFilter: 'blur(6px)',
        pointerEvents: 'none',
        opacity: fadingOut ? 0 : 0.92,
        transition: 'opacity 360ms ease',
      }}>
        <span>Click to skip intro</span>
        <span aria-hidden="true" style={{ fontSize: 14, opacity: .7 }}>→</span>
      </div>

      {/* Soft sun/spotlight that swells during reveal */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: '50%', top: '38%',
        transform: `translate(-50%, -50%) scale(${revealing ? 1.6 : 0.6})`,
        width: 720, height: 720, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,236,179,0.5) 35%, rgba(255,236,179,0) 70%)',
        opacity: revealing ? 1 : 0.4,
        transition: 'opacity 900ms ease, transform 1100ms cubic-bezier(.34,1.56,.64,1)',
        pointerEvents: 'none',
      }} />

      {/* Scattered hay confetti — drifts continuously while the splash is visible */}
      <HayField active={!fadingOut} />

      {/* The herd */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {LOADING_PIGS.map((p, i) => (
          <RunningPig key={i} pig={p} index={i} phase={phase} total={LOADING_PIGS.length} />
        ))}
      </div>

      {/* Big GPS2 wordmark */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '32%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Gaegu', cursive",
          fontWeight: 700,
          fontSize: 'clamp(120px, 18vw, 240px)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: '#92400e',
          textShadow: `
            0 1px 0 rgba(255,255,255,.7),
            0 4px 0 #b45309,
            0 8px 0 #78350f,
            0 18px 30px rgba(120,53,15,.35)
          `,
          opacity: revealing ? 1 : 0,
          transform: revealing ? 'scale(1) translateY(0)' : 'scale(.6) translateY(40px)',
          transition: 'opacity 540ms ease 80ms, transform 700ms cubic-bezier(.34,1.56,.64,1) 80ms',
        }}>
          GPS<span style={{
            color: '#db2777',
            textShadow: `
              0 1px 0 rgba(255,255,255,.7),
              0 4px 0 #be185d,
              0 8px 0 #9f1239,
              0 18px 30px rgba(159,18,57,.35)
            `,
          }}>2</span>
        </div>
        <div style={{
          marginTop: 4,
          fontFamily: "'Gaegu', cursive",
          fontWeight: 400,
          fontSize: 'clamp(20px, 2.4vw, 30px)',
          color: '#78350f',
          letterSpacing: '0.04em',
          opacity: revealing ? 0.95 : 0,
          transform: revealing ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 540ms ease 360ms, transform 540ms ease 360ms',
        }}>
          Guinea Pig Simulator
        </div>
        {/* Skip hint */}
        <div style={{
          marginTop: 10,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: 'rgba(120,53,15,.5)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: revealing ? 1 : 0,
          transition: 'opacity 540ms ease 720ms',
        }}>
          click anywhere to continue
        </div>
      </div>
    </div>
  );
};

// Single pig sprite — makes one trip across the screen, then drops into place from above.
const RunningPig = ({ pig, index, phase, total }) => {
  const LANE_TOPS = ['58%', '67%', '76%'];
  const flipDir = pig.lane === 1 ? -1 : 1; // mid lane runs right-to-left

  // Final settled X (used by drop + reveal)
  const slot = (index + 0.5) / total - 0.5;
  const spread = 86;
  const settledLeft = `calc(50% + ${slot * spread}vw - ${pig.size / 2}px)`;
  const settledTop = '78%';

  let style = {
    position: 'absolute',
    width: pig.size,
    zIndex: 10 + pig.lane,
    pointerEvents: 'none',
  };
  let className;

  if (phase === 'run') {
    // One-shot trip: enter from one edge, exit the other. animation-fill-mode: forwards
    // (set in CSS) keeps the pig at off-screen-end after the trip.
    const travelMs = Math.round(RUN_TRAVEL_MS / pig.speed);
    className = `gps-run-pig gps-run-pig--lane${pig.lane}`;
    style = {
      ...style,
      top: LANE_TOPS[pig.lane],
      transform: `translate(0, -50%) scaleX(${flipDir})`,
      // Two animations on the lane class: hop + scoot. Same delay for both so they
      // start together. animation-duration list: hop, scoot.
      animationDuration: `420ms, ${travelMs}ms`,
      animationDelay: `${pig.startDelay}ms, ${pig.startDelay}ms`,
      opacity: 1,
    };
  } else if (phase === 'drop') {
    className = 'gps-run-pig';
    style = {
      ...style,
      top: settledTop,
      left: settledLeft,
      transform: `translate(0, calc(-100vh - 50%)) scaleX(${flipDir}) scale(0.9)`,
      opacity: 0,
      animation: 'gps-pig-drop-in 1100ms cubic-bezier(.22, .61, .36, 1) forwards',
      animationDelay: `${index * 70}ms`,
      ['--sx']: flipDir,
    };
  } else { // 'reveal' or 'gone'
    className = 'gps-run-pig';
    style = {
      ...style,
      top: settledTop,
      left: settledLeft,
      transform: `translate(0, -50%) scaleX(${flipDir})`,
      opacity: 1,
    };
  }

  return (
    <div
      className={className}
      style={style}
    >
      <div className={phase === 'reveal' ? 'gps-pig-bob' : ''} style={{ animationDelay: `${index * 80}ms` }}>
        {window.PigSvg
          ? <window.PigSvg breed={pig.breed} colors={pig.colors} size={pig.size} />
          : <div style={{ width: pig.size, height: pig.size * 0.7, background: '#d4a373', borderRadius: '50%' }} />
        }
      </div>
    </div>
  );
};

// Drifting hay specks
const HayField = ({ active }) => {
  const SPECKS = React.useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    left: Math.random() * 100,
    top: 40 + Math.random() * 55,
    rot: Math.random() * 60 - 30,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 1600,
    duration: 1200 + Math.random() * 1400,
  })), []);
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: active ? 1 : 0, transition: 'opacity 600ms' }}>
      {SPECKS.map((s, i) => (
        <div key={i} className="gps-hay" style={{
          position: 'absolute',
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: s.size, height: 2,
          background: 'linear-gradient(90deg, #c4a55a 0%, #e9c878 50%, #c4a55a 100%)',
          borderRadius: 1,
          transform: `rotate(${s.rot}deg)`,
          animationDelay: `${s.delay}ms`,
          animationDuration: `${s.duration}ms`,
          boxShadow: '0 1px 0 rgba(120,53,15,.15)',
        }} />
      ))}
    </div>
  );
};

// One-shot <style> block — keyframes for run, drop-in, hay-drift, and pig-bob.
const LoadingStyles = () => (
  <style>{`
    .gps-run-pig {
      will-change: transform;
    }
    @keyframes gps-pig-hop {
      0%, 100% { translate: 0 0; }
      50%      { translate: 0 -10px; }
    }
    /* One-shot trip: each pig crosses the screen once. animation-fill-mode: both holds
       the pig at the off-screen start position during its startDelay AND at off-screen end
       after the trip completes. Durations here are placeholders — JS overrides them per-pig
       via inline animation-duration. */
    .gps-run-pig--lane0,
    .gps-run-pig--lane2 {
      animation: gps-pig-hop 420ms ease-in-out infinite, gps-scoot-r 1800ms linear 1 both;
    }
    .gps-run-pig--lane1 {
      animation: gps-pig-hop 420ms ease-in-out infinite, gps-scoot-l 1800ms linear 1 both;
    }
    @keyframes gps-scoot-r {
      from { left: -20vw; }
      to   { left: 110vw; }
    }
    @keyframes gps-scoot-l {
      from { left: 110vw; }
      to   { left: -20vw; }
    }
    /* Drop-in: pig falls from above viewport into final position, fading in.
       The animation timing-function (ease-out cubic-bezier on the rule) handles the
       decelerating fall, so we keep the keyframes linear and let the curve do the work. */
    @keyframes gps-pig-drop-in {
      0% {
        opacity: 0;
        transform: translate(0, calc(-100vh - 50%)) scaleX(var(--sx, 1)) scale(0.9);
      }
      30% {
        opacity: 1;
      }
      100% {
        opacity: 1;
        transform: translate(0, -50%) scaleX(var(--sx, 1)) scale(1);
      }
    }
    .gps-pig-bob {
      animation: gps-pig-bob 1100ms ease-in-out infinite;
    }
    @keyframes gps-pig-bob {
      0%, 100% { transform: translateY(0) rotate(-1deg); }
      50%      { transform: translateY(-8px) rotate(2deg); }
    }
    @keyframes gps-hay-drift {
      0%   { opacity: 0; transform: translate(0, 0) rotate(0); }
      30%  { opacity: 1; }
      100% { opacity: 0; transform: translate(-40px, -36px) rotate(60deg); }
    }
    .gps-hay {
      animation: gps-hay-drift 1600ms ease-out infinite;
    }
  `}</style>
);

window.LoadingScreen = LoadingScreen;
