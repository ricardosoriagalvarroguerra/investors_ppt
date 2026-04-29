/* ============================================================
   App shell — rail nav, slide stage, ⌘K palette, tweaks panel
   ============================================================ */
import { useEffect, useMemo, useState } from "react";
import { StarMark, type SlideProps } from "./lib.tsx";
import {
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakSlider,
  useTweaks,
} from "./tweaks-panel.tsx";

import Slide1 from "./slides/slide1-opening.tsx";
import Slide2 from "./slides/slide2-delegation.tsx";
import Slide3 from "./slides/slide3-agenda.tsx";
import Slide4 from "./slides/slide4-divider.tsx";
import Slide5 from "./slides/slide5-map.tsx";
import Slide6 from "./slides/slide6-milestones.tsx";
import Slide7 from "./slides/slide7-pillars.tsx";
import Slide8 from "./slides/slide8-projects.tsx";
import Slide9 from "./slides/slide9-governance.tsx";
import Slide10 from "./slides/slide10-pcs.tsx";
import Slide11 from "./slides/slide11-pct.tsx";
import Slide12 from "./slides/slide12-credit.tsx";
import Slide13 from "./slides/slide13-sustainable.tsx";
import Slide14 from "./slides/slide14-framework.tsx";
import Slide15 from "./slides/slide15-achievements.tsx";
import Slide16 from "./slides/slide16-section2.tsx";
import Slide17 from "./slides/slide17-balance.tsx";
import Slide18 from "./slides/slide18-portfolio.tsx";
import Slide19 from "./slides/slide19-diversified.tsx";
import Slide20 from "./slides/slide20-eea.tsx";
import Slide21 from "./slides/slide21-liquidity.tsx";
import Slide22 from "./slides/slide22-leverage.tsx";
import Slide23 from "./slides/slide23-capital.tsx";
import Slide24 from "./slides/slide24-shareholder.tsx";
import Slide25 from "./slides/slide25-gci3.tsx";
import Slide26 from "./slides/slide26-funding-divider.tsx";
import Slide27 from "./slides/slide27-funding-evolution.tsx";
import Slide28 from "./slides/slide28-2025funding.tsx";
import Slide29 from "./slides/slide29-mtn.tsx";
import Slide30 from "./slides/slide30-usd-issuances.tsx";
import Slide31 from "./slides/slide31-2026strategy.tsx";
import Slide32 from "./slides/slide32-closing-divider.tsx";
import Slide33 from "./slides/slide33-remarks.tsx";
import Slide34 from "./slides/slide34-closing.tsx";
import Slide35 from "./slides/slide35-disclaimer.tsx";

type SlideEntry = {
  id: number;
  group: string;
  num: string;
  title: string;
  Component: React.ComponentType<SlideProps>;
};

