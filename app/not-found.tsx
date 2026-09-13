import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-line bg-white p-8">
      <h1 className="font-serif text-3xl">Trend not found</h1>
      <p className="mt-2 text-muted">That slug is not in the TRENDIQ catalog.</p>
      <Link href="/explorer" className="mt-4 inline-block text-lavender-600">
        Back to Trend Explorer
      </Link>
    </div>
  );
}
