import { DemoBanner } from "@/components/ui/DemoBanner";
import { WEIGHTS } from "@/lib/types";

const PIPELINE = [
  ["Search data", "Social data", "Product data", "Consumer data", "Instagram demo/API"],
  ["Data processing"],
  ["Feature engineering"],
  ["Momentum + acceleration"],
  ["Trend intelligence engine"],
  ["ML forecasting"],
  ["Trend score"],
  ["Rising / Stable / Declining"],
  ["Explainable evidence"]
];

export default function MethodologyPage() {
  return (
    <div>
      <DemoBanner />
      <h1 className="font-serif text-4xl">Methodology</h1>
      <p className="mt-3 max-w-2xl text-muted">
        TRENDIQ is a prototype intelligence layer. Today it runs a transparent scoring model on a
        local demo dataset. The same interfaces can later call approved APIs and a Python/Scikit-learn
        backend without changing the product flow.
      </p>

      <div className="mt-8 space-y-3">
        {PIPELINE.map((row, i) => (
          <div key={i} className="text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {row.map((step) => (
                <span
                  key={step}
                  className="rounded-full border border-lavender-200 bg-white px-4 py-2 text-sm shadow-soft"
                >
                  {step}
                </span>
              ))}
            </div>
            {i < PIPELINE.length - 1 ? <p className="py-1 text-lavender-400">↓</p> : null}
          </div>
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Explain title="Search Momentum" body="Measures changes in search interest over rolling 14- and 30-day windows." />
        <Explain title="Product Growth" body="Measures changes in fashion product availability and listing breadth in the prototype catalog." />
        <Explain title="Consumer Interest" body="Measures changes in consumer interaction intensity, independent of pure search volume." />
        <Explain title="Instagram Momentum" body="Combines Instagram post-volume growth, engagement rate, saves, and acceleration. Demo records are clearly labeled and can be replaced by an approved API adapter." />
        <Explain title="Acceleration" body="Measures whether trend growth itself is increasing by comparing recent growth to the prior window." />
        <Explain title="Cross-Source Consistency" body="Checks whether multiple signals support the same direction instead of rewarding a single noisy spike." />
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-card">
        <h2 className="font-serif text-3xl">Trend scoring</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>Search Momentum — {WEIGHTS.searchMomentum * 100}%</li>
          <li>Instagram Momentum — {WEIGHTS.instagramMomentum * 100}%</li>
          <li>Product Growth — {WEIGHTS.productGrowth * 100}%</li>
          <li>Consumer Interest — {WEIGHTS.consumerInterest * 100}%</li>
          <li>Engagement — {WEIGHTS.engagement * 100}%</li>
          <li>Historical Pattern — {WEIGHTS.historicalPattern * 100}%</li>
          <li>Cross-Source Consistency — {WEIGHTS.consistency * 100}%</li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          Trend Score is 0–100. Classification: 0–34 declining, 35–64 stable, 65–100 rising. Emerging
          detection additionally requires moderate current popularity, strong momentum, positive
          acceleration, cross-source consistency, and a positive forecast.
        </p>
        <p className="mt-3 rounded-xl bg-paper p-3 text-sm text-muted">
          Instagram Momentum is calculated from the API-ready post schema (volume, likes, comments,
          saves, shares, and engagement rate). This build uses deterministic demo records; no live
          account data is collected or implied.
        </p>
      </section>
    </div>
  );
}

function Explain({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
