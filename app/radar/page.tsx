import Link from "next/link";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RadarMap } from "@/components/charts/RadarMap";
import { getTrends } from "@/lib/catalog";

export default function RadarPage() {
  const trends = getTrends();
  const emerging = [...trends].filter((t) => t.emerging).sort((a, b) => b.growth - a.growth);
  const watch = emerging[0] ?? trends.find((t) => t.slug === "utility-core") ?? trends[0];

  return (
    <div>
      <DemoBanner />
      <h1 className="font-serif text-4xl">Trend Radar</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Identify early-stage trends before they become mainstream. An emerging flag requires moderate
        current popularity, strong momentum, positive acceleration, cross-source consistency, and a
        positive forecast — not merely a high score. Instagram momentum adds a social-proof layer
        without allowing one platform to dominate the decision.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <RadarMap trends={trends} />
        </div>
        {watch ? (
          <div className="rounded-3xl border border-lavender-200 bg-white p-6 shadow-card">
            <p className="text-sm">🚨 Early trend detected</p>
            <h2 className="mt-2 font-serif text-4xl">{watch.name}</h2>
            <StatusBadge status={watch.displayStatus} />
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <p>Current Score <strong>{watch.trendScore}/100</strong></p>
              <p>30-Day Forecast <strong>{watch.forecast30}/100</strong></p>
              <p>Growth <strong>{watch.growth > 0 ? "+" : ""}{watch.growth.toFixed(0)}%</strong></p>
              <p>Confidence <strong>{watch.confidence}%</strong></p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted">
              <span>Search {fmt(watch.signals.search.growth)}</span>
              <span>Social {fmt(watch.signals.social.growth)}</span>
              <span>Products {fmt(watch.signals.products.growth)}</span>
              <span>Consumer {fmt(watch.signals.consumer.growth)}</span>
            </div>
            <p className="mt-5 text-sm leading-6">
              This is not simply a popular trend. The system detected accelerating growth across
              multiple signals. Current popularity is {watch.currentInterest < 70 ? "still moderate" : "already elevated"},
              but momentum and acceleration indicate potential future growth.
            </p>
            <Link href={`/trends/${watch.slug}`} className="mt-4 inline-block text-sm text-lavender-600">
              Open evidence →
            </Link>
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {emerging.map((trend) => (
          <Link key={trend.slug} href={`/trends/${trend.slug}`} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl">{trend.name}</h3>
              <StatusBadge status={trend.displayStatus} />
            </div>
            <p className="mt-2 text-sm text-muted">
              Score {trend.trendScore} · Forecast {trend.forecast30} · Growth {fmt(trend.growth)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function fmt(n: number) {
  return `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;
}
