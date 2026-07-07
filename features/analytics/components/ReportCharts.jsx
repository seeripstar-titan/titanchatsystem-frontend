import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ── Subtle shadow constant ──
const softShadow = "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)";

const solidColors = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#8b5cf6",
];

// ── Custom Tooltip ──
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-lg border border-white/10"
      style={{
        backgroundColor: "rgba(15,15,20,0.88)",
        backdropFilter: "blur(12px)",
      }}
    >
      <p className="text-white/60 font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-white/80 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── KPI Stat Card — glass card with icon ──
export const KpiCard = ({ label, value, change, trend, icon: Icon }) => {
  const trendColor =
    trend === "up"
      ? "#22c55e"
      : trend === "down"
        ? "#ef4444"
        : "var(--titan-text-muted)";

  const trendBg =
    trend === "up"
      ? "rgba(34,197,94,0.08)"
      : trend === "down"
        ? "rgba(239,68,68,0.08)"
        : "transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-3.5 flex flex-col gap-2"
      style={{
        boxShadow: softShadow,
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: trendBg }}
        >
          {Icon && (
            <Icon size={16} style={{ color: trendColor }} strokeWidth={2} />
          )}
        </div>
        {change && (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full leading-none"
            style={{
              color: trendColor,
              backgroundColor: `${trendColor}14`,
            }}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <span className="text-lg font-bold text-[var(--titan-primary)] tracking-tight leading-none block">
          {value}
        </span>
        <span className="text-[11px] font-medium text-[var(--titan-text-muted)] mt-1 block uppercase tracking-wider">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

// ── Section Card (for graph containers) ──
export const ReportCard = ({ title, subtitle, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-5 flex flex-col ${className}`}
    style={{
      boxShadow: softShadow,
      WebkitBackdropFilter: "blur(28px) saturate(185%)",
      backdropFilter: "blur(28px) saturate(185%)",
    }}
  >
    {title && (
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[var(--titan-primary)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[11px] text-[var(--titan-text-muted)] mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    )}
    <div className="flex-1 min-h-0">{children}</div>
  </motion.div>
);

// ── Shared axis/grid props ──
const axisProps = {
  tick: {
    fontSize: 11,
    fill: "var(--titan-text-muted)",
    fontFamily: "Inter, sans-serif",
  },
  tickLine: false,
  axisLine: false,
};

const gridProps = {
  strokeDasharray: "3 3",
  stroke: "rgba(128,128,128,0.12)",
  vertical: false,
};

// ── Area Chart ──
export const ReportAreaChart = ({
  data,
  dataKeys,
  xKey = "date",
  height = 260,
  colors = solidColors,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`grad-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            fill={`url(#grad-${key})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// ── Bar Chart ──
export const ReportBarChart = ({
  data,
  dataKeys,
  xKey = "date",
  height = 260,
  colors = solidColors,
  stacked = false,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        barGap={2}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {dataKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i % colors.length]}
            stackId={stacked ? "stack" : undefined}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            maxBarSize={40}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// ── Line Chart ──
export const ReportLineChart = ({
  data,
  dataKeys,
  xKey = "date",
  height = 260,
  colors = solidColors,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {dataKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ── Composed Chart (Bar + Line overlay) ──
export const ReportComposedChart = ({
  data,
  barKeys,
  lineKeys,
  xKey = "date",
  height = 260,
  colors = solidColors,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {barKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        ))}
        {lineKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[(barKeys.length + i) % colors.length]}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

// ── Stacked Area Chart ──
export const ReportStackedAreaChart = ({
  data,
  dataKeys,
  xKey = "date",
  height = 260,
  colors = solidColors,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`sgrad-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.05}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            fill={`url(#sgrad-${key})`}
            stackId="1"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// ── Timeline Chart (24h style area chart) ──
export const ReportTimelineChart = ({
  data,
  dataKeys,
  xKey = "hour",
  height = 260,
  colors = solidColors,
  showPoints = false,
}) => (
  <div style={{ width: "100%", height }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
      >
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient
              key={key}
              id={`tgrad-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.25}
              />
              <stop
                offset="100%"
                stopColor={colors[i % colors.length]}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey={xKey} {...axisProps} interval="preserveStartEnd" />
        <YAxis {...axisProps} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            fill={`url(#tgrad-${key})`}
            dot={
              showPoints
                ? {
                    r: 3,
                    fill: colors[i % colors.length],
                    strokeWidth: 1.5,
                    stroke: "#fff",
                  }
                : false
            }
            activeDot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

// ── Activity Timeline Bar ──
const hourLabels = [
  "12a",
  "1a",
  "2a",
  "3a",
  "4a",
  "5a",
  "6a",
  "7a",
  "8a",
  "9a",
  "10a",
  "11a",
  "12p",
  "1p",
  "2p",
  "3p",
  "4p",
  "5p",
  "6p",
  "7p",
  "8p",
  "9p",
  "10p",
  "11p",
];

export const ActivityTimelineBar = ({
  segments,
  label = "Today",
  activeColor = "#6BAF8D",
  inactiveColor = "var(--titan-card-border)",
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <span className="text-[12px] font-medium text-[var(--titan-text-muted)]">
        {label}
      </span>
    )}
    <div className="flex gap-px h-7 rounded-lg overflow-hidden">
      {segments.map((active, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: i * 0.02, duration: 0.3 }}
          className="flex-1 relative group cursor-default"
          style={{
            backgroundColor: active ? activeColor : inactiveColor,
            opacity: active ? 1 : 0.35,
          }}
          title={`${hourLabels[i]} — ${active ? "Accepting chats" : "Offline"}`}
        >
          {/* Hover tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block">
            <div
              className="px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap border text-[var(--titan-primary)] bg-[var(--titan-bg)] border-[var(--titan-card-border)]"
              style={{ boxShadow: softShadow }}
            >
              {hourLabels[i]}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Hour labels */}
    <div className="flex justify-between px-0">
      {[0, 6, 12, 18, 23].map((i) => (
        <span
          key={i}
          className="text-[9px] text-[var(--titan-text-muted)] font-medium"
        >
          {hourLabels[i]}
        </span>
      ))}
    </div>
  </div>
);

// ── Horizontal Bar for Tags/Rankings ──
export const HorizontalBar = ({
  label,
  value,
  max,
  color = "var(--titan-primary)",
  suffix = "",
}) => (
  <div className="flex items-center gap-3">
    <span className="text-[12px] text-[var(--titan-text-muted)] w-28 truncate">
      {label}
    </span>
    <div className="flex-1 h-2 rounded-full bg-[var(--titan-hover)] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
    <span className="text-[12px] font-medium text-[var(--titan-primary)] w-14 text-right">
      {value.toLocaleString()}
      {suffix}
    </span>
  </div>
);

// ── Data Table ──
export const DataTable = ({ columns, data }) => (
  <div className="overflow-x-auto custom-scrollbar">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-[var(--titan-card-border)]">
          {columns.map((col) => (
            <th
              key={col.key}
              className="pb-2 pr-4 text-[11px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider whitespace-nowrap"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="border-b border-[var(--titan-card-border)]/50 hover:bg-[var(--titan-hover)] transition-colors"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className="py-2.5 pr-4 text-[12.5px] text-[var(--titan-primary)] whitespace-nowrap"
              >
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Progress Ring (mini) ──
export const ProgressRing = ({
  value,
  size = 36,
  strokeWidth = 3,
  color = "#6366f1",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--titan-card-border)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ strokeDasharray: circumference }}
      />
    </svg>
  );
};
