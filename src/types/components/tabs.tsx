"use client";

import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}
