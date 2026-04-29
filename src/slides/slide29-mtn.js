import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 29 — MTN spreads + region donut + redemption profile
   ============================================================ */
const MTN_POINTS = [
    { id: "MTN 0", t: 3, s: 122 },
    { id: "MTN 1", t: 3, s: 130 },
    { id: "MTN 2", t: 5, s: 140 },
    { id: "MTN 3", t: 5, s: 132 },
    { id: "MTN 4.1", t: 5, s: 128 },
    { id: "MTN 4.2", t: 5, s: 132 },
    { id: "MTN 5", t: 7, s: 142 },
    { id: "MTN 6", t: 5, s: 130 },
    { id: "MTN 7", t: 7, s: 130 },
    { id: "MTN 9", t: 4, s: 116 },
    { id: "MTN 10", t: 7, s: 130 },
    { id: "MTN 11", t: 7, s: 132 },
    { id: "MTN 5", t: 10, s: 167 },
    { id: "MTN 8.1", t: 15, s: 188 },
    { id: "MTN 8.2", t: 15, s: 184 },
];
const REDEMP = [
    { y: 2026, b: 308 }, { y: 2027, b: 305 }, { y: 2028, b: 308 }, { y: 2029, b: 280 },
    { y: 2030, b: 240 }, { y: 2031, b: 100 }, { y: 2032, b: 50 }, { y: 2033, b: 30 },
    { y: 2034, b: 22 }, { y: 2035, b: 18 }, { y: 2036, b: 14 }, { y: 2037, b: 8 },
    { y: 2038, b: 5 }, { y: 2039, b: 4 }, { y: 2040, b: 60 }, { y: 2041, b: 0 },
    { y: 2042, b: 0 }, { y: 2043, b: 0 }, { y: 2044, b: 0 }, { y: 2045, b: 0 }, { y: 2046, b: 0 },
];
const REGION = [
    { k: "Asia", v: 61, color: "var(--chart-6)" },
    { k: "Europe", v: 39, color: "var(--chart-7)" },
];
function Slide29({ active }) {
    const scatterRef = useRef(null);
    const donutRef = useRef(null);
    const redempRef = useRef(null);
    useEffect(() => {
        if (!scatterRef.current)
            return;
        const svg = d3.select(scatterRef.current);
        svg.selectAll("*").remove();
        const W = 760, H = 320;
        const m = { top: 18, right: 32, bottom: 42, left: 50 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleLinear().domain([0, 16]).range([0, iw]);
        const y = d3.scaleLinear().domain([100, 200]).range([ih, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").attr("transform", `translate(0,${ih})`)
            .call(d3.axisBottom(x).ticks(8).tickSize(0))
            .call(s => s.selectAll("path").attr("stroke", "var(--rule-strong)"))
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("fill", "var(--ink-3)"));
        g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("fill", "var(--ink-3)"));
        g.append("text").attr("x", iw / 2).attr("y", ih + 28).attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("fill", "var(--ink-3)").text("Term · years");
        // trend curve
        const fit = d3.line().curve(d3.curveBasis)
            .x(d => x(d.t)).y(d => y(d.s));
        const trend = MTN_POINTS.slice().sort((a, b) => a.t - b.t);
        const path = g.append("path").datum(trend)
            .attr("d", fit).attr("fill", "none")
            .attr("stroke", "var(--chart-6)").attr("stroke-width", 1.4).attr("stroke-dasharray", "4 3")
            .attr("opacity", 0).transition().delay(400).duration(500).attr("opacity", 0.6);
        // dots
        g.selectAll("circle").data(MTN_POINTS).join("circle")
            .attr("cx", d => x(d.t)).attr("cy", d => y(d.s))
            .attr("r", 0).attr("fill", "var(--paper-4)").attr("stroke", "var(--chart-6)").attr("stroke-width", 1.5)
            .transition().delay((_, i) => i * 60).duration(300).attr("r", 5);
        g.selectAll("text.lbl").data(MTN_POINTS).join("text")
            .attr("class", "lbl")
            .attr("x", d => x(d.t) + 6).attr("y", d => y(d.s) - 6)
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)")
            .text(d => d.id)
            .attr("opacity", 0).transition().delay((_, i) => 800 + i * 30).attr("opacity", 1);
    }, [active]);
    useEffect(() => {
        if (!donutRef.current)
            return;
        const svg = d3.select(donutRef.current);
        svg.selectAll("*").remove();
        const W = 200, H = 200;
        svg.attr("viewBox", `0 0 ${W} ${H}`);
        const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);
        const arc = d3.arc().innerRadius(48).outerRadius(82).cornerRadius(2).padAngle(0.018);
        const pie = d3.pie().sort(null).value(d => d.v);
        const arcs = pie(REGION);
        g.selectAll("path").data(arcs).join("path")
            .attr("fill", d => d.data.color)
            .attr("opacity", 0).transition().delay(300).duration(500).attr("opacity", 1)
            .attrTween("d", function (d) {
            const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
            return t => arc(i(t));
        });
        arcs.forEach(d => {
            const c = arc.centroid(d);
            const label = g.append("text").attr("x", c[0]).attr("y", c[1])
                .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
                .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 700)
                .attr("fill", "var(--paper)")
                .attr("opacity", 0);
            label.append("tspan").attr("x", c[0]).attr("dy", "-0.35em").text(d.data.k);
            label.append("tspan").attr("x", c[0]).attr("dy", "1.15em").text(`${d.data.v}%`);
            label.transition().delay(900).attr("opacity", 1);
        });
    }, [active]);
    useEffect(() => {
        if (!redempRef.current)
            return;
        const svg = d3.select(redempRef.current);
        svg.selectAll("*").remove();
        const W = 1080, H = 220;
        const m = { top: 20, right: 30, bottom: 30, left: 44 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(REDEMP.map(d => d.y)).range([0, iw]).padding(0.32);
        const y = d3.scaleLinear().domain([0, 400]).range([ih, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(",")).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("fill", "var(--ink-3)"));
        g.selectAll("rect").data(REDEMP).join("rect")
            .attr("x", d => x(d.y)).attr("width", x.bandwidth())
            .attr("y", ih).attr("height", 0)
            .attr("fill", "var(--chart-4)")
            .transition().delay((_, i) => i * 50).duration(400)
            .attr("y", d => y(d.b)).attr("height", d => Math.max(0, ih - y(d.b)));
        const ax = g.append("g").attr("transform", `translate(0,${ih})`)
            .call(d3.axisBottom(x).tickSize(0));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
    }, [active]);
    return (_jsxs("div", { className: "s29", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "29 \u00B7 MTN program" }), _jsxs("h2", { className: "s17__h-title", children: ["Tighter spreads, ", _jsx("span", { className: "thin", children: "longer tenors" })] }), _jsxs("div", { className: "s17__h-meta", children: ["First-ever 10Y and 15Y issuances", _jsx("br", {}), "Broader investor reach"] })] }), _jsxs("div", { className: "s29__body", children: [_jsxs("section", { className: "s29__top", children: [_jsxs("div", { className: "s29__panel", children: [_jsx("div", { className: "s29__panel-eye", children: "MTN issuance progression & spreads" }), _jsx("div", { className: "s29__panel-sub", children: "Spread over SOFR \u00B7 bps" }), _jsx("svg", { ref: scatterRef, className: "s29__scatter" })] }), _jsxs("div", { className: "s29__panel s29__panel--narrow", children: [_jsx("div", { className: "s29__panel-eye", children: "MTN by region" }), _jsx("div", { className: "s29__panel-sub", children: "YTD \u00B7 Dec 2025" }), _jsx("div", { className: "s29__donut-row", children: _jsx("svg", { ref: donutRef, className: "s29__donut-svg" }) })] })] }), _jsxs("section", { className: "s29__bottom", children: [_jsx("div", { className: "s29__panel-eye", children: "Redemption profile \u00B7 USD M, nominal \u00B7 2025 borrowings" }), _jsx("svg", { ref: redempRef, className: "s29__redemp" })] })] }), _jsx("footer", { className: "s17__foot", children: "Tactical issuances at 3 \u00B7 5 \u00B7 7 \u00B7 10 \u00B7 15 yrs supported price discovery & re-anchored pricing. Source \u00B7 FONPLATA, as of December 31, 2025." })] }));
}
export default Slide29;
