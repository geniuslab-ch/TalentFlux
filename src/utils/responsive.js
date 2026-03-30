// ── useMobile hook — shared across all TalentFlux pages ──
// Import: import { useMobile, R } from "../utils/responsive";

import { useState, useEffect } from "react";

export function useMobile() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile:  w < 768,
    isTablet:  w < 1024,
    isDesktop: w >= 1024,
    w,
  };
}

// ── Responsive style helpers ──────────────────────────────
// R(mobile, desktop) — returns mobile value if screen < 768px
export function useR() {
  const { isMobile, isTablet } = useMobile();
  return (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet && tablet !== undefined) return tablet;
    return desktop !== undefined ? desktop : tablet;
  };
}
