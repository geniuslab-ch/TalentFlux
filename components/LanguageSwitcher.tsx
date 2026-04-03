"use client";
// Switcher FR/EN — fixé en haut à droite, par-dessus la nav existante
// Reçoit les chemins FR et EN en props depuis le Server Component parent

import { useState } from "react";

interface Props {
  frPath: string;
  enPath: string;
  currentLang: "fr" | "en";
}

export default function LanguageSwitcher({ frPath, enPath, currentLang }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const langs = [
    { code: "fr", label: "FR", path: frPath, flag: "🇫🇷" },
    { code: "en", label: "EN", path: enPath, flag: "🇬🇧" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 200,         // au-dessus de la nav (z-index: 100)
        display: "flex",
        gap: 4,
        background: "rgba(8,13,26,0.85)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 10,
        padding: "4px 6px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
      }}
    >
      {langs.map(({ code, label, path, flag }) => {
        const isActive = code === currentLang;
        const isHov = hovered === code;
        return (
          <a
            key={code}
            href={path}
            onMouseEnter={() => setHovered(code)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 10px",
              borderRadius: 7,
              textDecoration: "none",
              fontSize: ".75rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: ".06em",
              transition: "all .2s",
              background: isActive
                ? "rgba(255,255,255,0.10)"
                : isHov
                ? "rgba(255,255,255,0.06)"
                : "transparent",
              color: isActive ? "#F1F5F9" : "#64748B",
              cursor: isActive ? "default" : "pointer",
            }}
            aria-current={isActive ? "page" : undefined}
          >
            <span style={{ fontSize: ".85rem" }}>{flag}</span>
            {label}
          </a>
        );
      })}
    </div>
  );
}
