import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;
import { CountUp } from "../lib";

/* ============================================================
   Slide 23 — Strong Capital Base · stacked bars (Paid-in + Reserves)
   ============================================================ */

const CAP = [
  { y: "2015",  p: 543,  r: 75  },
  { y: "2016",  p: 643,  r: 90  },
  { y: "2017",  p: 706,  r: 110 },
  { y: "2018",  p: 818,  r: 135 },
  { y: "2019",  p: 866,  r: 163 },
  { y: "Dec-20", p: 917,  r: 193 },
  { y: "Dec-21", p: 1006, r: 199 },
  { y: "Dec-22", p: 1082, r: 247 },
  { y: "Dec-23", p: 1210, r: 339 },
  { y: "Dec-24", p: 1321, r: 429 },
  { y: "Jun-25", p: 1321, r: 492 },
  { y: "Dec-25", p: 1330, r: 522 },
];

function Slide23({ active }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(CAP.length - 1);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 980, H = 400;
    const m = { top: 40, right: 30, bottom: 36, left: 56 };
    const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleBand().domain(CAP.map(d => d.y)).range([0, iw]).padding(0.3);
    const y = d3.scaleLinear().domain([0, 2000]).range([ih, 0]);

    g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-iw).tickFormat(""))
      .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
      .call(s => s.selectAll("path").remove());
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(",")).tickSize(0))
      .call(s => s.selectAll("path").remove())
      .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));

    // paid-in (bottom)
    g.selectAll("rect.p").data(CAP).join("rect")
      .attr("class", "p")
      .attr("x", d => x(d.y)).attr("width", x.bandwidth())
      .attr("y", ih).attr("height", 0)
      .attr("fill", "var(--chart-2)")
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHov(CAP.indexOf(d)))
      .transition().delay((_, i) => i * 50).duration(500)
      .attr("y", d => y(d.p)).attr("height", d => ih - y(d.p));

    // reserves (top)
    g.selectAll("rect.r").data(CAP).join("rect")
      .attr("class", "r")
      .attr("x", d => x(d.y)).attr("width", x.bandwidth())
      .attr("y", ih).attr("height", 0)
      .attr("fill", "var(--chart-5)")
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHov(CAP.indexOf(d)))
      .transition().delay((_, i) => i * 50 + 250).duration(500)
      .attr("y", d => y(d.p + d.r)).attr("height", d => y(d.p) - y(d.p + d.r));

    // segment values inside
    g.selectAll("text.pv").data(CAP).join("text")
      .attr("class", "pv")
      .attr("x", d => x(d.y) + x.bandwidth() / 2)
      .attr("y", d => y(d.p / 2))
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("font-weight", 600)
      .attr("fill", "var(--paper)")
      .text(d => d.p)
      .attr("opacity", 0).transition().delay((_, i) => i * 50 + 600).attr("opacity", 1);

    g.selectAll("text.rv").data(CAP).join("text")
      .attr("class", "rv")
      .attr("x", d => x(d.y) + x.bandwidth() / 2)
      .attr("y", d => y(d.p + d.r / 2))
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("font-family", "var(--font-mono)").attr("font-size", 9.5).attr("font-weight", 600)
      .attr("fill", "var(--ink)")
      .text(d => d.r)
      .attr("opacity", 0).transition().delay((_, i) => i * 50 + 700).attr("opacity", 1);

    // total labels above bars
    g.selectAll("text.t").data(CAP).join("text")
      .attr("class", "t")
      .attr("x", d => x(d.y) + x.bandwidth() / 2)
      .attr("y", d => y(d.p + d.r) - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-mono)").attr("font-size", 11).attr("font-weight", 700)
      .attr("fill", "var(--ink)")
      .text(d => d3.format(",")(d.p + d.r))
      .attr("opacity", 0).transition().delay((_, i) => i * 50 + 800).attr("opacity", 1);

    const ax = g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0));
    ax.select("path").attr("stroke", "var(--rule-strong)");
    ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
  }, [active]);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).selectAll("rect.p, rect.r")
      .interrupt()
      .transition().duration(160)
      .attr("opacity", function(_, i) {
        const idx = i % CAP.length;
        return idx === hov ? 1 : 0.9;
      });
  }, [hov]);

  const sel = CAP[hov];
  const total = sel.p + sel.r;
  const cagr = (((CAP[CAP.length-1].p + CAP[CAP.length-1].r) / (CAP[0].p + CAP[0].r)) ** (1/10) - 1) * 100;

  return (
    <div className="s23">
      <header className="s17__head">
        <div className="s17__h-num">23 · Capital base</div>
        <h2 className="s17__h-title">Strong <span className="thin">capital base</span></h2>
        <div className="s17__h-meta">Equity structure & key metrics<br />USD million</div>
      </header>

      <div className="s23__body">
        <div className="s23__chart-wrap">
          <svg ref={ref} className="s23__chart" />
        </div>

        <aside className="s23__rail">
          <div className="s23__metric s23__metric--accent">
            <div className="s23__m-eye">Equity · Dec 2025</div>
            <div className="s23__m-num">USD <CountUp to={1852} duration={900} play={active} /> M</div>
            <div className="s23__m-sub">Paid-in 1,330 · Reserves 522</div>
          </div>
          <div className="s23__metric">
            <div className="s23__m-eye">CAGR · 10 years</div>
            <div className="s23__m-num">{cagr.toFixed(1)}%</div>
            <div className="s23__m-sub">2015 → Dec-25 total equity</div>
          </div>
          <div className="s23__metric">
            <div className="s23__m-eye">Selected period</div>
            <div className="s23__m-num" style={{ fontSize: 22 }}>{sel.y}</div>
            <div className="s23__m-row"><span>Paid-in</span><span>{sel.p}</span></div>
            <div className="s23__m-row"><span>Reserves</span><span>{sel.r}</span></div>
            <div className="s23__m-row total"><span>Total</span><span>{total.toLocaleString()}</span></div>
          </div>

          <div className="s23__legend">
            <div><span className="s23__sw s23__sw--p"></span>Paid-in capital</div>
            <div><span className="s23__sw s23__sw--r"></span>Reserves & retained earnings</div>
          </div>
        </aside>
      </div>

      <div className="s23__pull">Solvency based on capital contributions and financial results.</div>

      <footer className="s17__foot">Source · Preliminary financial statements as of December 31, 2025.</footer>
    </div>
  );
}
export default Slide23;
