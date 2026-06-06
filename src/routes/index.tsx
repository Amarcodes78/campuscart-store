import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusCart — Everything a student needs, in one cart." },
      { name: "description", content: "Glassy, neon, slightly chaotic ecommerce for college students." },
      { property: "og:title", content: "CampusCart" },
      { property: "og:description", content: "Everything a student needs, in one cart." },
    ],
  }),
  component: Index,
});

const quirks = [
  "Your wallet might cry, but your style won't.",
  "Approved by stressed college students.",
  "Ships faster than your assignment deadline.",
  "Cheaper than that 4th coffee today.",
  "Tested on real sleep-deprived humans.",
];

function Index() {
  const featured = PRODUCTS.slice(0, 6);
  return (
    <div className="pb-10">
      {/* HERO */}
      <section className="relative grid gap-8 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span className="neon-text font-semibold">New drop · Fall semester</span>
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Everything a student needs,{" "}
            <span className="neon-text">in one cart.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Hoodies you'll live in. Tech that won't betray you. Stationery that
            looks better than your handwriting. Built for the chaos of campus.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full btn-glow animate-glow px-6 py-3 text-sm"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm hover:bg-white/10 transition"
            >
              Our story
            </Link>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-xs">
            {[
              { icon: Truck, label: "Free dorm delivery" },
              { icon: ShieldCheck, label: "Student warranty" },
              { icon: Zap, label: "1-day shipping" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass flex flex-col items-start gap-1 rounded-2xl p-3">
                <Icon className="h-4 w-4 text-cyan-300" />
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product showcase stack */}
        <div className="relative h-[420px] md:h-[520px]">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/40 via-purple-500/30 to-cyan-400/40 blur-3xl" />
          {featured.slice(0, 5).map((p, i) => {
            const positions = [
              "left-2 top-4 rotate-[-8deg]",
              "right-2 top-2 rotate-[6deg]",
              "left-1/2 top-1/3 -translate-x-1/2 rotate-[-2deg] scale-110 z-10",
              "left-6 bottom-6 rotate-[5deg]",
              "right-6 bottom-2 rotate-[-6deg]",
            ];
            return (
              <div
                key={p.id}
                className={`absolute ${positions[i]} glass-strong w-40 rounded-3xl p-3 animate-float`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <div className={`grid aspect-square place-items-center rounded-2xl bg-gradient-to-br ${p.gradient} text-5xl`}>
                  {p.emoji}
                </div>
                <p className="mt-2 line-clamp-1 text-xs font-medium">{p.name}</p>
                <p className="text-[10px] neon-text font-bold">${p.price}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Marquee */}
      <section className="my-10 overflow-hidden">
        <div className="flex w-max gap-12 animate-marquee whitespace-nowrap text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {[...quirks, ...quirks].map((q, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <Sparkles className="h-3 w-3 text-fuchsia-400" />
              {q}
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              This week's <span className="neon-text">obsessions</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The stuff currently flying off our (imaginary) shelves.
            </p>
          </div>
          <Link to="/shop" className="hidden text-sm text-cyan-300 hover:underline md:inline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
