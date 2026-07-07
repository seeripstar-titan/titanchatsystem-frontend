import React from "react";
import { ReportCard, ReportBarChart } from "../ReportCharts";
import { chatEngagementData } from "../../data/reportsMockData";

const ChatEngagementView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Chat Engagement"
      subtitle="Breakdown of engaged, not engaged, and proactive chats"
    >
      <ReportBarChart
        data={chatEngagementData}
        dataKeys={["engaged", "notEngaged", "proactive"]}
        colors={["#22c55e", "#ef4444", "#6366f1"]}
        stacked
        height={240}
      />
    </ReportCard>
  </div>
);

export default ChatEngagementView;
