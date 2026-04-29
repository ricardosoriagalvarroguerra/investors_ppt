import { useState } from "react";

/* ============================================================
   Slide 6 — Recent Milestones · interactive timeline
   ============================================================ */

const MILESTONES = [
  { year: 2010, title: "Institutional reform", desc: "Institutional reform and a new governance model adopted to modernize the Bank's structure.", tag: "Governance" },
  { year: 2012, title: "First Executive President", desc: "Appointment of the first Executive President — formalizing the modern executive structure.", tag: "Leadership" },
  { year: 2013, title: "1st Capital Increase", desc: "First general capital increase, expanding the Bank's lending capacity.", tag: "Capital" },
  { year: 2016, title: "2nd Capital Increase", desc: "Second general capital increase. First sovereign rating: A2 / A− from Moody's and S&P.", tag: "Ratings" },
  { year: 2018, title: "Fund → Development Bank", desc: "Transition from a Fund to a fully-fledged Regional Development Bank.", tag: "Mandate" },
  { year: 2019, title: "Inaugural bond issuance", desc: "First international bond — CHF 150mm. New business line for non-sovereign-guaranteed State-Owned Institutions.", tag: "DCM" },
  { year: 2020, title: "Fiduciary agent of FOCEM", desc: "Designated fiduciary agent for FOCEM funds — MERCOSUR's structural-asymmetries fund.", tag: "Mandate" },
  { year: 2021, title: "S&P upgrade to A", desc: "S&P upgrades the Bank to A. Sustainable Debt Framework established.", tag: "Ratings" },
  { year: 2022, title: "Flexible Financial Conditions", desc: "Introduction of Flexible Financial Conditions — tailoring tenor, grace, and amortization to member needs.", tag: "Product" },
  { year: 2023, title: "Sustainable bonds · Japan debut", desc: "First sustainable bond issuance and inaugural debt placement in Japan.", tag: "DCM" },
  { year: 2024, title: "3rd Capital Increase", desc: "Authorized capital more than doubles, from USD 3.0bn to USD 6.5bn. New Constitutive Agreement in effect.", tag: "Capital" },
  { year: 2025, title: "Asia FX & A+ upgrade", desc: "First market access in USD, AUD, and INR via MTN. FX agreement with CABEI. S&P upgrade to A+.", tag: "DCM" },
];

const FOOT_FACTS = [
  <>More than <strong>USD 5.3bn</strong> in approved loans since inception · <strong>USD 4.0bn</strong> since 2013.</>,
  <>In 2024, FONPLATA more than doubled its authorized capital, from <strong>USD 3.0bn</strong> to <strong>USD 6.5bn</strong>.</>,
  <>In July 2025, the Board of Governors approved the subscription of the <strong>3rd Capital Increase</strong>.</>,
];

function Slide6({ active }) {
  const [sel, setSel] = useState(11);

  return (
    <div className="s6">
      <header className="s6__head">
        <div className="s6__h-num">06 · Track record</div>
        <h2 className="s6__h-title">
          Recent <span className="thin">Milestones</span>
        </h2>
        <div className="s6__h-meta">
          From a Fund to a<br />Full-Fledged Regional Development Bank
        </div>
      </header>

      <div className="s6__timeline">
        <div className="s6__axis"></div>
        <div className="s6__years">
          {MILESTONES.map((m, i) => {
            const pct = (i / (MILESTONES.length - 1)) * 100;
            const above = i % 2 === 0;
            return (
              <button
                key={m.year}
                className={"s6__node " + (i === sel ? "is-active" : "") + (above ? " above" : " below")}
                style={{ left: `${pct}%` }}
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
              >
                <span className="s6__year">{m.year}</span>
                <span className="s6__dot"></span>
                <span className="s6__stem"></span>
                <span className="s6__caplet">{m.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="s6__detail">
        <div className="s6__detail-card" key={sel}>
          <div className="s6__detail-tag">{MILESTONES[sel].tag}</div>
          <div className="s6__detail-year">{MILESTONES[sel].year}</div>
          <h3 className="s6__detail-title">{MILESTONES[sel].title}</h3>
          <p className="s6__detail-desc">{MILESTONES[sel].desc}</p>
          <div className="s6__detail-counter">
            <span className="s6__c-num">{String(sel + 1).padStart(2, "0")}</span>
            <span className="s6__c-tot">/ {String(MILESTONES.length).padStart(2, "0")}</span>
          </div>
        </div>

        <ul className="s6__facts">
          {FOOT_FACTS.map((f, i) => (
            <li key={i}>
              <span className="s6__facts-num">0{i + 1}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="s6__foot">
        (*) FOCEM — MERCOSUR development fund created to finance projects reducing structural asymmetries among members.
        &nbsp;&middot;&nbsp;
        (**) Refers to the Bank's ability to structure financing with customized terms (maturities, grace, currencies).
      </footer>
    </div>
  );
}
export default Slide6;
