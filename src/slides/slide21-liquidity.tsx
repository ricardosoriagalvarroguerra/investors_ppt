import { useEffect, useRef, useState } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 21 — Strengthened Liquidity Position · 3 donuts + table + trend
   ============================================================ */

const LIQ_RATING = [
  { k: "AA+/Aa1",   v: 24, color: "var(--chart-6)" },
  { k: "A+/A1",     v: 21, color: "var(--chart-2)" },
  { k: "BBB+/Baa1/BBB-", v: 5,  color: "var(--chart-3)" },
  { k: "AAA",       v: 50, color: "var(--chart-5)" },
];
const LIQ_ISSUER = [
  { k: "Financial",    v: 20, color: "var(--chart-6)" },
  { k: "Supranational",v: 40, color: "var(--chart-2)" },
  { k: "Sovereign",    v: 40, color: "var(--chart-5)" },
];
const LIQ_ASSET = [
  { k: "On-demand deposits", v: 0.5, color: "var(--chart-6)" },
  { k: "Fixed Income ETFs",  v: 3.5, color: "var(--chart-7)" },
  { k: "CDs · ECPs · T-bills", v: 25, color: "var(--chart-2)" },
  { k: "Bonds",              v: 71, color: "var(--chart-5)" },
];

const LIQ_TREND = [
  { y: "2021", la: 633,  ta: 36, gd: 29 },
  { y: "2022", la: 556,  ta: 25, gd: 25 },
  { y: "2023", la: 731,  ta: 37, gd: 25 },
  { y: "2024", la: 768,  ta: 34, gd: 25 },
  { y: "2025", la: 1457, ta: 67, gd: 36 },
];

function MiniDonut({ data, title, active, idx }) {
  const ref = useRef(null);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 220, H = 220, R = 94, r = 54;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W/2},${H/2})`);
    const pie = d3.pie().sort(null).value(d => d.v);
    const arc = d3.arc().innerRadius(r).outerRadius(R).cornerRadius(2).padAngle(0.012);
    const arcs = pie(data);
    g.selectAll("path").data(arcs).join("path")
      .attr("data-slice", (_, i) => i)
      .attr("fill", d => d.data.color)
      .attr("d", arc)
      .attr("opacity", 1)
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHover(arcs.indexOf(d)))
      .on("mouseleave", () => setHover(null));
  }, [active, idx]);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).selectAll("path")
      .interrupt()
      .transition().duration(140)
      .attr("opacity", (_, i) => hover === null || i === hover ? 1 : 0.38);
  }, [hover]);

  return (
    <div className="s21__donut">
      <div className="s21__donut-title">{title}</div>
      <svg ref={ref} className="s21__donut-svg" />
      <div className="s21__donut-legend">
        {data.map((d, i) => (
          <div
            key={i}
            className={hover === i ? "is-hover" : ""}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="s21__sw" style={{ background: d.color }}></span>
            <span className="s21__sw-lab">{d.k}</span>
            <span className="s21__sw-val">{d.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide21({ active }) {
  const trendRef = useRef(null);
  useEffect(() => {
    if (!trendRef.current) return;
    const svg = d3.select(trendRef.current);
    svg.selectAll("*").remove();
    const W = 540, H = 230;
    const m = { top: 24, right: 40, bottom: 34, left: 40 };
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
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); });
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

  return (
    <div className="s21">
      <header className="s17__head">
        <div className="s17__h-num">21 · Liquidity</div>
        <h2 className="s17__h-title">USD <span className="thin">1bn</span> AUM reached</h2>
        <div className="s17__h-meta">A strengthened liquidity position<br />Short-term, high-rated</div>
      </header>

      <div className="s21__body">
        <section className="s21__top">
          <div className="s21__top-eye">Liquidity portfolio · by rating, type of issuer, and asset class</div>
          <div className="s21__donuts">
            <MiniDonut data={LIQ_RATING} title="By rating"      active={active} idx={0} />
            <MiniDonut data={LIQ_ISSUER} title="By issuer type" active={active} idx={1} />
            <MiniDonut data={LIQ_ASSET}  title="By asset class" active={active} idx={2} />
          </div>
        </section>

        <section className="s21__bot">
          <div className="s21__policy">
            <div className="s21__policy-eye">Policy limits & liquidity trend</div>
            <table className="s21__table">
              <thead>
                <tr>
                  <th>Real</th><th>Policy limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="num">&gt;19 months</td>
                  <td>12 months coverage of net cash requirements</td>
                </tr>
                <tr>
                  <td className="num">1.44 years</td>
                  <td>2 years maximum liquidity portfolio duration</td>
                </tr>
                <tr>
                  <td className="num">AA(*)</td>
                  <td>AA · minimum average rating</td>
                </tr>
                <tr>
                  <td className="num">BBB</td>
                  <td>BBB · minimum rating for purchase</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="s21__trend">
            <div className="s21__trend-head">
              <div className="s21__trend-eye">Liquidity trend · USD M</div>
              <div className="s21__trend-legend">
                <span><span className="s21__lg s21__lg--bar"></span>Liquid Assets (LA)</span>
                <span><span className="s21__lg s21__lg--ln1"></span>LA / Total Assets %</span>
                <span><span className="s21__lg s21__lg--ln2"></span>LA / Gross Debt %</span>
              </div>
            </div>
            <svg ref={trendRef} className="s21__trend-svg" />
          </div>
        </section>
      </div>

      <footer className="s17__foot">(*) Applies the lowest rating available within S&P and Moody's. Source · FONPLATA, as of December 31, 2025.</footer>
    </div>
  );
}
export default Slide21;
