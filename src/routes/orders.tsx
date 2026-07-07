import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrders, type Order } from "@/lib/orders";
import { Package, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your orders — CampusCart" },
      { name: "description", content: "Every impulsive purchase you regret, in one place." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="grid place-items-center py-24">
        <div className="glass max-w-md rounded-3xl p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl btn-glow animate-glow">
            <Package className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">No orders. No regrets.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Yet. Your future self is definitely gonna buy something dumb.
          </p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full btn-glow px-5 py-3 text-sm">
            Fix that immediately
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="font-display text-4xl font-bold">
        Past <span className="neon-text">orders</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {orders.length} order{orders.length > 1 ? "s" : ""} · officially a shopaholic
      </p>

      <div className="mt-8 space-y-4">
        {orders.map((o) => {
          const expanded = open === o.id;
          return (
            <div key={o.id} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(expanded ? null : o.id)}
                className="flex w-full items-center gap-4 p-4 text-left hover:bg-white/5 transition"
              >
                <div className="flex -space-x-3">
                  {o.items.slice(0, 3).map((it, i) => (
                    <div
                      key={i}
                      className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${it.gradient} text-2xl ring-2 ring-background`}
                    >
                      {it.emoji}
                    </div>
                  ))}
                  {o.items.length > 3 && (
                    <div className="grid h-12 w-12 place-items-center rounded-xl glass text-xs ring-2 ring-background">
                      +{o.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold">{o.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString()} · {o.items.length} item
                    {o.items.length > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <span className="rounded-full glass px-3 py-1 text-[11px] text-cyan-300">
                    {o.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg font-bold neon-text">
                    ${o.total.toFixed(2)}
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              {expanded && (
                <div className="border-t border-white/10 p-4 space-y-3">
                  {o.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${it.gradient} text-xl`}
                      >
                        {it.emoji}
                      </div>
                      <div className="flex-1 text-sm">{it.name}</div>
                      <div className="text-xs text-muted-foreground">×{it.qty}</div>
                      <div className="w-20 text-right text-sm">
                        ${(it.price * it.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 border-t border-white/10 pt-3 text-sm space-y-1">
                    <Row label="Subtotal" value={`$${o.subtotal.toFixed(2)}`} />
                    <Row
                      label="Shipping"
                      value={o.shipping === 0 ? "Free 🎉" : `$${o.shipping.toFixed(2)}`}
                    />
                    <Row label="Total" value={`$${o.total.toFixed(2)}`} bold />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-display font-bold neon-text" : ""}`}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
