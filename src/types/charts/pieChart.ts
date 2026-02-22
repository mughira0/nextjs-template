import { BaseChartProps } from "./baseChart";

export interface PieChartProps extends BaseChartProps {
  labels: string[];
  data: number[];
  backgroundColors?: string[];
  borderColors?: string[];
  borderWidth?: number;
  /** Show data labels as percentages */
  showPercentages?: boolean;
}

export interface DonutChartProps extends PieChartProps {
  /** 0–100, percentage of chart radius that becomes the cutout. Default: 60 */
  cutoutPercent?: number;
  /** Optional text to display in the center */
  centerLabel?: string;
  /** Optional number to display below centerLabel */
  centerValue?: string | number;
}
