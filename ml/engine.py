"""TRENDIQ scoring contract for a future FastAPI + scikit-learn backend.

The live website currently uses the TypeScript engine in lib/engine.ts so the
demo runs without Python. Keep these weights and thresholds in sync.
"""

WEIGHTS = {
    "search_momentum": 0.20,
    "instagram_momentum": 0.25,
    "product_growth": 0.20,
    "consumer_interest": 0.15,
    "engagement": 0.10,
    "historical_pattern": 0.05,
    "consistency": 0.05,
}


def classify(score: float) -> str:
    if score <= 34:
        return "DECLINING"
    if score <= 64:
        return "STABLE"
    return "RISING"


def is_emerging(
    *,
    trend_score: float,
    current_interest: float,
    growth: float,
    acceleration: float,
    consistency: float,
    forecast_30: float,
) -> bool:
    return (
        38 <= current_interest <= 72
        and growth >= 18
        and acceleration > 0
        and consistency >= 72
        and forecast_30 >= trend_score + 8
    )
