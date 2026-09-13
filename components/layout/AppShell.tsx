"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Compass,
  GitCompare,
  Instagram,
  LayoutDashboard,
  Menu,
  Radar,
  SlidersHorizontal,
  X
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/explorer", label: "Trend Explorer", icon: Compass },
  { href: "/radar", label: "Trend Radar", icon: Radar },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/simulator", label: "Simulator", icon: SlidersHorizontal },
  { href: "/instagram", label: "Instagram Signals", icon: Instagram },
  { href: "/methodology", label: "Methodology", icon: Activity }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-line bg-white/90 p-5 backdrop-blur lg:static lg:w-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="font-serif text-3xl tracking-tight">TRENDIQ</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
              Fashion intelligence
            </p>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="space-y-1">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                  active
                    ? "bg-lavender-50 text-lavender-600"
                    : "text-muted hover:bg-paper hover:text-ink"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 rounded-2xl border border-lavender-200 bg-lavender-50 px-3 py-3 text-xs text-lavender-600">
          Prototype / Demo Data
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper/80 px-4 py-3 backdrop-blur lg:hidden">
          <p className="font-serif text-2xl">TRENDIQ</p>
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
