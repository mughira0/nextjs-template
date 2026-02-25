"use client";

import DonutChartComponent from "@/components/charts/DonutChart";
import LineChartComponent from "@/components/charts/lineChart";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import StatCard from "@/components/core/statcard";
import Heading from "@/components/core/heading";
import { Box } from "@/components/core/box";

import {
  dashboardStats,
  dashboardTransactions,
  revenueLineData,
  trafficDonutData,
} from "@/data/dummy";
import TableStructure from "@/components/core/table";
import { transactionHeader } from "@/data/usage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

function Dashboard() {
  const { sidebarCollapsed } = useSelector(
    (state: RootState) => state.commonReducer,
  );
  return (
    <SidebarSkeleton>
      <div className="flex flex-col gap-6">
        {/* Page Heading */}
        <Heading
          title="Dashboard Overview"
          description="High-level metrics and traffic insights for the current period."
          tags={["analytics", "revenue", "traffic"]}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardStats.map(({ icon: Icon, ...stat }) => (
            <StatCard key={stat.title} {...stat} icon={<Icon />} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-4 ">
          <Box>
            <Heading
              title="Revenue Trend"
              description="Monthly revenue performance"
            />

            <LineChartComponent
              height={260}
              showLegend={false}
              fill={false}
              key={`line-${sidebarCollapsed}`}
              labels={revenueLineData.labels}
              datasets={revenueLineData.datasets}
            />
          </Box>

          <Box>
            <Heading
              title="Traffic Sources"
              description="User acquisition breakdown"
              tags={["organic", "direct", "referral"]}
            />

            <DonutChartComponent
              height={260}
              cutoutPercent={64}
              centerValue="38%"
              centerLabel="Organic"
              key={`donut-${sidebarCollapsed}`}
              labels={trafficDonutData.labels}
              data={trafficDonutData.data}
              backgroundColors={trafficDonutData.backgroundColors}
              borderColors={Array(5).fill("#ffffff")}
              borderWidth={2}
            />
          </Box>
        </div>
        <TableStructure
          header={transactionHeader}
          headerTitle="Recent Transactions"
          data={dashboardTransactions}
          page={1}
          totalPages={1}
          setPage={() => {}}
          customeBodyStyle={{ maxHeight: "300px" }}
          minHeight="200px"
          noDataText="No recent transactions."
        />
      </div>
    </SidebarSkeleton>
  );
}

export default Dashboard;
