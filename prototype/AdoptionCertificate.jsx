// AdoptionCertificate.jsx — modal overlay shown after the user clicks "Adopt"
// in the Pet Store. Reads like a real adoption certificate: ornate parchment
// frame, official typography (serif + script signatures), per-pig stat block,
// date + serial, three endorsement signatures, embossed seal. User clicks
// "Start Game" to dismiss and actually begin play.
//
// Props:
//   entries: [{ originalName, name }, ...]    — what the user picked / named
//   onStart: ()  => commit adoption + start the game
//   onCancel: () => close the certificate without adopting

const FUR_NAME_TO_HEX_LOCAL = (window.FUR_NAME_TO_HEX) || {
  White: '#ffffff', Black: '#1a1a1a', Brown: '#8b5a2b', Cream: '#f5e6c8',
  Gray: '#9aa0a6', Orange: '#d97706', Tortoise: '#8b4513', Tricolor: '#a16207',
  Beige: '#e7d3a8', Chocolate: '#3f2010',
};

// Deterministic hash so derived fun stats stay stable across re-renders.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}
const pick = (str, list) => list[hash(str) % list.length];
const num  = (str, min, max) => min + (hash(str) % (max - min + 1));

const SNACKS    = ['Romaine', 'Bell Pepper', 'Strawberry', 'Carrot Top', 'Cilantro', 'Apple Slice', 'Parsley', 'Cucumber'];
const STAR_SIGN = ['Aries 🐏', 'Taurus 🐂', 'Gemini 👯', 'Cancer 🦀', 'Leo 🦁', 'Virgo 🌾', 'Libra ⚖️', 'Scorpio 🦂', 'Sagittarius 🏹', 'Capricorn 🐐', 'Aquarius 🌊', 'Pisces 🐟'];
const SQUEAKS  = ['Soprano', 'Mezzo', 'Tenor', 'Baritone', 'Operatic', 'Whisper'];

function statsFor(pig, displayName) {
  const seed = (pig?.name || displayName || 'pig') + '|' + (pig?.breed || '');
  return {
    weight: (num(seed, 14, 36) / 10).toFixed(1) + ' oz',
    snack:  pick(seed + 'snack', SNACKS),
    sign:   pick(seed + 'sign',  STAR_SIGN),
    squeak: pick(seed + 'sq',    SQUEAKS),
    wpm:    num(seed + 'wpm', 18, 47), // wheeks per minute
  };
}

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function certNumber(entries) {
  const seed = entries.map(e => e.originalName + '|' + e.name).join('::') + '|' + new Date().toDateString();
  const n = hash(seed) % 99999;
  return 'GP-' + new Date().getFullYear() + '-' + String(n).padStart(5, '0');
}

