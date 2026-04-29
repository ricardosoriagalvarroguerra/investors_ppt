import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* ============================================================
   Slide 3 — Agenda (2x2 cards)
   ============================================================ */
const AGENDA = [
    {
        n: "01",
        title: "FONPLATA Overview",
        desc: "An evolving multilateral development bank. Mandate, governance, member countries, and credit profile.",
        tags: ["Mandate", "Members", "Ratings"],
        pages: "p. 5–14",
        duration: "12 min",
        target: 4, // slide index
    },
    {
        n: "02",
        title: "Financial Highlights",
        desc: "Capital adequacy, asset quality, liquidity, and the trajectory of the loan portfolio through 2026.",
        tags: ["Balance Sheet", "Capital", "Liquidity"],
        pages: "p. 15–22",
        duration: "9 min",
        target: 4,
    },
    {
        n: "03",
        title: "Funding Strategy",
        desc: "Diversified market access, programme structure, and the role of Asian institutional investors.",
        tags: ["EMTN", "Markets", "Currencies"],
        pages: "p. 23–30",
        duration: "11 min",
        target: 4,
    },
    {
        n: "04",
        title: "Concluding Remarks",
        desc: "Investment thesis, forward calendar, and the Q&A framework with the management team.",
        tags: ["Thesis", "Calendar", "Q&A"],
        pages: "p. 31–35",
        duration: "6 min",
        target: 4,
    },
];
function Slide3({ active, onJump }) {
    return (_jsxs("div", { className: "s3", children: [_jsxs("header", { className: "s3__head", children: [_jsxs("div", { children: [_jsx("div", { className: "s3__h-eye", children: "03 \u00B7 Contents" }), _jsxs("h2", { className: "s3__h-title", children: ["Four sections,", _jsx("br", {}), " ", _jsx("em", { children: "one institution." })] })] }), _jsx("div", { className: "s3__h-aside", children: "A 38-minute walkthrough of FONPLATA's profile, financials, funding programme, and forward outlook." })] }), _jsx("div", { className: "s3__grid", children: AGENDA.map(item => (_jsxs("button", { className: "s3__card", onClick: () => onJump && onJump(item.target), children: [_jsxs("div", { className: "s3__card-head", children: [_jsx("div", { className: "s3__card-num", children: item.n }), _jsxs("div", { className: "s3__card-meta", children: [_jsx("span", { children: item.pages }), _jsx("span", { children: item.duration })] })] }), _jsx("h3", { className: "s3__card-title", children: item.title }), _jsx("p", { className: "s3__card-desc", children: item.desc }), _jsxs("div", { className: "s3__card-foot", children: [_jsx("div", { className: "s3__card-tags", children: item.tags.map(t => _jsx("span", { className: "s3__card-tag", children: t }, t)) }), _jsx("span", { className: "s3__card-arrow", children: _jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: _jsx("path", { d: "M2 10 L10 2 M5 2 H10 V7", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] })] }, item.n))) }), _jsxs("div", { className: "s3__foot", children: [_jsx("span", { children: "Tap a section to begin \u00B7 use \u2190 \u2192 to step through" }), _jsx("span", { children: "Total \u00B7 35 slides \u00B7 \u2248 38 min" })] })] }));
}
export default Slide3;
