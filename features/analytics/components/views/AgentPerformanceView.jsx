import React from "react";
import { ReportCard, DataTable, ProgressRing } from "../ReportCharts";
import { agentPerformanceData } from "../../data/reportsMockData";

const columns = [
  {
    key: "name",
    label: "Agent",
    render: (v) => <span className="font-medium">{v}</span>,
  },
  { key: "chats", label: "Chats", render: (v) => v.toLocaleString() },
  { key: "avgResponse", label: "Avg Response" },
  {
    key: "satisfaction",
    label: "Satisfaction",
    render: (v) => (
      <div className="flex items-center gap-2">
        <ProgressRing
          value={v}
          size={28}
          strokeWidth={2.5}
          color={v >= 95 ? "#22c55e" : v >= 90 ? "#f59e0b" : "#ef4444"}
        />
        <span>{v}%</span>
      </div>
    ),
  },
  {
    key: "resolved",
    label: "Resolved",
    render: (v) => (
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${v >= 95 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
      >
        {v}%
      </span>
    ),
  },
];

const AgentPerformanceView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Agent Performance"
      subtitle="Individual agent metrics and KPIs"
    >
      <DataTable columns={columns} data={agentPerformanceData} />
    </ReportCard>
  </div>
);

export default AgentPerformanceView;
