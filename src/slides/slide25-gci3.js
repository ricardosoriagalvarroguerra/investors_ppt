import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 25 — 3rd GCI Subscribed · 2024–2036 stacks + bullets
   ============================================================ */
// columns: callable existing 2924, paid-in existing (varies), pending paid-in (varies), then 2 new-member layers add up to 532+650 from 2025 onward
const GCI3 = [
    // y, paidExisting, pendingPaid, callableExisting, pendingNew (members), callableNew
    { y: "2024", pE: 1321, pp: 1052, cE: 1665, cn: 0, pn: 0 },
    { y: "2025", pE: 1340, pp: 1044, cE: 2924, cn: 532, pn: 650 },
    { y: "2026", pE: 1349, pp: 940, cE: 2924, cn: 532, pn: 650 },
    { y: "2027", pE: 1453, pp: 835, cE: 2924, cn: 532, pn: 650 },
    { y: "2028", pE: 1557, pp: 731, cE: 2924, cn: 532, pn: 650 },
    { y: "2029", pE: 1662, pp: 625, cE: 2924, cn: 532, pn: 650 },
    { y: "2030", pE: 1766, pp: 522, cE: 2924, cn: 532, pn: 650 },
    { y: "2031", pE: 1871, pp: 418, cE: 2924, cn: 532, pn: 650 },
    { y: "2032", pE: 1975, pp: 313, cE: 2924, cn: 532, pn: 650 },
    { y: "2033", pE: 2079, pp: 209, cE: 2924, cn: 532, pn: 650 },
    { y: "2034", pE: 2184, pp: 104, cE: 2924, cn: 532, pn: 650 },
    { y: "2035", pE: 2288, pp: 0, cE: 2924, cn: 532, pn: 650 },
    { y: "2036", pE: 2393, pp: 0, cE: 2924, cn: 532, pn: 650 },
];
function Slide25({ active }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = 1080, H = 380;
        const m = { top: 30, right: 24, bottom: 30, left: 50 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(GCI3.map(d => d.y)).range([0, iw]).padding(0.28);
        const y = d3.scaleLinear().domain([0, 7000]).range([ih, 0]);
        g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove());
        g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(",")).tickSize(0))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
        const layers = [
            { key: "cE", fill: "var(--chart-5)", dash: false, color: "var(--ink)" },
            { key: "pE", fill: "var(--chart-2)", dash: false, color: "var(--on-accent)" },
            { key: "pp", fill: "var(--chart-4)", dash: true, color: "var(--ink)" },
            { key: "cn", fill: "var(--chart-7)", dash: true, color: "var(--ink)" },
            { key: "pn", fill: "var(--chart-6)", dash: false, color: "var(--on-accent)" },
        ];
        GCI3.forEach((d, i) => {
            let cum = 0;
            layers.forEach((layer, li) => {
                const v = d[layer.key];
                if (!v)
                    return;
                const y0 = y(cum), y1 = y(cum + v);
                g.append("rect")
                    .attr("x", x(d.y)).attr("width", x.bandwidth())
                    .attr("y", ih).attr("height", 0)
                    .attr("fill", layer.fill)
                    .attr("stroke", layer.dash ? "var(--chart-1)" : "none")
                    .attr("stroke-width", layer.dash ? 1 : 0)
                    .attr("stroke-dasharray", layer.dash ? "3 3" : null)
                    .transition().delay(i * 40 + li * 60).duration(420)
                    .attr("y", y1).attr("height", Math.max(0, y0 - y1));
                if (v >= 350) {
                    g.append("text")
                        .attr("x", x(d.y) + x.bandwidth() / 2)
                        .attr("y", (y0 + y1) / 2)
                        .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
                        .attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("font-weight", 600)
                        .attr("fill", layer.color)
                        .text(v >= 1000 ? d3.format(",")(v) : v)
                        .attr("opacity", 0).transition().delay(i * 40 + li * 60 + 400).attr("opacity", 1);
                }
                cum += v;
            });
            const tot = d.pE + d.pp + d.cE + d.cn + d.pn;
            g.append("text")
                .attr("x", x(d.y) + x.bandwidth() / 2)
                .attr("y", y(tot) - 6)
                .attr("text-anchor", "middle")
                .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 700)
                .attr("fill", "var(--accent)")
                .text(d3.format(",")(tot))
                .attr("opacity", 0).transition().delay(i * 40 + 500).attr("opacity", 1);
        });
        const ax = g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
        // 3rd GCI annotation
        const a = g.append("g").attr("transform", `translate(${-30},${ih - 80})`);
        a.append("rect").attr("width", 56).attr("height", 22).attr("rx", 4)
            .attr("fill", "var(--paper)").attr("stroke", "var(--accent)").attr("stroke-width", 1);
        a.append("text").attr("x", 28).attr("y", 15).attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 700)
            .attr("fill", "var(--accent)").text("3ʳᵈ GCI");
        a.append("path").attr("d", `M 56 11 L ${x("2025") - (-30) - 8} 11`)
            .attr("stroke", "var(--accent)").attr("stroke-width", 1).attr("stroke-dasharray", "2 2")
            .attr("marker-end", "url(#s25-arrow)").attr("fill", "none");
        svg.append("defs").append("marker")
            .attr("id", "s25-arrow").attr("viewBox", "0 0 10 10").attr("refX", 8).attr("refY", 5)
            .attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
            .append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", "var(--accent)");
    }, [active]);
    return (_jsxs("div", { className: "s25", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "25 \u00B7 3\u02B3\u1D48 GCI" }), _jsxs("h2", { className: "s17__h-title", children: ["3", _jsx("sup", { children: "rd" }), " GCI ", _jsx("span", { className: "thin", children: "subscribed" })] }), _jsxs("div", { className: "s17__h-meta", children: ["Paid-in contributions begin 2027", _jsx("br", {}), "USD million \u00B7 projection"] })] }), _jsxs("div", { className: "s25__body", children: [_jsx("div", { className: "s25__chart-wrap", children: _jsx("svg", { ref: ref, className: "s25__chart" }) }), _jsxs("div", { className: "s25__legend", children: [_jsxs("div", { children: [_jsx("span", { className: "s25__sw s25__sw--cE" }), "Callable"] }), _jsxs("div", { children: [_jsx("span", { className: "s25__sw s25__sw--pE" }), "Paid-in"] }), _jsxs("div", { children: [_jsx("span", { className: "s25__sw s25__sw--pp" }), "Pending paid-in members"] }), _jsxs("div", { children: [_jsx("span", { className: "s25__sw s25__sw--cn" }), "Pending callable for new members"] }), _jsxs("div", { children: [_jsx("span", { className: "s25__sw s25__sw--pn" }), "Pending paid-in new members"] })] }), _jsxs("ul", { className: "s25__bullets", children: [_jsxs("li", { children: [_jsx("span", { className: "s25__num", children: "i" }), _jsxs("span", { children: ["In ", _jsx("strong", { children: "February 2024" }), ", the Board of Governors approved a ", _jsx("strong", { children: "new General Capital Increase (GCI)" }), ", doubling FONPLATA's authorized capital from ", _jsx("strong", { children: "USD 3.0 bn to USD 6.5 bn" }), " \u2014 enabling future capital subscription, new partners, and a stronger lending capacity."] })] }), _jsxs("li", { children: [_jsx("span", { className: "s25__num", children: "ii" }), _jsxs("span", { children: ["On ", _jsx("strong", { children: "July 31, 2025" }), ", the Board of Governors approved the ", _jsx("strong", { children: "subscribed capital increase" }), ", enabling the inclusion of new members under: ~18.182% of total share capital in ", _jsx("em", { children: "Class B" }), " shares for new member countries; ~81.818% in ", _jsx("em", { children: "Class A" }), " shares for founding member countries."] })] }), _jsxs("li", { children: [_jsx("span", { className: "s25__num", children: "iii" }), _jsxs("span", { children: ["Integration of the 3\u02B3\u1D48 GCI paid-in capital will ", _jsx("strong", { children: "begin in 2027 and complete by 2036" }), "."] })] })] })] }), _jsx("footer", { className: "s17__foot", children: "Source \u00B7 Preliminary financial statements as of December 31, 2025." })] }));
}
export default Slide25;
