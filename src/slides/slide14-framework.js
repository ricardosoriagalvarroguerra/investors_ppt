import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    { code: "GBP", label: "Green Bond Principles" },
    { code: "SBP", label: "Social Bond Principles" },
    { code: "SBG", label: "Sustainability Bond Guidelines" },
    { code: "ICMA", label: "International Capital Market Association" },
];
function Slide14({ active }) {
    const [tab, setTab] = useState("social");
    return (_jsxs("div", { className: "s14", children: [_jsxs("header", { className: "s14__head", children: [_jsx("div", { className: "s14__h-num", children: "14 \u00B7 Framework" }), _jsxs("h2", { className: "s14__h-title", children: ["Sustainable ", _jsx("span", { className: "thin", children: "Debt Framework" })] }), _jsx("div", { className: "s14__h-meta", children: "Use-of-proceeds \u00B7 process \u00B7 alignment" })] }), _jsxs("div", { className: "s14__body", children: [_jsxs("section", { className: "s14__taxonomy", children: [_jsx("div", { className: "s14__taxonomy-eye", children: "Eligible categories" }), _jsxs("div", { className: "s14__tabs", role: "tablist", children: [_jsxs("button", { className: tab === "social" ? "is-active" : "", onClick: () => setTab("social"), children: [_jsx("span", { className: "s14__tab-dot s14__tab-dot--social" }), "Social"] }), _jsxs("button", { className: tab === "green" ? "is-active" : "", onClick: () => setTab("green"), children: [_jsx("span", { className: "s14__tab-dot s14__tab-dot--green" }), "Green"] })] }), _jsx("ul", { className: "s14__cats", children: (tab === "social" ? SOCIAL_CATS : GREEN_CATS).map((c, i) => (_jsxs("li", { style: { animationDelay: `${i * 60}ms` }, children: [_jsx("span", { className: "s14__cats-num", children: String(i + 1).padStart(2, "0") }), _jsx("span", { children: c })] }, i))) }, tab), _jsxs("div", { className: "s14__process", children: [_jsx("div", { className: "s14__process-eye", children: "Project selection process" }), _jsxs("ol", { className: "s14__process-steps", children: [_jsxs("li", { children: [_jsx("span", { children: "01" }), "Origination & screening by Operations"] }), _jsxs("li", { children: [_jsx("span", { children: "02" }), "Sustainability Committee review"] }), _jsxs("li", { children: [_jsx("span", { children: "03" }), "Final approval & post-issuance reporting"] })] })] })] }), _jsxs("section", { className: "s14__spo", children: [_jsx("div", { className: "s14__spo-eye", children: "Second-Party Opinion" }), _jsx("div", { className: "s14__spo-issuer", children: "Sustainalytics" }), _jsxs("blockquote", { className: "s14__quote", children: [_jsx("span", { className: "s14__quote-mark", children: "\"" }), "FONPLATA's internal process for evaluating and selecting projects is overseen by a Sustainability Committee comprised of team members from Finance, Operations, Strategic Partnerships, Risk & Compliance, and Legal. The Committee is responsible for the final approval of eligible projects.", _jsx("span", { className: "s14__quote-divider" }), "Sustainalytics considers this risk assessment and mitigation process to be ", _jsx("em", { children: "strong" }), " and aligned with ", _jsx("em", { children: "market best practice" }), "."] }), _jsxs("div", { className: "s14__spo-meta", children: [_jsxs("div", { children: [_jsx("span", { children: "Report" }), "FONPLATA Sustainable Debt Framework SPO"] }), _jsxs("div", { children: [_jsx("span", { children: "Status" }), "In line with market practice"] })] })] })] }), _jsxs("footer", { className: "s14__align", children: [_jsx("div", { className: "s14__align-eye", children: "Alignment with" }), _jsx("div", { className: "s14__align-row", children: ALIGNMENTS.map(a => (_jsxs("div", { className: "s14__align-chip", children: [_jsx("span", { className: "s14__align-code", children: a.code }), _jsx("span", { className: "s14__align-label", children: a.label })] }, a.code))) })] })] }));
}
export default Slide14;
