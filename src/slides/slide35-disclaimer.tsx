/* ============================================================
   Slide 35 — Disclaimer
   ============================================================ */

const DISCLAIMER = [
  "This presentation is for informational purposes only; it does not constitute an offer to sell or solicitation of an offer to buy any of FONPLATA's Development Bank securities in any jurisdiction to any person to whom it is unlawful to make such an offer or solicitation. The information contained in this document is subject to change, modifications, additions, clarifications and/or substitutions.",
  "The information herein is presented in summary form; consequently, FONPLATA does not provide any assurance with respect to the completeness of any market, financial, legal and/or other issues summarized or discussed herein. FONPLATA is not acting as advisor or agent and shall have no liability, contingent or otherwise, for the quality, accuracy, timeliness, continued availability or completeness of the information, data, calculations nor for any special, indirect, incidental or consequential damages which may be experienced because of the use of the material made available herein.",
  "This presentation and the documents incorporated by reference into this presentation contain statements that constitute \"forward-looking statements\" based on current expectations related to FONPLATA's strategic goals and objectives, which are subject to inherent risks and uncertainties beyond FONPLATA's control. Consequently, actual future results could differ materially from those currently anticipated. FONPLATA undertakes no obligation to update any forward-looking statements.",
  "Nothing in this presentation shall constitute nor shall be construed as a waiver of the immunities, privileges and exemptions granted to FONPLATA by its Constitutive Agreement, by the agreements which FONPLATA has entered or may enter with its shareholder countries, or by the legislation of those states.",
  "This information is provided for discussion purposes only and may not be reproduced or redistributed without the express consent of FONPLATA.",
];

function Slide35() {
  return (
    <div className="s35">
      <header className="s17__head">
        <div className="s17__h-num">35 · Legal</div>
        <h2 className="s17__h-title">Disclaimer</h2>
        <div className="s17__h-meta">Important information<br />Asia NDR · March 2026</div>
      </header>

      <div className="s35__body">
        <div className="s35__rule" />
        <ol className="s35__list">
          {DISCLAIMER.map((p, i) => (
            <li key={i}>
              <span className="s35__num">§ {String(i + 1).padStart(2, "0")}</span>
              <p>{p}</p>
            </li>
          ))}
        </ol>
        <div className="s35__signoff">
          <span>FONPLATA · Development Bank</span>
          <span>contacto@fonplata.org</span>
          <span>www.fonplata.org</span>
        </div>
      </div>
    </div>
  );
}
export default Slide35;
