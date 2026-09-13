import { DisplayStatus } from "@/lib/types";

const STYLES: Record<DisplayStatus, string> = {
  EMERGING: "bg-lavender-50 text-lavender-600",
  RISING: "bg-emerald-50 text-emerald-700",
  STABLE: "bg-amber-50 text-amber-800",
  DECLINING: "bg-rose-50 text-rose-700"
};

export function StatusBadge({ status }: { status: DisplayStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide ${STYLES[status]}`}>
      {status === "RISING" ? "RISING ↑" : status === "DECLINING" ? "DECLINING ↓" : status}
    </span>
  );
}
