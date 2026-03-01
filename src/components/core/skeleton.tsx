"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "var(--field-radius)",
  background = "var(--table-skeleton-bg)",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background,
        ...style,
      }}
    />
  );
};

export default Skeleton;
