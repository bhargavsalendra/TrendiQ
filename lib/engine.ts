import { DATASET_END, SERIES_DAYS, SIGNAL_KEYS } from "./seeds";
import { getInstagramPosts, getInstagramSeed } from "./instagram";
import {
  Classification,
  DisplayStatus,
  InstagramMetrics,
  SignalKey,
  SignalMetrics,
  SignalPoint,
  TrendMetrics,
  TrendSeed,
  WEIGHTS
} from "./types";

export function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function round0(n: number) {
  return Math.round(n);
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDate(offsetFromEnd: number) {
  const d = new Date(DATASET_END);
  d.setUTCDate(d.getUTCDate() - (SERIES_DAYS - 1 - offsetFromEnd));
  return d.toISOString().slice(0, 10);
}

function bezier(early: number, mid: number, late: number, t: number) {
  const u = 1 - t;
  return u * u * early + 2 * u * t * mid + t * t * late;
}

export function generateSeries(seed: TrendSeed): SignalPoint[] {
  const rand = mulberry32(seed.seed);
  const points: SignalPoint[] = [];

  for (let i = 0; i < SERIES_DAYS; i++) {
    const t = i / (SERIES_DAYS - 1);
    const accel = t * t;
    const point: SignalPoint = {
      date: isoDate(i),
      search: null,
      social: null,
      products: null,
      consumer: null,
      engagement: null
    };

    for (const key of SIGNAL_KEYS) {
      const { early, mid, late } = seed.signals[key];
      const curve = bezier(early, mid, late, 0.35 * t + 0.65 * accel);
      const noise = (rand() - 0.5) * 3.2;
      let value = clamp(curve + noise);
      if (rand() < 0.015) {
        point[key] = null;
      } else {
        point[key] = round1(value);
      }
    }
    points.push(point);
  }

  return points;
}

function values(series: SignalPoint[], key: SignalKey | "overall") {
  if (key === "overall") {
    return series.map((p) => {
      const nums = SIGNAL_KEYS.map((k) => p[k]).filter((v): v is number => v != null);
      if (!nums.length) return null;
      return nums.reduce((a, b) => a + b, 0) / nums.length;
    });
  }
  return series.map((p) => p[key]);
}

function lastNumber(list: Array<number | null>) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i] != null) return list[i] as number;
  }
  return 0;
}

function valueAtOffset(list: Array<number | null>, offset: number) {
  const start = Math.max(0, list.length - 1 - offset);
  for (let i = start; i >= 0; i--) {
    if (list[i] != null) return list[i] as number;
  }
  return lastNumber(list);
}

export function pctChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function filled(list: Array<number | null>) {
  const out: number[] = [];
  let last = 0;
  let started = false;
  for (const v of list) {
    if (v == null) {
      if (started) out.push(last);
    } else {
      started = true;
      last = v;
      out.push(v);
    }
  }
  return out;
}

export function linearRegression(y: number[]) {
  const n = y.length;
  if (n < 2) return { slope: 0, intercept: y[0] ?? 0, r2: 0 };
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += y[i];
    sumXY += i * y[i];
    sumXX += i * i;
  }
  const denom = n * sumXX - sumX * sumX;
  const slope = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  let ssTot = 0;
  let ssRes = 0;
  const mean = sumY / n;
  for (let i = 0; i < n; i++) {
    const pred = intercept + slope * i;
    ssRes += (y[i] - pred) ** 2;
    ssTot += (y[i] - mean) ** 2;
  }
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  return { slope, intercept, r2 };
}

export function metricsFromSeries(
  series: SignalPoint[],
  key: SignalKey | "overall"
): SignalMetrics {
  const list = values(series, key);
  const current = lastNumber(list);
  const prev30 = valueAtOffset(list, 30);
  const prev14 = valueAtOffset(list, 14);
  const prev28 = valueAtOffset(list, 28);
  const growth = pctChange(current, prev30);
  const recent = pctChange(current, prev14);
  const prior = pctChange(prev14, prev28);
  const acceleration = recent - prior;
  const window = filled(list).slice(-60);
  const { slope, intercept } = linearRegression(window);
  const forecast30 = clamp(intercept + slope * (window.length + 29));
  const momentum = 0.65 * growth + 0.35 * recent;
  return {
    current: round1(current),
    growth: round1(growth),
    momentum: round1(momentum),
    acceleration: round1(acceleration),
    forecast30: round0(forecast30)
  };
}

