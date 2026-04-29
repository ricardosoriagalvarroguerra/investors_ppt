import { useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 29 — MTN spreads + region donut + redemption profile
   ============================================================ */

const MTN_POINTS = [
  { id: "MTN 1",  t: 3.0,  s: 130, r: 10, dx: 16,  dy: -14 },
  { id: "MTN 9",  t: 3.0,  s: 112, r: 7,  dx: 14,  dy: 2 },
  { id: "MTN 3",  t: 5.0,  s: 145, r: 11, dx: -78, dy: -2 },
  { id: "MTN 2",  t: 5.1,  s: 144, r: 11, dx: 8,   dy: -22 },
  { id: "MTN 6",  t: 4.95, s: 135, r: 11, dx: -50, dy: 20 },
  { id: "MTN 7",  t: 5.10, s: 132, r: 11, dx: -26, dy: 28 },
  { id: "MTN 4.1",t: 5.45, s: 128, r: 12, dx: -2,  dy: -16 },
  { id: "MTN 10", t: 5.55, s: 130, r: 12, dx: 12,  dy: 2 },
  { id: "MTN 11", t: 5.65, s: 126, r: 12, dx: 8,   dy: 26 },
  { id: "MTN 4.2",t: 7.00, s: 145, r: 11, dx: 22,  dy: 2 },
  { id: "MTN 5",  t: 10.0, s: 167, r: 11, dx: 28,  dy: -6 },
  { id: "MTN 8.2",t: 15.0, s: 179, r: 10, dx: -86, dy: -6 },
  { id: "MTN 8.1",t: 15.05,s: 177, r: 10, dx: -12, dy: 34 },
];

const MTN_TREND = [
  { t: 2.9, s: 140 },
  { t: 5.0, s: 151 },
  { t: 9.2, s: 172 },
  { t: 12.8, s: 184 },
  { t: 15.2, s: 192 },
];

const REDEMP = [
  { y: 2026, b: 308 }, { y: 2027, b: 305 }, { y: 2028, b: 308 }, { y: 2029, b: 280 },
  { y: 2030, b: 240 }, { y: 2031, b: 100 }, { y: 2032, b: 50 },  { y: 2033, b: 30 },
  { y: 2034, b: 22 },  { y: 2035, b: 18 },  { y: 2036, b: 14 },  { y: 2037, b: 8 },
  { y: 2038, b: 5 },   { y: 2039, b: 4 },   { y: 2040, b: 60 },  { y: 2041, b: 0 },
  { y: 2042, b: 0 },   { y: 2043, b: 0 },   { y: 2044, b: 0 },   { y: 2045, b: 0 }, { y: 2046, b: 0 },
];

const REGION = [
  { k: "Asia",   v: 61, color: "var(--chart-6)" },
  { k: "Europe", v: 39, color: "var(--chart-7)" },
];

function Slide29({ active }) {
  const scatterRef = useRef(null);
  const donutRef   = useRef(null);
  const redempRef  = useRef(null);

  useEffect(() => {
    if (!scatterRef.current) return;
    const svg = d3.select(scatterRef.current);
    svg.selectAll("*").remove();
    const W = 760, H = 320;
    const m = { top: 18, right: 34, bottom: 44, left: 56 };
    const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain([2, 16]).range([0, iw]);
    const y = d3.scaleLinear().domain([100, 190]).range([ih, 0]);

    g.append("g").call(d3.axisLeft(y).tickValues(d3.range(100, 191, 10)).tickSize(-iw).tickFormat(""))
      .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3").attr("opacity", 0.45))
      .call(s => s.selectAll("path").remove());
    g.append("g").attr("transform", `translate(0,${ih})`)
      .call(d3.axisBottom(x).tickValues(d3.range(2, 17, 2)).tickSize(0))
      .call(s => s.selectAll("path").attr("stroke", "var(--rule-strong)"))
      .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("fill", "var(--ink-3)"));
    g.append("g").call(d3.axisLeft(y).tickValues(d3.range(100, 191, 10)).tickSize(0))
      .call(s => s.selectAll("path").remove())
      .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("fill", "var(--ink-3)"));

    g.append("text").attr("x", iw / 2).attr("y", ih + 28).attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)").attr("font-size", 12).attr("fill", "var(--ink-2)").text("Term (years)");
    g.append("text").attr("transform", "rotate(-90)").attr("x", -ih / 2).attr("y", -42).attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)").attr("font-size", 12).attr("fill", "var(--ink-2)").text("Spread over SOFR (in bps)");

    // Visual guide from the reference chart.
    const fit = d3.line().curve(d3.curveBasis)
      .x(d => x(d.t)).y(d => y(d.s));
    g.append("path").datum(MTN_TREND)
      .attr("d", fit).attr("fill", "none")
      .attr("stroke", "var(--chart-6)").attr("stroke-width", 2.4).attr("stroke-dasharray", "7 6")
      .attr("opacity", 0).transition().delay(250).duration(500).attr("opacity", 0.72);

    // dots
    g.selectAll("circle").data(MTN_POINTS).join("circle")
      .attr("cx", d => x(d.t)).attr("cy", d => y(d.s))
      .attr("r", 0).attr("fill", "var(--paper-4)").attr("fill-opacity", 0.88)
      .attr("stroke", "var(--chart-6)").attr("stroke-width", 2.4)
      .transition().delay((_, i) => i * 45).duration(260).attr("r", d => d.r);

    g.selectAll("text.lbl").data(MTN_POINTS).join("text")
      .attr("class", "lbl")
      .attr("x", d => x(d.t) + d.dx).attr("y", d => y(d.s) + d.dy)
      .attr("font-family", "var(--font-sans)").attr("font-size", 12).attr("font-style", "italic").attr("font-weight", 700).attr("fill", "var(--ink)")
      .text(d => d.id)
      .attr("opacity", 0).transition().delay((_, i) => 800 + i * 30).attr("opacity", 1);
  }, [active]);

  useEffect(() => {
    if (!donutRef.current) return;
    const svg = d3.select(donutRef.current);
    svg.selectAll("*").remove();
    const W = 200, H = 200;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W/2},${H/2})`);
    const arc = d3.arc().innerRadius(48).outerRadius(82).cornerRadius(2).padAngle(0.018);
    const pie = d3.pie().sort(null).value(d => d.v);
    const arcs = pie(REGION);
    g.selectAll("path").data(arcs).join("path")
      .attr("fill", d => d.data.color)
      .attr("opacity", 0).transition().delay(300).duration(500).attr("opacity", 1)
      .attrTween("d", function(d) {
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
    if (!redempRef.current) return;
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

  return (
    <div className="s29">
      <header className="s17__head">
        <div className="s17__h-num">29 · MTN program</div>
        <h2 className="s17__h-title">Tighter spreads, <span className="thin">longer tenors</span></h2>
        <div className="s17__h-meta">First-ever 10Y and 15Y issuances<br />Broader investor reach</div>
      </header>

      <div className="s29__body">
        <section className="s29__top">
          <div className="s29__panel">
            <div className="s29__panel-eye">MTN issuance progression & spreads</div>
            <div className="s29__panel-sub">Spread over SOFR · bps</div>
            <svg ref={scatterRef} className="s29__scatter" />
          </div>
          <div className="s29__panel s29__panel--narrow">
            <div className="s29__panel-eye">MTN by region</div>
            <div className="s29__panel-sub">YTD · Dec 2025</div>
            <div className="s29__donut-row">
              <svg ref={donutRef} className="s29__donut-svg" />
            </div>
          </div>
        </section>
        <section className="s29__bottom">
          <div className="s29__panel-eye">Redemption profile · USD M, nominal · 2025 borrowings</div>
          <svg ref={redempRef} className="s29__redemp" />
        </section>
      </div>

      <footer className="s17__foot">
        Tactical issuances at 3 · 5 · 7 · 10 · 15 yrs supported price discovery & re-anchored pricing. Source · FONPLATA, as of December 31, 2025.
      </footer>
    </div>
  );
}
export default Slide29;
