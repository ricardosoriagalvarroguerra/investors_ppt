import { CountUp } from "../lib";

/* ============================================================
   Slide 1 — Opening
   ============================================================ */

function Slide1({ active }) {
  return (
    <div className={"s1 " + (active ? "s1--enter" : "")}>
      <div className="s1__left">
        <div>
          <div className="s1__eyebrow">
            <span className="dot"></span>
            <span>Investor Presentation · March 2026</span>
          </div>

          <h1 className="s1__title">
            Asia Investor<br />
            Meetings<br />
            <em>Non-Deal Roadshow</em>
          </h1>

        </div>

        <div className="s1__bottom">
          <span></span>
          <span>Tokyo · Singapore · Hong Kong</span>
        </div>
      </div>

      <div className="s1__right">
        <div className="s1__grid"></div>

        <div className="s1__compass">
          <div className="s1__star-big">
            <span className="s1__logo-mark" aria-hidden="true" />
          </div>
        </div>

        <div className="s1__stat-card tl">
          <div className="num"><CountUp to={5} play={active} />&nbsp;<span style={{ color: "var(--ink-3)", fontWeight: 400, fontSize: 18 }}>members</span></div>
          <div className="label">Sovereign shareholders</div>
        </div>

        <div className="s1__stat-card mid">
          <div className="num accent">A+ <span style={{ color: "var(--ink-3)", fontWeight: 400, fontSize: 18 }}>/</span> A2</div>
          <div className="label">S&amp;P · Moody&rsquo;s · Stable</div>
        </div>

        <div className="s1__stat-card br">
          <div className="num">USD <CountUp to={2.6} decimals={1} play={active} />bn</div>
          <div className="label">Gross loan portfolio</div>
        </div>

        <div className="s1__flags">
          <div className="s1__flag">
            <span className="s1__flag-emoji">🇦🇷</span>
            <span>AR</span>
          </div>
          <div className="s1__flag">
            <span className="s1__flag-emoji">🇧🇴</span>
            <span>BO</span>
          </div>
          <div className="s1__flag">
            <span className="s1__flag-emoji">🇧🇷</span>
            <span>BR</span>
          </div>
          <div className="s1__flag">
            <span className="s1__flag-emoji">🇵🇾</span>
            <span>PY</span>
          </div>
          <div className="s1__flag">
            <span className="s1__flag-emoji">🇺🇾</span>
            <span>UY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Slide1;
