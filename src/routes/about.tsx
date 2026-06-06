import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Code2, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CampusCart" },
      { name: "description", content: "The story of CampusCart: built by a first-year college student fueled by deadlines, ramen and ambition." },
      { property: "og:title", content: "About · CampusCart" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="py-12">
      <section className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-16">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
        <span className="relative inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Our story
        </span>
        <h1 className="relative mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
          Built by a student.<br />
          <span className="neon-text">For students who are barely holding on.</span>
        </h1>
        <p className="relative mt-5 max-w-2xl text-muted-foreground">
          CampusCart started as a project. Then it became a portfolio piece. Then a small obsession.
          Now it's whatever you're looking at right now — built by a first-year college student
          who learned React between lectures and broke production at 2am at least twice.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Coffee,
            title: "Powered by caffeine",
            text: "Roughly 4 espressos per feature. The cart total includes emotional damage.",
          },
          {
            icon: Code2,
            title: "Learning in public",
            text: "Every glassy panel and neon glow is a lesson in CSS, taste, and restraint (mostly the first two).",
          },
          {
            icon: Heart,
            title: "Made for the chaos",
            text: "We sell stuff that makes campus life slightly less painful and slightly more aesthetic.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <div className="grid h-11 w-11 place-items-center rounded-xl btn-glow">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 glass rounded-3xl p-8 md:p-12">
        <h2 className="font-display text-3xl font-bold">A very honest FAQ</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            { q: "Is this a real store?", a: "It's a prototype. The vibes are real. The checkout is not." },
            { q: "Who built it?", a: "A college student who probably should be revising right now." },
            { q: "Why glass everywhere?", a: "Because it looks like you're rich and chaotic at the same time." },
            { q: "Will you add more products?", a: "Once finals are over. Probably. Maybe. Hold us accountable." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 p-5">
              <h4 className="font-display font-semibold">{f.q}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 text-center">
        <Link to="/shop" className="inline-flex rounded-full btn-glow animate-glow px-7 py-3 text-sm">
          Okay, take me shopping
        </Link>
      </div>
    </div>
  );
}
