"use client";

import { BubbleChartProps } from "@/types/charts/scatterBubbleChart";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const DEFAULT_COLORS_RGBA = [
  "rgba(37, 99, 235, 0.6)",
  "rgba(22, 163, 74, 0.6)",
  "rgba(220, 38, 38, 0.6)",
  "rgba(217, 119, 6, 0.6)",
  "rgba(124, 58, 237, 0.6)",
];

const BubbleChartComponent = ({
  datasets,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  xLabel,
  yLabel,
}: BubbleChartProps) => {
  const chartData = {
    datasets: datasets.map((ds, idx) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor:
        ds.backgroundColor ??
        DEFAULT_COLORS_RGBA[idx % DEFAULT_COLORS_RGBA.length],
      borderColor: ds.borderColor ?? "transparent",
      borderWidth: ds.borderWidth ?? 0,
    })),
  };

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        labels: { color: "#374151", boxWidth: 12 },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const { x, y, r } = ctx.raw as { x: number; y: number; r: number };
            return ` ${ctx.dataset.label}: (${x}, ${y}) r=${r}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#6b7280" },
        title: xLabel
          ? { display: true, text: xLabel, color: "#6b7280" }
          : undefined,
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#6b7280" },
        title: yLabel
          ? { display: true, text: yLabel, color: "#6b7280" }
          : undefined,
      },
    },
  };

  return (
    <div
      className={`relative w-full  ${className}`}
      style={{ height, background: backgroundColor }}
    >
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChartComponent;
