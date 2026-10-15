/**
 * IEEE vTools Events API client.
 *
 * Confirmed working (via Postman) against the real response schema:
 *   GET https://events.vtools.ieee.org/api/public/v8/events/list?tags=ieee&limit=2
 *
 * Note: this is NOT the `/RST/events/api/public/v8/...` path shown in the
 * public docs — that path appears to require an authenticated session. The
 * bare `/api/public/v8/...` path is the one that actually works unauthenticated.
 *
 * The API filters by tag server-side via `?tags=`, so we ask for `ieee`
 * directly instead of fetching everything and filtering after the fact.
 * We still re-check each event's `tags` array locally as a safety net, in
 * case the server-side match is partial/fuzzy.
 */

import { VTOOLS_FALLBACK_EVENTS } from "@/data/vtoolsFallback";
import { OFFICIAL_R10_EVENTS } from "@/data/r10Events";

const EVENTS_URL =
  process.env.VTOOLS_EVENTS_URL ||
  "https://events.vtools.ieee.org/api/public/v8/events/list";

// The API's `tags` param wants the tag without the leading `#`.
// Default to IEEEXtreme so it pulls the exact event feed shown on Vercel.
const HASHTAG_RAW = (process.env.VTOOLS_HASHTAG_FILTER || "IEEEXtreme").replace(/^#/, "");
const HASHTAG = `#${HASHTAG_RAW}`.toLowerCase();

// vTools doesn't expose a `region=` query param on events/list, so region is
// filtered locally against each event's `primary-host.region_spoids` (e.g.
// "R10" or "R0"). Set to an empty string to disable region filtering entirely.
const REGION_ENV = (process.env.VTOOLS_REGION_FILTER ?? "").toUpperCase();
const ALLOWED_REGIONS = REGION_ENV
  ? REGION_ENV.split(",").map((r) => r.trim())
  : ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R0"];

export type ImportantDate = {
  label: string;
  date: string;
};

export type XtremeEvent = {
  id: string;
  title: string;
  description: string;
  photo: string | null;
  registerUrl: string | null;
  hashtags: string[];
  section: string | null;
  studentBranch: string | null;
  region: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  isVirtual: boolean;
  theme?: string | null;
  websiteUrl?: string | null;
  tracks?: string[];
  importantDates?: ImportantDate[];
  coChairs?: string[];
  category?: "Conference" | "Symposium" | "Congress" | "Webinar" | "Grant" | "Competition";
};

type RawEvent = Record<string, any>;

function firstString(...vals: any[]): string | null {
  for (const v of vals) {
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return null;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  nbsp: " ",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  mdash: "\u2014",
  ndash: "\u2013"
};

/** Strips HTML tags from vTools' rich-text `description` field and decodes common entities. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&([a-z#0-9]+);/gi, (m, code) => ENTITIES[code.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

/** Pulls the first embedded image out of the description HTML, as a fallback banner photo. */
function firstEmbeddedImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function extractHashtags(attrs: RawEvent): string[] {
  const fromTags: string[] = Array.isArray(attrs.tags) ? attrs.tags.map(String) : [];
  const fromKeywords: string[] =
    typeof attrs.keywords === "string" ? attrs.keywords.split(/\s+/) : [];

  const merged = [...fromTags, ...fromKeywords]
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.startsWith("#") ? t : `#${t}`));

  return Array.from(new Set(merged));
}

