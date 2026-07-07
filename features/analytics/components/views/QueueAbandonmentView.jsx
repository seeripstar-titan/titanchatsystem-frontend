import React from "react";
import { ReportCard, ReportComposedChart } from "../ReportCharts";
import { queueAbandonmentData } from "../../data/reportsMockData";

const QueueAbandonmentView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Queue Abandonment"
      subtitle="Abandoned customers vs total queued, with abandonment rate"
    >
      <ReportComposedChart
        data={queueAbandonmentData}
        barKeys={["abandoned", "total"]}
        lineKeys={["rate"]}
        colors={["#ef4444", "#94a3b8", "#f59e0b"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default QueueAbandonmentView;
