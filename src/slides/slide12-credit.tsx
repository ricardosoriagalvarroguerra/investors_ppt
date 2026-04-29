import { useState } from "react";

/* ============================================================
   Slide 12 — Strongest Credit Profile in LATAM
   ============================================================ */

const SP_SCALE   = ["C","CCC-","CCC","CCC+","B-","B","B+","BB-","BB","BB+","BBB-","BBB","BBB+","A-","A","A+","AA-","AA","AA+"];
const MOODY_SCALE = ["Ca","Caa3","Caa2","Caa1","B3","B2","B1","Ba3","Ba2","Ba1","Baa3","Baa2","Baa1","A3","A2","A1","Aa3","Aa2","Aa1"];
const IG_INDEX = 10; // BBB- and above is investment grade

const ENTITIES_SP = [
  { iso: "ARG", name: "Argentina", rating: "CCC", grp: "sov" },
  { iso: "ECU", name: "Ecuador",   rating: "CCC+", grp: "sov" },
  { iso: "BOL", name: "Bolivia",   rating: "B-",  grp: "sov" },
  { iso: "BRA", name: "Brazil",    rating: "BB",  grp: "sov" },
  { iso: "COL", name: "Colombia",  rating: "BB+", grp: "sov" },
  { iso: "PER", name: "Peru",      rating: "BBB-", grp: "sov" },
  { iso: "PRY", name: "Paraguay",  rating: "BBB-", grp: "sov" },
  { iso: "URY", name: "Uruguay",   rating: "BBB",  grp: "sov" },
  { iso: "MEX", name: "Mexico",    rating: "BBB",  grp: "sov" },
  { iso: "PAN", name: "Panama",    rating: "BBB",  grp: "sov" },
  { iso: "CHL", name: "Chile",     rating: "A",   grp: "sov" },
  { iso: "CAF", name: "CAF",       rating: "A+",  grp: "mdb" },
  { iso: "BCIE",name: "BCIE",      rating: "AA-", grp: "mdb" },
  { iso: "FON", name: "FONPLATA",  rating: "A+",  grp: "self" },
];

const ENTITIES_MOODY = [
  { iso: "BOL", name: "Bolivia",   rating: "Ca",   grp: "sov" },
  { iso: "ECU", name: "Ecuador",   rating: "Caa3", grp: "sov" },
  { iso: "ARG", name: "Argentina", rating: "Caa1", grp: "sov" },
  { iso: "BRA", name: "Brazil",    rating: "Ba1",  grp: "sov" },
  { iso: "COL", name: "Colombia",  rating: "Baa3", grp: "sov" },
  { iso: "MEX", name: "Mexico",    rating: "Baa2", grp: "sov" },
  { iso: "PRY", name: "Paraguay",  rating: "Baa3", grp: "sov" },
  { iso: "URY", name: "Uruguay",   rating: "Baa1", grp: "sov" },
  { iso: "PAN", name: "Panama",    rating: "Baa3", grp: "sov" },
  { iso: "PER", name: "Peru",      rating: "Baa1", grp: "sov" },
  { iso: "CHL", name: "Chile",     rating: "A2",   grp: "sov" },
  { iso: "BCIE",name: "BCIE",      rating: "Aa3",  grp: "mdb" },
  { iso: "CAF", name: "CAF",       rating: "Aa3",  grp: "mdb" },
  { iso: "FON", name: "FONPLATA",  rating: "A2",   grp: "self" },
];

function Slide12({ active }) {
  const [agency, setAgency] = useState("sp");
  const [hover, setHover] = useState(null);

  const scale = agency === "sp" ? SP_SCALE : MOODY_SCALE;
  const entities = agency === "sp" ? ENTITIES_SP : ENTITIES_MOODY;

  // Group entities by rating column
  const cols = scale.map((label, i) => {
    const items = entities.filter(e => e.rating === label);
    return { label, idx: i, items };
  });

  return (
    <div className="s12">
      <header className="s12__head">
        <div className="s12__h-num">12 · Credit positioning</div>
        <h2 className="s12__h-title">One of the Strongest Credit Profiles<br /><span className="thin">in Latin America</span></h2>
        <div className="s12__h-meta">High capitalization · liquidity · Preferred Creditor Status</div>
      </header>

      <div className="s12__toggle-row">
        <div className="s12__toggle">
          <button className={agency === "sp" ? "is-active" : ""} onClick={() => setAgency("sp")}>S&amp;P</button>
          <button className={agency === "moody" ? "is-active" : ""} onClick={() => setAgency("moody")}>Moody's</button>
        </div>
        <div className="s12__legend">
          <span className="s12__lg s12__lg--sov">Sovereign</span>
          <span className="s12__lg s12__lg--mdb">Multilateral peer</span>
          <span className="s12__lg s12__lg--self">FONPLATA</span>
        </div>
      </div>

      <div className="s12__chart">
        <div className="s12__zones">
          <div className="s12__zone s12__zone--sub">
            <span className="s12__zone-label">Non-Investment Grade</span>
          </div>
          <div className="s12__zone s12__zone--ig">
            <span className="s12__zone-label">Investment Grade</span>
          </div>
        </div>

        <div className="s12__cols">
          {cols.map(c => {
            const isIG = c.idx >= IG_INDEX;
            return (
              <div className={"s12__col " + (isIG ? "is-ig" : "is-sub")} key={c.label}>
                <div className="s12__col-stack">
                  {c.items.map(it => (
                    <div
                      key={it.iso}
                      className={"s12__chip s12__chip--" + it.grp + (hover === it.iso ? " is-hover" : "")}
                      onMouseEnter={() => setHover(it.iso)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <span className="s12__chip-iso">{it.iso}</span>
                      <span className="s12__chip-name">{it.name}</span>
                    </div>
                  ))}
                </div>
                <div className="s12__col-tick">{c.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="s12__foot-row">
        <div className="s12__foot-stat">
          <div className="s12__foot-num">A+ / A2</div>
          <div className="s12__foot-lab">FONPLATA · Stable outlook</div>
        </div>
        <p className="s12__foot-statement">
          FONPLATA's rating is <strong>supported by its high capitalization and liquidity</strong>, anchored by Preferred Creditor Status across its member countries.
        </p>
        <div className="s12__sources">
          Source · S&amp;P and Moody's, Dec 31, 2025.<br />
          (1) CAF — Corporación Andina de Fomento. (2) BCIE — Central American Bank of Economic Integration.
        </div>
      </div>
    </div>
  );
}
export default Slide12;
