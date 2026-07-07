import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { addOrder, makeOrderId } from "@/lib/orders";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — CampusCart" },
      { name: "description", content: "Review your CampusCart items before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  function checkout() {
    if (detailed.length === 0) return;
    addOrder({
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      items: detailed.map(({ product, qty }) => ({
        productId: product.id,
        qty,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        gradient: product.gradient,
      })),
      subtotal,
      shipping,
      total,
      status: "Processing",
    });
    clear();
    navigate({ to: "/orders" });
  }


  if (count === 0) {
    return (
      <div className="grid place-items-center py-24">
        <div className="glass max-w-md rounded-3xl p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl btn-glow animate-glow">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">Your cart is suspiciously empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't worry, we won't judge. (Much.)
          </p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full btn-glow px-5 py-3 text-sm">
            Find something cute
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="font-display text-4xl font-bold">
        Your <span className="neon-text">cart</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {count} item{count > 1 ? "s" : ""} · last chance to change your mind
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {detailed.map(({ product, qty }) => (
            <div key={product.id} className="glass flex gap-4 rounded-2xl p-4">
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className={`grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${product.gradient} text-4xl`}
              >
                {product.emoji}
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/product/$id" params={{ id: product.id }} className="font-display text-base font-semibold hover:neon-text">
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-destructive transition"
                    aria-label="remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full glass p-1">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10"
                      aria-label="decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10"
                      aria-label="increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold neon-text">
                    ${(product.price * qty).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">
            Clear cart
          </button>
        </div>

        <aside className="glass-strong sticky top-24 h-fit rounded-3xl p-6">
          <h2 className="font-display text-xl font-bold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal < 50 && (
              <p className="text-xs text-cyan-300">
                Add ${(50 - subtotal).toFixed(2)} more for free dorm delivery
              </p>
            )}
            <div className="my-3 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm">Total</span>
              <span className="font-display text-2xl font-bold neon-text">${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={checkout}
            className="mt-6 w-full rounded-full btn-glow animate-glow py-3 text-sm"
          >
            Checkout
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Your wallet might cry, but your style won't.
          </p>
        </aside>
      </div>
    </div>
  );
}
