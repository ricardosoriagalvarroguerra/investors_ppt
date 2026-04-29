/* ============================================================
   Shared library — small primitives used across slides
   ============================================================ */
import React, { useEffect, useRef, useState } from "react";

export type SlideProps = {
  active: boolean;
  onJump?: (target: number) => void;
};

// FONPLATA logo mark — renders the official estrella asset
export function StarMark({
  size = 22,
  color = "var(--accent)",
  className,
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={["star-mark", className].filter(Boolean).join(" ")}
      style={{
        display: "block",
        width: size,
        height: size,
        background: color,
        WebkitMask: "url('/images/estrella.png') center / contain no-repeat",
        mask: "url('/images/estrella.png') center / contain no-repeat",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

// Number that counts up when `play` flips true
export function CountUp({
  to,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  play = true,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  play?: boolean;
}) {
  const [val, setVal] = useState<number>(play ? 0 : to);
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    if (!play) {
      startedAt.current = null;
      setVal(to);
      return;
    }
    startedAt.current = null;
    setVal(0);
    let raf: number;
    const tick = (ts: number) => {
      if (startedAt.current == null) startedAt.current = ts;
      const t = Math.min(1, (ts - startedAt.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, play]);
  const display =
    decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// Simple flag-bar: 3 colored stripes representing a country (abstract, not real flag)
export function FlagBar({
  colors,
  vertical = false,
}: {
  colors: string[];
  vertical?: boolean;
}) {
  return (
    <div
      className="s1__flag-bar"
      style={{
        display: "flex",
        flexDirection: vertical ? "row" : "column",
      }}
    >
      {colors.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}