// One pig stat card inside the certificate
function PigCard({ entry, pig }) {
  const PigSvg = window.PigSvg;
  const s = statsFor(pig, entry.name);
  const swatches = (pig?.colors || []).map(c => ({ name: c, hex: FUR_NAME_TO_HEX_LOCAL[c] || '#ccc' }));
  const wasRenamed = entry.originalName !== entry.name;
  return (
    <div style={{
      flex: 1,
      background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)',
      border: '2px solid #92400e',
      borderRadius: 6,
      padding: 10,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 1px 2px rgba(69,26,3,.15)',
      position: 'relative',
    }}>
      {/* Inner hairline frame */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 5,
        border: '1px solid rgba(146,64,14,.3)', borderRadius: 4, pointerEvents: 'none',
      }} />

      {/* Pig portrait + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, position: 'relative' }}>
        <div style={{
          width: 60, height: 60,
          background: 'radial-gradient(circle at 40% 35%, #fff7e6 0%, #fde68a 70%, #fbbf24 100%)',
          border: '2px solid #92400e', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'inset 0 -3px 4px rgba(146,64,14,.18), 0 2px 3px rgba(69,26,3,.25)',
        }}>
          {PigSvg && pig ? <PigSvg breed={pig.breed} colors={pig.colors} size={46} /> : <span style={{ fontSize: 32 }}>🐹</span>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Caveat', 'Brush Script MT', cursive",
            fontSize: 26, fontWeight: 700, lineHeight: 1,
            color: '#451a03',
            textShadow: '0 1px 0 rgba(255,255,255,.5)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{entry.name}</div>
          {wasRenamed && (
            <div style={{ fontSize: 10, color: '#92400e', fontStyle: 'italic', marginTop: -1 }}>
              né{(pig?.gender === 'sow') ? 'e' : ''} {entry.originalName}
            </div>
          )}
          <div style={{
            display: 'inline-block', marginTop: 2,
            padding: '0 7px', fontSize: 8.5, letterSpacing: '.14em', fontWeight: 800,
            textTransform: 'uppercase', color: '#fef3c7',
            background: 'linear-gradient(180deg, #b45309 0%, #7c2d12 100%)',
            border: '1px solid #451a03', borderRadius: 3,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.25)',
          }}>{pig?.gender === 'boar' ? '♂ Boar' : '♀ Sow'}</div>
        </div>
      </div>

      {/* Stats table */}
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 11.5, color: '#451a03',
        display: 'grid', gridTemplateColumns: '78px 1fr',
        rowGap: 2, columnGap: 8,
        borderTop: '1.5px dashed rgba(146,64,14,.45)',
        borderBottom: '1.5px dashed rgba(146,64,14,.45)',
        padding: '6px 2px', marginBottom: 6,
      }}>
        <span style={{ color: '#7c2d12', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '.04em' }}>Breed</span>
        <span style={{ fontWeight: 600 }}>{pig?.breed || '—'}</span>
        <span style={{ color: '#7c2d12', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '.04em' }}>Disposition</span>
        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{pig?.personality || '—'}</span>
        <span style={{ color: '#7c2d12', fontWeight: 700, fontVariant: 'small-caps', letterSpacing: '.04em' }}>Coat</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {swatches.map((sw, i) => (
            <span key={i} title={sw.name} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: sw.hex, border: '1px solid #451a03',
              boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.25)',
            }} />
          ))}
          <span style={{ fontWeight: 600 }}>{(pig?.colors || []).join(', ') || '—'}</span>
        </span>
      </div>

      {/* Fun extras */}
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 11, color: '#451a03',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 8px',
        lineHeight: 1.25,
      }}>
        <div><span style={{ color: '#7c2d12', fontVariant: 'small-caps', fontWeight: 700, letterSpacing: '.04em' }}>Star sign</span> {s.sign}</div>
      </div>
    </div>
  );
}

// Decorative corner flourish (SVG fleuron, top-left orientation)
function CornerFlourish({ rotate = 0 }) {
  return (
    <svg viewBox="0 0 60 60" width="42" height="42" style={{ transform: `rotate(${rotate}deg)` }}>
      <g fill="none" stroke="#451a03" strokeWidth="1.6" strokeLinecap="round">
        <path d="M2 2 L18 2" />
        <path d="M2 2 L2 18" />
        <path d="M2 2 C 14 6, 14 14, 6 18 C 14 14, 22 14, 26 22" />
        <path d="M2 2 C 6 14, 14 14, 18 6 C 14 14, 14 22, 22 26" />
        <circle cx="22" cy="22" r="2" fill="#b45309" />
      </g>
    </svg>
  );
}

