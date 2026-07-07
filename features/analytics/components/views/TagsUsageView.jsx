import React from "react";
import { ReportCard, HorizontalBar } from "../ReportCharts";
import { tagsUsageData } from "../../data/reportsMockData";

const barColors = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#818cf8",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
];

const TagsUsageView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Tags Usage"
      subtitle="Most commonly used tags across all chats"
    >
      <div className="flex flex-col gap-3">
        {tagsUsageData.map((tag, i) => (
          <HorizontalBar
            key={tag.tag}
            label={tag.tag}
            value={tag.count}
            max={tagsUsageData[0].count}
            color={barColors[i % barColors.length]}
          />
        ))}
      </div>
    </ReportCard>
  </div>
);

export default TagsUsageView;
