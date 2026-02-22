"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div
        style={{
          width: "var(--toggle-width)",
          height: "var(--toggle-height)",
        }}
      />
    );

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group cursor-pointer border-none bg-transparent p-0 outline-offset-3 focus-visible:outline-2 focus-visible:outline-[var(--main-color)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Track */}
      <span
        className="relative flex shrink-0 overflow-hidden rounded-full border-[1.5px] transition-colors duration-300"
        style={{
          width: "var(--toggle-width)",
          height: "var(--toggle-height)",
          background: isDark
            ? "var(--toggle-track-dark)"
            : "var(--toggle-track-light)",
          borderColor: isDark
            ? "var(--toggle-track-border-dark)"
            : "var(--toggle-track-border-light)",
          transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Stars — only visible in dark */}
        <span
          className="pointer-events-none absolute rounded-full transition-opacity delay-[50ms]"
          style={{
            width: 3,
            height: 3,
            top: 6,
            left: 10,
            background: "var(--toggle-star-color)",
            opacity: isDark ? 1 : 0,
          }}
        />
        <span
          className="pointer-events-none absolute rounded-full transition-opacity delay-100"
          style={{
            width: 2,
            height: 2,
            top: 14,
            left: 16,
            background: "var(--toggle-star-color)",
            opacity: isDark ? 1 : 0,
          }}
        />
        <span
          className="pointer-events-none absolute rounded-full transition-opacity delay-150"
          style={{
            width: 2,
            height: 2,
            top: 8,
            left: 20,
            background: "var(--toggle-star-color)",
            opacity: isDark ? 1 : 0,
          }}
        />

        {/* Thumb */}
        <span
          className="absolute z-10 flex items-center justify-center rounded-full transition-all"
          style={{
            top: "var(--toggle-thumb-offset)",
            left: "var(--toggle-thumb-offset)",
            width: "var(--toggle-thumb-size)",
            height: "var(--toggle-thumb-size)",
            background: isDark
              ? "var(--toggle-thumb-dark)"
              : "var(--toggle-thumb-light)",
            boxShadow: isDark
              ? "var(--toggle-thumb-shadow-dark)"
              : "var(--toggle-thumb-shadow-light)",
            transform: isDark
              ? "translateX(calc(var(--toggle-width) - var(--toggle-thumb-size) - var(--toggle-thumb-offset) * 2))"
              : "translateX(0)",
            transitionDuration: "0.35s",
            transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Sun */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute transition-all duration-[250ms]"
            style={{
              width: 13,
              height: 13,
              color: "var(--toggle-icon-light)",
              opacity: isDark ? 0 : 1,
              transform: isDark
                ? "rotate(90deg) scale(0.7)"
                : "rotate(0deg) scale(1)",
            }}
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Moon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute transition-all duration-[250ms]"
            style={{
              width: 13,
              height: 13,
              color: "var(--toggle-icon-dark)",
              opacity: isDark ? 1 : 0,
              transform: isDark
                ? "rotate(0deg) scale(1)"
                : "rotate(-30deg) scale(0.7)",
            }}
          >
            <path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}
