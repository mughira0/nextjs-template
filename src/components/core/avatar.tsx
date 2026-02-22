"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/helper/generic";

type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
  size?: number;
  isOnline?: boolean;
  className?: string;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt = "Avatar", fallback, size = 40, isOnline = false, className },
    ref,
  ) => {
    const [error, setError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-full bg-muted flex items-center justify-center shrink-0",
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
            className="object-cover rounded-full"
          />
        ) : (
          <div className="flex h-full rounded-full bg-gray-200 border border-gray-300 overflow-hidden w-full items-center justify-center text-xs font-medium text-muted-foreground">
            {fallback ?? alt.charAt(0).toUpperCase()}
          </div>
        )}
        <span
          className={cn(
            "absolute top-0 left-0 size-2 rounded-full ring-2 ring-[var(--chat-header-bg)]",
            isOnline ? "bg-green-500" : "bg-gray-400",
          )}
        />
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
