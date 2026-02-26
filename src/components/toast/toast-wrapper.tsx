"use client";

import { positionStyles, variantConfig } from "@/baseStyles/toast.styles";
import {
  ToastCardProps,
  ToasterProps,
  ToastItem,
} from "@/types/components/toast";
import { X } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { isBottom, remove, subscribe } from "./toast";

const ToastCard: FC<ToastCardProps> = ({ toast, position, index }) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cfg = variantConfig[toast.variant];
  const Icon = cfg.icon;
  const bottom = isBottom(position);

  // entry
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // progress bar
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (toast.duration <= 0) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / toast.duration) * 100);
      setProgress(pct);
      if (pct > 0) timerRef.current = setTimeout(tick, 30);
    };
    timerRef.current = setTimeout(tick, 30);
    return () =>
      clearTimeout(timerRef.current as ReturnType<typeof setTimeout>);
  }, [toast.duration]);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => remove(toast.id), 320);
  };

  const stackOffset = index * 6;
  const stackScale = 1 - index * 0.03;

  const translateY =
    !visible || exiting
      ? bottom
        ? "24px"
        : "-24px"
      : `${bottom ? -stackOffset : stackOffset}px`;

  return (
    <div
      style={{
        position: "absolute",
        width: 340,
        transform: `translateY(${translateY}) scale(${exiting ? 0.92 : stackScale})`,
        opacity: visible && !exiting ? 1 - index * 0.08 : 0,
        transition:
          "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease",
        zIndex: visible && !exiting ? 100 - index : -10000,
        pointerEvents: index === 0 ? "auto" : "none",
        [bottom ? "bottom" : "top"]: 0,
      }}
    >
      <div
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderRadius: "var(--global-radius, 10px)",
          boxShadow: `0 4px 24px oklch(0% 0 0 / 0.10), 0 1px 4px oklch(0% 0 0 / 0.06)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Content row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              width: 3,
              alignSelf: "stretch",
              borderRadius: 99,
              background: cfg.accent,
              flexShrink: 0,
            }}
          />

          <Icon
            size={18}
            strokeWidth={2}
            style={{ color: cfg.accent, flexShrink: 0, marginTop: 1 }}
          />

          <span
            style={{
              flex: 1,
              fontSize: 13.5,
              fontWeight: 500,
              lineHeight: 1.45,
              color: cfg.text,
            }}
          >
            {toast.message}
          </span>

          <button
            onClick={dismiss}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              color: cfg.text,
              opacity: 0.5,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            aria-label="Dismiss"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Progress bar */}
        {toast.duration > 0 && (
          <div
            style={{
              height: 2.5,
              background: cfg.border,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: cfg.accent,
                borderRadius: 99,
                transition: "width 30ms linear",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Toaster container ────────────────────────────────────────────────────────

export const Toaster: FC<ToasterProps> = ({
  position = "top-right",
  maxVisible = 4,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => subscribe(setToasts), []);

  const visible = toasts.slice(0, maxVisible);

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        zIndex: visible.length > 0 ? 9999 : -10000,

        ...positionStyles[position],
      }}
      aria-live="polite"
      aria-label="Notifications"
    >
      <div style={{ position: "relative", width: 340, height: 80 }}>
        {[...visible].reverse().map((t, i) => {
          const stackIndex = visible.length - 1 - i;
          return (
            <div key={t.id}>
              <ToastCard
                key={t.id}
                toast={t}
                position={position}
                index={stackIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toaster;
