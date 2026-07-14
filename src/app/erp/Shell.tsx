import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Plane, Globe, Map, Hotel, Car,
  Star, GraduationCap, Briefcase, Handshake, Building2, CreditCard,
  UserCog, Monitor, Bot, ScanLine, Zap, Wifi, Crown,
  ChevronDown, ChevronRight, X, Search, Bell, Menu, Plus,
  MessageCircle, ChevronLeft,
} from "lucide-react";
import {
  T, type Lang, type Screen, type ScreenProps,
  MODULE_COLOR, NAV, screenSection,
} from "./types";
import {
  DashboardScreen, CRMScreen, SalesScreen, AirScreen, VisaScreen, TourScreen,
  HotelScreen, TransportScreen, HajjScreen, StudentScreen, ManpowerScreen,
  AgentsScreen, CorporateScreen, FinanceScreen, HRScreen, PortalsScreen,
  AIScreen, OCRScreen, AutomationScreen, IntegrationsScreen, SuperAdminScreen,
} from "./screens";

// ─── Icon map ─────────────────────────────────────────────────────────────────
const SCREEN_ICON: Record<Screen, ReactNode> = {
  dashboard:    <LayoutDashboard size={17}/>,
  crm:          <Users size={17}/>,
  sales:        <ShoppingCart size={17}/>,
  air:          <Plane size={17}/>,
  visa:         <Globe size={17}/>,
  tour:         <Map size={17}/>,
  hotel:        <Hotel size={17}/>,
  transport:    <Car size={17}/>,
  hajj:         <Star size={17}/>,
  student:      <GraduationCap size={17}/>,
  manpower:     <Briefcase size={17}/>,
  agents:       <Handshake size={17}/>,
  corporate:    <Building2 size={17}/>,
  finance:      <CreditCard size={17}/>,
  hr:           <UserCog size={17}/>,
  portals:      <Monitor size={17}/>,
  ai:           <Bot size={17}/>,
  ocr:          <ScanLine size={17}/>,
  automation:   <Zap size={17}/>,
  integrations: <Wifi size={17}/>,
  superadmin:   <Crown size={17}/>,
};

// ─── Screen component map ─────────────────────────────────────────────────────
function renderScreen(screen: Screen, props: ScreenProps) {
  switch (screen) {
    case "dashboard":    return <DashboardScreen {...props}/>;
    case "crm":          return <CRMScreen {...props}/>;
    case "sales":        return <SalesScreen {...props}/>;
    case "air":          return <AirScreen {...props}/>;
    case "visa":         return <VisaScreen {...props}/>;
    case "tour":         return <TourScreen {...props}/>;
    case "hotel":        return <HotelScreen {...props}/>;
    case "transport":    return <TransportScreen {...props}/>;
    case "hajj":         return <HajjScreen {...props}/>;
    case "student":      return <StudentScreen {...props}/>;
    case "manpower":     return <ManpowerScreen {...props}/>;
    case "agents":       return <AgentsScreen {...props}/>;
    case "corporate":    return <CorporateScreen {...props}/>;
    case "finance":      return <FinanceScreen {...props}/>;
    case "hr":           return <HRScreen {...props}/>;
    case "portals":      return <PortalsScreen {...props}/>;
    case "ai":           return <AIScreen {...props}/>;
    case "ocr":          return <OCRScreen {...props}/>;
    case "automation":   return <AutomationScreen {...props}/>;
    case "integrations": return <IntegrationsScreen {...props}/>;
    case "superadmin":   return <SuperAdminScreen {...props}/>;
  }
}

// ─── Right Drawer ─────────────────────────────────────────────────────────────
function RightDrawer({ open, title, content, onClose }: {
  open: boolean; title: string; content: ReactNode; onClose: () => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose}/>}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300"
        style={{transform: open ? "translateX(0)" : "translateX(100%)"}}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="font-black text-[15px] text-slate-900 bn">{title}</p>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X size={14}/>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">{content}</div>
      </div>
    </>
  );
}

