import { ToastPosition } from "@/types/components/toast";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import React from "react";

export const positionStyles: Record<ToastPosition, React.CSSProperties> = {
  "top-left": { top: 16, left: 16, alignItems: "flex-start" },
  "top-center": {
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    alignItems: "center",
  },
  "top-right": { top: 16, right: 16, alignItems: "flex-end" },
  "bottom-left": { bottom: 16, left: 16, alignItems: "flex-start" },
  "bottom-center": {
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    alignItems: "center",
  },
  "bottom-right": { bottom: 16, right: 16, alignItems: "flex-end" },
};

export const variantConfig = {
  success: {
    icon: CheckCircle2,
    accent: "oklch(0.62 0.18 155)",
    bg: "var(--card)",
    border: "oklch(0.82 0.1 155)",
    text: "var(--primary-text-color)",
  },
  error: {
    icon: XCircle,
    accent: "oklch(0.58 0.22 28)",
    bg: "var(--card)",
    border: "oklch(0.82 0.12 28)",
    text: "var(--primary-text-color)",
  },
  warning: {
    icon: AlertTriangle,
    accent: "oklch(0.72 0.18 80)",
    bg: "var(--card)",
    border: "oklch(0.86 0.1 80)",
    text: "var(--primary-text-color)",
  },
};
