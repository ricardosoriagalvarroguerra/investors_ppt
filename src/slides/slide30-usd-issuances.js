import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* ============================================================
   Slide 30 — First USD issuances · 3-column public/private placements
   ============================================================ */
const PUBLIC_LIST = [
    { tag: "5Y CHF 200 M", eq: "(USD 223 M eq.)", date: "March 03, 2021", mat: "Maturity 2026" },
    { tag: "7Y CHF 150 M", eq: "(USD 164 M eq.)", date: "December 31, 2021", mat: "Maturity 2028" },
    { tag: "3.5Y CHF 145 M", eq: "(USD 159 M eq.)", date: "May 15, 2024", mat: "Maturity 2027", green: true },
    { tag: "5Y CHF 130 M", eq: "(USD 153 M eq.)", date: "Oct 24, 2024", mat: "Maturity 2029" },
];
const PRIVATE_JPY = [
    { tag: "JPY 3,000 mm", eq: "(USD 23 M eq.)", date: "March 24, 2023", mat: "Maturity 2028", green: true },
    { tag: "JPY 4,200 M", eq: "(USD 32 M eq.)", date: "March 24, 2023", mat: "Maturity 2029", green: true },
    { tag: "JPY 6,300 M", eq: "(USD 40 M eq.)", date: "June, 2024", mat: "Maturity 2027", green: true },
    { tag: "JPY 1,100 M", eq: "(USD 7 M eq.)", date: "June, 2024", mat: "Maturity 2029", green: true },
];
const PRIVATE_USD_LEFT = [
    { tag: "3Y USD 40 M", date: "Feb 18, 2025", mat: "Maturity 2028" },
    { tag: "5Y USD 40 M", date: "March 14, 2025", mat: "Maturity 2030", green: true },
    { tag: "5Y USD 50 M", date: "March 21, 2025", mat: "Maturity 2030" },
    { tag: "5Y USD 30 M", date: "March 24, 2025", mat: "Maturity 2030", green: true },
    { tag: "7Y USD 50 M", date: "March 24, 2025", mat: "Maturity 2032" },
    { tag: "10Y USD 50 M", date: "April 10, 2025", mat: "Maturity 2035", green: true },
];
const PRIVATE_USD_RIGHT = [
    { tag: "5Y USD 50 M", date: "May 19, 2025", mat: "Maturity 2030" },
    { tag: "5Y USD 100 M", date: "May 21, 2025", mat: "Maturity 2030", green: true },
    { tag: "15Y USD 35 M", date: "Aug 5, 2025", mat: "Maturity 2040", green: true },
    { tag: "15Y AUD 38 M", eq: "(USD 25 M eq.)", date: "Aug 5, 2025", mat: "Maturity 2040", green: true },
    { tag: "3Y JPY 3,000 M", eq: "(USD 20.4 M eq.)", date: "Sep 5, 2025", mat: "Maturity 2028" },
    { tag: "5.5Y USD 30 M", date: "Sep 30, 2025", mat: "Maturity 2031" },
    { tag: "5.5Y INR 9,000 M", eq: "(USD 101.5 M eq.)", date: "November, 2025", mat: "Maturity 2031", green: true },
];
function Bond({ b }) {
    return (_jsxs("li", { className: "s30__bond " + (b.green ? "is-green" : ""), children: [_jsxs("div", { className: "s30__bond-tag", children: [b.tag, b.green ? _jsx("span", { className: "s30__leaf", title: "Sustainable", children: "\u2726" }) : null] }), b.eq && _jsx("div", { className: "s30__bond-eq", children: b.eq }), _jsx("div", { className: "s30__bond-date", children: b.date }), _jsx("div", { className: "s30__bond-mat", children: b.mat })] }));
}
function Slide30() {
    return (_jsxs("div", { className: "s30", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "30 \u00B7 USD market access" }), _jsxs("h2", { className: "s17__h-title", children: ["First USD issuances ", _jsx("span", { className: "thin", children: "mark a new stage" })] }), _jsxs("div", { className: "s17__h-meta", children: ["FONPLATA debuts in USD, AUD", _jsx("br", {}), "and INR through MTN \u00B7 2025"] })] }), _jsxs("div", { className: "s30__body", children: [_jsxs("section", { className: "s30__col s30__col--public", children: [_jsxs("div", { className: "s30__col-head", children: [_jsx("div", { className: "s30__col-pill", children: "Public placements" }), _jsx("div", { className: "s30__col-flag", children: "\uD83C\uDDE8\uD83C\uDDED" })] }), _jsx("ul", { className: "s30__list", children: PUBLIC_LIST.map((b, i) => _jsx(Bond, { b: b }, i)) }), _jsxs("div", { className: "s30__col-foot", children: [_jsx("span", { className: "s30__foot-num", children: "USD 699 M" }), _jsx("span", { className: "s30__foot-lab", children: "outstanding" })] })] }), _jsxs("section", { className: "s30__group s30__group--private", children: [_jsx("div", { className: "s30__group-head", children: "Private placements" }), _jsxs("div", { className: "s30__private-grid", children: [_jsxs("div", { className: "s30__col", children: [_jsx("div", { className: "s30__col-head", children: _jsx("div", { className: "s30__col-flag", children: "\uD83C\uDDEF\uD83C\uDDF5" }) }), _jsx("ul", { className: "s30__list", children: PRIVATE_JPY.map((b, i) => _jsx(Bond, { b: b }, i)) }), _jsxs("div", { className: "s30__col-foot", children: [_jsx("span", { className: "s30__foot-num", children: "USD 102 M" }), _jsx("span", { className: "s30__foot-lab", children: "outstanding" })] })] }), _jsxs("div", { className: "s30__col s30__col--mtn", children: [_jsx("div", { className: "s30__col-head", children: _jsx("div", { className: "s30__col-pill s30__col-pill--mtn", children: "MTN program" }) }), _jsxs("div", { className: "s30__mtn-cols", children: [_jsx("ul", { className: "s30__list", children: PRIVATE_USD_LEFT.map((b, i) => _jsx(Bond, { b: b }, i)) }), _jsx("ul", { className: "s30__list", children: PRIVATE_USD_RIGHT.map((b, i) => _jsx(Bond, { b: b }, i)) })] }), _jsxs("div", { className: "s30__col-foot", children: [_jsx("span", { className: "s30__foot-num", children: "USD 622 M" }), _jsx("span", { className: "s30__foot-lab", children: "outstanding" })] })] })] })] })] }), _jsx("footer", { className: "s17__foot", children: "\u2726 Sustainable. Source \u00B7 FONPLATA, as of December 31, 2025." })] }));
}
export default Slide30;