export function mapGrowthToScore(growthPct: number) {
  return clamp(40 + growthPct * 1.5);
}

export function momentumFeature(level: number, growthPct: number, accel: number) {
  const g = mapGrowthToScore(growthPct);
  const a = clamp(50 + accel * 1.15);
  return clamp(0.42 * level + 0.48 * g + 0.1 * a);
}

export function classify(score: number): Classification {
  if (score <= 34) return "DECLINING";
  if (score <= 64) return "STABLE";
  return "RISING";
}

export function consistencyScore(growths: number[]) {
  const positive = growths.filter((g) => g > 4).length;
  const negative = growths.filter((g) => g < -4).length;
  const ratio = positive / growths.length;
  const disagreement = Math.min(positive, negative);
  return clamp(ratio * 100 - disagreement * 8);
}

export function historicalPatternScore(series: SignalPoint[]) {
  const overall = filled(values(series, "overall"));
  if (overall.length < 20) return 50;
  const first = overall.slice(0, 20).reduce((a, b) => a + b, 0) / 20;
  const last = overall.slice(-20).reduce((a, b) => a + b, 0) / 20;
  const lift = pctChange(last, first);
  return clamp(50 + lift * 0.7);
}

export function isEmergingTrend(input: {
  trendScore: number;
  currentInterest: number;
  growth: number;
  acceleration: number;
  consistency: number;
  forecast30: number;
}) {
  const moderatePopularity =
    input.currentInterest >= 38 && input.currentInterest <= 72;
  const strongMomentum = input.growth >= 18;
  const positiveAccel = input.acceleration > 0;
  const consistent = input.consistency >= 72;
  const positiveForecast = input.forecast30 >= input.trendScore + 8;
  return (
    moderatePopularity &&
    strongMomentum &&
    positiveAccel &&
    consistent &&
    positiveForecast
  );
}

export function confidenceFromFit(
  series: SignalPoint[],
  consistency: number,
  emergingBonus = false
) {
  const overall = filled(values(series, "overall")).slice(-60);
  const { r2 } = linearRegression(overall);
  const completeness =
    (series.reduce((acc, p) => {
      return (
        acc + SIGNAL_KEYS.filter((k) => p[k] != null).length / SIGNAL_KEYS.length
      );
    }, 0) /
      series.length) *
    100;
  const base = 0.45 * clamp(r2 * 100) + 0.35 * consistency + 0.2 * completeness;
  return clamp(base + (emergingBonus ? 2 : 0));
}

export function evidenceFromMetrics(m: {
  signals: Record<SignalKey, SignalMetrics>;
  instagram: InstagramMetrics;
  consistency: number;
  acceleration: number;
  forecast30: number;
  trendScore: number;
}) {
  const items: string[] = [];
  if (m.signals.search.growth > 8) items.push("Search interest is increasing");
  else if (m.signals.search.growth < -8) items.push("Search interest is cooling");
  if (m.signals.social.acceleration > 2 || m.signals.social.growth > 12) {
    items.push("Social engagement is accelerating");
  }
  if (m.signals.products.growth > 8) items.push("Product adoption is increasing");
  if (m.instagram.growth > 10) items.push(`Instagram momentum is up ${round0(m.instagram.growth)}%`);
  if (m.instagram.engagementRate >= 4) items.push("Instagram engagement is above the demo benchmark");
  if (m.consistency >= 72) items.push("Multiple signals agree");
  if (m.acceleration > 0) items.push("Recent momentum remains positive");
  if (m.forecast30 > m.trendScore) items.push("The 30-day forecast is above today's score");
  if (!items.length) items.push("Signals are mixed; treat this as a watchlist item");
  return items.slice(0, 6);
}

