import type { ReactNode } from "react";
import {
  TrendingUp, ChevronRight, Plus, Phone, MessageCircle, Check,
  FileText, Clock, Plane, Globe, Star, GraduationCap, Briefcase,
  Building2, Car, CreditCard, Activity, Zap, ScanLine, Wifi, Crown,
  BarChart2, Package, Users, UserCheck, Monitor, Download, AlertCircle,
  Building, Map, ToggleLeft, ToggleRight,
} from "lucide-react";
import { T, tk, tkL, type Lang, type Screen, type ScreenProps, MODULE_COLOR } from "./types";

// ─── Shared Chip ──────────────────────────────────────────────────────────────
const CHIPS = {
  confirmed:   { bg:"#DCFCE7", text:"#166534", bn:"নিশ্চিত"       },
  pending:     { bg:"#FEF9C3", text:"#854D0E", bn:"অপেক্ষমান"     },
  cancelled:   { bg:"#FEE2E2", text:"#991B1B", bn:"বাতিল"         },
  processing:  { bg:"#DBEAFE", text:"#1E40AF", bn:"প্রক্রিয়াধীন"  },
  approved:    { bg:"#DCFCE7", text:"#166534", bn:"অনুমোদিত"      },
  rejected:    { bg:"#FEE2E2", text:"#991B1B", bn:"প্রত্যাখ্যাত"  },
  active:      { bg:"#DCFCE7", text:"#166534", bn:"সক্রিয়"        },
  inactive:    { bg:"#F1F5F9", text:"#475569", bn:"নিষ্ক্রিয়"     },
  issued:      { bg:"#EDE9FE", text:"#5B21B6", bn:"ইস্যু হয়েছে"  },
  deployed:    { bg:"#EDE9FE", text:"#5B21B6", bn:"নিয়োজিত"       },
  present:     { bg:"#DCFCE7", text:"#166534", bn:"উপস্থিত"       },
  absent:      { bg:"#FEE2E2", text:"#991B1B", bn:"অনুপস্থিত"     },
  leave:       { bg:"#FEF3C7", text:"#92400E", bn:"ছুটি"          },
  connected:   { bg:"#DCFCE7", text:"#166534", bn:"সংযুক্ত"       },
  embassy:     { bg:"#DBEAFE", text:"#1E40AF", bn:"দূতাবাসে"      },
  delivered:   { bg:"#DCFCE7", text:"#166534", bn:"ডেলিভারি হয়েছে"},
};
type ChipKey = keyof typeof CHIPS;

const Chip = ({ status, lang }: { status: ChipKey; lang: Lang }) => {
  const c = CHIPS[status] ?? CHIPS.pending;
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bn flex-shrink-0"
      style={{backgroundColor:c.bg, color:c.text}}>
      {T(lang, c.bn, status)}
    </span>
  );
};

// ─── KpiCard ──────────────────────────────────────────────────────────────────
const KpiCard = ({ bn, en, val, trend, lang, color }: {
  bn: string; en: string; val: string; trend: string; lang: Lang; color?: string;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
    <p className="text-[11px] text-slate-400 bn leading-tight mb-1.5">{T(lang, bn, en)}</p>
    <p className="font-black text-[22px] text-slate-900 leading-none mb-1.5" style={{fontFamily:"Inter"}}>{val}</p>
    <p className="text-[11px] font-bold" style={{color: trend.startsWith("+") ? "#16A34A" : trend.startsWith("−")||trend.startsWith("-") ? "#DC2626" : color ?? "#64748B"}}>
      {trend}
    </p>
  </div>
);

// ─── DataRow ──────────────────────────────────────────────────────────────────
const DataRow = ({ initial, color, name, sub, badge, status, lang, onView }: {
  initial?: string; color?: string; name: string; sub: string;
  badge?: string; status?: ChipKey; lang: Lang; onView: () => void;
}) => (
  <div className="flex items-center gap-3 py-3 px-4 sm:px-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors group cursor-pointer" onClick={onView}>
    {initial && color && (
      <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-[13px] text-white"
        style={{backgroundColor:color}}>{initial}</div>
    )}
    <div className="flex-1 min-w-0">
      <p className="font-bold text-[13px] text-slate-900 bn truncate">{name}</p>
      <p className="text-[11px] text-slate-400 bn truncate">{sub}</p>
    </div>
    {badge && <p className="font-bold text-[13px] text-slate-700 flex-shrink-0" style={{fontFamily:"Inter"}}>{badge}</p>}
    {status && <Chip status={status} lang={lang}/>}
    <ChevronRight size={14} className="text-slate-300 flex-shrink-0 group-hover:text-slate-500 transition-colors"/>
  </div>
);

// ─── PageHeader ───────────────────────────────────────────────────────────────
const PageHeader = ({ C, titleBn, titleEn, subtitleBn, lang, onNew, newLabelBn }: {
  C: string; titleBn: string; titleEn: string; subtitleBn: string;
  lang: Lang; onNew: () => void; newLabelBn: string;
}) => (
  <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5 mb-0.5">
          <div className="w-1.5 h-6 rounded-full flex-shrink-0" style={{backgroundColor:C}}/>
          <h1 className="font-black text-[19px] text-slate-900 bn">{T(lang, titleBn, titleEn)}</h1>
        </div>
        <p className="text-[12px] text-slate-400 pl-4 bn">{subtitleBn}</p>
      </div>
      <button type="button" onClick={onNew}
        className="h-9 px-4 rounded-xl text-white font-bold text-[12px] bn flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
        style={{backgroundColor:C}}>
        <Plus size={14}/> {T(lang, newLabelBn, "+ New")}
      </button>
    </div>
  </div>
);

// ─── Drawer detail row ────────────────────────────────────────────────────────
const DS = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slate-50 rounded-xl px-4 py-2.5">
    <p className="text-[10px] text-slate-400 bn">{label}</p>
    <p className="font-bold text-slate-900 text-[13px] bn mt-0.5">{value}</p>
  </div>
);

