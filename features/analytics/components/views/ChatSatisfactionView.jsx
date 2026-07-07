import React from "react";
import { ReportCard, ReportStackedAreaChart } from "../ReportCharts";
import { chatSatisfactionData } from "../../data/reportsMockData";

const ChatSatisfactionView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Chat Satisfaction"
      subtitle="Customer satisfaction ratings over 14 days"
    >
      <ReportStackedAreaChart
        data={chatSatisfactionData}
        dataKeys={["good", "neutral", "bad"]}
        colors={["#22c55e", "#f59e0b", "#ef4444"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default ChatSatisfactionView;
