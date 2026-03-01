"use client";

import { tabsBase } from "@/baseStyles/tabs.styles";
import { cn } from "@/helper/generic";
import { TabItem, TabPanelProps, TabsProps } from "@/types/components/tabs";
import React, { FC, useState, useRef, useEffect } from "react";

const Tabs: FC<TabsProps> = ({
  tabs,
  value: controlledValue,
  onChange,
  variant = "primary",
  size = "sm",
  className = "",
  fullWidth = false,
  children,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(tabs[0]?.value ?? "");
  const active = isControlled ? controlledValue : internalValue;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const styles = tabsBase.variants[variant];
  const sizeConfig = tabsBase.sizes[size];

  // Move the sliding indicator
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const activeEl = activeRef.current;
    if (!wrapper || !activeEl) return;

    const wRect = wrapper.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      width: aRect.width,
      height: aRect.height,
      transform: `translateX(${aRect.left - wRect.left - 4}px)`, // 4 = wrapper p-1
    });
  }, [active, tabs]);

  const handleClick = (tab: TabItem) => {
    if (tab.disabled) return;
    if (!isControlled) setInternalValue(tab.value);
    onChange?.(tab.value);
  };

  // Find the active panel child
  const activePanel = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.props as { value?: string }).value === active,
  );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        ref={wrapperRef}
        role="tablist"
        className={cn(styles.wrapper, fullWidth ? "w-full" : "w-fit")}
      >
        <div
          aria-hidden
          className={cn(
            "absolute top-1 left-1 rounded-[calc(var(--btn-radius)-2px)]",
            "transition-all duration-250 ease-[cubic-bezier(0.35,0,0.25,1)]",
            "shadow-[0_1px_3px_oklch(0%_0_0_/_0.18)]",
            styles.indicator,
          )}
          style={indicatorStyle}
        />

        {/* Tabs */}
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <button
              key={tab.value}
              ref={isActive ? activeRef : undefined}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => handleClick(tab)}
              className={cn(
                sizeConfig.padding,
                sizeConfig.font,
                styles.tab.base,
                isActive && styles.tab.active,
                isActive &&
                  "hover:bg-transparent hover:text-[var(--white-color)]",
                fullWidth && "flex-1",
              )}
            >
              {tab.icon && (
                <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab panel ── */}
      {activePanel && (
        <div
          role="tabpanel"
          key={active}
          className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200"
        >
          {activePanel}
        </div>
      )}
    </div>
  );
};

export const TabPanel: FC<TabPanelProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Tabs;
