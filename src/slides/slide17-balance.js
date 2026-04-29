import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CountUp } from "../lib";
/* ============================================================
   Slide 17 — A Solid Balance Sheet · stacked bar comparison
   ============================================================ */
const BS_ASSETS = [
    { key: "loans", label: "Net Loans", value: 2565, share: 63, sub: "Core sovereign-guaranteed exposure" },
    { key: "cash", label: "Cash & Securities", value: 1457, share: 36, sub: "Liquidity reserve · investment-grade" },
    { key: "other", label: "Other Assets", value: 65, share: 1, sub: "Receivables and operational assets" },
];
const BS_LIAB = [
    { key: "borr", label: "Borrowings", value: 2178, share: 53, sub: "Bonds, MTN program, and bank loans" },
    { key: "equity", label: "Equity", value: 1852, share: 45, sub: "Paid-in capital and retained earnings" },
    { key: "other", label: "Other Liabilities", value: 57, share: 1, sub: "Provisions and operational liabilities" },
];
const TOTAL = 4087;
function Slide17({ active }) {
    const [hover, setHover] = useState(null); // "side:key"
    const renderStack = (data, side, totalLabel) => (_jsxs("div", { className: "s17__stack", children: [_jsxs("div", { className: "s17__stack-head", children: [_jsx("span", { className: "s17__stack-eye", children: side === "asset" ? "Assets" : "Liabilities + Equity" }), _jsxs("span", { className: "s17__stack-total", children: ["USD ", totalLabel.toLocaleString()] })] }), _jsx("div", { className: "s17__stack-bar", children: data.map((d, i) => {
                    const id = `${side}:${d.key}`;
                    const isH = hover === id;
                    return (_jsxs("div", { className: "s17__seg s17__seg--" + i + (isH ? " is-hover" : ""), style: { height: `${d.share}%` }, onMouseEnter: () => setHover(id), onMouseLeave: () => setHover(null), children: [_jsxs("div", { className: "s17__seg-num", children: ["USD ", d.value.toLocaleString()] }), _jsxs("div", { className: "s17__seg-share", children: ["- ", d.share, "%"] })] }, d.key));
                }) }), _jsx("div", { className: "s17__legend", children: data.map((d, i) => {
                    const id = `${side}:${d.key}`;
                    const isH = hover === id;
                    return (_jsxs("button", { className: "s17__legend-row " + (isH ? "is-hover" : ""), onMouseEnter: () => setHover(id), onMouseLeave: () => setHover(null), children: [_jsx("span", { className: "s17__legend-swatch s17__legend-swatch--" + i }), _jsxs("span", { className: "s17__legend-body", children: [_jsx("span", { className: "s17__legend-label", children: d.label }), _jsx("span", { className: "s17__legend-sub", children: d.sub })] }), _jsxs("span", { className: "s17__legend-share", children: [d.share, "%"] })] }, d.key));
                }) })] }));
    return (_jsxs("div", { className: "s17", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "17 \u00B7 Balance sheet" }), _jsxs("h2", { className: "s17__h-title", children: ["A Solid ", _jsx("span", { className: "thin", children: "Balance Sheet" })] }), _jsxs("div", { className: "s17__h-meta", children: ["Strong capitalization \u00B7 room for lending growth", _jsx("br", {}), "USD million \u00B7 as of Dec 31, 2025"] })] }), _jsxs("div", { className: "s17__body", children: [_jsxs("div", { className: "s17__totals-rail", children: [_jsx("div", { className: "s17__totals-eye", children: "Total balance sheet" }), _jsx("div", { className: "s17__totals-num", children: _jsx(CountUp, { to: TOTAL, duration: 1100, play: active }) }), _jsx("div", { className: "s17__totals-unit", children: "USD million" }), _jsx("div", { className: "s17__totals-rule" }), _jsxs("div", { className: "s17__totals-meta", children: [_jsxs("div", { children: [_jsx("span", { children: "Total Assets" }), "USD 4,087M"] }), _jsxs("div", { children: [_jsx("span", { children: "Total Liab + Equity" }), "USD 4,087M"] }), _jsxs("div", { children: [_jsx("span", { children: "Equity / Assets" }), "45%"] }), _jsxs("div", { children: [_jsx("span", { children: "D/E Ratio" }), "118%"] })] })] }), _jsxs("div", { className: "s17__charts", children: [renderStack(BS_ASSETS, "asset", TOTAL), _jsxs("div", { className: "s17__divider", children: [_jsx("div", { className: "s17__divider-line" }), _jsx("div", { className: "s17__divider-eq", children: "=" }), _jsx("div", { className: "s17__divider-line" })] }), renderStack(BS_LIAB, "liab", TOTAL)] })] }), _jsx("footer", { className: "s17__foot", children: "Source \u00B7 Preliminary financial statements as of December 31, 2025." })] }));
}
export default Slide17;