const SLIDES: SlideEntry[] = [
  { id: 1,  group: "Cover",       num: "01", title: "Asia Roadshow",         Component: Slide1 },
  { id: 2,  group: "Cover",       num: "02", title: "Delegation",            Component: Slide2 },
  { id: 3,  group: "Cover",       num: "03", title: "Contents",              Component: Slide3 },
  { id: 4,  group: "Chapter 01",  num: "04", title: "FONPLATA Overview",     Component: Slide4 },
  { id: 5,  group: "Chapter 01",  num: "05", title: "An Evolving Bank",      Component: Slide5 },
  { id: 6,  group: "Chapter 01",  num: "06", title: "Recent Milestones",     Component: Slide6 },
  { id: 7,  group: "Chapter 01",  num: "07", title: "Strategic Pillars",     Component: Slide7 },
  { id: 8,  group: "Chapter 01",  num: "08", title: "Projects Snapshot",     Component: Slide8 },
  { id: 9,  group: "Chapter 01",  num: "09", title: "Governance",            Component: Slide9 },
  { id: 10, group: "Chapter 01",  num: "10", title: "Preferred Creditor",    Component: Slide10 },
  { id: 11, group: "Chapter 02",  num: "11", title: "Creditor Treatment",    Component: Slide11 },
  { id: 12, group: "Chapter 02",  num: "12", title: "Credit Profile",        Component: Slide12 },
  { id: 13, group: "Chapter 02",  num: "13", title: "Sustainable Bank",      Component: Slide13 },
  { id: 14, group: "Chapter 02",  num: "14", title: "Debt Framework",        Component: Slide14 },
  { id: 15, group: "Chapter 02",  num: "15", title: "2025 Achievements",     Component: Slide15 },
  { id: 16, group: "Chapter 02",  num: "16", title: "Financial Highlights",  Component: Slide16 },
  { id: 17, group: "Chapter 02",  num: "17", title: "Balance Sheet",         Component: Slide17 },
  { id: 18, group: "Chapter 02",  num: "18", title: "Loan Portfolio",        Component: Slide18 },
  { id: 19, group: "Chapter 02",  num: "19", title: "Diversification",       Component: Slide19 },
  { id: 20, group: "Chapter 02",  num: "20", title: "EEA · CABEI",           Component: Slide20 },
  { id: 21, group: "Chapter 02",  num: "21", title: "Liquidity Position",    Component: Slide21 },
  { id: 22, group: "Chapter 02",  num: "22", title: "Conservative Leverage", Component: Slide22 },
  { id: 23, group: "Chapter 02",  num: "23", title: "Capital Base",          Component: Slide23 },
  { id: 24, group: "Chapter 02",  num: "24", title: "Shareholder Support",   Component: Slide24 },
  { id: 25, group: "Chapter 02",  num: "25", title: "3ʳᵈ GCI Subscribed",    Component: Slide25 },
  { id: 26, group: "Chapter 03",  num: "26", title: "Funding Strategy",      Component: Slide26 },
  { id: 27, group: "Chapter 03",  num: "27", title: "Funding Evolution",     Component: Slide27 },
  { id: 28, group: "Chapter 03",  num: "28", title: "2025 Funding",          Component: Slide28 },
  { id: 29, group: "Chapter 03",  num: "29", title: "MTN Program",           Component: Slide29 },
  { id: 30, group: "Chapter 03",  num: "30", title: "USD Issuances",         Component: Slide30 },
  { id: 31, group: "Chapter 03",  num: "31", title: "2026 Strategy",         Component: Slide31 },
  { id: 32, group: "Chapter 04",  num: "32", title: "Concluding Remarks",    Component: Slide32 },
  { id: 33, group: "Chapter 04",  num: "33", title: "5 Takeaways",           Component: Slide33 },
  { id: 34, group: "Chapter 04",  num: "34", title: "Thank You",             Component: Slide34 },
  { id: 35, group: "Chapter 04",  num: "35", title: "Disclaimer",            Component: Slide35 },
];

type DeckTweaks = {
  theme: "light" | "dark";
  accent: "primary" | "support" | "deep";
  density: "compact" | "comfortable" | "spacious";
  motion: number;
};

const TWEAK_DEFAULTS: DeckTweaks = {
  theme: "light",
  accent: "primary",
  density: "comfortable",
  motion: 60,
};

const ACCENT_PRESETS = {
  primary: {
    light: "#BA181B", mid: "#A4161A", deep: "#9D0208", ink: "#9D0208",
    lightDark: "#D13A3D", midDark: "#BF2D31", deepDark: "#F06B6E", inkDark: "#FF8A8C",
    soft: "rgba(186,24,27,0.08)", softDark: "rgba(209,58,61,0.22)",
  },
  support: {
    light: "#A4161A", mid: "#BA181B", deep: "#9D0208", ink: "#9D0208",
    lightDark: "#D45458", midDark: "#C9363C", deepDark: "#F06B6E", inkDark: "#FF9A9C",
    soft: "rgba(164,22,26,0.08)", softDark: "rgba(212,84,88,0.22)",
  },
  deep: {
    light: "#9D0208", mid: "#BA181B", deep: "#A4161A", ink: "#9D0208",
    lightDark: "#C9363C", midDark: "#D13A3D", deepDark: "#F06B6E", inkDark: "#FF8A8C",
    soft: "rgba(157,2,8,0.08)", softDark: "rgba(201,54,60,0.22)",
  },
} as const;

