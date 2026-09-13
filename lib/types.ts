export type SignalKey =
  | "search"
  | "social"
  | "products"
  | "consumer"
  | "engagement";

export type InstagramSeed = {
  early: number;
  mid: number;
  late: number;
  postCount: number;
  engagementRate: number;
  topHashtag: string;
};

export type InstagramMetrics = {
  category: string;
  hashtag: string;
  current: number;
  growth: number;
  momentum: number;
  acceleration: number;
  forecast30: number;
  postCount: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  weeklyGrowth: number;
  monthlyGrowth: number;
  postGrowth: number;
  engagementGrowth: number;
  creatorGrowth: number;
  hashtagGrowth: number;
  creatorCount: number;
  timestamp: string;
  imageUrl: string;
  source: "Instagram Demo Dataset" | "Instagram Graph API";
  confidence: number;
  topHashtag: string;
};

export type InstagramPost = {
  id: string;
  trendSlug: string;
  handle: string;
  caption: string;
  postedAt: string;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  imageUrl: string;
  hashtags: string[];
};

export type InstagramQuery = {
  trendSlug?: string;
  category?: TrendSeed["category"];
  since?: string;
  limit?: number;
};

export type InstagramApiAdapter = {
  listPosts: (query?: InstagramQuery) => Promise<InstagramPost[]>;
  getTrendSnapshot?: (trendSlug: string) => Promise<InstagramMetrics>;
};

export type Classification = "RISING" | "STABLE" | "DECLINING";
export type DisplayStatus = "EMERGING" | Classification;

export type SignalPoint = {
  date: string;
  search: number | null;
  social: number | null;
  products: number | null;
  consumer: number | null;
  engagement: number | null;
};

export type TrendSeed = {
  slug: string;
  name: string;
  gender?: "Womenswear" | "Menswear" | "Unisex";
  category: "Color" | "Garment" | "Aesthetic" | "Material" | "Footwear";
  colorFamily: string;
  garmentType: string;
  material: string;
  aesthetic: string;
  summary: string;
  seed: number;
  instagram?: InstagramSeed;
  signals: Record<
    SignalKey,
    {
      early: number;
      mid: number;
      late: number;
    }
  >;
};

export type SignalMetrics = {
  current: number;
  growth: number;
  momentum: number;
  acceleration: number;
  forecast30: number;
};

export type TrendMetrics = {
  slug: string;
  name: string;
  gender: "Womenswear" | "Menswear" | "Unisex";
  category: TrendSeed["category"];
  colorFamily: string;
  garmentType: string;
  material: string;
  aesthetic: string;
  summary: string;
  series: SignalPoint[];
  signals: Record<SignalKey, SignalMetrics>;
  instagram: InstagramMetrics;
  overall: SignalMetrics;
  trendScore: number;
  currentInterest: number;
  forecast7: number;
  forecast30: number;
  growth: number;
  acceleration: number;
  confidence: number;
  consistency: number;
  historicalPattern: number;
  classification: Classification;
  emerging: boolean;
  displayStatus: DisplayStatus;
  evidence: string[];
  explanation: string;
  features: {
    searchMomentum: number;
    socialMomentum: number;
    productGrowth: number;
    consumerInterest: number;
    engagement: number;
    instagramMomentum: number;
    historicalPattern: number;
    consistency: number;
  };
};

export const SIGNAL_LABELS: Record<SignalKey, string> = {
  search: "Search Interest",
  social: "Social Engagement",
  products: "Product Listings",
  consumer: "Consumer Interest",
  engagement: "Engagement"
};

export const WEIGHTS = {
  searchMomentum: 0.2,
  instagramMomentum: 0.25,
  productGrowth: 0.2,
  consumerInterest: 0.15,
  engagement: 0.1,
  historicalPattern: 0.05,
  consistency: 0.05
} as const;
