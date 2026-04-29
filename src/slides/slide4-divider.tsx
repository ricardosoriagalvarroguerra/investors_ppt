/* ============================================================
   Slide 4 — Section divider: 1. FONPLATA Overview
   ============================================================ */

function Slide4({ active }) {
  return (
    <div className="s4">
      <div className="s4__left">
        <div className="s4__chapter">
          <strong>Chapter 01</strong>
        </div>

        <div>
          <h2 className="s4__big">
            <span className="thin">FONPLATA</span>
            <span className="accent">Overview.</span>
          </h2>
          <p className="s4__lede">
            A 51-year-old supranational development institution serving five sovereign shareholders across the Río de la Plata Basin and Southern Cone.
          </p>
        </div>

        <div className="s4__nav-hint">
          <span className="kbd">→</span> <span>Begin chapter</span>
        </div>
      </div>

      <div className="s4__right">
        <div className="s4__bigtype">01</div>

        <div className="s4__index">
          <div className="s4__index-row curr">
            <span className="s4__index-num">01</span>
            <span className="s4__index-name">FONPLATA Overview</span>
            <span className="s4__index-page">5</span>
          </div>
          <div className="s4__index-row">
            <span className="s4__index-num">02</span>
            <span className="s4__index-name">Financial Highlights</span>
            <span className="s4__index-page">15</span>
          </div>
          <div className="s4__index-row">
            <span className="s4__index-num">03</span>
            <span className="s4__index-name">Funding Strategy</span>
            <span className="s4__index-page">23</span>
          </div>
          <div className="s4__index-row">
            <span className="s4__index-num">04</span>
            <span className="s4__index-name">Concluding Remarks</span>
            <span className="s4__index-page">31</span>
          </div>
        </div>

        <div className="s4__pill">
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}></span>
          Now reading · Chapter 01
        </div>
      </div>
    </div>
  );
}
export default Slide4;
