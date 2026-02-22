"use client";

import Image from "next/image";
import { FC, memo } from "react";
import { useTheme } from "next-themes";

interface LogoProps {
  isMobileView?: boolean;
  className?: string;
}

const Logo: FC<LogoProps> = memo(({ isMobileView = false, className = "" }) => {
  const { theme, resolvedTheme } = useTheme();

  // Determine if dark mode is active
  const isDark = resolvedTheme === "dark";

  // Animation key for re-triggering
  const animationKey = isMobileView ? "small" : "full";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div key={animationKey}>
        {isMobileView ? (
          <Image
            src="/logos/full.png"
            alt="Logo"
            width={42}
            height={42}
            className={`w-[42px] h-[42px] object-contain drop-shadow-sm ${
              isDark ? "invert" : ""
            }`}
          />
        ) : (
          <Image
            src="/logos/full.png"
            alt="Company Logo"
            width={140}
            height={100}
            className={`w-[140px] h-[100px] object-contain drop-shadow-md ${
              isDark ? "invert" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
});

export default Logo;
Logo.displayName = "Logo";
