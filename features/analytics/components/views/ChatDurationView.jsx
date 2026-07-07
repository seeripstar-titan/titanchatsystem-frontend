import React from "react";
import { ReportCard, ReportAreaChart } from "../ReportCharts";
import { chatDurationData } from "../../data/reportsMockData";

const ChatDurationView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Chat Duration"
      subtitle="Average and median chat duration in minutes"
    >
      <ReportAreaChart
        data={chatDurationData}
        dataKeys={["avgMinutes", "medianMinutes"]}
        colors={["#6366f1", "#22c55e"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default ChatDurationView;
