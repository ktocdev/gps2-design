// Tutorial.jsx — first-run guided tour for Live Mode.
//
// Spotlight + parchment popover. Matches the notice-board aesthetic of
// SimTopBar / FabMenu / placement banners: brown frame, awning stripe, brass
// rivets, parchment-cream fill, Gaegu headings.
//
// Mechanics:
//   • A target element marked with [data-tutorial="..."] is "spotlighted":
//     four dim panels surround it leaving a hole that highlights the element
//     with a pulsing amber ring. Clicks pass through the hole to the real UI.
//   • If a step is "interactive", clicking the spotlighted element advances
//     to the next step. Next button is the fallback.
//   • Per-step controls: Back · Skip step · Next (or "Start playing" on last).
//     Top-right: Skip tour. Bottom: progress dots + "3 / 8" counter.
//   • Centered "intro" / "outro" steps have no target — the dim is a single
//     flat layer and the card sits in the middle.

const TUTORIAL_STEPS = [
  {
    id: 'welcome',
    voice: 'pig',
    title: 'Wheek! Welcome home!',
    body: "I'm your guide for the next few minutes. I'll point out everything you need to know — and I'll slow time down so we can take it easy.",
    nextLabel: 'Next →',
  },
  {
    // Step 2a — ask the user to click the pig pill themselves. NO autoOpen
    // here: the spotlight stays on the closed pill so it's obvious what to
    // click. Advances to 2b on click (with a 320ms delay so the pill's own
    // click handler runs first and the drawer actually opens).
    id: 'pig-pills',
    voice: 'system',
    target: 'pig-pill',
    title: 'Your guinea pigs',
    body: 'Each pig gets a pill on the bar. A green dot means they\'re happy. An orange or red badge means a need is getting low — the number tells you how many.',
    hint: 'Click the Guinea Pig button.',
    advanceOnTargetClick: true,
    align: 'right',
  },
  {
    // Step 3 — drawer is open on the Info tab. Talk about the pig's profile
    // (breed, friendship, bonds) and ask the user to click the Needs tab.
    // Spotlight covers the whole pill+drawer (target='pig-pill' unions with
    // its open [data-sim-panel] descendant) so the user can read the info.
    // Click is gated to the Needs tab specifically via advanceOnSelector.
    id: 'pig-info',
    voice: 'system',
    target: 'pig-pill',
    autoOpen: 'pig-pill',
    setTab: 'info',
    title: 'Meet each pig',
    body: 'The Info tab shows breed, age, personality — plus how much each pig likes you, and how they’re bonding with the others.',
    hint: 'Click the Needs tab to see what they want.',
    advanceOnSelector: '[data-tutorial="pig-needs-tab"]',
    align: 'right',
  },
  {
    // Step 4 — drawer is open on the Needs tab (we flipped to it in the
    // click handler above; setTab here keeps it on Needs if the user
    // navigates back from a later step).
    id: 'pig-needs',
    voice: 'system',
    target: 'pig-pill',
    autoOpen: 'pig-pill',
    setTab: 'needs',
    title: 'All 10 needs at a glance',
    body: 'This tab shows every need for the selected pig — hunger, thirst, hygiene, social, and the rest. The bars and badges tell you exactly what to top up next. Switch pigs with the tabs at the top.',
    align: 'right',
  },
  {
    id: 'habitat-status',
    voice: 'system',
    target: 'habitat-status',
    // Auto-open the habitat-status dropdown so the user can see the bars.
    autoOpen: 'habitat-status',
    title: 'Habitat health',
    body: 'Water, hay, bedding and overall cleanliness all decay over time. The percentage on the pill is your at-a-glance summary — open the panel to see exactly what needs attention.',
    align: 'right',
  },
  {
    id: 'cage',
    voice: 'pig',
    target: 'cage',
    title: 'My home, my rules',
    body: 'Click any item in the cage — the water bottle, hay rack, bowl, chew, or me! — to inspect, refill, or interact with it. The droppings? Tap to clean. Easy!',
    hint: 'Tap anything in the cage.',
    advanceOnTargetClick: true,
    align: 'right',
    // Items in the cage open popovers that extend ~160px upward. Expand the
    // dim cutout generously so those popovers aren't covered by the overlay.
    holePad: { top: 180, right: 40, bottom: 40, left: 40 },
  },
  {
    id: 'inventory',
    voice: 'system',
    target: 'inventory',
    autoOpen: 'inventory',
    // The user needs to click an inventory item AND then click a cage cell
    // to complete placement — two regions, only one cutout. Let clicks land
    // anywhere on the page so they can actually finish the placement while
    // reading the step.
    allowClicksThrough: true,
    title: 'Inventory',
    body: 'Hay, food, bedding and habitat items you buy at the Supplies Store live here. Click an item, then click a cell in the cage to place it.',
    align: 'left',
  },
  {
    id: 'fabs',
    voice: 'system',
    target: 'fabs',
    title: 'Care actions',
    body: 'Feed, play, give care, socialize, or encourage pig-to-pig interactions. Pick an action, then click the guinea pig who should receive it.',
    hint: 'Open any care menu.',
    advanceOnTargetClick: true,
    align: 'top',
  },
  {
    id: 'activity',
    voice: 'system',
    target: 'activity',
    // Auto-open the activity feed panel as part of this step.
    autoOpen: 'activity',
    title: 'Activity feed',
    body: 'Everything that happens — what you did, how the pigs reacted, automatic events — gets logged here. Great for catching up after stepping away.',
    align: 'right',
  },
  {
    id: 'pause',
    voice: 'system',
    target: 'pause',
    title: 'Pause anytime',
    body: 'Time keeps moving while you play — pigs wander, needs decay. Click pause when you need a break. Nothing changes until you resume.',
    hint: 'Try it!',
    advanceOnTargetClick: true,
    align: 'bottom',
  },
  {
    id: 'supplies',
    voice: 'system',
    target: 'supplies-tab',
    title: 'Restock at the Supplies Store',
    body: 'Hay, food, bedding and habitat items run out. Visit the Supplies Store anytime to restock — pay with coins you earn from caring for your pigs.',
    hint: 'Open the Supplies Store.',
    advanceOnTargetClick: true,
    align: 'bottom',
  },
  {
    id: 'done',
    voice: 'pig',
    title: "You're ready! Popcorn!",
    body: "Wheek wheek! Time will run at normal speed now. Treat me well and we'll have lots of fun together~",
    nextLabel: 'Start playing 🎉',
  },
];

