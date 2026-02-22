"use client";

import { BarChartProps } from "@/types/charts/barChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DEFAULT_COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
];

const BarChartComponent = ({
  labels,
  datasets,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  orientation = "vertical",
  stacked = false,
  xLabel,
  yLabel,
}: BarChartProps) => {
  const isHorizontal = orientation === "horizontal";

  const data = {
    labels,
    datasets: datasets.map((ds, idx) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor:
        ds.backgroundColor ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      borderColor: ds.borderColor ?? "transparent",
      borderWidth: ds.borderWidth ?? 0,
      borderRadius: ds.borderRadius ?? 6,
      borderSkipped: ds.borderSkipped ?? false,
    })),
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: isHorizontal ? "y" : "x",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          color: "#374151",
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked,
        grid: { display: isHorizontal },
        ticks: { color: "#6b7280" },
        title: xLabel
          ? { display: true, text: xLabel, color: "#6b7280" }
          : undefined,
      },
      y: {
        stacked,
        grid: { color: "#e5e7eb", display: !isHorizontal },
        ticks: { color: "#6b7280" },
        title: yLabel
          ? { display: true, text: yLabel, color: "#6b7280" }
          : undefined,
      },
    },
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height, background: backgroundColor }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
