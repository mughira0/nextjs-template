// ─── Styles ───────────────────────────────────────────────────────────────────

export const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(18, 16, 38, 0.55)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    padding: "16px",
    animation: "overlayFadeIn 0.2s ease forwards",
  },
  modal: (width: string, borderRadius: string) => ({
    position: "relative" as const,
    width: "100%",
    maxWidth: width,
    backgroundColor: "var(--background-color)",
    borderRadius: borderRadius,
    boxShadow:
      "0 8px 32px oklch(18% 0.02 260 / 0.12), 0 2px 8px oklch(18% 0.02 260 / 0.08)",
    border: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column" as const,
    maxHeight: "90vh",
    overflow: "hidden",
    animation: "modalSlideIn 0.25s cubic-bezier(0.34, 1.1, 0.64, 1) forwards",
  }),
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px 10px",
    backgroundColor: "var(--sidebar-bg)",
    borderBottom: "1px solid var(--border-color)",
    flexShrink: 0,
    gap: "12px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 600,
    lineHeight: 1.3,
    color: "var(--primary-text-color, oklch(18% 0.02 260))",
    letterSpacing: "-0.01em",
    flex: 1,
  },
  headerTitleAccent: {
    display: "inline-block",
    width: "4px",
    height: "16px",
    borderRadius: "2px",
    marginRight: "10px",
    flexShrink: 0,
    verticalAlign: "middle",
    position: "relative" as const,
    top: "-1px",
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "var(--global-radius, 10px)",
    border: "none",
    backgroundColor: "transparent",
    color: "var(--secondary-text-color, oklch(45% 0.03 260))",
    cursor: "pointer",
    flexShrink: 0,
    transition: "background-color 0.15s ease, color 0.15s ease",
    padding: 0,
    lineHeight: 1,
  },
  content: {
    padding: "24px",
    overflowY: "auto" as const,
    naxHeight: "calc(100vh - 200px)",
    flex: 1,
    backgroundColor: "var(--background-color)",
    color: "var(--primary-text-color, oklch(18% 0.02 260))",
  },
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--sidebar-bg)",

    gap: "12px",
  },
};

// ─── Keyframe injection ───────────────────────────────────────────────────────

export const KEYFRAMES = `
  @keyframes overlayFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalSlideIn {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
