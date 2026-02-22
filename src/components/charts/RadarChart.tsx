"use client";

import { cn } from "@/helper/generic";
import { RadarChartProps } from "@/types/charts/radarChart";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const hexToRgba = (hex: string, alpha: number): string => {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substr(0, 2), 16);
  const g = parseInt(cleaned.substr(2, 2), 16);
  const b = parseInt(cleaned.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const DEFAULT_COLORS = ["#2563eb", "#16a34a", "#dc2626", "#d97706", "#7c3aed"];

const RadarChartComponent = ({
  labels,
  datasets,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  maxValue,
  fill = true,
}: RadarChartProps) => {
  const chartData = {
    labels,
    datasets: datasets.map((ds, idx) => {
      const color =
        ds.borderColor ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      return {
        label: ds.label,
        data: ds.data,
        borderColor: color,
        borderWidth: ds.borderWidth ?? 2,
        backgroundColor: fill
          ? (ds.backgroundColor ?? hexToRgba(color, 0.2))
          : "transparent",
        pointRadius: ds.pointRadius ?? 4,
        pointBackgroundColor: ds.pointBackgroundColor ?? color,
        fill,
      };
    }),
  };

  const options: ChartOptions<"radar"> = {
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
      },
    },
    scales: {
      r: {
        max: maxValue,
        grid: { color: "#e5e7eb" },
        angleLines: { color: "#e5e7eb" },
        ticks: { color: "#6b7280", backdropColor: "transparent" },
        pointLabels: { color: "#374151" },
      },
    },
  };

  return (
    <div
      className={cn(`relative w-full`, className)}
      style={{ height, background: backgroundColor }}
    >
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChartComponent;
