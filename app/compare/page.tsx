"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { getTrends } from "@/lib/catalog";

export default function ComparePage() {
  const trends = getTrends();
  const [selected, setSelected] = useState<string[]>(["cherry-red", "butter-yellow", "olive-green"]);

  function toggle(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((s) => s !== slug);
      if (current.length >= 4) return current;
      return [...current, slug];
    });
  }

  const chosen = trends.filter((t) => selected.includes(t.slug));
  const chartData = useMemo(
    () =>
      [
        { key: "Trend Score", pick: (t: (typeof chosen)[0]) => t.trendScore },
        { key: "Search Momentum", pick: (t: (typeof chosen)[0]) => t.signals.search.growth },
        { key: "Social Momentum", pick: (t: (typeof chosen)[0]) => t.signals.social.growth },
        { key: "Product Growth", pick: (t: (typeof chosen)[0]) => t.signals.products.growth },
        { key: "Consumer Interest", pick: (t: (typeof chosen)[0]) => t.signals.consumer.growth },
        { key: "Instagram Momentum", pick: (t: (typeof chosen)[0]) => t.instagram.growth },
        { key: "Growth", pick: (t: (typeof chosen)[0]) => t.growth },
        { key: "7-Day Forecast", pick: (t: (typeof chosen)[0]) => t.forecast7 },
        { key: "30-Day Forecast", pick: (t: (typeof chosen)[0]) => t.forecast30 },
        { key: "Confidence", pick: (t: (typeof chosen)[0]) => t.confidence }
      ].map((row) => {
        const point: Record<string, string | number> = { metric: row.key };
        chosen.forEach((t) => {
          point[t.name] = Number(row.pick(t).toFixed(1));
        });
        return point;
      }),
    [chosen]
  );

  return (
    <div>
      <DemoBanner />
      <h1 className="font-serif text-4xl">Compare Fashion Trends</h1>
      <p className="mt-2 text-muted">Select 2–4 trends. Metrics come from the same scoring engine used on every page.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {trends.map((t) => (
          <button
            key={t.slug}
            onClick={() => toggle(t.slug)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              selected.includes(t.slug)
                ? "border-lavender-500 bg-lavender-50 text-lavender-600"
                : "border-line bg-white text-muted"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {chosen.length < 2 ? (
        <p className="mt-8 text-sm text-muted">Select at least two trends to compare.</p>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-[0.14em] text-muted">
                  <th className="px-4 py-3">Metric</th>
                  {chosen.map((t) => (
                    <th key={t.slug} className="px-4 py-3">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.map((row) => (
                  <tr key={row.metric as string} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">{row.metric}</td>
                    {chosen.map((t) => (
                      <td key={t.slug} className="px-4 py-3">
                        {row[t.name]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 h-[380px] rounded-2xl border border-line bg-white p-4 shadow-card">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid stroke="#E7E1D8" vertical={false} />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                {chosen.map((t, i) => (
                  <Bar key={t.slug} dataKey={t.name} fill={["#7C64C8", "#A48DDC", "#654FB0", "#C4B5E8"][i]} radius={6} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
