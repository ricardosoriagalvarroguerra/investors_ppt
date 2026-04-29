import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 16 — Section Divider · 2. Financial Highlights
   No photos — stylized abstract data treatment
   ============================================================ */
function Slide16({ active }) {
    const svgRef = useRef(null);
    // generate a stylized "data river" — abstract sparkline landscape
    useEffect(() => {
        if (!svgRef.current)
            return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const W = 1400, H = 300;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "none");
        // generate 4 sparkline rivers at different y offsets
        const rng = (seed => () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        })(7);
        const rivers = [
            { y: 80, amp: 28, points: 40, opacity: 0.35 },
            { y: 140, amp: 38, points: 36, opacity: 0.55 },
            { y: 200, amp: 32, points: 44, opacity: 0.45 },
            { y: 250, amp: 22, points: 50, opacity: 0.25 },
        ];
        rivers.forEach((r, idx) => {
            const data = d3.range(r.points).map((_, i) => {
                const t = i / (r.points - 1);
                const noise = (rng() - 0.5) * r.amp;
                const trend = Math.sin(t * Math.PI * 1.5) * r.amp * 0.6;
                return { x: t * W, y: r.y + noise + trend };
            });
            const line = d3.line()
                .x(d => d.x).y(d => d.y)
                .curve(d3.curveCatmullRom.alpha(0.5));
            svg.append("path")
                .attr("d", line(data))
                .attr("fill", "none")
                .attr("stroke", "var(--accent)")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", idx % 2 === 0 ? "none" : "3 4")
                .attr("opacity", 0)
                .attr("stroke-linecap", "round")
                .transition().delay(idx * 200).duration(900)
                .attr("opacity", r.opacity);
        });
        // Bar marker columns for rhythm
        d3.range(28).forEach(i => {
            const h = 10 + rng() * 80;
            svg.append("rect")
                .attr("x", i * (W / 28) + (W / 28) * 0.35)
                .attr("y", H - h)
                .attr("width", (W / 28) * 0.18)
                .attr("height", 0)
                .attr("fill", "var(--accent)")
                .attr("opacity", 0.06)
                .transition().delay(800 + i * 30).duration(500)
                .attr("height", h);
        });
    }, [active]);
    return (_jsxs("div", { className: "s16", children: [_jsx("svg", { ref: svgRef, className: "s16__bg" }), _jsx("div", { className: "s16__grid", children: Array.from({ length: 12 }).map((_, i) => _jsx("div", { className: "s16__grid-col" }, i)) }), _jsxs("header", { className: "s16__top", children: [_jsx("div", { className: "s16__chapter", children: "Chapter 02" }), _jsxs("div", { className: "s16__progress", children: [_jsx("span", { className: "s16__progress-current", children: "02" }), _jsx("span", { className: "s16__progress-divider", children: "/" }), _jsx("span", { className: "s16__progress-total", children: "04" })] })] }), _jsxs("main", { className: "s16__main", children: [_jsx("div", { className: "s16__index", children: "02" }), _jsxs("div", { className: "s16__title-block", children: [_jsx("div", { className: "s16__eyebrow", children: "Section" }), _jsxs("h1", { className: "s16__title", children: ["Financial", _jsx("br", {}), _jsx("span", { className: "s16__title-thin", children: "Highlights" })] }), _jsx("div", { className: "s16__rule" }), _jsx("p", { className: "s16__lede", children: "Strong capitalization, consistent growth, and a balance sheet built for resilience through the cycle." })] })] }), _jsxs("footer", { className: "s16__foot", children: [_jsxs("div", { className: "s16__foot-stat", children: [_jsx("span", { className: "s16__foot-num", children: "USD 4.1bn" }), _jsx("span", { className: "s16__foot-lab", children: "Total assets" })] }), _jsxs("div", { className: "s16__foot-stat", children: [_jsx("span", { className: "s16__foot-num", children: "19%" }), _jsx("span", { className: "s16__foot-lab", children: "CAGR \u00B7 gross loans" })] }), _jsxs("div", { className: "s16__foot-stat", children: [_jsx("span", { className: "s16__foot-num", children: "0%" }), _jsx("span", { className: "s16__foot-lab", children: "NPL \u00B7 20-year track" })] }), _jsxs("div", { className: "s16__foot-stat", children: [_jsx("span", { className: "s16__foot-num", children: "A+ / A2" }), _jsx("span", { className: "s16__foot-lab", children: "S&P / Moody's" })] })] })] }));
}
export default Slide16;
