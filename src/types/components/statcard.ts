import { ReactNode } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "primary-bordered" | "secondary-bordered";
}
