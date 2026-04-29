import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 7 — Strategic Pillars & Business Plan
   ============================================================ */

const PILLARS = [
  { n: "I",   key: "eff",  title: "Institutional Efficiency",       desc: "Operational excellence, lean cost base, and continuous process improvement." },
  { n: "II",  key: "spec", title: "Functional Specialization",      desc: "Clear product specialization: small-to-mid sovereign and sub-sovereign operations." },
  { n: "III", key: "comp", title: "Strategic Complementarity",      desc: "Cooperation with other multilateral and regional development banks rather than competition." },
  { n: "IV",  key: "val",  title: "Value Creation",                 desc: "Maximum development impact per dollar deployed across vulnerable zones and border regions." },
  { n: "V",   key: "fin",  title: "Financial Soundness & Growth",   desc: "Strong capital, prudent risk, and disciplined balance-sheet expansion." },
];

const ORIENTATION = [
  "Small to medium-size projects — USD 50–70mm",
  "Focus on vulnerable zones, border regions, and integration",
  "Grants delivered through Technical Assistance",
];

const SECTORS = [
  { key: "infra", label: "Infrastructure", share: 48, items: ["Road & Logistics", "Small-City Urban Development", "Energy"] },
  { key: "prod",  label: "Productive Development", share: 27, items: ["Production", "Financial Services", "SMEs"] },
  { key: "soc",   label: "Social & Green", share: 25, items: ["Health & Education", "Water & Sanitation", "Environment"] },
];

function Slide7({ active }) {
  const [pillar, setPillar] = useState(0);
  const donutRef = useRef(null);
  const [sectorSel, setSectorSel] = useState(null);

  // D3 donut for sector share
  useEffect(() => {
    if (!donutRef.current) return;
    const svg = d3.select(donutRef.current);
    svg.selectAll("*").remove();
    const W = 160, H = 160, R = 70, r = 46;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W/2},${H/2})`);
    const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
    const pie = d3.pie().sort(null).value(d => d.share);
    const arcs = pie(SECTORS);
    const colors = ["var(--chart-6)", "var(--chart-7)", "var(--chart-4)"];
    g.selectAll("path").data(arcs).join("path")
      .attr("d", arc)
      .attr("fill", (_, i) => colors[i])
      .attr("opacity", 0)
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setSectorSel(d.data.key))
      .on("mouseleave", () => setSectorSel(null))
      .transition().delay((_, i) => 150 + i * 100).duration(500).attr("opacity", 1);
    g.append("text").attr("text-anchor", "middle").attr("y", -2)
      .attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("letter-spacing", "0.12em")
      .attr("fill", "var(--ink-3)").text("SECTOR");
    g.append("text").attr("text-anchor", "middle").attr("y", 14)
      .attr("font-family", "var(--font-mono)").attr("font-size", 9).attr("letter-spacing", "0.12em")
      .attr("fill", "var(--ink-3)").text("MIX");
  }, [active]);

  return (
    <div className="s7">
      <header className="s7__head">
        <div className="s7__h-num">07 · Strategy</div>
        <h2 className="s7__h-title">Core Strategic Pillars <span className="thin">& Business Plan</span></h2>
        <div className="s7__h-meta">Five pillars · Three target sectors</div>
      </header>

      <section className="s7__pillars">
        <div className="s7__pillars-rule"></div>
        {PILLARS.map((p, i) => (
          <button
            key={p.key}
            className={"s7__pillar " + (i === pillar ? "is-active" : "")}
            onMouseEnter={() => setPillar(i)}
            onClick={() => setPillar(i)}
          >
            <span className="s7__pillar-num">{p.n}</span>
            <span className="s7__pillar-cap">
              <span className="s7__pillar-shaft"></span>
              <span className="s7__pillar-base"></span>
            </span>
            <span className="s7__pillar-title">{p.title}</span>
          </button>
        ))}
      </section>

      <section className="s7__pillar-detail" key={pillar}>
        <span className="s7__pd-eyebrow">Pillar {PILLARS[pillar].n}</span>
        <p className="s7__pd-text">{PILLARS[pillar].desc}</p>
      </section>

      <section className="s7__split">
        <div className="s7__panel">
          <div className="s7__panel-eye">Strategic Business Orientation</div>
          <ul className="s7__list">
            {ORIENTATION.map((o, i) => (
              <li key={i}><span className="s7__bullet">{String(i + 1).padStart(2, "0")}</span>{o}</li>
            ))}
          </ul>
        </div>

        <div className="s7__panel s7__panel--sectors">
          <div className="s7__panel-eye">Target Sectors</div>
          <div className="s7__sectors-row">
            <svg ref={donutRef} className="s7__donut" />
            <div className="s7__sectors-list">
              {SECTORS.map((s, i) => (
                <div
                  className={"s7__sector " + (sectorSel === s.key ? "is-active" : "")}
                  key={s.key}
                  onMouseEnter={() => setSectorSel(s.key)}
                  onMouseLeave={() => setSectorSel(null)}
                >
                  <div className="s7__sector-head">
                    <span className="s7__sector-name">{s.label}</span>
                    <span className="s7__sector-share">{s.share}%</span>
                  </div>
                  <div className="s7__sector-items">{s.items.join(" · ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Slide7;
