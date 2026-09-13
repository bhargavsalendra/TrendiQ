import { DemoBanner } from "@/components/ui/DemoBanner";
import { KpiCard } from "@/components/ui/KpiCard";
import { TrendCard } from "@/components/ui/TrendCard";
import { RadarMap } from "@/components/charts/RadarMap";
import { featuredEmerging, getCategoryAnalytics, getKpis, getTrendImage, getTrends, MENSWEAR_EDITORIAL_IMAGES } from "@/lib/catalog";

export default function DashboardPage() {
  const trends = getTrends();
  const kpis = getKpis(trends);
  const featured = featuredEmerging(trends);
  const categories = getCategoryAnalytics(trends);
  const lead = featured[0];

  return (
    <div>
      <DemoBanner />
      <section className="relative overflow-hidden rounded-3xl border border-lavender-200 bg-[#29243b] px-6 py-10 text-white shadow-card md:px-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lavender-500/30 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-lavender-200">Fashion Trend Intelligence · September 2026</p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] md:text-7xl">See the signal before the headline.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
            TRENDIQ connects search, social, product, consumer, and Instagram momentum to show
            what is rising, fading, and next — with evidence you can act on.
          </p>
          {lead ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink">Leading signal: {lead.name}</span>
              <span className="text-sm text-lavender-200">Score {lead.trendScore} · Instagram +{lead.instagram.growth.toFixed(0)}%</span>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
        <KpiCard label="Total Trends" value={kpis.total} hint="Demo catalog" />
        <KpiCard label="Emerging" value={kpis.emerging} hint="Early-warning flags" />
        <KpiCard label="Rising" value={kpis.rising} />
        <KpiCard label="Stable" value={kpis.stable} />
        <KpiCard label="Declining" value={kpis.declining} />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl">Top Emerging Trends</h2>
            <p className="text-sm text-muted">Computed from momentum, acceleration, Instagram lift, and cross-source agreement.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((trend) => (
            <TrendCard key={trend.slug} trend={trend} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Men's image reference wall</p>
          <h2 className="font-serif text-3xl">Materials, silhouettes, movement</h2>
          <p className="text-sm text-muted">
            Real editorial reference photography sourced from Unsplash. These images are visual context, not live social posts.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {MENSWEAR_EDITORIAL_IMAGES.map((item) => (
            <figure key={item.title} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div className="h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-3">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Image source: Unsplash · Check the individual photographer license before commercial reuse.</p>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Editorial lookbook · Menswear</p>
            <h2 className="font-serif text-3xl">The new men's wardrobe</h2>
            <p className="text-sm text-muted">
              Original TRENDIQ fashion concepts paired with simulated intelligence signals.
            </p>
          </div>
          <span className="hidden text-xs text-muted sm:block">6 visual stories</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trends
            .filter((trend) => trend.gender === "Menswear")
            .map((trend) => (
              <a
                key={trend.slug}
                href={`/trends/${trend.slug}`}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getTrendImage(trend.slug)}
                    alt={`${trend.name} menswear editorial`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-ink">
                    {trend.garmentType}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-serif text-2xl">{trend.name}</h3>
                    <p className="mt-1 text-xs text-muted">{trend.material} · {trend.aesthetic}</p>
                  </div>
                  <span className="text-sm font-medium text-lavender-600">{trend.trendScore}/100</span>
                </div>
              </a>
            ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          Editorial reference imagery from Unsplash · Used as visual trend context, not product photography.
        </p>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-lavender-600">New menswear lens</p>
            <h2 className="font-serif text-3xl">Men's fashion, moving now</h2>
            <p className="text-sm text-muted">Original TRENDIQ trend concepts with simulated search, product, consumer, and Instagram signals.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trends.filter((trend) => trend.gender === "Menswear").slice(0, 3).map((trend) => (
            <TrendCard key={trend.slug} trend={trend} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Signal landscape</p>
              <h2 className="font-serif text-3xl">Momentum radar</h2>
            </div>
            <span className="text-xs text-muted">Top 8 by growth</span>
          </div>
          <RadarMap trends={trends} />
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Category lens</p>
          <h2 className="mt-1 font-serif text-3xl">Where attention is moving</h2>
          <div className="mt-5 space-y-4">
            {categories.slice(0, 5).map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between text-sm">
                  <span>{category.category}</span>
                  <span className="font-medium">{category.averageScore}<span className="text-muted">/100</span></span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-paper">
                  <div className="h-2 rounded-full bg-lavender-500" style={{ width: `${category.averageScore}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted">{category.leadingTrend} leads · {category.averageGrowth > 0 ? "+" : ""}{category.averageGrowth}% avg growth</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
