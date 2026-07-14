import React, { useState, useEffect } from "react";
import {
  Plane, Globe, Map, Hotel, Star, GraduationCap, Briefcase, Building2,
  Bot, ScanLine, MessageCircle, CreditCard, Monitor, Users, Menu, X,
  Check, Minus, ArrowRight, Phone, Mail, Instagram, Twitter, Facebook,
  ChevronDown, ChevronUp, Zap, Shield, TrendingUp,
} from "lucide-react";
import { LoginScreen, OnboardingScreen } from "./erp/Auth";
import { ERPShell } from "./erp/Shell";
import type { Lang } from "./erp/types";

type AppFlow = "landing" | "login" | "onboarding" | "erp";

const NAVY   = "#12356B";
const ORANGE = "#F26B21";
const SLATE  = "#0f172a";

const T = (lang: Lang, bn: string, en: string) => lang === "bn" ? bn : en;
const fmt = (n: number, lang: Lang) => lang === "bn"
  ? n.toLocaleString("bn-BD")
  : n.toLocaleString("en-US");

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { Icon: Plane,         color: "#1D4ED8", bg: "#EFF6FF", bn: "এয়ার টিকেটিং",       en: "Air Ticketing",           dbn: "GDS ইন্টিগ্রেশন ও ই-টিকেট",       den: "GDS integration & e-tickets"        },
  { Icon: Globe,         color: "#7C3AED", bg: "#F5F3FF", bn: "ভিসা প্রক্রিয়া",      en: "Visa Processing",          dbn: "৭ ধাপে ভিসা ট্র্যাকিং",              den: "7-stage visa tracking"              },
  { Icon: Map,           color: "#0E7490", bg: "#ECFEFF", bn: "ট্যুর ম্যানেজমেন্ট",  en: "Tour Management",          dbn: "প্যাকেজ, ইটিনারি ও খরচ হিসাব",     den: "Packages, itinerary & costing"       },
  { Icon: Hotel,         color: "#92603B", bg: "#FEF3E2", bn: "হোটেল ও পরিবহন",      en: "Hotel & Transport",        dbn: "বুকিং, ভাউচার ও ড্রাইভার",          den: "Booking, vouchers & drivers"         },
  { Icon: Star,          color: "#0D9488", bg: "#F0FDFA", bn: "হজ্জ ও উমরাহ",        en: "Hajj & Umrah",             dbn: "হাজী ম্যানেজমেন্ট ও ফ্লাইট",       den: "Pilgrim management & flights"        },
  { Icon: GraduationCap, color: "#475569", bg: "#F8FAFC", bn: "স্টুডেন্ট কনসালটেন্সি",en:"Student Consultancy",       dbn: "ভর্তি, ভিসা ও ডকুমেন্ট ম্যানেজমেন্ট",den:"Admissions, visa & documents"         },
  { Icon: Briefcase,     color: "#0891B2", bg: "#ECFEFF", bn: "ম্যানপাওয়ার রিক্রুটমেন্ট",en:"Manpower Recruitment",  dbn: "BMET, ডেপ্লয়মেন্ট ও ট্র্যাকিং",   den: "BMET, deployment & tracking"         },
  { Icon: Building2,     color: "#15803D", bg: "#F0FDF4", bn: "কর্পোরেট ট্র্যাভেল",  en: "Corporate Travel",         dbn: "ট্রাভেল পলিসি ও অ্যাপ্রুভাল ফ্লো", den: "Travel policy & approval flow"       },
];

const FEATURES = [
  { Icon: Bot,           color: "#B91C1C", bn: "AI স্মার্ট সেন্টার",         en: "AI Smart Center",           dbn: "প্রপোজাল, ইটিনারি ও ইমেইল — সব AI দিয়ে তৈরি করুন।", den: "Write proposals, build itineraries, draft emails — all with AI."          },
  { Icon: ScanLine,      color: "#A16207", bn: "OCR ডকুমেন্ট স্ক্যানার",    en: "OCR Document Scanning",     dbn: "পাসপোর্ট ও NID স্ক্যান করুন, AI স্বয়ংক্রিয়ভাবে ফর্ম পূরণ করবে।", den: "Scan passport & NID — AI fills all form fields instantly."      },
  { Icon: MessageCircle, color: "#25D366", bn: "WhatsApp অটোমেশন",           en: "WhatsApp Automation",       dbn: "বুকিং কনফার্মেশন, পেমেন্ট রিমাইন্ডার ও ফলো-আপ স্বয়ংক্রিয়ভাবে।", den: "Auto-send confirmations, reminders & follow-ups via WhatsApp." },
  { Icon: CreditCard,    color: "#115E59", bn: "ফাইন্যান্স ও একাউন্টিং",   en: "Finance & Accounting",      dbn: "লেজার, P&L, ব্যালেন্স শিট ও VAT রিপোর্ট — একটি প্যানেলে।", den: "Ledger, P&L, balance sheet & VAT reports — one panel."          },
  { Icon: Monitor,       color: "#1D4ED8", bn: "কাস্টমার ও এজেন্ট পোর্টাল","en":"Customer & Agent Portals",  dbn: "গ্রাহক নিজে বুকিং দেখুক, B2B এজেন্ট নিজে বুক করুক — আপনার ব্র্যান্ডে।", den: "Let customers track bookings, agents self-book — under your brand." },
  { Icon: Users,         color: "#0E7490", bn: "মাল্টি-শাখা ও রোল",         en: "Multi-Branch & Roles",      dbn: "সব শাখা একসাথে পরিচালনা করুন, প্রতিটি কর্মচারীর আলাদা পারমিশন।", den: "Manage all branches together, per-staff role permissions."       },
];

