import type { XtremeEvent } from "./vtools";

export interface R10LocationHub {
  id: string;
  name: string;
  country: string;
  flag: string;
  sectionName: string;
  coordinates: [number, number]; // [longitude, latitude]
  keywords: string[];
}

export const R10_COUNTRY_NAMES = new Set<string>([
  "Sri Lanka",
  "India",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Japan",
  "Australia",
  "China",
  "Pakistan",
  "Bangladesh",
  "Nepal",
  "Singapore",
  "Philippines",
  "New Zealand",
  "Vietnam",
  "South Korea",
  "Taiwan",
  "Fiji",
  "Hong Kong",
  "Papua New Guinea",
]);

export const R10_REGIONAL_HUB: R10LocationHub = {
  id: "R10_HUB",
  name: "R10 Regional Hub",
  country: "Asia-Pacific",
  flag: "🌏",
  sectionName: "IEEE Region 10 Flagship & Virtual Hub",
  coordinates: [94.0, 10.0],
  keywords: [
    "region 10",
    "r10",
    "sywl",
    "xtreme",
    "r10talk",
    "virtual",
    "asia-pacific",
  ],
};

export const R10_HUBS: R10LocationHub[] = [
  {
    id: "LK",
    name: "Sri Lanka",
    country: "Sri Lanka",
    flag: "🇱🇰",
    sectionName: "IEEE Sri Lanka Section",
    coordinates: [80.77, 7.87],
    keywords: [
      "sri lanka",
      "colombo",
      "balangoda",
      "vavuniya",
      "galle",
      "kandy",
      "kelaniya",
      "jayewardenepura",
      "moratuwa",
      "peradeniya",
      "sliit",
      "uok",
      "usj",
      "susl",
      "techxplore",
    ],
  },
  {
    id: "ID",
    name: "Indonesia",
    country: "Indonesia",
    flag: "🇮🇩",
    sectionName: "IEEE Indonesia Section",
    coordinates: [115.16, -8.65],
    keywords: [
      "indonesia",
      "bali",
      "badung",
      "jakarta",
      "bandung",
      "surabaya",
      "udayana",
      "jimbaran",
      "indonesiasection",
      "tencon",
      "volta",
    ],
  },
  {
    id: "MY",
    name: "Malaysia",
    country: "Malaysia",
    flag: "🇲🇾",
    sectionName: "IEEE Malaysia Section",
    coordinates: [100.33, 5.41],
    keywords: [
      "malaysia",
      "penang",
      "kuala lumpur",
      "selangor",
      "johor",
      "psdc",
      "malaysiasection",
      "tensymp",
    ],
  },
  {
    id: "TH",
    name: "Thailand",
    country: "Thailand",
    flag: "🇹🇭",
    sectionName: "IEEE Thailand Section",
    coordinates: [100.50, 13.75],
    keywords: [
      "thailand",
      "bangkok",
      "chulalongkorn",
      "phayao",
      "chiang mai",
      "thailandsection",
      "r10-htc",
      "r10 htc",
    ],
  },
  {
    id: "JP",
    name: "Japan",
    country: "Japan",
    flag: "🇯🇵",
    sectionName: "IEEE Japan Council & Fukuoka Section",
    coordinates: [130.88, 33.88],
    keywords: [
      "japan",
      "kitakyushu",
      "tokyo",
      "fukuoka",
      "osaka",
      "kyoto",
      "nagoya",
      "sendai",
      "japan council",
    ],
  },
  {
    id: "AU",
    name: "Australia",
    country: "Australia",
    flag: "🇦🇺",
    sectionName: "IEEE Australia Sections",
    coordinates: [138.60, -34.92],
    keywords: [
      "australia",
      "adelaide",
      "sydney",
      "melbourne",
      "canberra",
      "brisbane",
      "perth",
      "queensland",
      "western australia",
    ],
  },
  {
    id: "CN",
    name: "China",
    country: "China",
    flag: "🇨🇳",
    sectionName: "IEEE China Council & Sections",
    coordinates: [114.30, 30.59],
    keywords: [
      "china",
      "shanghai",
      "chongqing",
      "beijing",
      "wuhan",
      "nanjing",
      "chengdu",
      "guangzhou",
      "shenzhen",
      "xi'an",
    ],
  },
  {
    id: "PK",
    name: "Pakistan",
    country: "Pakistan",
    flag: "🇵🇰",
    sectionName: "IEEE Pakistan Sections",
    coordinates: [67.00, 24.86],
    keywords: [
      "pakistan",
      "karachi",
      "taxila",
      "lahore",
      "islamabad",
      "peshawar",
      "uit",
    ],
  },
  {
    id: "BD",
    name: "Bangladesh",
    country: "Bangladesh",
    flag: "🇧🇩",
    sectionName: "IEEE Bangladesh Section",
    coordinates: [90.41, 23.81],
    keywords: [
      "bangladesh",
      "dhaka",
      "chittagong",
      "eastern university",
      "buet",
    ],
  },
  {
    id: "NP",
    name: "Nepal",
    country: "Nepal",
    flag: "🇳🇵",
    sectionName: "IEEE Nepal Subsection",
    coordinates: [84.12, 28.39],
    keywords: ["nepal", "damauli", "tanahu", "kathmandu", "pokhara"],
  },
  {
    id: "SG",
    name: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    sectionName: "IEEE Singapore Section",
    coordinates: [103.81, 1.35],
    keywords: ["singapore", "nus", "ntu", "smu"],
  },
  {
    id: "PH",
    name: "Philippines",
    country: "Philippines",
    flag: "🇵🇭",
    sectionName: "IEEE Philippines Section",
    coordinates: [121.77, 12.87],
    keywords: ["philippines", "manila", "quezon", "cebu"],
  },
  {
    id: "NZ",
    name: "New Zealand",
    country: "New Zealand",
    flag: "🇳🇿",
    sectionName: "IEEE New Zealand Sections",
    coordinates: [174.88, -40.90],
    keywords: ["new zealand", "auckland", "wellington", "christchurch"],
  },
  {
    id: "KR",
    name: "South Korea",
    country: "South Korea",
    flag: "🇰🇷",
    sectionName: "IEEE Seoul Section",
    coordinates: [127.76, 35.90],
    keywords: ["korea", "seoul", "busan", "daejeon", "kaist"],
  },
  {
    id: "VN",
    name: "Vietnam",
    country: "Vietnam",
    flag: "🇻🇳",
    sectionName: "IEEE Vietnam Section",
    coordinates: [108.27, 14.05],
    keywords: ["vietnam", "hanoi", "ho chi minh", "da nang"],
  },
  {
    id: "TW",
    name: "Taiwan",
    country: "Taiwan",
    flag: "🇹🇼",
    sectionName: "IEEE Taipei & Tainan Sections",
    coordinates: [120.96, 23.69],
    keywords: ["taiwan", "taipei", "tainan", "hsinchu"],
  },
  {
    id: "IN",
    name: "India",
    country: "India",
    flag: "🇮🇳",
    sectionName: "IEEE India Council & Sections",
    coordinates: [78.96, 20.59],
    keywords: [
      "india",
      "delhi",
      "bengaluru",
      "bangalore",
      "hyderabad",
      "mumbai",
      "bombay",
      "chennai",
      "madras",
      "kolkata",
      "calcutta",
      "pune",
      "ahmedabad",
      "gujarat",
      "kerala",
      "kozhikode",
      "guntur",
      "vijayawada",
      "kanpur",
      "patna",
      "gorakhpur",
      "dehradun",
      "thanjavur",
      "thnajavur",
      "pudukottai",
      "krishnaraja",
      "eluru",
      "ahilyanagar",
      "jamuhar",
      "gandhinagar",
      "noida",
      "vvitu",
      "sastra",
      "silver oak",
      "tulas",
      "kings college",
      "sir c.r.reddy",
    ],
  },
];

