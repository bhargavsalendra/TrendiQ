"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTrends } from "@/lib/catalog";
import { DisplayStatus } from "@/lib/types";

const emptyFilters = {
  q: "",
  category: "All",
  gender: "All",
  color: "All",
  garment: "All",
  material: "All",
  aesthetic: "All",
  status: "All",
  from: "",
  to: ""
};

export default function ExplorerPage() {
  const trends = getTrends();
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(false);

  const options = useMemo(
    () => ({
      category: ["All", ...new Set(trends.map((t) => t.category))],
      gender: ["All", ...new Set(trends.map((t) => t.gender))],
      color: ["All", ...new Set(trends.map((t) => t.colorFamily))],
      garment: ["All", ...new Set(trends.map((t) => t.garmentType))],
      material: ["All", ...new Set(trends.map((t) => t.material))],
      aesthetic: ["All", ...new Set(trends.map((t) => t.aesthetic))],
      status: ["All", "EMERGING", "RISING", "STABLE", "DECLINING"]
    }),
    [trends]
  );

  const results = trends.filter((t) => {
    const q = filters.q.toLowerCase();
    const last = t.series[t.series.length - 1]?.date ?? "";
    return (
      (!q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) &&
      (filters.category === "All" || t.category === filters.category) &&
      (filters.gender === "All" || t.gender === filters.gender) &&
      (filters.color === "All" || t.colorFamily === filters.color) &&
      (filters.garment === "All" || t.garmentType === filters.garment) &&
      (filters.material === "All" || t.material === filters.material) &&
      (filters.aesthetic === "All" || t.aesthetic === filters.aesthetic) &&
      (filters.status === "All" || t.displayStatus === filters.status) &&
      (!filters.from || last >= filters.from) &&
      (!filters.to || last <= filters.to)
    );
  });

  function update<K extends keyof typeof emptyFilters>(key: K, value: string) {
    setLoading(true);
    setFilters((f) => ({ ...f, [key]: value }));
    window.setTimeout(() => setLoading(false), 180);
  }

  return (
    <div>
      <DemoBanner />
      <h1 className="font-serif text-4xl">Trend Explorer</h1>
      <p className="mt-2 text-muted">Search and filter the prototype catalog, then open any trend for evidence-backed analysis.</p>

      <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft md:grid-cols-4">
        <input
          className="rounded-xl border border-line px-3 py-2 text-sm md:col-span-2"
          placeholder="Search trends"
          value={filters.q}
          onChange={(e) => update("q", e.target.value)}
        />
        <Select label="Category" value={filters.category} options={options.category} onChange={(v) => update("category", v)} />
        <Select label="Audience" value={filters.gender} options={options.gender} onChange={(v) => update("gender", v)} />
        <Select label="Color" value={filters.color} options={options.color} onChange={(v) => update("color", v)} />
        <Select label="Garment Type" value={filters.garment} options={options.garment} onChange={(v) => update("garment", v)} />
        <Select label="Material" value={filters.material} options={options.material} onChange={(v) => update("material", v)} />
        <Select label="Aesthetic" value={filters.aesthetic} options={options.aesthetic} onChange={(v) => update("aesthetic", v)} />
        <Select label="Status" value={filters.status} options={options.status} onChange={(v) => update("status", v)} />
        <label className="text-xs text-muted">
          From
          <input type="date" className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm" value={filters.from} onChange={(e) => update("from", e.target.value)} />
        </label>
        <label className="text-xs text-muted">
          To
          <input type="date" className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm" value={filters.to} onChange={(e) => update("to", e.target.value)} />
        </label>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Updating results…</p>
      ) : results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-muted">
          No trends match these filters. Clear a filter to see the catalog again.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="px-4 py-3">Trend</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Trend Score</th>
                <th className="px-4 py-3">Growth</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">30-Day Forecast</th>
                <th className="px-4 py-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {results.map((t) => (
                <tr key={t.slug} className="border-b border-line last:border-0 hover:bg-lavender-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/trends/${t.slug}`} className="font-medium text-lavender-600">
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{t.category}</td>
                  <td className="px-4 py-3">{t.trendScore}</td>
                  <td className="px-4 py-3">
                    {t.growth > 0 ? "+" : ""}
                    {t.growth.toFixed(0)}%
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={t.displayStatus as DisplayStatus} />
                  </td>
                  <td className="px-4 py-3">{t.forecast30}</td>
                  <td className="px-4 py-3">{t.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-xs text-muted">
      {label}
      <select
        className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm text-ink"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
