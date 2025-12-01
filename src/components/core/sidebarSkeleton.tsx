"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarSkeletonProps } from "@/types/components/sidebar";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./sidebar";
import Header from "./header";

const SidebarSkeleton: FC<SidebarSkeletonProps> = ({ children }) => {
  const { sidebarCollapsed } = useSelector((state: any) => state.commonReducer);
  const isMobile = useIsMobile();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarWidth = sidebarCollapsed
    ? "var(--sidebar-collapsed-width)"
    : "var(--sidebar-expanded-width)";

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen bg-var(--app-bg)">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className="flex-shrink-0 transition-all duration-300 ease-in-out p-2"
          style={{ width: sidebarWidth }}
        >
          <Sidebar isMobileView={false} />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <>
          {/* Backdrop with blur effect */}
          <div
            className={`
              fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
              transition-opacity duration-300 ease-in-out
              ${
                mobileSidebarOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            `}
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Sidebar sliding panel */}
          <div
            className={`
              fixed top-0 left-0 z-50 h-full p-2
              transition-transform duration-300 ease-in-out
              ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            style={{ width: "var(--sidebar-expanded-width)" }}
          >
            <Sidebar isMobileView />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="p-2">
          <Header
            isMobileView={isMobile}
            onMobileSidebarToggle={() => setMobileSidebarOpen((prev) => !prev)}
          />
        </div>
        <div className="flex-1 h-full overflow-y-auto p-2 pr-2.5 scrollbar-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
