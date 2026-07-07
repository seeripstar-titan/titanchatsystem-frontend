import React from "react";
import { ReportCard, ReportBarChart, HorizontalBar } from "../ReportCharts";
import { Star } from "lucide-react";

const reviewsData = [
  {
    period: "This week",
    rating5: 42,
    rating4: 28,
    rating3: 12,
    rating2: 5,
    rating1: 3,
  },
  {
    period: "Last week",
    rating5: 38,
    rating4: 30,
    rating3: 15,
    rating2: 8,
    rating1: 4,
  },
  {
    period: "2 weeks ago",
    rating5: 45,
    rating4: 25,
    rating3: 10,
    rating2: 6,
    rating1: 2,
  },
  {
    period: "3 weeks ago",
    rating5: 40,
    rating4: 32,
    rating3: 14,
    rating2: 4,
    rating1: 3,
  },
];

const overallRatings = [
  { label: "5 stars", value: 165, color: "#22c55e" },
  { label: "4 stars", value: 115, color: "#84cc16" },
  { label: "3 stars", value: 51, color: "#f59e0b" },
  { label: "2 stars", value: 23, color: "#f97316" },
  { label: "1 star", value: 12, color: "#ef4444" },
];

const ReviewsView = () => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ReportCard
        title="Review Ratings"
        subtitle="Distribution of customer review ratings"
      >
        <div className="flex flex-col gap-3">
          {overallRatings.map((r) => (
            <HorizontalBar
              key={r.label}
              label={r.label}
              value={r.value}
              max={overallRatings[0].value}
              color={r.color}
            />
          ))}
        </div>
      </ReportCard>

      <ReportCard
        title="Ratings Over Time"
        subtitle="Weekly rating distribution"
      >
        <ReportBarChart
          data={reviewsData}
          dataKeys={["rating5", "rating4", "rating3", "rating2", "rating1"]}
          xKey="period"
          colors={["#22c55e", "#84cc16", "#f59e0b", "#f97316", "#ef4444"]}
          stacked
          height={240}
        />
      </ReportCard>
    </div>
  </div>
);

export default ReviewsView;
