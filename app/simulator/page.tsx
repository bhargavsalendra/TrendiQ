"use client";

import { useMemo, useState } from "react";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTrends } from "@/lib/catalog";
import { simulateTrend } from "@/lib/engine";
import { SignalKey } from "@/lib/types";

type SimulatorSignalKey = SignalKey | "instagram";

const SLIDERS: { key: SimulatorSignalKey; label: string }[] = [
  { key: "search", label: "Search Growth" },
  { key: "social", label: "Social Growth" },
  { key: "products", label: "Product Growth" },
  { key: "consumer", label: "Consumer Interest" },
  { key: "engagement", label: "Engagement" },
  { key: "instagram", label: "Instagram Momentum" }
];

export default function SimulatorPage() {
  const trends = getTrends();
  const [slug, setSlug] = useState("utility-core");
  const [shocks, setShocks] = useState<Record<SimulatorSignalKey, number>>({
    search: 0,
    social: 0,
    products: 0,
    consumer: 0,
    engagement: 0,
    instagram: 0
  });

  const current = trends.find((t) => t.slug === slug) ?? trends[0];
  const simulated = useMemo(() => simulateTrend(current, shocks), [current, shocks]);

  return (
    <div>
      <DemoBanner />
      <h1 className="font-serif text-4xl">What-If Trend Simulator</h1>
      <p className="mt-2 max-w-2xl text-muted">
        How would changing market signals affect the predicted trend? Slider shocks are applied to
        recent history and the score, status, and forecast are recomputed by the same engine. Instagram
        Momentum can be stress-tested independently to model creator or platform lift.
      </p>

      <label className="mt-6 block text-sm text-muted">
        Select a trend
        <select
          className="mt-1 w-full max-w-md rounded-xl border border-line bg-white px-3 py-2 text-ink"
          value={current.slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setShocks({ search: 0, social: 0, products: 0, consumer: 0, engagement: 0, instagram: 0 });
          }}
        >
          {trends.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
        {SLIDERS.map((s) => (
          <label key={s.key} className="grid gap-2 md:grid-cols-[180px_1fr_60px] md:items-center">
            <span className="text-sm">{s.label}</span>
            <input
              type="range"
              min={-40}
              max={40}
              value={shocks[s.key]}
              onChange={(e) =>
                setShocks((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))
              }
            />
            <span className="text-sm text-muted">
              {shocks[s.key] > 0 ? "+" : ""}
              {shocks[s.key]}%
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <CompareStat label="Current Score" value={current.trendScore} next={simulated.trendScore} />
        <CompareStat label="Simulated Score" value={simulated.trendScore} accent />
        <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Current Status</p>
          <div className="mt-2">
            <StatusBadge status={current.displayStatus} />
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">Simulated Status</p>
          <div className="mt-2">
            <StatusBadge status={simulated.displayStatus} />
          </div>
        </div>
        <CompareStat label="Current Forecast" value={current.forecast30} next={simulated.forecast30} />
        <CompareStat label="Simulated Forecast" value={simulated.forecast30} accent />
        <CompareStat label="Simulated Confidence" value={simulated.confidence} />
      </div>
    </div>
  );
}

function CompareStat({
  label,
  value,
  next,
  accent
}: {
  label: string;
  value: number;
  next?: number;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 shadow-soft ${accent ? "border-lavender-200 bg-lavender-50" : "border-line bg-white"}`}>
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-serif text-4xl">{value}</p>
      {next != null && next !== value ? (
        <p className="mt-1 text-xs text-muted">Engine delta {next - value > 0 ? "+" : ""}{next - value}</p>
      ) : null}
    </div>
  );
}
