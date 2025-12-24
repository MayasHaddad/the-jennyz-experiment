import Link from "next/link";
import { Monitor, Hammer, Sparkles } from "lucide-react";

const variations = [
  {
    name: "Vanilla",
    slug: "vanilla",
    description: "The current app look and feel in production.",
    icon: Monitor,
    cardClass:
      "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100",
    iconClass: "text-zinc-400 dark:text-zinc-500",
    accentClass: "bg-zinc-400 dark:bg-zinc-600",
  },
  {
    name: "Brutalist",
    slug: "brutalist",
    description: "Raw, unpolished, and bold aesthetics.",
    icon: Hammer,
    cardClass:
      "bg-stone-100 dark:bg-stone-800 border-black dark:border-stone-100 text-black dark:text-stone-100 border-4 rounded-none shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] hover:shadow-[10px_10px_0px_0px_#000] dark:hover:shadow-[10px_10px_0px_0px_#fff]",
    iconClass: "text-black dark:text-white",
    accentClass: "bg-stone-900 dark:bg-stone-100",
  },
  {
    name: "Glassmorphic",
    slug: "glassmorphic",
    description: "Apple-inspired glassmorphism with mesh gradients.",
    icon: Sparkles,
    cardClass:
      "bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-indigo-950 dark:via-slate-900 dark:to-pink-950 text-slate-800 dark:text-slate-100 border-white/50 dark:border-white/10",
    iconClass: "text-indigo-400 dark:text-indigo-300",
    accentClass: "bg-gradient-to-r from-indigo-500 to-pink-500",
  },
];

export default function VariationsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center py-24 px-8 font-sans">
      {/* Header */}
      <div className="text-center mb-16">
        <Link
          href="/"
          className="group relative inline-block font-medium text-foreground"
        >
          <span>The Jennyz Experiment</span>
          <span className="absolute bottom-1 left-0 -z-10 h-1 w-full -rotate-1 rounded-sm bg-accent-red/60 transition-all duration-300 ease-in-out group-hover:-bottom-1 group-hover:-left-1 group-hover:h-[120%] group-hover:w-[105%] group-hover:-rotate-2 group-hover:scale-105"></span>
        </Link>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Select a Variation
        </h1>
        <p className="mt-4 text-lg text-foreground/60 max-w-md">
          Explore different visual styles for the same application.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {variations.map((variation) => {
          const Icon = variation.icon;
          return (
            <Link
              key={variation.slug}
              href={`/variations/${variation.slug}`}
              className={`group relative flex h-72 flex-col overflow-hidden rounded-2xl border p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${variation.cardClass}`}
            >
              {/* Icon */}
              <div className={`mb-4 ${variation.iconClass}`}>
                <Icon className="h-8 w-8" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {variation.name}
                </h2>
                <p className="mt-2 text-sm opacity-70 leading-relaxed">
                  {variation.description}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${variation.accentClass} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Hover arrow */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                Explore
                <span className="text-lg">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="mt-16 text-sm text-foreground/40">
        Click a card to preview the full experience
      </p>
    </div>
  );
}
