import React from "react";
import { ReportCard, DataTable } from "../ReportCharts";
import { campaignsData } from "../../data/reportsMockData";

const columns = [
  { key: "name", label: "Campaign" },
  {
    key: "impressions",
    label: "Impressions",
    render: (v) => v.toLocaleString(),
  },
  { key: "clicks", label: "Clicks", render: (v) => v.toLocaleString() },
  {
    key: "conversions",
    label: "Conversions",
    render: (v) => v.toLocaleString(),
  },
  {
    key: "rate",
    label: "Conv. Rate",
    render: (v) => (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500">
        {v}
      </span>
    ),
  },
];

const CampaignsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Campaigns Conversion"
      subtitle="Performance metrics for all active campaigns"
    >
      <DataTable columns={columns} data={campaignsData} />
    </ReportCard>
  </div>
);

export default CampaignsView;
