"use client";

import BarChartComponent from "@/components/charts/BarChart";
import BubbleChartComponent from "@/components/charts/BubbleChart";
import DonutChartComponent from "@/components/charts/DonutChart";
import LineChartComponent from "@/components/charts/lineChart";
import PieChartComponent from "@/components/charts/PieChart";
import RadarChartComponent from "@/components/charts/RadarChart";
import ScatterChartComponent from "@/components/charts/ScatterChart";
import { Box } from "@/components/core/box";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// ─── Shared data ──────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#db2777",
];

// ─── Card wrapper (matches the HTML .card structure) ──────────────────────────
interface CardProps {
  title: string;
  badge: string;
  children: React.ReactNode;
}

const Card = ({ title, badge, children }: CardProps) => (
  <Box>
    <div className="flex items-center justify-between mb-5">
      <span className="text-[0.95rem] font-semibold text-primary-900">
        {title}
      </span>
      <span className="font-mono text-[0.7rem] bg-blue-50 text-blue-600 border border-blue-200 rounded-md px-2 py-0.5">
        {badge}
      </span>
    </div>
    {children}
  </Box>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ChartLibraryPreview() {
  return (
    <SidebarSkeleton>
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-semibold  text-primary">
          Chart Component Library
        </h1>
        <p className="text-secondary text-[0.95rem]">
          All chart types — consistent props structure, built on Chart.js
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* ── LINE ── */}
        <Card title="Line Chart" badge="LineChartComponent">
          <LineChartComponent
            height={260}
            showLegend={false}
            labels={MONTHS}
            fill={false}
            datasets={[
              {
                label: "Revenue",
                data: [12, 19, 14, 22, 18, 27, 24],
                borderColor: COLORS[0],
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
              },
            ]}
          />
        </Card>

        {/* ── AREA ── */}
        <Card title="Area Chart" badge="LineChartComponent fill">
          <LineChartComponent
            height={260}
            showLegend={false}
            labels={MONTHS}
            fill={true}
            datasets={[
              {
                label: "Users",
                data: [8, 14, 11, 20, 16, 25, 22],
                borderColor: COLORS[2],
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
              },
            ]}
          />
        </Card>

        {/* ── MULTI-LINE ── */}
        <Card title="Multi-Line Chart" badge="LineChartComponent datasets[]">
          <LineChartComponent
            height={260}
            labels={MONTHS}
            fill={true}
            datasets={[
              {
                label: "Revenue",
                data: [12, 19, 14, 22, 18, 27, 24],
                borderColor: COLORS[0],
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
              },
              {
                label: "Expenses",
                data: [9, 12, 10, 16, 13, 19, 17],
                borderColor: COLORS[1],
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
              },
            ]}
          />
        </Card>

        {/* ── VERTICAL BAR ── */}
        <Card title="Vertical Bar" badge="BarChartComponent">
          <BarChartComponent
            height={260}
            showLegend={false}
            labels={MONTHS}
            datasets={[
              {
                label: "Sales",
                data: [32, 45, 28, 60, 42, 55, 48],
                backgroundColor: COLORS[0],
                borderRadius: 6,
              },
            ]}
          />
        </Card>

        {/* ── HORIZONTAL BAR ── */}
        <Card
          title="Horizontal Bar"
          badge='BarChartComponent orientation="horizontal"'
        >
          <BarChartComponent
            height={260}
            showLegend={false}
            orientation="horizontal"
            labels={["Apples", "Bananas", "Oranges", "Grapes", "Mangoes"]}
            datasets={[
              {
                label: "Units",
                data: [42, 55, 33, 68, 27],
                backgroundColor: COLORS[4],
                borderRadius: 6,
              },
            ]}
          />
        </Card>

        {/* ── MULTI BAR ── */}
        <Card title="Multi Bar (Grouped)" badge="BarChartComponent datasets[]">
          <BarChartComponent
            height={260}
            labels={["Q1", "Q2", "Q3", "Q4"]}
            datasets={[
              {
                label: "2023",
                data: [42, 58, 37, 65],
                backgroundColor: COLORS[0],
                borderRadius: 5,
              },
              {
                label: "2024",
                data: [55, 70, 48, 80],
                backgroundColor: COLORS[1],
                borderRadius: 5,
              },
            ]}
          />
        </Card>

        {/* ── STACKED BAR ── */}
        <Card title="Stacked Bar" badge="BarChartComponent stacked">
          <BarChartComponent
            height={260}
            stacked={true}
            labels={["Q1", "Q2", "Q3", "Q4"]}
            datasets={[
              {
                label: "Product A",
                data: [22, 35, 28, 40],
                backgroundColor: COLORS[0],
              },
              {
                label: "Product B",
                data: [18, 20, 16, 24],
                backgroundColor: COLORS[3],
              },
              {
                label: "Product C",
                data: [12, 15, 9, 16],
                backgroundColor: COLORS[4],
                borderRadius: 5,
              },
            ]}
          />
        </Card>

        {/* ── PIE ── */}
        <Card title="Pie Chart" badge="PieChartComponent">
          <PieChartComponent
            height={260}
            labels={["Direct", "Organic", "Referral", "Social", "Email"]}
            data={[35, 25, 20, 12, 8]}
            backgroundColors={COLORS.slice(0, 5)}
            borderColors={Array(5).fill("#ffffff")}
            borderWidth={2}
          />
        </Card>

        {/* ── DONUT ── */}
        <Card title="Donut Chart" badge="DonutChartComponent">
          <DonutChartComponent
            height={260}
            cutoutPercent={62}
            centerValue="62%"
            centerLabel="Chrome"
            labels={["Chrome", "Safari", "Firefox", "Edge", "Other"]}
            data={[62, 19, 8, 7, 4]}
            backgroundColors={COLORS.slice(0, 5)}
            borderColors={Array(5).fill("#ffffff")}
            borderWidth={2}
          />
        </Card>

        {/* ── RADAR ── */}
        <Card title="Radar / Spider" badge="RadarChartComponent">
          <RadarChartComponent
            height={260}
            maxValue={100}
            labels={["Speed", "Design", "SEO", "UX", "Performance", "Security"]}
            datasets={[
              {
                label: "Product A",
                data: [80, 72, 90, 68, 85, 75],
                borderColor: COLORS[0],
                borderWidth: 2,
                pointRadius: 4,
              },
              {
                label: "Product B",
                data: [65, 88, 70, 82, 60, 90],
                borderColor: COLORS[2],
                borderWidth: 2,
                pointRadius: 4,
              },
            ]}
          />
        </Card>

        {/* ── SCATTER ── */}
        <Card title="Scatter Plot" badge="ScatterChartComponent">
          <ScatterChartComponent
            height={260}
            datasets={[
              {
                label: "Group A",
                pointRadius: 6,
                backgroundColor: "rgba(37,99,235,0.7)",
                data: Array.from({ length: 15 }, () => ({
                  x: parseFloat((Math.random() * 80 + 10).toFixed(1)),
                  y: parseFloat((Math.random() * 80 + 10).toFixed(1)),
                })),
              },
              {
                label: "Group B",
                pointRadius: 6,
                backgroundColor: "rgba(220,38,38,0.7)",
                data: Array.from({ length: 15 }, () => ({
                  x: parseFloat((Math.random() * 80 + 10).toFixed(1)),
                  y: parseFloat((Math.random() * 80 + 10).toFixed(1)),
                })),
              },
            ]}
          />
        </Card>

        {/* ── BUBBLE ── */}
        <Card title="Bubble Chart" badge="BubbleChartComponent">
          <BubbleChartComponent
            height={260}
            datasets={[
              {
                label: "Series A",
                backgroundColor: "rgba(37,99,235,0.6)",
                data: [
                  { x: 20, y: 30, r: 15 },
                  { x: 40, y: 10, r: 10 },
                  { x: 60, y: 50, r: 20 },
                  { x: 80, y: 25, r: 8 },
                  { x: 30, y: 60, r: 12 },
                ],
              },
              {
                label: "Series B",
                backgroundColor: "rgba(217,119,6,0.6)",
                data: [
                  { x: 15, y: 70, r: 12 },
                  { x: 50, y: 35, r: 18 },
                  { x: 70, y: 65, r: 9 },
                  { x: 35, y: 20, r: 14 },
                  { x: 65, y: 15, r: 7 },
                ],
              },
            ]}
          />
        </Card>
      </div>
    </SidebarSkeleton>
  );
}
