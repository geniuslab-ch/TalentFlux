"use client";
import { useState, useEffect } from "react";

export function useMobile() {
  // Valeur SSR-safe : on suppose desktop (1200px) lors du premier render serveur
  const [w, setW] = useState(1200);

  useEffect(() => {
    // Hydratation : on lit la vraie largeur côté client
    setW(window.innerWidth);
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return {
    isMobile: w < 768,
    isTablet: w < 1024,
    isDesktop: w >= 1024,
    w,
  };
}

export function useR() {
  const { isMobile, isTablet } = useMobile();
  return (mobile: unknown, tablet?: unknown, desktop?: unknown) => {
    if (isMobile) return mobile;
    if (isTablet && tablet !== undefined) return tablet;
    return desktop !== undefined ? desktop : tablet;
  };
}
