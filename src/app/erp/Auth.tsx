import { useState, useRef, useEffect } from "react";
import { T, type Lang } from "./types";
import {
  Eye, EyeOff, Plane, Globe, GraduationCap, Briefcase, Star,
  Building, Building2, Check, ArrowRight, Loader2, AlertCircle,
  MessageCircle, RefreshCw,
} from "lucide-react";

const NAVY     = "#12356B";
const NAVYDARK = "#0C1F4A";
const ORANGE   = "#F26B21";

// ─── WaSender API ─────────────────────────────────────────────────────────────
const WASENDER_TOKEN = import.meta.env.VITE_WASENDER_TOKEN as string;

function bdPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0"))   return "880" + digits.slice(1);
  return "880" + digits;
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendWhatsAppOtp(phone: string, otp: string): Promise<void> {
  const intl = bdPhone(phone);
  const message =
    `🔐 *TravelAgencyWeb — OTP যাচাই*\n\n` +
    `আপনার OTP কোড: *${otp}*\n` +
    `Your verification code: *${otp}*\n\n` +
    `⏱ মেয়াদ: ৫ মিনিট | Valid for 5 minutes.\n` +
    `এই কোড কারো সাথে শেয়ার করবেন না।`;

  const res = await fetch("https://api.wasenderapi.com/api/send-message", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": WASENDER_TOKEN,
    },
    body: JSON.stringify({ to: intl, message }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WaSender error ${res.status}: ${text.slice(0, 120)}`);
  }
}

// ─── OTP input row ────────────────────────────────────────────────────────────
function OtpInputs({
  otp, setOtp,
}: {
  otp: string[];
  setOtp: (o: string[]) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (i: number) => refs.current[i]?.focus();

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const n = [...otp]; n[i] = ""; setOtp(n);
      } else if (i > 0) {
        const n = [...otp]; n[i - 1] = ""; setOtp(n); focus(i - 1);
      }
    }
  };

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const n = [...otp]; n[i] = digit; setOtp(n);
    if (digit && i < 5) focus(i + 1);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const n = [...otp];
    digits.forEach((d, i) => { n[i] = d; });
    setOtp(n);
    focus(Math.min(digits.length, 5));
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {otp.map((d, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          maxLength={1}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="w-11 h-12 rounded-xl border-2 text-center text-[20px] font-black focus:outline-none transition-all"
          style={{
            borderColor: d ? NAVY : "#E2E8F0",
            backgroundColor: d ? "#EFF6FF" : "white",
            color: NAVY,
          }}
        />
      ))}
    </div>
  );
}

// ─── LoginScreen ──────────────────────────────────────────────────────────────
export function LoginScreen({
  onLogin, lang, setLang,
}: { onLogin: () => void; lang: Lang; setLang: (l: Lang) => void }) {
  const [mode,         setMode]         = useState<"password" | "otp">("password");
  const [showPass,     setShowPass]     = useState(false);
  const [phone,        setPhone]        = useState("");
  const [otpSent,      setOtpSent]      = useState(false);
  const [otp,          setOtp]          = useState(["", "", "", "", "", ""]);
  const [sending,      setSending]      = useState(false);
  const [sendErr,      setSendErr]      = useState("");
  const [verifyErr,    setVerifyErr]    = useState("");
  const [otpTtl,       setOtpTtl]       = useState(0);       // seconds remaining
  const [generatedOtp, setGeneratedOtp] = useState("");

  // countdown timer
  useEffect(() => {
    if (otpTtl <= 0) return;
    const t = setTimeout(() => setOtpTtl(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTtl]);

  const handleSendOtp = async () => {
    const trimmed = phone.trim();
    if (!trimmed || trimmed.replace(/\D/g, "").length < 10) {
      setSendErr(T(lang, "সঠিক ফোন নম্বর দিন", "Enter a valid phone number"));
      return;
    }
    setSendErr("");
    setSending(true);
    try {
      const code = generateOtp();
      await sendWhatsAppOtp(trimmed, code);
      setGeneratedOtp(code);
      setOtpSent(true);
      setOtpTtl(300); // 5 minutes
    } catch (err) {
      setSendErr(
        T(lang,
          "WhatsApp মেসেজ পাঠাতে ব্যর্থ হয়েছে। পরে চেষ্টা করুন।",
          "Failed to send WhatsApp OTP. Please try again."
        )
      );
      console.error("[WaSender]", err);
    } finally {
      setSending(false);
    }
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered.length < 6) {
      setVerifyErr(T(lang, "৬ সংখ্যার OTP দিন", "Enter the 6-digit OTP"));
      return;
    }
    if (entered !== generatedOtp) {
      setVerifyErr(T(lang, "OTP সঠিক নয়। আবার চেষ্টা করুন।", "Incorrect OTP. Please try again."));
      setOtp(["", "", "", "", "", ""]);
      return;
    }
    setVerifyErr("");
    onLogin();
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setVerifyErr("");
    setOtpSent(false);
    setOtpTtl(0);
  };

  const ttlDisplay = otpTtl > 0
    ? `${Math.floor(otpTtl / 60)}:${String(otpTtl % 60).padStart(2, "0")}`
    : null;

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter,sans-serif" }}>
      {/* Left navy panel */}
      <div className="hidden lg:flex flex-col justify-center w-[400px] flex-shrink-0 px-12 py-16"
        style={{ background: `linear-gradient(160deg,${NAVYDARK},${NAVY})` }}>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Plane size={20} className="text-white" />
          </div>
          <div>
            <p className="font-black text-white text-[17px]">TravelAgency<span style={{ color: ORANGE }}>Web</span></p>
            <p className="text-white/40 text-[10px]">ERP V3</p>
          </div>
        </div>
        <h2 className="text-white font-black text-[30px] bn leading-tight mb-3">
          ট্র্যাভেল স্মার্টার,<br />গ্রো ফাস্টার।
        </h2>
        <p className="text-white/50 text-[14px] mb-10 italic">Travel Smarter, Grow Faster.</p>
        <div className="space-y-3.5">
          {[
            "২০+ মডিউল এক প্ল্যাটফর্মে",
            "বাংলাদেশের জন্য তৈরি",
            "bKash · Nagad · WhatsApp সংযুক্ত",
            "AI-চালিত অটোমেশন",
          ].map(f => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Check size={10} className="text-white" />
              </div>
              <p className="text-white/70 text-[13px] bn">{f}</p>
            </div>
          ))}
        </div>

        {/* WaSender badge */}
        <div className="mt-10 flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-2xl px-4 py-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
            <MessageCircle size={15} className="text-white" />
          </div>
          <div>
            <p className="text-white text-[11px] font-black">WhatsApp OTP সক্রিয়</p>
            <p className="text-white/40 text-[10px]">Powered by WaSender API</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-14 py-12 bg-white relative">
        <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="absolute top-5 right-5 h-8 px-3 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          {lang === "bn" ? "EN" : "বাংলা"}
        </button>

        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: NAVY }}>
            <Plane size={15} className="text-white" />
          </div>
          <p className="font-black text-[15px]" style={{ color: NAVY }}>
            TravelAgency<span style={{ color: ORANGE }}>Web</span>
          </p>
        </div>

        <div className="max-w-xs mx-auto w-full">
          <h1 className="font-black text-[26px] text-slate-900 bn mb-1">{T(lang, "স্বাগতম!", "Welcome!")}</h1>
          <p className="text-slate-400 text-[13px] bn mb-5">
            {T(lang, "আপনার অ্যাকাউন্টে প্রবেশ করুন", "Sign in to your ERP account")}
          </p>

          {/* Demo credentials hint */}
          <div className="mb-5 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-wide mb-2">
              🔑 {T(lang, "ডেমো লগইন তথ্য", "Demo Credentials")}
            </p>
            <div className="space-y-1.5">
              {[
                { label: T(lang,"ফোন / ইমেইল","Phone / Email"), value: "admin@travelagencyweb.com" },
                { label: T(lang,"পাসওয়ার্ড","Password"),        value: "demo1234"                  },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-amber-600 font-medium">{row.label}:</span>
                  <button
                    type="button"
                    className="text-[11px] font-black text-amber-800 bg-white border border-amber-200 rounded-lg px-2 py-0.5 hover:bg-amber-100 transition-colors tracking-wide"
                    onClick={() => {
                      try {
                        navigator.clipboard?.writeText(row.value);
                      } catch {
                        const el = document.createElement("textarea");
                        el.value = row.value;
                        el.style.position = "fixed";
                        el.style.opacity = "0";
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand("copy");
                        document.body.removeChild(el);
                      }
                    }}
                    title="Click to copy"
                    style={{ fontFamily: "Inter, monospace" }}
                  >
                    {row.value}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-amber-500 mt-2">
              {T(lang,"যেকোনো তথ্য দিয়ে লগইন করা যাবে (ডেমো মোড)","Any input works in demo mode — click values to copy")}
            </p>
          </div>

          {/* ── Password mode ── */}
          {mode === "password" && (
            <form onSubmit={e => { e.preventDefault(); onLogin(); }} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-500 bn mb-1">
                  {T(lang, "ফোন / ইমেইল", "Phone / Email")}
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="text"
                  placeholder="01700000000"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <label className="block text-[12px] font-bold text-slate-500 bn mb-1">
                  {T(lang, "পাসওয়ার্ড", "Password")}
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-11 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 bottom-3 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <button type="submit"
                className="w-full h-12 rounded-xl text-white font-black text-[15px] bn hover:opacity-90 active:scale-95 transition-all"
                style={{ background: `linear-gradient(135deg,${NAVYDARK},${NAVY})` }}>
                {T(lang, "লগইন করুন", "Sign In")} →
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[11px] text-slate-400">{T(lang, "অথবা", "or")}</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* WhatsApp OTP toggle */}
              <button type="button" onClick={() => { setMode("otp"); setSendErr(""); }}
                className="w-full h-12 rounded-xl border-2 font-bold text-[14px] bn hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                style={{ borderColor: "#25D366", color: "#128C7E" }}>
                <MessageCircle size={18} style={{ color: "#25D366" }} />
                {T(lang, "WhatsApp OTP দিয়ে লগইন", "Login with WhatsApp OTP")}
              </button>
            </form>
          )}

          {/* ── OTP mode — phone entry ── */}
          {mode === "otp" && !otpSent && (
            <div className="space-y-4">
              {/* WhatsApp badge */}
              <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                <MessageCircle size={18} style={{ color: "#25D366" }} />
                <div>
                  <p className="font-bold text-[12px] text-green-800 bn">
                    {T(lang, "WhatsApp OTP পাঠানো হবে", "OTP will be sent via WhatsApp")}
                  </p>
                  <p className="text-[10px] text-green-600">Powered by WaSender API</p>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-500 bn mb-1">
                  {T(lang, "WhatsApp নম্বর", "WhatsApp Number")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-bold text-slate-500">🇧🇩 +880</span>
                  <input
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setSendErr(""); }}
                    onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                    type="tel"
                    placeholder="1700000000"
                    className="w-full h-12 pl-[72px] pr-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 bn">
                  {T(lang, "আপনার সক্রিয় WhatsApp নম্বর দিন", "Enter your active WhatsApp number")}
                </p>
              </div>

              {sendErr && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-red-700 bn">{sendErr}</p>
                </div>
              )}

              <button type="button" onClick={handleSendOtp} disabled={sending}
                className="w-full h-12 rounded-xl text-white font-black text-[14px] bn hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                {sending
                  ? <><Loader2 size={17} className="animate-spin" /> {T(lang, "পাঠানো হচ্ছে…", "Sending…")}</>
                  : <><MessageCircle size={17} /> {T(lang, "WhatsApp OTP পাঠান", "Send WhatsApp OTP")}</>
                }
              </button>

              <button type="button" onClick={() => setMode("password")}
                className="w-full text-center text-[12px] font-bold bn hover:underline"
                style={{ color: NAVY }}>
                ← {T(lang, "পাসওয়ার্ড দিয়ে ফিরুন", "Back to Password Login")}
              </button>
            </div>
          )}

          {/* ── OTP mode — code entry ── */}
          {mode === "otp" && otpSent && (
            <div className="space-y-5">
              {/* Success notice */}
              <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                  <MessageCircle size={13} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-[12px] text-green-800 bn">
                    {T(lang, "WhatsApp-এ OTP পাঠানো হয়েছে", "OTP sent to WhatsApp")}
                  </p>
                  <p className="text-[11px] text-green-600 font-medium">
                    +880 {phone.replace(/^880|^0/, "")}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-500 bn mb-3 text-center">
                  {T(lang, "৬-সংখ্যার OTP কোড লিখুন", "Enter 6-digit OTP code")}
                </label>
                <OtpInputs otp={otp} setOtp={setOtp} />

                {/* Countdown */}
                {ttlDisplay && (
                  <p className="text-center text-[11px] text-slate-400 mt-2 bn">
                    {T(lang, "মেয়াদ শেষ:", "Expires in:")} <span className="font-black text-slate-600" style={{ fontFamily: "Inter" }}>{ttlDisplay}</span>
                  </p>
                )}
                {otpTtl === 0 && (
                  <p className="text-center text-[11px] text-red-500 mt-2 font-bold bn">
                    {T(lang, "OTP মেয়াদ শেষ হয়ে গেছে", "OTP has expired")}
                  </p>
                )}
              </div>

              {verifyErr && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-red-700 bn">{verifyErr}</p>
                </div>
              )}

              <button type="button" onClick={handleVerify}
                className="w-full h-12 rounded-xl text-white font-black text-[15px] bn hover:opacity-90 active:scale-95 transition-all"
                style={{ background: `linear-gradient(135deg,${NAVYDARK},${NAVY})` }}>
                {T(lang, "যাচাই করুন ✓", "Verify OTP ✓")}
              </button>

              {/* Resend */}
              <button type="button" onClick={handleResend}
                className="w-full flex items-center justify-center gap-1.5 text-[12px] font-bold bn hover:underline"
                style={{ color: "#128C7E" }}>
                <RefreshCw size={13} />
                {T(lang, "নতুন OTP পাঠান", "Resend OTP")}
              </button>

              <button type="button" onClick={() => { setMode("password"); setOtpSent(false); setOtp(["","","","","",""]); }}
                className="w-full text-center text-[12px] font-bold bn hover:underline text-slate-400">
                ← {T(lang, "পাসওয়ার্ড দিয়ে ফিরুন", "Back to Password Login")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── OnboardingScreen ─────────────────────────────────────────────────────────
export function OnboardingScreen({ onDone, lang }: { onDone: () => void; lang: Lang }) {
  const [step,   setStep]   = useState(0);
  const [bizSel, setBizSel] = useState<Set<string>>(new Set(["air", "visa"]));
  const [plan,   setPlan]   = useState("growth");

  const STEPS = [
    T(lang, "কোম্পানি তথ্য",  "Company Profile"),
    T(lang, "ব্যবসার ধরন",   "Business Types"),
    T(lang, "শাখা ও স্টাফ",  "Branch & Staff"),
    T(lang, "প্ল্যান ও পেমেন্ট","Plan & Payment"),
  ];

  const BIZ = [
    { id:"air",      icon:<Plane size={26}/>,        bn:"এয়ার টিকেট",   c:"#1D4ED8" },
    { id:"visa",     icon:<Globe size={26}/>,         bn:"ভিসা",          c:"#7C3AED" },
    { id:"tour",     icon:<Globe size={26}/>,         bn:"ট্যুর",         c:"#0E7490" },
    { id:"hajj",     icon:<Star size={26}/>,          bn:"হজ্জ ও উমরাহ", c:"#0D9488" },
    { id:"student",  icon:<GraduationCap size={26}/>, bn:"স্টুডেন্ট",    c:"#475569" },
    { id:"manpower", icon:<Briefcase size={26}/>,     bn:"ম্যানপাওয়ার",  c:"#0891B2" },
    { id:"corp",     icon:<Building size={26}/>,      bn:"কর্পোরেট",     c:"#15803D" },
    { id:"hotel",    icon:<Building2 size={26}/>,     bn:"হোটেল",        c:"#92603B" },
  ];

  const PLANS = [
    { id:"starter",    bn:"Basic",      price:"৳৫০০/মাস",    users:"৩ জন",       c:"#475569" },
    { id:"growth",     bn:"Pro",        price:"৳৮০০/মাস",    users:"১০ জন",      c:NAVY      },
    { id:"enterprise", bn:"Business",   price:"৳১,৫০০/মাস",  users:"৩০ জন",      c:"#0E7490" },
  ];

  const toggleBiz = (id: string) => {
    const s = new Set(bizSel);
    if (s.has(id)) s.delete(id); else s.add(id);
    setBizSel(s);
  };

  const STEP_CONTENT = [
    /* Step 0 – Company Profile */
    <div key="0" className="space-y-3">
      {[
        { l:T(lang,"এজেন্সির নাম","Agency Name"),      p:"Star Travel BD"        },
        { l:T(lang,"ট্রেড লাইসেন্স","Trade License"),  p:"TRAD-123456"           },
        { l:T(lang,"ফোন নম্বর","Phone"),                p:"01700000000"           },
        { l:T(lang,"ইমেইল","Email"),                    p:"info@agency.com"       },
        { l:T(lang,"ঠিকানা","Address"),                 p:T(lang,"ঢাকা","Dhaka") },
      ].map(f => (
        <div key={f.l}>
          <label className="block text-[12px] font-bold text-slate-500 bn mb-1">{f.l}</label>
          <input type="text" placeholder={f.p}
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      ))}
    </div>,

    /* Step 1 – Business Types */
    <div key="1" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BIZ.map(b => {
        const sel = bizSel.has(b.id);
        return (
          <button key={b.id} type="button" onClick={() => toggleBiz(b.id)}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all"
            style={{ borderColor:sel?b.c:"#E2E8F0", backgroundColor:sel?b.c+"15":"white" }}>
            <div style={{ color:b.c }}>{b.icon}</div>
            <p className="text-[11px] font-bold text-slate-700 bn text-center">{b.bn}</p>
            {sel && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor:b.c }}>
                <Check size={10} className="text-white"/>
              </div>
            )}
          </button>
        );
      })}
    </div>,

    /* Step 2 – Branch & Staff */
    <div key="2" className="space-y-5">
      <div>
        <p className="font-bold text-[13px] text-slate-600 bn mb-3">{T(lang,"প্রথম শাখা","First Branch")}</p>
        <div className="space-y-2.5">
          {[
            { l:T(lang,"শাখার নাম","Branch Name"), p:T(lang,"প্রধান অফিস","Main Office") },
            { l:T(lang,"ঠিকানা","Address"),         p:T(lang,"ঢাকা","Dhaka")             },
          ].map(f => (
            <div key={f.l}>
              <label className="block text-[12px] font-bold text-slate-400 mb-0.5">{f.l}</label>
              <input type="text" placeholder={f.p}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-[13px] text-slate-600 bn mb-3">{T(lang,"প্রথম স্টাফ","First Staff")}</p>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { l:T(lang,"নাম","Name"),   p:"Rahman Ali"                       },
            { l:T(lang,"ভূমিকা","Role"),p:T(lang,"ম্যানেজার","Manager")      },
            { l:T(lang,"ফোন","Phone"),  p:"01800000000"                       },
            { l:"Email",                p:"staff@agency.com"                  },
          ].map(f => (
            <div key={f.l}>
              <label className="block text-[11px] font-bold text-slate-400 mb-0.5">{f.l}</label>
              <input type="text" placeholder={f.p}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          ))}
        </div>
      </div>
    </div>,

    /* Step 3 – Plan & Payment */
    <div key="3" className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLANS.map(p => (
          <button key={p.id} type="button" onClick={() => setPlan(p.id)}
            className="text-left p-4 rounded-2xl border-2 transition-all"
            style={{ borderColor:plan===p.id?p.c:"#E2E8F0", backgroundColor:plan===p.id?p.c+"08":"white" }}>
            <p className="font-black text-[14px] bn" style={{ color:p.c }}>{p.bn}</p>
            <p className="font-black text-[18px] mt-1" style={{ fontFamily:"Inter" }}>{p.price}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 bn">{T(lang,"সর্বোচ্চ","Max")} {p.users}</p>
          </button>
        ))}
      </div>
      <p className="font-bold text-[12px] text-slate-500 bn">{T(lang,"পেমেন্ট পদ্ধতি","Payment Method")}</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { l:"bKash",    c:"#E91E8C", bg:"#FEF0F7" },
          { l:"Nagad",    c:"#F57C00", bg:"#FFF3E0" },
          { l:"Card/Bank",c:NAVY,      bg:"#EFF6FF" },
        ].map(pm => (
          <button key={pm.l} type="button"
            className="h-11 rounded-xl font-black text-[13px] border-2 hover:opacity-80 transition-all"
            style={{ backgroundColor:pm.bg, color:pm.c, borderColor:pm.c+"44" }}>
            {pm.l}
          </button>
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor:"#F5F7FA", fontFamily:"Inter,sans-serif" }}>
      {/* Top bar */}
      <div className="h-14 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor:NAVY }}>
            <Plane size={14} className="text-white"/>
          </div>
          <p className="font-black text-[14px]" style={{ color:NAVY }}>
            TravelAgency<span style={{ color:ORANGE }}>Web</span>
          </p>
        </div>
        <p className="text-[11px] text-slate-400 bn">{T(lang,"নতুন এজেন্সি সেটআপ","New Agency Setup")}</p>
      </div>

      {/* Step progress */}
      <div className="bg-white border-b border-slate-100 px-5 py-3.5">
        <div className="max-w-xl mx-auto flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 flex-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px] flex-shrink-0 transition-all"
                style={{ backgroundColor:i<=step?NAVY:"#E2E8F0", color:i<=step?"white":"#94A3B8" }}>
                {i < step ? <Check size={11}/> : i + 1}
              </div>
              <span className="text-[10px] font-bold bn hidden sm:block" style={{ color:i===step?NAVY:"#94A3B8" }}>{s}</span>
              {i < STEPS.length - 1 && (
                <div className="h-0.5 flex-1 rounded" style={{ backgroundColor:i<step?NAVY:"#E2E8F0" }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 py-6 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 w-full max-w-xl">
          <h2 className="font-black text-[21px] text-slate-900 bn mb-0.5">{STEPS[step]}</h2>
          <p className="text-slate-400 text-[13px] bn mb-5">
            {T(lang, `ধাপ ${step+1} / ${STEPS.length}`, `Step ${step+1} of ${STEPS.length}`)}
          </p>
          {STEP_CONTENT[step]}
          <div className="flex justify-between mt-7">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)}
                className="h-10 px-6 rounded-xl border border-slate-200 font-bold text-[13px] text-slate-600 hover:bg-slate-50 bn">
                ← {T(lang,"আগে","Back")}
              </button>
            ) : <div/>}
            <button type="button"
              onClick={step === STEPS.length - 1 ? onDone : () => setStep(step + 1)}
              className="h-10 px-7 rounded-xl text-white font-black text-[14px] bn hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              style={{ background:`linear-gradient(135deg,${NAVYDARK},${NAVY})` }}>
              {step === STEPS.length - 1
                ? T(lang,"শুরু করুন 🎉","Launch ERP 🎉")
                : <>{T(lang,"পরবর্তী","Next")} <ArrowRight size={15}/></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
