import React from "react";
import { ReportCard, ReportStackedAreaChart } from "../ReportCharts";
import { chatAvailabilityData } from "../../data/reportsMockData";

const ChatAvailabilityView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Chat Availability"
      subtitle="Agent online vs offline hours over 7 days"
    >
      <ReportStackedAreaChart
        data={chatAvailabilityData}
        dataKeys={["online", "offline"]}
        colors={["#22c55e", "#94a3b8"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default ChatAvailabilityView;
