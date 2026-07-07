import { Link } from "@tanstack/react-router";
import { ShoppingCart, Sparkles, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl btn-glow animate-glow">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Campus<span className="neon-text">Cart</span>
            </span>
          </Link>
          <div className="hidden gap-1 md:flex">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/orders", label: "Orders" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-white/10 text-foreground" }}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl glass px-3 py-2 text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 px-1 text-[10px] font-bold text-background animate-bounce-soft">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
