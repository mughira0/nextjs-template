"use client";
import { HeaderProps } from "@/types/components/sidebar";
import { FC } from "react";

const Header: FC<HeaderProps> = ({ isMobileView, onMobileSidebarToggle }) => {
  return (
    <aside className="w-full bg-[var(--header-bg)] h-fit border-[var(--header-border)] shadow-[var(--header-shadow)] rounded-[var(--header-radius)] p-1 flex gap-0.5">
      {isMobileView && (
        <h1 className="text-lg font-semibold" onClick={onMobileSidebarToggle}>
          Mobile Header
        </h1>
      )}
    </aside>
  );
};

export default Header;
