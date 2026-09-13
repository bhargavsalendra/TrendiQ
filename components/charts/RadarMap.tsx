"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { TrendMetrics } from "@/lib/types";

export function RadarMap({ trends }: { trends: TrendMetrics[] }) {
  const data = [...trends]
    .sort((a, b) => b.growth + b.acceleration - (a.growth + a.acceleration))
    .slice(0, 8)
    .map((t) => ({
      name: t.name,
      momentum: Math.max(0, t.growth),
      score: t.trendScore,
      forecast: t.forecast30,
      instagram: Math.max(0, t.instagram.momentum)
    }));

  return (
    <div className="h-[380px]">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#E7E1D8" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Radar name="Growth" dataKey="momentum" stroke="#7C64C8" fill="#7C64C8" fillOpacity={0.2} />
          <Radar name="Forecast" dataKey="forecast" stroke="#A48DDC" fill="#A48DDC" fillOpacity={0.12} />
          <Radar name="Instagram" dataKey="instagram" stroke="#E27D9A" fill="#E27D9A" fillOpacity={0.1} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
