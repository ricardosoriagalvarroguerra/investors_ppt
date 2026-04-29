/* ============================================================
   Slide 3 — Agenda (2x2 cards)
   ============================================================ */

const AGENDA = [
  {
    n: "01",
    title: "FONPLATA Overview",
    desc: "An evolving multilateral development bank. Mandate, governance, member countries, and credit profile.",
    tags: ["Mandate", "Members", "Ratings"],
    target: 3,
  },
  {
    n: "02",
    title: "Financial Highlights",
    desc: "Capital adequacy, asset quality, liquidity, and the trajectory of the loan portfolio through 2026.",
    tags: ["Balance Sheet", "Capital", "Liquidity"],
    target: 15,
  },
  {
    n: "03",
    title: "Funding Strategy",
    desc: "Diversified market access, programme structure, and the role of Asian institutional investors.",
    tags: ["EMTN", "Markets", "Currencies"],
    target: 25,
  },
  {
    n: "04",
    title: "Concluding Remarks",
    desc: "Investment thesis, forward calendar, and the Q&A framework with the management team.",
    tags: ["Thesis", "Calendar", "Q&A"],
    target: 31,
  },
];

function Slide3({ active, onJump }) {
  return (
    <div className="s3">
      <header className="s3__head">
        <div>
          <div className="s3__h-eye">03 · Contents</div>
        </div>
      </header>

      <div className="s3__grid">
        {AGENDA.map(item => (
          <button
            key={item.n}
            className="s3__card"
            onClick={() => onJump && onJump(item.target)}
            >
            <div className="s3__card-head">
              <div className="s3__card-num">{item.n}</div>
            </div>
            <h3 className="s3__card-title">{item.title}</h3>
            <p className="s3__card-desc">{item.desc}</p>
            <div className="s3__card-foot">
              <div className="s3__card-tags">
                {item.tags.map(t => <span className="s3__card-tag" key={t}>{t}</span>)}
              </div>
              <span className="s3__card-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10 L10 2 M5 2 H10 V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="s3__foot">
        <span>Tap a section to begin · use ← → to step through</span>
        <span>Total · 35 slides · ≈ 38 min</span>
      </div>
    </div>
  );
}
export default Slide3;
