/* ============================================================
   Slide 33 — Concluding Remarks · 5 takeaway cards
   ============================================================ */

const REMARKS = [
  { letter: "A", title: "Strong Capital Adequacy", body: "FONPLATA boasts a very strong risk-adjusted capital ratio, outperforming regional peers — supported by prudent portfolio rebalancing and consistent shareholder contributions.",
    icon: (
      <svg viewBox="0 0 48 48"><path d="M 24 4 L 42 12 L 42 24 Q 42 38 24 44 Q 6 38 6 24 L 6 12 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 16 24 L 22 30 L 34 18" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
    ),
    pull: "Risk-adjusted ratio · top quartile" },
  { letter: "B", title: "Top LATAM Credit Rating", body: "FONPLATA holds A+/A2 ratings from S&P and Moody's — both with stable outlooks. Reflecting robust liquidity, consistent shareholder support, and Preferred Creditor Treatment (PCT).",
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="24" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 24 30 L 24 42 M 18 38 L 24 42 L 30 38" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text x="24" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">A+</text></svg>
    ),
    pull: "A+ · A2 · stable" },
  { letter: "C", title: "Diversified Funding", body: "Successful sustainable bond issuances and an auspicious kick-off of the MTN program — enhancing diversification across currencies, markets, and thematic issuances while reducing borrowing costs.",
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="24" cy="24" rx="18" ry="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="24" cy="24" rx="7" ry="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.4" /></svg>
    ),
    pull: "13 issuances · 7 sustainable" },
  { letter: "D", title: "Policy Relevance", body: "A USD 3.5 billion capital increase reinforces FONPLATA's regional role — with funds dedicated to advancing MERCOSUR integration and infrastructure development.",
    icon: (
      <svg viewBox="0 0 48 48"><path d="M 6 16 L 24 8 L 42 16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1="10" y1="20" x2="10" y2="36" stroke="currentColor" strokeWidth="1.6" />
        <line x1="20" y1="20" x2="20" y2="36" stroke="currentColor" strokeWidth="1.6" />
        <line x1="28" y1="20" x2="28" y2="36" stroke="currentColor" strokeWidth="1.6" />
        <line x1="38" y1="20" x2="38" y2="36" stroke="currentColor" strokeWidth="1.6" />
        <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" /></svg>
    ),
    pull: "USD 3.5B · MERCOSUR" },
  { letter: "E", title: "Exceptional Portfolio Quality", body: "Zero non-performing loans (NPL) and no write-offs since inception — underscoring FONPLATA's disciplined lending practices and strong risk management.",
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M 24 8 A 16 16 0 0 1 40 24 L 24 24 Z" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="24" r="3" fill="currentColor" /></svg>
    ),
    pull: "0% NPL · since 1974" },
];

function Slide33({ active }) {
  return (
    <div className="s33">
      <header className="s17__head">
        <div className="s17__h-num">33 · Takeaways</div>
        <h2 className="s17__h-title">Concluding <span className="thin">remarks</span></h2>
        <div className="s17__h-meta">Five reasons to invest<br />in FONPLATA</div>
      </header>

      <div className="s33__body">
        {REMARKS.map((r, i) => (
          <article key={r.letter} className="s33__card"
            style={{ animationDelay: `${active ? i * 80 : 0}ms` }}>
            <div className="s33__card-letter">
              <span>{r.letter}</span>
            </div>
            <div className="s33__card-icon" style={{ color: "var(--accent)" }}>
              {r.icon}
            </div>
            <div className="s33__card-body">
              <div className="s33__card-title">{r.title}</div>
              <div className="s33__card-rule" />
              <div className="s33__card-text">{r.body}</div>
            </div>
            <div className="s33__card-pull">{r.pull}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
export default Slide33;
