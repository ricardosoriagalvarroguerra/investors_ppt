/* ============================================================
   Slide 26 — Section divider · Funding Strategy
   ============================================================ */

function Slide26({ onJump }) {
  return (
    <div className="s16">
      <div className="s16__grid">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="s16__grid-col" />)}
      </div>

      <svg className="s16__bg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="s26-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        {/* Skyline of investment / funding columns */}
        <g transform="translate(0,600)">
          {Array.from({ length: 28 }).map((_, i) => {
            const w = 36;
            const gap = 14;
            const x = i * (w + gap);
            const h = 80 + (Math.sin(i * 0.6) * 0.5 + 0.5) * 240 + (i % 5) * 30;
            return (
              <rect key={i} x={x} y={-h} width={w} height={h}
                fill="url(#s26-grad)" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" />
            );
          })}
          {/* big issuance markers */}
          {[3, 7, 12, 18, 24].map((i) => (
            <circle key={i} cx={i * 50 + 18} cy={-280 - (i % 3) * 40} r="5"
              fill="var(--accent)" opacity="0.4" />
          ))}
        </g>
      </svg>

      <div className="s16__top">
        <div className="s16__chapter">Chapter 03 · Funding</div>
        <div className="s16__progress">
          <span className="s16__progress-current">26</span> · 35
        </div>
      </div>

      <div className="s16__main">
        <div className="s16__index">03</div>
        <div>
          <div className="s16__eyebrow">Section · Capital markets access</div>
          <h2 className="s16__title">
            Funding<br />
            <span className="s16__title-thin">Strategy</span>
          </h2>
          <div className="s16__rule"></div>
          <p className="s16__lede">
            Diversifying our investor base, broadening our currencies, and extending our curve. From multilateral reliance to capital markets access — issuance by issuance.
          </p>
        </div>
      </div>

      <div className="s16__foot">
        <div className="s16__foot-stat">
          <div className="s16__foot-num">USD 2,079M</div>
          <div className="s16__foot-lab">Outstanding · Dec 2025</div>
        </div>
        <div className="s16__foot-stat">
          <div className="s16__foot-num">13</div>
          <div className="s16__foot-lab">Issuances · 2025</div>
        </div>
        <div className="s16__foot-stat">
          <div className="s16__foot-num">USD 622M</div>
          <div className="s16__foot-lab">Annual record · 2025</div>
        </div>
        <div className="s16__foot-stat">
          <div className="s16__foot-num">15Y</div>
          <div className="s16__foot-lab">First-ever tenor reached</div>
        </div>
      </div>
    </div>
  );
}
export default Slide26;
