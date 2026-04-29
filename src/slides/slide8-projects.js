import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
import * as _topojson from "topojson-client";
import { CountUp } from "../lib";
const d3 = _d3;
const topojson = _topojson;
function idToISO3(id) {
    const M = {
        "032": "ARG", "068": "BOL", "076": "BRA", "600": "PRY", "858": "URY",
    };
    const padded = String(id).padStart(3, "0");
    return M[padded] || null;
}
/* ============================================================
   Slide 8 — Projects' Snapshot · interactive map + project cards
   ============================================================ */
const PROJECTS = [
    {
        id: "emp",
        title: "Program for Employment",
        country: "AR",
        iso3: "ARG",
        pin: { lon: -64.0, lat: -34.5 },
        beneficiaries: 18000,
        benUnit: "persons",
        contribution: 100,
        sdgs: ["1", "8", "10"],
        sdgLabels: ["No Poverty", "Decent Work", "Reduced Inequalities"],
    },
    {
        id: "vila",
        title: "Urban Restructuring · Vila Velha",
        country: "BR",
        iso3: "BRA",
        pin: { lon: -40.3, lat: -20.3 },
        beneficiaries: 1687704,
        benUnit: "persons",
        contribution: 34,
        sdgs: ["6", "11"],
        sdgLabels: ["Clean Water", "Sustainable Cities"],
    },
    {
        id: "bio",
        title: "Regional Bioceanic Highway",
        country: "PY",
        iso3: "PRY",
        pin: { lon: -60.5, lat: -22.5 },
        beneficiaries: 1000,
        benUnit: "km of road",
        contribution: 354,
        sdgs: ["9", "11", "17"],
        sdgLabels: ["Industry & Infrastructure", "Sustainable Cities", "Partnerships"],
    },
    {
        id: "water",
        title: "Drinking Water · Maldonado",
        country: "UY",
        iso3: "URY",
        pin: { lon: -54.95, lat: -34.91 },
        beneficiaries: 204000,
        benUnit: "persons",
        contribution: 13,
        sdgs: ["3", "6", "11"],
        sdgLabels: ["Good Health", "Clean Water", "Sustainable Cities"],
    },
    {
        id: "food",
        title: "Food Security Support",
        country: "AR",
        iso3: "ARG",
        pin: { lon: -65.0, lat: -27.0 },
        beneficiaries: 3770034,
        benUnit: "persons",
        contribution: 200,
        sdgs: ["1", "2", "10"],
        sdgLabels: ["No Poverty", "Zero Hunger", "Reduced Inequalities"],
    },
];
function fmtBen(n) {
    if (n >= 1000000)
        return (n / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1000)
        return (n / 1000).toFixed(0) + "k";
    return String(n);
}
function Slide8({ active }) {
    const wrapRef = useRef(null);
    const svgRef = useRef(null);
    const [topo, setTopo] = useState(null);
    const [size, setSize] = useState({ w: 800, h: 600 });
    const [sel, setSel] = useState(0);
    useEffect(() => {
        if (topo)
            return;
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
            .then(r => r.json()).then(setTopo).catch(() => { });
    }, [topo]);
    useEffect(() => {
        if (!wrapRef.current)
            return;
        const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
        ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, []);
    useEffect(() => {
        if (!topo || !svgRef.current || size.w < 50)
            return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const { w, h } = size;
        const all = topojson.feature(topo, topo.objects.countries).features;
        const filtered = all.filter(f => {
            const c = d3.geoCentroid(f);
            return c[0] > -82 && c[0] < -33 && c[1] > -56 && c[1] < 13;
        });
        const proj = d3.geoMercator().fitExtent([[28, 28], [w - 28, h - 28]], { type: "FeatureCollection", features: filtered });
        const path = d3.geoPath(proj);
        const isMember = iso3 => ["ARG", "BOL", "BRA", "PRY", "URY"].includes(iso3);
        svg.append("g").selectAll("path").data(filtered).join("path")
            .attr("d", path)
            .attr("fill", d => isMember(idToISO3(d.id)) ? "var(--paper-3)" : "color-mix(in oklab, var(--paper-3), var(--paper-2) 60%)")
            .attr("stroke", "var(--paper)").attr("stroke-width", 1.2);
        // pins
        PROJECTS.forEach((p, i) => {
            const [x, y] = proj([p.pin.lon, p.pin.lat]);
            const g = svg.append("g")
                .attr("class", "pin")
                .attr("data-pin-index", i)
                .attr("transform", `translate(${x},${y})`)
                .style("cursor", "pointer")
                .on("click", () => setSel(i))
                .on("mouseenter", () => setSel(i));
            const isSel = i === sel;
            g.append("circle").attr("class", "pin-halo").attr("r", 0).attr("fill", "var(--accent)").attr("opacity", 0.18)
                .transition().delay(200 + i * 60).duration(400).attr("r", isSel ? 24 : 14);
            g.append("circle").attr("class", "pin-core").attr("r", 0).attr("fill", "var(--accent)").attr("stroke", "var(--on-accent)").attr("stroke-width", 2)
                .transition().delay(200 + i * 60).duration(400).attr("r", isSel ? 8 : 5);
            g.append("text")
                .attr("class", "pin-label")
                .attr("y", -14).attr("text-anchor", "middle")
                .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 600)
                .attr("fill", "var(--ink)").attr("opacity", isSel ? 1 : 0)
                .text(`USD ${p.contribution}M`);
        });
    }, [topo, size]);
    useEffect(() => {
        if (!svgRef.current)
            return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("g.pin").each(function (_, i) {
            const isSel = i === sel;
            const g = d3.select(this);
            g.select(".pin-halo").interrupt().transition().duration(180).attr("r", isSel ? 24 : 14);
            g.select(".pin-core").interrupt().transition().duration(180).attr("r", isSel ? 8 : 5);
            g.select(".pin-label").interrupt().transition().duration(140).attr("opacity", isSel ? 1 : 0);
        });
    }, [sel]);
    const p = PROJECTS[sel];
    return (_jsxs("div", { className: "s8", children: [_jsxs("header", { className: "s8__head", children: [_jsx("div", { className: "s8__h-num", children: "08 \u00B7 Portfolio" }), _jsxs("h2", { className: "s8__h-title", children: ["Projects' ", _jsx("span", { className: "thin", children: "Snapshot" })] }), _jsx("div", { className: "s8__h-meta", children: "5 representative operations \u00B7 4 member countries" })] }), _jsxs("div", { className: "s8__body", children: [_jsxs("aside", { className: "s8__list", children: [_jsx("div", { className: "s8__list-eye", children: "Operations" }), PROJECTS.map((pr, i) => (_jsxs("button", { className: "s8__row " + (i === sel ? "is-active" : ""), onMouseEnter: () => setSel(i), onClick: () => setSel(i), children: [_jsx("span", { className: "s8__row-n", children: String(i + 1).padStart(2, "0") }), _jsxs("span", { className: "s8__row-body", children: [_jsx("span", { className: "s8__row-title", children: pr.title }), _jsxs("span", { className: "s8__row-meta", children: [pr.iso3, " \u00B7 USD ", pr.contribution, "M"] })] }), _jsx("span", { className: "s8__row-arrow", children: "\u2192" })] }, pr.id)))] }), _jsxs("div", { className: "s8__map", ref: wrapRef, children: [_jsx("svg", { ref: svgRef, viewBox: `0 0 ${size.w} ${size.h}`, preserveAspectRatio: "xMidYMid meet" }), _jsx("div", { className: "s8__map-eye", children: "Click a pin or list item to inspect" })] }), _jsxs("aside", { className: "s8__detail", children: [_jsxs("div", { className: "s8__detail-eye", children: ["Project \u00B7 ", p.iso3] }), _jsx("h3", { className: "s8__detail-title", children: p.title }), _jsxs("div", { className: "s8__metrics", children: [_jsxs("div", { className: "s8__metric", children: [_jsxs("div", { className: "s8__metric-num", children: [_jsx(CountUp, { to: p.contribution, duration: 900, play: active }), _jsx("span", { className: "s8__metric-unit", children: "M" })] }), _jsx("div", { className: "s8__metric-lab", children: "FONPLATA contribution \u00B7 USD" })] }), _jsxs("div", { className: "s8__metric", children: [_jsx("div", { className: "s8__metric-num", children: fmtBen(p.beneficiaries) }), _jsxs("div", { className: "s8__metric-lab", children: ["Direct ", p.benUnit] })] })] }), _jsx("div", { className: "s8__sdg-eye", children: "SDGs addressed" }), _jsx("div", { className: "s8__sdg-grid", children: p.sdgs.map((n, i) => (_jsxs("div", { className: "s8__sdg", children: [_jsx("div", { className: "s8__sdg-num", children: n }), _jsx("div", { className: "s8__sdg-label", children: p.sdgLabels[i] })] }, n))) }), _jsxs("div", { className: "s8__detail-foot", children: [_jsx("span", { children: "Sovereign-guaranteed" }), _jsx("span", { children: "Public Sector" })] })] })] })] }));
}
export default Slide8;