export function explainTrend(trend: {
  name: string;
  classification: Classification;
  emerging: boolean;
  signals: Record<SignalKey, SignalMetrics>;
  instagram: InstagramMetrics;
  forecast30: number;
  trendScore: number;
}) {
  const movers = SIGNAL_KEYS.map((key) => ({
    key,
    growth: trend.signals[key].growth
  })).sort((a, b) => b.growth - a.growth);
  const top = movers.slice(0, 2);
  const direction =
    trend.classification === "DECLINING"
      ? "cool"
      : trend.classification === "STABLE"
        ? "hold rather than break out"
        : "rise";
  const early = trend.emerging
    ? `${trend.name} is not simply popular today. The engine flagged it as early-stage because current interest is still moderate while growth and acceleration are already strong. `
    : "";
  return `${early}${trend.name} is predicted to ${direction} because ${top[0].key} momentum is ${top[0].growth > 0 ? "+" : ""}${round0(top[0].growth)}% and ${top[1].key} is ${top[1].growth > 0 ? "+" : ""}${round0(top[1].growth)}%. Instagram momentum is ${trend.instagram.growth > 0 ? "also rising" : "cooling"} at ${trend.instagram.growth > 0 ? "+" : ""}${round0(trend.instagram.growth)}%, while product adoption is ${trend.signals.products.growth > 0 ? "also moving up" : "not keeping pace"}. Multiple signals are ${trend.signals.search.growth > 0 && trend.signals.social.growth > 0 ? "moving in the same direction" : "not fully aligned"}, and the 30-day forecast is ${round0(trend.forecast30)} versus a current score of ${round0(trend.trendScore)}.`;
}

export function scoreFromFeatures(features: TrendMetrics["features"]) {
  return clamp(
    features.searchMomentum * WEIGHTS.searchMomentum +
      features.instagramMomentum * WEIGHTS.instagramMomentum +
      features.productGrowth * WEIGHTS.productGrowth +
      features.consumerInterest * WEIGHTS.consumerInterest +
      features.engagement * WEIGHTS.engagement +
      features.historicalPattern * WEIGHTS.historicalPattern +
      features.consistency * WEIGHTS.consistency
  );
}

function instagramMetricsFromSeed(seed: TrendSeed): InstagramMetrics {
  const source = getInstagramSeed(seed);
  const post = getInstagramPosts(seed.slug)[0];
  const growth = pctChange(source.late, source.mid);
  const recent = pctChange(source.late, source.mid);
  const prior = pctChange(source.mid, source.early);
  const acceleration = recent - prior;
  const postGrowth = growth;
  const engagementGrowth = growth * 0.9;
  const creatorGrowth = growth * 0.55;
  const hashtagGrowth = growth * 0.8;
  const momentum = clamp(
    50 + (postGrowth + engagementGrowth + creatorGrowth + hashtagGrowth) / 4
  );
  const engagement = post
    ? post.likes + post.comments + post.saves + post.shares
    : Math.round(source.postCount * source.engagementRate);
  return {
    category: seed.category === "Aesthetic" ? seed.aesthetic : seed.category,
    hashtag: source.topHashtag,
    current: round1(source.late),
    growth: round1(growth),
    momentum: round1(momentum),
    acceleration: round1(acceleration),
    forecast30: round0(clamp(source.late + (source.late - source.mid) * 1.4)),
    postCount: source.postCount,
    engagement,
    likes: post?.likes ?? Math.round(engagement * 0.78),
    comments: post?.comments ?? Math.round(engagement * 0.02),
    shares: post?.shares ?? Math.round(engagement * 0.04),
    saves: post?.saves ?? Math.round(engagement * 0.16),
    engagementRate: source.engagementRate,
    weeklyGrowth: round1(growth * 0.45),
    monthlyGrowth: round1(growth),
    postGrowth: round1(postGrowth),
    engagementGrowth: round1(engagementGrowth),
    creatorGrowth: round1(creatorGrowth),
    hashtagGrowth: round1(hashtagGrowth),
    creatorCount: post ? Math.max(1, Math.round(source.postCount / 320)) : Math.max(1, Math.round(source.postCount / 260)),
    timestamp: post?.postedAt ?? "2026-09-12",
    imageUrl: post?.imageUrl ?? "",
    source: "Instagram Demo Dataset",
    confidence: round0(clamp(62 + source.late * 0.25)),
    topHashtag: source.topHashtag
  };
}

