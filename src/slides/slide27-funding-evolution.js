import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 27 — Funding Evolution · 3 donuts (2016, 2020, 2025)
   ============================================================ */
const FUND_2016 = [
    { k: "DFI", v: 100, color: "var(--accent)" },
];
const FUND_2020 = [
    { k: "CHF Bonds", v: 27, color: "var(--chart-6)" },
    { k: "DFI & Other Institutions", v: 73, color: "var(--chart-4)" },
];
const FUND_2025 = [
    { k: "USD Bonds", v: 23, color: "var(--chart-6)", flag: "🇺🇸" },
    { k: "CHF Bonds", v: 34, color: "var(--chart-6)", flag: "🇨🇭" },
    { k: "JPY Bonds", v: 6, color: "var(--chart-6)", flag: "🇯🇵" },
    { k: "AUD Bonds", v: 1, color: "var(--chart-6)", flag: "🇦🇺" },
    { k: "INR Bonds", v: 5, color: "var(--chart-6)", flag: "🇮🇳" },
    { k: "CAF", v: 6, color: "var(--chart-4)" },
    { k: "IDB", v: 8, color: "var(--chart-4)" },
    { k: "EIB", v: 3, color: "var(--chart-4)" },
    { k: "AFD", v: 2, color: "var(--chart-4)" },
    { k: "BBVA", v: 8, color: "var(--chart-4)" },
    { k: "KFW", v: 1, color: "var(--chart-4)" },
    { k: "CDP", v: 1, color: "var(--chart-4)" },
    { k: "ICO", v: 2, color: "var(--chart-4)" },
];
function FundingDonut({ data, year, total, size, active, idx }) {
    const ref = useRef(null);
    const [activeKey, setActiveKey] = useState(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = size, H = size;
        const R = size * 0.42, r = size * 0.27;
        svg.attr("viewBox", `0 0 ${W} ${H}`);
        const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);
        const pie = d3.pie().sort(null).value(d => d.v);
        const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
        const arcs = pie(data);
        g.selectAll("path").data(arcs).join("path")
            .attr("fill", d => d.data.color)
            .attr("data-key", d => d.data.k)
            .attr("cursor", "pointer")
            .on("mouseenter", (_, d) => setActiveKey(d.data.k))
            .on("mouseleave", () => setActiveKey(null))
            .attr("opacity", 0)
            .transition().delay(idx * 250 + 200).duration(500).attr("opacity", 1)
            .attrTween("d", function (d) {
            const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
            return t => arc(i(t));
        });
        // center label
        g.append("text").attr("text-anchor", "middle").attr("dy", "-0.2em")
            .attr("font-family", "var(--font-mono)").attr("font-size", size * 0.05)
            .attr("letter-spacing", "0.08em").attr("fill", "var(--ink-3)")
            .text("USD");
        g.append("text").attr("text-anchor", "middle").attr("dy", "1em")
            .attr("font-size", size * 0.10).attr("font-weight", 700)
            .attr("fill", "var(--accent)")
            .text(total);
    }, [active, idx, size, data]);
    useEffect(() => {
        if (!ref.current)
            return;
        d3.select(ref.current).selectAll("path")
            .attr("opacity", d => !activeKey || d.data.k === activeKey ? 1 : 0.35)
            .attr("stroke", d => d.data.k === activeKey ? "var(--paper)" : "transparent")
            .attr("stroke-width", d => d.data.k === activeKey ? 3 : 0);
    }, [activeKey]);
    return (_jsxs("div", { className: "s27__donut", children: [_jsx("svg", { ref: ref, className: "s27__donut-svg", style: { width: size, height: size } }), _jsx("div", { className: "s27__year", children: year }), _jsxs("div", { className: "s27__legend", children: [data.slice(0, 8).map((d, i) => (_jsxs("div", { className: `s27__legend-row ${activeKey === d.k ? "is-hover" : ""}`, onMouseEnter: () => setActiveKey(d.k), onMouseLeave: () => setActiveKey(null), children: [_jsx("span", { className: "s27__sw", style: { background: d.color } }), _jsxs("span", { className: "s27__sw-lab", children: [d.flag ? d.flag + " " : "", d.k] }), _jsxs("span", { className: "s27__sw-val", children: [d.v, "%"] })] }, i))), data.length > 8 && (_jsxs("div", { className: "s27__more", children: ["+ ", data.length - 8, " more partners"] }))] })] }));
}
function Slide27({ active }) {
    return (_jsxs("div", { className: "s27", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "27 \u00B7 Funding evolution" }), _jsxs("h2", { className: "s17__h-title", children: ["Broader access, ", _jsx("span", { className: "thin", children: "greater balance" })] }), _jsxs("div", { className: "s17__h-meta", children: ["From multilateral reliance to", _jsx("br", {}), "diversified capital markets"] })] }), _jsxs("div", { className: "s27__body", children: [_jsx(FundingDonut, { data: FUND_2016, year: "2016", total: "16M*", size: 250, active: active, idx: 0 }), _jsxs("div", { className: "s27__arrow", children: [_jsx("div", { className: "s27__arrow-line" }), _jsx("div", { className: "s27__arrow-lab", children: "Diversification" }), _jsx("svg", { viewBox: "0 0 24 8", className: "s27__arrow-tip", children: _jsx("path", { d: "M 0 4 L 22 4 M 18 1 L 22 4 L 18 7", stroke: "var(--accent)", strokeWidth: "1.4", fill: "none" }) })] }), _jsx(FundingDonut, { data: FUND_2020, year: "2020", total: "542M*", size: 330, active: active, idx: 1 }), _jsxs("div", { className: "s27__arrow", children: [_jsx("div", { className: "s27__arrow-line" }), _jsx("div", { className: "s27__arrow-lab", children: "Capital markets" }), _jsx("svg", { viewBox: "0 0 24 8", className: "s27__arrow-tip", children: _jsx("path", { d: "M 0 4 L 22 4 M 18 1 L 22 4 L 18 7", stroke: "var(--accent)", strokeWidth: "1.4", fill: "none" }) })] }), _jsx(FundingDonut, { data: FUND_2025, year: "December 2025", total: "2,079M*", size: 400, active: active, idx: 2 })] }), _jsx("footer", { className: "s17__foot", children: "(*) at nominal value. Source \u00B7 FONPLATA, as of December 31, 2025." })] }));
}
export default Slide27;