// ─── Wizard field ─────────────────────────────────────────────────────────────
const WF = ({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) => (
  <div>
    <label className="block text-[12px] font-bold text-slate-500 bn mb-1">{label}</label>
    <input type={type} placeholder={placeholder}
      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>
);

// ─── Drawer action button ─────────────────────────────────────────────────────
const DBtn = ({ label, color, onClick }: { label: string; color: string; onClick?: () => void }) => (
  <button type="button" onClick={onClick}
    className="w-full h-10 rounded-xl text-white text-[13px] font-bold bn hover:opacity-90 transition-all"
    style={{backgroundColor:color}}>{label}</button>
);

// ─── Quick WA button in drawer ────────────────────────────────────────────────
const WABtn = () => (
  <button type="button" className="w-full h-10 rounded-xl text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-90"
    style={{background:"linear-gradient(135deg,#25D366,#128C7E)"}}>
    <MessageCircle size={14}/> WhatsApp করুন
  </button>
);

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
export function DashboardScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.dashboard;
  const BOOKINGS = [
    { name:"রহিম আহমেদ",    sub:"Dubai Visa · EK585 · ২০ আগস্ট", badge:tk(32000), status:"confirmed"  as ChipKey, color:"#7C3AED", i:"র" },
    { name:"সুমাইয়া বেগম", sub:"Umrah Package · ১৫ সেপ্টেম্বর", badge:tk(85000), status:"pending"    as ChipKey, color:"#0D9488", i:"স" },
    { name:"করিম উদ্দিন",   sub:"Thailand Tour · ৩ অক্টোবর",    badge:tk(45000), status:"processing" as ChipKey, color:"#0E7490", i:"ক" },
    { name:"নাসরিন আক্তার", sub:"Air Ticket BKK · PNR: X7R29",  badge:tk(12500), status:"issued"     as ChipKey, color:"#1D4ED8", i:"ন" },
    { name:"জামাল হোসেন",   sub:"Student Visa UK",               badge:tk(55000), status:"processing" as ChipKey, color:"#475569", i:"জ" },
  ];

  const kpis = [
    { bn:"আজকের বিক্রি",    en:"Today Sales",     val:tkL(482000), trend:"+১২% ↑"  },
    { bn:"বকেয়া (Due)",     en:"Outstanding Due", val:tkL(185000), trend:"−৫% ↓"   },
    { bn:"মাসের লাভ",       en:"Month Profit",    val:tkL(340000), trend:"+৮% ↑"   },
    { bn:"নতুন বুকিং",      en:"New Bookings",    val:"১২ টি",     trend:"আজ"      },
  ];

  const ALERTS = [
    { msg:"৮ টি পেমেন্ট বকেয়া আছে",         color:"#DC2626" },
    { msg:"৩ টি ভিসার মেয়াদ শেষ হবে",        color:"#F59E0B" },
    { msg:"রহিম আহমেদের ফ্লাইট ৩ দিন পরে",   color:"#12356B" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      {/* Greeting */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-[18px] text-slate-900 bn">🌅 {T(lang,"শুভ সকাল, মালিক!","Good Morning, Owner!")}</p>
            <p className="text-[12px] text-slate-400">
              {new Date().toLocaleDateString("bn-BD", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-2xl">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/>
            <p className="font-bold text-[12px] text-green-700 bn">Business Health: <span style={{fontFamily:"Inter"}}>87%</span></p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(k => <KpiCard key={k.bn} {...k} lang={lang} color={C}/>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-50">
              <p className="font-black text-[14px] text-slate-900 bn">{T(lang,"সাম্প্রতিক বুকিং","Recent Bookings")}</p>
              <button type="button" onClick={() => navigate("sales")} className="text-[11px] font-bold bn hover:underline" style={{color:C}}>
                {T(lang,"সব দেখুন","View All")} →
              </button>
            </div>
            {BOOKINGS.map((b, i) => (
              <DataRow key={i} initial={b.i} color={b.color} name={b.name} sub={b.sub} badge={b.badge} status={b.status} lang={lang}
                onView={() => openDrawer(b.name, (
                  <div className="space-y-3">
                    <DS label={T(lang,"সেবা","Service")} value={b.sub}/>
                    <DS label={T(lang,"পরিমাণ","Amount")} value={b.badge ?? ""}/>
                    <DS label={T(lang,"স্ট্যাটাস","Status")} value={T(lang, CHIPS[b.status]?.bn, b.status)}/>
                    <WABtn/>
                    <DBtn label={T(lang,"ইনভয়েস দেখুন","View Invoice")} color={C} onClick={() => navigate("sales")}/>
                  </div>
                ))}
              />
            ))}
          </div>

          {/* Alerts + Quick Nav */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <p className="font-black text-[13px] text-slate-900 bn mb-3">🔔 {T(lang,"স্মার্ট অ্যালার্ট","Smart Alerts")}</p>
              <div className="space-y-2">
                {ALERTS.map((a,i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{backgroundColor:a.color+"12"}}>
                    <AlertCircle size={13} className="mt-0.5 flex-shrink-0" style={{color:a.color}}/>
                    <p className="text-[11px] font-bold bn" style={{color:a.color}}>{a.msg}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <p className="font-black text-[13px] text-slate-900 bn mb-3">⚡ {T(lang,"দ্রুত অ্যাকসেস","Quick Access")}</p>
              <div className="grid grid-cols-2 gap-2">
                {([["crm","👥","CRM"],["air","✈️","Air"],["visa","🌐","Visa"],["finance","💰","Finance"]] as [Screen,string,string][]).map(([s,e,l]) => (
                  <button key={s} type="button" onClick={() => navigate(s)}
                    className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span className="text-[15px]">{e}</span>
                    <span className="text-[11px] font-bold text-slate-700">{l}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GENERIC MODULE SCREENS  (compact pattern: header + 3 KPIs + data list)
// ═══════════════════════════════════════════════════════════════════════════════

export function CRMScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.crm;
  const rows = [
    { i:"র", c:"#2E8B57", name:"রহিম আহমেদ",    sub:"01700-123456 · ঢাকা",     badge:tk(32000), st:"active"     as ChipKey },
    { i:"স", c:"#0F766E", name:"সুমাইয়া বেগম", sub:"01800-234567 · চট্টগ্রাম", badge:tk(18500), st:"pending"    as ChipKey },
    { i:"ক", c:"#7C3AED", name:"করিম উদ্দিন",   sub:"01900-345678 · সিলেট",    badge:tk(45000), st:"active"     as ChipKey },
    { i:"ন", c:"#D97706", name:"নাসরিন খানম",   sub:"01700-456789 · রাজশাহী",  badge:tk(12000), st:"inactive"   as ChipKey },
    { i:"জ", c:"#B91C1C", name:"জামাল হোসেন",   sub:"01800-567890 · খুলনা",    badge:tk(67000), st:"active"     as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"নাম","Full Name")} placeholder="Rahman Ali"/>
      <WF label={T(lang,"ফোন","Phone")} placeholder="01700000000" type="tel"/>
      <WF label={T(lang,"ইমেইল","Email")} placeholder="client@email.com" type="email"/>
      <WF label={T(lang,"ঠিকানা","Address")} placeholder={T(lang,"ঢাকা","Dhaka")}/>
    </div>,
    <div key="1" className="space-y-3">
      <WF label={T(lang,"লিড সোর্স","Lead Source")} placeholder="WhatsApp / Facebook"/>
      <WF label={T(lang,"আগ্রহ","Interest")} placeholder={T(lang,"ভিসা, ট্যুর...","Visa, Tour...")}/>
      <WF label={T(lang,"নোট","Notes")} placeholder={T(lang,"যেকোনো তথ্য","Any notes...")}/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="CRM গ্রাহক" titleEn="CRM — Customers" subtitleBn="লিড · গ্রাহক · ফলো-আপ · টাস্ক" lang={lang}
        onNew={() => openNew(T(lang,"নতুন গ্রাহক","New Customer"), steps)} newLabelBn="নতুন গ্রাহক"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="মোট গ্রাহক" en="Total Customers" val="১,২৪০" trend="+৮ আজ" lang={lang} color={C}/>
          <KpiCard bn="ফলো-আপ বাকি" en="Follow-up Due" val="১৫" trend="আজ" lang={lang} color={C}/>
          <KpiCard bn="নতুন লিড" en="New Leads" val="৩২" trend="+৫ এ সপ্তাহ" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r, i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"ফোন","Phone")} value={r.sub.split("·")[0].trim()}/>
                  <DS label={T(lang,"মোট বিক্রি","Total Sales")} value={r.badge ?? ""}/>
                  <DS label={T(lang,"স্ট্যাটাস","Status")} value={T(lang, CHIPS[r.st]?.bn, r.st)}/>
                  <WABtn/>
                  <DBtn label={T(lang,"নতুন বুকিং","New Booking")} color={C} onClick={() => navigate("sales")}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SalesScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.sales;
  const rows = [
    { i:"#", c:C, name:"BK-2024-001 · রহিম আহমেদ", sub:"Dubai Visa · ২০ আগস্ট",     badge:tk(32000), st:"confirmed"  as ChipKey },
    { i:"#", c:C, name:"BK-2024-002 · সুমাইয়া",    sub:"Umrah Package · ১৫ সেপ্টে", badge:tk(85000), st:"pending"    as ChipKey },
    { i:"#", c:C, name:"BK-2024-003 · করিম",        sub:"Air BKK · EK585",            badge:tk(12500), st:"issued"     as ChipKey },
    { i:"#", c:C, name:"BK-2024-004 · নাসরিন",      sub:"Thailand Tour · ৩ অক্টোবর", badge:tk(45000), st:"processing" as ChipKey },
    { i:"#", c:C, name:"BK-2024-005 · জামাল",       sub:"Student UK Visa",             badge:tk(55000), st:"cancelled"  as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <p className="font-bold text-[12px] text-slate-500 bn">ধাপ ১ — সেবার ধরন বাছুন</p>
      <div className="grid grid-cols-3 gap-2">
        {[["✈️","এয়ার"],["🌐","ভিসা"],["🗺️","ট্যুর"],["🏨","হোটেল"],["⭐","হজ্জ"],["🎓","স্টুডেন্ট"]].map(([e,l])=>(
          <button key={l} type="button" className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-slate-200 hover:border-teal-500 transition-colors">
            <span className="text-[20px]">{e}</span><span className="text-[10px] font-bold bn text-slate-600">{l}</span>
          </button>
        ))}
      </div>
    </div>,
    <div key="1" className="space-y-3">
      <WF label={T(lang,"গ্রাহক বাছুন","Select Customer")} placeholder={T(lang,"নাম বা ফোন দিয়ে খুঁজুন","Search by name or phone")}/>
      <WF label={T(lang,"যাত্রার তারিখ","Travel Date")} type="date"/>
      <WF label={T(lang,"মোট মূল্য","Total Amount")} placeholder="৳" type="number"/>
      <WF label={T(lang,"অগ্রিম পেমেন্ট","Advance Payment")} placeholder="৳" type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="বুকিং ও বিক্রয়" titleEn="Sales & Booking" subtitleBn="বুকিং · ইনভয়েস · পেমেন্ট · রিফান্ড" lang={lang}
        onNew={() => openNew(T(lang,"নতুন বুকিং","New Booking"), steps)} newLabelBn="নতুন বুকিং"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="আজকের বুকিং" en="Today Bookings" val="৬ টি" trend="+২ গতকালের চেয়ে" lang={lang} color={C}/>
          <KpiCard bn="নিশ্চিত বুকিং" en="Confirmed" val="৪ টি" trend="৬৭%" lang={lang} color={C}/>
          <KpiCard bn="এ মাসের আয়" en="Month Revenue" val={tkL(620000)} trend="+১৫% ↑" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r, i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name.split("·")[0].trim(), (
                <div className="space-y-3">
                  <DS label="Booking ID" value={r.name.split("·")[0].trim()}/>
                  <DS label={T(lang,"সেবা","Service")} value={r.sub}/>
                  <DS label={T(lang,"পরিমাণ","Amount")} value={r.badge ?? ""}/>
                  <DS label={T(lang,"স্ট্যাটাস","Status")} value={T(lang, CHIPS[r.st]?.bn, r.st)}/>
                  <WABtn/>
                  <DBtn label={T(lang,"ইনভয়েস দেখুন","View Invoice")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AirScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.air;
  const rows = [
    { i:"✈", c:C, name:"PNR: X7R29 · EK585 DAC-DXB", sub:"রহিম আহমেদ · ২০ আগস্ট · Economy", badge:tk(38500), st:"issued"    as ChipKey },
    { i:"✈", c:C, name:"PNR: K9M41 · BG042 DAC-LHR", sub:"নাসরিন আক্তার · ৫ সেপ্টে", badge:tk(82000), st:"confirmed" as ChipKey },
    { i:"✈", c:C, name:"PNR: R3Q88 · TG322 DAC-BKK", sub:"করিম উদ্দিন · ৩ অক্টোবর",   badge:tk(12500), st:"pending"   as ChipKey },
    { i:"✈", c:C, name:"PNR: T5W12 · SQ421 DAC-SIN", sub:"জামাল হোসেন · ১২ অক্টো",    badge:tk(55000), st:"processing"as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <WF label={T(lang,"প্রস্থান","From")} placeholder="DAC - Dhaka"/>
        <WF label={T(lang,"গন্তব্য","To")} placeholder="DXB - Dubai"/>
      </div>
      <WF label={T(lang,"যাত্রার তারিখ","Departure Date")} type="date"/>
      <WF label={T(lang,"যাত্রী সংখ্যা","Passengers")} placeholder="1" type="number"/>
      <WF label={T(lang,"ক্লাস","Class")} placeholder="Economy / Business"/>
    </div>,
    <div key="1" className="space-y-3">
      <WF label={T(lang,"গ্রাহকের নাম","Passenger Name")} placeholder="As per passport"/>
      <WF label={T(lang,"পাসপোর্ট নম্বর","Passport No.")} placeholder="BD1234567"/>
      <WF label={T(lang,"GDS PNR","GDS PNR")} placeholder="X7R29"/>
      <WF label={T(lang,"ভাড়া","Fare (৳)")} type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="এয়ার টিকেটিং" titleEn="Air Ticketing" subtitleBn="ফ্লাইট খোঁজ · PNR · টিকেট ইস্যু · রিফান্ড" lang={lang}
        onNew={() => openNew(T(lang,"নতুন টিকেট","New Ticket"), steps)} newLabelBn="নতুন টিকেট"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="আজকের টিকেট" en="Today Tickets" val="৪ টি" trend="+১ ↑" lang={lang} color={C}/>
          <KpiCard bn="মুলতুবি PNR" en="Pending PNR" val="২ টি" trend="জরুরি" lang={lang} color={C}/>
          <KpiCard bn="এ মাসের আয়" en="Month Revenue" val={tkL(850000)} trend="+১৮% ↑" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r, i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label="PNR" value={r.name.split("·")[0].replace("PNR:","").trim()}/>
                  <DS label={T(lang,"রুট","Route")} value={r.name.split("·")[1]?.trim() ?? ""}/>
                  <DS label={T(lang,"যাত্রী","Passenger")} value={r.sub.split("·")[0].trim()}/>
                  <DS label={T(lang,"ভাড়া","Fare")} value={r.badge ?? ""}/>
                  <div className="grid grid-cols-2 gap-2">
                    <DBtn label={T(lang,"রি-ইস্যু","Re-issue")} color="#0F766E"/>
                    <DBtn label={T(lang,"ভয়েড","Void")} color="#DC2626"/>
                  </div>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function VisaScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.visa;
  const rows = [
    { i:"🌐", c:C, name:"রহিম আহমেদ",    sub:"UAE · Tourist · ৫ সেপ্টেম্বর",    badge:tk(12000), st:"embassy"    as ChipKey },
    { i:"🌐", c:C, name:"সুমাইয়া বেগম", sub:"UK · Student · ২০ সেপ্টেম্বর",    badge:tk(35000), st:"processing" as ChipKey },
    { i:"🌐", c:C, name:"করিম উদ্দিন",   sub:"Canada · Visit · ১০ অক্টোবর",    badge:tk(25000), st:"pending"    as ChipKey },
    { i:"🌐", c:C, name:"নাসরিন আক্তার", sub:"Schengen · Tourist · ৩ অক্টোবর", badge:tk(18000), st:"approved"   as ChipKey },
    { i:"🌐", c:C, name:"জামাল হোসেন",   sub:"Malaysia · Work · ১৫ অক্টোবর",   badge:tk(8000),  st:"delivered"  as ChipKey },
  ];
  const stages = ["আবেদন","কাগজপত্র","দূতাবাস","সিদ্ধান্ত","ডেলিভারি"];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"দেশ","Country")} placeholder={T(lang,"যেমন: UAE, UK","e.g., UAE, UK")}/>
      <WF label={T(lang,"ভিসার ধরন","Visa Type")} placeholder={T(lang,"ট্যুরিস্ট / ওয়ার্ক / স্টুডেন্ট","Tourist / Work / Student")}/>
      <WF label={T(lang,"আবেদনকারীর নাম","Applicant Name")} placeholder="Full Name"/>
      <WF label={T(lang,"পাসপোর্ট নম্বর","Passport No.")} placeholder="BD1234567"/>
    </div>,
    <div key="1" className="space-y-3">
      <p className="text-[12px] font-bold text-slate-500 bn">{T(lang,"প্রয়োজনীয় ডকুমেন্ট","Required Documents")}</p>
      {[T(lang,"পাসপোর্ট কপি","Passport Copy"),T(lang,"ব্যাংক স্টেটমেন্ট","Bank Statement"),T(lang,"ছবি (৩৫×৪৫mm)","Photo 35×45mm"),T(lang,"হোটেল বুকিং","Hotel Booking")].map(d => (
        <label key={d} className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded"/>
          <span className="text-[13px] text-slate-700 bn">{d}</span>
        </label>
      ))}
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="ভিসা প্রক্রিয়া" titleEn="Visa Processing" subtitleBn="আবেদন · ট্র্যাকিং · দূতাবাস · ডেলিভারি" lang={lang}
        onNew={() => openNew(T(lang,"নতুন ভিসা আবেদন","New Visa Application"), steps)} newLabelBn="নতুন আবেদন"/>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Stage tracker */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="font-bold text-[12px] text-slate-500 bn mb-3">{T(lang,"ভিসা স্টেজ ট্র্যাকার","Visa Stage Tracker")}</p>
          <div className="flex items-center gap-0">
            {stages.map((s,i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{backgroundColor:i<=2?C:"#E2E8F0",color:i<=2?"white":"#94A3B8"}}>{i+1}</div>
                  <span className="text-[9px] font-bold text-center hidden sm:block" style={{color:i<=2?C:"#94A3B8"}}>{s}</span>
                </div>
                {i<stages.length-1 && <div className="h-0.5 flex-1 -mt-3.5" style={{backgroundColor:i<2?C:"#E2E8F0"}}/>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="মোট আবেদন" en="Total Apps" val="২৮" trend="+৩ আজ" lang={lang} color={C}/>
          <KpiCard bn="দূতাবাসে আছে" en="At Embassy" val="৮" trend="অপেক্ষা" lang={lang} color={C}/>
          <KpiCard bn="অনুমোদিত আজ" en="Approved Today" val="৩" trend="✓" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"দেশ ও ধরন","Country & Type")} value={r.sub}/>
                  <DS label={T(lang,"ফি","Fee")} value={r.badge ?? ""}/>
                  <DS label={T(lang,"স্ট্যাটাস","Status")} value={T(lang, CHIPS[r.st]?.bn, r.st)}/>
                  <WABtn/>
                  <DBtn label={T(lang,"ডকুমেন্ট দেখুন","View Documents")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TourScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.tour;
  const rows = [
    { i:"🗺", c:C, name:"কক্সবাজার সী-বিচ ট্যুর",   sub:"৩ রাত · ৪ দিন · ১২ জন",      badge:tk(8500),  st:"active"   as ChipKey },
    { i:"🗺", c:C, name:"থাইল্যান্ড গ্রুপ ট্যুর",   sub:"৫ রাত · ৬ দিন · ২০ জন",     badge:tk(45000), st:"confirmed"as ChipKey },
    { i:"🗺", c:C, name:"মালদ্বীপ হানিমুন প্যাকেজ", sub:"৪ রাত · ৫ দিন · ২ জন",      badge:tk(120000),st:"pending"  as ChipKey },
    { i:"🗺", c:C, name:"দুবাই এক্সপ্লোরার",         sub:"৬ রাত · ৭ দিন · ৮ জন",      badge:tk(65000), st:"active"   as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"প্যাকেজের নাম","Package Name")} placeholder={T(lang,"যেমন: কক্সবাজার ৩ দিন","e.g., Cox's Bazar 3D")}/>
      <WF label={T(lang,"গন্তব্য","Destination")} placeholder={T(lang,"কক্সবাজার","Cox's Bazar")}/>
      <div className="grid grid-cols-2 gap-3">
        <WF label={T(lang,"রাত","Nights")} placeholder="3" type="number"/>
        <WF label={T(lang,"দিন","Days")} placeholder="4" type="number"/>
      </div>
      <WF label={T(lang,"মূল্য (প্রতিজন)","Price per Person")} placeholder="৳" type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="ট্যুর ম্যানেজমেন্ট" titleEn="Tour Management" subtitleBn="প্যাকেজ · ইটিনারি · গ্রুপ ট্যুর · খরচ হিসাব" lang={lang}
        onNew={() => openNew(T(lang,"নতুন ট্যুর প্যাকেজ","New Tour Package"), steps)} newLabelBn="নতুন প্যাকেজ"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="সক্রিয় প্যাকেজ" en="Active Packages" val="১২" trend="চলমান" lang={lang} color={C}/>
          <KpiCard bn="এ মাসের বুকিং" en="Month Bookings" val="২৪" trend="+৬ ↑" lang={lang} color={C}/>
          <KpiCard bn="মাসের আয়" en="Month Revenue" val={tkL(620000)} trend="+২৩% ↑" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"বিবরণ","Details")} value={r.sub}/>
                  <DS label={T(lang,"মূল্য (প্রতিজন)","Price/person")} value={r.badge ?? ""}/>
                  <WABtn/>
                  <DBtn label={T(lang,"ইটিনারি দেখুন","View Itinerary")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HotelScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.hotel;
  const rows = [
    { i:"🏨", c:C, name:"Regency Hotel, Dubai",   sub:"রহিম আহমেদ · Deluxe · ২০-২৫ আগস্ট", badge:tk(22000), st:"confirmed"  as ChipKey },
    { i:"🏨", c:C, name:"Hilton, Bangkok",         sub:"করিম উদ্দিন · Suite · ৩-৮ অক্টোবর", badge:tk(35000), st:"pending"    as ChipKey },
    { i:"🏨", c:C, name:"Marriott, Kuala Lumpur",  sub:"সুমাইয়া · Standard · ১০-১৪ সেপ্টে", badge:tk(18000), st:"confirmed"  as ChipKey },
    { i:"🏨", c:C, name:"Holiday Inn, Singapore",  sub:"জামাল হোসেন · Twin · ৮-১৫ নভে",    badge:tk(42000), st:"processing" as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"হোটেলের নাম","Hotel Name")} placeholder="Hotel Name"/>
      <WF label={T(lang,"শহর","City")} placeholder={T(lang,"দুবাই, ব্যাংকক...","Dubai, Bangkok...")}/>
      <WF label={T(lang,"চেক-ইন","Check-in")} type="date"/>
      <WF label={T(lang,"চেক-আউট","Check-out")} type="date"/>
      <WF label={T(lang,"রুমের ধরন","Room Type")} placeholder="Standard / Deluxe / Suite"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="হোটেল ম্যানেজমেন্ট" titleEn="Hotel Management" subtitleBn="সার্চ · বুকিং · ভাউচার · চেক-ইন/আউট" lang={lang}
        onNew={() => openNew(T(lang,"নতুন হোটেল বুকিং","New Hotel Booking"), steps)} newLabelBn="নতুন বুকিং"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="চলমান বুকিং" en="Current Bookings" val="৮" trend="চলমান" lang={lang} color={C}/>
          <KpiCard bn="আজ চেক-ইন" en="Check-in Today" val="৩" trend="↓ আজ" lang={lang} color={C}/>
          <KpiCard bn="আজ চেক-আউট" en="Check-out Today" val="২" trend="↑ আজ" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"গেস্ট ও রুম","Guest & Room")} value={r.sub}/>
                  <DS label={T(lang,"মোট","Total")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"ভাউচার দেখুন","View Voucher")} color={C}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TransportScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.transport;
  const rows = [
    { i:"🚗", c:C, name:"Airport Pickup · রহিম আহমেদ", sub:"DAC Terminal 1 · ২০ আগস্ট ০৯:০০",  badge:"Toyota Vigo", st:"confirmed"  as ChipKey },
    { i:"🚌", c:C, name:"Group Transfer · থাইল্যান্ড ট্যুর", sub:"২০ জন · Micro Bus",             badge:"Dhaka-Cox",  st:"pending"    as ChipKey },
    { i:"🚗", c:C, name:"Car Rental · করিম উদ্দিন",    sub:"Dubai 5 দিন · Toyota Camry",       badge:tk(15000),    st:"active"     as ChipKey },
    { i:"🚗", c:C, name:"Airport Drop · সুমাইয়া বেগম", sub:"DAC Terminal 2 · ২৩ সেপ্টে ১৮:৩০", badge:"Honda CRV",  st:"processing" as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"সেবার ধরন","Service Type")} placeholder={T(lang,"Airport Pickup / Car Rental / Group","Airport Pickup / Car Rental")}/>
      <WF label={T(lang,"গ্রাহক","Customer")} placeholder={T(lang,"নাম বা ফোন","Name or Phone")}/>
      <WF label={T(lang,"তারিখ ও সময়","Date & Time")} type="datetime-local"/>
      <WF label={T(lang,"গন্তব্য","Destination")} placeholder={T(lang,"বিমানবন্দর, ঠিকানা","Airport, Address")}/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="পরিবহন ম্যানেজমেন্ট" titleEn="Transport" subtitleBn="এয়ারপোর্ট পিকআপ · কার রেন্টাল · ড্রাইভার · ট্রিপ" lang={lang}
        onNew={() => openNew(T(lang,"নতুন ট্রিপ","New Trip"), steps)} newLabelBn="নতুন ট্রিপ"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="আজকের ট্রিপ" en="Today Trips" val="৬" trend="সক্রিয়" lang={lang} color={C}/>
          <KpiCard bn="উপলব্ধ ড্রাইভার" en="Drivers Available" val="৪" trend="৮ জনের মধ্যে" lang={lang} color={C}/>
          <KpiCard bn="মোট যানবাহন" en="Total Vehicles" val="৮" trend="৬ সক্রিয়" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name.split("·")[0].trim(), (
                <div className="space-y-3">
                  <DS label={T(lang,"বিবরণ","Details")} value={r.sub}/>
                  <DS label={T(lang,"যানবাহন","Vehicle")} value={r.badge ?? ""}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HajjScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.hajj;
  const rows = [
    { i:"⭐", c:C, name:"Umrah Premium Package",  sub:"১৫ রাত · ১৮ জন · মক্কা + মদিনা",  badge:tk(120000), st:"active"    as ChipKey },
    { i:"⭐", c:C, name:"Hajj 2025 Group A",       sub:"৪০ দিন · ৩৫ জন · সরকারি কোটা",   badge:tk(450000), st:"confirmed" as ChipKey },
    { i:"⭐", c:C, name:"Umrah Economy Package",   sub:"১০ রাত · ২৫ জন · শুধু মক্কা",     badge:tk(75000),  st:"pending"   as ChipKey },
    { i:"⭐", c:C, name:"Hajj 2025 VIP Group",     sub:"৪২ দিন · ১৫ জন · বিমান + হোটেল", badge:tk(750000), st:"processing"as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"প্যাকেজের নাম","Package Name")} placeholder={T(lang,"যেমন: উমরাহ প্রিমিয়াম","e.g., Umrah Premium")}/>
      <WF label={T(lang,"হজ / উমরাহ","Hajj / Umrah")} placeholder="Hajj / Umrah"/>
      <WF label={T(lang,"মেয়াদ (রাত)","Duration (Nights)")} type="number" placeholder="15"/>
      <WF label={T(lang,"মূল্য","Price (৳)")} type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="হজ্জ ও উমরাহ" titleEn="Hajj & Umrah" subtitleBn="প্যাকেজ · হাজী ম্যানেজমেন্ট · ফ্লাইট · হোটেল" lang={lang}
        onNew={() => openNew(T(lang,"নতুন প্যাকেজ","New Package"), steps)} newLabelBn="নতুন প্যাকেজ"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="সক্রিয় প্যাকেজ" en="Active Packages" val="৩" trend="চলমান" lang={lang} color={C}/>
          <KpiCard bn="মোট হাজী" en="Total Pilgrims" val="৮৫" trend="নিবন্ধিত" lang={lang} color={C}/>
          <KpiCard bn="আসন্ন ফ্লাইট" en="Upcoming Flights" val="২" trend="১৫ দিনে" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"বিবরণ","Details")} value={r.sub}/>
                  <DS label={T(lang,"মূল্য","Price")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"হাজী তালিকা","Pilgrim List")} color={C}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudentScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.student;
  const rows = [
    { i:"🎓", c:C, name:"রাহেলা বেগম",   sub:"MSc CS · University of Leeds, UK",      badge:"IELTS 7.0", st:"processing" as ChipKey },
    { i:"🎓", c:C, name:"ইমরান হোসেন",  sub:"MBA · Monash University, Australia",     badge:"IELTS 6.5", st:"approved"   as ChipKey },
    { i:"🎓", c:C, name:"তানিয়া আক্তার", sub:"BSc Nursing · University of Dundee, UK", badge:"IELTS 6.0", st:"pending"    as ChipKey },
    { i:"🎓", c:C, name:"শাকিল আহমেদ",  sub:"BEng · TU Munich, Germany",             badge:"IELTS 7.5", st:"confirmed"  as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"শিক্ষার্থীর নাম","Student Name")} placeholder="Full Name"/>
      <WF label={T(lang,"দেশ","Country")} placeholder="UK, Australia, Canada..."/>
      <WF label={T(lang,"বিশ্ববিদ্যালয়","University")} placeholder="University Name"/>
      <WF label={T(lang,"কোর্স","Course")} placeholder="MSc Computer Science"/>
      <WF label={T(lang,"IELTS স্কোর","IELTS Score")} placeholder="7.0" type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="স্টুডেন্ট কনসালটেন্সি" titleEn="Student Consultancy" subtitleBn="বিশ্ববিদ্যালয় · আবেদন · অফার লেটার · ভিসা" lang={lang}
        onNew={() => openNew(T(lang,"নতুন শিক্ষার্থী","New Student"), steps)} newLabelBn="নতুন শিক্ষার্থী"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="মোট শিক্ষার্থী" en="Total Students" val="১৪০" trend="+১২ এ মাসে" lang={lang} color={C}/>
          <KpiCard bn="আবেদন হয়েছে" en="Applied" val="২৮" trend="প্রক্রিয়াধীন" lang={lang} color={C}/>
          <KpiCard bn="অফার পেয়েছে" en="Offers Received" val="১২" trend="+৩ এ সপ্তাহ" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"কোর্স ও বিশ্ববিদ্যালয়","Course & University")} value={r.sub}/>
                  <DS label="IELTS" value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"ডকুমেন্ট চেকলিস্ট","Document Checklist")} color={C}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ManpowerScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.manpower;
  const rows = [
    { i:"💼", c:C, name:"করিম হোসেন",    sub:"Driver · Saudi Arabia · BMET নং: 123456", badge:"মেডিকেল পাস",st:"processing" as ChipKey },
    { i:"💼", c:C, name:"আব্দুল মালেক",  sub:"Construction · UAE · Police Clearance",   badge:"ভিসা প্রসেস",st:"deployed"   as ChipKey },
    { i:"💼", c:C, name:"রহমান মিয়া",    sub:"House Helper · Qatar · CV জমা দেওয়া",    badge:"CV রিভিউ",   st:"pending"    as ChipKey },
    { i:"💼", c:C, name:"শামসুন নাহার",   sub:"Nurse · Malaysia · সকল কাগজ সম্পন্ন",   badge:"ফ্লাইট রেডি",st:"confirmed"  as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"প্রার্থীর নাম","Candidate Name")} placeholder="Full Name"/>
      <WF label={T(lang,"পেশা","Profession")} placeholder="Driver / Nurse / Worker"/>
      <WF label={T(lang,"গন্তব্য দেশ","Destination Country")} placeholder="Saudi Arabia, UAE..."/>
      <WF label={T(lang,"নিয়োগকর্তা","Employer")} placeholder="Company Name"/>
      <WF label={T(lang,"BMET নম্বর","BMET No.")} placeholder="BMET-123456"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="ম্যানপাওয়ার ERP" titleEn="Manpower ERP" subtitleBn="প্রার্থী · মেডিকেল · BMET · ভিসা · ডেপ্লয়মেন্ট" lang={lang}
        onNew={() => openNew(T(lang,"নতুন প্রার্থী","New Candidate"), steps)} newLabelBn="নতুন প্রার্থী"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="মোট প্রার্থী" en="Total Candidates" val="৩২০" trend="+১৮ এ মাসে" lang={lang} color={C}/>
          <KpiCard bn="জব অর্ডার" en="Job Orders" val="১৫" trend="সক্রিয়" lang={lang} color={C}/>
          <KpiCard bn="এ মাসে যাত্রা" en="Deployed" val="৮" trend="+৩ ↑" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"পেশা ও গন্তব্য","Profession & Country")} value={r.sub}/>
                  <DS label={T(lang,"পর্যায়","Stage")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"ডকুমেন্ট চেকলিস্ট","Document Checklist")} color={C}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AgentsScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.agents;
  const rows = [
    { i:"A", c:C, name:"Sky Wings Travel",    sub:"Chittagong · ৪৫ টি বুকিং", badge:tk(185000), st:"active"   as ChipKey },
    { i:"B", c:C, name:"Gulf Bridge Agency",  sub:"Sylhet · ৩২ টি বুকিং",     badge:tk(95000),  st:"active"   as ChipKey },
    { i:"C", c:C, name:"Dream Journey BD",    sub:"Dhaka · ১৮ টি বুকিং",     badge:tk(62000),  st:"pending"  as ChipKey },
    { i:"D", c:C, name:"Horizon Tours",       sub:"Rajshahi · ১২ টি বুকিং",  badge:tk(38000),  st:"inactive" as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"এজেন্সির নাম","Agency Name")} placeholder="Sky Wings Travel"/>
      <WF label={T(lang,"মালিকের নাম","Owner Name")} placeholder="Full Name"/>
      <WF label={T(lang,"ফোন","Phone")} placeholder="01700000000" type="tel"/>
      <WF label={T(lang,"ক্রেডিট লিমিট","Credit Limit")} placeholder="৳" type="number"/>
      <WF label={T(lang,"কমিশন (%)","Commission %")} placeholder="5" type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="B2B এজেন্ট পোর্টাল" titleEn="B2B Agents" subtitleBn="এজেন্ট · ওয়ালেট · কমিশন · লেজার" lang={lang}
        onNew={() => openNew(T(lang,"নতুন এজেন্ট","New Agent"), steps)} newLabelBn="নতুন এজেন্ট"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="সক্রিয় এজেন্ট" en="Active Agents" val="৪৫" trend="+৩ এ মাসে" lang={lang} color={C}/>
          <KpiCard bn="মোট ওয়ালেট" en="Total Wallet" val={tkL(285000)} trend="চলমান" lang={lang} color={C}/>
          <KpiCard bn="কমিশন বাকি" en="Commission Due" val={tkL(35000)} trend="পরিশোধ বাকি" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"মোট বুকিং","Total Bookings")} value={r.sub}/>
                  <DS label={T(lang,"ওয়ালেট ব্যালেন্স","Wallet Balance")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"লেজার দেখুন","View Ledger")} color={C}/>
                  <WABtn/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CorporateScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.corporate;
  const rows = [
    { i:"🏢", c:C, name:"BRAC International",   sub:"৪৫ কর্মচারী · মাসিক: ৳৮,৫০,০০০", badge:tk(850000), st:"active"   as ChipKey },
    { i:"🏢", c:C, name:"Square Pharmaceuticals",sub:"৩২ কর্মচারী · মাসিক: ৳৫,২০,০০০", badge:tk(520000), st:"active"   as ChipKey },
    { i:"🏢", c:C, name:"Grameenphone",          sub:"২০ কর্মচারী · মাসিক: ৳৩,৮০,০০০", badge:tk(380000), st:"pending"  as ChipKey },
    { i:"🏢", c:C, name:"Dutch Bangla Bank",     sub:"১৫ কর্মচারী · মাসিক: ৳২,১০,০০০", badge:tk(210000), st:"active"   as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"কোম্পানির নাম","Company Name")} placeholder="Company Ltd."/>
      <WF label={T(lang,"কোম্পানির ধরন","Company Type")} placeholder="NGO / Bank / Pharma"/>
      <WF label={T(lang,"কর্মচারী সংখ্যা","Employee Count")} placeholder="45" type="number"/>
      <WF label={T(lang,"ক্রেডিট সীমা","Credit Limit")} placeholder="৳" type="number"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="কর্পোরেট ট্র্যাভেল" titleEn="Corporate Travel" subtitleBn="কর্পোরেট ক্লায়েন্ট · ট্রাভেল পলিসি · অ্যাপ্রুভাল" lang={lang}
        onNew={() => openNew(T(lang,"নতুন কর্পোরেট ক্লায়েন্ট","New Corporate Client"), steps)} newLabelBn="নতুন ক্লায়েন্ট"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="কর্পোরেট ক্লায়েন্ট" en="Clients" val="১২" trend="+২ এ মাসে" lang={lang} color={C}/>
          <KpiCard bn="খোলা অনুরোধ" en="Open Requests" val="৮" trend="অনুমোদন বাকি" lang={lang} color={C}/>
          <KpiCard bn="মাসের আয়" en="Month Revenue" val={tkL(4500000)} trend="+১২% ↑" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"কর্মচারী ও বাজেট","Employees & Budget")} value={r.sub}/>
                  <DS label={T(lang,"মাসিক ব্যয়","Monthly Spend")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"ট্রাভেল পলিসি","Travel Policy")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FinanceScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.finance;
  const rows = [
    { i:"💰", c:C, name:"নগদ রসিদ — রহিম আহমেদ",   sub:"Cash · বুকিং পেমেন্ট · ২০ জুলাই", badge:tk(32000),  st:"confirmed" as ChipKey },
    { i:"🏦", c:C, name:"ব্যাংক ট্রান্সফার — BRAC",  sub:"Bank · কর্পোরেট পেমেন্ট · ১৯ জুলাই",badge:tk(180000), st:"confirmed" as ChipKey },
    { i:"📱", c:C, name:"bKash পেমেন্ট — সুমাইয়া",  sub:"bKash · ভিসা ফি · ১৮ জুলাই",      badge:tk(12000),  st:"confirmed" as ChipKey },
    { i:"💸", c:C, name:"খরচ — অফিস ভাড়া",          sub:"Expense · জুলাই মাসের ভাড়া",       badge:tk(25000),  st:"processing"as ChipKey },
  ];
  const REPORTS = [["P&L","লাভ-ক্ষতি","#0F766E"],["Balance Sheet","ব্যালেন্স শিট","#1D4ED8"],["Trial Balance","ট্রায়াল ব্যালেন্স","#7C3AED"],["VAT & Tax","VAT ও ট্যাক্স","#DC2626"]];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"ভাউচারের ধরন","Voucher Type")} placeholder="Cash / Bank / Journal"/>
      <WF label={T(lang,"অ্যাকাউন্ট","Account")} placeholder={T(lang,"নগদ, ব্যাংক...","Cash, Bank...")}/>
      <WF label={T(lang,"পরিমাণ","Amount")} placeholder="৳" type="number"/>
      <WF label={T(lang,"বিবরণ","Description")} placeholder={T(lang,"কারণ লিখুন","Enter reason")}/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="ফাইন্যান্স ERP" titleEn="Finance ERP" subtitleBn="লেজার · ভাউচার · P&L · ব্যালেন্স শিট" lang={lang}
        onNew={() => openNew(T(lang,"নতুন ভাউচার","New Voucher"), steps)} newLabelBn="নতুন ভাউচার"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KpiCard bn="নগদ হাতে" en="Cash in Hand" val={tkL(420000)} trend="↑ সক্রিয়" lang={lang} color={C}/>
          <KpiCard bn="ব্যাংক ব্যালেন্স" en="Bank Balance" val={tkL(1580000)} trend="↑ ভালো" lang={lang} color={C}/>
          <KpiCard bn="পাওনা (আসবে)" en="Receivable" val={tkL(850000)} trend="সংগ্রহ বাকি" lang={lang} color={C}/>
          <KpiCard bn="দেনা (যাবে)" en="Payable" val={tkL(230000)} trend="পরিশোধ বাকি" lang={lang} color={C}/>
        </div>
        {/* Report Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REPORTS.map(([e,b,c]) => (
            <button key={e} type="button" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{backgroundColor:c+"18"}}>
                <BarChart2 size={16} style={{color:c}}/>
              </div>
              <p className="font-bold text-[11px] bn" style={{color:c}}>{T(lang,b,e)}</p>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-50">
            <p className="font-black text-[13px] text-slate-900 bn">{T(lang,"সাম্প্রতিক লেনদেন","Recent Transactions")}</p>
          </div>
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(T(lang,"লেনদেন বিবরণ","Transaction Detail"), (
                <div className="space-y-3">
                  <DS label={T(lang,"বিবরণ","Description")} value={r.sub}/>
                  <DS label={T(lang,"পরিমাণ","Amount")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"রসিদ ডাউনলোড","Download Receipt")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HRScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.hr;
  const rows = [
    { i:"👤", c:C, name:"আলী হাসান",       sub:"Manager · Sales Dept · ঢাকা",        badge:tk(55000), st:"present"   as ChipKey },
    { i:"👤", c:C, name:"রাফিয়া বেগম",    sub:"Accountant · Finance · ঢাকা",         badge:tk(40000), st:"present"   as ChipKey },
    { i:"👤", c:C, name:"কামরুল ইসলাম",   sub:"Visa Officer · Visa Dept · চট্টগ্রাম", badge:tk(35000), st:"leave"     as ChipKey },
    { i:"👤", c:C, name:"নুসরাত জাহান",   sub:"Air Ticketing · Ticket Dept · সিলেট",  badge:tk(38000), st:"absent"    as ChipKey },
    { i:"👤", c:C, name:"তারেক হোসেন",    sub:"Driver · Operations · ঢাকা",           badge:tk(22000), st:"present"   as ChipKey },
  ];
  const steps: ReactNode[] = [
    <div key="0" className="space-y-3">
      <WF label={T(lang,"কর্মচারীর নাম","Employee Name")} placeholder="Full Name"/>
      <WF label={T(lang,"বিভাগ","Department")} placeholder={T(lang,"বিক্রয়, ফাইন্যান্স...","Sales, Finance...")}/>
      <WF label={T(lang,"পদবি","Designation")} placeholder={T(lang,"ম্যানেজার, অফিসার","Manager, Officer")}/>
      <WF label={T(lang,"মাসিক বেতন","Monthly Salary")} placeholder="৳" type="number"/>
      <WF label={T(lang,"যোগদানের তারিখ","Join Date")} type="date"/>
    </div>,
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="HR ও বেতন" titleEn="HR & Payroll" subtitleBn="কর্মচারী · হাজিরা · বেতন · ছুটি" lang={lang}
        onNew={() => openNew(T(lang,"নতুন কর্মচারী","New Employee"), steps)} newLabelBn="নতুন কর্মচারী"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="মোট কর্মচারী" en="Total Employees" val="২৮" trend="সক্রিয়" lang={lang} color={C}/>
          <KpiCard bn="আজ উপস্থিত" en="Present Today" val="২৪" trend="৮৬% উপস্থিতি" lang={lang} color={C}/>
          <KpiCard bn="এ মাসের বেতন" en="Month Payroll" val={tkL(980000)} trend="অনুমোদন বাকি" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"বিভাগ ও পদবি","Dept & Designation")} value={r.sub}/>
                  <DS label={T(lang,"মাসিক বেতন","Monthly Salary")} value={r.badge ?? ""}/>
                  <DS label={T(lang,"আজকের স্ট্যাটাস","Today Status")} value={T(lang, CHIPS[r.st]?.bn, r.st)}/>
                  <DBtn label={T(lang,"পে-স্লিপ","Pay Slip")} color={C}/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortalsScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.portals;
  const portals = [
    { icon:<Users size={28}/>,   title:T(lang,"কাস্টমার পোর্টাল","Customer Portal"), sub:T(lang,"বুকিং · পেমেন্ট · ভিসা স্ট্যাটাস","Bookings · Payments · Visa Status"), users:"১,২৪০+", c:"#1D4ED8" },
    { icon:<UserCheck size={28}/>,title:T(lang,"এজেন্ট পোর্টাল","Agent Portal"),    sub:T(lang,"বুক করুন · কমিশন · ওয়ালেট","Book · Commission · Wallet"),               users:"৪৫",      c:"#9B1C31" },
    { icon:<Monitor size={28}/>, title:T(lang,"মোবাইল অ্যাপস","Mobile Apps"),       sub:T(lang,"Customer · Agent · Driver · Employee","Customer · Agent · Driver"),          users:"৫টি অ্যাপ",c:"#0E7490" },
    { icon:<Globe size={28}/>,   title:T(lang,"ওয়েবসাইট CMS","Website CMS"),       sub:T(lang,"পেজ · ব্লগ · SEO · গ্যালারি","Pages · Blog · SEO · Gallery"),             users:"লাইভ",    c:"#B45309" },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="পোর্টাল ও অ্যাপস" titleEn="Portals & Apps" subtitleBn="কাস্টমার পোর্টাল · এজেন্ট পোর্টাল · মোবাইল অ্যাপস" lang={lang}
        onNew={() => openNew(T(lang,"নতুন ব্যবহারকারী","New User"), [
          <div key="0" className="space-y-3"><WF label={T(lang,"নাম","Name")} placeholder="Full Name"/><WF label={T(lang,"ফোন","Phone")} placeholder="01700000000" type="tel"/><WF label={T(lang,"ভূমিকা","Role")} placeholder="Customer / Agent / Driver"/></div>
        ])} newLabelBn="নতুন ব্যবহারকারী"/>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portals.map((p,i) => (
            <button key={i} type="button"
              onClick={() => openDrawer(p.title, <div className="space-y-3"><DS label="Sub-modules" value={p.sub}/><DS label={T(lang,"ব্যবহারকারী","Users")} value={p.users}/><DBtn label={T(lang,"কনফিগার করুন","Configure")} color={p.c}/></div>)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:p.c+"18",color:p.c}}>{p.icon}</div>
              <div>
                <p className="font-black text-[15px] text-slate-900 bn mb-1">{p.title}</p>
                <p className="text-[12px] text-slate-400 bn mb-2">{p.sub}</p>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{backgroundColor:p.c+"15",color:p.c}}>{p.users}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AIScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.ai;
  const tools = [
    { icon:MessageCircle,  bn:"AI চ্যাট সহকারী",  en:"AI Chat Assistant",   tag:"Popular"  },
    { icon:FileText,       bn:"প্রপোজাল জেনারেটর", en:"Proposal Generator",  tag:"New"      },
    { icon:Map,            bn:"ইটিনারি বিল্ডার",  en:"Itinerary Builder",   tag:""         },
    { icon:FileText,       bn:"ইমেইল রাইটার",      en:"Email Writer",        tag:""         },
    { icon:MessageCircle,  bn:"WhatsApp রিপ্লাই",  en:"WhatsApp Reply AI",   tag:"Popular"  },
    { icon:Globe,          bn:"স্মার্ট সার্চ",     en:"Smart Search",        tag:""         },
    { icon:ScanLine,       bn:"ডকুমেন্ট বিশ্লেষণ","en":"Document Analysis",  tag:""         },
    { icon:BarChart2,      bn:"আয় পূর্বানুমান",   en:"Revenue Forecast",    tag:"AI"       },
    { icon:CreditCard,     bn:"খরচ বিশ্লেষণ",     en:"Expense Analysis",    tag:""         },
    { icon:Users,          bn:"গ্রাহক সুপারিশ",    en:"Customer Recommend",  tag:"AI"       },
    { icon:FileText,       bn:"রিপোর্ট সারাংশ",   en:"Report Summary",      tag:""         },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="AI স্মার্ট সেন্টার" titleEn="AI Smart Center" subtitleBn="চ্যাট · প্রপোজাল · ইটিনারি · বিশ্লেষণ" lang={lang}
        onNew={() => openNew(T(lang,"AI প্রপোজাল তৈরি করুন","Generate AI Proposal"), [
          <div key="0" className="space-y-3"><WF label={T(lang,"ক্লায়েন্টের নাম","Client Name")} placeholder="Full Name"/><WF label={T(lang,"গন্তব্য","Destination")} placeholder="Dubai, Thailand..."/><WF label={T(lang,"বাজেট","Budget")} placeholder="৳" type="number"/></div>
        ])} newLabelBn="AI প্রপোজাল"/>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((t,i) => {
            const Icon = t.icon;
            return (
              <button key={i} type="button"
                onClick={() => openDrawer(T(lang,t.bn,t.en), <div className="space-y-3"><DS label="Module" value={T(lang,t.bn,t.en)}/><DBtn label={T(lang,"চালু করুন","Open Tool")} color={C}/></div>)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{backgroundColor:C+"18",color:C}}>
                  <Icon size={20}/>
                </div>
                <p className="font-bold text-[12px] text-slate-900 bn leading-tight">{T(lang,t.bn,t.en)}</p>
                {t.tag && <span className="text-[9px] font-black px-1.5 py-0.5 rounded mt-1.5 inline-block" style={{backgroundColor:C,color:"white"}}>{t.tag}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function OCRScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.ocr;
  const docTypes = [
    { icon:"🛂", bn:"পাসপোর্ট",         en:"Passport"       },
    { icon:"🪪", bn:"NID কার্ড",         en:"NID Card"       },
    { icon:"🌐", bn:"ভিসা",              en:"Visa"           },
    { icon:"✈️", bn:"টিকেট",            en:"Ticket"         },
    { icon:"🧾", bn:"ইনভয়েস",          en:"Invoice"        },
    { icon:"🎓", bn:"স্টুডেন্ট ডক",     en:"Student Doc"    },
    { icon:"💼", bn:"ম্যানপাওয়ার ডক",  en:"Manpower Doc"   },
  ];
  const rows = [
    { i:"🛂", c:C, name:"রহিম আহমেদের পাসপোর্ট",  sub:"১২ টি ঘর পূরণ · AI নিশ্চিত",  badge:"১২ ঘর",   st:"approved" as ChipKey },
    { i:"🪪", c:C, name:"সুমাইয়া বেগমের NID",     sub:"৮ টি ঘর পূরণ · ২ টি চেক করুন", badge:"৮ ঘর",    st:"pending"  as ChipKey },
    { i:"🌐", c:C, name:"করিম উদ্দিনের ভিসা",     sub:"৬ টি ঘর পূরণ · AI নিশ্চিত",   badge:"৬ ঘর",    st:"approved" as ChipKey },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="OCR স্মার্ট স্ক্যানার" titleEn="OCR Scanner" subtitleBn="পাসপোর্ট · NID · ভিসা · টিকেট · AI অটো-ফিল" lang={lang}
        onNew={() => openNew(T(lang,"ডকুমেন্ট স্ক্যান করুন","Scan Document"), [
          <div key="0" className="space-y-3">
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
              <ScanLine size={32} className="mx-auto mb-2" style={{color:C}}/>
              <p className="font-bold text-[13px] text-slate-600 bn">{T(lang,"ফটো তুলুন বা আপলোড করুন","Take Photo or Upload")}</p>
              <p className="text-[11px] text-slate-400 bn mt-1">{T(lang,"AI স্বয়ংক্রিয়ভাবে তথ্য বের করবে","AI will auto-extract all fields")}</p>
            </div>
          </div>
        ])} newLabelBn="নতুন স্ক্যান"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {docTypes.map(d => (
            <button key={d.en} type="button"
              onClick={() => openNew(T(lang,`${d.bn} স্ক্যান`,`Scan ${d.en}`), [<div key="0" className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center"><p className="text-[28px]">{d.icon}</p><p className="font-bold text-[13px] text-slate-600 bn mt-2">{T(lang,"আপলোড করুন","Upload")}</p></div>])}
              className="flex flex-col items-center gap-1.5 py-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-amber-400 hover:bg-amber-50 transition-all">
              <span className="text-[22px]">{d.icon}</span>
              <p className="text-[10px] font-bold text-slate-600 bn text-center">{T(lang,d.bn,d.en)}</p>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-50"><p className="font-black text-[13px] text-slate-900 bn">{T(lang,"সাম্প্রতিক স্ক্যান","Recent Scans")}</p></div>
          {rows.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, <div className="space-y-3"><DS label={T(lang,"স্ক্যান ফলাফল","Scan Result")} value={r.sub}/><DBtn label={T(lang,"ডেটা নিশ্চিত করুন","Confirm Data")} color={C}/></div>)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AutomationScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.automation;
  const automations = [
    { icon:MessageCircle, bn:"অটো ফলো-আপ",      en:"Auto Follow-up",   on:true  },
    { icon:MessageCircle, bn:"অটো WhatsApp",     en:"Auto WhatsApp",    on:true  },
    { icon:Phone,         bn:"অটো SMS",          en:"Auto SMS",         on:false },
    { icon:FileText,      bn:"অটো ইমেইল",        en:"Auto Email",       on:true  },
    { icon:CreditCard,    bn:"অটো ইনভয়েস",      en:"Auto Invoice",     on:true  },
    { icon:AlertCircle,   bn:"পেমেন্ট রিমাইন্ডার","en":"Due Reminder",   on:true  },
    { icon:Clock,         bn:"শিডিউলড রিপোর্ট",  en:"Scheduled Reports",on:false },
    { icon:Download,      bn:"অটো ব্যাকআপ",      en:"Auto Backup",      on:true  },
    { icon:Activity,      bn:"অটো টাস্ক",        en:"Auto Task",        on:false },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="অটোমেশন সেন্টার" titleEn="Automation Center" subtitleBn="WHEN → DO নিয়ম · ট্রিগার · লগ · শিডিউল" lang={lang}
        onNew={() => openNew(T(lang,"নতুন অটোমেশন","New Automation"), [
          <div key="0" className="space-y-3">
            <WF label={T(lang,"যখন (WHEN)","WHEN Trigger")} placeholder={T(lang,"নতুন বুকিং হলে...","New booking created...")}/>
            <WF label={T(lang,"তখন (DO)","DO Action")} placeholder={T(lang,"WhatsApp পাঠাও","Send WhatsApp")}/>
            <WF label={T(lang,"বিলম্ব","Delay")} placeholder={T(lang,"তাৎক্ষণিক","Immediate")}/>
          </div>
        ])} newLabelBn="নতুন নিয়ম"/>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <KpiCard bn="সক্রিয় অটোমেশন" en="Active Rules" val="৬" trend="চলমান" lang={lang} color={C}/>
          <KpiCard bn="আজ রান হয়েছে" en="Runs Today" val="১৪৮" trend="+৩২% ↑" lang={lang} color={C}/>
          <KpiCard bn="সাফল্যের হার" en="Success Rate" val="৯৮.৬%" trend="স্বাস্থ্যকর" lang={lang} color={C}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {automations.map((a,i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{backgroundColor:C+"18",color:C}}>
                  <Icon size={17}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[12px] text-slate-900 bn truncate">{T(lang,a.bn,a.en)}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {a.on ? <ToggleRight size={24} style={{color:C}}/> : <ToggleLeft size={24} className="text-slate-300"/>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.integrations;
  const apps = [
    { n:"Amadeus GDS",  cat:"GDS",     st:"connected"  as ChipKey, c:"#1D4ED8" },
    { n:"bKash PGW",    cat:"Payment", st:"connected"  as ChipKey, c:"#E91E8C" },
    { n:"Nagad",        cat:"Payment", st:"connected"  as ChipKey, c:"#F57C00" },
    { n:"SSLCommerz",   cat:"Payment", st:"inactive"   as ChipKey, c:"#2E8B57" },
    { n:"WASenderAPI",  cat:"WhatsApp",st:"connected"  as ChipKey, c:"#25D366" },
    { n:"BulkSMSBD",    cat:"SMS",     st:"inactive"   as ChipKey, c:"#7C3AED" },
    { n:"Google Workspace",cat:"Google",st:"connected" as ChipKey, c:"#EA4335" },
    { n:"OpenAI GPT-4", cat:"AI",      st:"connected"  as ChipKey, c:"#10A37F" },
    { n:"Anthropic Claude",cat:"AI",   st:"inactive"   as ChipKey, c:"#B91C1C" },
    { n:"Gemini Pro",   cat:"AI",      st:"inactive"   as ChipKey, c:"#4285F4" },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <PageHeader C={C} titleBn="ইন্টিগ্রেশন মার্কেটপ্লেস" titleEn="Integrations" subtitleBn="GDS · পেমেন্ট · WhatsApp · Google · AI" lang={lang}
        onNew={() => {}} newLabelBn="নতুন কানেকশন"/>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {apps.map((a,i) => (
            <button key={i} type="button"
              onClick={() => openDrawer(a.n, (
                <div className="space-y-3">
                  <DS label={T(lang,"বিভাগ","Category")} value={a.cat}/>
                  <DS label={T(lang,"স্ট্যাটাস","Status")} value={T(lang, CHIPS[a.st]?.bn, a.st)}/>
                  {a.st === "connected"
                    ? <DBtn label={T(lang,"সংযোগ পরীক্ষা করুন","Test Connection")} color={C}/>
                    : <DBtn label={T(lang,"সংযুক্ত করুন","Connect Now")} color={a.c}/>}
                </div>
              ))}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5" style={{backgroundColor:a.c+"18",color:a.c}}>
                <Wifi size={16}/>
              </div>
              <p className="font-bold text-[12px] text-slate-900 mb-1">{a.n}</p>
              <p className="text-[10px] text-slate-400 mb-2">{a.cat}</p>
              <Chip status={a.st} lang={lang}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SuperAdminScreen({ navigate, lang, openDrawer, openNew }: ScreenProps) {
  const C = MODULE_COLOR.superadmin;
  const tenants = [
    { i:"S", c:"#2E8B57", name:"Star Travel BD",     sub:"Growth · Chittagong · সক্রিয়",   badge:tk(8500),  st:"active"   as ChipKey },
    { i:"G", c:"#1D4ED8", name:"Gulf Bridge Agency", sub:"Enterprise · Sylhet · সক্রিয়",   badge:tk(25000), st:"active"   as ChipKey },
    { i:"D", c:"#7C3AED", name:"Dream Journey",      sub:"Starter · Dhaka · ট্রায়াল",       badge:tk(2500),  st:"pending"  as ChipKey },
    { i:"H", c:"#D97706", name:"Horizon Tours",      sub:"Growth · Rajshahi · মেয়াদ শেষ",  badge:tk(8500),  st:"inactive" as ChipKey },
    { i:"Q", c:"#DC2626", name:"Quick Ticketing",    sub:"Enterprise · Khulna · সক্রিয্",   badge:tk(25000), st:"active"   as ChipKey },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-20 sm:pb-0">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <Crown size={16} style={{color:C}}/>
          <p className="font-black text-[15px] text-slate-900 bn">Super Admin — SaaS Dashboard</p>
          <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-black text-white" style={{backgroundColor:C}}>Platform Owner</span>
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KpiCard bn="মোট টেন্যান্ট" en="Total Tenants" val="১৪২" trend="+৮ এ মাসে" lang={lang} color={C}/>
          <KpiCard bn="সক্রিয় সাবস্ক্রিপশন" en="Active Subs" val="১২৮" trend="৯০% রিটেনশন" lang={lang} color={C}/>
          <KpiCard bn="MRR" en="Monthly Revenue" val={tkL(4250000)} trend="+১৫% ↑" lang={lang} color={C}/>
          <KpiCard bn="নতুন সাইনআপ" en="New Signups" val="৮" trend="এ মাসে" lang={lang} color={C}/>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-50">
            <p className="font-black text-[13px] text-slate-900 bn">{T(lang,"টেন্যান্ট তালিকা","Tenant List")}</p>
            <button type="button" onClick={() => openNew(T(lang,"নতুন টেন্যান্ট","New Tenant"), [
              <div key="0" className="space-y-3"><WF label={T(lang,"এজেন্সির নাম","Agency Name")} placeholder="Agency Name"/><WF label={T(lang,"প্ল্যান","Plan")} placeholder="Starter / Growth / Enterprise"/><WF label={T(lang,"ফোন","Phone")} placeholder="01700000000" type="tel"/></div>
            ])} className="text-[11px] font-bold bn hover:underline" style={{color:C}}>+ {T(lang,"নতুন","New")}</button>
          </div>
          {tenants.map((r,i) => (
            <DataRow key={i} initial={r.i} color={r.c} name={r.name} sub={r.sub} badge={r.badge} status={r.st} lang={lang}
              onView={() => openDrawer(r.name, (
                <div className="space-y-3">
                  <DS label={T(lang,"প্ল্যান ও স্থান","Plan & Location")} value={r.sub}/>
                  <DS label={T(lang,"মাসিক ফি","Monthly Fee")} value={r.badge ?? ""}/>
                  <DBtn label={T(lang,"লগইন করুন (এজেন্ট হিসেবে)","Login as Tenant")} color={C}/>
                  <DBtn label={T(lang,"মডিউল টগল","Feature Toggle")} color="#475569"/>
                </div>
              ))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