/**
 * Filter an event array to only include IEEE Region 10 events.
 */
export function filterR10Events(events: XtremeEvent[]): XtremeEvent[] {
  return events.filter((e) => {
    const r = (e.region ?? "R10").toUpperCase();
    return r === "R10" || r === "R0";
  });
}

/**
 * Maps any IEEE Region 10 event to its matching Country Hub / Regional Hub.
 */
export function resolveR10Location(event: XtremeEvent): R10LocationHub {
  const fullText = [
    event.location,
    event.section,
    event.studentBranch,
    event.title,
    event.description,
    ...(event.hashtags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const hub of R10_HUBS) {
    for (const kw of hub.keywords) {
      // Use regex word boundary to avoid false positives (e.g. "uok" matching "fukuoka")
      const regex = new RegExp(`(^|[^a-z0-9])${kw}([^a-z0-9]|$)`, "i");
      if (regex.test(fullText)) {
        return hub;
      }
    }
  }

  return R10_REGIONAL_HUB;
}

/**
 * Checks if an event is tagged with IEEEXtreme (#ieeextreme / #xtreme)
 */
export function isIeeeXtremeEvent(event: XtremeEvent): boolean {
  const hasTag = (event.hashtags || []).some((t) => {
    const clean = t.toLowerCase().replace(/[^a-z0-9]/g, "");
    return clean.includes("ieeextreme") || clean.includes("xtreme");
  });
  if (hasTag) return true;

  const text = `${event.title || ""} ${event.description || ""}`.toLowerCase();
  return text.includes("ieeextreme") || text.includes("xtreme");
}

/**
 * Filter events to only IEEE Region 10 events tagged with #ieeextreme
 */
export function filterR10IeeeXtremeEvents(events: XtremeEvent[]): XtremeEvent[] {
  return filterR10Events(events).filter(isIeeeXtremeEvent);
}

