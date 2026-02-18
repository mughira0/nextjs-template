"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/helper/generic";

type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  size?: number;
  className?: string;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = "Avatar", fallback, size = 40, className }, ref) => {
    console.log("Avatar props:", { src, alt, fallback, size, className });
    const [error, setError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-muted flex items-center justify-center shrink-0",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {src && !error ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${size}px`}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full bg-gray-200 border border-gray-300 overflow-hidden w-full items-center justify-center text-xs font-medium text-muted-foreground">
            {fallback ?? alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