const PARCHMENT_BG = 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)';
const FRAME_BROWN = '#92400e';
const INK = '#451a03';

function BrassStud({ pos }) {
  const [v, h] = pos;
  return (
    <span aria-hidden="true" style={{
      position: 'absolute', [v]: 5, [h]: 5,
      width: 7, height: 7, borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #fde68a, #451a03)',
      boxShadow: 'inset 0 -1px 1px rgba(0,0,0,.4)',
      pointerEvents: 'none', zIndex: 3,
    }} />
  );
}

// One of the four dim panels surrounding the cutout.
//
// `clicksThrough` flips pointer-events to 'none' so clicks land on the UI
// underneath. Used on steps where the user has to interact with TWO regions
// (e.g. pick an inventory item, then click a cell in the cage) — the dim
// stays visible as a focus cue but doesn't trap clicks.
function DimPanel({ style, onClick, clicksThrough }) {
  return (
    <div onClick={onClick} style={{
      position: 'fixed',
      background: 'rgba(28, 16, 4, .58)',
      backdropFilter: 'blur(.5px)',
      pointerEvents: clicksThrough ? 'none' : 'auto',
      transition: 'top 220ms cubic-bezier(.2,.9,.3,1.2), left 220ms cubic-bezier(.2,.9,.3,1.2), width 220ms cubic-bezier(.2,.9,.3,1.2), height 220ms cubic-bezier(.2,.9,.3,1.2), right 220ms cubic-bezier(.2,.9,.3,1.2), bottom 220ms cubic-bezier(.2,.9,.3,1.2)',
      ...style,
    }} />
  );
}

