import { useState } from "react";

/* ============================================================
   Slide 14 — Sustainable Debt Framework
   ============================================================ */

const SOCIAL_CATS = [
  "Access to essential services",
  "Affordable basic infrastructure",
  "Food security",
  "Employment generation and socio-economic advancement",
];
const GREEN_CATS = [
  "Renewable energy",
  "Clean transportation",
  "Sustainable management of natural resources",
  "Pollution prevention and control",
  "Sustainable water and wastewater management",
];
const ALIGNMENTS = [
  { code: "GBP",  label: "Green Bond Principles" },
  { code: "SBP",  label: "Social Bond Principles" },
  { code: "SBG",  label: "Sustainability Bond Guidelines" },
  { code: "ICMA", label: "International Capital Market Association" },
];

function Slide14({ active }) {
  const [tab, setTab] = useState("social");

  return (
    <div className="s14">
      <header className="s14__head">
        <div className="s14__h-num">14 · Framework</div>
        <h2 className="s14__h-title">Sustainable <span className="thin">Debt Framework</span></h2>
        <div className="s14__h-meta">Use-of-proceeds · process · alignment</div>
      </header>

      <div className="s14__body">
        <section className="s14__taxonomy">
          <div className="s14__taxonomy-eye">Eligible categories</div>

          <div className="s14__tabs" role="tablist">
            <button className={tab === "social" ? "is-active" : ""} onClick={() => setTab("social")}>
              <span className="s14__tab-dot s14__tab-dot--social"></span>Social
            </button>
            <button className={tab === "green" ? "is-active" : ""} onClick={() => setTab("green")}>
              <span className="s14__tab-dot s14__tab-dot--green"></span>Green
            </button>
          </div>

          <ul className="s14__cats" key={tab}>
            {(tab === "social" ? SOCIAL_CATS : GREEN_CATS).map((c, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="s14__cats-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <div className="s14__process">
            <div className="s14__process-eye">Project selection process</div>
            <ol className="s14__process-steps">
              <li><span>01</span>Origination & screening by Operations</li>
              <li><span>02</span>Sustainability Committee review</li>
              <li><span>03</span>Final approval & post-issuance reporting</li>
            </ol>
          </div>
        </section>

        <section className="s14__spo">
          <div className="s14__spo-eye">Second-Party Opinion</div>
          <div className="s14__spo-issuer">Sustainalytics</div>

          <blockquote className="s14__quote">
            <span className="s14__quote-mark">"</span>
            FONPLATA's internal process for evaluating and selecting projects is overseen by a Sustainability Committee comprised of team members from Finance, Operations, Strategic Partnerships, Risk &amp; Compliance, and Legal.
            The Committee is responsible for the final approval of eligible projects.
            <span className="s14__quote-divider"></span>
            Sustainalytics considers this risk assessment and mitigation process to be <em>strong</em> and aligned with <em>market best practice</em>.
          </blockquote>

          <div className="s14__spo-meta">
            <div><span>Report</span>FONPLATA Sustainable Debt Framework SPO</div>
            <div><span>Status</span>In line with market practice</div>
          </div>
        </section>
      </div>

      <footer className="s14__align">
        <div className="s14__align-eye">Alignment with</div>
        <div className="s14__align-row">
          {ALIGNMENTS.map(a => (
            <div className="s14__align-chip" key={a.code}>
              <span className="s14__align-code">{a.code}</span>
              <span className="s14__align-label">{a.label}</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
export default Slide14;
