import { useEffect, useRef, useState } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 27 — Funding Evolution · 3 donuts (2016, 2020, 2025)
   ============================================================ */

const FUND_2016 = [
  { k: "DFI",  v: 100, color: "var(--accent)" },
];
const FUND_2020 = [
  { k: "CHF Bonds",            v: 27, color: "var(--chart-6)" },
  { k: "DFI & Other Institutions", v: 73, color: "var(--chart-4)" },
];
const FUND_2025 = [
  { k: "USD Bonds",  v: 23, color: "var(--chart-6)", flag: "🇺🇸" },
  { k: "CHF Bonds",  v: 34, color: "var(--chart-6)", flag: "🇨🇭" },
  { k: "JPY Bonds",  v: 6,  color: "var(--chart-6)", flag: "🇯🇵" },
  { k: "AUD Bonds",  v: 1,  color: "var(--chart-6)", flag: "🇦🇺" },
  { k: "INR Bonds",  v: 5,  color: "var(--chart-6)", flag: "🇮🇳" },
  { k: "CAF",        v: 6,  color: "var(--chart-4)" },
  { k: "IDB",        v: 8,  color: "var(--chart-4)" },
  { k: "EIB",        v: 3,  color: "var(--chart-4)" },
  { k: "AFD",        v: 2,  color: "var(--chart-4)" },
  { k: "BBVA",       v: 8,  color: "var(--chart-4)" },
  { k: "KFW",        v: 1,  color: "var(--chart-4)" },
  { k: "CDP",        v: 1,  color: "var(--chart-4)" },
  { k: "ICO",        v: 2,  color: "var(--chart-4)" },
];

function FundingDonut({ data, year, total, size, active, idx }) {
  const ref = useRef(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = size, H = size;
    const R = size * 0.42, r = size * 0.27;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W/2},${H/2})`);
    const pie = d3.pie().sort(null).value(d => d.v);
    const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
    const arcs = pie(data);
    g.selectAll("path").data(arcs).join("path")
      .attr("fill", d => d.data.color)
      .attr("data-key", d => d.data.k)
      .attr("cursor", "pointer")
      .on("mouseenter", (_, d) => setActiveKey(d.data.k))
      .on("mouseleave", () => setActiveKey(null))
      .attr("opacity", 0)
      .transition().delay(idx * 250 + 200).duration(500).attr("opacity", 1)
      .attrTween("d", function(d) {
        const i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
        return t => arc(i(t));
      });
    // center label
    g.append("text").attr("text-anchor", "middle").attr("dy", "-0.2em")
      .attr("font-family", "var(--font-mono)").attr("font-size", size * 0.05)
      .attr("letter-spacing", "0.08em").attr("fill", "var(--ink-3)")
      .text("USD");
    g.append("text").attr("text-anchor", "middle").attr("dy", "1em")
      .attr("font-size", size * 0.10).attr("font-weight", 700)
      .attr("fill", "var(--accent)")
      .text(total);
  }, [active, idx, size, data]);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).selectAll("path")
      .attr("opacity", d => !activeKey || d.data.k === activeKey ? 1 : 0.35)
      .attr("stroke", d => d.data.k === activeKey ? "var(--paper)" : "transparent")
      .attr("stroke-width", d => d.data.k === activeKey ? 3 : 0);
  }, [activeKey]);

  return (
    <div className="s27__donut">
      <svg ref={ref} className="s27__donut-svg" style={{ width: size, height: size }} />
      <div className="s27__year">{year}</div>
      <div className="s27__legend">
        {data.slice(0, 8).map((d, i) => (
          <div
            key={i}
            className={`s27__legend-row ${activeKey === d.k ? "is-hover" : ""}`}
            onMouseEnter={() => setActiveKey(d.k)}
            onMouseLeave={() => setActiveKey(null)}
          >
            <span className="s27__sw" style={{ background: d.color }}></span>
            <span className="s27__sw-lab">{d.flag ? d.flag + " " : ""}{d.k}</span>
            <span className="s27__sw-val">{d.v}%</span>
          </div>
        ))}
        {data.length > 8 && (
          <div className="s27__more">+ {data.length - 8} more partners</div>
        )}
      </div>
    </div>
  );
}

function Slide27({ active }) {
  return (
    <div className="s27">
      <header className="s17__head">
        <div className="s17__h-num">27 · Funding evolution</div>
        <h2 className="s17__h-title">Broader access, <span className="thin">greater balance</span></h2>
        <div className="s17__h-meta">From multilateral reliance to<br />diversified capital markets</div>
      </header>

      <div className="s27__body">
        <FundingDonut data={FUND_2016} year="2016" total="16M*"   size={250} active={active} idx={0} />
        <div className="s27__arrow">
          <div className="s27__arrow-line"></div>
          <div className="s27__arrow-lab">Diversification</div>
          <svg viewBox="0 0 24 8" className="s27__arrow-tip"><path d="M 0 4 L 22 4 M 18 1 L 22 4 L 18 7" stroke="var(--accent)" strokeWidth="1.4" fill="none" /></svg>
        </div>
        <FundingDonut data={FUND_2020} year="2020" total="542M*"  size={330} active={active} idx={1} />
        <div className="s27__arrow">
          <div className="s27__arrow-line"></div>
          <div className="s27__arrow-lab">Capital markets</div>
          <svg viewBox="0 0 24 8" className="s27__arrow-tip"><path d="M 0 4 L 22 4 M 18 1 L 22 4 L 18 7" stroke="var(--accent)" strokeWidth="1.4" fill="none" /></svg>
        </div>
        <FundingDonut data={FUND_2025} year="December 2025" total="2,079M*" size={400} active={active} idx={2} />
      </div>

      <footer className="s17__foot">(*) at nominal value. Source · FONPLATA, as of December 31, 2025.</footer>
    </div>
  );
}
export default Slide27;
