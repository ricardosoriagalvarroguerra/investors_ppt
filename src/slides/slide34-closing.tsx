/* ============================================================
   Slide 34 — Closing card · logo + contact
   ============================================================ */
import { StarMark } from "../lib";

function Slide34() {
  return (
    <div className="s34">
      <svg className="s34__bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="s34-sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--paper-2)" />
            <stop offset="60%" stopColor="var(--paper)" />
            <stop offset="100%" stopColor="var(--accent-soft)" />
          </linearGradient>
          <pattern id="s34-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--rule)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#s34-sky)" />
        <rect width="1600" height="900" fill="url(#s34-grid)" opacity="0.4" />

        {/* horizon city silhouette */}
        <g transform="translate(0,640)" opacity="0.5">
          {[60,140,200,260,330,420,500,560,640,720,820,900,980,1060,1140,1220,1320,1420,1500].map((x, i) => {
            const h = 40 + ((i * 17) % 80);
            const w = 32 + (i % 3) * 8;
            return <rect key={i} x={x} y={-h} width={w} height={h} fill="var(--accent)" opacity="0.18" />;
          })}
          <line x1="0" y1="0" x2="1600" y2="0" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" />
        </g>

        {/* lampposts */}
        {[200, 460, 800, 1180, 1440].map((x, i) => (
          <g key={i} transform={`translate(${x},520)`} opacity="0.55">
            <line x1="0" y1="0" x2="0" y2="180" stroke="var(--ink-3)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="var(--accent)" opacity="0.6" />
          </g>
        ))}
      </svg>

      <div className="s34__panel">
        <div className="s34__brand">
          <span className="s34__star">
            <StarMark size={76} />
          </span>
          <div className="s34__wordmark">FONPLATA</div>
          <div className="s34__sub">Development Bank</div>
        </div>

        <div className="s34__rule" />

        <div className="s34__tagline">Connecting people. Funding regions.</div>

        <div className="s34__contacts">
          <a className="s34__contact" href="mailto:contacto@fonplata.org">
            <span className="s34__contact-icon">
              <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="6" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 3 7 L 12 13 L 21 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </span>
            <div>
              <div className="s34__contact-eye">Email</div>
              <div className="s34__contact-val">contacto@fonplata.org</div>
            </div>
          </a>
          <a className="s34__contact" href="https://www.fonplata.org" target="_blank" rel="noreferrer">
            <span className="s34__contact-icon">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" />
                <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" /></svg>
            </span>
            <div>
              <div className="s34__contact-eye">Website</div>
              <div className="s34__contact-val">www.fonplata.org</div>
            </div>
          </a>
        </div>

        <div className="s34__rule" />

        <div className="s34__meta">
          <span>Investor Relations</span>
          <span>·</span>
          <span>Asia NDR · March 2026</span>
        </div>
      </div>
    </div>
  );
}
export default Slide34;
