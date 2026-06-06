import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — CampusCart" },
      { name: "description", content: "Browse hoodies, stationery, tech, bottles and backpacks built for college life." },
      { property: "og:title", content: "Shop · CampusCart" },
    ],
  }),
  component: Shop,
});

type Sort = "popular" | "low" | "high";

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("popular");
  const [max, setMax] = useState(100);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (cat === "All" || p.category === cat) &&
      p.price <= max &&
      (q.trim() === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.blurb.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "popular") list = list.sort((a, b) => b.popularity - a.popularity);
    if (sort === "low") list = list.sort((a, b) => a.price - b.price);
    if (sort === "high") list = list.sort((a, b) => b.price - a.price);
    return list;
  }, [q, cat, sort, max]);

  return (
    <div className="py-8">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          The <span className="neon-text">shop</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Filter, scroll, regret. In that order.
        </p>
      </header>

      <div className="glass mb-6 rounded-3xl p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for hoodies, vibes, life solutions…"
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:outline-none"
          >
            <option value="popular">Most popular</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1.5 text-xs border transition-all ${
                cat === c
                  ? "btn-glow border-transparent"
                  : "glass border-white/10 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span>Max ${max}</span>
            <input
              type="range"
              min={10}
              max={100}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="accent-fuchsia-500"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="font-display text-xl">No matches. Even Google gave up.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try fewer filters or a less specific vibe.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
