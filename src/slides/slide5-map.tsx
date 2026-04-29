import { useState, useEffect, useRef } from "react";
import * as _d3 from "d3";
const d3: any = _d3;
import * as _topojson from "topojson-client";
const topojson: any = _topojson;

/* ============================================================
   Slide 5 — FONPLATA Overview · interactive D3 choropleth
   ============================================================ */

// FONPLATA member countries with Shareholder participation %
const COUNTRIES = {
  AR: { name: "Argentina",  iso3: "ARG", pct: 11.1, flag: "🇦🇷", hq: false, liaison: true,  capital: "Buenos Aires",  pop: "46.2M", gdp: "USD 632bn" },
  BO: { name: "Bolivia",    iso3: "BOL", pct: 11.1, flag: "🇧🇴", hq: true,  liaison: false, capital: "Santa Cruz de la Sierra (HQ)", pop: "12.4M", gdp: "USD 45bn" },
  BR: { name: "Brazil",     iso3: "BRA", pct: 33.3, flag: "🇧🇷", hq: false, liaison: true,  capital: "Brasília",      pop: "215.3M", gdp: "USD 2.13tn" },
  PY: { name: "Paraguay",   iso3: "PRY", pct: 11.1, flag: "🇵🇾", hq: false, liaison: true,  capital: "Asunción",      pop: "6.8M",   gdp: "USD 41bn" },
  UY: { name: "Uruguay",    iso3: "URY", pct: 33.3, flag: "🇺🇾", hq: false, liaison: true,  capital: "Montevideo",    pop: "3.4M",   gdp: "USD 77bn" },
};
const ISO3_TO_KEY = Object.fromEntries(Object.entries(COUNTRIES).map(([k, v]) => [v.iso3, k]));

// Approximate centroids (lon, lat) for HQ + liaison markers
const MARKERS = {
  hq:      { iso3: "BOL", lon: -63.18, lat: -17.78, label: "HQ · Santa Cruz de la Sierra" },
  liaisons: [
    { iso3: "ARG", lon: -58.38, lat: -34.60, label: "Buenos Aires" },
    { iso3: "BRA", lon: -47.92, lat: -15.78, label: "Brasília" },
    { iso3: "PRY", lon: -57.57, lat: -25.30, label: "Asunción" },
    { iso3: "URY", lon: -56.16, lat: -34.90, label: "Montevideo" },
  ],
};

