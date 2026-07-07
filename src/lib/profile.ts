export interface Profile {
  name: string;
  username: string;
  email: string;
  college: string;
  year: string;
  bio: string;
  avatar: string; // emoji
  vibe: string;
}

const KEY = "campuscart:profile:v1";

export const DEFAULT_PROFILE: Profile = {
  name: "Alex Sharma",
  username: "@sleepyscholar",
  email: "alex@campus.edu",
  college: "Neon State University",
  year: "First-year",
  bio: "Running on caffeine, deadlines, and questionable life choices.",
  avatar: "🦄",
  vibe: "Chaotic good",
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(p: Profile) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
