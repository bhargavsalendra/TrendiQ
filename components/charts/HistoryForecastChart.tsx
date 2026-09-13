"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function HistoryForecastChart({
  data
}: {
  data: { date: string; historical: number | null; forecast: number | null }[];
}) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="hist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C64C8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#7C64C8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A48DDC" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#A48DDC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E7E1D8" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={28} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="historical"
            name="Historical Data"
            stroke="#7C64C8"
            fill="url(#hist)"
            connectNulls={false}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="#A48DDC"
            strokeDasharray="6 6"
            fill="url(#fore)"
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
