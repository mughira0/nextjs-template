"use client";

import { cn } from "@/helper/generic";
import { PieChartProps } from "@/types/charts/pieChart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#ea580c",
  "#0284c7",
];

const PieChartComponent = ({
  labels,
  data,
  backgroundColors,
  borderColors,
  borderWidth = 2,
  height = 300,
  showLegend = true,
  className = "",
  backgroundColor = "var(--chart-bg)",
  showPercentages = false,
}: PieChartProps) => {
  const total = data.reduce((sum, v) => sum + v, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor:
          backgroundColors ?? DEFAULT_COLORS.slice(0, data.length),
        borderColor: borderColors ?? Array(data.length).fill("#ffffff"),
        borderWidth,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "right" as const,
        labels: {
          color: "#374151",
          boxWidth: 12,
          padding: 16,
          generateLabels: showPercentages
            ? (chart) => {
                const dataset = chart.data.datasets[0];
                return (chart.data.labels as string[]).map((label, i) => ({
                  text: `${label} (${((data[i] / total) * 100).toFixed(1)}%)`,
                  fillStyle: (dataset.backgroundColor as string[])[i],
                  strokeStyle: "#ffffff",
                  lineWidth: 1,
                  index: i,
                  hidden: false,
                  fontColor: "#374151",
                }));
              }
            : undefined,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed;
            const pct = ((val / total) * 100).toFixed(1);
            return ` ${ctx.label}: ${val} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div
      className={cn(className, `relative w-full `)}
      style={{ height, background: backgroundColor }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;
