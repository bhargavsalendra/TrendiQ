"use client";

export default function ErrorState({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-8">
      <h1 className="font-serif text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted">{error.message || "The prototype could not finish this view."}</p>
      <button className="mt-4 rounded-full bg-lavender-500 px-4 py-2 text-sm text-white" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
