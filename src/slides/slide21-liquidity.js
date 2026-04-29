import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 21 — Strengthened Liquidity Position · 3 donuts + table + trend
   ============================================================ */
const LIQ_RATING = [
    { k: "AA+/Aa1", v: 24, color: "var(--chart-6)" },
    { k: "A+/A1", v: 21, color: "var(--chart-2)" },
    { k: "BBB+/Baa1/BBB-", v: 5, color: "var(--chart-3)" },
    { k: "AAA", v: 50, color: "var(--chart-5)" },
];
const LIQ_ISSUER = [
    { k: "Financial", v: 20, color: "var(--chart-6)" },
    { k: "Supranational", v: 40, color: "var(--chart-2)" },
    { k: "Sovereign", v: 40, color: "var(--chart-5)" },
];
const LIQ_ASSET = [
    { k: "On-demand deposits", v: 0.5, color: "var(--chart-6)" },
    { k: "Fixed Income ETFs", v: 3.5, color: "var(--chart-7)" },
    { k: "CDs · ECPs · T-bills", v: 25, color: "var(--chart-2)" },
    { k: "Bonds", v: 71, color: "var(--chart-5)" },
];
const LIQ_TREND = [
    { y: "2021", la: 633, ta: 36, gd: 29 },
    { y: "2022", la: 556, ta: 25, gd: 25 },
    { y: "2023", la: 731, ta: 37, gd: 25 },
    { y: "2024", la: 768, ta: 34, gd: 25 },
    { y: "2025", la: 1457, ta: 67, gd: 36 },
];
function MiniDonut({ data, title, active, idx }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        const W = 220, H = 220, R = 94, r = 54;
        svg.attr("viewBox", `0 0 ${W} ${H}`);
        const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);
        const pie = d3.pie().sort(null).value(d => d.v);
        const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
        const arcs = pie(data);
        g.selectAll("path").data(arcs).join("path")
            .attr("fill", d => d.data.color)
            .attr("opacity", 0)
            .transition().delay((_, i) => idx * 200 + i * 80).duration(500).attr("opacity", 1)
            .attrTween("d", function (d) {
            const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
            return t => arc(i(t));
        });
    }, [active, idx]);
    return (_jsxs("div", { className: "s21__donut", children: [_jsx("div", { className: "s21__donut-title", children: title }), _jsx("svg", { ref: ref, className: "s21__donut-svg" }), _jsx("div", { className: "s21__donut-legend", children: data.map((d, i) => (_jsxs("div", { children: [_jsx("span", { className: "s21__sw", style: { background: d.color } }), _jsx("span", { className: "s21__sw-lab", children: d.k }), _jsxs("span", { className: "s21__sw-val", children: [d.v, "%"] })] }, i))) })] }));
}
function Slide21({ active }) {
    const trendRef = useRef(null);
    useEffect(() => {
        if (!trendRef.current)
            return;
        const svg = d3.select(trendRef.current);
        svg.selectAll("*").remove();
        const W = 540, H = 220;
        const m = { top: 24, right: 40, bottom: 28, left: 40 };
        const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
        const x = d3.scaleBand().domain(LIQ_TREND.map(d => d.y)).range([0, iw]).padding(0.45);
        const yL = d3.scaleLinear().domain([0, 1600]).range([ih, 0]);
        const yR = d3.scaleLinear().domain([0, 80]).range([ih, 0]);
        // area + bars for LA
        g.selectAll("rect").data(LIQ_TREND).join("rect")
            .attr("x", d => x(d.y)).attr("width", x.bandwidth())
            .attr("y", ih).attr("height", 0)
            .attr("fill", "var(--chart-5)")
            .transition().delay((_, i) => i * 100).duration(500)
            .attr("y", d => yL(d.la)).attr("height", d => ih - yL(d.la));
        // labels above bars
        g.selectAll("text.la").data(LIQ_TREND).join("text")
            .attr("class", "la")
            .attr("x", d => x(d.y) + x.bandwidth() / 2)
            .attr("y", d => yL(d.la) - 6)
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 600)
            .attr("fill", "var(--ink)")
            .text(d => d3.format(",")(d.la))
            .attr("opacity", 0).transition().delay((_, i) => i * 100 + 400).attr("opacity", 1);
        // ratio lines (LA/TA, LA/GD)
        [
            { key: "ta", color: "var(--chart-3)", off: -1 },
            { key: "gd", color: "var(--chart-6)", off: 1 },
        ].forEach(({ key, color, off }, k) => {
            const ln = d3.line()
                .x(d => x(d.y) + x.bandwidth() / 2)
                .y(d => yR(d[key]))
                .curve(d3.curveMonotoneX);
            const path = g.append("path").datum(LIQ_TREND).attr("d", ln)
                .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.5)
                .attr("stroke-dasharray", function () { return this.getTotalLength(); })
                .attr("stroke-dashoffset", function () { return this.getTotalLength(); });
            path.transition().delay(700 + k * 200).duration(700).attr("stroke-dashoffset", 0);
            g.selectAll(`circle.c${k}`).data(LIQ_TREND).join("circle")
                .attr("class", `c${k}`)
                .attr("cx", d => x(d.y) + x.bandwidth() / 2)
                .attr("cy", d => yR(d[key]))
                .attr("r", 0).attr("fill", "var(--paper)").attr("stroke", color).attr("stroke-width", 1.5)
                .transition().delay((_, i) => 1100 + k * 200 + i * 60).duration(200).attr("r", 3);
            g.selectAll(`text.l${k}`).data(LIQ_TREND).join("text")
                .attr("class", `l${k}`)
                .attr("x", d => x(d.y) + x.bandwidth() / 2 + 10)
                .attr("y", d => yR(d[key]) + (key === "ta" ? -16 : 18))
                .attr("text-anchor", "start")
                .attr("font-family", "var(--font-mono)").attr("font-size", 9.5)
                .attr("fill", color).attr("font-weight", 600)
                .text(d => d[key] + "%")
                .attr("opacity", 0).transition().delay(1400 + k * 200).attr("opacity", 1);
        });
        const ax = g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
    }, [active]);
    return (_jsxs("div", { className: "s21", children: [_jsxs("header", { className: "s17__head", children: [_jsx("div", { className: "s17__h-num", children: "21 \u00B7 Liquidity" }), _jsxs("h2", { className: "s17__h-title", children: ["USD ", _jsx("span", { className: "thin", children: "1bn" }), " AUM reached"] }), _jsxs("div", { className: "s17__h-meta", children: ["A strengthened liquidity position", _jsx("br", {}), "Short-term, high-rated"] })] }), _jsxs("div", { className: "s21__body", children: [_jsxs("section", { className: "s21__top", children: [_jsx("div", { className: "s21__top-eye", children: "Liquidity portfolio \u00B7 by rating, type of issuer, and asset class" }), _jsxs("div", { className: "s21__donuts", children: [_jsx(MiniDonut, { data: LIQ_RATING, title: "By rating", active: active, idx: 0 }), _jsx(MiniDonut, { data: LIQ_ISSUER, title: "By issuer type", active: active, idx: 1 }), _jsx(MiniDonut, { data: LIQ_ASSET, title: "By asset class", active: active, idx: 2 })] })] }), _jsxs("section", { className: "s21__bot", children: [_jsxs("div", { className: "s21__policy", children: [_jsx("div", { className: "s21__policy-eye", children: "Policy limits & liquidity trend" }), _jsxs("table", { className: "s21__table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Real" }), _jsx("th", { children: "Policy limit" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { className: "num", children: ">19 months" }), _jsx("td", { children: "12 months coverage of net cash requirements" })] }), _jsxs("tr", { children: [_jsx("td", { className: "num", children: "1.44 years" }), _jsx("td", { children: "2 years maximum liquidity portfolio duration" })] }), _jsxs("tr", { children: [_jsx("td", { className: "num", children: "AA(*)" }), _jsx("td", { children: "AA \u00B7 minimum average rating" })] }), _jsxs("tr", { children: [_jsx("td", { className: "num", children: "BBB" }), _jsx("td", { children: "BBB \u00B7 minimum rating for purchase" })] })] })] })] }), _jsxs("div", { className: "s21__trend", children: [_jsxs("div", { className: "s21__trend-head", children: [_jsx("div", { className: "s21__trend-eye", children: "Liquidity trend \u00B7 USD M" }), _jsxs("div", { className: "s21__trend-legend", children: [_jsxs("span", { children: [_jsx("span", { className: "s21__lg s21__lg--bar" }), "Liquid Assets (LA)"] }), _jsxs("span", { children: [_jsx("span", { className: "s21__lg s21__lg--ln1" }), "LA / Total Assets %"] }), _jsxs("span", { children: [_jsx("span", { className: "s21__lg s21__lg--ln2" }), "LA / Gross Debt %"] })] })] }), _jsx("svg", { ref: trendRef, className: "s21__trend-svg" })] })] })] }), _jsx("footer", { className: "s17__foot", children: "(*) Applies the lowest rating available within S&P and Moody's. Source \u00B7 FONPLATA, as of December 31, 2025." })] }));
}
export default Slide21;
