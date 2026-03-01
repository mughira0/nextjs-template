"use client";

import { KEYFRAMES, styles } from "@/baseStyles/modal.styles";
import { IModalSkeletonProps } from "@/types/modal";
import { X } from "lucide-react";
import React, { useCallback, useEffect } from "react";

const ModalSkeleton: React.FC<IModalSkeletonProps> = ({
  show,
  setShow,
  children,
  width = "600px",
  borderRadius = "12px",
  header,
  showCross = true,
  footer,
}) => {
  injectKeyframes();

  const close = useCallback(() => setShow(false), [setShow]);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, close]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (!show) return null;

  const hasHeader = header || showCross;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={"Modal"}
      style={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div style={styles.modal(width, borderRadius)}>
        {/* Header */}
        {hasHeader && (
          <div style={styles.header}>
            {header && (
              <h2 style={styles.headerTitle}>
                <span style={styles.headerTitleAccent} />
                {header}
              </h2>
            )}

            {!header && <span style={{ flex: 1 }} />}

            {showCross && (
              <button
                type="button"
                aria-label="Close modal"
                style={styles.closeButton}
                onClick={close}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = "oklch(0.62 0.22 275 / 0.08)";
                  btn.style.color = "var(--main-color, oklch(0.62 0.22 275))";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.backgroundColor = "transparent";
                  btn.style.color =
                    "var(--secondary-text-color, oklch(45% 0.03 260))";
                }}
              >
                <X size={18} color="var(--main-color)" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={styles.content}>{children}</div>
        {footer && <div style={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default ModalSkeleton;

let keyframesInjected = false;

const injectKeyframes = () => {
  if (typeof document === "undefined" || keyframesInjected) return;
  const style = document.createElement("style");
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  keyframesInjected = true;
};
