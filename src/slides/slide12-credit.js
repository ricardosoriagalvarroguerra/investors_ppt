import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
/* ============================================================
   Slide 12 — Strongest Credit Profile in LATAM
   ============================================================ */
const SP_SCALE = ["C", "CCC-", "CCC", "CCC+", "B-", "B", "B+", "BB-", "BB", "BB+", "BBB-", "BBB", "BBB+", "A-", "A", "A+", "AA-", "AA", "AA+"];
const MOODY_SCALE = ["Ca", "Caa3", "Caa2", "Caa1", "B3", "B2", "B1", "Ba3", "Ba2", "Ba1", "Baa3", "Baa2", "Baa1", "A3", "A2", "A1", "Aa3", "Aa2", "Aa1"];
const IG_INDEX = 10; // BBB- and above is investment grade
const ENTITIES_SP = [
    { iso: "ARG", name: "Argentina", rating: "CCC", grp: "sov" },
    { iso: "ECU", name: "Ecuador", rating: "CCC+", grp: "sov" },
    { iso: "BOL", name: "Bolivia", rating: "B-", grp: "sov" },
    { iso: "BRA", name: "Brazil", rating: "BB", grp: "sov" },
    { iso: "COL", name: "Colombia", rating: "BB+", grp: "sov" },
    { iso: "PER", name: "Peru", rating: "BBB-", grp: "sov" },
    { iso: "PRY", name: "Paraguay", rating: "BBB-", grp: "sov" },
    { iso: "URY", name: "Uruguay", rating: "BBB", grp: "sov" },
    { iso: "MEX", name: "Mexico", rating: "BBB", grp: "sov" },
    { iso: "PAN", name: "Panama", rating: "BBB", grp: "sov" },
    { iso: "CHL", name: "Chile", rating: "A", grp: "sov" },
    { iso: "CAF", name: "CAF", rating: "A+", grp: "mdb" },
    { iso: "BCIE", name: "BCIE", rating: "AA-", grp: "mdb" },
    { iso: "FON", name: "FONPLATA", rating: "A+", grp: "self" },
];
const ENTITIES_MOODY = [
    { iso: "BOL", name: "Bolivia", rating: "Ca", grp: "sov" },
    { iso: "ECU", name: "Ecuador", rating: "Caa3", grp: "sov" },
    { iso: "ARG", name: "Argentina", rating: "Caa1", grp: "sov" },
    { iso: "BRA", name: "Brazil", rating: "Ba1", grp: "sov" },
    { iso: "COL", name: "Colombia", rating: "Baa3", grp: "sov" },
    { iso: "MEX", name: "Mexico", rating: "Baa2", grp: "sov" },
    { iso: "PRY", name: "Paraguay", rating: "Baa3", grp: "sov" },
    { iso: "URY", name: "Uruguay", rating: "Baa1", grp: "sov" },
    { iso: "PAN", name: "Panama", rating: "Baa3", grp: "sov" },
    { iso: "PER", name: "Peru", rating: "Baa1", grp: "sov" },
    { iso: "CHL", name: "Chile", rating: "A2", grp: "sov" },
    { iso: "BCIE", name: "BCIE", rating: "Aa3", grp: "mdb" },
    { iso: "CAF", name: "CAF", rating: "Aa3", grp: "mdb" },
    { iso: "FON", name: "FONPLATA", rating: "A2", grp: "self" },
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
    return (_jsxs("div", { className: "s12", children: [_jsxs("header", { className: "s12__head", children: [_jsx("div", { className: "s12__h-num", children: "12 \u00B7 Credit positioning" }), _jsxs("h2", { className: "s12__h-title", children: ["One of the Strongest Credit Profiles", _jsx("br", {}), _jsx("span", { className: "thin", children: "in Latin America" })] }), _jsx("div", { className: "s12__h-meta", children: "High capitalization \u00B7 liquidity \u00B7 Preferred Creditor Status" })] }), _jsxs("div", { className: "s12__toggle-row", children: [_jsxs("div", { className: "s12__toggle", children: [_jsx("button", { className: agency === "sp" ? "is-active" : "", onClick: () => setAgency("sp"), children: "S&P" }), _jsx("button", { className: agency === "moody" ? "is-active" : "", onClick: () => setAgency("moody"), children: "Moody's" })] }), _jsxs("div", { className: "s12__legend", children: [_jsx("span", { className: "s12__lg s12__lg--sov", children: "Sovereign" }), _jsx("span", { className: "s12__lg s12__lg--mdb", children: "Multilateral peer" }), _jsx("span", { className: "s12__lg s12__lg--self", children: "FONPLATA" })] })] }), _jsxs("div", { className: "s12__chart", children: [_jsxs("div", { className: "s12__zones", children: [_jsx("div", { className: "s12__zone s12__zone--sub", children: _jsx("span", { className: "s12__zone-label", children: "Non-Investment Grade" }) }), _jsx("div", { className: "s12__zone s12__zone--ig", children: _jsx("span", { className: "s12__zone-label", children: "Investment Grade" }) })] }), _jsx("div", { className: "s12__cols", children: cols.map(c => {
                            const isIG = c.idx >= IG_INDEX;
                            return (_jsxs("div", { className: "s12__col " + (isIG ? "is-ig" : "is-sub"), children: [_jsx("div", { className: "s12__col-stack", children: c.items.map(it => (_jsxs("div", { className: "s12__chip s12__chip--" + it.grp + (hover === it.iso ? " is-hover" : ""), onMouseEnter: () => setHover(it.iso), onMouseLeave: () => setHover(null), children: [_jsx("span", { className: "s12__chip-iso", children: it.iso }), _jsx("span", { className: "s12__chip-name", children: it.name })] }, it.iso))) }), _jsx("div", { className: "s12__col-tick", children: c.label })] }, c.label));
                        }) })] }), _jsxs("div", { className: "s12__foot-row", children: [_jsxs("div", { className: "s12__foot-stat", children: [_jsx("div", { className: "s12__foot-num", children: "A+ / A2" }), _jsx("div", { className: "s12__foot-lab", children: "FONPLATA \u00B7 Stable outlook" })] }), _jsxs("p", { className: "s12__foot-statement", children: ["FONPLATA's rating is ", _jsx("strong", { children: "supported by its high capitalization and liquidity" }), ", anchored by Preferred Creditor Status across its member countries."] }), _jsxs("div", { className: "s12__sources", children: ["Source \u00B7 S&P and Moody's, Dec 31, 2025.", _jsx("br", {}), "(1) CAF \u2014 Corporaci\u00F3n Andina de Fomento. (2) BCIE \u2014 Central American Bank of Economic Integration."] })] })] }));
}
export default Slide12;