// ─── New‑item Modal ───────────────────────────────────────────────────────────
function NewModal({ open, title, steps, stepIdx, onStep, onClose }: {
  open: boolean; title: string; steps: ReactNode[];
  stepIdx: number; onStep: (n: number) => void; onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="font-black text-[15px] text-slate-900 bn">{title}</p>
            {steps.length > 1 && (
              <p className="text-[11px] text-slate-400 mt-0.5" style={{fontFamily:"Inter"}}>
                Step {stepIdx + 1} of {steps.length}
              </p>
            )}
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X size={14}/>
          </button>
        </div>
        {/* Step dots */}
        {steps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-3 px-5">
            {steps.map((_,i) => (
              <div key={i} className="h-1.5 rounded-full transition-all"
                style={{width: i === stepIdx ? 24 : 8, backgroundColor: i <= stepIdx ? "#12356B" : "#E2E8F0"}}/>
            ))}
          </div>
        )}
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{steps[stepIdx]}</div>
        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
          {stepIdx > 0 && (
            <button type="button" onClick={() => onStep(stepIdx - 1)}
              className="h-11 px-5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <ChevronLeft size={14}/> পূর্ববর্তী
            </button>
          )}
          {stepIdx < steps.length - 1
            ? <button type="button" onClick={() => onStep(stepIdx + 1)}
                className="flex-1 h-11 rounded-xl bg-[#12356B] text-white font-bold text-[13px] bn hover:opacity-90 transition-all flex items-center justify-center gap-1.5">
                পরবর্তী <ChevronRight size={14}/>
              </button>
            : <button type="button" onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-[#F26B21] text-white font-bold text-[13px] bn hover:opacity-90 transition-all">
                ✓ সংরক্ষণ করুন
              </button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ current, expanded, collapsed, lang, onNavigate, onExpand, onCollapse }: {
  current: Screen; expanded: Set<string>; collapsed: boolean; lang: Lang;
  onNavigate: (s: Screen) => void; onExpand: (id: string) => void; onCollapse: () => void;
}) {
  const activeSection = screenSection(current);

  return (
    <div className="h-full flex flex-col bg-[#0E1D35] text-white overflow-hidden">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#F26B21] flex items-center justify-center font-black text-white text-[15px] flex-shrink-0">T</div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-black text-[14px] leading-tight">TravelAgencyWeb</p>
            <p className="text-[10px] text-white/50">ERP v3.0</p>
          </div>
        )}
        <button type="button" onClick={onCollapse} className="ml-auto flex-shrink-0 w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
          <ChevronLeft size={14} className={`transition-transform ${collapsed ? "rotate-180" : ""}`}/>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        {NAV.map(section => {
          const isExpanded = expanded.has(section.id);
          const isActive = activeSection === section.id;
          const isSectionActive = section.screen === current || section.children?.some(c => c.screen === current);

          if (section.children) {
            return (
              <div key={section.id}>
                <button type="button"
                  onClick={() => onExpand(section.id)}
                  title={collapsed ? T(lang, section.labelBn, section.labelEn) : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isSectionActive ? "bg-white/15" : "hover:bg-white/8"
                  }`}>
                  <span className="text-[15px] flex-shrink-0">{section.emoji}</span>
                  {!collapsed && <>
                    <span className="flex-1 text-[12px] font-bold bn truncate">{T(lang, section.labelBn, section.labelEn)}</span>
                    <ChevronDown size={13} className={`flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""} text-white/50`}/>
                  </>}
                </button>
                {!collapsed && isExpanded && (
                  <div className="ml-7 border-l border-white/10 pl-3 pb-1">
                    {section.children.map(child => (
                      <button key={child.screen} type="button"
                        onClick={() => onNavigate(child.screen)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left mb-0.5 transition-all ${
                          current === child.screen
                            ? "bg-[#F26B21] text-white"
                            : "text-white/65 hover:text-white hover:bg-white/10"
                        }`}>
                        <span className="flex-shrink-0" style={{color: current === child.screen ? "white" : MODULE_COLOR[child.screen]}}>
                          {SCREEN_ICON[child.screen]}
                        </span>
                        <span className="text-[11px] font-bold bn truncate">{T(lang, child.labelBn, child.labelEn)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button key={section.id} type="button"
              onClick={() => section.screen && onNavigate(section.screen)}
              title={collapsed ? T(lang, section.labelBn, section.labelEn) : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all mb-0.5 ${
                isSectionActive ? "bg-[#F26B21] text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}>
              <span className="text-[15px] flex-shrink-0">{section.emoji}</span>
              {!collapsed && <span className="flex-1 text-[12px] font-bold bn truncate">{T(lang, section.labelBn, section.labelEn)}</span>}
            </button>
          );
        })}
      </nav>

      {/* User area */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F26B21] flex items-center justify-center font-black text-[12px]">ম</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[12px] bn truncate">মালিক ভাই</p>
              <p className="text-[10px] text-white/50">Super Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile bottom nav ────────────────────────────────────────────────────────
function BottomNav({ current, lang, onNavigate, onNew }: {
  current: Screen; lang: Lang; onNavigate: (s: Screen) => void; onNew: () => void;
}) {
  const items: { icon: ReactNode; label: string; screen?: Screen; key: string }[] = [
    { icon:<LayoutDashboard size={20}/>, label:T(lang,"হোম","Home"),     screen:"dashboard", key:"home"     },
    { icon:<ShoppingCart size={20}/>,   label:T(lang,"বুকিং","Bookings"),screen:"sales",     key:"bookings" },
    { icon:<Plus size={22}/>,           label:T(lang,"নতুন","New"),                          key:"new"      },
    { icon:<Users size={20}/>,          label:"CRM",                      screen:"crm",       key:"crm"      },
    { icon:<Menu size={20}/>,           label:T(lang,"আরো","More"),                          key:"more"     },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 sm:hidden">
      <div className="flex items-center">
        {items.map(item => {
          const isNew = item.key === "new";
          const isActive = item.screen === current;
          return (
            <button key={item.key} type="button"
              onClick={() => {
                if (item.screen) onNavigate(item.screen);
                else if (isNew) onNew();
              }}
              className={`flex-1 flex flex-col items-center gap-1 py-2 relative transition-colors ${
                isNew ? "text-white" : isActive ? "text-[#F26B21]" : "text-slate-400"
              }`}>
              {isNew ? (
                <div className="w-12 h-12 rounded-2xl bg-[#F26B21] flex items-center justify-center shadow-lg -mt-6 mb-0.5 border-4 border-white">
                  <Plus size={22} className="text-white"/>
                </div>
              ) : (
                <span>{item.icon}</span>
              )}
              <span className={`text-[9px] font-bold bn ${isNew ? "text-[#F26B21] mt-0" : ""}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white"/>
    </div>
  );
}

// ─── Main ERP Shell ───────────────────────────────────────────────────────────
export function ERPShell({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [current, setCurrent] = useState<Screen>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["crmsales", "services"]));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerContent, setDrawerContent] = useState<ReactNode>(null);

  const [newOpen, setNewOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSteps, setNewSteps] = useState<ReactNode[]>([]);
  const [newStepIdx, setNewStepIdx] = useState(0);

  const navigate = (s: Screen) => {
    setCurrent(s);
    setMobileSidebarOpen(false);
  };

  const openDrawer = (title: string, content: ReactNode) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setDrawerOpen(true);
  };

  const openNew = (title: string, steps: ReactNode[]) => {
    setNewTitle(title);
    setNewSteps(steps);
    setNewStepIdx(0);
    setNewOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Auto-expand section of current screen
  const expandForSection = (s: Screen) => {
    const secId = screenSection(s);
    setExpanded(prev => {
      const next = new Set(prev);
      next.add(secId);
      return next;
    });
  };

  const handleNavigate = (s: Screen) => {
    navigate(s);
    expandForSection(s);
  };

  const screenProps: ScreenProps = { navigate: handleNavigate, lang, openDrawer, openNew };
  const C = MODULE_COLOR[current];

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F7FA]">
      {/* Desktop sidebar */}
      <aside className={`hidden sm:flex flex-col flex-shrink-0 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <Sidebar current={current} expanded={expanded} collapsed={collapsed} lang={lang}
          onNavigate={handleNavigate} onExpand={toggleExpand} onCollapse={() => setCollapsed(v => !v)}/>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileSidebarOpen(false)}/>
          <div className="absolute left-0 top-0 bottom-0 w-72 z-50">
            <Sidebar current={current} expanded={expanded} collapsed={false} lang={lang}
              onNavigate={handleNavigate} onExpand={toggleExpand} onCollapse={() => setMobileSidebarOpen(false)}/>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center gap-3 px-4 flex-shrink-0 shadow-sm">
          <button type="button" className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors"
            onClick={() => setMobileSidebarOpen(true)}>
            <Menu size={18} className="text-slate-600"/>
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{color:C}}>{SCREEN_ICON[current]}</div>
            <span className="text-[13px] font-bold text-slate-700 bn">{current}</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 h-9">
            <Search size={14} className="text-slate-400 flex-shrink-0"/>
            <input type="text" placeholder={T(lang,"খুঁজুন...","Search...")} className="bg-transparent flex-1 text-[12px] outline-none bn text-slate-700"/>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Lang toggle */}
            <button type="button" onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="h-8 px-3 rounded-xl bg-slate-100 text-[11px] font-bold text-slate-600 hover:bg-slate-200 transition-colors">
              {lang === "bn" ? "EN" : "বাং"}
            </button>

            {/* WhatsApp */}
            <button type="button" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-green-50 transition-colors"
              style={{color:"#25D366"}}>
              <MessageCircle size={18}/>
            </button>

            {/* Notifications */}
            <button type="button" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors relative text-slate-500">
              <Bell size={18}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"/>
            </button>

            {/* Avatar */}
            <button type="button" className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-[13px]"
              style={{backgroundColor:C}}>ম</button>
          </div>
        </header>

        {/* Screen */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {renderScreen(current, screenProps)}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav current={current} lang={lang} onNavigate={handleNavigate}
        onNew={() => openNew(T(lang,"নতুন বুকিং","New Booking"), [
          <div key="0" className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {([["✈️","এয়ার","air"],["🌐","ভিসা","visa"],["🗺️","ট্যুর","tour"],["🏨","হোটেল","hotel"],["⭐","হজ্জ","hajj"],["🎓","স্টুডেন্ট","student"]] as [string,string,Screen][]).map(([e,l,s])=>(
                <button key={s} type="button" onClick={() => { setNewOpen(false); handleNavigate(s); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 border-slate-200 hover:border-[#F26B21] transition-all">
                  <span className="text-[22px]">{e}</span><span className="text-[10px] font-bold bn text-slate-600">{l}</span>
                </button>
              ))}
            </div>
          </div>
        ])}
      />

      {/* Right detail drawer */}
      <RightDrawer open={drawerOpen} title={drawerTitle} content={drawerContent} onClose={() => setDrawerOpen(false)}/>

      {/* New item modal */}
      <NewModal open={newOpen} title={newTitle} steps={newSteps} stepIdx={newStepIdx}
        onStep={setNewStepIdx} onClose={() => setNewOpen(false)}/>
    </div>
  );
}
