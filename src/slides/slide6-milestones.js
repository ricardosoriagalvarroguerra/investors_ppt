import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/* ============================================================
   Slide 6 — Recent Milestones · interactive timeline
   ============================================================ */
const MILESTONES = [
    { year: 2010, title: "Institutional reform", desc: "Institutional reform and a new governance model adopted to modernize the Bank's structure.", tag: "Governance" },
    { year: 2012, title: "First Executive President", desc: "Appointment of the first Executive President — formalizing the modern executive structure.", tag: "Leadership" },
    { year: 2013, title: "1st Capital Increase", desc: "First general capital increase, expanding the Bank's lending capacity.", tag: "Capital" },
    { year: 2016, title: "2nd Capital Increase", desc: "Second general capital increase. First sovereign rating: A2 / A− from Moody's and S&P.", tag: "Ratings" },
    { year: 2018, title: "Fund → Development Bank", desc: "Transition from a Fund to a fully-fledged Regional Development Bank.", tag: "Mandate" },
    { year: 2019, title: "Inaugural bond issuance", desc: "First international bond — CHF 150mm. New business line for non-sovereign-guaranteed State-Owned Institutions.", tag: "DCM" },
    { year: 2020, title: "Fiduciary agent of FOCEM", desc: "Designated fiduciary agent for FOCEM funds — MERCOSUR's structural-asymmetries fund.", tag: "Mandate" },
    { year: 2021, title: "S&P upgrade to A", desc: "S&P upgrades the Bank to A. Sustainable Debt Framework established.", tag: "Ratings" },
    { year: 2022, title: "Flexible Financial Conditions", desc: "Introduction of Flexible Financial Conditions — tailoring tenor, grace, and amortization to member needs.", tag: "Product" },
    { year: 2023, title: "Sustainable bonds · Japan debut", desc: "First sustainable bond issuance and inaugural debt placement in Japan.", tag: "DCM" },
    { year: 2024, title: "3rd Capital Increase", desc: "Authorized capital more than doubles, from USD 3.0bn to USD 6.5bn. New Constitutive Agreement in effect.", tag: "Capital" },
    { year: 2025, title: "Asia FX & A+ upgrade", desc: "First market access in USD, AUD, and INR via MTN. FX agreement with CABEI. S&P upgrade to A+.", tag: "DCM" },
];
const FOOT_FACTS = [
    _jsxs(_Fragment, { children: ["More than ", _jsx("strong", { children: "USD 5.3bn" }), " in approved loans since inception \u00B7 ", _jsx("strong", { children: "USD 4.0bn" }), " since 2013."] }),
    _jsxs(_Fragment, { children: ["In 2024, FONPLATA more than doubled its authorized capital, from ", _jsx("strong", { children: "USD 3.0bn" }), " to ", _jsx("strong", { children: "USD 6.5bn" }), "."] }),
    _jsxs(_Fragment, { children: ["In July 2025, the Board of Governors approved the subscription of the ", _jsx("strong", { children: "3rd Capital Increase" }), "."] }),
];
function Slide6({ active }) {
    const [sel, setSel] = useState(11);
    return (_jsxs("div", { className: "s6", children: [_jsxs("header", { className: "s6__head", children: [_jsx("div", { className: "s6__h-num", children: "06 \u00B7 Track record" }), _jsxs("h2", { className: "s6__h-title", children: ["Recent ", _jsx("span", { className: "thin", children: "Milestones" })] }), _jsxs("div", { className: "s6__h-meta", children: ["From a Fund to a", _jsx("br", {}), "Full-Fledged Regional Development Bank"] })] }), _jsxs("div", { className: "s6__timeline", children: [_jsx("div", { className: "s6__axis" }), _jsx("div", { className: "s6__years", children: MILESTONES.map((m, i) => {
                            const pct = (i / (MILESTONES.length - 1)) * 100;
                            const above = i % 2 === 0;
                            return (_jsxs("button", { className: "s6__node " + (i === sel ? "is-active" : "") + (above ? " above" : " below"), style: { left: `${pct}%` }, onMouseEnter: () => setSel(i), onClick: () => setSel(i), children: [_jsx("span", { className: "s6__year", children: m.year }), _jsx("span", { className: "s6__dot" }), _jsx("span", { className: "s6__stem" }), _jsx("span", { className: "s6__caplet", children: m.title })] }, m.year));
                        }) })] }), _jsxs("div", { className: "s6__detail", children: [_jsxs("div", { className: "s6__detail-card", children: [_jsx("div", { className: "s6__detail-tag", children: MILESTONES[sel].tag }), _jsx("div", { className: "s6__detail-year", children: MILESTONES[sel].year }), _jsx("h3", { className: "s6__detail-title", children: MILESTONES[sel].title }), _jsx("p", { className: "s6__detail-desc", children: MILESTONES[sel].desc }), _jsxs("div", { className: "s6__detail-counter", children: [_jsx("span", { className: "s6__c-num", children: String(sel + 1).padStart(2, "0") }), _jsxs("span", { className: "s6__c-tot", children: ["/ ", String(MILESTONES.length).padStart(2, "0")] })] })] }, sel), _jsx("ul", { className: "s6__facts", children: FOOT_FACTS.map((f, i) => (_jsxs("li", { children: [_jsxs("span", { className: "s6__facts-num", children: ["0", i + 1] }), _jsx("span", { children: f })] }, i))) })] }), _jsx("footer", { className: "s6__foot", children: "(*) FOCEM \u2014 MERCOSUR development fund created to finance projects reducing structural asymmetries among members. \u00A0\u00B7\u00A0 (**) Refers to the Bank's ability to structure financing with customized terms (maturities, grace, currencies)." })] }));
}
export default Slide6;
