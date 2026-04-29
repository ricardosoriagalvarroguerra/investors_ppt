/* ============================================================
   Slide 32 — Section divider · Concluding Remarks
   ============================================================ */

function Slide32() {
  return (
    <div className="s16">
      <div className="s16__grid">
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="s16__grid-col" />)}
      </div>

      <svg className="s16__bg" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="s32-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
          <pattern id="s32-road" patternUnits="userSpaceOnUse" width="80" height="6" patternTransform="skewX(-12)">
            <rect width="40" height="6" fill="var(--accent)" opacity="0.18" />
          </pattern>
        </defs>
        <g transform="translate(0,540)">
          <path d="M 0 0 L 1600 -120 L 1600 60 L 0 60 Z" fill="url(#s32-grad)" />
          <path d="M 0 0 L 1600 -120" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="2" />
          <path d="M 0 30 L 1600 -90" stroke="url(#s32-road)" strokeWidth="3" />
        </g>
      </svg>

      <div className="s16__top">
        <div className="s16__chapter">Chapter 04 · Closing</div>
        <div className="s16__progress">
          <span className="s16__progress-current">32</span> · 35
        </div>
      </div>

      <div className="s16__main">
        <div className="s16__index">04</div>
        <div>
          <div className="s16__eyebrow">Section · The road ahead</div>
          <h2 className="s16__title">
            Concluding<br />
            <span className="s16__title-thin">Remarks</span>
          </h2>
          <div className="s16__rule"></div>
          <p className="s16__lede">
            Strong capital, top LATAM rating, diversified funding, regional policy relevance, and exceptional portfolio quality. Five reasons FONPLATA is on the road to becoming the partner of choice.
          </p>
        </div>
      </div>

      <div className="s16__foot">
        <div className="s16__foot-stat"><div className="s16__foot-num">A+ / A2</div><div className="s16__foot-lab">S&P / Moody's</div></div>
        <div className="s16__foot-stat"><div className="s16__foot-num">0%</div><div className="s16__foot-lab">NPL · since inception</div></div>
        <div className="s16__foot-stat"><div className="s16__foot-num">USD 3.5B</div><div className="s16__foot-lab">3ʳᵈ Capital Increase</div></div>
        <div className="s16__foot-stat"><div className="s16__foot-num">2026</div><div className="s16__foot-lab">Strategy in motion</div></div>
      </div>
    </div>
  );
}
export default Slide32;
