import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
import { CountUp } from "../lib";
/* ============================================================
   Slide 18 — Gross Loan Portfolio · combo bar+line chart
   ============================================================ */
const GLP = [
    { y: "Dec-15", v: 452, llp: 0.6 },
    { y: "Dec-16", v: 544, llp: 0.6 },
    { y: "Dec-17", v: 662, llp: 0.4 },
    { y: "Dec-18", v: 799, llp: 0.5 },
    { y: "Dec-19", v: 936, llp: 1.3 },
    { y: "Dec-20", v: 1252, llp: 0.8 },
    { y: "Dec-21", v: 1520, llp: 0.8 },
    { y: "Dec-22", v: 1761, llp: 0.8 },
    { y: "Dec-23", v: 1877, llp: 1.0 },
    { y: "Dec-24", v: 2382, llp: 0.9 },
    { y: "Dec-25", v: 2591, llp: 0.8 },
];
function Slide18({ active }) {
    const ref = useRef(null);
    const [hover, setHover] = useState(GLP.length - 1);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = 980, H = 380;
        const m = { top: 30, right: 60, bottom: 36, left: 56 };
        const iw = W - m.left - m.right;
        const ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(GLP.map(d => d.y)).range([0, iw]).padding(0.35);
        const y1 = d3.scaleLinear().domain([0, 3000]).range([ih, 0]);
        const y2 = d3.scaleLinear().domain([0, 2]).range([ih, 0]);
        // y1 gridlines
        g.append("g").call(d3.axisLeft(y1).ticks(5).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").call(d3.axisLeft(y1).ticks(5).tickFormat(d => d3.format(",")(d)).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text")
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
        // y1 label
        g.append("text").attr("x", -36).attr("y", -14).attr("font-family", "var(--font-mono)")
            .attr("font-size", 9.5).attr("letter-spacing", "0.12em").attr("fill", "var(--ink-3)").text("USD M");
        // y2 right axis
        g.append("g").attr("transform", `translate(${iw},0)`)
            .call(d3.axisRight(y2).ticks(4).tickFormat(d => d + "%").tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
        g.append("text").attr("x", iw + 30).attr("y", -14).attr("font-family", "var(--font-mono)")
            .attr("font-size", 9.5).attr("letter-spacing", "0.12em").attr("fill", "var(--ink-3)").attr("text-anchor", "end").text("LLP / GL");
        // bars
        g.selectAll("rect.glp").data(GLP).join("rect")
            .attr("class", "glp")
            .attr("x", d => x(d.y))
            .attr("width", x.bandwidth())
            .attr("y", ih).attr("height", 0)
            .attr("fill", (_, i) => i === hover ? "var(--chart-2)" : "var(--chart-4)")
            .attr("opacity", (_, i) => i === hover ? 1 : 0.85)
            .style("cursor", "pointer")
            .on("mouseenter", (_, d) => setHover(GLP.indexOf(d)))
            .transition().delay((_, i) => i * 60).duration(500)
            .attr("y", d => y1(d.v))
            .attr("height", d => ih - y1(d.v));
        // value labels above bars
        g.selectAll("text.lbl").data(GLP).join("text")
            .attr("class", "lbl")
            .attr("x", d => x(d.y) + x.bandwidth() / 2)
            .attr("y", d => y1(d.v) - 8)
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)")
            .attr("font-size", 10).attr("font-weight", 600)
            .attr("fill", "var(--ink)")
            .attr("opacity", 0)
            .text(d => d3.format(",")(d.v))
            .transition().delay((_, i) => i * 60 + 400).duration(300).attr("opacity", 1);
        // line for LLP
        const line = d3.line().x(d => x(d.y) + x.bandwidth() / 2).y(d => y2(d.llp))
            .curve(d3.curveMonotoneX);
        const path = g.append("path").datum(GLP).attr("d", line)
            .attr("fill", "none").attr("stroke", "var(--chart-6)").attr("stroke-width", 1.5)
            .attr("stroke-dasharray", function () { return this.getTotalLength(); })
            .attr("stroke-dashoffset", function () { return this.getTotalLength(); });
        path.transition().delay(800).duration(900).attr("stroke-dashoffset", 0);
        // line dots
        g.selectAll("circle.llp").data(GLP).join("circle")
            .attr("class", "llp")
            .attr("cx", d => x(d.y) + x.bandwidth() / 2)
            .attr("cy", d => y2(d.llp))
            .attr("r", 0)
            .attr("fill", "var(--paper)")
            .attr("stroke", "var(--chart-6)").attr("stroke-width", 1.5)
            .transition().delay((_, i) => i * 60 + 1100).duration(250).attr("r", 3);
        // value labels for LLP line
        g.selectAll("text.llp-lbl").data(GLP).join("text")
            .attr("class", "llp-lbl")
            .attr("x", d => x(d.y) + x.bandwidth() / 2)
            .attr("y", d => y2(d.llp) - 12)
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)")
            .attr("font-size", 9).attr("font-weight", 700)
            .attr("fill", "var(--chart-6)")
            .attr("paint-order", "stroke")
            .attr("stroke", "var(--paper)")
            .attr("stroke-width", 3)
            .attr("stroke-linejoin", "round")
            .attr("opacity", 0)
            .text(d => `${d.llp.toFixed(1)}%`)
            .transition().delay((_, i) => i * 60 + 1250).duration(250).attr("opacity", 1);
        // x-axis
        const ax = g.append("g").attr("transform", `translate(0,${ih})`)
            .call(d3.axisBottom(x).tickSize(0));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text")
            .attr("font-family", "var(--font-mono)")
            .attr("font-size", 10)
            .attr("fill", "var(--ink-3)")
            .attr("dy", "1.2em");
    }, [active]);
    useEffect(() => {
        if (!ref.current)
            return;
        d3.select(ref.current).selectAll("rect.glp")
            .attr("fill", (_, i) => i === hover ? "var(--chart-2)" : "var(--chart-4)")
            .attr("opacity", (_, i) => i === hover ? 1 : 0.85);
    }, [hover]);
    const sel = GLP[hover];
    return (_jsxs("div", { className: "s18", children: [_jsxs("header", { className: "s18__head", children: [_jsx("div", { className: "s18__h-num", children: "18 \u00B7 Loan portfolio" }), _jsxs("h2", { className: "s18__h-title", children: ["Gross Loan ", _jsx("span", { className: "thin", children: "Portfolio" })] }), _jsxs("div", { className: "s18__h-meta", children: ["Consistent growth \u00B7 high quality", _jsx("br", {}), "USD million"] })] }), _jsxs("div", { className: "s18__body", children: [_jsxs("aside", { className: "s18__rail", children: [_jsxs("div", { className: "s18__metric", children: [_jsx("div", { className: "s18__metric-eye", children: "CAGR \u00B7 10 years" }), _jsxs("div", { className: "s18__metric-num", children: [_jsx(CountUp, { to: 19, duration: 900, play: active }), "%"] }), _jsx("div", { className: "s18__metric-sub", children: "Dec-15 \u2192 Dec-25" })] }), _jsxs("div", { className: "s18__metric s18__metric--accent", children: [_jsx("div", { className: "s18__metric-eye", children: "NPL \u00B7 NAI" }), _jsx("div", { className: "s18__metric-num", children: "0%" }), _jsx("div", { className: "s18__metric-sub", children: "Last 20 years" })] }), _jsxs("div", { className: "s18__metric", children: [_jsx("div", { className: "s18__metric-eye", children: "Selected period" }), _jsx("div", { className: "s18__metric-num", children: sel.y }), _jsxs("div", { className: "s18__metric-sub", children: ["USD ", sel.v.toLocaleString(), "M \u00B7 LLP ", sel.llp, "%"] })] }), _jsxs("div", { className: "s18__legend", children: [_jsxs("div", { children: [_jsx("span", { className: "s18__legend-bar" }), "Gross Loan Portfolio"] }), _jsxs("div", { children: [_jsx("span", { className: "s18__legend-line" }), "LLP / Gross Loans"] })] })] }), _jsx("div", { className: "s18__chart-wrap", children: _jsx("svg", { ref: ref, className: "s18__chart" }) })] }), _jsxs("footer", { className: "s18__foot", children: ["Source \u00B7 Preliminary financial statements as of December 31, 2025.", _jsx("br", {}), "(*) Loan loss ratio defined as Loan Loss Provision / Gross Loans."] })] }));
}
export default Slide18;
