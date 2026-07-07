import React from "react";
import { ReportCard, ReportComposedChart } from "../ReportCharts";
import { missedChatsData } from "../../data/reportsMockData";

const MissedChatsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Missed Chats"
      subtitle="Daily missed chats compared to total volume"
    >
      <ReportComposedChart
        data={missedChatsData}
        barKeys={["missed"]}
        lineKeys={["total"]}
        colors={["#ef4444", "#6366f1"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default MissedChatsView;
