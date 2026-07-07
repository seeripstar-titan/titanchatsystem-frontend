import React from "react";
import {
  KpiCard,
  ReportCard,
  ReportAreaChart,
  ReportComposedChart,
} from "../ReportCharts";
import { trackedSalesData } from "../../data/reportsMockData";
import { DollarSign, ShoppingCart, Receipt } from "lucide-react";

const totals = trackedSalesData.reduce(
  (acc, d) => ({
    revenue: acc.revenue + d.revenue,
    transactions: acc.transactions + d.transactions,
  }),
  { revenue: 0, transactions: 0 },
);

const TrackedSalesView = () => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <KpiCard
        label="Total Revenue"
        value={`$${totals.revenue.toLocaleString()}`}
        icon={DollarSign}
      />
      <KpiCard
        label="Transactions"
        value={totals.transactions.toLocaleString()}
        icon={ShoppingCart}
      />
      <KpiCard
        label="Avg Order Value"
        value={`$${(totals.revenue / totals.transactions).toFixed(0)}`}
        icon={Receipt}
      />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <ReportCard title="Revenue Trend" subtitle="Daily revenue over 14 days">
        <ReportAreaChart
          data={trackedSalesData}
          dataKeys={["revenue"]}
          colors={["#22c55e"]}
          height={180}
        />
      </ReportCard>

      <ReportCard
        title="Transactions & Avg Order"
        subtitle="Daily transactions with average order value"
      >
        <ReportComposedChart
          data={trackedSalesData}
          barKeys={["transactions"]}
          lineKeys={["avgOrder"]}
          colors={["#6366f1", "#f59e0b"]}
          height={180}
        />
      </ReportCard>
    </div>
  </div>
);

export default TrackedSalesView;
