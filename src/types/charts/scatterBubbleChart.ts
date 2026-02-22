import { BaseChartProps } from "./baseChart";

// ---------- Scatter ----------
export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterDataset {
  label: string;
  data: ScatterPoint[];
  backgroundColor?: string;
  borderColor?: string;
  pointRadius?: number;
  borderWidth?: number;
}

export interface ScatterChartProps extends BaseChartProps {
  datasets: ScatterDataset[];
  xLabel?: string;
  yLabel?: string;
}

// ---------- Bubble ----------
export interface BubblePoint {
  x: number;
  y: number;
  /** Controls visual bubble size */
  r: number;
}

export interface BubbleDataset {
  label: string;
  data: BubblePoint[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export interface BubbleChartProps extends BaseChartProps {
  datasets: BubbleDataset[];
  xLabel?: string;
  yLabel?: string;
}
