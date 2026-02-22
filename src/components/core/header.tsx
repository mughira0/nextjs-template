"use client";
import { HeaderProps } from "@/types/components/sidebar";
import { FC } from "react";
import { ThemeToggle } from "./theme-toggle";

const Header: FC<HeaderProps> = ({ isMobileView, onMobileSidebarToggle }) => {
  return (
    <aside className="w-full h-12 bg-[var(--header-bg)] shadow-[var(--header-shadow)] border-[var(--header-border)] rounded-[var(--header-radius)] p-1 flex gap-0.5">
      {isMobileView && (
        <h1 className="text-lg font-semibold" onClick={onMobileSidebarToggle}>
          Mobile Header
        </h1>
      )}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default Header;
