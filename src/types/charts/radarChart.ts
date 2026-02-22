import { BaseChartProps } from "./baseChart";

export interface RadarDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  pointRadius?: number;
  pointBackgroundColor?: string;
}

export interface RadarChartProps extends BaseChartProps {
  labels: string[];
  datasets: RadarDataset[];
  /** Max value on the radial axis */
  maxValue?: number;
  fill?: boolean;
}
