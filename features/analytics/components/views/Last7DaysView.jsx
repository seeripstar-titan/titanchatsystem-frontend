import React from "react";
import {
  KpiCard,
  ReportCard,
  ReportAreaChart,
  ReportTimelineChart,
} from "../ReportCharts";
import { summaryData, hourlyChatsData } from "../../data/reportsMockData";
import {
  MessageSquare,
  Clock,
  ThumbsUp,
  MessageCircleX,
  Users,
  Timer,
} from "lucide-react";

const kpiIcons = [MessageSquare, Clock, ThumbsUp, MessageCircleX, Users, Timer];

const Last7DaysView = () => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {summaryData.kpis.map((kpi, i) => (
        <KpiCard key={kpi.label} {...kpi} icon={kpiIcons[i]} />
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <ReportCard
        title="7-Day Overview"
        subtitle="Chat volume, resolved, and missed chats"
      >
        <ReportAreaChart
          data={summaryData.weeklyTrend}
          dataKeys={["chats", "resolved", "missed"]}
          colors={["#6366f1", "#22c55e", "#ef4444"]}
          height={180}
        />
      </ReportCard>

      <ReportCard
        title="Today's Hourly Breakdown"
        subtitle="Chat volume by hour of day"
      >
        <ReportTimelineChart
          data={hourlyChatsData}
          dataKeys={["chats", "resolved"]}
          xKey="hour"
          colors={["#6366f1", "#22c55e"]}
          showPoints
          height={180}
        />
      </ReportCard>
    </div>
  </div>
);

export default Last7DaysView;
