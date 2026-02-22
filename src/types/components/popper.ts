import { Placement } from "@floating-ui/react";
import { ReactNode } from "react";

export interface PopperItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface PopperProps {
  items: PopperItem[];
  value?: string | null;
  onClick?: (value: PopperItem) => void;
  placeholder?: string;
  placement?: Placement;
  className?: string;
  children: ReactNode;
}
