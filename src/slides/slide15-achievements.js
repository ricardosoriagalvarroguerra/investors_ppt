import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/* ============================================================
   Slide 15 — 2025 Achievements: Building a Stronger Credit Position
   ============================================================ */
const ACH_QUADRANTS = [
    {
        key: "equity",
        n: "01",
        title: "Shareholders' Equity & Capital Adequacy",
        metric: { num: "USD 3.5bn", lab: "2025 capital subscription approved" },
        bullets: [
            "Strong and timely shareholder support reflected in paid-in capital contributions.",
            "Subscribed capital effectively raised to approximately USD 6.5bn — more than doubled.",
            "Almost USD 1.2bn made available for potential subscription by new member countries.",
            "NPL and NA loans remain at 0% over the last two decades.",
        ],
    },
    {
        key: "market",
        n: "02",
        title: "Market Activity & Funding",
        metric: { num: "USD 622M", lab: "cumulative issuance · 2025 · 33 transactions" },
        bullets: [
            "Consolidated presence as a regular issuer in international capital markets.",
            "February — first sustainable bond placed privately for USD 40M under the MTN Program.",
            "By November, cumulative volume reached USD 622M across 33 transactions, surpassing the USD 550M annual target.",
        ],
    },
    {
        key: "eea",
        n: "03",
        title: "First Exposure Exchange Agreement",
        metric: { num: "USD 468M", lab: "EEA with CABEI · Nov 2025" },
        bullets: [
            "First operation of its kind carried out by FONPLATA — a synthetic exposure exchange.",
            "Reduces credit-risk concentration and strengthens capital adequacy ratios.",
            "Further reinforces the Bank's solid financial position.",
        ],
    },
    {
        key: "rating",
        n: "04",
        title: "Rating Upgrade to A+ by S&P",
        metric: { num: "A+", lab: "S&P long-term rating · Stable outlook" },
        bullets: [
            "S&P Global Ratings acknowledged the ongoing enhancement of FONPLATA's risk profile.",
            "Robust support from member countries — consistent fulfillment of financial commitments and approved capitalization.",
            "Recognized the optimization of capital management through the first Exposure Exchange Agreement with CABEI.",
        ],
    },
];
function Slide15({ active }) {
    const [sel, setSel] = useState("equity");
    const node = ACH_QUADRANTS.find(q => q.key === sel);
    return (_jsxs("div", { className: "s15", children: [_jsxs("header", { className: "s15__head", children: [_jsx("div", { className: "s15__h-num", children: "15 \u00B7 2025 in review" }), _jsxs("h2", { className: "s15__h-title", children: ["Building a Stronger ", _jsx("span", { className: "thin", children: "Credit Position" })] }), _jsx("div", { className: "s15__h-meta", children: "2025 Achievements \u00B7 Four pillars" })] }), _jsxs("div", { className: "s15__body", children: [_jsxs("div", { className: "s15__matrix", children: [_jsx("div", { className: "s15__matrix-axis s15__matrix-axis--h" }), _jsx("div", { className: "s15__matrix-axis s15__matrix-axis--v" }), ACH_QUADRANTS.map((q, i) => (_jsxs("button", { className: "s15__quad s15__quad--" + i + (sel === q.key ? " is-active" : ""), onMouseEnter: () => setSel(q.key), onClick: () => setSel(q.key), children: [_jsx("div", { className: "s15__quad-num", children: q.n }), _jsx("div", { className: "s15__quad-title", children: q.title }), _jsx("div", { className: "s15__quad-metric", children: _jsx("span", { className: "s15__quad-metric-num", children: q.metric.num }) })] }, q.key)))] }), _jsxs("aside", { className: "s15__detail", children: [_jsxs("div", { className: "s15__detail-eye", children: [node.n, " \u00B7 Pillar"] }), _jsx("h3", { className: "s15__detail-title", children: node.title }), _jsxs("div", { className: "s15__detail-metric", children: [_jsx("div", { className: "s15__detail-metric-num", children: node.metric.num }), _jsx("div", { className: "s15__detail-metric-lab", children: node.metric.lab })] }), _jsx("ul", { className: "s15__detail-bullets", children: node.bullets.map((b, i) => (_jsxs("li", { style: { animationDelay: `${i * 60}ms` }, children: [_jsx("span", { className: "s15__bullet-num", children: String(i + 1).padStart(2, "0") }), b] }, i))) })] }, sel)] })] }));
}
export default Slide15;
