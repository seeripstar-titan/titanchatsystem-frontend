import React from "react";
import {
  ReportCard,
  ReportAreaChart,
  ReportTimelineChart,
} from "../ReportCharts";
import {
  chatResponseTimesData,
  hourlyResponseTimeData,
} from "../../data/reportsMockData";

const ChatResponseTimesView = () => (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
    <ReportCard
      title="Response Times by Hour"
      subtitle="Average and first response times throughout the day (seconds)"
    >
      <ReportTimelineChart
        data={hourlyResponseTimeData}
        dataKeys={["avgResponse", "firstResponse"]}
        xKey="hour"
        colors={["#f59e0b", "#6366f1"]}
        showPoints
        height={200}
      />
    </ReportCard>

    <ReportCard
      title="14-Day Trend"
      subtitle="First and average response times in seconds"
    >
      <ReportAreaChart
        data={chatResponseTimesData}
        dataKeys={["firstResponse", "avgResponse"]}
        colors={["#6366f1", "#f59e0b"]}
        height={200}
      />
    </ReportCard>
  </div>
);

export default ChatResponseTimesView;
