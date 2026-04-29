import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 13 — A Sustainable Bank
   ============================================================ */
const SDG_DATA = [
    { n: 1, name: "No Poverty", v: 17 },
    { n: 2, name: "Zero Hunger", v: 4 },
    { n: 3, name: "Good Health & Well-being", v: 10 },
    { n: 4, name: "Quality Education", v: 4 },
    { n: 5, name: "Gender Equality", v: 20 },
    { n: 6, name: "Clean Water & Sanitation", v: 17 },
    { n: 7, name: "Affordable & Clean Energy", v: 5 },
    { n: 8, name: "Decent Work & Economic Growth", v: 25 },
    { n: 9, name: "Industry, Innovation, Infrastructure", v: 45 },
    { n: 10, name: "Reduced Inequalities", v: 27 },
    { n: 11, name: "Sustainable Cities & Communities", v: 50 },
    { n: 12, name: "Responsible Consumption", v: 3 },
    { n: 13, name: "Climate Action", v: 18 },
    { n: 14, name: "Life Below Water", v: 1 },
    { n: 15, name: "Life on Land", v: 4 },
    { n: 16, name: "Peace & Justice", v: 2 },
    { n: 17, name: "Partnerships", v: 7 },
];
const TOP_SDGS = [8, 9, 10, 11];
const SUST_PILLARS = [
    { eyebrow: "Strategy", text: "Aligning its Institutional Strategic Plan (2022–2028) with the Paris Agreement and the 2030 Agenda based on Sustainable Development Goals." },
    { eyebrow: "Policy", text: "Environmental and Social Policy based on international standards and best practices." },
    { eyebrow: "Facilities", text: "Green, Gender, and Youth facilities to promote member countries to implement environmental components and gender equality." },
    { eyebrow: "Framework", text: "A Sustainable Debt Framework, under which the Bank intends to issue Sustainable Financing Instruments to finance and refinance projects." },
];
function Slide13({ active }) {
    const chartRef = useRef(null);
    const [hover, setHover] = useState(null);
    useEffect(() => {
        if (!chartRef.current)
            return;
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        const W = 560, H = 240;
        const margin = { top: 20, right: 8, bottom: 40, left: 28 };
        const iw = W - margin.left - margin.right;
        const ih = H - margin.top - margin.bottom;
        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        const x = d3.scaleBand().domain(SDG_DATA.map(d => d.n)).range([0, iw]).padding(0.32);
        const y = d3.scaleLinear().domain([0, d3.max(SDG_DATA, d => d.v) * 1.1]).range([ih, 0]);
        // y gridlines
        g.append("g").call(d3.axisLeft(y).ticks(4).tickSize(-iw).tickFormat(""))
            .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
            .call(s => s.selectAll("path").remove())
            .call(s => s.selectAll("text").remove());
        g.selectAll("rect.bar").data(SDG_DATA).join("rect")
            .attr("class", d => "bar" + (TOP_SDGS.includes(d.n) ? " top" : ""))
            .attr("x", d => x(d.n))
            .attr("width", x.bandwidth())
            .attr("y", ih)
            .attr("height", 0)
            .attr("fill", d => TOP_SDGS.includes(d.n) ? "var(--accent)" : "var(--ink-4)")
            .attr("opacity", d => TOP_SDGS.includes(d.n) ? 1 : 0.55)
            .style("cursor", "pointer")
            .on("mouseenter", (_, d) => setHover(d.n))
            .on("mouseleave", () => setHover(null))
            .transition().delay((_, i) => i * 30).duration(500)
            .attr("y", d => y(d.v))
            .attr("height", d => ih - y(d.v));
        // value labels
        g.selectAll("text.val").data(SDG_DATA).join("text")
            .attr("class", "val")
            .attr("x", d => x(d.n) + x.bandwidth() / 2)
            .attr("y", d => y(d.v) - 6)
            .attr("text-anchor", "middle")
            .attr("font-family", "var(--font-mono)")
            .attr("font-size", 9.5).attr("font-weight", 600)
            .attr("fill", d => TOP_SDGS.includes(d.n) ? "var(--accent)" : "var(--ink-2)")
            .attr("opacity", 0)
            .text(d => d.v)
            .transition().delay((_, i) => i * 30 + 400).duration(300).attr("opacity", 1);
        // x-axis
        const ax = g.append("g").attr("transform", `translate(0,${ih})`)
            .call(d3.axisBottom(x).tickFormat(d => "SDG " + d).tickSize(0));
        ax.select("path").attr("stroke", "var(--rule-strong)");
        ax.selectAll("text")
            .attr("font-family", "var(--font-mono)")
            .attr("font-size", 8.5)
            .attr("fill", "var(--ink-3)")
            .attr("dy", "1em")
            .attr("transform", "rotate(-30)")
            .style("text-anchor", "end");
    }, [active]);
    return (_jsxs("div", { className: "s13", children: [_jsxs("header", { className: "s13__head", children: [_jsx("div", { className: "s13__h-num", children: "13 \u00B7 Sustainability" }), _jsxs("h2", { className: "s13__h-title", children: ["A Sustainable ", _jsx("span", { className: "thin", children: "Bank" })] }), _jsxs("div", { className: "s13__h-meta", children: ["Responsible investing for present", _jsx("br", {}), "and future generations"] })] }), _jsxs("div", { className: "s13__body", children: [_jsx("section", { className: "s13__pillars", children: SUST_PILLARS.map((p, i) => (_jsxs("article", { className: "s13__pillar", children: [_jsxs("div", { className: "s13__pillar-head", children: [_jsx("span", { className: "s13__pillar-num", children: String(i + 1).padStart(2, "0") }), _jsx("span", { className: "s13__pillar-eye", children: p.eyebrow })] }), _jsx("p", { className: "s13__pillar-text", children: p.text })] }, i))) }), _jsxs("section", { className: "s13__chart-panel", children: [_jsx("div", { className: "s13__chart-eye", children: "Loan Portfolio by SDG \u00B7 # of Projects" }), _jsxs("div", { className: "s13__top-row", children: [_jsx("div", { className: "s13__top-eye", children: "Most active SDGs" }), _jsx("div", { className: "s13__top-grid", children: TOP_SDGS.map(n => {
                                            const d = SDG_DATA.find(s => s.n === n);
                                            return (_jsxs("div", { className: "s13__top-card " + (hover === n ? "is-hover" : ""), onMouseEnter: () => setHover(n), onMouseLeave: () => setHover(null), children: [_jsx("div", { className: "s13__top-num", children: n }), _jsx("div", { className: "s13__top-name", children: d.name }), _jsxs("div", { className: "s13__top-val", children: [d.v, _jsx("span", { children: "projects" })] })] }, n));
                                        }) })] }), _jsx("svg", { ref: chartRef, className: "s13__chart" }), _jsx("div", { className: "s13__chart-foot", children: "Preliminary data as of December 31, 2024." })] })] }), _jsx("footer", { className: "s13__foot", children: "FONPLATA plays a vital role in supporting countries' efforts to achieve the SDGs through financing and assistance for projects and programs in the public sector." })] }));
}
export default Slide13;
