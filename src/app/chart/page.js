"use client";

import React from "react";
import LineChartComponent from "@/components/charts/lineChart";
import SidebarSkeleton from "@/components/core/sidebarSkeleton";

function Chartjs() {
  return (
    <SidebarSkeleton>
      <div className="p-6 space-y-12">
        {/* Chart 1 */}
        <LineChartComponent
          labels={monthsLabels}
          datasets={[
            {
              label: "Revenue",
              data: [
                30000, 28000, 15000, 32000, 18000, 35000, 22000, 40000, 25000,
                42000, 30000, 48000,
              ],
              borderColor: "#0d9488",
              backgroundColor: "rgba(13, 148, 136, 0.35)",
              tension: 0,
            },
            {
              label: "Profit",
              data: [
                30000, 12000, 30000, 10000, 7000, 15000, 25000, 14000, 28000,
                30000, 12000, 10000,
              ],
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.35)",
              tension: 0,
            },
            {
              label: "Expenses",
              data: [
                18000, 30000, 10000, 20000, 46000, 23000, 21000, 26000, 20000,
                30000, 22000, 28000,
              ],
              borderColor: "#fb923c",
              backgroundColor: "rgba(251, 146, 60, 0.35)",
              tension: 0,
            },
          ]}
          height={400}
          showLegend={true}
        />

        {/* Chart 2 */}
        <LineChartComponent
          labels={monthsLabels}
          datasets={[
            {
              label: "Visitors",
              data: [
                1200, 3000, 800, 2500, 4000, 2000, 3500, 1500, 3000, 4000, 1000,
                4500,
              ],
              borderColor: "#f43f5e",
              backgroundColor: "rgba(244, 63, 94, 0.35)",
              tension: 0,
            },
            {
              label: "Signups",
              data: [
                500, 1800, 1200, 900, 2500, 700, 2000, 1000, 1600, 2200, 800,
                2400,
              ],
              borderColor: "#16a34a",
              backgroundColor: "rgba(22, 163, 74, 0.35)",
              tension: 0,
            },
            {
              label: "Cancellations",
              data: [
                200, 800, 400, 1200, 600, 1500, 900, 1000, 600, 1100, 300, 1400,
              ],
              borderColor: "#f97316",
              backgroundColor: "rgba(249, 115, 22, 0.35)",
              tension: 0,
            },
          ]}
          height={400}
          showLegend={true}
        />

        {/* Chart 3 */}
        <LineChartComponent
          labels={monthsLabels}
          datasets={[
            {
              label: "Sales",
              data: [
                5000, 7200, 6800, 9000, 8700, 10500, 9800, 12500, 11800, 14500,
                13800, 16000,
              ],
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139, 92, 246, 0.35)",
              tension: 0.3,
            },
            {
              label: "Returns",
              data: [
                1200, 1600, 1400, 2100, 1800, 2500, 2300, 3100, 2800, 3500,
                3200, 4000,
              ],
              borderColor: "#e11d48",
              backgroundColor: "rgba(225, 29, 72, 0.35)",
              tension: 0.3,
            },
            {
              label: "Net Profit",
              data: [
                2800, 3800, 4200, 4600, 4000, 5200, 4800, 6000, 5800, 7100,
                6900, 8000,
              ],
              borderColor: "#14b8a6",
              backgroundColor: "rgba(20, 184, 166, 0.35)",
              tension: 0.3,
            },
          ]}
          height={400}
          showLegend={true}
        />
      </div>
    </SidebarSkeleton>
  );
}

export default Chartjs;

const monthsLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
