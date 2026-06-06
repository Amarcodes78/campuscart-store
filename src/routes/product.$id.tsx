import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { PRODUCTS, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Minus, Plus, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — CampusCart` },
          { name: "description", content: loaderData.product.blurb },
          { property: "og:title", content: `${loaderData.product.name} · CampusCart` },
          { property: "og:description", content: loaderData.product.blurb },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="glass mx-auto my-20 max-w-md rounded-3xl p-10 text-center">
      <h1 className="font-display text-2xl">Product ghosted us.</h1>
      <Link to="/shop" className="mt-4 inline-flex rounded-xl px-4 py-2 btn-glow">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(1);

  return (
    <div className="py-8">
      <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <div className={`relative grid aspect-square place-items-center rounded-2xl bg-gradient-to-br ${product.gradient}`}>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <span className="text-[12rem] animate-float drop-shadow-2xl">{product.emoji}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="inline-flex w-fit rounded-full glass px-3 py-1 text-[10px] uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.blurb}</p>

          <div className="mt-5 flex items-center gap-4">
            <span className="font-display text-4xl font-bold neon-text">${product.price}</span>
            <div className="flex items-center gap-1 text-xs text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-2 text-muted-foreground">({product.reviews.length} students approve)</span>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="glass flex items-center gap-2 rounded-full p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                aria-label="decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
                aria-label="increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(product.id, qty)}
              className="rounded-full glass px-5 py-3 text-sm hover:bg-white/10 transition"
            >
              Add to cart
            </button>
            <button
              onClick={() => {
                add(product.id, qty);
                nav({ to: "/cart" });
              }}
              className="rounded-full btn-glow animate-glow px-6 py-3 text-sm"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-14">
        <h2 className="mb-5 font-display text-2xl font-bold">What students are saying</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {product.reviews.map((r: Product["reviews"][number], i: number) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{r.author}</span>
                <div className="flex text-amber-300">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