export default function App() {
  const [index, setIndex] = useState(0);
  const [tweaks, setTweak] = useTweaks<DeckTweaks>(TWEAK_DEFAULTS);
  const [railOpen, setRailOpen] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [cmdkQuery, setCmdkQuery] = useState("");
  const [cmdkActive, setCmdkActive] = useState(0);

  const jumpToIndex = (target: number) => {
    setIndex(Math.max(0, Math.min(SLIDES.length - 1, target)));
  };

  // Apply theme + accent
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.dataset.density = tweaks.density;
    const presetKey = tweaks.accent in ACCENT_PRESETS ? tweaks.accent : "primary";
    const acc = ACCENT_PRESETS[presetKey as keyof typeof ACCENT_PRESETS];
    const dark = tweaks.theme === "dark";
    root.style.setProperty("--accent", dark ? acc.lightDark : acc.light);
    root.style.setProperty("--accent-mid", dark ? acc.midDark : acc.mid);
    root.style.setProperty("--accent-deep", dark ? acc.deepDark : acc.deep);
    root.style.setProperty("--accent-ink", dark ? acc.inkDark : acc.ink);
    root.style.setProperty(
      "--accent-soft",
      dark ? acc.softDark : acc.soft
    );
    root.style.setProperty("--motion", String(tweaks.motion / 60));
  }, [tweaks]);

  // Notify host of slide changes (speaker-notes contract)
  useEffect(() => {
    window.parent.postMessage({ slideIndexChanged: index }, "*");
  }, [index]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdkOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setCmdkOpen(false);
        setRailOpen(false);
        return;
      }
      if (cmdkOpen) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(SLIDES.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmdkOpen]);

  const filteredCmdk = useMemo(() => {
    const q = cmdkQuery.trim().toLowerCase();
    if (!q) return SLIDES;
    return SLIDES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.group.toLowerCase().includes(q) ||
        s.num.includes(q)
    );
  }, [cmdkQuery]);

  useEffect(() => {
    setCmdkActive((active) =>
      filteredCmdk.length === 0 ? 0 : Math.min(active, filteredCmdk.length - 1)
    );
  }, [filteredCmdk.length]);

  type RailRow =
    | { kind: "label"; text: string }
    | { kind: "item"; slide: SlideEntry; slideIndex: number };

  const grouped = useMemo<RailRow[]>(() => {
    const out: RailRow[] = [];
    let lastGroup: string | null = null;
    SLIDES.forEach((s, i) => {
      if (s.group !== lastGroup) {
        out.push({ kind: "label", text: s.group });
        lastGroup = s.group;
      }
      out.push({ kind: "item", slide: s, slideIndex: i });
    });
    return out;
  }, []);

  return (
    <div className={"app " + (railOpen ? "app--rail-open" : "")}>
      {/* ============== LEFT RAIL ============== */}
      <button
        type="button"
        className="rail-toggle"
        aria-label={railOpen ? "Hide contents" : "Show contents"}
        aria-expanded={railOpen}
        aria-controls="deck-contents"
        onClick={() => setRailOpen((open) => !open)}
        title={railOpen ? "Hide contents" : "Show contents"}
      >
        <span className="rail-toggle__line"></span>
        <span className="rail-toggle__line"></span>
        <span className="rail-toggle__line"></span>
      </button>

      <button
        type="button"
        className="rail-scrim"
        aria-label="Close contents"
        tabIndex={railOpen ? 0 : -1}
        onClick={() => setRailOpen(false)}
      />

      <aside
        id="deck-contents"
        className="rail"
        aria-hidden={!railOpen}
        aria-label="Presentation contents"
      >
        <button
          type="button"
          className="rail__close"
          aria-label="Close contents"
          onClick={() => setRailOpen(false)}
          title="Close contents"
        >
          <span></span>
          <span></span>
        </button>

        <div className="rail__brand">
          <span className="rail__star">
            <StarMark size={38} color="var(--accent)" />
          </span>
          <div className="rail__wordmark">FONPLATA</div>
          <div className="rail__sub">Development Bank</div>
        </div>

        <nav className="rail__sections" data-screen-label="rail">
          {grouped.map((g, i) =>
            g.kind === "label" ? (
              <div className="rail__section-label" key={"l" + i}>
                {g.text}
              </div>
            ) : (
              <button
                key={g.slide.id}
                className={
                  "rail__item " +
                  (g.slideIndex === index ? "rail__item--active" : "")
                }
                onClick={() => {
                  setIndex(g.slideIndex);
                  setRailOpen(false);
                }}
              >
                <span className="rail__num">{g.slide.num}</span>
                <span className="rail__title">{g.slide.title}</span>
                <span className="rail__dot"></span>
              </button>
            )
          )}
        </nav>

        <div className="rail__progress">
          <div
            className="rail__progress-bar"
            style={
              {
                "--p": `${((index + 1) / SLIDES.length) * 100}%`,
              } as React.CSSProperties
            }
          ></div>
          <div className="rail__progress-text">
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
            </span>
            <span>{SLIDES[index].group}</span>
          </div>
        </div>

        <div className="rail__theme">
          <button
            aria-pressed={tweaks.theme === "light"}
            onClick={() => setTweak("theme", "light")}
          >
            Light
          </button>
          <button
            aria-pressed={tweaks.theme === "dark"}
            onClick={() => setTweak("theme", "dark")}
          >
            Dark
          </button>
        </div>
      </aside>

      {/* ============== STAGE ============== */}
      <main className="stage">
        <div className="stage__chrome-tl">
          FONPLATA · Asia Roadshow · March 2026
        </div>
        <div className="stage__chrome-tr">
          {SLIDES[index].num} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        <div className="stage__inner">
          {SLIDES.map((s, i) => {
            const Cmp = s.Component;
            return (
              <section
                key={s.id}
                className={"slide " + (i === index ? "slide--active" : "")}
                data-screen-label={`${s.num} ${s.title}`}
                aria-hidden={i !== index}
              >
                <Cmp active={i === index} onJump={jumpToIndex} />
              </section>
            );
          })}
        </div>

        <div className="stage__chrome-bl" aria-hidden="true"></div>
        <div className="stage__chrome-br">
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
            <span style={{ marginLeft: 6 }}>Search</span>
          </span>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span style={{ marginLeft: 6 }}>Navigate</span>
          </span>
        </div>
      </main>

      {/* ============== ⌘K PALETTE ============== */}
      <div
        className={"cmdk-veil " + (cmdkOpen ? "show" : "")}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCmdkOpen(false);
        }}
      >
        <div className="cmdk" role="dialog" aria-label="Jump to slide">
          <input
            className="cmdk-input"
            placeholder="Jump to slide…"
            value={cmdkQuery}
            autoFocus={cmdkOpen}
            onChange={(e) => {
              setCmdkQuery(e.target.value);
              setCmdkActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCmdkActive((a) =>
                  filteredCmdk.length === 0
                    ? 0
                    : Math.min(filteredCmdk.length - 1, a + 1)
                );
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setCmdkActive((a) => Math.max(0, a - 1));
              }
              if (e.key === "Enter" && filteredCmdk[cmdkActive]) {
                const target = SLIDES.findIndex(
                  (s) => s.id === filteredCmdk[cmdkActive].id
                );
                if (target >= 0) setIndex(target);
                setCmdkOpen(false);
                setCmdkQuery("");
              }
            }}
          />
          <div className="cmdk-list">
            {filteredCmdk.map((s, i) => (
              <button
                key={s.id}
                className={"cmdk-item " + (i === cmdkActive ? "active" : "")}
                onMouseEnter={() => setCmdkActive(i)}
                onClick={() => {
                  const target = SLIDES.findIndex((x) => x.id === s.id);
                  if (target >= 0) setIndex(target);
                  setCmdkOpen(false);
                  setCmdkQuery("");
                }}
              >
                <span className="num">{s.num}</span>
                <span>{s.title}</span>
                <span className="meta">{s.group}</span>
              </button>
            ))}
            {filteredCmdk.length === 0 && (
              <div
                style={{
                  padding: "20px 22px",
                  color: "var(--ink-3)",
                  fontSize: 13,
                }}
              >
                No matches.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============== TWEAKS PANEL ============== */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(v) => setTweak("theme", v as DeckTweaks["theme"])}
          />
          <TweakRadio
            label="Accent"
            value={tweaks.accent}
            options={[
              { value: "primary", label: "BA181B" },
              { value: "support", label: "A4161A" },
              { value: "deep", label: "9D0208" },
            ]}
            onChange={(v) => setTweak("accent", v as DeckTweaks["accent"])}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Comfort" },
              { value: "spacious", label: "Spacious" },
            ]}
            onChange={(v) => setTweak("density", v as DeckTweaks["density"])}
          />
          <TweakSlider
            label="Motion"
            value={tweaks.motion}
            min={0}
            max={100}
            step={10}
            onChange={(v) => setTweak("motion", v)}
            unit="%"
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}
