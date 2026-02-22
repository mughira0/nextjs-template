"use client";

import { ScatterChartProps } from "@/types/charts/scatterBubbleChart";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const DEFAULT_COLORS = ["#2563eb", "#16a34a", "#dc2626", "#d97706", "#7c3aed"];

const ScatterChartComponent = ({
  datasets,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  xLabel,
  yLabel,
}: ScatterChartProps) => {
  const chartData = {
    datasets: datasets.map((ds, idx) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor:
        ds.backgroundColor ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
      borderColor: ds.borderColor ?? "transparent",
      pointRadius: ds.pointRadius ?? 6,
      borderWidth: ds.borderWidth ?? 0,
    })),
  };

  const options: ChartOptions<"scatter"> = {
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
          label: (ctx) =>
            ` ${ctx.dataset.label}: (${ctx.parsed.x}, ${ctx.parsed.y})`,
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
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default ScatterChartComponent;
