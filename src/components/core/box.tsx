"use client";

import { cn } from "@/helper/generic";
import * as React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--card)] p-3 shadow-md rounded-[var(--field-radius)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Box.displayName = "Box";
