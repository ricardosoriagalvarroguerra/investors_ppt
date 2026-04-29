import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
import { CountUp } from "../lib";
/* ============================================================
   Slide 28 — 2025 Funding Activity · stacked monthly issuances
   ============================================================ */
const FUND25 = [
    { m: "Jan", segs: [] },
    { m: "Feb", segs: [{ v: 40, cur: "USD", green: true, src: "BBVA" }] },
    { m: "Mar", segs: [{ v: 30, cur: "USD", green: true, src: "USD" }, { v: 40, cur: "USD", green: true, src: "USD" }, { v: 50, cur: "USD", green: false, src: "USD" }, { v: 30, cur: "USD", src: "USD" }] },
    { m: "Apr", segs: [{ v: 50, cur: "USD" }, { v: 100, cur: "USD", src: "CAF" }] },
    { m: "Apr2", segs: [{ v: 50, cur: "USD", green: true }] },
    { m: "May", segs: [{ v: 50, cur: "USD" }] },
    { m: "Jun", segs: [] },
    { m: "Jul", segs: [{ v: 11.4, cur: "USD" }] },
    { m: "Aug", segs: [{ v: 25.1, cur: "USD", green: true, src: "AUD" }, { v: 35, cur: "USD", src: "IDB" }] },
    { m: "Sep", segs: [{ v: 20.4, cur: "USD" }, { v: 30, cur: "USD", src: "JPY" }] },
    { m: "Oct", segs: [{ v: 17.8, cur: "USD" }] },
    { m: "Nov", segs: [{ v: 101.5, cur: "USD", src: "INR", green: true }] },
    { m: "Dec", segs: [{ v: 6.4, cur: "USD", src: "KFW" }, { v: 10.8, cur: "USD", src: "IDB" }] },
];
function Slide28({ active }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = 1080, H = 380;
        const m = { top: 30, right: 30, bottom: 50, left: 50 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const months = FUND25.map(d => d.m);
        const x = d3.scaleBand().domain(months).range([0, iw]).padding(0.32);
        const y = d3.scaleLinear().domain([0, 200]).range([ih, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(8).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").call(d3.axisLeft(y).ticks(8).tickFormat(d => d.toString()).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
        FUND25.forEach((d, i) => {
            let cum = 0;
            d.segs.forEach((s, si) => {
                const y0 = y(cum), y1 = y(cum + s.v);
                const isGreen = s.green;
                g.append("rect")
                    .attr("x", x(d.m)).attr("width", x.bandwidth())
                    .attr("y", ih).attr("height", 0)
                    .attr("fill", isGreen ? "var(--chart-7)" : "var(--chart-4)")
                    .attr("stroke", "var(--chart-1)").attr("stroke-width", 1)
                    .attr("stroke-dasharray", "3 2")
                    .attr("opacity", 0.95)
                    .transition().delay(i * 60 + si * 100).duration(450)
                    .attr("y", y1).attr("height", Math.max(0, y0 - y1));
                if (s.v >= 8) {
                    g.append("text")
                        .attr("x", x(d.m) + x.bandwidth() / 2)
                        .attr("y", (y0 + y1) / 2)
                        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
                        .attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("font-weight", 700)
                        .attr("fill", "var(--ink)")
                        .text(s.v.toLocaleString())
                        .attr("opacity", 0).transition().delay(i * 60 + si * 100 + 400).attr("opacity", 1);
                }
                // green leaf marker for sustainable
                if (isGreen) {
                    g.append("text")
                        .attr("x", x(d.m) + 4).attr("y", y1 + 12)
                        .attr("font-size", 11).attr("fill", "var(--chart-7)")
                        .text("✦")
                        .attr("opacity", 0).transition().delay(i * 60 + si * 100 + 500).attr("opacity", 1);
                }
                cum += s.v;
            });
        });
        const ax = g.append("g").attr("transform", `translate(0,${ih})`)
            .call(d3.axisBottom(x).tickSize(0).tickFormat(d => d.replace("2", "") + "-25"));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("fill", "var(--ink-3)").attr("dy", "1.6em");
        // y-axis label
        g.append("text").attr("x", -36).attr("y", -14).attr("font-family", "var(--font-mono)")
            .attr("font-size", 9.5).attr("letter-spacing", "0.12em").attr("fill", "var(--ink-3)").text("USD M");
    }, [active]);
    return (_jsxs("div", { className: "s28", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "28 \u00B7 2025 funding" }), _jsxs("h2", { className: "s17__h-title", children: ["Overview of ", _jsx("span", { className: "thin", children: "2025 funding" })] }), _jsxs("div", { className: "s17__h-meta", children: ["USD 622M across 13 issuances", _jsx("br", {}), "Annual record \u00B7 USD M, nominal"] })] }), _jsxs("div", { className: "s28__body", children: [_jsxs("aside", { className: "s28__rail", children: [_jsxs("div", { className: "s28__pull", children: ["FONPLATA tapped global capital markets for ", _jsx("strong", { children: "USD 622M" }), " across ", _jsx("strong", { children: "13 issuances" }), " \u2014 a new annual record since the first market issuance in 2019."] }), _jsxs("div", { className: "s28__metrics", children: [_jsxs("div", { className: "s28__metric s28__metric--accent", children: [_jsx("div", { className: "s28__m-eye", children: "2025 issuance volume" }), _jsxs("div", { className: "s28__m-num", children: ["USD ", _jsx(CountUp, { to: 622, duration: 900, play: active }), " M"] })] }), _jsxs("div", { className: "s28__metric", children: [_jsx("div", { className: "s28__m-eye", children: "Issuances" }), _jsx("div", { className: "s28__m-num", children: "13" })] }), _jsxs("div", { className: "s28__metric", children: [_jsx("div", { className: "s28__m-eye", children: "Sustainable" }), _jsx("div", { className: "s28__m-num", children: "7 of 13" }), _jsx("div", { className: "s28__m-sub", children: "Under FONPLATA's SDF framework" })] })] }), _jsxs("div", { className: "s28__legend", children: [_jsxs("div", { children: [_jsx("span", { className: "s28__sw s28__sw--reg" }), "Regular issuance"] }), _jsxs("div", { children: [_jsx("span", { className: "s28__sw s28__sw--green" }), "Sustainable issuance \u2726"] })] })] }), _jsx("div", { className: "s28__chart-wrap", children: _jsx("svg", { ref: ref, className: "s28__chart" }) })] }), _jsx("footer", { className: "s17__foot", children: "\u2726 Sustainable borrowing under FONPLATA's SDF \u00B7 Source \u00B7 FONPLATA, as of December 31, 2025." })] }));
}
export default Slide28;