const PLANS = [
  { id:"basic",        bn:"বেসিক",          en:"Basic",         priceMo:500,  priceYr:417,  tagbn:"সোলো এজেন্ট ও ছোট এজেন্সি", tagen:"Solo agents & small agencies", users:"৩",          branches:"১",          color:NAVY,     popular:false, yearlyNote:null,
    features:[{bn:"ড্যাশবোর্ড ও বেসিক রিপোর্ট",en:"Dashboard & Basic Reports"},{bn:"CRM — লিড ও গ্রাহক",en:"CRM — Leads & Customers"},{bn:"বিক্রয় ও ইনভয়েস",en:"Sales & Invoices"},{bn:"বেসিক ফাইন্যান্স",en:"Basic Finance"},{bn:"ইমেইল সাপোর্ট",en:"Email Support"}]},
  { id:"pro",          bn:"প্রো",            en:"Pro",           priceMo:800,  priceYr:667,  tagbn:"বাড়ন্ত এজেন্সি",             tagen:"Growing agencies",             users:"১০",         branches:"২",          color:ORANGE,   popular:true,  yearlyNote:null,
    features:[{bn:"এয়ার, ভিসা, ট্যুর, হোটেল",en:"Air, Visa, Tour, Hotel"},{bn:"HR ও বেতন ব্যবস্থাপনা",en:"HR & Payroll"},{bn:"কাস্টমার ও এজেন্ট পোর্টাল",en:"Customer & Agent Portals"},{bn:"Website CMS",en:"Website CMS"},{bn:"প্রাইওরিটি সাপোর্ট",en:"Priority Support"}]},
  { id:"business",     bn:"বিজনেস",         en:"Business",      priceMo:1500, priceYr:1250, tagbn:"মাল্টি-সার্ভিস এজেন্সি",     tagen:"Multi-service agencies",       users:"৩০",         branches:"৫",          color:"#0E7490", popular:false, yearlyNote:null,
    features:[{bn:"হজ্জ, স্টুডেন্ট, ম্যানপাওয়ার",en:"Hajj, Student, Manpower"},{bn:"মোবাইল অ্যাপস (৫টি)",en:"Mobile Apps (5 apps)"},{bn:"AI ও OCR সেন্টার",en:"AI & OCR Center"},{bn:"B2B এজেন্ট পোর্টাল",en:"B2B Agent Portal"},{bn:"প্রাইওরিটি + ফোন সাপোর্ট",en:"Priority + Phone Support"}]},
  { id:"enterprise",   bn:"এন্টারপ্রাইজ",  en:"Enterprise",    priceMo:3000, priceYr:1800, tagbn:"হোয়াইট-লেবেল ও বড় এজেন্সি", tagen:"White-label & large agencies",  users:"আনলিমিটেড", branches:"আনলিমিটেড", color:NAVY,     popular:false, yearlyNote:"40% off 1st year",
    features:[{bn:"কাস্টম ডোমেইন ও হোয়াইট-লেবেল",en:"Custom domain & white-label"},{bn:"ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার",en:"Dedicated account manager"},{bn:"Full API অ্যাকসেস",en:"Full API access"},{bn:"কাস্টম রিপোর্ট",en:"Custom reports"},{bn:"SLA গ্যারান্টি",en:"SLA guarantee"}]},
];

const TABLE_ROWS: { bn: string; en: string; vals: string[]; cat?: boolean }[] = [
  { bn:"ব্যবহারকারী",                en:"Users",                               vals:["৩","১০","৩০","আনলিমিটেড"],              cat:true  },
  { bn:"শাখা",                        en:"Branches",                            vals:["১","২","৫","আনলিমিটেড"],                cat:true  },
  { bn:"ড্যাশবোর্ড ও এনালিটিক্স",   en:"Dashboard & Analytics",              vals:["Basic","✓","Advanced","Custom"]            },
  { bn:"CRM (লিড, গ্রাহক)",          en:"CRM (Leads, Customers)",              vals:["✓","✓","✓","✓"]                           },
  { bn:"বিক্রয়, বুকিং ও ইনভয়েস",   en:"Sales, Booking & Invoice",            vals:["✓","✓","✓","✓"]                           },
  { bn:"এয়ার টিকেটিং",              en:"Air Ticketing",                       vals:["—","✓","✓","✓"]                           },
  { bn:"ভিসা প্রক্রিয়া",             en:"Visa Processing",                     vals:["—","✓","✓","✓"]                           },
  { bn:"ট্যুর ম্যানেজমেন্ট",         en:"Tour Management",                     vals:["—","✓","✓","✓"]                           },
  { bn:"হোটেল ও পরিবহন",             en:"Hotel & Transport",                   vals:["—","✓","✓","✓"]                           },
  { bn:"ফাইন্যান্স ERP",             en:"Finance ERP",                         vals:["Basic","✓","✓","✓"]                        },
  { bn:"HR ও বেতন",                  en:"HR & Payroll",                        vals:["—","✓","✓","✓"]                           },
  { bn:"হজ্জ ও উমরাহ",              en:"Hajj & Umrah",                        vals:["—","—","✓","✓"]                           },
  { bn:"স্টুডেন্ট কনসালটেন্সি",      en:"Student Consultancy",                 vals:["—","—","✓","✓"]                           },
  { bn:"ম্যানপাওয়ার ERP",           en:"Manpower ERP",                        vals:["—","—","✓","✓"]                           },
  { bn:"B2B এজেন্ট পোর্টাল",        en:"B2B Agent Portal",                    vals:["—","—","✓","✓"]                           },
  { bn:"কর্পোরেট ট্র্যাভেল",         en:"Corporate Travel",                    vals:["—","—","✓","✓"]                           },
  { bn:"কাস্টমার পোর্টাল",           en:"Customer Portal",                     vals:["—","✓","✓","✓"]                           },
  { bn:"Website CMS",                en:"Website CMS",                         vals:["—","✓","✓","✓"]                           },
  { bn:"মোবাইল অ্যাপস",             en:"Mobile Apps",                         vals:["—","—","✓","✓"]                           },
  { bn:"AI স্মার্ট সেন্টার",         en:"AI Smart Center",                     vals:["—","—","Limited","Full"]                  },
  { bn:"OCR ডকুমেন্ট সেন্টার",      en:"OCR Document Center",                 vals:["—","—","Limited","Full"]                  },
  { bn:"অটোমেশন সেন্টার",            en:"Automation Center",                   vals:["—","Basic","✓","✓"]                       },
  { bn:"ইন্টিগ্রেশন (bKash, WhatsApp, GDS)","en":"Integrations (bKash, WhatsApp, GDS)",vals:["Payment only","✓","✓","✓ + API"]},
  { bn:"হোয়াইট-লেবেল ও কাস্টম ডোমেইন","en":"White-label & Custom Domain",      vals:["—","—","—","✓"]                          },
  { bn:"সাপোর্ট",                    en:"Support",                             vals:["Email","Priority","Priority + Phone","Dedicated Manager"] },
];

