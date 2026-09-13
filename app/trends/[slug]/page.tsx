import { notFound } from "next/navigation";
import { TREND_SEEDS } from "@/lib/seeds";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { HistoryForecastChart } from "@/components/charts/HistoryForecastChart";
import { SignalLineChart } from "@/components/charts/SignalLineChart";
import { getTrend, getTrendImage } from "@/lib/catalog";
import { getInstagramPosts } from "@/lib/instagram";
import { chartSeries } from "@/lib/engine";
import { SIGNAL_LABELS, SignalKey } from "@/lib/types";
import { Check } from "lucide-react";

const SIGNAL_ORDER: SignalKey[] = ["search", "social", "products", "consumer", "engagement"];

export function generateStaticParams() {
  return TREND_SEEDS.map((seed) => ({ slug: seed.slug }));
}

export default function TrendDetailPage({ params }: { params: { slug: string } }) {
  const trend = getTrend(params.slug);
  if (!trend) notFound();

  const overallChart = chartSeries(trend, "overall");
  const instagramPosts = getInstagramPosts(trend.slug);
  const why = [
    { label: "Search Momentum", value: trend.signals.search.growth },
    { label: "Social Engagement", value: trend.signals.social.growth },
    { label: "Product Growth", value: trend.signals.products.growth },
    { label: "Consumer Interest", value: trend.signals.consumer.growth },
    { label: "Engagement", value: trend.signals.engagement.growth },
    { label: "Instagram Momentum", value: trend.instagram.growth },
    { label: "Acceleration", value: trend.acceleration }
  ];

  return (
    <div>
      <DemoBanner />
      <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{trend.gender} · {trend.category} · {trend.aesthetic}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-5xl">{trend.name}</h1>
            <StatusBadge status={trend.displayStatus} />
          </div>
          <p className="mt-3 max-w-2xl text-muted">{trend.summary}</p>
        </div>
        <img src={getTrendImage(trend.slug)} alt="" className="h-44 w-full rounded-2xl object-cover shadow-card" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Stat label="Trend Score" value={`${trend.trendScore}/100`} />
        <Stat label="Model Confidence" value={`${trend.confidence}%`} />
        <Stat label="Current Interest" value={`${trend.currentInterest}`} />
        <Stat label="30-Day Forecast" value={`${trend.forecast30}`} />
        <Stat label="Growth" value={`${trend.growth > 0 ? "+" : ""}${trend.growth.toFixed(0)}%`} />
        <Stat label="Acceleration" value={`${trend.acceleration > 0 ? "+" : ""}${trend.acceleration.toFixed(0)}`} />
        <Stat label="Instagram Momentum" value={`${trend.instagram.growth > 0 ? "+" : ""}${trend.instagram.growth.toFixed(0)}%`} />
      </div>

      <section className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-card">
        <h2 className="font-serif text-2xl">Historical Data → Forecast</h2>
        <p className="mb-4 text-sm text-muted">Solid fill is observed prototype history. Dashed area is the 30-day linear forecast.</p>
        <HistoryForecastChart data={overallChart} />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {SIGNAL_ORDER.map((key) => (
          <div key={key} className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <h3 className="mb-2 text-sm font-medium">{SIGNAL_LABELS[key]}</h3>
            <SignalLineChart
              data={trend.series.map((p) => ({ date: p.date, value: p[key] }))}
            />
          </div>
        ))}
        <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
          <h3 className="mb-2 text-sm font-medium">Overall Trend Score proxy</h3>
          <SignalLineChart
            color="#654FB0"
            data={overallChart
              .filter((d) => d.historical != null)
              .map((d) => ({ date: d.date, value: d.historical }))}
          />
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Social evidence</p>
              <h2 className="font-serif text-3xl">Instagram momentum</h2>
            </div>
            <span className="rounded-full bg-[#fcecf1] px-3 py-1 text-xs text-[#a34d69]">25% of score</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Current index" value={`${trend.instagram.current}`} />
            <Stat label="Growth" value={`${trend.instagram.growth > 0 ? "+" : ""}${trend.instagram.growth.toFixed(0)}%`} />
            <Stat label="Engagement" value={`${trend.instagram.engagementRate.toFixed(1)}%`} />
            <Stat label="Post volume" value={trend.instagram.postCount.toLocaleString()} />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            The demo adapter sees {trend.instagram.topHashtag} as the leading tag. Momentum combines
            recent post growth, engagement quality, and acceleration; it is not a live Instagram read.
          </p>
          {instagramPosts[0] ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-paper p-3">
              <img src={instagramPosts[0].imageUrl} alt="" className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-medium">{instagramPosts[0].handle}</p>
                <p className="truncate text-xs text-muted">{instagramPosts[0].caption}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Evidence ledger</p>
          <h2 className="font-serif text-3xl">Why the engine believes it</h2>
          <div className="mt-4 space-y-3">
            {trend.evidence.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-xl border border-line p-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lavender-50 text-xs text-lavender-600">0{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">Evidence is generated from the same deterministic demo snapshot used for scoring.</p>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-lavender-200 bg-lavender-50 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-lavender-600">Most important</p>
        <h2 className="mt-2 font-serif text-4xl">Why this trend?</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/80">{trend.explanation}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {why.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-4 shadow-soft">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
              <p className="mt-1 font-serif text-3xl">
                {item.value > 0 ? "+" : ""}
                {item.value.toFixed(0)}%
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm uppercase tracking-[0.16em] text-muted">Key Evidence</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {trend.evidence.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} className="mt-0.5 text-lavender-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <h3 className="text-sm uppercase tracking-[0.16em] text-muted">Model Decision</h3>
            <div className="mt-3 flex items-center gap-3">
              <StatusBadge status={trend.displayStatus} />
              <span className="text-sm text-muted">{trend.classification} by score band</span>
            </div>
            <p className="mt-4 font-serif text-4xl">{trend.trendScore}/100</p>
            <p className="text-sm text-muted">Trend Score from weighted signals</p>
            <p className="mt-3 text-sm">Confidence {trend.confidence}%</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl">{value}</p>
    </div>
  );
}
