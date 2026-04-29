import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3 = _d3;
/* ============================================================
   Slide 19 — Diversified Loan Portfolio · country donut + sector stack
   ============================================================ */
const COUNTRY_MIX = [
    { iso: "ARG", name: "Argentina", rating: "CCC / Caa1", share: 35 },
    { iso: "BOL", name: "Bolivia", rating: "CCC- / Caa3", share: 17 },
    { iso: "BRA", name: "Brazil", rating: "BB / Ba2", share: 5 },
    { iso: "PRY", name: "Paraguay", rating: "BBB- / Baa3", share: 17 },
    { iso: "URY", name: "Uruguay", rating: "BBB+ / Baa1", share: 23 },
    { iso: "NSG", name: "NSG", rating: "BB / Ba3", share: 3 },
];
const SECTOR_MIX = [
    { key: "infra", label: "Infrastructure", value: 1762, share: 68 },
    { key: "soc", label: "Social", value: 622, share: 24 },
    { key: "prod", label: "Productive", value: 207, share: 8 },
];
const SECTOR_TOTAL = 2591;
const POLICIES = [
    { num: "25%", lab: "Lending Capacity", desc: "Maximum exposure to a single member country" },
    { num: "30%", lab: "Total Assets", desc: "Maximum exposure to a single member country" },
];
function Slide19({ active }) {
    const donutRef = useRef(null);
    const [hov, setHov] = useState(null);
    useEffect(() => {
        if (!donutRef.current)
            return;
        const svg = d3.select(donutRef.current);
        svg.selectAll("*").remove();
        const W = 280, H = 280, R = 130, r = 76;
        svg.attr("viewBox", `0 0 ${W} ${H}`);
        const g = svg.append("g").attr("transform", `translate(${W / 2},${H / 2})`);
        const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.014);
        const arcOver = d3.arc().innerRadius(r - 4).outerRadius(R + 4).cornerRadius(2).padAngle(0.014);
        const pie = d3.pie().sort(null).value(d => d.share);
        const arcs = pie(COUNTRY_MIX);
        const colors = COUNTRY_MIX.map((_, i) => {
            const stops = [
                "var(--chart-6)",
                "var(--chart-2)",
                "var(--chart-3)",
                "var(--chart-4)",
                "var(--chart-7)",
                "var(--chart-5)",
            ];
            return stops[i % stops.length];
        });
        const paths = g.selectAll("path").data(arcs).join("path")
            .attr("fill", (_, i) => colors[i])
            .attr("opacity", 0)
            .style("cursor", "pointer")
            .on("mouseenter", function (_, d) {
            setHov(d.data.iso);
            d3.select(this).transition().duration(150).attr("d", arcOver);
        })
            .on("mouseleave", function () {
            setHov(null);
            d3.select(this).transition().duration(150).attr("d", arc);
        });
        paths.attr("d", arc).transition().delay((_, i) => 100 + i * 70).duration(450).attr("opacity", 1);
        g.append("text").attr("text-anchor", "middle").attr("y", -8)
            .attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("letter-spacing", "0.16em")
            .attr("fill", "var(--ink-3)").text("AVERAGE RATING");
        g.append("text").attr("text-anchor", "middle").attr("y", 16)
            .attr("font-size", 26).attr("font-weight", 700).attr("letter-spacing", "-0.02em")
            .attr("fill", "var(--accent)").text("B+");
        g.append("text").attr("text-anchor", "middle").attr("y", 36)
            .attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("fill", "var(--ink-3)")
            .text("S&P · weighted by exposure");
    }, [active]);
    return (_jsxs("div", { className: "s19", children: [_jsxs("header", { className: "s19__head", children: [_jsx("div", { className: "s19__h-num", children: "19 \u00B7 Diversification" }), _jsxs("h2", { className: "s19__h-title", children: ["Diversified Loan ", _jsx("span", { className: "thin", children: "Portfolio" })] }), _jsxs("div", { className: "s19__h-meta", children: ["% over Gross Loan Portfolio Outstanding", _jsx("br", {}), "USD million \u00B7 Dec 2025"] })] }), _jsxs("div", { className: "s19__body", children: [_jsxs("section", { className: "s19__panel", children: [_jsx("div", { className: "s19__panel-eye", children: "By Member Country" }), _jsxs("div", { className: "s19__country-row", children: [_jsx("svg", { ref: donutRef, className: "s19__donut" }), _jsx("div", { className: "s19__country-list", children: COUNTRY_MIX.map(c => (_jsxs("div", { className: "s19__country " + (hov === c.iso ? "is-hover" : ""), onMouseEnter: () => setHov(c.iso), onMouseLeave: () => setHov(null), children: [_jsx("span", { className: "s19__country-iso", children: c.iso }), _jsxs("span", { className: "s19__country-name", children: [_jsx("span", { children: c.name }), _jsx("span", { className: "s19__country-rating", children: c.rating })] }), _jsxs("span", { className: "s19__country-share", children: [c.share, "%"] })] }, c.iso))) })] })] }), _jsxs("section", { className: "s19__panel", children: [_jsx("div", { className: "s19__panel-eye", children: "By Sector" }), _jsxs("div", { className: "s19__sector-row", children: [_jsxs("div", { className: "s19__sector-stack", children: [_jsxs("div", { className: "s19__sector-total", children: ["USD ", SECTOR_TOTAL.toLocaleString()] }), _jsx("div", { className: "s19__sector-bar", children: SECTOR_MIX.map((s, i) => (_jsx("div", { className: "s19__sector-seg s19__sector-seg--" + i, style: { height: `${s.share}%` }, children: _jsxs("span", { children: [s.share, "%"] }) }, s.key))) }), _jsx("div", { className: "s19__sector-axis", children: "Dec 2025" })] }), _jsx("div", { className: "s19__sector-list", children: SECTOR_MIX.map((s, i) => (_jsxs("div", { className: "s19__sector-row-item", children: [_jsx("span", { className: "s19__sector-swatch s19__sector-swatch--" + i }), _jsx("span", { className: "s19__sector-name", children: s.label }), _jsxs("span", { className: "s19__sector-val", children: ["USD ", s.value.toLocaleString(), "M"] }), _jsxs("span", { className: "s19__sector-share", children: [s.share, "%"] })] }, s.key))) })] })] })] }), _jsxs("section", { className: "s19__policies", children: [_jsx("div", { className: "s19__policies-eye", children: "Sovereign Guaranteed Loans \u00B7 Concentration Limits" }), _jsxs("div", { className: "s19__policies-row", children: [POLICIES.map((p, i) => (_jsxs("div", { className: "s19__policy", children: [_jsx("div", { className: "s19__policy-num", children: p.num }), _jsxs("div", { className: "s19__policy-body", children: [_jsx("div", { className: "s19__policy-lab", children: p.lab }), _jsx("div", { className: "s19__policy-desc", children: p.desc })] })] }, i))), _jsx("div", { className: "s19__policy-note", children: "FONPLATA's prudent Financial Policies include maximum country exposure thresholds." })] })] }), _jsx("footer", { className: "s19__foot", children: "Note \u00B7 S&P and Moody's credit ratings, respectively. Source: Preliminary financial statements as of December 31, 2025." })] }));
}
export default Slide19;