function GuidePig() {
  // A little parchment-style guide pig avatar. Uses hue-rotate so it's
  // slightly tinted vs. the cage pigs — reads as a distinct narrator.
  return (
    <div style={{
      position: 'relative', width: 56, height: 56, flexShrink: 0,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 30%, #fef3c7, #fbbf24)',
      border: `3px solid ${FRAME_BROWN}`,
      boxShadow: '0 3px 5px rgba(69,26,3,.35), inset 0 1px 0 rgba(255,255,255,.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 34, lineHeight: 1,
    }}>
      <span style={{ filter: 'hue-rotate(-15deg)' }}>🐹</span>
      <span aria-hidden="true" style={{
        position: 'absolute', top: -8, left: -10, fontSize: 18,
        transform: 'rotate(-20deg)',
      }}>✨</span>
    </div>
  );
}

function TutorialCard({ step, stepIndex, total, isLast, onNext, onBack, onSkipStep, onSkipTour, position }) {
  const isPig = step.voice === 'pig';
  const stripeColor = isPig ? '#ec4899' : '#fbbf24';
  return (
    <div style={{
      position: 'fixed',
      top: position.top, left: position.left,
      transform: position.transform || 'none',
      width: 380,
      background: PARCHMENT_BG,
      border: `4px solid ${FRAME_BROWN}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 30px 40px -10px rgba(69,26,3,.6), 0 14px 18px -6px rgba(69,26,3,.45), inset 0 2px 0 rgba(255,255,255,.55), inset 0 -2px 0 rgba(0,0,0,.18)',
      color: INK,
      pointerEvents: 'auto',
      animation: 'tutCardPop 280ms cubic-bezier(.2,.9,.3,1.2)',
      fontFamily: 'inherit',
      zIndex: 2,
    }}>
      {/* awning stripe header */}
      <div style={{
        height: 14,
        background: `repeating-linear-gradient(90deg, ${stripeColor} 0 14px, #fffbeb 14px 28px)`,
        borderBottom: `2px solid ${FRAME_BROWN}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.18)',
      }} />
      {/* brass corner studs */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map((pos, j) => (
        <BrassStud key={j} pos={pos} />
      ))}
      {/* paper grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '20px 6px 6px',
        backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 7px, rgba(120,53,15,.05) 7px 8px)',
        pointerEvents: 'none', borderRadius: 4,
      }} />

      {/* Skip-tour close button (top right of card body, NOT covering the stripe) */}
      <button onClick={onSkipTour} title="Skip whole tour" style={{
        position: 'absolute', top: 22, right: 12,
        width: 26, height: 26, borderRadius: 8,
        border: `2px solid ${FRAME_BROWN}`,
        background: PARCHMENT_BG,
        color: '#7c2d12', fontWeight: 800, fontSize: 13, lineHeight: 1,
        cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 2px 3px rgba(69,26,3,.3)',
        zIndex: 4,
      }}>✕</button>

      <div style={{ position: 'relative', padding: '14px 16px 14px 16px' }}>
        {/* Step counter */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          marginBottom: 8, marginTop: 2, paddingRight: 32,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 8px', borderRadius: 999,
            background: '#fff7e6',
            border: `1.5px solid ${FRAME_BROWN}`,
            color: '#7c2d12', fontWeight: 800, fontSize: 11,
            letterSpacing: '.05em', textTransform: 'uppercase',
          }}>
            <span>{stepIndex + 1}</span>
            <span style={{ opacity: .55 }}>/</span>
            <span style={{ opacity: .8 }}>{total}</span>
          </span>
        </div>

        {/* Header row: guide pig + title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {isPig && <GuidePig />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Gaegu', cursive",
              fontSize: 24, fontWeight: 700, lineHeight: 1.15,
              color: '#7c2d12',
              margin: 0,
            }}>{step.title}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{
          marginTop: 8,
          fontSize: 14, lineHeight: 1.45, color: INK,
          fontStyle: isPig ? 'italic' : 'normal',
        }}>{step.body}</div>

        {/* Hint */}
        {step.hint && (
          <div style={{
            marginTop: 10,
            padding: '8px 10px',
            background: '#fff7e6',
            border: '1.5px solid #fcd5a5',
            borderInlineStart: `4px solid ${FRAME_BROWN}`,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 700, color: '#7c2d12',
          }}>
            <span style={{ fontSize: 14 }}>👉</span>
            <span>{step.hint}</span>
          </div>
        )}

        {/* Progress dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 6,
          marginTop: 14, marginBottom: 10,
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{
              width: i === stepIndex ? 18 : 8,
              height: 8, borderRadius: 999,
              background: i === stepIndex
                ? 'linear-gradient(180deg, #d97706 0%, #92400e 100%)'
                : i < stepIndex ? '#a8a29e' : '#fde68a',
              border: `1.5px solid ${i === stepIndex ? '#451a03' : '#92400e'}`,
              transition: 'width 200ms ease',
              boxShadow: i === stepIndex ? '0 1px 2px rgba(69,26,3,.3)' : 'none',
            }} />
          ))}
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 8, marginTop: 6,
          paddingTop: 10, borderTop: '1.5px dashed rgba(146,64,14,.4)',
        }}>
          <button onClick={onBack} disabled={stepIndex === 0} style={{
            padding: '8px 12px', fontSize: 13, fontWeight: 800,
            border: `2px solid ${FRAME_BROWN}`,
            borderRadius: 8,
            background: 'transparent',
            color: stepIndex === 0 ? 'rgba(146,64,14,.35)' : '#7c2d12',
            cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            opacity: stepIndex === 0 ? .5 : 1,
          }}>← Back</button>
          {!isLast && stepIndex !== 0 && (
            <button onClick={onSkipStep} style={{
              padding: '8px 10px', fontSize: 12, fontWeight: 700,
              border: 'none', background: 'transparent',
              color: '#92400e', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
              fontFamily: 'inherit',
            }}>Skip this step</button>
          )}
          <button onClick={onNext} style={{
            padding: '8px 16px', fontSize: 13, fontWeight: 800,
            border: `2.5px solid ${FRAME_BROWN}`,
            borderRadius: 10,
            background: PARCHMENT_BG,
            color: '#7c2d12', cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 6px -2px rgba(69,26,3,.35), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(146,64,14,.22)',
          }}>
            {step.nextLabel || (isLast ? 'Done' : 'Next →')}
          </button>
        </div>
      </div>
    </div>
  );
}

function Tutorial({ onClose, panelHandlers = {} }) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const step = TUTORIAL_STEPS[stepIndex];
  const isLast = stepIndex === TUTORIAL_STEPS.length - 1;
  const [rect, setRect] = React.useState(null);

  // Auto-open / auto-close panels declared by the step. Open on enter,
  // close on leave (and on unmount) so panels don't leak into other steps.
  // The App owns the actual open state — we just call the handler.
  React.useEffect(() => {
    if (step.autoOpen && panelHandlers[step.autoOpen]) {
      panelHandlers[step.autoOpen](true);
    }
    return () => {
      if (step.autoOpen && panelHandlers[step.autoOpen]) {
        panelHandlers[step.autoOpen](false);
      }
    };
  }, [stepIndex, step.autoOpen]);

  // setTab — some steps flip the per-pig drawer tab (Info <-> Needs) as part
  // of the choreography. No cleanup needed; the next step's setTab (or the
  // drawer being closed) takes care of state.
  React.useEffect(() => {
    if (step.setTab && panelHandlers['pig-drawer-tab']) {
      panelHandlers['pig-drawer-tab'](step.setTab);
    }
  }, [stepIndex, step.setTab]);

  // Measure target on every animation frame — handles layout shifts when the
  // user opens a dropdown or the cage pigs wander. If the target has an open
  // [data-sim-panel] descendant (an auto-opened dropdown), we union its bounds
  // with the target's so the spotlight covers BOTH the pill and its panel.
  React.useEffect(() => {
    if (!step.target) { setRect(null); return; }
    let raf;
    const measure = () => {
      const el = document.querySelector(`[data-tutorial="${step.target}"]`);
      if (el) {
        let r = el.getBoundingClientRect();
        // Expand to include any open dropdown panel inside the target wrapper.
        const panel = el.querySelector('[data-sim-panel]');
        if (panel) {
          const pr = panel.getBoundingClientRect();
          r = {
            top: Math.min(r.top, pr.top),
            left: Math.min(r.left, pr.left),
            right: Math.max(r.right, pr.right),
            bottom: Math.max(r.bottom, pr.bottom),
            get width()  { return this.right - this.left; },
            get height() { return this.bottom - this.top; },
          };
        }
        setRect(prev => {
          if (!prev) return r;
          if (Math.abs(prev.top - r.top) < .5 && Math.abs(prev.left - r.left) < .5 &&
              Math.abs(prev.width - r.width) < .5 && Math.abs(prev.height - r.height) < .5) return prev;
          return r;
        });
      } else {
        setRect(null);
      }
      raf = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(raf);
  }, [stepIndex, step.target]);

  // Interaction-gate: clicks on the spotlighted target advance to the next step.
  // `advanceOnTargetClick: true` advances on any click within the target.
  // `advanceOnSelector: '...'` advances only when the click matches a more
  // specific descendant selector (e.g. clicks must hit the Needs tab, not
  // just anywhere in the open drawer).
  React.useEffect(() => {
    if (!step.advanceOnTargetClick && !step.advanceOnSelector) return;
    const onClick = (e) => {
      let matched = false;
      if (step.advanceOnSelector) {
        matched = !!e.target.closest?.(step.advanceOnSelector);
      } else if (step.target) {
        const el = document.querySelector(`[data-tutorial="${step.target}"]`);
        matched = !!el && (el.contains(e.target) || el === e.target);
      }
      if (!matched) return;
      // Small delay so the target's own click handler runs first (e.g. dropdown opens)
      setTimeout(() => {
        setStepIndex(i => Math.min(TUTORIAL_STEPS.length - 1, i + 1));
      }, 320);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [stepIndex, step.target, step.advanceOnTargetClick, step.advanceOnSelector]);

  // Esc skips the whole tour
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const next = () => {
    if (isLast) { onClose(); return; }
    setStepIndex(i => i + 1);
  };
  const back = () => setStepIndex(i => Math.max(0, i - 1));
  const skipStep = () => next();
  const skipTour = () => onClose();

  // The dim CUTOUT around the target. Defaults to a tight PAD on each side;
  // step.holePad can expand specific sides when the target spawns popovers
  // outside its bounds (e.g. the cage's item popovers extend upward).
  // The amber ring matches the cutout so it never slices through those
  // popovers \u2014 a tight 10px ring around the target while a popover floats
  // 100px above it looks broken.
  const PAD = 10;
  const holePadStep = step.holePad || {};
  const hole = rect ? {
    top: Math.max(0, rect.top - (holePadStep.top ?? PAD)),
    left: Math.max(0, rect.left - (holePadStep.left ?? PAD)),
    width: rect.width + (holePadStep.left ?? PAD) + (holePadStep.right ?? PAD),
    height: rect.height + (holePadStep.top ?? PAD) + (holePadStep.bottom ?? PAD),
  } : null;
  const ring = hole;

  // Decide where to place the popover card. Default: opposite the target's
  // vertical center. Step can override with `align: 'top' | 'bottom' | 'left' | 'right'`.
  const popPos = React.useMemo(() => {
    const cardW = 380, cardH = 320;
    const GAP = 24;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (!hole) {
      return { top: vh / 2 - cardH / 2, left: vw / 2 - cardW / 2 };
    }
    const align = step.align ||
      (hole.top + hole.height / 2 < vh / 2 ? 'bottom' : 'top');
    let top, left;
    if (align === 'bottom') {
      top = hole.top + hole.height + GAP;
      left = hole.left + hole.width / 2 - cardW / 2;
    } else if (align === 'top') {
      top = hole.top - cardH - GAP;
      left = hole.left + hole.width / 2 - cardW / 2;
    } else if (align === 'right') {
      top = hole.top + hole.height / 2 - cardH / 2;
      left = hole.left + hole.width + GAP;
    } else { // left
      top = hole.top + hole.height / 2 - cardH / 2;
      left = hole.left - cardW - GAP;
    }
    // Clamp to viewport
    left = Math.max(16, Math.min(vw - cardW - 16, left));
    top  = Math.max(16, Math.min(vh - cardH - 16, top));
    return { top, left };
  }, [hole, step.align]);

  return ReactDOM.createPortal(
    <div data-tutorial-overlay="1" style={{
      position: 'fixed', inset: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      fontFamily: 'Nunito, sans-serif',
    }}>
      {/* Dim layers — four panels around the hole. If no hole, a single full overlay.
          `allowClicksThrough` on a step makes the dim visual-only so clicks pass
          through (used when a step requires interacting with multiple regions —
          e.g. Inventory → cage placement). */}
      {hole ? (
        <React.Fragment>
          <DimPanel clicksThrough={step.allowClicksThrough} style={{ top: 0, left: 0, right: 0, height: hole.top }} />
          <DimPanel clicksThrough={step.allowClicksThrough} style={{ top: hole.top, left: 0, width: hole.left, height: hole.height }} />
          <DimPanel clicksThrough={step.allowClicksThrough} style={{ top: hole.top, left: hole.left + hole.width, right: 0, height: hole.height }} />
          <DimPanel clicksThrough={step.allowClicksThrough} style={{ top: hole.top + hole.height, left: 0, right: 0, bottom: 0 }} />
        </React.Fragment>
      ) : (
        <DimPanel clicksThrough={step.allowClicksThrough} style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
      )}

      {/* Pulsing amber ring around the spotlight (sits on the target itself,
          tighter than the dim cutout so the ring stays visually attached). */}
      {ring && (
        <div style={{
          position: 'fixed',
          top: ring.top, left: ring.left,
          width: ring.width, height: ring.height,
          border: '3px solid #fbbf24',
          borderRadius: 14,
          pointerEvents: 'none',
          animation: 'tutPulse 1.6s ease-in-out infinite',
          transition: 'top 220ms cubic-bezier(.2,.9,.3,1.2), left 220ms cubic-bezier(.2,.9,.3,1.2), width 220ms cubic-bezier(.2,.9,.3,1.2), height 220ms cubic-bezier(.2,.9,.3,1.2)',
        }} />
      )}

      {/* The card */}
      <TutorialCard
        step={step}
        stepIndex={stepIndex}
        total={TUTORIAL_STEPS.length}
        isLast={isLast}
        onNext={next}
        onBack={back}
        onSkipStep={skipStep}
        onSkipTour={skipTour}
        position={popPos}
      />

      <style>{`
        @keyframes tutPulse {
          0%, 100% {
            box-shadow: 0 0 0 3px rgba(251,191,36,.18),
                        0 0 18px 4px rgba(251,191,36,.55),
                        inset 0 0 12px rgba(251,191,36,.25);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(251,191,36,.32),
                        0 0 30px 10px rgba(251,191,36,.8),
                        inset 0 0 18px rgba(251,191,36,.35);
          }
        }
        @keyframes tutCardPop {
          from { opacity: 0; transform: translateY(8px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

Object.assign(window, { Tutorial, TUTORIAL_STEPS });