const FAQS: { qbn: string; qen: string; abn: string; aen: string }[] = [
  { qbn:"ফ্রি ট্রায়ালে কী কী পাব?",                 qen:"What's included in the free trial?",      abn:"১৪ দিনের ফ্রি ট্রায়ালে আপনি Professional প্ল্যানের সব সুবিধা পাবেন। কোনো ক্রেডিট কার্ড লাগবে না।",                                                      aen:"The 14-day free trial includes all Professional plan features. No credit card required."                              },
  { qbn:"আমার ডেটা কি নিরাপদ?",                      qen:"Is my data safe?",                         abn:"হ্যাঁ। আমরা AWS-তে SSL এনক্রিপ্টেড ডেটাবেস ব্যবহার করি। প্রতিদিন অটো-ব্যাকআপ হয় এবং আপনার ডেটা শুধু আপনারই।",                                        aen:"Yes. We use SSL-encrypted databases on AWS with daily auto-backups. Your data is 100% yours."                        },
  { qbn:"WhatsApp অটোমেশন কীভাবে কাজ করে?",          qen:"How does WhatsApp automation work?",       abn:"আপনার নম্বর থেকে স্বয়ংক্রিয়ভাবে বুকিং কনফার্মেশন, পেমেন্ট রিমাইন্ডার ও ফলো-আপ পাঠানো হয়। সেটআপে মাত্র ৫ মিনিট।",                                aen:"Booking confirmations, payment reminders and follow-ups are sent automatically from your number. Setup takes just 5 minutes." },
  { qbn:"bKash / Nagad দিয়ে পেমেন্ট করা যাবে?",     qen:"Can I pay via bKash or Nagad?",            abn:"অবশ্যই। আমরা bKash, Nagad, SSLCommerz এবং ব্যাংক ট্রান্সফার সাপোর্ট করি।",                                                                               aen:"Absolutely. We support bKash, Nagad, SSLCommerz, and bank transfer."                                                },
  { qbn:"পুরনো ডেটা মাইগ্রেশন করা যাবে?",            qen:"Can I migrate my existing data?",          abn:"হ্যাঁ। আমাদের টিম Excel/CSV থেকে বিনামূল্যে ডেটা মাইগ্রেশনে সাহায্য করবে। সাধারণত ১-২ কার্যদিবস সময় লাগে।",                                         aen:"Yes. Our team helps migrate from Excel/CSV for free. Typically takes 1-2 business days."                            },
  { qbn:"সাপোর্ট কখন পাব?",                          qen:"When is support available?",               abn:"Starter প্ল্যানে Email সাপোর্ট (২৪ ঘণ্টার মধ্যে উত্তর)। Professional ও তার ওপরে: WhatsApp + ইমেইল, সকাল ৯ — রাত ১০।",                              aen:"Starter: Email support (within 24 hours). Professional and above: WhatsApp + email, 9 AM – 10 PM."                },
];

const PROOF_LOGOS = [
  "Sky Wings Travel","Gulf Bridge Agency","Dream Journey BD","Horizon Tours",
  "Al-Amin Travels","Star Aviation","Rahi Tours & Travels","Globe Trotter BD",
];

const TESTIMONIALS = [
  { initial:"র", color:"#1D4ED8", name:"রহিম উদ্দিন",         agency:"Sky Wings Travel, চট্টগ্রাম",          qbn:"ERP চালু করার পর আমাদের বুকিং প্রসেসিং সময় ৭০% কমে গেছে। WhatsApp অটোমেশন আমার রাতের ঘুম বাঁচিয়ে দিয়েছে।", qen:"Our booking processing time dropped 70% after ERP. WhatsApp automation saved my nights."    },
  { initial:"স", color:"#0D9488", name:"সুমাইয়া বেগম",        agency:"Al-Amin Travels, ঢাকা",                 qbn:"ভিসা ট্র্যাকিং ফিচারটা অসাধারণ। গ্রাহক নিজেই স্ট্যাটাস দেখতে পায়, আমাদের ফোন কল ৫০% কমে গেছে।",            qen:"The visa tracking feature is amazing. Customers check status themselves — 50% fewer calls."  },
  { initial:"ক", color:"#7C3AED", name:"কামরুল ইসলাম",         agency:"Horizon Tours, সিলেট",                  qbn:"OCR পাসপোর্ট স্ক্যানিং ফিচারটা মাত্র কয়েক সেকেন্ডে সব তথ্য ফর্মে ভরে দেয়। অবিশ্বাস্য।",                     qen:"OCR passport scanning fills all fields in seconds. Absolutely incredible for our workflow." },
];

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

const OBtn = ({ children, onClick, lg }: { children: React.ReactNode; onClick?: () => void; lg?: boolean }) => (
  <button type="button" onClick={onClick}
    className={`rounded-xl font-bold text-white bg-[#F26B21] hover:bg-[#E05A10] active:scale-[0.97] transition-all inline-flex items-center gap-2 flex-shrink-0 ${lg ? "h-12 px-7 text-[15px]" : "h-10 px-5 text-[13px]"}`}>
    {children}
  </button>
);

const OutBtn = ({ children, onClick, dark }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) => (
  <button type="button" onClick={onClick}
    className={`h-10 px-5 rounded-xl font-bold text-[13px] border-2 inline-flex items-center gap-2 transition-all active:scale-[0.97] ${
      dark ? "border-white/40 text-white hover:bg-white/10 hover:border-white/60" : "border-[#12356B] text-[#12356B] hover:bg-[#12356B] hover:text-white"
    }`}>
    {children}
  </button>
);

