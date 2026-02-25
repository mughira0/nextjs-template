import { ReactNode } from "react";

export interface HeadingProps {
  title: ReactNode;
  description?: ReactNode;
  tags?: string[];
  className?: string;
}
