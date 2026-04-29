import { useState } from "react";

/* ============================================================
   Slide 20 — Credit Risk Transfer · First EEA with CABEI
   ============================================================ */

const EEA_FEATURES = [
  "Mutual exchange of sovereign-guaranteed loan exposures.",
  "FONPLATA acts both as protection buyer and protection seller.",
  "Financial guarantee received from CABEI: USD 450M.",
  "Financial guarantee provided to CABEI: USD 468M.",
  "Enhances portfolio diversification and risk distribution.",
];

const EEA_IMPACT = [
  "Contributes to improved capital efficiency and balance sheet optimization.",
  "Supports FONPLATA's recent upgrade to A+ by S&P.",
  "Strengthens cooperation among MDB peers.",
  "Fully aligned with G20 Capital Adequacy Framework recommendations.",
];

function Slide20({ active }) {
  const [tab, setTab] = useState("features");

  return (
    <div className="s20">
      <header className="s20__head">
        <div className="s20__h-num">20 · Credit risk transfer</div>
        <h2 className="s20__h-title">First Exposure <span className="thin">Exchange Agreement</span></h2>
        <div className="s20__h-meta">November 2025 · FONPLATA × CABEI<br />Strategic milestone · capital efficiency</div>
      </header>

      <div className="s20__body">
        <section className="s20__diagram">
          <svg viewBox="0 0 500 500" className="s20__svg" preserveAspectRatio="xMidYMid meet">
            {/* Outer ring */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="var(--rule)" strokeWidth="1" strokeDasharray="3 5" />

            {/* Top node — FONPLATA */}
            <g transform="translate(250, 100)">
              <circle r="60" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
              <text textAnchor="middle" dy="-6" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.14em" fill="var(--accent)">PROTECTION</text>
              <text textAnchor="middle" dy="14" fontSize="20" fontWeight="700" fill="var(--ink)">FONPLATA</text>
              <text textAnchor="middle" dy="32" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink-3)">A+ / A2</text>
            </g>

            {/* Bottom node — CABEI */}
            <g transform="translate(250, 400)">
              <circle r="60" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
              <text textAnchor="middle" dy="-6" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.14em" fill="var(--ink-3)">COUNTERPARTY</text>
              <text textAnchor="middle" dy="14" fontSize="20" fontWeight="700" fill="var(--ink)">CABEI</text>
              <text textAnchor="middle" dy="32" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink-3)">AA / Aa3</text>
            </g>

            {/* Right curve — FONPLATA → CABEI */}
            <path
              d="M 310 130 Q 430 250 310 370"
              fill="none" stroke="var(--accent)" strokeWidth="2"
              markerEnd="url(#s20-arrow-acc)"
            />
            <text x="430" y="220" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--accent)">USD 468M</text>
            <text x="430" y="234" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.1em" fill="var(--ink-3)">guarantee out</text>

            {/* Left curve — CABEI → FONPLATA */}
            <path
              d="M 190 370 Q 70 250 190 130"
              fill="none" stroke="var(--ink)" strokeWidth="2"
              markerEnd="url(#s20-arrow-ink)"
            />
            <text x="6" y="220" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--ink)">USD 450M</text>
            <text x="6" y="234" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.1em" fill="var(--ink-3)">guarantee in</text>

            {/* Center label */}
            <g transform="translate(250, 250)">
              <rect x="-50" y="-22" width="100" height="44" rx="4" fill="var(--paper)" stroke="var(--rule-strong)" strokeWidth="1" />
              <text textAnchor="middle" dy="-3" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.16em" fill="var(--ink-3)">SYNTHETIC</text>
              <text textAnchor="middle" dy="14" fontSize="13" fontWeight="700" fill="var(--ink)">EEA</text>
            </g>

            <defs>
              <marker id="s20-arrow-acc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
              <marker id="s20-arrow-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)" />
              </marker>
            </defs>
          </svg>
        </section>

        <aside className="s20__panel">
          <div className="s20__panel-eye">Transaction Overview</div>
          <p className="s20__lede">
            In <strong>November 2025</strong>, FONPLATA and CABEI signed an Exposure Exchange Agreement — the <em>first transaction of this type between two Multilateral Development Banks</em> rated in the A/AA category at the time of execution.
          </p>

          <div className="s20__metrics">
            <div className="s20__metric"><div className="s20__metric-num">USD 918M</div><div className="s20__metric-lab">Combined notional</div></div>
            <div className="s20__metric"><div className="s20__metric-num">A+ / AA</div><div className="s20__metric-lab">Counterparty bracket</div></div>
            <div className="s20__metric"><div className="s20__metric-num">First</div><div className="s20__metric-lab">MDB-to-MDB at A/AA</div></div>
          </div>

          <div className="s20__tabs">
            <button className={tab === "features" ? "is-active" : ""} onClick={() => setTab("features")}>Key Features</button>
            <button className={tab === "impact" ? "is-active" : ""} onClick={() => setTab("impact")}>Strategic Impact</button>
          </div>

          <ul className="s20__list" key={tab}>
            {(tab === "features" ? EEA_FEATURES : EEA_IMPACT).map((b, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="s20__list-num">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
export default Slide20;
