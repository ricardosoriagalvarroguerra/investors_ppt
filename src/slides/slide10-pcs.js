import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
/* ============================================================
   Slide 10 — Preferred Creditor Status
   ============================================================ */
const PCS = [
    { key: "pri", title: "Priority in repayment", desc: "Priority in repayment during sovereign stress events.", angle: -90 },
    { key: "rest", title: "Protection from restructuring", desc: "Protection from sovereign debt restructuring processes.", angle: -30 },
    { key: "rat", title: "Pillar of strong ratings", desc: "Anchors investment-grade credit ratings and capital efficiency.", angle: 30 },
    { key: "res", title: "Financial resilience", desc: "Contributes to the Bank's financial resilience through-the-cycle.", angle: 90 },
    { key: "char", title: "Constitutive Agreement", desc: "Anchored in the Bank's Constitutive Agreement.", angle: 150 },
    { key: "exp", title: "Low-risk exposure to LATAM", desc: "Enables low-risk exposure to Latin America for global investors.", angle: 210 },
];
function Slide10({ active }) {
    const [sel, setSel] = useState("rat");
    const wrapRef = useRef(null);
    const [size, setSize] = useState({ w: 600, h: 600 });
    useEffect(() => {
        if (!wrapRef.current)
            return;
        const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
        ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, []);
    const cx = size.w / 2;
    const cy = size.h / 2;
    const R = Math.min(size.w, size.h) * 0.36;
    const sat = PCS.map(s => {
        const rad = (s.angle * Math.PI) / 180;
        return { ...s, x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
    });
    return (_jsxs("div", { className: "s10", children: [_jsxs("header", { className: "s10__head", children: [_jsx("div", { className: "s10__h-num", children: "10 \u00B7 Credit profile" }), _jsxs("h2", { className: "s10__h-title", children: ["Preferred Creditor ", _jsx("span", { className: "thin", children: "Status" })] }), _jsxs("div", { className: "s10__h-meta", children: ["A strategic pillar of FONPLATA's", _jsx("br", {}), "financial strength and credit standing"] })] }), _jsxs("div", { className: "s10__body", children: [_jsxs("div", { className: "s10__hub", ref: wrapRef, children: [_jsxs("svg", { className: "s10__hub-svg", viewBox: `0 0 ${size.w} ${size.h}`, preserveAspectRatio: "xMidYMid meet", children: [_jsx("circle", { cx: cx, cy: cy, r: R, fill: "none", stroke: "var(--rule)", strokeWidth: "1", strokeDasharray: "2 4" }), _jsx("circle", { cx: cx, cy: cy, r: R * 0.62, fill: "none", stroke: "var(--rule)", strokeWidth: "1" }), sat.map(s => (_jsx("line", { x1: cx, y1: cy, x2: s.x, y2: s.y, stroke: sel === s.key ? "var(--accent)" : "var(--rule)", strokeWidth: sel === s.key ? 1.2 : 1, style: { transition: "stroke 0.3s ease" } }, s.key))), _jsx("circle", { cx: cx, cy: cy, r: R * 0.34, fill: "var(--accent)", opacity: "0.06" }), _jsx("circle", { cx: cx, cy: cy, r: R * 0.30, fill: "var(--paper)", stroke: "var(--accent)", strokeWidth: "1.5" })] }), _jsxs("div", { className: "s10__center", style: { width: R * 0.6, height: R * 0.6 }, children: [_jsx("div", { className: "s10__center-eye", children: "Preferred" }), _jsxs("div", { className: "s10__center-title", children: ["Creditor", _jsx("br", {}), "Status"] }), _jsx("div", { className: "s10__center-iso", children: "PCS" })] }), sat.map(s => (_jsxs("button", { className: "s10__sat " + (sel === s.key ? "is-active" : ""), style: { left: s.x, top: s.y }, onMouseEnter: () => setSel(s.key), onClick: () => setSel(s.key), children: [_jsx("span", { className: "s10__sat-dot" }), _jsx("span", { className: "s10__sat-label", children: s.title })] }, s.key)))] }), _jsxs("aside", { className: "s10__panel", children: [_jsx("div", { className: "s10__panel-eye", children: "Investor takeaway" }), _jsxs("p", { className: "s10__panel-lede", children: ["As a Multilateral Development Bank, FONPLATA benefits from a ", _jsx("em", { children: "de facto" }), " seniority under its Preferred Creditor Status \u2014 essential to preserve financial strength and credit ratings."] }), _jsxs("div", { className: "s10__panel-card", children: [_jsx("div", { className: "s10__panel-card-eye", children: "Selected dimension" }), _jsx("h3", { className: "s10__panel-card-title", children: PCS.find(p => p.key === sel).title }), _jsx("p", { className: "s10__panel-card-desc", children: PCS.find(p => p.key === sel).desc })] }, sel), _jsxs("div", { className: "s10__panel-rating", children: [_jsx("div", { className: "s10__panel-rating-eye", children: "Resulting ratings" }), _jsxs("div", { className: "s10__panel-rating-row", children: [_jsxs("div", { className: "s10__rt", children: [_jsx("span", { className: "s10__rt-num", children: "A+" }), _jsx("span", { className: "s10__rt-lab", children: "S&P" })] }), _jsxs("div", { className: "s10__rt", children: [_jsx("span", { className: "s10__rt-num", children: "A2" }), _jsx("span", { className: "s10__rt-lab", children: "Moody's" })] }), _jsxs("div", { className: "s10__rt", children: [_jsx("span", { className: "s10__rt-num", children: "Stable" }), _jsx("span", { className: "s10__rt-lab", children: "Outlook" })] })] })] })] })] })] }));
}
export default Slide10;
