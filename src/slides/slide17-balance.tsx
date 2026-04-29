import { useState } from "react";
import { CountUp } from "../lib";

/* ============================================================
   Slide 17 — A Solid Balance Sheet · stacked bar comparison
   ============================================================ */

const BS_ASSETS = [
  { key: "loans",  label: "Net Loans",        value: 2565, share: 63, sub: "Core sovereign-guaranteed exposure" },
  { key: "cash",   label: "Cash & Securities",value: 1457, share: 36, sub: "Liquidity reserve · investment-grade" },
  { key: "other",  label: "Other Assets",     value: 65,   share: 1,  sub: "Receivables and operational assets" },
];
const BS_LIAB = [
  { key: "borr",   label: "Borrowings",       value: 2178, share: 53, sub: "Bonds, MTN program, and bank loans" },
  { key: "equity", label: "Equity",           value: 1852, share: 45, sub: "Paid-in capital and retained earnings" },
  { key: "other",  label: "Other Liabilities",value: 57,   share: 1,  sub: "Provisions and operational liabilities" },
];
const TOTAL = 4087;

function Slide17({ active }) {
  const [hover, setHover] = useState(null); // "side:key"

  const renderStack = (data, side, totalLabel) => (
    <div className="s17__stack">
      <div className="s17__stack-head">
        <span className="s17__stack-eye">{side === "asset" ? "Assets" : "Liabilities + Equity"}</span>
        <span className="s17__stack-total">USD {totalLabel.toLocaleString()}</span>
      </div>
      <div className="s17__stack-bar">
        {data.map((d, i) => {
          const id = `${side}:${d.key}`;
          const isH = hover === id;
          return (
            <div
              key={d.key}
              className={"s17__seg s17__seg--" + i + (isH ? " is-hover" : "")}
              style={{ height: `${d.share}%` }}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="s17__seg-num">USD {d.value.toLocaleString()}</div>
              <div className="s17__seg-share">- {d.share}%</div>
            </div>
          );
        })}
      </div>
      <div className="s17__legend">
        {data.map((d, i) => {
          const id = `${side}:${d.key}`;
          const isH = hover === id;
          return (
            <button
              key={d.key}
              className={"s17__legend-row " + (isH ? "is-hover" : "")}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
            >
              <span className={"s17__legend-swatch s17__legend-swatch--" + i}></span>
              <span className="s17__legend-body">
                <span className="s17__legend-label">{d.label}</span>
                <span className="s17__legend-sub">{d.sub}</span>
              </span>
              <span className="s17__legend-share">{d.share}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="s17">
      <header className="s17__head">
        <div className="s17__h-num">17 · Balance sheet</div>
        <h2 className="s17__h-title">A Solid <span className="thin">Balance Sheet</span></h2>
        <div className="s17__h-meta">Strong capitalization · room for lending growth<br />USD million · as of Dec 31, 2025</div>
      </header>

      <div className="s17__body">
        <div className="s17__totals-rail">
          <div className="s17__totals-eye">Total balance sheet</div>
          <div className="s17__totals-num">
            <CountUp to={TOTAL} duration={1100} play={active} />
          </div>
          <div className="s17__totals-unit">USD million</div>
          <div className="s17__totals-rule"></div>
          <div className="s17__totals-meta">
            <div><span>Total Assets</span>USD 4,087M</div>
            <div><span>Total Liab + Equity</span>USD 4,087M</div>
            <div><span>Equity / Assets</span>45%</div>
            <div><span>D/E Ratio</span>118%</div>
          </div>
        </div>

        <div className="s17__charts">
          {renderStack(BS_ASSETS, "asset", TOTAL)}
          <div className="s17__divider">
            <div className="s17__divider-line"></div>
            <div className="s17__divider-eq">=</div>
            <div className="s17__divider-line"></div>
          </div>
          {renderStack(BS_LIAB, "liab", TOTAL)}
        </div>
      </div>

      <footer className="s17__foot">
        Source · Preliminary financial statements as of December 31, 2025.
      </footer>
    </div>
  );
}
export default Slide17;
