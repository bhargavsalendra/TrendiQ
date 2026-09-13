"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function SignalLineChart({
  data,
  color = "#7C64C8"
}: {
  data: { date: string; value: number | null }[];
  color?: string;
}) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#E7E1D8" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={40} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} strokeWidth={2} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
