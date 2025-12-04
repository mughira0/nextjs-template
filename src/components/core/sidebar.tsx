"use client";
import { FC, useState, useEffect, useMemo, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { toggleSidebar } from "@/redux/slices/common";
import { RoutesInterface, SidebarProps } from "@/types/components/sidebar";
import Routes from "@/routes";
import Logo from "./logo";
import { cn } from "@/helper/generic";

const isPathActive = (item: RoutesInterface, pathname: string): boolean => {
  // Direct match
  if (item.path === pathname) return true;

  // Check if pathname starts with item path (for nested routes)
  if (item.path && pathname.startsWith(item.path) && item.path !== "/")
    return true;

  // Recursively check children
  if (item.sub && item.sub.length > 0) {
    return item.sub.some((subItem) => isPathActive(subItem, pathname));
  }

  return false;
};

const getExpandedPaths = (
  routes: RoutesInterface[],
  pathname: string
): Set<string> => {
  const expanded = new Set<string>();

  const traverse = (items: RoutesInterface[]) => {
    items.forEach((item) => {
      if (isPathActive(item, pathname) && item.sub && item.sub.length > 0) {
        expanded.add(item.path || "");
        traverse(item.sub);
      }
    });
  };

  traverse(routes);
  return expanded;
};

const Sidebar: FC<SidebarProps> = ({ isMobileView }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state: any) => state.commonReducer);

  // Calculate which items should be expanded on mount and pathname change
  const expandedPaths = useMemo(
    () => getExpandedPaths(Routes, pathname),
    [pathname]
  );

  return (
    <aside className="w-full bg-[var(--sidebar-bg)] h-full border-[var(--sidebar-border)] shadow-[var(--sidebar-shadow)] rounded-[var(--sidebar-radius)] p-4 flex flex-col gap-0.5">
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-center relative mb-4">
        <Logo isMobileView={sidebarCollapsed} />
        {!isMobileView && (
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="cursor-pointer bg-[var(--main-color)] h-[22px] w-[22px] flex items-center justify-center rounded-full absolute right-[-25px] top-[60px] hover:scale-110 transition-transform"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? (
              <ArrowRight size={16} color="var(--white-color)" />
            ) : (
              <ArrowLeft size={16} color="var(--white-color)" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 gap-1 h-full overflow-y-auto" role="navigation">
        {Routes?.map((route, i) => (
          <SidebarItem
            key={route.path || i}
            item={route}
            pathname={pathname}
            expandedPaths={expandedPaths}
            level={0}
            sidebarCollapsed={sidebarCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

interface SidebarItemProps {
  item: RoutesInterface;
  pathname: string;
  expandedPaths: Set<string>;
  level: number;
  sidebarCollapsed?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  item,
  pathname,
  expandedPaths,
  level,
  sidebarCollapsed,
}) => {
  const { icon, title = "", sub = [], path = "" } = item;

  // Check if this item or any child is active
  const isActive = isPathActive(item, pathname);
  const hasSub = sub.length > 0;

  // Initialize open state based on whether this path should be expanded
  const [isOpen, setIsOpen] = useState(() => expandedPaths.has(path));

  // Update open state when pathname changes
  useEffect(() => {
    if (expandedPaths.has(path)) {
      setIsOpen(true);
    }
  }, [expandedPaths, path]);

  const handleToggle = () => {
    if (hasSub) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasSub && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  const itemClasses = cn(
    "flex items-center justify-between gap-3 p-2 rounded-md cursor-pointer text-sm transition-all duration-200 group",
    isActive
      ? "bg-[var(--sidebar-item-hover-bg)] text-[var(--sidebar-item-active-text)]"
      : "text-[var(--sidebar-item-text)] hover:bg-[var(--sidebar-item-hover-bg)] hover:text-[var(--sidebar-item-hover-text)]"
  );

  const iconClasses = cn(
    "flex-shrink-0 transition-colors",
    isActive
      ? "text-[var(--sidebar-item-active-icon)]"
      : "text-[var(--sidebar-item-icon)]",
    "group-hover:text-[var(--sidebar-item-hover-text)]"
  );

  const chevronClasses = cn(
    "transition-transform duration-200",
    isOpen ? "rotate-180" : "rotate-0",
    isActive
      ? "text-[var(--sidebar-item-active-icon)]"
      : "text-[var(--sidebar-item-icon)]",
    "group-hover:text-[var(--sidebar-item-hover-text)]"
  );

  const submenuClasses = cn(
    "flex flex-col mt-1 border-[var(--sidebar-item-icon)]/10",
    sidebarCollapsed ? "border-l" : "pl-2 border-l-2"
  );

  return (
    <div
      className={cn("flex flex-col", level > 0 && !sidebarCollapsed && "ml-2")}
    >
      {/* Use a <button> instead of <div> for native interactivity when hasSub is true */}
      {hasSub ? (
        <button
          type="button" // Explicitly non-submit
          className={cn(
            itemClasses,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-item-active-icon)] focus-visible:ring-offset-2"
          )}
          aria-expanded={isOpen}
          aria-controls={`submenu-${path}`} // Link to submenu ID for screen readers
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <Link
            href={path || "#"}
            className="flex items-center gap-3 flex-1"
            title={sidebarCollapsed ? title : undefined}
            onClick={(e) => {
              // Prevent link navigation if it's just a toggle
              e.preventDefault();
              e.stopPropagation();
            }}
            tabIndex={-1} // Make the button the focusable element, not the link
          >
            {icon && (
              <span className={iconClasses}>
                {cloneElement(
                  icon as React.ReactElement,
                  { size: 16 } as { size: number }
                )}
              </span>
            )}
            {!sidebarCollapsed && (
              <span className="truncate text-[13px]">{title}</span>
            )}
          </Link>

          {!sidebarCollapsed && (
            <span aria-hidden="true">
              {" "}
              {/* Visual indicator, not interactive */}
              <ChevronDown size={14} className={chevronClasses} />
            </span>
          )}
        </button>
      ) : (
        <div className={itemClasses}>
          <Link
            href={path || "#"}
            className="flex items-center gap-3 flex-1"
            title={sidebarCollapsed ? title : undefined}
          >
            {icon && (
              <span className={iconClasses}>
                {cloneElement(
                  icon as React.ReactElement,
                  { size: 16 } as { size: number }
                )}
              </span>
            )}
            {!sidebarCollapsed && (
              <span className="truncate text-[13px]">{title}</span>
            )}
          </Link>
        </div>
      )}

      {/* Submenu */}
      {hasSub && isOpen && (
        <div id={`submenu-${path}`} className={submenuClasses}>
          {sub.map((subItem, index) => (
            <SidebarItem
              key={subItem.path || index}
              item={subItem}
              pathname={pathname}
              expandedPaths={expandedPaths}
              level={level + 1}
              sidebarCollapsed={sidebarCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};
