import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [popped, setPopped] = useState(false);

  return (
    <div className="group glass relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-10px_rgba(167,139,250,0.45)]">
      <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${product.gradient} grid place-items-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <span className="text-7xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110 animate-float">
          {product.emoji}
        </span>
        <span className="absolute left-3 top-3 rounded-full glass px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
      </div>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="mt-4 block"
      >
        <h3 className="font-display text-lg font-semibold leading-tight hover:neon-text transition-all">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.blurb}</p>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-xl font-bold neon-text">${product.price}</span>
        <button
          onClick={() => {
            add(product.id);
            setPopped(true);
            setTimeout(() => setPopped(false), 400);
          }}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs btn-glow hover:[&]:btn-glow-hover ${popped ? "scale-110" : ""} transition-transform`}
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>
  );
}