function snapshot(series: SignalPoint[], seed: TrendSeed) {
  const signals = {
    search: metricsFromSeries(series, "search"),
    social: metricsFromSeries(series, "social"),
    products: metricsFromSeries(series, "products"),
    consumer: metricsFromSeries(series, "consumer"),
    engagement: metricsFromSeries(series, "engagement")
  };
  const overall = metricsFromSeries(series, "overall");
  const instagram = instagramMetricsFromSeed(seed);
  const historicalPattern = historicalPatternScore(series);
  const consistency = consistencyScore(SIGNAL_KEYS.map((k) => signals[k].growth));
  const features = {
    searchMomentum: momentumFeature(
      signals.search.current,
      signals.search.growth,
      signals.search.acceleration
    ),
    socialMomentum: momentumFeature(
      signals.social.current,
      signals.social.growth,
      signals.social.acceleration
    ),
    productGrowth: momentumFeature(
      signals.products.current,
      signals.products.growth,
      signals.products.acceleration
    ),
    consumerInterest: momentumFeature(
      signals.consumer.current,
      signals.consumer.growth,
      signals.consumer.acceleration
    ),
    engagement: momentumFeature(
      signals.engagement.current,
      signals.engagement.growth,
      signals.engagement.acceleration
    ),
    instagramMomentum: instagram.momentum,
    historicalPattern,
    consistency
  };
  return {
    signals,
    overall,
    historicalPattern,
    consistency,
    instagram,
    features,
    trendScore: scoreFromFeatures(features)
  };
}

export function quadraticForecast(y: number[], steps: number) {
  const n = y.length;
  if (n < 3) return y[y.length - 1] ?? 50;
  let sX = 0,
    sX2 = 0,
    sX3 = 0,
    sX4 = 0,
    sY = 0,
    sXY = 0,
    sX2Y = 0;
  for (let i = 0; i < n; i++) {
    const x = i;
    const x2 = x * x;
    sX += x;
    sX2 += x2;
    sX3 += x2 * x;
    sX4 += x2 * x2;
    sY += y[i];
    sXY += x * y[i];
    sX2Y += x2 * y[i];
  }
  const A = [
    [n, sX, sX2],
    [sX, sX2, sX3],
    [sX2, sX3, sX4]
  ];
  const B = [sY, sXY, sX2Y];
  const coeff = solve3(A, B);
  if (!coeff) {
    const { slope, intercept } = linearRegression(y);
    return intercept + slope * (n - 1 + steps);
  }
  const x = n - 1 + steps;
  return coeff[0] + coeff[1] * x + coeff[2] * x * x;
}

function solve3(A: number[][], B: number[]) {
  const M = A.map((row, i) => [...row, B[i]]);
  for (let i = 0; i < 3; i++) {
    let max = i;
    for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[max][i])) max = r;
    [M[i], M[max]] = [M[max], M[i]];
    if (Math.abs(M[i][i]) < 1e-8) return null;
    const div = M[i][i];
    for (let c = i; c < 4; c++) M[i][c] /= div;
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const f = M[r][i];
      for (let c = i; c < 4; c++) M[r][c] -= f * M[i][c];
    }
  }
  return [M[0][3], M[1][3], M[2][3]];
}

function forecastScores(series: SignalPoint[], seed: TrendSeed) {
  const scores: number[] = [];
  const start = Math.max(50, series.length - 40);
  for (let i = start; i < series.length; i += 2) {
    scores.push(snapshot(series.slice(0, i + 1), seed).trendScore);
  }
  const current = snapshot(series, seed).trendScore;
  if (scores.length < 3) {
    return { forecast7: round0(current), forecast30: round0(current) };
  }
  const raw30 = quadraticForecast(scores, 15);
  const raw7 = quadraticForecast(scores, 4);
  const cap = (raw: number, maxLift: number) => {
    if (!Number.isFinite(raw)) return round0(current);
    const delta = Math.max(-20, Math.min(maxLift, raw - current));
    return round0(clamp(current + delta));
  };
  return {
    forecast7: cap(raw7, 10),
    forecast30: cap(raw30, 28)
  };
}

