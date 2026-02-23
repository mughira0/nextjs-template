"use client";

import React from "react";

interface NoDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const NoData: React.FC<NoDataProps> = ({
  title = "No data found",
  description = "There is nothing to show here yet.",
  icon = "📭",
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        gap-2 py-10 px-4 text-center
        bg-[var(--card)]
        ${className}
      `}
    >
      {/* Icon */}
      <div className="text-3xl text-[var(--main-color)]">{icon}</div>

      {/* Title */}
      <p className="text-sm font-semibold text-[var(--primary-text-color)]">
        {title}
      </p>

      {/* Description */}
      <p className="text-xs text-[var(--secondary-text-color)] max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default NoData;
