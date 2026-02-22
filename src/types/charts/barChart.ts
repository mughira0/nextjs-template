import { BaseChartProps } from "./baseChart";

export interface BarDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number;
  borderSkipped?: boolean;
}

export interface BarChartProps extends BaseChartProps {
  labels: string[];
  datasets: BarDataset[];
  /** "vertical" (default) or "horizontal" */
  orientation?: "vertical" | "horizontal";
  /** Stack bars on top of each other */
  stacked?: boolean;
  xLabel?: string;
  yLabel?: string;
}