const AdoptionCertificate = ({ entries = [], onStart, onCancel }) => {
  // Look up real pig profiles for the picked entries
  const allPigs = (window.CAGES || []).flatMap(c => c.pigs);
  const profileFor = (n) => allPigs.find(p => p.name === n);

  // Two-stage exit:
  //  1) user clicks "Adopt" → setStamped(true)  → the ADOPTED rubber stamp
  //     slams down on the cert (acStamp keyframes).
  //  2) ~900ms later → setExiting(true) → the whole overlay fades out, and
  //     when that fade settles we finally call onStart() to enter Live Mode.
  const [stamped, setStamped] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);

  const handleAdopt = React.useCallback(() => {
    if (stamped) return; // ignore double clicks
    setStamped(true);
    // Stamp animation runs ~700ms; let it settle, then begin fade.
    setTimeout(() => setExiting(true), 900);
    // Fade lasts 500ms; commit adoption + start game after it completes.
    setTimeout(() => { onStart && onStart(); }, 1400);
  }, [stamped, onStart]);

  // Lock body scroll while overlay is open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Auto-focus the Adopt button so Enter triggers it
  const startRef = React.useRef(null);
  React.useEffect(() => {
    const id = setTimeout(() => startRef.current?.focus(), 50);
    const onKey = (e) => {
      if (stamped) return; // lock keys during the stamp+fade exit
      if (e.key === 'Escape' && onCancel) onCancel();
      else if (e.key === 'Enter') handleAdopt();
    };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(id); window.removeEventListener('keydown', onKey); };
  }, [handleAdopt, onCancel, stamped]);

  const date = todayLabel();
  const cert = certNumber(entries);
  const names = entries.map(e => e.name);
  const namesPretty = names.length === 2 ? `${names[0]} and ${names[1]}` : names.join(', ');

  return (
    <div
      role="dialog" aria-modal="true" aria-labelledby="ac-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'radial-gradient(ellipse at center, rgba(69,26,3,.55), rgba(0,0,0,.85))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, overflowY: 'auto',
        animation: exiting ? 'acFadeOut 500ms ease forwards' : 'acFadeIn 240ms ease',
        pointerEvents: exiting ? 'none' : 'auto',
      }}>
      <style>{`
        @keyframes acFadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes acFadeOut  { from { opacity: 1; } to { opacity: 0; } }
        @keyframes acRise     { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes acStamp    { 0% { opacity: 0; transform: translate(-50%, -50%) rotate(-18deg) scale(2.4); } 60% { opacity: 1; transform: translate(-50%, -50%) rotate(-12deg) scale(1.08); } 100% { opacity: .78; transform: translate(-50%, -50%) rotate(-12deg) scale(1); } }
        @keyframes acGlimmer  { 0%,100% { transform: rotate(45deg) translate(-100%); opacity: 0; } 50% { transform: rotate(45deg) translate(100%); opacity: .35; } }
      `}</style>

      <div style={{
        position: 'relative',
        width: '100%', maxWidth: 780,
        background:
          /* faint scrolled-paper noise via repeating gradients */
          'repeating-linear-gradient(90deg, rgba(146,64,14,.025) 0 1px, transparent 1px 5px), ' +
          'repeating-linear-gradient(0deg,  rgba(146,64,14,.02)  0 1px, transparent 1px 7px), ' +
          'radial-gradient(ellipse at 50% 0%, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)',
        border: '3px solid #451a03',
        borderRadius: 10,
        padding: '20px 32px 18px',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,.55), inset 0 0 0 1px rgba(146,64,14,.2)',
        color: '#451a03',
        animation: 'acRise 380ms cubic-bezier(.2,.9,.3,1.1)',
      }}>
        {/* Single inner hairline frame (was double) */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 10,
          border: '1px solid rgba(146,64,14,.35)', borderRadius: 6, pointerEvents: 'none',
        }} />

        {/* Corner flourishes — lighter opacity to recede */}
        <div style={{ position: 'absolute', top: 18, left: 18, opacity: .55 }}><CornerFlourish rotate={0} /></div>
        <div style={{ position: 'absolute', top: 18, right: 18, opacity: .55 }}><CornerFlourish rotate={90} /></div>
        <div style={{ position: 'absolute', bottom: 18, left: 18, opacity: .55 }}><CornerFlourish rotate={-90} /></div>
        <div style={{ position: 'absolute', bottom: 18, right: 18, opacity: .55 }}><CornerFlourish rotate={180} /></div>

        {/* Close (top-right inside frame) */}
        <button onClick={onCancel} aria-label="Close" style={{
          position: 'absolute', top: -14, right: -14, zIndex: 5,
          width: 28, height: 28, padding: 0,
          border: '3px solid #451a03', borderRadius: '50%',
          background: '#fffbeb',
          color: '#451a03', fontWeight: 700, fontSize: 13, lineHeight: 1,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(69,26,3,.35)',
        }}>✕</button>

        {/* Crest */}
        <div style={{ textAlign: 'center', marginTop: 2, marginBottom: 4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 52, height: 52, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #fffbeb 0%, #fde68a 55%, #b45309 100%)',
            border: '2.5px solid #451a03',
            boxShadow: 'inset 0 -3px 5px rgba(69,26,3,.4), inset 0 2px 0 rgba(255,255,255,.6), 0 2px 3px rgba(69,26,3,.4)',
            fontSize: 26, lineHeight: 1,
          }}>🐹</div>
        </div>

        {/* Title block */}
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <div style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase',
            color: '#7c2d12', fontWeight: 700, marginBottom: 2,
          }}>
            — The Cuddly Cavies Adoption Bureau —
          </div>
          <h1 id="ac-title" style={{
            margin: 0,
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 30, lineHeight: 1.05, fontWeight: 700,
            color: '#451a03',
            letterSpacing: '.02em',
            textShadow: '0 1px 0 rgba(255,255,255,.55)',
          }}>
            Certificate <span style={{ fontStyle: 'italic', fontWeight: 400 }}>of</span> Adoption
          </h1>
          {/* ornamental rule */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ flex: '0 0 60px', height: 1, background: 'linear-gradient(90deg, transparent, #92400e, transparent)' }} />
            <span style={{ fontSize: 11, color: '#92400e' }}>✦</span>
            <span style={{ flex: '0 0 60px', height: 1, background: 'linear-gradient(90deg, transparent, #92400e, transparent)' }} />
          </div>
        </div>

        {/* Preamble */}
        <p style={{
          margin: '6px 24px 10px',
          textAlign: 'center',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 12.5, lineHeight: 1.4, color: '#451a03',
        }}>
          Be it known that on this day, <strong style={{ fontWeight: 700 }}>{date}</strong>,{' '}
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: '#7c2d12', fontWeight: 700 }}>
            {namesPretty}
          </span>{' '}
          have been lovingly entrusted into the care of their new forever home.
        </p>

        {/* Pig cards */}
        <div style={{ display: 'flex', gap: 10, margin: '0 4px 22px' }}>
          {entries.map((e, i) => (
            <PigCard key={i} entry={e} pig={profileFor(e.originalName)} />
          ))}
        </div>

        {/* Signature row — right padding reserves space for the wax seal */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 14, margin: '14px 8px 4px',
          paddingRight: 96,
        }}>
          {[
            { sig: 'Hazel Whiskers',    title: 'Head Caretaker',  font: "'Caveat', cursive" },
            { sig: 'Dr. P. Pellets',    title: 'Cavy Veterinarian', font: "'Caveat', cursive" },
            { sig: 'You',                title: 'Forever Friend',   font: "'Caveat', cursive", you: true },
          ].map((row, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                height: 26,
                fontFamily: row.font,
                fontSize: 22, fontWeight: 700,
                color: row.you ? '#b45309' : '#451a03',
                fontStyle: row.you ? 'italic' : 'normal',
                lineHeight: 1.1,
                transform: i === 0 ? 'rotate(-2deg)' : i === 1 ? 'rotate(1.5deg)' : 'rotate(-1deg)',
              }}>{row.sig}</div>
              <div style={{
                borderTop: '1.5px solid #451a03',
                marginTop: 0, paddingTop: 2,
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase',
                color: '#7c2d12', fontWeight: 700,
              }}>{row.title}</div>
            </div>
          ))}
        </div>

        {/* Footer meta row — right padding reserves space for the wax seal */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 18, padding: '6px 4px 0',
          paddingRight: 96,
          borderTop: '1.5px dashed rgba(146,64,14,.4)',
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 10.5, color: '#7c2d12',
        }}>
          <span><strong style={{ color: '#451a03' }}>Cert. No.</strong>&nbsp; {cert}</span>
          <span></span>
          <span><strong style={{ color: '#451a03' }}>Issued</strong>&nbsp; {date}</span>
        </div>

        {/* Wax seal — anchored bottom-right, sized to sit inside the reserved
            right column of the signature + footer rows so it never overlaps
            text. */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: 24, bottom: 70,
          width: 72, height: 72, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #f59e0b 0%, #b91c1c 55%, #7f1d1d 100%)',
          border: '2px solid #450a0a',
          boxShadow: 'inset 0 -5px 8px rgba(0,0,0,.4), 0 5px 8px rgba(69,26,3,.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(-8deg)',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            border: '1.5px dashed rgba(255,255,255,.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            color: '#fef3c7', textAlign: 'center',
            fontFamily: 'Georgia, serif',
            textShadow: '0 1px 1px rgba(0,0,0,.5)',
          }}>
            <div style={{ fontSize: 18, lineHeight: 1 }}>🐾</div>
            <div style={{ fontSize: 6.5, letterSpacing: '.16em', fontWeight: 800, marginTop: 1 }}>OFFICIAL</div>
            <div style={{ fontSize: 6.5, letterSpacing: '.16em', fontWeight: 800 }}>SEAL</div>
          </div>
        </div>

        {/* "ADOPTED" stamp — only appears after the user clicks the Adopt
            button below. Slams down over the certificate, then the whole
            overlay fades to Live Mode. */}
        {stamped && (
          <div aria-hidden="true" style={{
            position: 'absolute', left: 150, top: 110,
            padding: '6px 18px',
            border: '4px solid #b91c1c',
            borderRadius: 5,
            color: '#b91c1c',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 900, fontSize: 34, letterSpacing: '.18em',
            textShadow: '1px 1px 0 rgba(185,28,28,.15)',
            background: 'transparent',
            opacity: 0.78,
            transform: 'translate(-50%, -50%) rotate(-12deg)',
            animation: 'acStamp 600ms cubic-bezier(.2,.9,.3,1.5) forwards',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 20,
          }}>ADOPTED</div>
        )}

        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, marginTop: 12,
        }}>
          {onCancel && (
            <button onClick={onCancel} disabled={stamped} style={{
              padding: '0 14px', height: 38,
              background: 'transparent',
              color: '#7c2d12', fontWeight: 700, fontSize: 13,
              border: '2px dashed rgba(146,64,14,.6)', borderRadius: 999,
              cursor: stamped ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              opacity: stamped ? 0.4 : 1,
            }}>Choose different pigs</button>
          )}
          <button ref={startRef} onClick={handleAdopt} disabled={stamped} className="gp-btn--tactile" style={{
            padding: '0 28px', height: 48,
            background: 'linear-gradient(180deg,#ec4899 0%,#db2777 100%)',
            color: '#fff', fontWeight: 800, fontSize: 18,
            fontFamily: "'Gaegu', 'Comic Sans MS', cursive",
            border: '3px solid #451a03', borderRadius: 999,
            cursor: stamped ? 'default' : 'pointer',
            boxShadow: '0 8px 14px -3px rgba(219,39,119,.55), inset 0 2px 0 rgba(255,255,255,.4), inset 0 -2px 0 rgba(0,0,0,.18)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            opacity: stamped ? 0.85 : 1,
          }}>
            Adopt
          </button>
        </div>
      </div>
    </div>
  );
};

window.AdoptionCertificate = AdoptionCertificate;
