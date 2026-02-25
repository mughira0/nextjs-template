"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Star } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "var(--toggle-width)",
          height: "var(--toggle-height)",
        }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center justify-center rounded-full border-none bg-transparent p-0 outline-none"
      style={{ width: "var(--toggle-width)", height: "var(--toggle-height)" }}
    >
      {/* Track */}
      <div
        className="absolute rounded-full border transition-colors duration-300"
        style={{
          width: "var(--toggle-width)",
          height: "var(--toggle-height)",
          background: isDark
            ? "var(--toggle-track-dark)"
            : "var(--toggle-track-light)",
          borderColor: isDark
            ? "var(--toggle-track-border-dark)"
            : "var(--toggle-track-border-light)",
        }}
      />

      {/* Stars */}
      <div className="absolute w-full h-full pointer-events-none">
        {[
          { top: 6, left: 10 },
          { top: 14, left: 16 },
          { top: 8, left: 20 },
        ].map((pos, idx) => (
          <Star
            key={idx}
            size={3}
            className={`absolute text-[var(--toggle-star-color)] transition-opacity duration-[350ms]`}
            style={{
              top: pos.top,
              left: pos.left,
              opacity: isDark ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Thumb */}
      <div
        className="absolute flex items-center justify-center rounded-full shadow transition-all"
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
          transform: `translateX(${
            isDark
              ? `calc(var(--toggle-width) - var(--toggle-thumb-size) - var(--toggle-thumb-offset)*2)`
              : "0"
          })`,
          transition:
            "transform var(--toggle-transition), background var(--toggle-transition), box-shadow var(--toggle-transition)",
        }}
      >
        {/* Sun */}
        <Sun
          size={13}
          className="absolute transition-all"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark
              ? "rotate(90deg) scale(0.7)"
              : "rotate(0deg) scale(1)",
            color: "var(--toggle-icon-light)",
          }}
        />

        {/* Moon */}
        <Moon
          size={13}
          className="absolute transition-all"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark
              ? "rotate(0deg) scale(1)"
              : "rotate(-30deg) scale(0.7)",
            color: "var(--toggle-icon-dark)",
          }}
        />
      </div>
    </button>
  );
}
