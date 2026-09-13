import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { getTrendImage } from "@/lib/catalog";
import { TrendMetrics } from "@/lib/types";

export function TrendCard({ trend }: { trend: TrendMetrics }) {
  return (
    <Link
      href={`/trends/${trend.slug}`}
      className="block rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-lavender-200"
    >
      <div className="flex gap-4">
        <img
          src={getTrendImage(trend.slug)}
          alt=""
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{trend.gender} · {trend.category}</p>
              <h3 className="mt-1 font-serif text-2xl">{trend.name}</h3>
            </div>
            <StatusBadge status={trend.displayStatus} />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{trend.summary}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <Metric label="Trend Score" value={`${trend.trendScore}/100`} />
        <Metric label="Growth" value={`${trend.growth > 0 ? "+" : ""}${trend.growth.toFixed(0)}%`} />
        <Metric label="30-Day Forecast" value={`${trend.forecast30}`} />
        <Metric label="Confidence" value={`${trend.confidence}%`} />
        <Metric label="Instagram Momentum" value={`${trend.instagram.growth > 0 ? "+" : ""}${trend.instagram.growth.toFixed(0)}%`} />
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 text-ink">{value}</p>
    </div>
  );
}
