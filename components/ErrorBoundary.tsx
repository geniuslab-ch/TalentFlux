"use client";
import React from "react";

interface Props { children: React.ReactNode; pageName?: string; }
interface State { hasError: boolean; error?: Error; }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[TalentFlux] Crash sur ${this.props.pageName ?? "page"}:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", background: "#080D1A", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40, fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ color: "#EF4444", fontSize: "2rem" }}>⚠️</div>
          <h1 style={{ color: "#F1F5F9", fontSize: "1.2rem", fontWeight: 700, textAlign: "center" }}>
            Une erreur est survenue
          </h1>
          <p style={{ color: "#64748B", fontSize: ".9rem", textAlign: "center", maxWidth: 400 }}>
            {this.state.error?.message ?? "Erreur inconnue"}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "10px 24px", borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#0EA5E9)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Recharger la page
          </button>
          <a href="/" style={{ color: "#38BDF8", fontSize: ".85rem" }}>← Retour à l'accueil</a>
        </div>
      );
    }
    return this.props.children;
  }
}
