import { analyzeTrend } from "./engine";
import { getInstagramCategoryAnalytics } from "./instagram";
import { TREND_SEEDS } from "./seeds";
import { TrendMetrics } from "./types";

let cache: TrendMetrics[] | null = null;

export function getTrends(): TrendMetrics[] {
  if (!cache) {
    cache = TREND_SEEDS.map((seed) => analyzeTrend(seed));
  }
  return cache;
}

export function getTrend(slug: string) {
  return getTrends().find((t) => t.slug === slug) ?? null;
}

export function getKpis(trends = getTrends()) {
  return {
    total: trends.length,
    emerging: trends.filter((t) => t.emerging).length,
    rising: trends.filter((t) => t.displayStatus === "RISING").length,
    stable: trends.filter((t) => t.displayStatus === "STABLE").length,
    declining: trends.filter((t) => t.displayStatus === "DECLINING").length
  };
}

export function featuredEmerging(trends = getTrends()) {
  const preferred = ["cherry-red", "oversized-denim", "utility-core", "butter-yellow"];
  const featured = preferred
    .map((slug) => trends.find((t) => t.slug === slug))
    .filter((t): t is TrendMetrics => Boolean(t));
  return featured;
}

export function getCategoryAnalytics(trends = getTrends()) {
  return Array.from(new Set(trends.map((trend) => trend.category)))
    .map((category) => {
      const group = trends.filter((trend) => trend.category === category);
      return {
        category,
        trendCount: group.length,
        averageScore: Math.round(group.reduce((sum, trend) => sum + trend.trendScore, 0) / group.length),
        averageGrowth: Math.round(group.reduce((sum, trend) => sum + trend.growth, 0) / group.length),
        leadingTrend: [...group].sort((a, b) => b.trendScore - a.trendScore)[0]?.name ?? "—"
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);
}

export { getInstagramCategoryAnalytics };

const TREND_IMAGES: Record<string, string> = {
  "cherry-red": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
  "oversized-denim": "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80",
  "utility-core": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80",
  "butter-yellow": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80",
  "ballet-flats": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80"
  ,"relaxed-mens-tailoring": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
  ,"technical-outerwear": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80"
  ,"mens-knit-polo": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=80"
  ,"wide-leg-chinos": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
  ,"retro-running-sneakers": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
  ,"resort-shirt": "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=80"
  ,"mens-relaxed-denim": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85"
  ,"mens-cargo-trousers": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85"
  ,"mens-linen-shirt": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85"
  ,"old-money-prep": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85"
  ,"double-denim": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=85"
  ,"denim-on-denim": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85"
};

export function getTrendImage(slug: string) {
  return TREND_IMAGES[slug] ?? "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80";
}

export const MENSWEAR_EDITORIAL_IMAGES = [
  {
    title: "Washed denim layers",
    detail: "Relaxed denim · Indigo",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Utility cargo study",
    detail: "Modern cargo · Olive",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Linen in natural light",
    detail: "Camp shirt · European linen",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Soft tailoring",
    detail: "Relaxed suiting · Charcoal",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Archive runners",
    detail: "Retro sneakers · Mesh and suede",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Modern resort",
    detail: "Open-collar shirt · Linen blend",
    image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Old money layers",
    detail: "Cable knit · Quiet prep",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Double denim",
    detail: "Tonal indigo · Americana",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Selvedge workwear",
    detail: "Denim-on-denim · Craft",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=85"
  }
] as const;

export const DATASET_NOTICE =
  "TRENDIQ Intelligence Dataset — values and Instagram records are modeled.";
