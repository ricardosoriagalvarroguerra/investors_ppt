import { useState, useEffect, useRef } from "react";

/* ============================================================
   Slide 10 — Preferred Creditor Status
   ============================================================ */

const PCS = [
  { key: "pri", title: "Priority in repayment",        desc: "Priority in repayment during sovereign stress events.", angle: -90 },
  { key: "rest", title: "Protection from restructuring", desc: "Protection from sovereign debt restructuring processes.", angle: -30 },
  { key: "rat", title: "Pillar of strong ratings",      desc: "Anchors investment-grade credit ratings and capital efficiency.", angle: 30 },
  { key: "res", title: "Financial resilience",         desc: "Contributes to the Bank's financial resilience through-the-cycle.", angle: 90 },
  { key: "char", title: "Constitutive Agreement",       desc: "Anchored in the Bank's Constitutive Agreement.", angle: 150 },
  { key: "exp", title: "Low-risk exposure to LATAM",   desc: "Enables low-risk exposure to Latin America for global investors.", angle: 210 },
];

function Slide10({ active }) {
  const [sel, setSel] = useState("rat");
  const wrapRef = useRef(null);
  const [size, setSize] = useState({ w: 600, h: 600 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const cx = size.w / 2;
  const cy = size.h / 2;
  const R = Math.min(size.w, size.h) * 0.36;

  const sat = PCS.map(s => {
    const rad = (s.angle * Math.PI) / 180;
    return { ...s, x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  });

  return (
    <div className="s10">
      <header className="s10__head">
        <div className="s10__h-num">10 · Credit profile</div>
        <h2 className="s10__h-title">Preferred Creditor <span className="thin">Status</span></h2>
        <div className="s10__h-meta">A strategic pillar of FONPLATA's<br />financial strength and credit standing</div>
      </header>

      <div className="s10__body">
        <div className="s10__hub" ref={wrapRef}>
          <svg className="s10__hub-svg" viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="xMidYMid meet">
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx={cx} cy={cy} r={R * 0.62} fill="none" stroke="var(--rule)" strokeWidth="1" />
            {sat.map(s => (
              <line
                key={s.key}
                x1={cx} y1={cy} x2={s.x} y2={s.y}
                stroke={sel === s.key ? "var(--accent)" : "var(--rule)"}
                strokeWidth={sel === s.key ? 1.2 : 1}
                style={{ transition: "stroke 0.3s ease" }}
              />
            ))}
            <circle cx={cx} cy={cy} r={R * 0.34} fill="var(--accent)" opacity="0.06" />
            <circle cx={cx} cy={cy} r={R * 0.30} fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>

          <div className="s10__center" style={{ width: R * 0.6, height: R * 0.6 }}>
            <div className="s10__center-eye">Preferred</div>
            <div className="s10__center-title">Creditor<br />Status</div>
            <div className="s10__center-iso">PCS</div>
          </div>

          {sat.map(s => (
            <button
              key={s.key}
              className={"s10__sat " + (sel === s.key ? "is-active" : "")}
              style={{ left: s.x, top: s.y }}
              onMouseEnter={() => setSel(s.key)}
              onClick={() => setSel(s.key)}
            >
              <span className="s10__sat-dot"></span>
              <span className="s10__sat-label">{s.title}</span>
            </button>
          ))}
        </div>

        <aside className="s10__panel">
          <div className="s10__panel-eye">Investor takeaway</div>
          <p className="s10__panel-lede">
            As a Multilateral Development Bank, FONPLATA benefits from a <em>de facto</em> seniority under its Preferred Creditor Status — essential to preserve financial strength and credit ratings.
          </p>

          <div className="s10__panel-card" key={sel}>
            <div className="s10__panel-card-eye">Selected dimension</div>
            <h3 className="s10__panel-card-title">{PCS.find(p => p.key === sel).title}</h3>
            <p className="s10__panel-card-desc">{PCS.find(p => p.key === sel).desc}</p>
          </div>

          <div className="s10__panel-rating">
            <div className="s10__panel-rating-eye">Resulting ratings</div>
            <div className="s10__panel-rating-row">
              <div className="s10__rt"><span className="s10__rt-num">A+</span><span className="s10__rt-lab">S&amp;P</span></div>
              <div className="s10__rt"><span className="s10__rt-num">A2</span><span className="s10__rt-lab">Moody's</span></div>
              <div className="s10__rt"><span className="s10__rt-num">Stable</span><span className="s10__rt-lab">Outlook</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default Slide10;
