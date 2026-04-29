import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 24 — Continuous Shareholder Support · 4-segment stacks
   ============================================================ */
const SHARE = [
    { y: "Dec-12", paid: 449, ppaid: 0, call: 0, pcall: 0 },
    { y: "Dec-14", paid: 496, ppaid: 0, call: 489, pcall: 0 }, // 1st GCI begins
    { y: "Dec-16", paid: 643, ppaid: 303, call: 484, pcall: 358 },
    { y: "Dec-17", paid: 156, ppaid: 142, call: 698, pcall: 1639 }, // bridge year
    { y: "Dec-19", paid: 817, ppaid: 532, call: 1665, pcall: 0 }, // 2nd GCI started
    { y: "Dec-19", paid: 865, ppaid: 484, call: 1665, pcall: 0 },
    { y: "Dec-20", paid: 917, ppaid: 432, call: 1665, pcall: 0 },
    { y: "Dec-21", paid: 1006, ppaid: 343, call: 1665, pcall: 0 },
    { y: "Dec-22", paid: 1082, ppaid: 268, call: 1665, pcall: 0 },
    { y: "Dec-23", paid: 1210, ppaid: 139, call: 1665, pcall: 0 },
    { y: "Dec-24", paid: 1321, ppaid: 0, call: 1665, pcall: 0 },
];
// Cleaner data following slide narrative (1st GCI then 2nd GCI integration)
const SHARE2 = [
    { y: "Dec-12", paid: 449, ppaid: 0, call: 0, pcall: 0 },
    { y: "Dec-14", paid: 496, ppaid: 303, call: 484, pcall: 358 },
    { y: "Dec-16", paid: 643, ppaid: 156, call: 698, pcall: 142 },
    { y: "Dec-19", paid: 817, ppaid: 532, call: 1665, pcall: 0 },
    { y: "Dec-19b", paid: 865, ppaid: 484, call: 1665, pcall: 0 },
    { y: "Dec-20", paid: 917, ppaid: 432, call: 1665, pcall: 0 },
    { y: "Dec-21", paid: 1006, ppaid: 343, call: 1665, pcall: 0 },
    { y: "Dec-22", paid: 1082, ppaid: 268, call: 1665, pcall: 0 },
    { y: "Dec-23", paid: 1210, ppaid: 139, call: 1665, pcall: 0 },
    { y: "Dec-24", paid: 1321, ppaid: 0, call: 1665, pcall: 0 },
];
function Slide24({ active }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = 1080, H = 460;
        const m = { top: 80, right: 30, bottom: 36, left: 60 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(SHARE2.map(d => d.y)).range([0, iw]).padding(0.35);
        const y = d3.scaleLinear().domain([0, 3500]).range([ih, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(",")).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
        // stacked layers from bottom: paid, ppaid, call, pcall
        const layers = [
            { key: "paid", fill: "var(--chart-2)", dash: false, color: "var(--on-accent)" },
            { key: "ppaid", fill: "var(--chart-4)", dash: true, color: "var(--ink)" },
            { key: "call", fill: "var(--chart-6)", dash: false, color: "var(--on-accent)" },
            { key: "pcall", fill: "var(--chart-5)", dash: true, color: "var(--ink)" },
        ];
        SHARE2.forEach((d, i) => {
            let cum = 0;
            layers.forEach((layer, li) => {
                const v = d[layer.key];
                if (!v)
                    return;
                const y0 = y(cum);
                const y1 = y(cum + v);
                g.append("rect")
                    .attr("x", x(d.y)).attr("width", x.bandwidth())
                    .attr("y", ih).attr("height", 0)
                    .attr("fill", layer.fill)
                    .attr("stroke", layer.dash ? "var(--chart-1)" : "none")
                    .attr("stroke-width", layer.dash ? 1 : 0)
                    .attr("stroke-dasharray", layer.dash ? "3 3" : null)
                    .transition().delay(i * 60 + li * 80).duration(450)
                    .attr("y", y1).attr("height", y0 - y1);
                if (v >= 200 || (li === 1 && v >= 100)) {
                    g.append("text")
                        .attr("x", x(d.y) + x.bandwidth() / 2)
                        .attr("y", (y0 + y1) / 2)
                        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
                        .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 600)
                        .attr("fill", layer.color)
                        .text(v)
                        .attr("opacity", 0)
                        .transition().delay(i * 60 + li * 80 + 400).attr("opacity", 1);
                }
                cum += v;
            });
            // total above
            const tot = d.paid + d.ppaid + d.call + d.pcall;
            g.append("text")
                .attr("x", x(d.y) + x.bandwidth() / 2)
                .attr("y", y(tot) - 8)
                .attr("text-anchor", "middle")
                .attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("font-weight", 700)
                .attr("fill", "var(--accent)")
                .text(d3.format(",")(tot))
                .attr("opacity", 0).transition().delay(i * 60 + 600).attr("opacity", 1);
        });
        const ax = g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0).tickFormat(d => d.replace("b", "")));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
        // GCI annotations
        const a1 = g.append("g").attr("transform", `translate(${x("Dec-12") + x.bandwidth() + 20},${20})`);
        a1.append("rect").attr("width", 60).attr("height", 24).attr("rx", 4)
            .attr("fill", "var(--paper)").attr("stroke", "var(--accent)").attr("stroke-width", 1);
        a1.append("text").attr("x", 30).attr("y", 16).attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 700)
            .attr("fill", "var(--accent)").text("1ˢᵗ GCI");
        a1.append("path").attr("d", "M 30 24 L 30 48").attr("stroke", "var(--accent)").attr("stroke-width", 1).attr("stroke-dasharray", "2 2");
        const a2 = g.append("g").attr("transform", `translate(${x("Dec-16") + x.bandwidth() + 20},${20})`);
        a2.append("rect").attr("width", 60).attr("height", 24).attr("rx", 4)
            .attr("fill", "var(--paper)").attr("stroke", "var(--accent)").attr("stroke-width", 1);
        a2.append("text").attr("x", 30).attr("y", 16).attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 700)
            .attr("fill", "var(--accent)").text("2ⁿᵈ GCI");
        a2.append("path").attr("d", "M 30 24 L 30 56").attr("stroke", "var(--accent)").attr("stroke-width", 1).attr("stroke-dasharray", "2 2");
    }, [active]);
    return (_jsxs("div", { className: "s24", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "24 \u00B7 Shareholder support" }), _jsxs("h2", { className: "s17__h-title", children: ["Continuous ", _jsx("span", { className: "thin", children: "shareholder support" })] }), _jsxs("div", { className: "s17__h-meta", children: ["Subscribed capital evolution", _jsx("br", {}), "USD million"] })] }), _jsxs("div", { className: "s24__body", children: [_jsx("div", { className: "s24__chart-wrap", children: _jsx("svg", { ref: ref, className: "s24__chart" }) }), _jsxs("div", { className: "s24__legend", children: [_jsxs("div", { children: [_jsx("span", { className: "s24__sw s24__sw--paid" }), "Paid-in"] }), _jsxs("div", { children: [_jsx("span", { className: "s24__sw s24__sw--ppaid" }), "Pending paid-in"] }), _jsxs("div", { children: [_jsx("span", { className: "s24__sw s24__sw--call" }), "Callable capital"] }), _jsxs("div", { children: [_jsx("span", { className: "s24__sw s24__sw--pcall" }), "Pending callable"] })] })] }), _jsxs("div", { className: "s24__pull", children: [_jsx("strong", { children: "The 2\u207F\u1D48 General Capital Increase (GCI)" }), " finishes integrating pending paid-in capital by 2026."] }), _jsx("footer", { className: "s17__foot", children: "Source \u00B7 Preliminary financial statements as of December 31, 2025." })] }));
}
export default Slide24;
