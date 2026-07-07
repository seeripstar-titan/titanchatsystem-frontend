import React from "react";
import { ReportCard, ReportComposedChart } from "../ReportCharts";
import { staffingPredictionData } from "../../data/reportsMockData";

const StaffingPredictionView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Staffing Prediction"
      subtitle="Current staffing vs predicted needs by hour"
    >
      <ReportComposedChart
        data={staffingPredictionData}
        barKeys={["current", "predicted"]}
        lineKeys={["chatsExpected"]}
        xKey="hour"
        colors={["#6366f1", "#a78bfa", "#f59e0b"]}
        height={260}
      />
    </ReportCard>
  </div>
);

export default StaffingPredictionView;
