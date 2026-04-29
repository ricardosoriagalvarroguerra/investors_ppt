import { useState } from "react";

/* ============================================================
   Slide 31 — 2026 Funding Strategy · 5-card grid
   ============================================================ */

const FUND26 = [
  { id: "mtn",   name: "MTN Program",         type: "Multi-currency",  flag: "MTN", desc: "Established platform · multi-tenor",
    icon: (
      <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="32" cy="32" rx="22" ry="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="32" cy="32" rx="9" ry="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.2" />
        <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth="1.2" /></svg>
    ) },
  { id: "chf",   name: "CHF Market",          type: "Public",          flag: "🇨🇭", desc: "Anchor curve · 2021 → present" },
  { id: "mex",   name: "Mexico Program",      type: "CNBV-registered", flag: "🇲🇽", desc: "Local-currency MXN · new" },
  { id: "synd",  name: "Syndicated Bank Loans", type: "Bank",          flag: "🏦", desc: "Bilateral & syndicated facilities",
    icon: (
      <svg viewBox="0 0 64 64"><rect x="10" y="22" width="44" height="3" fill="currentColor" />
        <rect x="14" y="28" width="4" height="22" fill="currentColor" />
        <rect x="22" y="28" width="4" height="22" fill="currentColor" />
        <rect x="30" y="28" width="4" height="22" fill="currentColor" />
        <rect x="38" y="28" width="4" height="22" fill="currentColor" />
        <rect x="46" y="28" width="4" height="22" fill="currentColor" />
        <rect x="8" y="50" width="48" height="4" fill="currentColor" />
        <path d="M 32 8 L 56 22 L 8 22 Z" fill="currentColor" /></svg>
    ) },
  { id: "off",   name: "Official & Multilateral",  type: "DFI",       flag: "🌐", desc: "CAF · ICO · CDP · KfW · IDB",
    icon: (
      <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 12 32 Q 32 16 52 32 Q 32 48 12 32" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="32" y1="12" x2="32" y2="52" stroke="currentColor" strokeWidth="1.2" />
        <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1.2" /></svg>
    ) },
];

const MIX = [
  { lab: "Capital Markets",        v: "70–80%", color: "var(--chart-6)" },
  { lab: "Loan Market",            v: "10–25%", color: "var(--chart-7)" },
  { lab: "Official & Multilateral", v: "5–10%",  color: "var(--chart-4)" },
];

function Slide31() {
  const [active, setActive] = useState("mtn");

  return (
    <div className="s31">
      <header className="s17__head">
        <div className="s17__h-num">31 · 2026 strategy</div>
        <h2 className="s17__h-title">Diversified <span className="thin">market access</span></h2>
        <div className="s17__h-meta">2026 funding strategy<br />USD 750M estimated need</div>
      </header>

      <div className="s31__body">
        <aside className="s31__rail">
          <div className="s31__lede">
            FONPLATA intends to meet its 2026 funding requirements through a diversified combination of <strong>capital markets</strong> and <strong>bank funding</strong>, leveraging its established MTN platform, expanding investor base, and strong relationships with international financial institutions.
          </div>

          <div className="s31__needs">
            <div className="s31__needs-eye">2026 estimated funding needs</div>
            <div className="s31__needs-num">USD 750 M</div>
          </div>

          <div className="s31__mix">
            <div className="s31__mix-eye">Indicative funding mix</div>
            <div className="s31__mix-bar">
              {MIX.map((m, i) => (
                <div key={i} className="s31__mix-seg" style={{ background: m.color, flex: i === 0 ? 7 : i === 1 ? 2.5 : 1 }}>
                  <span>{m.v}</span>
                </div>
              ))}
            </div>
            <div className="s31__mix-list">
              {MIX.map((m, i) => (
                <div key={i} className="s31__mix-row">
                  <span className="s31__mix-sw" style={{ background: m.color }} />
                  <span className="s31__mix-lab">{m.lab}</span>
                  <span className="s31__mix-val">{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="s31__cards">
          {FUND26.map((c) => (
            <button key={c.id}
              className={"s31__card " + (active === c.id ? "is-active" : "")}
              onMouseEnter={() => setActive(c.id)}
              onClick={() => setActive(c.id)}
            >
              <div className="s31__card-head">
                <div className="s31__card-name">{c.name}</div>
                <div className="s31__card-rule" />
              </div>
              <div className="s31__card-icon">
                {c.icon ? <span style={{ color: "var(--accent)" }}>{c.icon}</span>
                       : <span className="s31__card-flag">{c.flag}</span>}
              </div>
              <div className="s31__card-foot">
                <div className="s31__card-type">{c.type}</div>
                <div className="s31__card-desc">{c.desc}</div>
              </div>
            </button>
          ))}
        </section>
      </div>

      <div className="s31__pull">
        FONPLATA maintains flexibility to adapt its funding strategy in response to market opportunities — securing competitive financing while further diversifying its investor base.
      </div>
    </div>
  );
}
export default Slide31;
