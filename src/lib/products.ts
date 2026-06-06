export type Category = "Hoodies" | "Stationery" | "Tech" | "Bottles" | "Backpacks";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  emoji: string;
  gradient: string;
  blurb: string;
  description: string;
  popularity: number;
  reviews: { author: string; rating: number; text: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "midnight-hoodie",
    name: "Midnight Cram Hoodie",
    price: 49,
    category: "Hoodies",
    emoji: "🧥",
    gradient: "from-fuchsia-500/40 via-purple-500/30 to-cyan-400/30",
    blurb: "Soft enough to nap in. Loud enough to flex.",
    description:
      "An oversized fleece hoodie engineered for 2am study sessions and 8am lectures alike. Built-in earbud loops because we know.",
    popularity: 98,
    reviews: [
      { author: "Anaya, CS Year 1", rating: 5, text: "Wore it 4 days in a row. No regrets." },
      { author: "Dev, Econ", rating: 4, text: "My professor said 'cool hoodie'. 10/10." },
    ],
  },
  {
    id: "neon-stationery-kit",
    name: "Neon Stationery Kit",
    price: 24,
    category: "Stationery",
    emoji: "✏️",
    gradient: "from-cyan-400/40 via-blue-500/30 to-fuchsia-500/30",
    blurb: "Highlighters that scream 'I have a plan'.",
    description:
      "5 gel pens, 3 highlighters, sticky tabs, and a tiny notebook that fits perfectly inside your textbook during boring lectures.",
    popularity: 84,
    reviews: [
      { author: "Riya, Bio", rating: 5, text: "Color coded my whole life. Therapy who?" },
    ],
  },
  {
    id: "pod-earbuds",
    name: "PodCram Earbuds",
    price: 39,
    category: "Tech",
    emoji: "🎧",
    gradient: "from-purple-500/40 via-pink-500/30 to-orange-400/30",
    blurb: "Cancel out roommates. And reality.",
    description:
      "Bluetooth 5.3, 28h battery, and a noise-cancel button you can mash mid-argument. USB-C, obviously.",
    popularity: 92,
    reviews: [
      { author: "Ishaan, Mech", rating: 5, text: "Couldn't hear my landlord. Bliss." },
      { author: "Mei, Design", rating: 4, text: "Bass slaps. Mic is meh." },
    ],
  },
  {
    id: "usb-vault",
    name: "USB-C Vault Drive 128GB",
    price: 19,
    category: "Tech",
    emoji: "💾",
    gradient: "from-emerald-400/40 via-cyan-400/30 to-purple-500/30",
    blurb: "For the assignment you 'definitely saved'.",
    description:
      "128GB of regret prevention. Aluminum body, keychain hole, USB-C + USB-A combo so it works on grandma's laptop too.",
    popularity: 67,
    reviews: [
      { author: "Tomás, History", rating: 5, text: "Saved my thesis. Literally." },
    ],
  },
  {
    id: "aurora-bottle",
    name: "Aurora Hydro Bottle 1L",
    price: 28,
    category: "Bottles",
    emoji: "🧴",
    gradient: "from-cyan-400/40 via-emerald-400/30 to-purple-500/30",
    blurb: "Drink water, look expensive.",
    description:
      "Triple-insulated stainless steel, holographic finish, leakproof lid. Keeps cold for 24h, hot for 12h. Dishwasher hates it.",
    popularity: 88,
    reviews: [
      { author: "Sana, Law", rating: 5, text: "Compliments daily. Hydration up 400%." },
    ],
  },
  {
    id: "void-backpack",
    name: "Void Tech Backpack",
    price: 79,
    category: "Backpacks",
    emoji: "🎒",
    gradient: "from-purple-500/40 via-fuchsia-500/30 to-cyan-400/30",
    blurb: "Fits a laptop, lunch, and your last shred of hope.",
    description:
      "16\" laptop sleeve, hidden anti-theft pocket, USB charging port, and water-resistant ripstop. Weighs almost nothing.",
    popularity: 95,
    reviews: [
      { author: "Kofi, Eng", rating: 5, text: "Survived a monsoon. Laptop dry. Vibes intact." },
      { author: "Lara, Arch", rating: 5, text: "So many pockets I keep finding snacks." },
    ],
  },
  {
    id: "study-hoodie-cream",
    name: "Cream Lecture Hoodie",
    price: 45,
    category: "Hoodies",
    emoji: "👕",
    gradient: "from-amber-300/40 via-pink-400/30 to-purple-500/30",
    blurb: "Looks like you slept. Feels like you didn't.",
    description: "Brushed cotton inside, ribbed cuffs, kangaroo pocket roomy enough for a phone + snack.",
    popularity: 71,
    reviews: [{ author: "Yuki, Math", rating: 4, text: "Cozy. Soft. Buy two." }],
  },
  {
    id: "ink-planner",
    name: "Ink Chaos Planner",
    price: 18,
    category: "Stationery",
    emoji: "📓",
    gradient: "from-pink-500/40 via-purple-500/30 to-cyan-400/30",
    blurb: "Plan your week. Ignore it beautifully.",
    description: "Undated weekly planner, dot grid pages, gold foil cover. Layflat binding for distraction-free doodling.",
    popularity: 60,
    reviews: [{ author: "Aarav, Psych", rating: 5, text: "Wrote 'gym' 12 times. Went once. Still cute." }],
  },
];

export const CATEGORIES: Category[] = ["Hoodies", "Stationery", "Tech", "Bottles", "Backpacks"];