const Chip = ({ label, dark }: { label: string; dark?: boolean }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
    dark ? "bg-[#F26B21]/20 text-[#F26B21]" : "bg-[#FEF0E6] text-[#F26B21]"
  }`}>{label}</span>
);

function TableCell({ val }: { val: string }) {
  if (val === "✓") return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100"><Check size={12} className="text-green-600"/></span>;
  if (val === "—") return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100"><Minus size={12} className="text-slate-400"/></span>;
  return <span className="text-[12px] font-bold text-slate-700">{val}</span>;
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-[#F26B21]/15 to-[#12356B]/20 blur-3xl rounded-3xl pointer-events-none"/>
      <div className="relative bg-[#1e293b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* fake window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-[#0f172a]/50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
          <div className="ml-3 flex-1 h-5 max-w-[180px] bg-white/5 rounded text-[9px] text-white/25 flex items-center px-2">app.travelagencyweb.com</div>
        </div>
        <div className="flex">
          {/* sidebar */}
          <div className="w-9 bg-[#12356B] flex flex-col items-center py-3 gap-2.5 flex-shrink-0">
            {["🏠","👥","✈️","🌐","💰","🤖"].map((e,i) => (
              <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] transition-colors ${i===0?"bg-[#F26B21]":"bg-white/10 hover:bg-white/20"}`}>{e}</div>
            ))}
          </div>
          {/* main content */}
          <div className="flex-1 p-3 space-y-2 min-w-0">
            <p className="text-[9px] font-bold text-white/50 bn">শুভ সকাল, মালিক ভাই 👋</p>
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-1.5">
              {[["আজকের বিক্রি","৳৪,৮২,০০০","#22c55e"],["নতুন বুকিং","১২ টি","#60a5fa"],["বকেয়া","৳১,৮৫,০০০","#fb923c"]].map(([l,v,c])=>(
                <div key={l} className="bg-white/5 rounded-lg p-1.5">
                  <p className="text-[7px] text-white/40 bn">{l}</p>
                  <p className="text-[10px] font-black leading-tight mt-0.5" style={{color:c,fontFamily:"Inter"}}>{v}</p>
                </div>
              ))}
            </div>
            {/* Booking rows */}
            <div className="bg-white/5 rounded-lg overflow-hidden">
              <p className="text-[7px] font-bold text-white/40 px-2 py-1 border-b border-white/5 bn">সাম্প্রতিক বুকিং</p>
              {[
                ["র","রহিম আহমেদ","Dubai Visa","৳৩২,০০০","নিশ্চিত","#22c55e"],
                ["স","সুমাইয়া বেগম","Umrah Package","৳৮৫,০০০","অপেক্ষমান","#eab308"],
                ["ক","করিম উদ্দিন","Air BKK · EK585","৳১২,৫০০","ইস্যু","#a78bfa"],
                ["ন","নাসরিন আক্তার","UK Student Visa","৳৫৫,০০০","প্রক্রিয়াধীন","#60a5fa"],
              ].map(([init,name,svc,amt,st,c])=>(
                <div key={name} className="flex items-center gap-1.5 px-2 py-1 border-b border-white/5 last:border-0">
                  <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[7px] font-black text-white" style={{backgroundColor:ORANGE}}>{init}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[7px] font-bold text-white/90 truncate bn">{name}</p>
                    <p className="text-[6px] text-white/35 truncate">{svc}</p>
                  </div>
                  <p className="text-[7px] font-bold text-white/60 flex-shrink-0" style={{fontFamily:"Inter"}}>{amt}</p>
                  <span className="text-[6px] px-1 py-px rounded flex-shrink-0 font-bold bn" style={{backgroundColor:c+"22",color:c}}>{st}</span>
                </div>
              ))}
            </div>
            {/* AI suggestion */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#B91C1C]/20 to-[#7C3AED]/20 rounded-lg px-2 py-1.5 border border-white/10">
              <span className="text-[10px]">🤖</span>
              <p className="text-[7px] text-white/60 bn">AI: <span className="text-white/85">"সুমাইয়া বেগমকে আজ ফলো-আপ করুন"</span></p>
            </div>
          </div>
        </div>
      </div>
      {/* floating badge */}
      <div className="absolute -right-4 -bottom-4 bg-white rounded-2xl shadow-xl px-4 py-2.5 border border-slate-100">
        <p className="text-[10px] text-slate-500 font-medium">Active Agencies</p>
        <p className="text-[18px] font-black text-[#12356B]" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>1,000+</p>
      </div>
    </div>
  );
}

