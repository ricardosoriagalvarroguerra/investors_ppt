import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 22 — Conservative Leverage · borrowings bars + leverage line
   ============================================================ */

const LEV = [
  { y: "Dec-15", b: 0,    l: 0.0 },
  { y: "Dec-16", b: 0,    l: 0.0 },
  { y: "Dec-17", b: 0,    l: 0.0 },
  { y: "Dec-18", b: 0.1,  l: 0.1 },
  { y: "Dec-19", b: 265,  l: 0.3 },
  { y: "Dec-20", b: 588,  l: 0.5 },
  { y: "Dec-21", b: 827,  l: 0.8 },
  { y: "Dec-22", b: 975,  l: 0.7 },
  { y: "Dec-23", b: 1050, l: 0.7 },
  { y: "Dec-24", b: 1380, l: 0.8 },
  { y: "Dec-25", b: 2178, l: 1.2 },
];

function Slide22({ active }) {
  const ref = useRef(null);
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 980, H = 380;
    const m = { top: 30, right: 60, bottom: 36, left: 56 };
    const iw = W - m.left - m.right, ih = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleBand().domain(LEV.map(d => d.y)).range([0, iw]).padding(0.35);
    const y1 = d3.scaleLinear().domain([0, 2400]).range([ih, 0]);
    const y2 = d3.scaleLinear().domain([0, 1.5]).range([ih, 0]);

    g.append("g").call(d3.axisLeft(y1).ticks(5).tickSize(-iw).tickFormat(""))
      .call(s => s.selectAll("line").attr("stroke", "var(--rule)").attr("stroke-dasharray", "2 3"))
      .call(s => s.selectAll("path").remove());
    g.append("g").call(d3.axisLeft(y1).ticks(5).tickFormat(d3.format(",")).tickSize(0))
      .call(s => s.selectAll("path").remove())
      .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
    g.append("text").attr("x", -36).attr("y", -14).attr("font-family", "var(--font-mono)")
      .attr("font-size", 9.5).attr("letter-spacing", "0.12em").attr("fill", "var(--ink-3)").text("USD M");

    g.append("g").attr("transform", `translate(${iw},0)`)
      .call(d3.axisRight(y2).ticks(4).tickFormat(d => d + "x").tickSize(0))
      .call(s => s.selectAll("path").remove())
      .call(s => s.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)"));
    g.append("text").attr("x", iw + 30).attr("y", -14).attr("font-family", "var(--font-mono)")
      .attr("font-size", 9.5).attr("letter-spacing", "0.12em").attr("fill", "var(--ink-3)").attr("text-anchor", "end").text("Leverage");

    g.selectAll("rect.b").data(LEV).join("rect")
      .attr("class", "b")
      .attr("x", d => x(d.y)).attr("width", x.bandwidth())
      .attr("y", ih).attr("height", 0)
      .attr("fill", "var(--chart-4)")
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHov(LEV.indexOf(d)))
      .on("mouseleave", () => setHov(null))
      .transition().delay((_, i) => i * 60).duration(500)
      .attr("y", d => y1(d.b)).attr("height", d => Math.max(1, ih - y1(d.b)));

    g.selectAll("text.bl").data(LEV).join("text")
      .attr("class", "bl")
      .attr("x", d => x(d.y) + x.bandwidth() / 2)
      .attr("y", d => y1(d.b) - 8)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("font-weight", 600)
      .attr("fill", "var(--ink)")
      .text(d => d.b ? d3.format(",")(d.b) : "")
      .attr("opacity", 0).transition().delay((_, i) => i * 60 + 400).attr("opacity", 1);

    const line = d3.line().x(d => x(d.y) + x.bandwidth() / 2).y(d => y2(d.l)).curve(d3.curveMonotoneX);
    const path = g.append("path").datum(LEV).attr("d", line)
      .attr("fill", "none").attr("stroke", "var(--chart-2)").attr("stroke-width", 1.5)
      .attr("stroke-dasharray", function() { return this.getTotalLength(); })
      .attr("stroke-dashoffset", function() { return this.getTotalLength(); });
    path.transition().delay(800).duration(900).attr("stroke-dashoffset", 0);

    g.selectAll("circle.l").data(LEV).join("circle")
      .attr("class", "l")
      .attr("cx", d => x(d.y) + x.bandwidth() / 2)
      .attr("cy", d => y2(d.l))
      .attr("r", 0).attr("fill", "var(--paper)").attr("stroke", "var(--chart-2)").attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHov(LEV.indexOf(d)))
      .on("mouseleave", () => setHov(null))
      .transition().delay((_, i) => i * 60 + 1100).duration(250).attr("r", 3);

    g.selectAll("text.ll").data(LEV).join("text")
      .attr("class", "ll")
      .attr("x", d => x(d.y) + x.bandwidth() / 2)
      .attr("y", d => y2(d.l) - 8)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-mono)").attr("font-size", 9.5)
      .attr("fill", "var(--chart-2)").attr("font-weight", 600)
      .text(d => d.l.toFixed(1))
      .attr("opacity", 0).transition().delay((_, i) => i * 60 + 1300).attr("opacity", 1);

    const ax = g.append("g").attr("transform", `translate(0,${ih})`).call(d3.axisBottom(x).tickSize(0));
    ax.select("path").attr("stroke", "var(--rule-strong)");
    ax.selectAll("text").attr("font-family", "var(--font-mono)").attr("font-size", 10).attr("fill", "var(--ink-3)").attr("dy", "1.2em");
  }, [active]);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).selectAll("rect.b")
      .interrupt()
      .transition().duration(160)
      .attr("fill", (_, i) => i === hov ? "var(--chart-6)" : "var(--chart-4)");
  }, [hov]);

  const sel = LEV[hov ?? LEV.length - 1];

  return (
    <div className="s22">
      <header className="s17__head">
        <div className="s17__h-num">22 · Leverage</div>
        <h2 className="s17__h-title">Conservative <span className="thin">leverage ratios</span></h2>
        <div className="s17__h-meta">FONPLATA borrowings & leverage<br />USD million</div>
      </header>

      <div className="s22__body">
        <div className="s22__chart-wrap">
          <svg ref={ref} className="s22__chart" />
        </div>

        <aside className="s22__rail">
          <div className="s22__metric">
            <div className="s22__m-eye">As of Dec 2025</div>
            <div className="s22__m-row">
              <span className="s22__m-lab">Debt / Asset</span>
              <span className="s22__m-val">53%</span>
            </div>
            <div className="s22__m-row">
              <span className="s22__m-lab">Debt / Net equity</span>
              <span className="s22__m-val">118%</span>
            </div>
          </div>

          <div className="s22__legend">
            <div><span className="s22__lg s22__lg--bar"></span>Borrowings</div>
            <div><span className="s22__lg s22__lg--ln"></span>Leverage</div>
          </div>

          <div className="s22__sel">
            <div className="s22__sel-eye">Selected period</div>
            <div className="s22__sel-y">{sel.y}</div>
            <div className="s22__sel-row">
              <span>Borrowings</span><span>USD {sel.b ? sel.b.toLocaleString() : "0"} M</span>
            </div>
            <div className="s22__sel-row">
              <span>Leverage</span><span>{sel.l.toFixed(1)}×</span>
            </div>
          </div>

          <div className="s22__policy">
            <div className="s22__policy-eye">Financial policy limit</div>
            <div className="s22__policy-row">
              <span>Maximum leverage(*)</span><span>2.7×</span>
            </div>
            <div className="s22__policy-row">
              <span>Leverage 12/2025</span><span className="hi">1.2×</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="s22__pull">
        Increased borrowings supported by a strong liquidity & capital position.
      </div>

      <footer className="s17__foot">
        (*) Leverage defined as debt divided by net equity. Maximum leverage = 2× net equity plus liquid assets. Source · Preliminary financial statements as of December 31, 2025.
      </footer>
    </div>
  );
}
export default Slide22;
