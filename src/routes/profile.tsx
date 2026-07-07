import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_PROFILE, loadProfile, saveProfile, type Profile } from "@/lib/profile";
import { loadOrders, type Order } from "@/lib/orders";
import { Pencil, Check, Package, Sparkles } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — CampusCart" },
      { name: "description", content: "Your CampusCart identity, vibe check and stats." },
    ],
  }),
  component: ProfilePage,
});

const AVATARS = ["🦄", "🐸", "🐙", "🦖", "👾", "🐨", "🧋", "🌮", "🍄", "🪐"];

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfile(loadProfile());
    setOrders(loadOrders());
  }, []);

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  function startEdit() {
    setDraft(profile);
    setEditing(true);
  }
  function save() {
    saveProfile(draft);
    setProfile(draft);
    setEditing(false);
  }

  return (
    <div className="py-8 space-y-8">
      <div className="glass-strong rounded-3xl p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative">
            <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-fuchsia-500/40 via-purple-500/30 to-cyan-400/40 text-6xl animate-float">
              {(editing ? draft.avatar : profile.avatar)}
            </div>
            {editing && (
              <div className="mt-3 flex flex-wrap gap-1 max-w-[7rem]">
                {AVATARS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setDraft({ ...draft, avatar: a })}
                    className={`grid h-7 w-7 place-items-center rounded-lg text-base transition ${draft.avatar === a ? "bg-white/20 ring-1 ring-cyan-400" : "hover:bg-white/10"}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            {editing ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <Field label="Username" value={draft.username} onChange={(v) => setDraft({ ...draft, username: v })} />
                <Field label="Email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
                <Field label="College" value={draft.college} onChange={(v) => setDraft({ ...draft, college: v })} />
                <Field label="Year" value={draft.year} onChange={(v) => setDraft({ ...draft, year: v })} />
                <Field label="Vibe" value={draft.vibe} onChange={(v) => setDraft({ ...draft, vibe: v })} />
                <div className="sm:col-span-2">
                  <label className="text-xs text-muted-foreground">Bio</label>
                  <textarea
                    value={draft.bio}
                    onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-xl glass px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold">{profile.name}</h1>
                  <span className="rounded-full glass px-3 py-1 text-xs text-cyan-300">{profile.username}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.year} · {profile.college}
                </p>
                <p className="mt-3 text-sm">{profile.bio}</p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full glass px-3 py-1 text-xs">
                  <Sparkles className="h-3 w-3 text-fuchsia-400" />
                  Vibe: <span className="neon-text font-semibold">{profile.vibe}</span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={editing ? save : startEdit}
            className="inline-flex items-center gap-2 self-start rounded-full btn-glow px-4 py-2 text-sm"
          >
            {editing ? <><Check className="h-4 w-4" /> Save</> : <><Pencil className="h-4 w-4" /> Edit</>}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Orders" value={orders.length} />
          <Stat label="Spent" value={`$${totalSpent.toFixed(0)}`} />
          <Stat label="Wallet tears" value={orders.length > 0 ? "💧".repeat(Math.min(orders.length, 5)) : "0"} />
        </div>
      </div>

      <section>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold">
            Past <span className="neon-text">orders</span>
          </h2>
          <Link to="/orders" className="text-xs text-cyan-300 hover:underline">View all →</Link>
        </div>

        {orders.length === 0 ? (
          <div className="glass mt-4 rounded-2xl p-8 text-center">
            <Package className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No orders yet. Your wallet is thriving. Suspicious.
            </p>
            <Link to="/shop" className="mt-4 inline-flex rounded-full btn-glow px-4 py-2 text-sm">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.slice(0, 3).map((o) => (
              <OrderRow key={o.id} order={o} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl glass px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-2xl p-4 text-center">
      <div className="font-display text-2xl font-bold neon-text">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <Link
      to="/orders"
      className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
    >
      <div className="flex -space-x-3">
        {order.items.slice(0, 3).map((it, i) => (
          <div
            key={i}
            className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${it.gradient} text-2xl ring-2 ring-background`}
          >
            {it.emoji}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <div className="font-display text-sm font-semibold">{order.id}</div>
        <div className="text-xs text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-lg font-bold neon-text">${order.total.toFixed(2)}</div>
        <div className="text-[11px] text-cyan-300">{order.status}</div>
      </div>
    </Link>
  );
}
