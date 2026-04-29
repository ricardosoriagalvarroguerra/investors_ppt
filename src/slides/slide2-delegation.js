import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
/* ============================================================
   Slide 2 — Delegation
   ============================================================ */
const DELEGATION = [
    {
        initials: "MM",
        name: "Matías Mednik",
        role: "Vice President of Finance",
        since: "Since September 2025",
        bio: [
            "Vice President of Finance, leading the Bank's funding programme and balance-sheet strategy. Previously Head of Strategic and Economic Studies at FONPLATA.",
            "Prior experience spans the Inter-American Development Bank Group (IDB Invest, IDB Lab), the Central Bank of Uruguay, BBVA, and several United Nations agencies including UNCTAD and UNDP.",
        ],
        chips: ["Development Finance", "Macroeconomic Analysis", "Sovereign Debt"],
        creds: [
            "MPA — Columbia University (doctoral studies in Political Science)",
            "Economist — University of the Republic, Uruguay",
        ],
    },
    {
        initials: "RS",
        name: "Rodrigo Saráchaga",
        role: "Head of Financial Resources",
        since: "Since October 2022",
        bio: [
            "Heads the Financial Resources team — responsible for designing and executing the Bank's funding strategy and overseeing investment portfolio management.",
            "Previously Senior Financial Advisor to Uruguay's Public Debt Management Office, executing funding transactions across domestic and international capital markets. Earlier roles include Investment Specialist at Sura AFAP (Uruguay).",
        ],
        chips: ["Funding Strategy", "DCM Execution", "Portfolio Management"],
        creds: [
            "Postgraduate Specialization in Finance — ORT",
            "B.A. Economics — University of the Republic, Uruguay",
        ],
    },
];
function Slide2({ active }) {
    return (_jsxs("div", { className: "s2", children: [_jsxs("header", { className: "s2__head", children: [_jsx("div", { className: "s2__h-num", children: "02 \u00B7 Delegation" }), _jsx("h2", { className: "s2__h-title", children: "FONPLATA Delegation" }), _jsxs("div", { className: "s2__h-meta", children: ["Tokyo \u00B7 Singapore \u00B7 Hong Kong", _jsx("br", {}), "March 2026"] })] }), _jsx("div", { className: "s2__body", children: DELEGATION.map((p, i) => (_jsxs("article", { className: "s2__person", style: { animationDelay: `${0.1 + i * 0.1}s` }, children: [_jsxs("div", { className: "s2__avatar", children: [_jsx("div", { className: "s2__avatar-ring" }), _jsx("span", { className: "s2__avatar-mono", children: p.initials })] }), _jsxs("div", { className: "s2__name-row", children: [_jsx("div", { className: "s2__name", children: p.name }), _jsxs("div", { className: "s2__role", children: [p.role, " ", _jsxs("span", { style: { color: "var(--ink-4)", fontWeight: 400 }, children: ["\u00B7 ", p.since] })] })] }), _jsx("div", { className: "s2__divider" }), _jsx("div", { className: "s2__bio", children: p.bio.map((para, j) => _jsx("p", { children: para }, j)) }), _jsx("div", { className: "s2__chips", children: p.chips.map(c => _jsx("span", { className: "s2__chip", children: c }, c)) }), _jsx("div", { className: "s2__credentials", children: p.creds.map((c, j) => (_jsxs(React.Fragment, { children: [_jsx("span", { className: "cmark", children: "\u2192" }), _jsx("span", { children: c })] }, j))) })] }, p.name))) })] }));
}
export default Slide2;
