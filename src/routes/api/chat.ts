import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";

const SYSTEM_PROMPT = `You are the AI Assistant for CampusCart, a satirical e-commerce store built for sleep-deprived college students.

TONE: Witty, slightly sarcastic, deeply empathetic to exam cramming, bad roommates, and caffeine addictions. Keep replies short — 2 to 4 sentences max, punchy, meme-adjacent. Emojis welcome but don't overdo it.

RULES:
- If a user asks about a product, hype it like it's essential for surviving the semester.
- If they complain about classes, professors, exams, or roommates, give funny "academic survival advice" and suggest a CampusCart product that might solve it.
- Occasionally remind users the store isn't actually real, but their student debt very much is.
- Never invent facts, product specs, prices, shipping policies, or return policies not listed below. If you don't know: apologize in-character and tell them to email campuscartoff@gmail.com.
- Do not answer serious medical, legal, or financial questions — deflect with humor and the email above.
- Stay on brand. No politics, no NSFW.

REAL PRODUCT CATALOG (only these exist — do not invent others):
${PRODUCTS.map((p) => `- ${p.name} ($${p.price}, ${p.category}): ${p.blurb}`).join("\n")}
`;

interface ChatBody {
  messages?: { role: "user" | "assistant"; content: string }[];
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages)) {
          return new Response("messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.slice(-12),
            ],
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          if (upstream.status === 429) {
            return Response.json(
              { error: "Slow down, scholar. Rate limit hit — try again in a bit." },
              { status: 429 },
            );
          }
          if (upstream.status === 402) {
            return Response.json(
              { error: "The CampusCart AI ran out of credits. Wallet: crying." },
              { status: 402 },
            );
          }
          console.error("gateway error", upstream.status, text);
          return Response.json({ error: "AI is on a coffee break." }, { status: 500 });
        }

        const data = (await upstream.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "…I blanked. Try again?";
        return Response.json({ reply });
      },
    },
  },
});