const FACTS = [
  { n: "01", text: <>FONPLATA is a <strong>Supranational Development Financial Institution</strong>.</> },
  { n: "02", text: <>Established in <strong>1974</strong> by five founding members: Argentina, Bolivia, Brazil, Paraguay and Uruguay.</> },
  { n: "03", text: <><strong>51 years</strong> supporting and financing its member countries.</> },
  { n: "04", text: <>Enjoys <strong>Preferred Creditor Status</strong> with its shareholder countries.</> },
  { n: "05", text: <>Loan portfolio allocated <strong>100% within Public Sector</strong>, of which <strong>95%</strong> is sovereign-guaranteed.</> },
  { n: "06", text: <>Rated <strong>A+ / A2</strong> with Stable Outlook by S&amp;P and Moody's.</> },
];

const KPIS = [
  { num: <>USD <em>2.6</em>bn</>, lab: "Gross Loans" },
  { num: <><em>118</em>%</>,      lab: "Debt / Equity" },
  { num: <><em>48</em>%</>,        lab: "Basel Ratio*" },
  { num: <><em>0</em>%</>,         lab: "NPL Ratio" },
];

function Slide5({ active }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null); // { iso3, x, y } | null
  const [topo, setTopo] = useState(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  // Load South America topology (only first time)
  useEffect(() => {
    if (topo) return;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
      .then(r => r.json())
      .then(setTopo)
      .catch(err => console.warn("map load failed", err));
  }, [topo]);

  // Resize observer
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(entries => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Render map
  useEffect(() => {
    if (!topo || !svgRef.current || size.w < 50) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { w, h } = size;

    const all = topojson.feature(topo, topo.objects.countries).features;

    // South + a bit of Central America
    const filtered = all.filter(f => {
      const c = d3.geoCentroid(f);
      return c[0] > -90 && c[0] < -30 && c[1] > -58 && c[1] < 14;
    });

    const proj = d3.geoMercator().fitExtent([[28, 28], [w - 28, h - 56]], {
      type: "FeatureCollection",
      features: filtered.filter(f => {
        const c = d3.geoCentroid(f);
        return c[0] > -82 && c[0] < -33 && c[1] > -56 && c[1] < 13;
      }),
    });
    const path = d3.geoPath(proj);

    // Choropleth scale based on shareholder pct (11.1, 33.3)
    const colorScale = d3.scaleLinear()
      .domain([0, 11, 33.3])
      .range([
        getCss("--paper-3"),
        d3.color(getCss("--accent")).copy({ opacity: 0.55 }) + "",
        getCss("--accent"),
      ])
      .clamp(true);

    // Draw all
    svg.append("g")
      .selectAll("path")
      .data(filtered)
      .join("path")
      .attr("d", path)
      .attr("class", d => {
        const key = ISO3_TO_KEY[idToISO3(d.id)];
        return "country" + (key ? " member" : "");
      })
      .attr("fill", d => {
        const key = ISO3_TO_KEY[idToISO3(d.id)];
        return key ? colorScale(COUNTRIES[key].pct) : getCss("--paper-3");
      })
      .on("mouseenter", function(evt, d) {
        const key = ISO3_TO_KEY[idToISO3(d.id)];
        if (!key) return;
        const [x, y] = d3.pointer(evt, wrapRef.current);
        setHover({ key, x, y });
        d3.select(this)
          .raise()
          .attr("opacity", 1)
          .attr("stroke", getCss("--accent"))
          .attr("stroke-width", 2.8)
          .style("filter", "drop-shadow(0 7px 12px rgba(186, 24, 27, 0.24)) brightness(1.06)");
      })
      .on("mousemove", function(evt) {
        const [x, y] = d3.pointer(evt, wrapRef.current);
        setHover(h => h ? { ...h, x, y } : null);
      })
      .on("mouseleave", function() {
        setHover(null);
        d3.select(this)
          .attr("opacity", 1)
          .attr("stroke", getCss("--paper"))
          .attr("stroke-width", 1.2)
          .style("filter", null);
      });

    // Country labels + percentages
    Object.entries(COUNTRIES).forEach(([key, c]) => {
      const feature = filtered.find(f => idToISO3(f.id) === c.iso3);
      if (!feature) return;
      const [cx, cy] = path.centroid(feature);
      if (isNaN(cx)) return;

      svg.append("text")
        .attr("class", "country-label")
        .attr("x", cx)
        .attr("y", cy - 6)
        .attr("text-anchor", "middle")
        .text(key);

      svg.append("text")
        .attr("class", "country-pct")
        .attr("x", cx)
        .attr("y", cy + 12)
        .attr("text-anchor", "middle")
        .text(`${c.pct}%`);
    });

    // HQ marker
    const hq = MARKERS.hq;
    const [hqx, hqy] = proj([hq.lon, hq.lat]);
    const hqg = svg.append("g").attr("transform", `translate(${hqx},${hqy})`);
    hqg.append("circle").attr("class", "hq-marker").attr("r", 0)
      .transition().delay(400).duration(500).attr("r", 6);
    hqg.append("circle").attr("class", "hq-marker").attr("r", 0)
      .attr("fill", "none").attr("stroke", getCss("--accent")).attr("stroke-width", 1)
      .attr("opacity", 0.6)
      .transition().delay(400).duration(900).attr("r", 14).attr("opacity", 0);

    // Liaison markers (diamonds)
    MARKERS.liaisons.forEach((l, i) => {
      const [x, y] = proj([l.lon, l.lat]);
      svg.append("rect")
        .attr("class", "liaison-marker")
        .attr("x", x - 4).attr("y", y - 4)
        .attr("width", 8).attr("height", 8)
        .attr("transform", `rotate(45 ${x} ${y})`)
        .attr("opacity", 0)
        .transition().delay(600 + i * 80).duration(400).attr("opacity", 1);
    });
  }, [topo, size, active]);

  const hoverData = hover && COUNTRIES[hover.key];

  return (
    <div className="s5">
      <header className="s5__head">
        <div className="s5__h-num">05 · Overview</div>
        <h2 className="s5__h-title">
          An evolving <span className="thin">Development Bank</span>
        </h2>
        <div className="s5__h-meta">
          <span>Source · Interim Financial Statements, 31 Dec 2025</span>
          <span>(*) CAR adjusted for risk-weighted assets</span>
        </div>
      </header>

      <div className="s5__body">
        {/* LEFT — narrative facts */}
        <aside className="s5__panel s5__panel--left">
          <div className="s5__panel-title">Profile</div>
          {FACTS.map(f => (
            <div className="s5__fact" key={f.n}>
              <span className="s5__fact-num">{f.n}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </aside>

        {/* CENTER — map */}
        <div className="s5__map-wrap" ref={wrapRef}>
          <div className="s5__map-info">
            Shareholder participation · % of subscribed capital
          </div>

          <svg ref={svgRef} viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="xMidYMid meet"></svg>

          {hover && hoverData && (
            <div className="s5__tooltip show" style={{ left: hover.x, top: hover.y }}>
              <strong>{hoverData.name}</strong>
              <div className="row"><span>Capital</span><span>{hoverData.capital}</span></div>
              <div className="row"><span>Shareholding</span><span style={{ color: "var(--accent)" }}>{hoverData.pct}%</span></div>
              <div className="row"><span>Population</span><span>{hoverData.pop}</span></div>
              <div className="row"><span>GDP</span><span>{hoverData.gdp}</span></div>
            </div>
          )}

          <div className="s5__legend">
            <div className="s5__legend-title">Shareholding</div>
            <div className="s5__legend-bar">
              <div style={{ flex: 1, background: "var(--paper-3)" }}></div>
              <div style={{ flex: 1, background: "color-mix(in oklab, var(--accent), transparent 60%)" }}></div>
              <div style={{ flex: 1, background: "color-mix(in oklab, var(--accent), transparent 30%)" }}></div>
              <div style={{ flex: 1, background: "var(--accent)" }}></div>
            </div>
            <div className="s5__legend-labels">
              <span>0%</span><span>11%</span><span>22%</span><span>33%+</span>
            </div>
            <div style={{ display: "flex", gap: 14, paddingTop: 8, borderTop: "1px solid var(--rule)", fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }}></span>HQ
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, background: "var(--gold)", transform: "rotate(45deg)" }}></span>Liaison
              </span>
            </div>
          </div>

          <div className="s5__kpis">
            {KPIS.map((k, i) => (
              <div className="s5__kpi" key={i}>
                <div className="s5__kpi-num">{k.num}</div>
                <div className="s5__kpi-lab">{k.lab}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — country cards */}
        <aside className="s5__panel s5__panel--right">
          <div className="s5__panel-title">Member Countries</div>
          {Object.entries(COUNTRIES).map(([key, c]) => (
            <div
              className={"s5__country-card " + (hover && hover.key === key ? "active" : "")}
              key={key}
              onMouseEnter={() => setHover({ key, x: -1000, y: -1000 })}
              onMouseLeave={() => setHover(null)}
            >
              <div className="s5__cc-row">
                <div className="s5__cc-name">
                  <span className="s5__cc-flag">{c.flag}</span>
                  {c.name}
                </div>
                <div className="s5__cc-pct">{c.pct}%</div>
              </div>
              <div className="s5__cc-bar"><i style={{ width: `${(c.pct / 33.3) * 100}%` }}></i></div>
              <div className="s5__cc-meta">
                <span>{c.iso3}</span>
                <span>{c.hq ? "HQ" : "Liaison Office"}</span>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function getCss(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}
function idToISO3(id) {
  // world-atlas uses numeric ids; map the 5 we care about
  const M = { "032": "ARG", "068": "BOL", "076": "BRA", "600": "PRY", "858": "URY" };
  const padded = String(id).padStart(3, "0");
  return M[padded] || null;
}
export default Slide5;
