// components/Logo.tsx
"use client";

import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";

interface LogoProps {
  isMobileView?: boolean;
  className?: string;
}

const Logo: FC<LogoProps> = memo(({ isMobileView = false, className = "" }) => {
  // This key change will properly re-trigger the fade-in animation when switching
  const animationKey = isMobileView ? "small" : "full";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        key={animationKey} // Perfect: changes when isMobileView changes → re-animates
        className=""
      >
        {isMobileView ? (
          <Image
            src="/logos/full.png"
            alt="Logo"
            width={42}
            height={42}
            className="w-[42px] h-[42px]  object-contain drop-shadow-sm"
          />
        ) : (
          <Image
            src="/logos/full.png"
            alt="Company Logo"
            width={140}
            height={100}
            className="w-[140px] h-[100px] object-contain drop-shadow-md"
          />
        )}
      </div>
    </div>
  );
});

export default Logo;
