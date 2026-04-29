import { useState } from "react";

/* ============================================================
   Slide 15 — 2025 Achievements: Building a Stronger Credit Position
   ============================================================ */

const ACH_QUADRANTS = [
  {
    key: "equity",
    n: "01",
    title: "Shareholders' Equity & Capital Adequacy",
    metric: { num: "USD 3.5bn", lab: "2025 capital subscription approved" },
    bullets: [
      "Strong and timely shareholder support reflected in paid-in capital contributions.",
      "Subscribed capital effectively raised to approximately USD 6.5bn — more than doubled.",
      "Almost USD 1.2bn made available for potential subscription by new member countries.",
      "NPL and NA loans remain at 0% over the last two decades.",
    ],
  },
  {
    key: "market",
    n: "02",
    title: "Market Activity & Funding",
    metric: { num: "USD 622M", lab: "cumulative issuance · 2025 · 33 transactions" },
    bullets: [
      "Consolidated presence as a regular issuer in international capital markets.",
      "February — first sustainable bond placed privately for USD 40M under the MTN Program.",
      "By November, cumulative volume reached USD 622M across 33 transactions, surpassing the USD 550M annual target.",
    ],
  },
  {
    key: "eea",
    n: "03",
    title: "First Exposure Exchange Agreement",
    metric: { num: "USD 468M", lab: "EEA with CABEI · Nov 2025" },
    bullets: [
      "First operation of its kind carried out by FONPLATA — a synthetic exposure exchange.",
      "Reduces credit-risk concentration and strengthens capital adequacy ratios.",
      "Further reinforces the Bank's solid financial position.",
    ],
  },
  {
    key: "rating",
    n: "04",
    title: "Rating Upgrade to A+ by S&P",
    metric: { num: "A+", lab: "S&P long-term rating · Stable outlook" },
    bullets: [
      "S&P Global Ratings acknowledged the ongoing enhancement of FONPLATA's risk profile.",
      "Robust support from member countries — consistent fulfillment of financial commitments and approved capitalization.",
      "Recognized the optimization of capital management through the first Exposure Exchange Agreement with CABEI.",
    ],
  },
];

function Slide15({ active }) {
  const [sel, setSel] = useState("equity");
  const node = ACH_QUADRANTS.find(q => q.key === sel);

  return (
    <div className="s15">
      <header className="s15__head">
        <div className="s15__h-num">15 · 2025 in review</div>
        <h2 className="s15__h-title">Building a Stronger <span className="thin">Credit Position</span></h2>
        <div className="s15__h-meta">2025 Achievements · Four pillars</div>
      </header>

      <div className="s15__body">
        <div className="s15__matrix">
          <div className="s15__matrix-axis s15__matrix-axis--h"></div>
          <div className="s15__matrix-axis s15__matrix-axis--v"></div>

          {ACH_QUADRANTS.map((q, i) => (
            <button
              key={q.key}
              className={"s15__quad s15__quad--" + i + (sel === q.key ? " is-active" : "")}
              onMouseEnter={() => setSel(q.key)}
              onClick={() => setSel(q.key)}
            >
              <div className="s15__quad-num">{q.n}</div>
              <div className="s15__quad-title">{q.title}</div>
              <div className="s15__quad-metric">
                <span className="s15__quad-metric-num">{q.metric.num}</span>
              </div>
            </button>
          ))}
        </div>

        <aside className="s15__detail" key={sel}>
          <div className="s15__detail-eye">{node.n} · Pillar</div>
          <h3 className="s15__detail-title">{node.title}</h3>

          <div className="s15__detail-metric">
            <div className="s15__detail-metric-num">{node.metric.num}</div>
            <div className="s15__detail-metric-lab">{node.metric.lab}</div>
          </div>

          <ul className="s15__detail-bullets">
            {node.bullets.map((b, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="s15__bullet-num">{String(i + 1).padStart(2, "0")}</span>
                {b}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
export default Slide15;
