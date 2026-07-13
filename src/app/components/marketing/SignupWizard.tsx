import { useState } from "react";
import {
  Plane, Check, ChevronLeft, ArrowRight, Building2, User, Mail, Phone,
  Lock, MapPin, CreditCard, CheckCircle, Sparkles, Globe, Rocket,
} from "lucide-react";

type Language = "en" | "bn";

const PLAN_OPTIONS = [
  { id: "starter", name: "Starter", nameBn: "স্টার্টার", price: 500, desc: "Up to 3 users · 5 core modules" },
  { id: "business", name: "Business", nameBn: "বিজনেস", price: 800, desc: "Up to 10 users · All 25 modules", popular: true },
  { id: "pro", name: "Pro", nameBn: "প্রো", price: 1500, desc: "Up to 25 users · White-label" },
  { id: "enterprise", name: "Enterprise", nameBn: "এন্টারপ্রাইজ", price: 3000, desc: "Unlimited users · Dedicated support" },
];

export function SignupWizard({ lang, setLang, onComplete, onBackToSite }: {
  lang: Language; setLang: (l: Language) => void;
  onComplete: () => void; onBackToSite: () => void;
}) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("business");
  const totalSteps = 4;

  const steps = [
    { n: 1, en: "Account", bn: "অ্যাকাউন্ট" },
    { n: 2, en: "Agency", bn: "এজেন্সি" },
    { n: 3, en: "Plan", bn: "প্ল্যান" },
    { n: 4, en: "Done", bn: "সম্পন্ন" },
  ];

  return (
    <div className="min-h-screen flex font-['Noto_Sans',_'Noto_Sans_Bengali',_sans-serif]">
      <div className="hidden lg:flex lg:w-2/5 flex-col bg-[#1E293B] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(124,58,237,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.2) 0%, transparent 50%)" }} />
        <div className="relative z-10 flex flex-col h-full p-10">
          <button onClick={onBackToSite} className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#7C3AED] rounded-xl flex items-center justify-center">
              <Plane size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">TravelAgencyWeb</span>
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-3">
              {lang === "en" ? "Start your 7-day free trial" : "৭ দিনের ফ্রি ট্রায়াল শুরু করুন"}
            </h2>
            <p className="text-white/50 mb-12">
              {lang === "en" ? "No credit card required." : "কোনো ক্রেডিট কার্ড লাগবে না।"}
            </p>
            <div className="space-y-5">
              {steps.map(s => {
                const done = s.n < step;
                const active = s.n === step;
                return (
                  <div key={s.n} className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 ${done ? "bg-[#10B981] border-[#10B981]" : active ? "bg-[#7C3AED] border-[#7C3AED]" : "border-white/20 bg-transparent"}`}>
                      {done ? <Check size={16} className="text-white" /> : <span className={`text-sm font-bold ${active ? "text-white" : "text-white/30"}`}>{s.n}</span>}
                    </div>
                    <span className={`font-medium ${done || active ? "text-white" : "text-white/30"}`}>{lang === "en" ? s.en : s.bn}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            {[
              lang === "en" ? "All 25 modules included" : "সব ২৫টি মডিউল অন্তর্ভুক্ত",
              lang === "en" ? "Bangla & English support" : "বাংলা ও ইংরেজি সাপোর্ট",
              lang === "en" ? "Cancel anytime" : "যেকোনো সময় বাতিল করুন",
            ].map(t => (
              <div key={t} className="flex items-center gap-2.5 text-white/60 text-sm">
                <CheckCircle size={16} className="text-[#A78BFA]" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 lg:hidden">
            <Plane size={20} className="text-[#7C3AED]" />
            <span className="font-bold text-[#1E293B]">TravelAgencyWeb</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-[#94A3B8] hidden sm:block">{lang === "en" ? "Step" : "ধাপ"} {step}/{totalSteps}</span>
            <button onClick={() => setLang(lang === "en" ? "bn" : "en")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-gray-50">🌐 {lang === "en" ? "বাংলা" : "EN"}</button>
          </div>
        </div>
        <div className="lg:hidden h-1 bg-[#F1F5F9]"><div className="h-full bg-[#7C3AED] transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} /></div>
        <div className="flex-1 flex items-center justify-center px-6 sm:px-8 py-10 overflow-y-auto">
          <div className="w-full max-w-md">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-1">{lang === "en" ? "Create your account" : "আপনার অ্যাকাউন্ট তৈরি করুন"}</h2>
                <p className="text-[#64748B] text-sm mb-7">{lang === "en" ? "Let's start with your details" : "আপনার তথ্য দিয়ে শুরু করি"}</p>
                <div className="space-y-4">
                  <Field icon={User} label={lang === "en" ? "Your Full Name" : "আপনার পূর্ণ নাম"} placeholder="Arif Hossain" />
                  <Field icon={Mail} label={lang === "en" ? "Work Email" : "কাজের ইমেইল"} placeholder="you@agency.com" />
                  <Field icon={Phone} label={lang === "en" ? "Phone Number" : "ফোন নম্বর"} placeholder="+880 1XXX-XXXXXX" />
                  <Field icon={Lock} label={lang === "en" ? "Password" : "পাসওয়ার্ড"} placeholder="••••••••" type="password" />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-1">{lang === "en" ? "Tell us about your agency" : "আপনার এজেন্সি সম্পর্কে বলুন"}</h2>
                <p className="text-[#64748B] text-sm mb-7">{lang === "en" ? "This sets up your workspace" : "এটি আপনার ওয়ার্কস্পেস সেটআপ করে"}</p>
                <div className="space-y-4">
                  <Field icon={Building2} label={lang === "en" ? "Agency Name" : "এজেন্সির নাম"} placeholder="Dhaka Tours & Travels" />
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">{lang === "en" ? "Workspace URL" : "ওয়ার্কস্পেস URL"}</label>
                    <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
                      <input className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none" placeholder="dhakatours" defaultValue="dhakatours" />
                      <span className="px-3 text-sm text-[#94A3B8] border-l border-[#E2E8F0]">.travelagencyweb.com</span>
                    </div>
                  </div>
                  <Field icon={MapPin} label={lang === "en" ? "City" : "শহর"} placeholder="Dhaka" />
                  <div>
                    <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">{lang === "en" ? "Agency Size" : "এজেন্সির আকার"}</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-sm focus:outline-none">
                      <option>1–5 employees</option><option>6–15 employees</option><option>16–50 employees</option><option>50+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-1">{lang === "en" ? "Choose your plan" : "আপনার প্ল্যান বেছে নিন"}</h2>
                <p className="text-[#64748B] text-sm mb-6">{lang === "en" ? "7 days free, then pick what fits" : "৭ দিন ফ্রি, তারপর উপযুক্তটি বেছে নিন"}</p>
                <div className="space-y-3">
                  {PLAN_OPTIONS.map(p => (
                    <button key={p.id} onClick={() => setPlan(p.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${plan === p.id ? "border-[#7C3AED] bg-purple-50" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${plan === p.id ? "border-[#7C3AED] bg-[#7C3AED]" : "border-[#CBD5E1]"}`}>
                        {plan === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1E293B]">{lang === "en" ? p.name : p.nameBn}</span>
                          {p.popular && <span className="text-xs px-2 py-0.5 rounded-full bg-[#7C3AED] text-white font-semibold">{lang === "en" ? "Popular" : "জনপ্রিয়"}</span>}
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">{p.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1E293B]">৳ {p.price.toLocaleString("en-IN")}</div>
                        <div className="text-xs text-[#94A3B8]">/{lang === "en" ? "mo" : "মাস"}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                  <Sparkles size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-600 leading-relaxed">
                    {lang === "en" ? "Your card won't be charged during the 7-day trial. Choose annual billing later to get 40% off your first year." : "৭ দিনের ট্রায়ালে আপনার কার্ড চার্জ হবে না।"}
                  </p>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <Rocket size={38} className="text-[#10B981]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{lang === "en" ? "Your workspace is ready! 🎉" : "আপনার ওয়ার্কস্পেস প্রস্তুত! 🎉"}</h2>
                <p className="text-[#64748B] text-sm mb-8 max-w-sm mx-auto">
                  {lang === "en" ? "We've set up your workspace with all 25 modules. Let's go to your dashboard." : "আমরা সব ২৫টি মডিউল সহ আপনার ওয়ার্কস্পেস সেটআপ করেছি।"}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8 text-left">
                  {[
                    { icon: Building2, label: lang === "en" ? "Workspace created" : "ওয়ার্কস্পেস তৈরি" },
                    { icon: Globe, label: lang === "en" ? "25 modules enabled" : "২৫টি মডিউল সক্রিয়" },
                    { icon: User, label: lang === "en" ? "Admin account ready" : "অ্যাডমিন প্রস্তুত" },
                    { icon: CreditCard, label: lang === "en" ? "7-day trial started" : "ট্রায়াল শুরু" },
                  ].map(c => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                        <CheckCircle size={16} className="text-[#10B981] shrink-0" />
                        <span className="text-xs font-medium text-[#475569]">{c.label}</span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={onComplete} className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2">
                  {lang === "en" ? "Go to Dashboard" : "ড্যাশবোর্ডে যান"} <ArrowRight size={18} />
                </button>
              </div>
            )}
            {step < 4 && (
              <div className="flex items-center gap-3 mt-8">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="px-5 py-3 rounded-lg border border-[#E2E8F0] text-[#64748B] font-semibold text-sm hover:bg-[#F8FAFC] transition flex items-center gap-1.5">
                    <ChevronLeft size={16} /> {lang === "en" ? "Back" : "পিছনে"}
                  </button>
                )}
                <button onClick={() => setStep(step + 1)} className="flex-1 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2">
                  {step === 3 ? (lang === "en" ? "Create Workspace" : "ওয়ার্কস্পেস তৈরি করুন") : (lang === "en" ? "Continue" : "চালিয়ে যান")}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            {step === 1 && (
              <p className="text-center text-sm text-[#94A3B8] mt-6">
                {lang === "en" ? "Already have an account?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
                <button onClick={onBackToSite} className="text-[#7C3AED] font-semibold hover:underline">{lang === "en" ? "Log in" : "লগইন"}</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder, type = "text" }: {
  icon: React.ElementType; label: string; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1E293B] mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input type={type} placeholder={placeholder} className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] placeholder:text-[#CBD5E1]" />
      </div>
    </div>
  );
}
