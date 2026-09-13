import Link from "next/link";
import { ArrowUpRight, Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { getInstagramCategoryAnalytics, getInstagramPosts } from "@/lib/instagram";
import { getTrendImage, getTrends } from "@/lib/catalog";

export default function InstagramPage() {
  const trends = getTrends();
  const categories = getInstagramCategoryAnalytics(trends);
  const leaders = [...trends].sort((a, b) => b.instagram.momentum - a.instagram.momentum).slice(0, 4);
  const posts = getInstagramPosts();
  const totalPosts = trends.reduce((sum, trend) => sum + trend.instagram.postCount, 0);
  const averageEngagement =
    trends.reduce((sum, trend) => sum + trend.instagram.engagementRate, 0) / trends.length;

  return (
    <div>
      <DemoBanner />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-lavender-600">Social intelligence</p>
          <h1 className="mt-2 font-serif text-5xl">Instagram Signals</h1>
          <p className="mt-3 max-w-2xl text-muted">
            See which aesthetics are earning attention, saves, and conversation. Instagram Momentum
            contributes 15% of every TRENDIQ score.
          </p>
        </div>
        <span className="rounded-full border border-line bg-white px-3 py-2 text-xs text-muted">Demo feed · API-ready schema</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Indexed posts" value={totalPosts.toLocaleString()} />
        <Stat label="Avg engagement" value={`${averageEngagement.toFixed(1)}%`} />
        <Stat label="Leading trend" value={leaders[0]?.name ?? "—"} />
        <Stat label="Signals tracked" value={`${trends.length}`} />
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Category analytics</p>
          <h2 className="mt-1 font-serif text-3xl">Where the feed is moving</h2>
          <div className="mt-5 space-y-3">
            {categories.map((category) => (
              <div key={category.category} className="rounded-xl border border-line p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-lavender-600">{category.averageMomentum} momentum</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-paper">
                  <div className="h-2 rounded-full bg-[#df7896]" style={{ width: `${Math.min(100, category.averageMomentum)}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>{category.leadingTrend} leads</span>
                  <span>{category.postVolume.toLocaleString()} posts · {category.averageEngagementRate.toFixed(1)}% avg engagement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Momentum leaderboard</p>
          <h2 className="mt-1 font-serif text-3xl">Trends earning attention</h2>
          <div className="mt-5 space-y-3">
            {leaders.map((trend, index) => (
              <Link key={trend.slug} href={`/trends/${trend.slug}`} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-paper">
                <span className="w-5 text-sm text-muted">0{index + 1}</span>
                <img src={getTrendImage(trend.slug)} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{trend.name}</span>
                  <span className="block text-xs text-muted">{trend.instagram.topHashtag} · {trend.instagram.postCount.toLocaleString()} posts</span>
                </span>
                <span className="text-sm font-medium text-lavender-600">+{trend.instagram.growth.toFixed(0)}%</span>
                <ArrowUpRight size={16} className="text-muted" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Sample evidence</p>
            <h2 className="font-serif text-3xl">What the demo feed is seeing</h2>
          </div>
          <span className="text-xs text-muted">Simulated records</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => {
            const trend = trends.find((item) => item.slug === post.trendSlug);
            return (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <img src={post.imageUrl} alt="" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{post.handle}</span>
                    <span>{post.postedAt}</span>
                  </div>
                  <p className="mt-3 text-sm leading-5">{post.caption}</p>
                  <Link href={`/trends/${post.trendSlug}`} className="mt-3 inline-block text-xs font-medium text-lavender-600">
                    {trend?.name} evidence →
                  </Link>
                  <div className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-xs text-muted">
                    <span className="inline-flex items-center gap-1"><Heart size={13} />{compact(post.likes)}</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle size={13} />{post.comments}</span>
                    <span className="inline-flex items-center gap-1"><Bookmark size={13} />{compact(post.saves)}</span>
                    <span className="inline-flex items-center gap-1"><Send size={13} />{post.shares}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 truncate font-serif text-2xl">{value}</p>
    </div>
  );
}

function compact(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k` : value.toString();
}
