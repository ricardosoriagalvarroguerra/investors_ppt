import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 7 — Strategic Pillars & Business Plan
   ============================================================ */
const PILLARS = [
    { n: "I", key: "eff", title: "Institutional Efficiency", desc: "Operational excellence, lean cost base, and continuous process improvement." },
    { n: "II", key: "spec", title: "Functional Specialization", desc: "Clear product specialization: small-to-mid sovereign and sub-sovereign operations." },
    { n: "III", key: "comp", title: "Strategic Complementarity", desc: "Cooperation with other multilateral and regional development banks rather than competition." },
    { n: "IV", key: "val", title: "Value Creation", desc: "Maximum development impact per dollar deployed across vulnerable zones and border regions." },
    { n: "V", key: "fin", title: "Financial Soundness & Growth", desc: "Strong capital, prudent risk, and disciplined balance-sheet expansion." },
];
const ORIENTATION = [
    "Small to medium-size projects — USD 50–70mm",
    "Focus on vulnerable zones, border regions, and integration",
    "Grants delivered through Technical Assistance",
];
const SECTORS = [
    { key: "infra", label: "Infrastructure", share: 48, items: ["Road & Logistics", "Small-City Urban Development", "Energy"] },
    { key: "prod", label: "Productive Development", share: 27, items: ["Production", "Financial Services", "SMEs"] },
    { key: "soc", label: "Social & Green", share: 25, items: ["Health & Education", "Water & Sanitation", "Environment"] },
];
function Slide7({ active }) {
    const [pillar, setPillar] = useState(0);
    const donutRef = useRef(null);
    const [sectorSel, setSectorSel] = useState(null);
    // D3 donut for sector share
    useEffect(() => {
        if (!donutRef.current)
            return;
        const svg = d3.select(donutRef.current);
        svg.selectAll("*").remove();
        const W = 160, H = 160, R = 70, r = 46;
        svg.attr("viewBox", `0 0 ${W} ${H}`);
        const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);
        const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
        const pie = d3.pie().sort(null).value(d => d.share);
        const arcs = pie(SECTORS);
        const colors = ["var(--chart-6)", "var(--chart-7)", "var(--chart-4)"];
        g.selectAll("path").data(arcs).join("path")
            .attr("d", arc)
            .attr("fill", (_, i) => colors[i])
            .attr("opacity", 0)
            .style("cursor", "pointer")
            .on("mouseenter", (_, d) => setSectorSel(d.data.key))
            .on("mouseleave", () => setSectorSel(null))
            .transition().delay((_, i) => 150 + i * 100).duration(500).attr("opacity", 1);
        g.append("text").attr("text-anchor", "middle").attr("y", -2)
            .attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("letter-spacing", "0.12em")
            .attr("fill", "var(--ink-3)").text("SECTOR");
        g.append("text").attr("text-anchor", "middle").attr("y", 14)
            .attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("letter-spacing", "0.12em")
            .attr("fill", "var(--ink-3)").text("MIX");
    }, [active]);
    return (_jsxs("div", { className: "s7", children: [_jsxs("header", { className: "s7__head", children: [_jsx("div", { className: "s7__h-num", children: "07 \u00B7 Strategy" }), _jsxs("h2", { className: "s7__h-title", children: ["Core Strategic Pillars ", _jsx("span", { className: "thin", children: "& Business Plan" })] }), _jsx("div", { className: "s7__h-meta", children: "Five pillars \u00B7 Three target sectors" })] }), _jsxs("section", { className: "s7__pillars", children: [_jsx("div", { className: "s7__pillars-rule" }), PILLARS.map((p, i) => (_jsxs("button", { className: "s7__pillar " + (i === pillar ? "is-active" : ""), onMouseEnter: () => setPillar(i), onClick: () => setPillar(i), children: [_jsx("span", { className: "s7__pillar-num", children: p.n }), _jsxs("span", { className: "s7__pillar-cap", children: [_jsx("span", { className: "s7__pillar-shaft" }), _jsx("span", { className: "s7__pillar-base" })] }), _jsx("span", { className: "s7__pillar-title", children: p.title })] }, p.key)))] }), _jsxs("section", { className: "s7__pillar-detail", children: [_jsxs("span", { className: "s7__pd-eyebrow", children: ["Pillar ", PILLARS[pillar].n] }), _jsx("p", { className: "s7__pd-text", children: PILLARS[pillar].desc })] }, pillar), _jsxs("section", { className: "s7__split", children: [_jsxs("div", { className: "s7__panel", children: [_jsx("div", { className: "s7__panel-eye", children: "Strategic Business Orientation" }), _jsx("ul", { className: "s7__list", children: ORIENTATION.map((o, i) => (_jsxs("li", { children: [_jsx("span", { className: "s7__bullet", children: String(i + 1).padStart(2, "0") }), o] }, i))) })] }), _jsxs("div", { className: "s7__panel s7__panel--sectors", children: [_jsx("div", { className: "s7__panel-eye", children: "Target Sectors" }), _jsxs("div", { className: "s7__sectors-row", children: [_jsx("svg", { ref: donutRef, className: "s7__donut" }), _jsx("div", { className: "s7__sectors-list", children: SECTORS.map((s, i) => (_jsxs("div", { className: "s7__sector " + (sectorSel === s.key ? "is-active" : ""), onMouseEnter: () => setSectorSel(s.key), onMouseLeave: () => setSectorSel(null), children: [_jsxs("div", { className: "s7__sector-head", children: [_jsx("span", { className: "s7__sector-name", children: s.label }), _jsxs("span", { className: "s7__sector-share", children: [s.share, "%"] })] }), _jsx("div", { className: "s7__sector-items", children: s.items.join(" · ") })] }, s.key))) })] })] })] })] }));
}
export default Slide7;
