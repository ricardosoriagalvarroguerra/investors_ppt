/* ============================================================
   Slide 30 — First USD issuances · 3-column public/private placements
   ============================================================ */

const PUBLIC_LIST = [
  { tag: "5Y CHF 200 M", eq: "(USD 223 M eq.)", date: "March 03, 2021",      mat: "Maturity 2026" },
  { tag: "7Y CHF 150 M", eq: "(USD 164 M eq.)", date: "December 31, 2021",   mat: "Maturity 2028" },
  { tag: "3.5Y CHF 145 M", eq: "(USD 159 M eq.)", date: "May 15, 2024", mat: "Maturity 2027", green: true },
  { tag: "5Y CHF 130 M", eq: "(USD 153 M eq.)", date: "Oct 24, 2024",        mat: "Maturity 2029" },
];

const PRIVATE_JPY = [
  { tag: "JPY 3,000 mm", eq: "(USD 23 M eq.)",  date: "March 24, 2023", mat: "Maturity 2028", green: true },
  { tag: "JPY 4,200 M",  eq: "(USD 32 M eq.)",  date: "March 24, 2023", mat: "Maturity 2029", green: true },
  { tag: "JPY 6,300 M",  eq: "(USD 40 M eq.)",  date: "June, 2024",     mat: "Maturity 2027", green: true },
  { tag: "JPY 1,100 M",  eq: "(USD 7 M eq.)",   date: "June, 2024",     mat: "Maturity 2029", green: true },
];

const PRIVATE_USD_LEFT = [
  { tag: "3Y USD 40 M",  date: "Feb 18, 2025",   mat: "Maturity 2028" },
  { tag: "5Y USD 40 M",  date: "March 14, 2025", mat: "Maturity 2030", green: true },
  { tag: "5Y USD 50 M",  date: "March 21, 2025", mat: "Maturity 2030" },
  { tag: "5Y USD 30 M",  date: "March 24, 2025", mat: "Maturity 2030", green: true },
  { tag: "7Y USD 50 M",  date: "March 24, 2025", mat: "Maturity 2032" },
  { tag: "10Y USD 50 M", date: "April 10, 2025", mat: "Maturity 2035", green: true },
];

const PRIVATE_USD_RIGHT = [
  { tag: "5Y USD 50 M",  date: "May 19, 2025",  mat: "Maturity 2030" },
  { tag: "5Y USD 100 M", date: "May 21, 2025",  mat: "Maturity 2030", green: true },
  { tag: "15Y USD 35 M", date: "Aug 5, 2025",   mat: "Maturity 2040", green: true },
  { tag: "15Y AUD 38 M", eq: "(USD 25 M eq.)", date: "Aug 5, 2025", mat: "Maturity 2040", green: true },
  { tag: "3Y JPY 3,000 M", eq: "(USD 20.4 M eq.)", date: "Sep 5, 2025", mat: "Maturity 2028" },
  { tag: "5.5Y USD 30 M", date: "Sep 30, 2025",  mat: "Maturity 2031" },
  { tag: "5.5Y INR 9,000 M", eq: "(USD 101.5 M eq.)", date: "November, 2025", mat: "Maturity 2031", green: true },
];

function Bond({ b }) {
  return (
    <li className={"s30__bond " + (b.green ? "is-green" : "")}>
      <div className="s30__bond-tag">
        {b.tag}{b.green ? <span className="s30__leaf" title="Sustainable">✦</span> : null}
      </div>
      {b.eq && <div className="s30__bond-eq">{b.eq}</div>}
      <div className="s30__bond-date">{b.date}</div>
      <div className="s30__bond-mat">{b.mat}</div>
    </li>
  );
}

function Slide30() {
  return (
    <div className="s30">
      <header className="s17__head">
        <div className="s17__h-num">30 · USD market access</div>
        <h2 className="s17__h-title">First USD issuances <span className="thin">mark a new stage</span></h2>
        <div className="s17__h-meta">FONPLATA debuts in USD, AUD<br />and INR through MTN · 2025</div>
      </header>

      <div className="s30__body">
        <section className="s30__col s30__col--public">
          <div className="s30__col-head">
            <div className="s30__col-pill">Public placements</div>
            <div className="s30__col-flag">🇨🇭</div>
          </div>
          <ul className="s30__list">
            {PUBLIC_LIST.map((b, i) => <Bond key={i} b={b} />)}
          </ul>
          <div className="s30__col-foot">
            <span className="s30__foot-num">USD 699 M</span>
            <span className="s30__foot-lab">outstanding</span>
          </div>
        </section>

        <section className="s30__group s30__group--private">
          <div className="s30__group-head">Private placements</div>

          <div className="s30__private-grid">
            <div className="s30__col">
              <div className="s30__col-head">
                <div className="s30__col-flag">🇯🇵</div>
              </div>
              <ul className="s30__list">
                {PRIVATE_JPY.map((b, i) => <Bond key={i} b={b} />)}
              </ul>
              <div className="s30__col-foot">
                <span className="s30__foot-num">USD 102 M</span>
                <span className="s30__foot-lab">outstanding</span>
              </div>
            </div>

            <div className="s30__col s30__col--mtn">
              <div className="s30__col-head">
                <div className="s30__col-pill s30__col-pill--mtn">MTN program</div>
              </div>
              <div className="s30__mtn-cols">
                <ul className="s30__list">
                  {PRIVATE_USD_LEFT.map((b, i) => <Bond key={i} b={b} />)}
                </ul>
                <ul className="s30__list">
                  {PRIVATE_USD_RIGHT.map((b, i) => <Bond key={i} b={b} />)}
                </ul>
              </div>
              <div className="s30__col-foot">
                <span className="s30__foot-num">USD 622 M</span>
                <span className="s30__foot-lab">outstanding</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="s17__foot">✦ Sustainable. Source · FONPLATA, as of December 31, 2025.</footer>
    </div>
  );
}
export default Slide30;
