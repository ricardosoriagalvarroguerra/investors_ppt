import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/* ============================================================
   Slide 11 — Proven Preferred Creditor Treatment
   ============================================================ */
const PCT_EVENTS = [
    // side: "top" = crises (above the rail), "bot" = country events (below)
    { year: "2001-02", side: "bot", title: "Argentina", desc: "Financial crisis and external debt default.", x: 0.10 },
    { year: "2007", side: "top", title: "USA", desc: "Subprime mortgage crisis.", x: 0.20 },
    { year: "2009", side: "bot", title: "Europe", desc: "Sovereign debt crisis.", x: 0.30 },
    { year: "2015", side: "top", title: "Brazil", desc: "Economic crisis and loss of investment-grade status.", x: 0.40 },
    { year: "2019", side: "bot", title: "Bolivia", desc: "Political and economic crisis.", x: 0.50 },
    { year: "2020", side: "top", title: "COVID-19", desc: "Global pandemic and economic shock.", x: 0.62 },
    { year: "2022", side: "bot", title: "Russia · Ukraine", desc: "Geopolitical conflict and global volatility.", x: 0.78 },
    { year: "2025", side: "bot", title: "Bolivia", desc: "Pressure over Bolivia's credit rating.", x: 0.92 },
];
const PCT_RATINGS = [
    { x: 0.32, label: "A−", sub: "/ A2", note: "2016" },
    { x: 0.55, label: "A", sub: "", note: "2021" },
    { x: 0.92, label: "A+", sub: "", note: "2025" },
];
function Slide11({ active }) {
    const [sel, setSel] = useState(7);
    return (_jsxs("div", { className: "s11", children: [_jsxs("header", { className: "s11__head", children: [_jsx("div", { className: "s11__h-num", children: "11 \u00B7 Track record" }), _jsxs("h2", { className: "s11__h-title", children: ["Proven Preferred ", _jsx("span", { className: "thin", children: "Creditor Treatment" })] }), _jsxs("div", { className: "s11__h-meta", children: ["Spotless record of loan repayments", _jsx("br", {}), "despite adverse circumstances"] })] }), _jsxs("div", { className: "s11__rail-wrap", children: [_jsx("div", { className: "s11__rating-eye", children: "FONPLATA's rating evolution" }), _jsxs("div", { className: "s11__rail", children: [_jsx("div", { className: "s11__row s11__row--top", children: PCT_EVENTS.filter(e => e.side === "top").map((e, i) => {
                                    const idx = PCT_EVENTS.indexOf(e);
                                    return (_jsxs("button", { className: "s11__event s11__event--top " + (idx === sel ? "is-active" : ""), style: { left: `${e.x * 100}%` }, onMouseEnter: () => setSel(idx), onClick: () => setSel(idx), children: [_jsxs("span", { className: "s11__event-card", children: [_jsx("span", { className: "s11__event-year", children: e.year }), _jsx("span", { className: "s11__event-title", children: e.title })] }), _jsx("span", { className: "s11__event-stem" }), _jsx("span", { className: "s11__event-dot" })] }, idx));
                                }) }), _jsxs("div", { className: "s11__arrow", children: [_jsx("div", { className: "s11__arrow-track" }), _jsx("div", { className: "s11__arrow-tip" }), PCT_RATINGS.map((r, i) => (_jsxs("div", { className: "s11__tick", style: { left: `${r.x * 100}%` }, children: [_jsx("span", { className: "s11__tick-line" }), _jsxs("span", { className: "s11__tick-label", children: [_jsxs("span", { className: "s11__tick-big", children: [r.label, _jsx("span", { className: "s11__tick-sub", children: r.sub })] }), _jsx("span", { className: "s11__tick-year", children: r.note })] })] }, i)))] }), _jsx("div", { className: "s11__row s11__row--bot", children: PCT_EVENTS.filter(e => e.side === "bot").map((e) => {
                                    const idx = PCT_EVENTS.indexOf(e);
                                    return (_jsxs("button", { className: "s11__event s11__event--bot " + (idx === sel ? "is-active" : ""), style: { left: `${e.x * 100}%` }, onMouseEnter: () => setSel(idx), onClick: () => setSel(idx), children: [_jsx("span", { className: "s11__event-dot" }), _jsx("span", { className: "s11__event-stem" }), _jsxs("span", { className: "s11__event-card", children: [_jsx("span", { className: "s11__event-year", children: e.year }), _jsx("span", { className: "s11__event-title", children: e.title })] })] }, idx));
                                }) })] })] }), _jsxs("div", { className: "s11__detail", children: [_jsx("div", { className: "s11__detail-eye", children: PCT_EVENTS[sel].side === "top" ? "Global crisis event" : "Country event" }), _jsxs("div", { className: "s11__detail-row", children: [_jsx("div", { className: "s11__detail-year", children: PCT_EVENTS[sel].year }), _jsxs("div", { children: [_jsx("h3", { className: "s11__detail-title", children: PCT_EVENTS[sel].title }), _jsxs("p", { className: "s11__detail-desc", children: [PCT_EVENTS[sel].desc, " ", _jsx("strong", { children: "FONPLATA continued to receive timely debt service from member countries throughout." })] })] })] })] }, sel), _jsx("footer", { className: "s11__foot", children: "(*) Ratings shown: S&P (above) and Moody's (below). Source: FONPLATA, S&P, Moody's." })] }));
}
export default Slide11;
