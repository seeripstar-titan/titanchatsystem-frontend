import React from "react";
import {
  ReportCard,
  ReportBarChart,
  ReportTimelineChart,
  ActivityTimelineBar,
} from "../ReportCharts";
import {
  agentActivityData,
  hourlyAgentActivityData,
  agentLoginActivity,
} from "../../data/reportsMockData";

const AgentActivityView = () => (
  <div className="flex flex-col gap-4">
    {/* Agent Login Activity — cardless 24h bars */}
    <div>
      <h3 className="text-[13px] font-semibold text-[var(--titan-primary)] mb-1">
        Login Activity
      </h3>
      <p className="text-[10px] text-[var(--titan-text-muted)] mb-2">
        Highlighted segments show when accepting chats
      </p>
      <div className="flex flex-col gap-3">
        <ActivityTimelineBar
          segments={agentLoginActivity.today}
          label="Today"
        />
        <ActivityTimelineBar
          segments={agentLoginActivity.yesterday}
          label="Yesterday"
        />
        <ActivityTimelineBar
          segments={agentLoginActivity.twoDaysAgo}
          label="2 days ago"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <ReportCard
        title="24-Hour Activity"
        subtitle="Agent activity distribution throughout the day"
      >
        <ReportTimelineChart
          data={hourlyAgentActivityData}
          dataKeys={["online", "chatting", "idle"]}
          xKey="hour"
          colors={["#6366f1", "#22c55e", "#f59e0b"]}
          showPoints
          height={170}
        />
      </ReportCard>

      <ReportCard title="Agent Breakdown" subtitle="Hours breakdown per agent">
        <ReportBarChart
          data={agentActivityData}
          dataKeys={["chatting", "idle", "offline"]}
          xKey="name"
          colors={["#22c55e", "#f59e0b", "#94a3b8"]}
          stacked
          height={170}
        />
      </ReportCard>
    </div>
  </div>
);

export default AgentActivityView;
