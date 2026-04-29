import React from "react";

/* ============================================================
   Slide 2 — Delegation
   ============================================================ */

const DELEGATION = [
  {
    initials: "MM",
    image: "/images/matias.png",
    name: "Matías Mednik",
    role: "Vice President of Finance",
    since: "Since September 2025",
    bio: [
      "Vice President of Finance, leading the Bank's funding programme and balance-sheet strategy. Previously Head of Strategic and Economic Studies at FONPLATA.",
      "Prior experience spans the Inter-American Development Bank Group (IDB Invest, IDB Lab), the Central Bank of Uruguay, BBVA, and several United Nations agencies including UNCTAD and UNDP.",
    ],
    chips: ["Development Finance", "Macroeconomic Analysis", "Sovereign Debt"],
    creds: [
      "MPA — Columbia University (doctoral studies in Political Science)",
      "Economist — University of the Republic, Uruguay",
    ],
  },
  {
    initials: "RS",
    image: "/images/rodrigo.png",
    name: "Rodrigo Saráchaga",
    role: "Head of Financial Resources",
    since: "Since October 2022",
    bio: [
      "Heads the Financial Resources team — responsible for designing and executing the Bank's funding strategy and overseeing investment portfolio management.",
      "Previously Senior Financial Advisor to Uruguay's Public Debt Management Office, executing funding transactions across domestic and international capital markets. Earlier roles include Investment Specialist at Sura AFAP (Uruguay).",
    ],
    chips: ["Funding Strategy", "DCM Execution", "Portfolio Management"],
    creds: [
      "Postgraduate Specialization in Finance — ORT",
      "B.A. Economics — University of the Republic, Uruguay",
    ],
  },
];

function Slide2({ active }) {
  return (
    <div className="s2">
      <header className="s2__head">
        <div className="s2__h-num">02 · Delegation</div>
        <h2 className="s2__h-title">FONPLATA Delegation</h2>
        <div className="s2__h-meta">
          Tokyo &middot; Singapore &middot; Hong Kong<br />
          March 2026
        </div>
      </header>

      <div className="s2__body">
        {DELEGATION.map((p, i) => (
          <article className="s2__person" key={p.name} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <div className="s2__avatar">
              <div className="s2__avatar-ring"></div>
              {p.image ? (
                <img className="s2__avatar-img" src={p.image} alt={p.name} />
              ) : (
                <span className="s2__avatar-mono">{p.initials}</span>
              )}
            </div>

            <div className="s2__name-row">
              <div className="s2__name">{p.name}</div>
              <div className="s2__role">{p.role} <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>· {p.since}</span></div>
            </div>

            <div className="s2__divider"></div>

            <div className="s2__bio">
              {p.bio.map((para, j) => <p key={j}>{para}</p>)}
            </div>

            <div className="s2__chips">
              {p.chips.map(c => <span className="s2__chip" key={c}>{c}</span>)}
            </div>

            <div className="s2__credentials">
              {p.creds.map((c, j) => (
                <React.Fragment key={j}>
                  <span className="cmark">→</span>
                  <span>{c}</span>
                </React.Fragment>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
export default Slide2;
