"use client";

import { DonutChartProps } from "@/types/charts/pieChart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

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

const DonutChartComponent = ({
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
  cutoutPercent = 60,
  centerLabel,
  centerValue,
}: DonutChartProps) => {
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

  /** Plugin to draw center text */
  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    afterDraw(chart) {
      if (!centerLabel && centerValue === undefined) return;
      const { ctx, chartArea } = chart;
      const cx = (chartArea.left + chartArea.right) / 2;
      const cy = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();

      if (centerValue !== undefined) {
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#111827";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(centerValue), cx, centerLabel ? cy - 10 : cy);
      }

      if (centerLabel) {
        ctx.font = "13px sans-serif";
        ctx.fillStyle = "#6b7280";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(centerLabel, cx, centerValue !== undefined ? cy + 14 : cy);
      }

      ctx.restore();
    },
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: `${cutoutPercent}%`,
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
      className={`relative w-full ${className}`}
      style={{ height, background: backgroundColor }}
    >
      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default DonutChartComponent;
