import type { ReactNode } from "react";

export type Lang = "bn" | "en";
export const T = (lang: Lang, bn: string, en: string) => lang === "bn" ? bn : en;
export const tk = (n: number) => `৳${n.toLocaleString("en-BD")}`;
export const tkL = (n: number) =>
  n >= 10_000_000 ? `৳${(n / 10_000_000).toFixed(2)} কোটি` :
  n >= 100_000    ? `৳${(n / 100_000).toFixed(2)} লাখ` : tk(n);

export type Screen =
  | "dashboard" | "crm" | "sales" | "air" | "visa" | "tour" | "hotel"
  | "transport" | "hajj" | "student" | "manpower" | "agents" | "corporate"
  | "finance" | "hr" | "portals" | "ai" | "ocr" | "automation"
  | "integrations" | "superadmin";

export interface ScreenProps {
  navigate: (s: Screen) => void;
  lang: Lang;
  openDrawer: (title: string, content: ReactNode) => void;
  openNew: (title: string, steps: ReactNode[]) => void;
}

export const MODULE_COLOR: Record<Screen, string> = {
  dashboard:    "#12356B",
  crm:          "#2E8B57",
  sales:        "#0F766E",
  air:          "#1D4ED8",
  visa:         "#7C3AED",
  tour:         "#0E7490",
  hotel:        "#92603B",
  transport:    "#EA580C",
  hajj:         "#0D9488",
  student:      "#475569",
  manpower:     "#0891B2",
  agents:       "#9B1C31",
  corporate:    "#15803D",
  finance:      "#115E59",
  hr:           "#166534",
  portals:      "#1D4ED8",
  ai:           "#B91C1C",
  ocr:          "#A16207",
  automation:   "#0E7490",
  integrations: "#166534",
  superadmin:   "#12356B",
};

export interface NavChild {
  screen: Screen;
  labelBn: string;
  labelEn: string;
}

export interface NavSection {
  id: string;
  emoji: string;
  labelBn: string;
  labelEn: string;
  screen?: Screen;
  children?: NavChild[];
}

export const NAV: NavSection[] = [
  { id:"home",     emoji:"🏠", labelBn:"ড্যাশবোর্ড",        labelEn:"Dashboard",        screen:"dashboard" },
  { id:"crmsales", emoji:"👥", labelBn:"CRM ও বিক্রয়",      labelEn:"CRM & Sales",      children:[
    { screen:"crm",   labelBn:"CRM গ্রাহক",      labelEn:"CRM"            },
    { screen:"sales", labelBn:"বুকিং ও বিক্রয়", labelEn:"Sales & Booking"},
  ]},
  { id:"services", emoji:"✈️", labelBn:"সেবাসমূহ",           labelEn:"Services",         children:[
    { screen:"air",       labelBn:"এয়ার টিকেট",   labelEn:"Air Ticketing" },
    { screen:"visa",      labelBn:"ভিসা",           labelEn:"Visa"          },
    { screen:"tour",      labelBn:"ট্যুর",          labelEn:"Tour"          },
    { screen:"hotel",     labelBn:"হোটেল",          labelEn:"Hotel"         },
    { screen:"transport", labelBn:"পরিবহন",         labelEn:"Transport"     },
    { screen:"hajj",      labelBn:"হজ্জ ও উমরাহ",  labelEn:"Hajj & Umrah" },
    { screen:"student",   labelBn:"স্টুডেন্ট",     labelEn:"Student"       },
    { screen:"manpower",  labelBn:"ম্যানপাওয়ার",  labelEn:"Manpower"      },
  ]},
  { id:"agents",   emoji:"🤝", labelBn:"এজেন্ট ও কর্পোরেট","labelEn":"Agents & Corporate",children:[
    { screen:"agents",    labelBn:"B2B এজেন্ট", labelEn:"Agents"    },
    { screen:"corporate", labelBn:"কর্পোরেট",    labelEn:"Corporate" },
  ]},
  { id:"finance",  emoji:"💰", labelBn:"অর্থ ব্যবস্থাপনা",  labelEn:"Finance",          screen:"finance"    },
  { id:"hr",       emoji:"🧑", labelBn:"HR ও বেতন",          labelEn:"HR & Payroll",     screen:"hr"         },
  { id:"portals",  emoji:"🌐", labelBn:"পোর্টাল",             labelEn:"Portals",          screen:"portals"    },
  { id:"ai",       emoji:"🤖", labelBn:"AI ও অটোমেশন",      labelEn:"AI & Automation",  children:[
    { screen:"ai",           labelBn:"AI সেন্টার",   labelEn:"AI Center"    },
    { screen:"ocr",          labelBn:"OCR স্ক্যান",  labelEn:"OCR Scanner"  },
    { screen:"automation",   labelBn:"অটোমেশন",      labelEn:"Automation"   },
    { screen:"integrations", labelBn:"ইন্টিগ্রেশন", labelEn:"Integrations" },
  ]},
  { id:"admin",    emoji:"⚙️", labelBn:"সুপার অ্যাডমিন",    labelEn:"Super Admin",      screen:"superadmin" },
];

/** Return the nav section id that owns a given screen */
export function screenSection(s: Screen): string {
  for (const nav of NAV) {
    if (nav.screen === s) return nav.id;
    if (nav.children?.some(c => c.screen === s)) return nav.id;
  }
  return "home";
}