function normalizeEvent(raw: RawEvent): XtremeEvent {
  const attrs: RawEvent = raw.attributes ?? raw;
  const host = attrs["primary-host"] ?? {};
  const description = attrs.description ?? "";

  const photo = firstString(attrs.image) ?? firstEmbeddedImage(description);
  const registerUrl = firstString(attrs["registration-url"], attrs.link);

  return {
    id: String(raw.id ?? attrs.id ?? crypto.randomUUID()),
    title: firstString(attrs.title) ?? "Untitled event",
    description: stripHtml(description),
    photo,
    registerUrl,
    hashtags: extractHashtags(attrs),
    section: host.type_description === "Section" ? firstString(host.name) : null,
    studentBranch:
      host.type_description === "Student Branch" ? firstString(host.name) : null,
    region: (() => {
      let r = firstString(host.region_spoids);
      if (r) {
        r = r.toUpperCase();
        if (r === "R0") return "R10";
        return r;
      }
      return "R10";
    })(),
    startTime: firstString(attrs["start-time"]),
    endTime: firstString(attrs["end-time"]),
    location: firstString(attrs.city),
    isVirtual: Boolean(attrs.virtual)
  };
}

const INITIAL_EVENTS: XtremeEvent[] = (() => {
  const seen = new Set<string>();
  const list: XtremeEvent[] = [];
  for (const ev of [...OFFICIAL_R10_EVENTS, ...VTOOLS_FALLBACK_EVENTS]) {
    if (!seen.has(ev.id)) {
      seen.add(ev.id);
      list.push(ev);
    }
  }
  return list;
})();

let memoryCache: XtremeEvent[] = INITIAL_EVENTS;
let isRefreshing = false;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

async function refreshFromVtools(): Promise<void> {
  const now = Date.now();
  if (isRefreshing || (lastFetchTime > 0 && now - lastFetchTime < CACHE_TTL_MS)) {
    return;
  }
  isRefreshing = true;

  try {
    const fetchTag = async (tag: string, limit: string) => {
      const params = new URLSearchParams({
        tags: tag,
        limit,
        sort: "-start-time"
      });
      const res = await fetch(`${EVENTS_URL}?${params.toString()}`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "r10-xtreme-site/1.0 (+https://xtreme-r10.vercel.app)"
        },
        next: { revalidate: 900 }
      });
      if (!res.ok) return [];
      const json = await res.json();
      return (json?.data as RawEvent[]) ?? [];
    };

    const results = await Promise.allSettled([
      fetchTag(HASHTAG_RAW, "60"),
      fetchTag("ieee", "100")
    ]);

    const rawMap = new Map<string, RawEvent>();
    for (const r of results) {
      if (r.status === "fulfilled") {
        for (const item of r.value) {
          const id = String(item.id ?? item.attributes?.id);
          if (id && !rawMap.has(id)) {
            rawMap.set(id, item);
          }
        }
      }
    }

    const rawEvents = Array.from(rawMap.values());
    const vtoolsEvents = rawEvents
      .map(normalizeEvent)
      .filter((event) => {
        if (!REGION_ENV && ALLOWED_REGIONS.length === 0) return true;
        return !event.region || ALLOWED_REGIONS.includes(event.region.toUpperCase());
      });

    if (vtoolsEvents.length > 0) {
      const seen = new Set<string>();
      const merged: XtremeEvent[] = [];
      for (const ev of [...OFFICIAL_R10_EVENTS, ...vtoolsEvents]) {
        if (!seen.has(ev.id)) {
          seen.add(ev.id);
          merged.push(ev);
        }
      }
      memoryCache = merged;
      lastFetchTime = Date.now();
    }
  } catch (err) {
    console.warn("Background vTools refresh notice:", err);
  } finally {
    isRefreshing = false;
  }
}

/**
 * Fetches events live from IEEE vTools Events API (matching the Vercel deployment),
 * returning instantly from memory/cache and refreshing in the background.
 */
export async function fetchIEEEEvents(): Promise<XtremeEvent[]> {
  // Non-blocking background revalidation
  refreshFromVtools().catch(() => {});
  return memoryCache;
}

export async function getEventById(id: string): Promise<XtremeEvent | undefined> {
  const events = await fetchIEEEEvents();
  const match = events.find((e) => e.id === id);
  if (match) return match;
  return OFFICIAL_R10_EVENTS.find((e) => e.id === id);
}