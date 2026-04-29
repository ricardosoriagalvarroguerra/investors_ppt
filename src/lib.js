import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* ============================================================
   Shared library — small primitives used across slides
   ============================================================ */
import { useEffect, useRef, useState } from "react";
// FONPLATA logo mark — renders the official estrella asset
export function StarMark({ size = 22, color = "var(--accent)", className, style, }) {
    return (_jsx("span", { className: ["star-mark", className].filter(Boolean).join(" "), style: {
            display: "block",
            width: size,
            height: size,
            background: color,
            WebkitMask: "url('/images/estrella.png') center / contain no-repeat",
            mask: "url('/images/estrella.png') center / contain no-repeat",
            ...style,
        }, "aria-hidden": "true" }));
}
// Number that counts up when `play` flips true
export function CountUp({ to, duration = 1200, prefix = "", suffix = "", decimals = 0, play = true, }) {
    const [val, setVal] = useState(play ? 0 : to);
    const startedAt = useRef(null);
    useEffect(() => {
        if (!play)
            return;
        let raf;
        const tick = (ts) => {
            if (startedAt.current == null)
                startedAt.current = ts;
            const t = Math.min(1, (ts - startedAt.current) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1)
                raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [to, duration, play]);
    const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
    return (_jsxs("span", { children: [prefix, display, suffix] }));
}
// Simple flag-bar: 3 colored stripes representing a country (abstract, not real flag)
export function FlagBar({ colors, vertical = false, }) {
    return (_jsx("div", { className: "s1__flag-bar", style: {
            display: "flex",
            flexDirection: vertical ? "row" : "column",
        }, children: colors.map((c, i) => (_jsx("div", { style: { flex: 1, background: c } }, i))) }));
}
