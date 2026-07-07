import React from "react";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Clock,
  ThumbsUp,
  MessageCircleX,
  Users,
  Timer,
} from "lucide-react";
import {
  KpiCard,
  ReportCard,
  ReportAreaChart,
  ReportTimelineChart,
  ReportComposedChart,
} from "../ReportCharts";
import { summaryData, hourlyChatsData } from "../../data/reportsMockData";

const kpiIcons = [MessageSquare, Clock, ThumbsUp, MessageCircleX, Users, Timer];

const DashboardView = () => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {summaryData.kpis.map((kpi, i) => (
        <KpiCard key={kpi.label} {...kpi} icon={kpiIcons[i]} />
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <ReportCard title="Chat Volume" subtitle="Chats vs resolved — 7 days">
        <ReportAreaChart
          data={summaryData.weeklyTrend}
          dataKeys={["chats", "resolved"]}
          colors={["#6366f1", "#22c55e"]}
          height={170}
        />
      </ReportCard>

      <ReportCard title="Missed Chats" subtitle="Missed vs total trend">
        <ReportComposedChart
          data={summaryData.weeklyTrend}
          barKeys={["missed"]}
          lineKeys={["chats"]}
          colors={["#ef4444", "#6366f1"]}
          height={170}
        />
      </ReportCard>

      <ReportCard
        title="Hourly Activity"
        subtitle="Today's chat volume by hour"
      >
        <ReportTimelineChart
          data={hourlyChatsData}
          dataKeys={["chats", "resolved"]}
          xKey="hour"
          colors={["#6366f1", "#22c55e"]}
          height={170}
        />
      </ReportCard>
    </div>
  </div>
);

export default DashboardView;
