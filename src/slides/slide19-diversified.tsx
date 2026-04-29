import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;

/* ============================================================
   Slide 19 — Diversified Loan Portfolio · country donut + sector stack
   ============================================================ */

const COUNTRY_MIX = [
  { iso: "ARG", name: "Argentina", rating: "CCC / Caa1", share: 35 },
  { iso: "BOL", name: "Bolivia",   rating: "CCC- / Caa3", share: 17 },
  { iso: "BRA", name: "Brazil",    rating: "BB / Ba2",    share: 5  },
  { iso: "PRY", name: "Paraguay",  rating: "BBB- / Baa3", share: 17 },
  { iso: "URY", name: "Uruguay",   rating: "BBB+ / Baa1", share: 23 },
  { iso: "NSG", name: "NSG",       rating: "BB / Ba3",    share: 3 },
];

const SECTOR_MIX = [
  { key: "infra", label: "Infrastructure",      value: 1762, share: 68 },
  { key: "soc",   label: "Social",              value: 622,  share: 24 },
  { key: "prod",  label: "Productive",          value: 207,  share: 8  },
];
const SECTOR_TOTAL = 2591;

const POLICIES = [
  { num: "25%", lab: "Lending Capacity",    desc: "Maximum exposure to a single member country" },
  { num: "30%", lab: "Total Assets",        desc: "Maximum exposure to a single member country" },
];

function Slide19({ active }) {
  const donutRef = useRef(null);
  const [hov, setHov] = useState(null);

  useEffect(() => {
    if (!donutRef.current) return;
    const svg = d3.select(donutRef.current);
    svg.selectAll("*").remove();
    const W = 280, H = 280, R = 130, r = 76;
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    const g = svg.append("g").attr("transform", `translate(${W/2},${H/2})`);
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
      .on("mouseenter", function(_, d) {
        setHov(d.data.iso);
        d3.select(this).transition().duration(150).attr("d", arcOver);
      })
      .on("mouseleave", function() {
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

  return (
    <div className="s19">
      <header className="s19__head">
        <div className="s19__h-num">19 · Diversification</div>
        <h2 className="s19__h-title">Diversified Loan <span className="thin">Portfolio</span></h2>
        <div className="s19__h-meta">% over Gross Loan Portfolio Outstanding<br />USD million · Dec 2025</div>
      </header>

      <div className="s19__body">
        <section className="s19__panel">
          <div className="s19__panel-eye">By Member Country</div>
          <div className="s19__country-row">
            <svg ref={donutRef} className="s19__donut" />
            <div className="s19__country-list">
              {COUNTRY_MIX.map(c => (
                <div
                  key={c.iso}
                  className={"s19__country " + (hov === c.iso ? "is-hover" : "")}
                  onMouseEnter={() => setHov(c.iso)}
                  onMouseLeave={() => setHov(null)}
                >
                  <span className="s19__country-iso">{c.iso}</span>
                  <span className="s19__country-name">
                    <span>{c.name}</span>
                    <span className="s19__country-rating">{c.rating}</span>
                  </span>
                  <span className="s19__country-share">{c.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s19__panel">
          <div className="s19__panel-eye">By Sector</div>
          <div className="s19__sector-row">
            <div className="s19__sector-stack">
              <div className="s19__sector-total">USD {SECTOR_TOTAL.toLocaleString()}</div>
              <div className="s19__sector-bar">
                {SECTOR_MIX.map((s, i) => (
                  <div
                    key={s.key}
                    className={"s19__sector-seg s19__sector-seg--" + i}
                    style={{ height: `${s.share}%` }}
                  >
                    <span>{s.share}%</span>
                  </div>
                ))}
              </div>
              <div className="s19__sector-axis">Dec 2025</div>
            </div>

            <div className="s19__sector-list">
              {SECTOR_MIX.map((s, i) => (
                <div className="s19__sector-row-item" key={s.key}>
                  <span className={"s19__sector-swatch s19__sector-swatch--" + i}></span>
                  <span className="s19__sector-name">{s.label}</span>
                  <span className="s19__sector-val">USD {s.value.toLocaleString()}M</span>
                  <span className="s19__sector-share">{s.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="s19__policies">
        <div className="s19__policies-eye">Sovereign Guaranteed Loans · Concentration Limits</div>
        <div className="s19__policies-row">
          {POLICIES.map((p, i) => (
            <div className="s19__policy" key={i}>
              <div className="s19__policy-num">{p.num}</div>
              <div className="s19__policy-body">
                <div className="s19__policy-lab">{p.lab}</div>
                <div className="s19__policy-desc">{p.desc}</div>
              </div>
            </div>
          ))}
          <div className="s19__policy-note">
            FONPLATA's prudent Financial Policies include maximum country exposure thresholds.
          </div>
        </div>
      </section>

      <footer className="s19__foot">Note · S&P and Moody's credit ratings, respectively. Source: Preliminary financial statements as of December 31, 2025.</footer>
    </div>
  );
}
export default Slide19;
