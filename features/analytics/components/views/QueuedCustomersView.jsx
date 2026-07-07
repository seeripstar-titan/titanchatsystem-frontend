import React from "react";
import { ReportCard, ReportComposedChart } from "../ReportCharts";
import { queuedCustomersData } from "../../data/reportsMockData";

const QueuedCustomersView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Queued Customers"
      subtitle="Customers queued vs served and average wait time (minutes)"
    >
      <ReportComposedChart
        data={queuedCustomersData}
        barKeys={["queued", "served"]}
        lineKeys={["avgWait"]}
        colors={["#6366f1", "#22c55e", "#f59e0b"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default QueuedCustomersView;
