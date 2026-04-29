import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/* ============================================================
   Slide 9 — Robust Governance Structure
   ============================================================ */
const GOVERNANCE = {
    bog: {
        label: "Board of Governors",
        sub: "Finance or planning ministers of member countries",
        duties: [
            "Admission of new members; changes to capital structure and the Charter.",
            "Appoints external auditors.",
            "Approves audited financial statements, the annual budget, and allocation of net income.",
        ],
        tier: 1,
    },
    bod: {
        label: "Board of Directors",
        sub: "Representatives of member countries",
        duties: [
            "Approves financings, policies, and authorizes the contracting of debt.",
            "Approves organizational changes at executive levels.",
            "Reviews budgets prior to submission to the Board of Governors.",
        ],
        tier: 2,
    },
    audit: {
        label: "Audit Committee",
        sub: "Chaired by an Executive Director",
        duties: [
            "Reviews FONPLATA's annual report and financial statements with the external auditor's opinion before BoG submission.",
            "External Auditors: Ernst & Young.",
        ],
        tier: 2,
    },
    ext: {
        label: "External Auditors",
        sub: "Independent",
        duties: ["Annual audit of FONPLATA's financial statements.", "Currently Ernst & Young."],
        tier: 2,
    },
    pres: {
        label: "Executive President",
        sub: "Appointed for a 5-year period by the BoG",
        duties: [
            "Highest authority responsible for FONPLATA's overall supervision and management.",
            "Chief of staff. Appoints and terminates staff.",
            "Authority to approve loans up to USD 5mm.",
        ],
        tier: 3,
    },
    voc: { label: "VP · Operations & Countries", sub: "Operations", duties: ["Leads relationships with member countries and project origination."], tier: 4 },
    evp: { label: "Executive Vice Presidency", sub: "Executive office", duties: ["Coordinates Bank-wide priorities under the Executive President."], tier: 4 },
    vpf: { label: "VP · Finance", sub: "Finance & Treasury", duties: ["Funding, treasury, balance-sheet management, and financial reporting."], tier: 4 },
    vpsd: { label: "VP · Strategic Development", sub: "Strategy", duties: ["Strategy, risk, planning, and institutional development."], tier: 4 },
    risk: { label: "Risk & Compliance", sub: "Independent function", duties: ["Risk policy, compliance, and integrity oversight."], tier: 5 },
    ia: { label: "Internal Audit", sub: "Independent function", duties: ["Independent assurance over governance, risk, and control."], tier: 5 },
};
const TIERS = [
    { key: 1, items: ["bog"] },
    { key: 2, items: ["bod", "audit", "ext"] },
    { key: 3, items: ["pres"] },
    { key: 4, items: ["voc", "evp", "vpf", "vpsd"] },
    { key: 5, items: ["risk", "ia"] },
];
function Slide9({ active }) {
    const [sel, setSel] = useState("pres");
    const node = GOVERNANCE[sel];
    return (_jsxs("div", { className: "s9", children: [_jsxs("header", { className: "s9__head", children: [_jsx("div", { className: "s9__h-num", children: "09 \u00B7 Governance" }), _jsxs("h2", { className: "s9__h-title", children: ["Robust ", _jsx("span", { className: "thin", children: "Governance Structure" })] }), _jsx("div", { className: "s9__h-meta", children: "Control & Oversight Architecture" })] }), _jsxs("div", { className: "s9__body", children: [_jsxs("div", { className: "s9__chart", children: [TIERS.map(tier => (_jsx("div", { className: "s9__tier s9__tier--" + tier.key, children: tier.items.map(k => {
                                    const n = GOVERNANCE[k];
                                    const isSel = sel === k;
                                    return (_jsxs("button", { className: "s9__node tier-" + n.tier + (isSel ? " is-active" : ""), onMouseEnter: () => setSel(k), onClick: () => setSel(k), children: [_jsx("div", { className: "s9__node-label", children: n.label }), _jsx("div", { className: "s9__node-sub", children: n.sub })] }, k));
                                }) }, tier.key))), _jsxs("svg", { className: "s9__lines", preserveAspectRatio: "none", viewBox: "0 0 100 100", children: [_jsx("path", { d: "M 50 12 V 26", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 50 12 H 80 V 26", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 50 12 H 20 V 26", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 50 32 V 50", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 50 56 V 70", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 12 70 H 88", stroke: "currentColor", strokeWidth: "0.18", fill: "none" }), _jsx("path", { d: "M 50 76 V 88", stroke: "currentColor", strokeWidth: "0.18", fill: "none", strokeDasharray: "0.6 0.6" }), _jsx("path", { d: "M 50 88 H 30 M 50 88 H 70", stroke: "currentColor", strokeWidth: "0.18", fill: "none", strokeDasharray: "0.6 0.6" })] })] }), _jsxs("aside", { className: "s9__detail", children: [_jsx("div", { className: "s9__detail-eye", children: node.sub }), _jsx("h3", { className: "s9__detail-title", children: node.label }), _jsx("ul", { className: "s9__duties", children: node.duties.map((d, i) => (_jsxs("li", { children: [_jsx("span", { className: "s9__duty-num", children: String(i + 1).padStart(2, "0") }), d] }, i))) }), _jsx("div", { className: "s9__detail-foot", children: _jsx("span", { children: "Hover or click any role on the chart" }) })] }, sel)] })] }));
}
export default Slide9;
