import React from "react";
import { ReportCard, ReportComposedChart } from "../ReportCharts";
import { achievedGoalsData } from "../../data/reportsMockData";

const AchievedGoalsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Achieved Goals"
      subtitle="Daily achieved goals vs target"
    >
      <ReportComposedChart
        data={achievedGoalsData}
        barKeys={["achieved"]}
        lineKeys={["target"]}
        colors={["#22c55e", "#6366f1"]}
        height={240}
      />
    </ReportCard>
  </div>
);

export default AchievedGoalsView;
