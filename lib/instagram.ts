import { InstagramApiAdapter, InstagramPost, InstagramSeed, TrendMetrics, TrendSeed } from "./types";
import { TREND_SEEDS } from "./seeds";

/**
 * Demo-only Instagram records. The shape intentionally mirrors the fields an
 * approved Graph API adapter would return, so swapping the source does not
 * require changing the UI.
 */
export const DEMO_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-001",
    trendSlug: "cherry-red",
    handle: "@atelier_notes",
    caption: "A single red layer is doing all the work this season.",
    postedAt: "2026-09-10",
    likes: 18420,
    comments: 318,
    saves: 2140,
    shares: 642,
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#cherryred", "#stylingnotes", "#fallfashion"]
  },
  {
    id: "ig-002",
    trendSlug: "oversized-denim",
    handle: "@streetedit",
    caption: "Volume, but make it polished. The new denim proportion.",
    postedAt: "2026-09-09",
    likes: 14210,
    comments: 256,
    saves: 1830,
    shares: 511,
    imageUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#oversizeddenim", "#denimedit", "#streetstyle"]
  },
  {
    id: "ig-003",
    trendSlug: "butter-yellow",
    handle: "@thecolorindex",
    caption: "Butter yellow is replacing white in soft tailoring.",
    postedAt: "2026-09-08",
    likes: 11980,
    comments: 189,
    saves: 1640,
    shares: 402,
    imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#butteryellow", "#colorforecast", "#softluxury"]
  },
  {
    id: "ig-004",
    trendSlug: "utility-core",
    handle: "@formandfunction",
    caption: "The pocket study: utility details are moving into clean silhouettes.",
    postedAt: "2026-09-07",
    likes: 9860,
    comments: 142,
    saves: 1980,
    shares: 308,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#utilitycore", "#functionalfashion", "#fieldnotes"]
  },
  {
    id: "ig-005",
    trendSlug: "ballet-flats",
    handle: "@dailyuniform",
    caption: "Flat, soft, and back in the daily rotation.",
    postedAt: "2026-09-06",
    likes: 8750,
    comments: 124,
    saves: 1100,
    shares: 220,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#balletflats", "#shoetrends", "#everydaystyle"]
  },
  {
    id: "ig-006",
    trendSlug: "olive-green",
    handle: "@materialculture",
    caption: "Olive is the neutral to watch for outerwear.",
    postedAt: "2026-09-05",
    likes: 7610,
    comments: 108,
    saves: 920,
    shares: 176,
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#olivegreen", "#outerwearedit", "#materialculture"]
  },
  {
    id: "ig-007",
    trendSlug: "platform-sneakers",
    handle: "@solecontext",
    caption: "A little extra height is making the comeback feel current.",
    postedAt: "2026-09-04",
    likes: 6920,
    comments: 96,
    saves: 740,
    shares: 148,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#platformsneakers", "#solecontext", "#footwearforecast"]
  },
  {
    id: "ig-008",
    trendSlug: "quiet-luxury",
    handle: "@theeditjournal",
    caption: "Quiet codes remain, but the conversation is getting quieter too.",
    postedAt: "2026-09-03",
    likes: 5240,
    comments: 64,
    saves: 410,
    shares: 82,
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    hashtags: ["#quietluxury", "#theeditjournal", "#stylecodes"]
  }
];

export const INSTAGRAM_SIGNAL_DEFAULTS: InstagramSeed = {
  early: 34,
  mid: 45,
  late: 61,
  postCount: 1240,
  engagementRate: 3.8,
  topHashtag: "#fashionforecast"
};

export function getInstagramPosts(slug?: string) {
  return slug ? DEMO_INSTAGRAM_POSTS.filter((post) => post.trendSlug === slug) : DEMO_INSTAGRAM_POSTS;
}

export const demoInstagramAdapter: InstagramApiAdapter = {
  async listPosts(query) {
    let posts = DEMO_INSTAGRAM_POSTS;
    if (query?.trendSlug) posts = posts.filter((post) => post.trendSlug === query.trendSlug);
    if (query?.category) {
      const slugs = new Set(TREND_SEEDS.filter((seed) => seed.category === query.category).map((seed) => seed.slug));
      posts = posts.filter((post) => slugs.has(post.trendSlug));
    }
    if (query?.since) posts = posts.filter((post) => post.postedAt >= query.since!);
    return query?.limit ? posts.slice(0, query.limit) : posts;
  }
};

export function getInstagramSeed(seed: TrendSeed): InstagramSeed {
  if (seed.instagram) return seed.instagram;
  const offset = ((seed.seed * 13) % 9) - 4;
  const early = Math.max(18, seed.signals.social.early + offset);
  const mid = Math.max(22, seed.signals.social.mid + offset * 0.6);
  const late = Math.max(20, seed.signals.social.late + offset);
  const posts = getInstagramPosts(seed.slug);
  const postCount = posts.length ? posts.length * 1280 : Math.round(760 + late * 15);
  const engagementRate = Math.round((2.8 + late / 38 + (posts.length ? 0.55 : 0)) * 10) / 10;
  return {
    early,
    mid,
    late,
    postCount,
    engagementRate,
    topHashtag: posts[0]?.hashtags[0] ?? `#${seed.slug.replace(/-/g, "")}`
  };
}

export type InstagramCategoryAnalytics = {
  category: string;
  trendCount: number;
  averageMomentum: number;
  averageEngagementRate: number;
  postVolume: number;
  leadingTrend: string;
};

export function getInstagramCategoryAnalytics(trends: TrendMetrics[]): InstagramCategoryAnalytics[] {
  const categories = Array.from(new Set(trends.map((trend) => trend.category)));
  return categories
    .map((category) => {
      const group = trends.filter((trend) => trend.category === category);
      const leader = [...group].sort((a, b) => b.instagram.momentum - a.instagram.momentum)[0];
      return {
        category,
        trendCount: group.length,
        averageMomentum: Math.round(group.reduce((sum, trend) => sum + trend.instagram.momentum, 0) / group.length),
        averageEngagementRate:
          Math.round((group.reduce((sum, trend) => sum + trend.instagram.engagementRate, 0) / group.length) * 10) / 10,
        postVolume: group.reduce((sum, trend) => sum + trend.instagram.postCount, 0),
        leadingTrend: leader?.name ?? "—"
      };
    })
    .sort((a, b) => b.averageMomentum - a.averageMomentum);
}
