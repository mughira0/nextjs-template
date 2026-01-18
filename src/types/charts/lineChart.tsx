export interface LineChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string; // Optional override for top gradient color
  tension?: number;
  borderWidth?: number;
  pointRadius?: number;
}

export interface LineChartProps {
  labels: string[];
  datasets: LineChartDataset[];
  height?: number;
  showLegend?: boolean;
  className?: string;
  fill?: boolean;
  backgroundColor?: string;
}
