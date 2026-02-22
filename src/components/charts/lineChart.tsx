"use client";

import { LineChartProps } from "@/types/charts/lineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const LineChartComponent = ({
  labels,
  datasets,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  fill = true,
}: LineChartProps) => {
  const data = {
    labels,
    datasets: datasets.map((ds) => {
      const borderColor = ds.borderColor ?? "#2563eb";

      // Helper to convert hex to rgba
      const hexToRgba = (hex: string, alpha: number): string => {
        const cleaned = hex.replace("#", "");
        const r = parseInt(cleaned.substr(0, 2), 16);
        const g = parseInt(cleaned.substr(2, 2), 16);
        const b = parseInt(cleaned.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      console.log(ds.tension, "ds.tension");

      return {
        label: ds.label,
        data: ds.data,
        borderColor,
        borderWidth: ds.borderWidth ?? 2,
        tension: ds.tension || ds.tension == 0 ? ds.tension : 0.4,
        pointRadius: ds.pointRadius ?? 4,
        fill: fill,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // Fallback solid color if chartArea not ready (fixes TS error)
          if (!chartArea) {
            return ds.backgroundColor ?? hexToRgba(borderColor, 0.35);
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          const topColor = ds.backgroundColor ?? hexToRgba(borderColor, 0.35);

          gradient.addColorStop(0, topColor);
          gradient.addColorStop(1, hexToRgba(borderColor, 0)); // transparent bottom

          return gradient;
        },
      };
    }),
  };

  const options: ChartOptions<"line"> = {
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
        grid: { display: false },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#6b7280" },
      },
    },
  };

  return (
    <div
      className={`relative w-full rounded-xl bg-[${backgroundColor}]   ${className}`}
      style={{ height }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