export function analyzeTrend(seed: TrendSeed, series = generateSeries(seed)): TrendMetrics {
  const snap = snapshot(series, seed);
  const { signals, overall, instagram, historicalPattern, consistency, features } = snap;
  const trendScore = round0(snap.trendScore);
  const { forecast7, forecast30 } = forecastScores(series, seed);
  const classification = classify(trendScore);
  const emerging = isEmergingTrend({
    trendScore,
    currentInterest: overall.current,
    growth: overall.growth,
    acceleration: overall.acceleration,
    consistency,
    forecast30
  });
  const displayStatus: DisplayStatus = emerging ? "EMERGING" : classification;
  const confidence = round0(confidenceFromFit(series, consistency, emerging));
  const metrics: TrendMetrics = {
    slug: seed.slug,
    name: seed.name,
    gender: seed.gender ?? "Unisex",
    category: seed.category,
    colorFamily: seed.colorFamily,
    garmentType: seed.garmentType,
    material: seed.material,
    aesthetic: seed.aesthetic,
    summary: seed.summary,
    series,
    signals,
    instagram,
    overall,
    trendScore,
    currentInterest: round0(overall.current),
    forecast7,
    forecast30,
    growth: overall.growth,
    acceleration: overall.acceleration,
    confidence,
    consistency: round0(consistency),
    historicalPattern: round0(historicalPattern),
    classification,
    emerging,
    displayStatus,
    evidence: [],
    explanation: "",
    features: {
      searchMomentum: round0(features.searchMomentum),
      socialMomentum: round0(features.socialMomentum),
      productGrowth: round0(features.productGrowth),
      instagramMomentum: round0(features.instagramMomentum),
      consumerInterest: round0(features.consumerInterest),
      engagement: round0(features.engagement),
      historicalPattern: round0(historicalPattern),
      consistency: round0(consistency)
    }
  };
  metrics.evidence = evidenceFromMetrics(metrics);
  metrics.explanation = explainTrend(metrics);
  return metrics;
}

export type SimulationShocks = Partial<Record<SignalKey | "instagram", number>>;

export function simulateTrend(trend: TrendMetrics, shocks: SimulationShocks) {
  const shockedSeries = trend.series.map((point, index) => {
    const t = index / (trend.series.length - 1);
    const weight = Math.max(0, (t - 0.55) / 0.45);
    const next = { ...point };
    for (const key of SIGNAL_KEYS) {
      const current = point[key];
      if (current == null) continue;
      const bump = current * ((shocks[key] ?? 0) / 100) * weight;
      next[key] = clamp(current + bump);
    }
    return next;
  });

  const fakeSeed: TrendSeed = {
    slug: trend.slug,
    name: trend.name,
    category: trend.category,
    colorFamily: trend.colorFamily,
    garmentType: trend.garmentType,
    material: trend.material,
    aesthetic: trend.aesthetic,
    summary: trend.summary,
    seed: 1,
    instagram: {
      early: trend.instagram.current - trend.instagram.growth,
      mid: trend.instagram.current,
      late: clamp(trend.instagram.current * (1 + (shocks.instagram ?? 0) / 100)),
      postCount: trend.instagram.postCount,
      engagementRate: Math.max(0, trend.instagram.engagementRate + (shocks.instagram ?? 0) / 20),
      topHashtag: trend.instagram.topHashtag
    },
    signals: {
      search: { early: 0, mid: 0, late: 0 },
      social: { early: 0, mid: 0, late: 0 },
      products: { early: 0, mid: 0, late: 0 },
      consumer: { early: 0, mid: 0, late: 0 },
      engagement: { early: 0, mid: 0, late: 0 }
    }
  };
  return analyzeTrend(fakeSeed, shockedSeries);
}

export function chartSeries(trend: TrendMetrics, key: SignalKey | "overall") {
  const hist = trend.series.map((p) => {
    const raw =
      key === "overall"
        ? SIGNAL_KEYS.map((k) => p[k]).filter((v): v is number => v != null)
        : [p[key]];
    const value =
      key === "overall"
        ? raw.length
          ? raw.reduce((a, b) => a + b, 0) / raw.length
          : null
        : p[key];
    return { date: p.date, historical: value, forecast: null as number | null };
  });

  const y = filled(
    hist.map((d) => d.historical)
  ).slice(-60);
  const { slope, intercept } = linearRegression(y);
  const lastDate = new Date(trend.series[trend.series.length - 1].date);
  const lastHist = hist[hist.length - 1];
  lastHist.forecast = lastHist.historical;
  const forecast: typeof hist = [];
  for (let i = 1; i <= 30; i++) {
    const d = new Date(lastDate);
    d.setUTCDate(d.getUTCDate() + i);
    forecast.push({
      date: d.toISOString().slice(0, 10),
      historical: null,
      forecast: round1(clamp(intercept + slope * (y.length - 1 + i)))
    });
  }
  return [...hist, ...forecast];
}
