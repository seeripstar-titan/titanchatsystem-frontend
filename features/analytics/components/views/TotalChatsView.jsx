import React from "react";
import { ReportCard, ReportAreaChart } from "../ReportCharts";
import { totalChatsData } from "../../data/reportsMockData";

const TotalChatsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard title="Total Chats" subtitle="All chats over the last 30 days">
      <ReportAreaChart
        data={totalChatsData}
        dataKeys={["total", "unique"]}
        colors={["#6366f1", "#a78bfa"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default TotalChatsView;
