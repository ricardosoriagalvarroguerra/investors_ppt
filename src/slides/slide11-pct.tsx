import { useState } from "react";

/* ============================================================
   Slide 11 — Proven Preferred Creditor Treatment
   ============================================================ */

const PCT_EVENTS = [
  // side: "top" = crises (above the rail), "bot" = country events (below)
  { year: "2001-02", side: "bot", title: "Argentina",   desc: "Financial crisis and external debt default.",        x: 0.10 },
  { year: "2007",    side: "top", title: "USA",         desc: "Subprime mortgage crisis.",                          x: 0.20 },
  { year: "2009",    side: "bot", title: "Europe",      desc: "Sovereign debt crisis.",                             x: 0.30 },
  { year: "2015",    side: "top", title: "Brazil",      desc: "Economic crisis and loss of investment-grade status.", x: 0.40 },
  { year: "2019",    side: "bot", title: "Bolivia",     desc: "Political and economic crisis.",                     x: 0.50 },
  { year: "2020",    side: "top", title: "COVID-19",    desc: "Global pandemic and economic shock.",                x: 0.62 },
  { year: "2022",    side: "bot", title: "Russia · Ukraine", desc: "Geopolitical conflict and global volatility.",   x: 0.78 },
  { year: "2025",    side: "bot", title: "Bolivia",     desc: "Pressure over Bolivia's credit rating.",             x: 0.92 },
];

const PCT_RATINGS = [
  { x: 0.32, label: "A−", sub: "/ A2", note: "2016" },
  { x: 0.55, label: "A",  sub: "",     note: "2021" },
  { x: 0.92, label: "A+", sub: "",     note: "2025" },
];

function Slide11({ active }) {
  const [sel, setSel] = useState(7);

  return (
    <div className="s11">
      <header className="s11__head">
        <div className="s11__h-num">11 · Track record</div>
        <h2 className="s11__h-title">Proven Preferred <span className="thin">Creditor Treatment</span></h2>
        <div className="s11__h-meta">Spotless record of loan repayments<br />despite adverse circumstances</div>
      </header>

      <div className="s11__rail-wrap">
        <div className="s11__rating-eye">FONPLATA's rating evolution</div>

        <div className="s11__rail">
          {/* Top events (crises) */}
          <div className="s11__row s11__row--top">
            {PCT_EVENTS.filter(e => e.side === "top").map((e, i) => {
              const idx = PCT_EVENTS.indexOf(e);
              return (
                <button
                  key={idx}
                  className={"s11__event s11__event--top " + (idx === sel ? "is-active" : "")}
                  style={{ left: `${e.x * 100}%` }}
                  onMouseEnter={() => setSel(idx)}
                  onClick={() => setSel(idx)}
                >
                  <span className="s11__event-card">
                    <span className="s11__event-year">{e.year}</span>
                    <span className="s11__event-title">{e.title}</span>
                  </span>
                  <span className="s11__event-stem"></span>
                  <span className="s11__event-dot"></span>
                </button>
              );
            })}
          </div>

          {/* The arrow rail */}
          <div className="s11__arrow">
            <div className="s11__arrow-track"></div>
            <div className="s11__arrow-tip"></div>
            {PCT_RATINGS.map((r, i) => (
              <div className="s11__tick" key={i} style={{ left: `${r.x * 100}%` }}>
                <span className="s11__tick-line"></span>
                <span className="s11__tick-label">
                  <span className="s11__tick-big">{r.label}<span className="s11__tick-sub">{r.sub}</span></span>
                  <span className="s11__tick-year">{r.note}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Bottom events (country events) */}
          <div className="s11__row s11__row--bot">
            {PCT_EVENTS.filter(e => e.side === "bot").map((e) => {
              const idx = PCT_EVENTS.indexOf(e);
              return (
                <button
                  key={idx}
                  className={"s11__event s11__event--bot " + (idx === sel ? "is-active" : "")}
                  style={{ left: `${e.x * 100}%` }}
                  onMouseEnter={() => setSel(idx)}
                  onClick={() => setSel(idx)}
                >
                  <span className="s11__event-dot"></span>
                  <span className="s11__event-stem"></span>
                  <span className="s11__event-card">
                    <span className="s11__event-year">{e.year}</span>
                    <span className="s11__event-title">{e.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="s11__detail" key={sel}>
        <div className="s11__detail-eye">{PCT_EVENTS[sel].side === "top" ? "Global crisis event" : "Country event"}</div>
        <div className="s11__detail-row">
          <div className="s11__detail-year">{PCT_EVENTS[sel].year}</div>
          <div>
            <h3 className="s11__detail-title">{PCT_EVENTS[sel].title}</h3>
            <p className="s11__detail-desc">{PCT_EVENTS[sel].desc} <strong>FONPLATA continued to receive timely debt service from member countries throughout.</strong></p>
          </div>
        </div>
      </div>

      <footer className="s11__foot">(*) Ratings shown: S&P (above) and Moody's (below). Source: FONPLATA, S&amp;P, Moody's.</footer>
    </div>
  );
}
export default Slide11;