// ─── TopNav ───────────────────────────────────────────────────────────────────
function TopNav({ lang, setLang, onLogin, onSignup }: { lang: Lang; setLang: (l:Lang)=>void; onLogin:()=>void; onSignup:()=>void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href:"#home",     bn:"হোম",      en:"Home"     },
    { href:"#features", bn:"ফিচার",    en:"Features" },
    { href:"#services", bn:"সার্ভিস",  en:"Services" },
    { href:"#pricing",  bn:"প্রাইসিং", en:"Pricing"  },
    { href:"#about",    bn:"আমাদের",   en:"About"    },
    { href:"#contact",  bn:"যোগাযোগ", en:"Contact"  },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0c1526]/95 backdrop-blur-md border-b border-white/10 shadow-xl" : "bg-[#0f172a]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-6">
        <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#F26B21] flex items-center justify-center font-black text-white text-sm">T</div>
          <span className="font-black text-white hidden sm:block" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>TravelAgencyWeb</span>
        </a>
        <div className="hidden lg:flex items-center gap-5 flex-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium text-white/65 hover:text-white transition-colors">
              {T(lang, l.bn, l.en)}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <button type="button" onClick={() => setLang(lang==="bn"?"en":"bn")}
            className="h-8 px-3 rounded-lg border border-white/20 text-[11px] font-bold text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            {lang==="bn"?"EN":"বাং"}
          </button>
          <button type="button" onClick={onLogin} className="hidden sm:block text-[13px] font-medium text-white/70 hover:text-white transition-colors px-2">
            {T(lang,"লগইন","Login")}
          </button>
          <OBtn onClick={onSignup}>{T(lang,"ফ্রি ট্রায়াল","Start Free")}</OBtn>
          <button type="button" onClick={() => setOpen(v=>!v)} className="lg:hidden w-9 h-9 flex items-center justify-center text-white/80 hover:text-white">
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-[#0c1526] border-t border-white/10 px-4 pb-5 space-y-0.5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center py-3 text-[14px] font-medium text-white/70 hover:text-white border-b border-white/5 last:border-0 transition-colors">
              {T(lang,l.bn,l.en)}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <button type="button" onClick={() => { setOpen(false); onLogin(); }}
              className="flex-1 h-10 rounded-xl border border-white/20 text-white text-[13px] font-medium hover:bg-white/5 transition-colors">
              {T(lang,"লগইন","Login")}
            </button>
            <OBtn onClick={() => { setOpen(false); onSignup(); }}>{T(lang,"ফ্রি ট্রায়াল","Start Free")}</OBtn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ lang, onSignup }: { lang: Lang; onSignup: ()=>void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{background:`linear-gradient(135deg,${SLATE} 0%, #0d1f3c 60%, #0f172a 100%)`}}>
      {/* grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,backgroundSize:"48px 48px"}}/>
      {/* glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F26B21]/10 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#12356B]/30 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left */}
        <div className="space-y-7">
          <Chip label={T(lang,"🇧🇩 বাংলাদেশের নম্বর ১ ট্রাভেল ERP","🇧🇩 Bangladesh's #1 Travel Agency ERP")} dark/>
          <div>
            <h1 className="font-black text-white leading-[1.12] mb-4 bn" style={{fontSize:"clamp(2rem,5vw,3.25rem)"}}>
              আপনার পুরো ট্রাভেল ব্যবসা<br/>
              <span style={{color:ORANGE}}>একটি প্ল্যাটফর্মে</span>
            </h1>
            <p className="text-white/70 text-[16px] sm:text-[18px] leading-relaxed font-medium" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>
              {T(lang,"","The Complete AI-Powered Travel Business Operating System.")}
            </p>
            {lang === "bn" && <p className="text-white/50 text-[14px] mt-1" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>The Complete AI-Powered Travel Business OS.</p>}
          </div>
          <p className="text-white/55 text-[14px] leading-relaxed bn">
            {T(lang,
              "লিড থেকে বুকিং, এয়ার টিকেট থেকে ভিসা, হজ্জ থেকে ফাইন্যান্স — সবকিছু এক জায়গায় পরিচালনা করুন।",
              "Manage leads, bookings, air tickets, visa, Hajj & Umrah, finance, and your website — all in one place."
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <OBtn onClick={onSignup} lg>
              {T(lang,"ফ্রি ট্রায়াল শুরু করুন","Start Free Trial")} <ArrowRight size={16}/>
            </OBtn>
            <OutBtn dark>
              {T(lang,"ডেমো দেখুন","Watch Demo")}
            </OutBtn>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 pt-1">
            {[
              {e:"🏢", bn:"১,০০০+ এজেন্সি",              en:"1,000+ Agencies"},
              {e:"📱", bn:"bKash / Nagad",                  en:"bKash / Nagad"},
              {e:"💬", bn:"WhatsApp অটোমেশন",               en:"WhatsApp Automation"},
            ].map(b => (
              <div key={b.en} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-[13px]">{b.e}</span>
                <span className="text-[11px] font-bold text-white/70 bn">{T(lang,b.bn,b.en)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right — dashboard mockup */}
        <div className="hidden lg:block"><DashboardMockup/></div>
      </div>
    </section>
  );
}

// ─── Social proof ─────────────────────────────────────────────────────────────
function SocialProofStrip({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white border-b border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          {T(lang,"বাংলাদেশের শীর্ষ ট্রাভেল এজেন্সিগুলোর বিশ্বাস","Trusted by travel agencies across Bangladesh")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {PROOF_LOGOS.map(name => (
            <div key={name} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 hover:border-[#F26B21]/40 hover:bg-[#FEF9F5] transition-all">
              <div className="w-6 h-6 rounded-lg bg-[#12356B] flex items-center justify-center text-[9px] font-black text-white flex-shrink-0">{name[0]}</div>
              <span className="text-[11px] font-bold text-slate-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services grid ────────────────────────────────────────────────────────────
function ServicesSection({ lang }: { lang: Lang }) {
  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Chip label={T(lang,"সব সার্ভিস একসাথে","One Platform, Every Service")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)"}}>
            {T(lang,"একটি প্ল্যাটফর্মে সব ধরনের সেবা","Everything Your Agency Needs")}
          </h2>
          <p className="mt-3 text-slate-500 text-[15px] max-w-2xl mx-auto" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>
            {T(lang,"এয়ার টিকেট থেকে হজ্জ প্যাকেজ, ভিসা থেকে ম্যানপাওয়ার — সব সার্ভিস মডিউল এক প্ল্যাটফর্মে।",
              "From air ticketing to Hajj packages, visa to manpower — every service module in one unified platform.")}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map(s => {
            const Icon = s.Icon;
            return (
              <div key={s.en} className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 hover:border-slate-200 transition-all cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-110" style={{backgroundColor:s.bg}}>
                  <Icon size={20} style={{color:s.color}}/>
                </div>
                <p className="font-black text-[13px] text-slate-900 bn mb-1">{T(lang,s.bn,s.en)}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed bn">{T(lang,s.dbn,s.den)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Key features ─────────────────────────────────────────────────────────────
function FeaturesSection({ lang }: { lang: Lang }) {
  return (
    <section id="features" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Chip label={T(lang,"কী কী পাবেন","Key Features")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)"}}>
            {T(lang,"যা আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে","Built to Grow Your Agency")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => {
            const Icon = f.Icon;
            return (
              <div key={f.en} className="group bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 hover:bg-white transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{backgroundColor:f.color+"18",color:f.color}}>
                  <Icon size={22}/>
                </div>
                <h3 className="font-black text-[15px] text-slate-900 bn mb-2">{T(lang,f.bn,f.en)}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed bn">{T(lang,f.dbn,f.den)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks({ lang }: { lang: Lang }) {
  const steps = [
    { n:"১", icon:Zap,      bn:"সাইন আপ করুন",        en:"Sign up",              dbn:"২ মিনিটে ফ্রি ট্রায়াল অ্যাকাউন্ট তৈরি করুন। কোনো ক্রেডিট কার্ড লাগবে না।", den:"Create your free trial in 2 minutes. No credit card needed." },
    { n:"২", icon:Shield,   bn:"সার্ভিস সেটআপ করুন", en:"Set up your services", dbn:"আপনার এজেন্সির সার্ভিস মডিউল বাছুন এবং টিম মেম্বার যোগ করুন।",             den:"Choose your service modules and add your team members."   },
    { n:"৩", icon:TrendingUp,bn:"বুকিং শুরু করুন",    en:"Start booking",        dbn:"গ্রাহক যোগ করুন, বুকিং করুন, এবং AI দিয়ে ব্যবসা বাড়ান।",                     den:"Add customers, take bookings, and grow faster with AI."   },
  ];
  return (
    <section className="bg-[#12356B] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Chip label={T(lang,"কীভাবে শুরু করবেন","How It Works")} dark/>
          <h2 className="mt-4 font-black text-white bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)"}}>
            {T(lang,"মাত্র ৩ ধাপে শুরু করুন","3 Simple Steps to Get Started")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* connector line */}
          <div className="hidden sm:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-white/10 pointer-events-none"/>
          {steps.map((s,i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 relative">
                  <Icon size={28} className="text-white"/>
                  <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#F26B21] flex items-center justify-center text-[11px] font-black text-white bn">{s.n}</div>
                </div>
                <h3 className="font-black text-[16px] text-white mb-2 bn">{T(lang,s.bn,s.en)}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed max-w-[220px] bn">{T(lang,s.dbn,s.den)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function PricingSection({ lang, onSignup }: { lang: Lang; onSignup: ()=>void }) {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Chip label={T(lang,"সহজ প্রাইসিং","Simple Pricing")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)"}}>
            {T(lang,"আপনার বাজেটে সঠিক প্ল্যান","The Right Plan for Your Budget")}
          </h2>
          {/* Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
            <button type="button" onClick={() => setYearly(false)}
              className={`h-9 px-5 rounded-xl text-[13px] font-bold transition-all ${!yearly ? "bg-[#12356B] text-white shadow" : "text-slate-500 hover:text-slate-700"}`}>
              {T(lang,"মাসিক","Monthly")}
            </button>
            <button type="button" onClick={() => setYearly(true)}
              className={`h-9 px-5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${yearly ? "bg-[#12356B] text-white shadow" : "text-slate-500 hover:text-slate-700"}`}>
              {T(lang,"বার্ষিক","Yearly")}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-black">2 {T(lang,"মাস ফ্রি","mo free")}</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map(p => {
            const price = yearly ? p.priceYr : p.priceMo;
            const isPopular = p.popular;
            return (
              <div key={p.id} className={`relative rounded-2xl flex flex-col overflow-hidden transition-all ${
                isPopular
                  ? "bg-[#F26B21] text-white shadow-2xl shadow-[#F26B21]/30 scale-[1.02]"
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              }`}>
                {isPopular && (
                  <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    ★ {T(lang,"সবচেয়ে জনপ্রিয়","Most Popular")}
                  </div>
                )}
                {p.yearlyNote && yearly && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    🎉 {p.yearlyNote}
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className={`font-black text-[17px] bn mb-1 ${isPopular?"text-white":"text-slate-900"}`}>{T(lang,p.bn,p.en)}</p>
                  <p className={`text-[11px] bn mb-5 ${isPopular?"text-white/75":"text-slate-400"}`}>{T(lang,p.tagbn,p.tagen)}</p>
                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-end gap-1">
                      {yearly && p.yearlyNote && (
                        <span className={`text-[13px] line-through mr-1 pb-1.5 ${isPopular?"text-white/40":"text-slate-300"}`}>৳{p.priceMo.toLocaleString("en-BD")}</span>
                      )}
                      <span className={`font-black ${isPopular?"text-white":"text-slate-900"}`} style={{fontSize:"clamp(1.6rem,3vw,2rem)",fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>৳{price.toLocaleString("en-BD")}</span>
                      <span className={`text-[12px] pb-1.5 ${isPopular?"text-white/65":"text-slate-400"}`}>/মাস</span>
                    </div>
                    {yearly && (
                      <p className={`text-[11px] mt-1 ${isPopular?"text-white/65":"text-slate-400"}`}>
                        {p.yearlyNote
                          ? T(lang,`প্রথম বছর ৪০% ছাড় · বার্ষিক বিল ৳${(price*12).toLocaleString("en-BD")}`,`40% off 1st year · billed ৳${(price*12).toLocaleString("en-BD")}/yr`)
                          : T(lang,"বার্ষিক বিল","billed yearly")}
                      </p>
                    )}
                  </div>
                  {/* Users & Branches */}
                  <div className={`flex gap-3 mb-5 text-[11px] font-bold bn ${isPopular?"text-white/80":"text-slate-500"}`}>
                    <span>👤 {p.users} {T(lang,"জন","users")}</span>
                    <span>🏢 {p.branches} {T(lang,"শাখা","branch")}</span>
                  </div>
                  {/* Features */}
                  <ul className="space-y-2 flex-1">
                    {p.features.map(f => (
                      <li key={f.en} className="flex items-start gap-2">
                        <Check size={13} className={`mt-0.5 flex-shrink-0 ${isPopular?"text-white":"text-green-600"}`}/>
                        <span className={`text-[12px] bn leading-snug ${isPopular?"text-white/90":"text-slate-600"}`}>{T(lang,f.bn,f.en)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-6">
                  <button type="button" onClick={onSignup}
                    className={`w-full h-11 rounded-xl font-bold text-[13px] bn transition-all hover:opacity-90 active:scale-[0.97] ${
                      isPopular
                        ? "bg-white text-[#F26B21]"
                        : `border-2 border-[${p.color}] text-[${p.color}] hover:bg-[${p.color}] hover:text-white`
                    }`}
                    style={isPopular ? {} : {borderColor:p.color,color:p.color}}>
                    {T(lang,"ফ্রি ট্রায়াল শুরু করুন","Start Free Trial")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[12px] text-slate-400 mt-6 bn">
          {T(lang,"সব প্ল্যানে ১৪ দিনের ফ্রি ট্রায়াল · কোনো ক্রেডিট কার্ড লাগবে না · যেকোনো সময় বাতিল করুন","All plans include 14-day free trial · No credit card · Cancel anytime")}
        </p>
      </div>
    </section>
  );
}

// ─── Feature comparison table ─────────────────────────────────────────────────
function FeatureTable({ lang, onSignup }: { lang: Lang; onSignup: ()=>void }) {
  const PLAN_NAMES = [
    { bn:"স্টার্টার", en:"Starter",      color:NAVY   },
    { bn:"প্রফেশনাল",en:"Professional",  color:ORANGE },
    { bn:"বিজনেস",   en:"Business",      color:"#0E7490"},
    { bn:"এন্টারপ্রাইজ",en:"Enterprise", color:NAVY   },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Chip label={T(lang,"প্ল্যান তুলনা","Plan Comparison")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.4rem,3vw,2rem)"}}>
            {T(lang,"সম্পূর্ণ ফিচার তুলনা","Full Feature Comparison")}
          </h2>
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-5 py-4 text-slate-500 font-bold text-[11px] uppercase tracking-wide bg-slate-50 w-[38%]">
                  {T(lang,"ফিচার","Feature")}
                </th>
                {PLAN_NAMES.map(p => (
                  <th key={p.en} className="px-3 py-4 text-center bg-slate-50">
                    <span className="font-black text-[13px] bn" style={{color:p.color}}>{T(lang,p.bn,p.en)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors ${row.cat ? "bg-slate-50" : ""}`}>
                  <td className={`px-5 py-3 bn ${row.cat ? "font-black text-slate-900" : "text-slate-600"}`}>
                    {T(lang, row.bn, row.en)}
                  </td>
                  {row.vals.map((v, j) => (
                    <td key={j} className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center"><TableCell val={v}/></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td className="px-5 py-4"/>
                {PLAN_NAMES.map(p => (
                  <td key={p.en} className="px-3 py-4 text-center">
                    <button type="button" onClick={onSignup}
                      className="h-9 px-4 rounded-xl text-white text-[12px] font-bold bn hover:opacity-90 transition-all"
                      style={{backgroundColor:p.color}}>
                      {T(lang,"শুরু করুন","Get started")}
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Mobile — per plan cards */}
        <div className="md:hidden space-y-6">
          {PLAN_NAMES.map((p, pi) => (
            <div key={p.en} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100" style={{backgroundColor:p.color+"12"}}>
                <p className="font-black text-[15px] bn" style={{color:p.color}}>{T(lang,p.bn,p.en)}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {TABLE_ROWS.map((row, ri) => (
                  <div key={ri} className={`flex items-center justify-between px-4 py-2.5 ${row.cat?"bg-slate-50":""}`}>
                    <span className={`text-[12px] bn ${row.cat?"font-bold text-slate-800":"text-slate-600"}`}>{T(lang,row.bn,row.en)}</span>
                    <div className="flex-shrink-0 ml-4"><TableCell val={row.vals[pi]}/></div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-slate-50">
                <button type="button" onClick={onSignup}
                  className="w-full h-10 rounded-xl text-white text-[13px] font-bold bn hover:opacity-90 transition-all"
                  style={{backgroundColor:p.color}}>
                  {T(lang,"শুরু করুন","Get started")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Chip label={T(lang,"গ্রাহকদের মতামত","Testimonials")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.4rem)"}}>
            {T(lang,"তারা যা বলছেন","What Our Customers Say")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-[16px] flex-shrink-0" style={{backgroundColor:t.color}}>{t.initial}</div>
                <div>
                  <p className="font-black text-[14px] text-slate-900 bn">{t.name}</p>
                  <p className="text-[11px] text-slate-400 bn">{t.agency}</p>
                </div>
              </div>
              <div className="flex mb-3">{Array(5).fill(null).map((_,i) => <span key={i} className="text-yellow-400 text-[14px]">★</span>)}</div>
              <p className="text-[13px] text-slate-600 leading-relaxed bn">"{ T(lang, t.qbn, t.qen)}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection({ lang }: { lang: Lang }) {
  const stats = [
    { val:"১,০০০+", bn:"এজেন্সি",           en:"Agencies"         },
    { val:"৫ লাখ+", bn:"বুকিং প্রসেস হয়েছে", en:"Bookings Processed"},
    { val:"৬৪",     bn:"জেলায় উপস্থিত",     en:"Districts Covered" },
    { val:"৯৯.৯%",  bn:"আপটাইম",             en:"Uptime"            },
  ];
  return (
    <section id="about" className="bg-[#0f172a] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <Chip label={T(lang,"আমাদের সম্পর্কে","About Us")} dark/>
            <h2 className="mt-4 font-black text-white bn leading-snug" style={{fontSize:"clamp(1.5rem,3vw,2.2rem)"}}>
              {T(lang,"বাংলাদেশের জন্য, বাংলাদেশে তৈরি","Built in Bangladesh, for Bangladesh")}
            </h2>
            <p className="mt-4 text-white/60 text-[14px] leading-relaxed bn">
              {T(lang,
                "TravelAgencyWeb বাংলাদেশের ট্রাভেল ইন্ডাস্ট্রির জন্য একটি সম্পূর্ণ ব্যবসায়িক অপারেটিং সিস্টেম। আমরা বিশ্বাস করি প্রতিটি ট্রাভেল এজেন্সি — ছোট হোক বা বড় — প্রযুক্তির সুবিধা পাওয়ার যোগ্য।",
                "TravelAgencyWeb is a complete business operating system built for Bangladesh's travel industry. We believe every travel agency — small or large — deserves access to enterprise-grade technology."
              )}
            </p>
            <p className="mt-3 text-white/50 text-[14px] leading-relaxed bn">
              {T(lang,
                "আমাদের মিশন: সহজ, সাশ্রয়ী ও শক্তিশালী সফটওয়্যার দিয়ে বাংলাদেশের ট্রাভেল ব্যবসাকে ডিজিটাল করা।",
                "Our mission: Digitize Bangladesh's travel business with simple, affordable, and powerful software."
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(s => (
              <div key={s.en} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                <p className="font-black text-white text-[2rem] leading-none mb-1" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>{s.val}</p>
                <p className="text-[12px] text-white/50 bn">{T(lang,s.bn,s.en)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection({ lang }: { lang: Lang }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Chip label={T(lang,"সাধারণ প্রশ্ন","FAQ")}/>
          <h2 className="mt-4 font-black text-slate-900 bn" style={{fontSize:"clamp(1.6rem,3.5vw,2.2rem)"}}>
            {T(lang,"সাধারণ প্রশ্নোত্তর","Frequently Asked Questions")}
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-[#F26B21]/30 shadow-md" : "border-slate-200 hover:border-slate-300"}`}>
                <button type="button" onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className={`font-bold text-[14px] bn leading-snug ${isOpen ? "text-[#F26B21]" : "text-slate-900"}`}>{T(lang,faq.qbn,faq.qen)}</span>
                  <span className={`flex-shrink-0 ml-3 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} className={isOpen ? "text-[#F26B21]" : "text-slate-400"}/>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-slate-600 leading-relaxed bn">{T(lang,faq.abn,faq.aen)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA({ lang, onSignup }: { lang: Lang; onSignup: ()=>void }) {
  return (
    <section className="relative overflow-hidden py-20" style={{background:`linear-gradient(135deg,${ORANGE} 0%,#d95a12 100%)`}}>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage:`radial-gradient(circle at 30% 50%,rgba(255,255,255,0.3) 0%,transparent 60%)`}}/>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-black text-white bn leading-snug mb-4" style={{fontSize:"clamp(1.6rem,4vw,2.6rem)"}}>
          {T(lang,"আজই শুরু করুন","Start Your Free 14-Day Trial")}
        </h2>
        <p className="text-white/80 text-[15px] mb-3 bn">
          {T(lang,"১৪ দিনের ফ্রি ট্রায়াল · কোনো ক্রেডিট কার্ড লাগবে না","")}
        </p>
        <p className="text-white/65 text-[14px] mb-8" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>
          {T(lang,"","14-day free trial · No credit card required · Cancel anytime")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={onSignup}
            className="h-12 px-8 rounded-xl font-black text-[15px] text-[#F26B21] bg-white hover:bg-slate-50 active:scale-[0.97] transition-all inline-flex items-center gap-2 shadow-xl bn">
            {T(lang,"ফ্রি ট্রায়াল শুরু করুন","Start Free Trial")} <ArrowRight size={16}/>
          </button>
          <button type="button"
            className="h-12 px-8 rounded-xl font-bold text-[14px] text-white border-2 border-white/40 hover:bg-white/10 hover:border-white/70 transition-all bn">
            {T(lang,"বিক্রয় দলের সাথে কথা বলুন","Talk to Sales")}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function FooterSection({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const cols = [
    { title:{ bn:"প্রোডাক্ট", en:"Product" }, links:[
      { bn:"ফিচার সমূহ",    en:"Features",        href:"#features"  },
      { bn:"প্রাইসিং",      en:"Pricing",          href:"#pricing"   },
      { bn:"সার্ভিস",       en:"Services",          href:"#services"  },
      { bn:"রোডম্যাপ",      en:"Roadmap",           href:"#"          },
    ]},
    { title:{ bn:"পোর্টাল", en:"Portals" }, links:[
      { bn:"অ্যাপ লগইন",   en:"App Login",          href:"#"         },
      { bn:"গ্রাহক পোর্টাল",en:"Customer Portal",   href:"#"         },
      { bn:"এজেন্ট পোর্টাল",en:"Agent Portal",      href:"#"         },
      { bn:"ডকুমেন্টেশন",  en:"Documentation",      href:"#"         },
    ]},
    { title:{ bn:"সাপোর্ট", en:"Support" }, links:[
      { bn:"হেল্প সেন্টার",  en:"Help Center",      href:"#"         },
      { bn:"স্ট্যাটাস",     en:"Status",             href:"#"         },
      { bn:"কমিউনিটি",      en:"Community",          href:"#"         },
      { bn:"API ডকস",       en:"API Docs",           href:"#"         },
    ]},
    { title:{ bn:"কোম্পানি", en:"Company" }, links:[
      { bn:"আমাদের সম্পর্কে",en:"About",             href:"#about"   },
      { bn:"ব্লগ",          en:"Blog",                href:"#"        },
      { bn:"ক্যারিয়ার",    en:"Careers",             href:"#"        },
      { bn:"যোগাযোগ",       en:"Contact",            href:"#contact" },
    ]},
  ];

  return (
    <footer id="contact" className="bg-[#0f172a] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#F26B21] flex items-center justify-center font-black text-white">T</div>
              <span className="font-black text-white" style={{fontFamily:"Plus Jakarta Sans, Inter, sans-serif"}}>TravelAgencyWeb</span>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed mb-4 bn">
              {T(lang,"বাংলাদেশের ট্রাভেল ব্যবসার জন্য সম্পূর্ণ AI-চালিত ERP।","Complete AI-powered ERP for Bangladesh's travel industry.")}
            </p>
            <p className="text-[11px] text-[#F26B21] font-bold italic">Travel Smarter, Grow Faster.</p>
            <div className="flex gap-2 mt-4">
              {[Phone, Mail, MessageCircle].map((Icon, i) => (
                <button key={i} type="button" className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <Icon size={14}/>
                </button>
              ))}
            </div>
          </div>
          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title.en}>
              <p className="font-black text-[12px] text-white/80 uppercase tracking-wide mb-4 bn">{T(lang,col.title.bn,col.title.en)}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.en}>
                    <a href={l.href} className="text-[12px] text-white/45 hover:text-white transition-colors bn">{T(lang,l.bn,l.en)}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Contact bar */}
        <div className="border-t border-white/8 pt-6 mb-6">
          <div className="flex flex-wrap gap-4 text-[12px] text-white/40">
            <span className="flex items-center gap-1.5"><Phone size={12}/> +880 1700-000000</span>
            <span className="flex items-center gap-1.5"><Mail size={12}/> hello@travelagencyweb.com</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={12}/> WhatsApp: +880 1700-000000</span>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} TravelAgencyWeb. {T(lang,"সকল অধিকার সংরক্ষিত","All rights reserved.")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">{T(lang,"গোপনীয়তা নীতি","Privacy Policy")}</a>
            <a href="#" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">{T(lang,"ব্যবহারের শর্ত","Terms of Service")}</a>
            <button type="button" onClick={() => setLang(lang==="bn"?"en":"bn")}
              className="h-7 px-3 rounded-lg border border-white/15 text-[10px] font-bold text-white/40 hover:bg-white/8 hover:text-white/70 transition-colors">
              {lang==="bn"?"EN ↔ বাং":"বাং ↔ EN"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing page ─────────────────────────────────────────────────────────────
function LandingPage({ lang, setLang, onLogin, onSignup }: { lang: Lang; setLang: (l: Lang) => void; onLogin: () => void; onSignup: () => void }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  return (
    <div style={{fontFamily:"Inter, sans-serif"}}>
      <TopNav lang={lang} setLang={setLang} onLogin={onLogin} onSignup={onSignup}/>
      <div className="pt-16">
        <HeroSection lang={lang} onSignup={onSignup}/>
        <SocialProofStrip lang={lang}/>
        <ServicesSection lang={lang}/>
        <FeaturesSection lang={lang}/>
        <HowItWorks lang={lang}/>
        <PricingSection lang={lang} onSignup={onSignup}/>
        <FeatureTable lang={lang} onSignup={onSignup}/>
        <TestimonialsSection lang={lang}/>
        <AboutSection lang={lang}/>
        <FAQSection lang={lang}/>
        <FinalCTA lang={lang} onSignup={onSignup}/>
        <FooterSection lang={lang} setLang={setLang}/>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [flow, setFlow] = useState<AppFlow>("landing");
  const [lang, setLang] = useState<Lang>("bn");

  if (flow === "login") {
    return <LoginScreen onLogin={() => setFlow("erp")} lang={lang} setLang={setLang}/>;
  }
  if (flow === "onboarding") {
    return <OnboardingScreen onDone={() => setFlow("erp")} lang={lang}/>;
  }
  if (flow === "erp") {
    return <ERPShell lang={lang} setLang={setLang}/>;
  }

  return (
    <LandingPage
      lang={lang}
      setLang={setLang}
      onLogin={() => setFlow("login")}
      onSignup={() => setFlow("onboarding")}
    />
  );
}
