# TravelAgencyWeb ERP V3 — Complete Figma AI Prompt Pack & UI/UX Plan

**Purpose:** Everything you need to hand to Figma Make (Figma's 2026 AI generator) to design an enterprise-grade, low-literacy-friendly, mobile-first SaaS ERP for the Bangladeshi travel industry.

**How to read this file:**
1. Part A = the full system map (paste as context so the AI understands the whole product).
2. Part B = my UI/UX plan and the design rules that make it usable for less-literate users.
3. Part C = the design-system "foundation prompt" (run this FIRST in Figma Make).
4. Part D = ready-to-paste screen prompts, module by module.
5. Part E = the workflow order and pro tips.

---

## IMPORTANT: How to use this with Figma Make (read first)

Figma Make gives best results with **specific, user-targeted prompts**, generated **one screen or one flow at a time**, on top of a **design system you establish first**. A single mega-prompt for a 200-feature ERP will produce generic, inconsistent output.

So the winning sequence is:
1. Run the **Foundation Prompt (Part C)** once → this creates your colors, typography, components, sidebar shell, and the main dashboard.
2. Then run each **Module Prompt (Part D)** → each reuses the established design system, so everything stays consistent.
3. Attach this whole `.md` file (and your organogram PNG) to the first prompt as context. Figma Make accepts attached text files, PDFs, and images to guide results.
4. Iterate: the first generation is ~60-70% right. Add a follow-up prompt like "make touch targets bigger and add Bangla labels above each English label" to push to 90%.

---

# PART A — THE COMPLETE SYSTEM MAP (paste as context)

> Product name: **TravelAgencyWeb ERP V3** — "Complete Business Operating System for Travel Agencies."
> Tagline: *Travel Smarter, Grow Faster.*
> This is a multi-tenant SaaS. There are three access levels: **Super Admin** (platform owner), **Organization/Tenant** (an agency), and **End Users** (staff, agents, customers).

### PLATFORM CORE (engines running under everything)
Multi-Tenant SaaS · User & Role Management · Security & Permissions · Workflow & Approval Engine · Notification Engine (Email, SMS, WhatsApp) · AI Engine · OCR Engine · Automation Engine · Report Engine · Document Management · API & Webhook Manager · Backup & Restore · Audit Trail & Logs · System Settings

### SUPER ADMIN
SaaS Dashboard · Tenant Management · Subscription & Billing · Feature & Module Toggle · Business Profile Management · White Label & Branding · Custom Domain & SSL · Payment Settings (bKash, Nagad, etc.) · Manual Payment Verification · Coupons & Discounts · Marketplace & Integrations · Support & Ticket System · System Monitoring & Logs · Backup & Server Management

### ORGANIZATION / TENANT
Company Profile · Branch Management · Department Management · User Management · Role & Permission · Employee Management · Activity Log · Audit Trail · Settings

### CORE OPERATIONAL MODULES
**Dashboard & Analytics:** Executive Dashboard · Sales Dashboard · Operation Dashboard · Finance Dashboard · Employee Dashboard · Custom Dashboard · KPI & Analytics · Reports Center

**CRM:** Leads · Customers · Corporate Clients · Suppliers · Partners · Follow-up · Tasks · Calendar · Notes · Timeline · Communication

**Sales & Booking:** Inquiry · Quotation · Booking · Invoice · Money Receipt · Payment · Refund · Credit Note · Sales Return · Booking Calendar · Sales Reports

**Air Ticketing:** Flight Search · Reservation (PNR) · Ticket Issue · Reissue · Void · Refund · EMD Management · Airline Commission · Supplier Settlement · GDS Integration · Air Ticket Reports

**Visa Processing:** Visa Countries · Visa Types · Document Checklist · Visa Application · Embassy · Visa Tracking · Visa Approval · Delivery · Visa Fees · Visa Reports

**Tour Management:** Domestic Tours · International Tours · FIT Tours · Group Tours · Custom Package Builder · Itinerary Builder · Cost Calculator · Profit Calculator · Tour Bookings · Tour Reports

**Hotel Management:** Hotel Search · Hotel Booking · Voucher · Cancellation · Hotel Suppliers · Room Management · Check-in / Check-out · Hotel Reports

**Transport Management:** Airport Pickup · Car Rental · Driver Management · Vehicle Management · Trip Management · Transport Booking · Fuel Management · Transport Reports

**Hajj & Umrah:** Hajj & Umrah Packages · Pilgrim Management · Flight Management · Hotel Management · Room Sharing · Ziyarah Management · Guide Management · Voucher Management · Hajj & Umrah Reports

**Student Consultancy:** Universities · Courses · Students · Applications · Offer Letter · CAS / COE / I20 · Visa Processing · Scholarship · Student Reports

**Manpower ERP:** Employers · Job Orders · Demand · Candidates · CV Management · Medical · Police Clearance · BMET · Visa Processing · Flight & Deployment · Manpower Reports

**B2B Agent Management:** Agent Registration · Agent Dashboard · Agent Wallet · Commission · Credit Limit · Ledger · Settlement · Agent Reports

**Corporate Travel:** Corporate Clients · Employees · Travel Policy · Approval Workflow · Corporate Booking · Corporate Invoice · Credit Management · Corporate Reports

### BUSINESS SUPPORT MODULES
**Finance ERP:** Chart of Accounts · General Ledger · Journal Voucher · Cash Book · Bank Book · Accounts Receivable · Accounts Payable · Income Management · Expense Management · Fixed Assets · Budget Management · Cost Center · Profit & Loss · Balance Sheet · Trial Balance · VAT & Tax · Financial Reports

**HR & Payroll:** Employees · Departments · Designations · Attendance · Leave Management · Payroll · Advance & Loan · Allowance & Deduction · Performance Appraisal · Recruitment · Employee Document · ID Card · HR Reports

**Website CMS:** Website Builder · Pages · Packages · Visa Pages · Blogs · Gallery · Testimonials · FAQ · Landing Pages · Forms & Enquiries · SEO Tools · Menu Management · Media Manager · Website Settings

**Customer Portal:** Customer Dashboard · My Bookings · My Payments · My Invoices · My Documents · Visa Status · Support Tickets · Profile Management · Notifications

**Agent Portal:** Agent Dashboard · Book Tours / Tickets · My Bookings · My Customers · My Commission · My Wallet · Reports · Support

**Mobile Apps:** Customer App · Agent App · Employee App · Driver App · Owner App (all iOS/Android)

### INTELLIGENCE & AUTOMATION
**AI Smart Center:** AI Chat Assistant · AI Proposal Generator · AI Itinerary Generator · AI Email Writer · AI WhatsApp Reply · AI Smart Search · AI Document Analysis · AI Revenue Forecast · AI Expense Analysis · AI Customer Recommendation · AI Report Summary

**Smart Document Center (OCR):** Passport OCR · NID OCR · Visa OCR · Ticket OCR · Invoice OCR · Student Document OCR · Manpower Document OCR · PDF Reader · AI Validation · Auto Data Entry

**Automation Center:** Auto Follow-up · Auto WhatsApp · Auto SMS · Auto Email · Auto Invoice · Auto Due Reminder · Auto Task · Auto Workflow · Scheduled Reports · Auto Backup · Cron Jobs

**Integrations:** GDS Systems · Payment Gateways · bKash / Nagad · Bank Integration · WhatsApp (WASenderAPI) · SMS Gateway · Email Services · Accounting Integration · Google Services · Calendar Integration · CRM Integration · Marketplace Apps

### OWNER INTELLIGENCE CENTER (owner's at-a-glance strip)
Daily WhatsApp Summary · Daily Email Summary · Weekly Report · Monthly Report · Business Health Score · Sales Trend · Profit Trend · Cash Flow · Outstanding Due · Due Collection Summary · Employee Performance · Top Customers · Service Wise Sales · AI Recommendations · Smart Alerts & Notifications

---

# PART B — MY UI/UX PLAN

### The core design challenge
You have ~200 features but users who are **not highly literate** and are **mobile-first**. The whole design must lower cognitive load: fewer words, more icons, more color, bigger targets, guided steps. Enterprise power *underneath*, simplicity *on the surface*.

### 12 design principles (these are the "rules" the AI must follow)
1. **Bilingual, Bangla-first.** Every label shows Bangla primary + smaller English secondary. A global বাংলা/EN toggle sits in the top bar. Use a Bangla-capable font (Hind Siliguri or Noto Sans Bengali) so text renders cleanly.
2. **Icon + label always together.** Never an icon alone, never text alone in navigation. Use plain, concrete icons (a plane for tickets, a passport for visa, a Kaaba for Hajj).
3. **Color-coded modules.** Keep the organogram's color logic — each module keeps its signature color across its icon, header, and accent. Users learn "green = CRM, purple = visa" by color, not reading.
4. **Big touch targets.** Minimum 48×48px tappable areas, 16px+ body text, 18px+ for Bangla. Generous spacing.
5. **Dashboards over tables.** Lead with cards, big numbers, charts, and traffic-light status chips (🟢 done, 🟡 pending, 🔴 overdue) instead of dense spreadsheets. A table is a secondary "details" view.
6. **Wizard flows, not giant forms.** Break every create/edit task (new booking, visa application, payroll run) into numbered steps with a progress bar. One decision per screen where possible.
7. **Local money & numbers.** Currency in ৳ (BDT), lakh/crore grouping, dates in DD-MM-YYYY. Show amounts big and bold.
8. **WhatsApp-native.** WhatsApp is the primary channel in Bangladesh. Put a WhatsApp action button on customers, invoices, dues, and bookings. Surface "Send on WhatsApp" everywhere.
9. **Plain-language everything.** No accounting jargon on the surface. "Money you will receive" instead of "Accounts Receivable" (keep the technical term as a small subtitle). Errors in simple Bangla with a clear fix.
10. **Guided empty states.** Every empty screen shows a friendly illustration + one big button ("+ Add your first customer"), never a blank grid.
11. **Confirm & undo.** Destructive actions get a clear confirm dialog; recent actions get an undo toast. Reduces fear for hesitant users.
12. **Role-based simplicity.** A driver sees 3 things, an owner sees dashboards, an accountant sees finance. Never show a user modules they can't use.

### Design system summary (the AI will build this in Part C)
- **Brand:** Primary Navy `#12356B`, Accent Orange `#F26B21` (from the TravelAgencyWeb logo), Success Green `#16A34A`, Warning Amber `#F59E0B`, Danger Red `#DC2626`, Neutral background `#F5F7FA`, Card white `#FFFFFF`, Text `#1F2937`.
- **Module accent colors (keep from organogram):** CRM Green `#2E8B57` · Sales Teal `#0F766E` · Air Ticketing Blue `#1D4ED8` · Visa Purple `#7C3AED` · Tour `#0E7490` · Hotel Brown `#92603B` · Transport Orange `#EA580C` · Hajj/Umrah Teal `#0D9488` · Student Slate `#475569` · Manpower Teal `#0891B2` · B2B Agent Maroon `#9B1C31` · Corporate Green `#15803D` · Finance Deep-Teal `#115E59` · HR Green `#166534` · CMS Amber `#B45309` · AI Center Crimson `#B91C1C` · OCR Gold `#A16207` · Automation Teal `#0E7490` · Integrations Green `#166534`.
- **Type:** Headings & Bangla = Hind Siliguri / Noto Sans Bengali (Bold/SemiBold); Numbers & English body = Inter or Plus Jakarta Sans. Base 16px, Bangla 18px.
- **Shape:** 12px card radius, soft shadows, 8px grid spacing, 48px control height.
- **Components:** Sidebar nav (collapsible, colored icons), top bar (search + বাংলা/EN toggle + notifications + WhatsApp + profile), KPI stat cards, status chips, data cards, step wizard, filter bar, right-side detail drawer, bottom nav (mobile), floating "+ New" action button.

### Recommended navigation architecture
Don't put 200 items in one sidebar. Group into **9 top-level sections**, each expands to its modules:
1. 🏠 Home (Dashboards) 2. 👥 CRM & Sales 3. ✈️ Services (Air / Visa / Tour / Hotel / Transport / Hajj / Student / Manpower) 4. 🤝 Agents & Corporate 5. 💰 Finance 6. 🧑‍💼 HR & Payroll 7. 🌐 Website & Portals 8. 🤖 AI & Automation 9. ⚙️ Settings & Admin.
On mobile: a 5-item bottom bar (Home · Bookings · +New · Customers · More).

### Screen priority (build order — highest business value first)
**Phase 1 (MVP demo):** Login/Onboarding · Executive/Owner Dashboard · CRM Customers · Sales Booking wizard · Invoice + WhatsApp send · Air Ticketing · Visa Processing · Finance overview.
**Phase 2:** Hajj & Umrah · Tour Builder · Hotel · Manpower · Student · Agent Portal · Customer Portal · HR/Payroll.
**Phase 3:** AI Smart Center · OCR Center · Automation Center · Integrations · Super Admin (SaaS) · Website CMS · Mobile app screens.

---

# PART C — FOUNDATION PROMPT (run this FIRST in Figma Make)

> Paste this as your first prompt. Attach this `.md` file and the organogram PNG. It creates the design system, the app shell, and the main dashboard that every later screen will reuse.

```
Design the foundation and design system for an enterprise SaaS web application called
"TravelAgencyWeb ERP" — a complete business operating system for travel agencies in Bangladesh.

TARGET USER: Travel agency owners and staff in Bangladesh who are NOT highly computer-literate
and are mobile-first. The UI must feel simple, friendly, visual, and reassuring while being
enterprise-grade underneath. Optimize every choice for low cognitive load.

NON-NEGOTIABLE RULES:
- Bilingual, Bangla-first: every menu item and label shows a Bangla word (primary, larger) with a
  smaller English word beneath it. Include a global বাংলা/EN toggle in the top bar. Use a Bangla-
  capable font such as "Hind Siliguri" or "Noto Sans Bengali" for Bangla and "Inter" for numbers/English.
- Every navigation item pairs a clear, concrete color icon WITH a text label — never icon-only.
- Large touch targets (min 48px height), 16px+ text (18px Bangla), generous spacing, 8px grid.
- Money shown in Bangladeshi Taka (৳) with lakh/crore grouping, dates as DD-MM-YYYY.
- Color-code modules by signature color (defined below).

DESIGN TOKENS:
- Brand Navy #12356B, Accent Orange #F26B21, Success #16A34A, Warning #F59E0B, Danger #DC2626.
- App background #F5F7FA, cards #FFFFFF, text #1F2937, muted text #6B7280.
- Card radius 12px, soft shadows, control height 48px.
- Module accent colors: CRM #2E8B57, Sales #0F766E, Air Ticketing #1D4ED8, Visa #7C3AED,
  Tour #0E7490, Hotel #92603B, Transport #EA580C, Hajj/Umrah #0D9488, Student #475569,
  Manpower #0891B2, Agent #9B1C31, Corporate #15803D, Finance #115E59, HR #166534,
  CMS #B45309, AI #B91C1C, OCR #A16207, Automation #0E7490, Integrations #166534.

BUILD THESE REUSABLE COMPONENTS:
1. Left sidebar navigation, collapsible, with 9 grouped sections (each a colored icon + Bangla/English
   label): Home/Dashboards, CRM & Sales, Services, Agents & Corporate, Finance, HR & Payroll,
   Website & Portals, AI & Automation, Settings & Admin. Sections expand to show sub-modules.
2. Top bar: global search, বাংলা/EN toggle, a green WhatsApp quick-action button, a notification bell
   with badge, and a user avatar with company name.
3. KPI stat card (big number, label, up/down trend, small sparkline).
4. Status chip component with traffic-light colors (green=done, amber=pending, red=overdue).
5. Data card and a clean data table with row actions.
6. A step-wizard component with a numbered progress bar.
7. Floating "+ New" primary action button (orange).
8. Friendly empty-state block (illustration + one big call-to-action button).
9. Mobile bottom navigation bar with 5 items: Home, Bookings, +New (center, raised), Customers, More.

THEN design the MAIN OWNER/EXECUTIVE DASHBOARD as the first screen using this system:
- A greeting row ("সুপ্রভাত, [Owner Name]") with today's date and a Business Health Score gauge.
- A row of 4 big KPI cards: Today's Sales, Outstanding Due (Bakeya), This Month Profit, New Bookings.
- A "Sales Trend" line chart and a "Service-wise Sales" donut chart side by side.
- A "Smart Alerts & Notifications" panel and an "AI Recommendations" panel.
- A "Top Customers" list and a "Recent Bookings" list with status chips.
- A right-edge "Owner Intelligence" strip with quick cards: Daily WhatsApp Summary, Cash Flow,
  Due Collection, Employee Performance.
Provide both a desktop layout and a responsive mobile layout.
Keep it clean, modern, enterprise SaaS, lots of whitespace, friendly and confident.
```

---

# PART D — MODULE PROMPTS (paste one at a time after the foundation)

> Each prompt says "Using the existing TravelAgencyWeb design system and shell..." so Figma Make keeps everything consistent. Generate, review, then run the next.

### D1 — Login, Onboarding & Tenant Setup
```
Using the existing TravelAgencyWeb design system, design the authentication and onboarding flow:
1) Login screen (phone number + password, big buttons, "Login with OTP" option, বাংলা/EN toggle,
   brand navy left panel with the tagline "Travel Smarter, Grow Faster").
2) OTP verification screen with large 6-digit input.
3) A 4-step onboarding wizard for a new agency tenant: (1) Company Profile, (2) Choose your business
   types via big selectable icon cards — Air Ticketing, Visa, Tour, Hajj & Umrah, Student, Manpower,
   Corporate, (3) Add first branch & staff, (4) Choose plan & payment (show bKash/Nagad/card).
Use a numbered progress bar, plain Bangla-first labels, and a friendly welcome tone.
```

### D2 — CRM & Sales
```
Using the existing TravelAgencyWeb design system (CRM accent green #2E8B57), design:
1) CRM Customers list — card/table hybrid with photo/initial, name, phone, WhatsApp button, lead status
   chip, and last-contact date; a prominent "+ New Customer" button and simple filters.
2) Customer detail (right drawer or full page) with tabs: Overview, Bookings, Payments/Dues, Documents,
   Timeline/Communication, Notes; a big WhatsApp and Call button at top.
3) Leads pipeline as a simple kanban (New → Contacted → Quoted → Won/Lost) with drag cards.
4) Follow-up & Tasks view with a calendar and a "today's follow-ups" list.
Keep forms as short step wizards. Bangla-first labels, big touch targets.
```

### D3 — Sales & Booking + Invoice
```
Using the existing design system (Sales teal #0F766E), design the booking-to-invoice flow:
1) A "New Booking" step wizard: (1) Choose service type with big icon cards (Air/Visa/Tour/Hotel/Hajj),
   (2) Customer select or quick-add, (3) Service details, (4) Pricing with auto cost/profit calculator,
   (5) Review & confirm.
2) Bookings list with status chips (Confirmed/Pending/Cancelled) and a booking calendar view.
3) Invoice screen: clean printable invoice in Taka with company letterhead, plus action buttons:
   Send on WhatsApp, Send Email, Download PDF, Record Payment.
4) Payment & Money Receipt screen supporting bKash/Nagad/Cash/Bank, with a receipt preview.
Emphasize the WhatsApp-send action and plain-language money labels (e.g., "মোট বিল / Total Bill").
```

### D4 — Air Ticketing
```
Using the existing design system (Air Ticketing blue #1D4ED8), design:
1) Flight search screen (from/to city pickers with airport codes, date, passengers, class), results
   list showing airline logo, times, duration, price in Taka, and a big "Book" button.
2) PNR / Reservation detail with passenger list, fare breakdown, and actions: Issue Ticket, Reissue,
   Void, Refund (as clearly labelled colored buttons).
3) An issued e-ticket view with Send on WhatsApp / Download PDF.
4) A simple Airline Commission & Supplier Settlement summary table.
Keep the airline/travel context visual with icons; avoid GDS jargon on the surface.
```

### D5 — Visa Processing
```
Using the existing design system (Visa purple #7C3AED), design:
1) A visa application step wizard: (1) Choose country (flag cards), (2) Visa type, (3) Applicant &
   passport info (with a "Scan passport" OCR button that auto-fills), (4) Document checklist with
   upload tiles and green ticks, (5) Fees & submit.
2) Visa tracking board: applications grouped by stage (Received → Docs → Embassy → Approved →
   Delivered) with status chips and expected dates.
3) Visa application detail with document viewer and a WhatsApp "notify customer" button.
Make the document checklist very visual (icon per document, clear tick/cross).
```

### D6 — Tour Management (Package & Itinerary Builder)
```
Using the existing design system (Tour #0E7490), design:
1) A visual Tour Package Builder: add destinations, nights, hotels, transport, meals as draggable
   blocks; a live cost calculator and profit margin shown in Taka on the side.
2) A day-by-day Itinerary Builder with a timeline, images, and inclusions/exclusions.
3) Tour packages gallery (cards with photo, price, duration) for Domestic/International/Group/FIT tabs.
4) A shareable itinerary preview with Send on WhatsApp / PDF.
Rich, image-forward, friendly. Bangla-first labels.
```

### D7 — Hotel & Transport
```
Using the existing design system (Hotel brown #92603B, Transport orange #EA580C), design:
1) Hotel search & booking with room type cards, a voucher preview, and check-in/check-out board.
2) Room management grid (available/occupied/cleaning color states).
3) Transport module: airport pickup scheduling, car rental cards, driver & vehicle management lists,
   and a simple trip-assignment screen with a map placeholder.
Keep status color-coding strong so staff read state at a glance.
```

### D8 — Hajj & Umrah
```
Using the existing design system (Hajj/Umrah teal #0D9488), design a culturally respectful module:
1) Hajj & Umrah package cards (with Kaaba/mosque imagery, price in Taka, duration, hotel distance
   from Haram).
2) Pilgrim management list with group assignment, and a room-sharing arrangement screen (drag pilgrims
   into rooms).
3) A pilgrim detail with passport/visa/flight status chips and a document checklist.
4) Group flight and Ziyarah/guide management screens.
Warm, respectful tone; clear Bangla labels; large readable type for older users.
```

### D9 — Student Consultancy
```
Using the existing design system (Student slate #475569), design:
1) University & course browser (cards with country flag, tuition, intake).
2) Student application pipeline (Enquiry → Docs → Applied → Offer → CAS/COE/I20 → Visa → Enrolled)
   as a kanban with status chips.
3) Student detail with document checklist (with OCR scan), offer-letter tracker, and scholarship info.
Clean, trustworthy, education feel.
```

### D10 — Manpower ERP
```
Using the existing design system (Manpower #0891B2), design:
1) Employer & Job-Order (Demand) management lists.
2) Candidate pipeline (Registered → CV → Medical → Police Clearance → BMET → Visa → Flight/Deployment)
   as a stage board with clear status chips per candidate.
3) Candidate detail with CV, medical, police-clearance, BMET, visa, and flight documents as a checklist.
Practical, document-heavy but kept visual and simple.
```

### D11 — Agents & Corporate Portals
```
Using the existing design system (Agent maroon #9B1C31, Corporate green #15803D), design:
1) B2B Agent dashboard: wallet balance, credit limit, commission earned, recent bookings; a "Book now"
   button and a ledger/settlement table.
2) Agent registration & approval screen for the admin side.
3) Corporate Travel: corporate client dashboard, travel-policy setup, approval workflow view, and
   corporate invoicing with credit management.
Show wallet/credit numbers big and clear in Taka.
```

### D12 — Finance ERP
```
Using the existing design system (Finance deep-teal #115E59), design an accountant-friendly but
simple finance area:
1) Finance overview dashboard: Cash in hand, Bank balance, Receivable (money you will get),
   Payable (money you will pay), Profit — each a big card in Taka, plus a cash-flow chart.
2) A simplified voucher entry (Cash/Bank/Journal) as a short wizard.
3) Reports hub with big tappable report cards: Profit & Loss, Balance Sheet, Trial Balance, VAT & Tax,
   Ledger. Each opens a clean, printable report.
Show technical terms as small English subtitles under plain-Bangla labels
(e.g., "পাওনা টাকা / Accounts Receivable").
```

### D13 — HR & Payroll
```
Using the existing design system (HR green #166534), design:
1) Employee directory (photo cards, department, designation).
2) Attendance screen (calendar + present/absent/leave color states) with a simple check-in.
3) A payroll run wizard (select month → review salaries, allowances, deductions → approve → payslips).
4) Leave management with request/approve cards and an ID-card generator preview.
Keep everything glanceable and low-text.
```

### D14 — AI Smart Center
```
Using the existing design system (AI crimson #B91C1C), design an AI hub:
1) A grid of AI tool cards: AI Chat Assistant, AI Proposal Generator, AI Itinerary Generator,
   AI Email Writer, AI WhatsApp Reply, AI Smart Search, AI Document Analysis, AI Revenue Forecast,
   AI Expense Analysis, AI Customer Recommendation, AI Report Summary.
2) The AI Chat Assistant screen: a friendly Bangla-first chat UI with suggestion chips
   ("আজকের বিক্রি দেখাও", "নতুন প্রপোজাল বানাও") and voice input.
3) A "Generate Proposal/Itinerary" screen: fill a few fields → AI drafts → editable preview →
   Send on WhatsApp.
Make AI feel like a helpful assistant, not a technical tool. Big buttons, plain language.
```

### D15 — OCR Smart Document Center
```
Using the existing design system (OCR gold #A16207), design:
1) A document-scan hub with big tiles: Passport, NID, Visa, Ticket, Invoice, Student Doc, Manpower Doc.
2) The scan flow: upload/take photo → AI extracts fields → a split view showing the document image on
   the left and auto-filled, editable fields on the right with an AI-validation status (green tick /
   amber "please check").
3) An auto-data-entry confirmation screen ("We filled 12 fields for you — confirm?").
Emphasize the time-saving magic; show clear before/after.
```

### D16 — Automation Center
```
Using the existing design system (Automation #0E7490), design:
1) An automation dashboard listing active automations as toggle cards: Auto Follow-up, Auto WhatsApp,
   Auto SMS, Auto Email, Auto Invoice, Auto Due Reminder, Auto Task, Scheduled Reports, Auto Backup.
2) A simple "create automation" builder in plain language: WHEN [trigger] → DO [action], chosen from
   dropdowns with icons (no code, no flowchart complexity).
3) A run-history/log list with success/fail chips.
Make it feel safe and simple — toggles, not scripting.
```

### D17 — Integrations & Marketplace
```
Using the existing design system (Integrations green #166534), design:
1) An integrations marketplace grid of connectable app cards with logos and Connect buttons:
   GDS, Payment Gateways, bKash, Nagad, SSLCommerz, Bank, WhatsApp (WASenderAPI), SMS Gateway,
   Email, Google Workspace, Google Calendar/Drive, Accounting, plus AI providers (OpenAI, Gemini, Claude).
2) A connected-app detail with status, settings, and a test-connection button.
Clean app-store feel with category filters.
```

### D18 — Customer Portal & Mobile Apps
```
Using the existing design system, design the customer-facing experiences (mobile-first):
1) Customer Portal / App: a simple home with My Bookings, My Payments, My Invoices, My Documents,
   Visa Status (big progress tracker), Support Tickets, Notifications. Very large icons and buttons.
2) A booking/visa status tracker with a clear step progress bar in Bangla.
3) Sketch the 5 mobile apps' home screens as phone frames: Customer, Agent, Employee, Driver, Owner —
   each showing only that role's 3-5 most important actions.
Extremely simple, thumb-friendly, minimal text, big tap zones for low-literacy users.
```

### D19 — Super Admin (SaaS Platform)
```
Using the existing design system (Brand navy), design the platform-owner (Super Admin) area:
1) SaaS dashboard: total tenants, active subscriptions, MRR in Taka, new signups, system health.
2) Tenant management list with plan, status, and a "login as tenant" action.
3) Subscription & billing, Feature/Module toggle per tenant (big on/off switches), Manual Payment
   Verification queue (bKash/Nagad screenshots to approve), Coupons, and White-label/Custom-domain settings.
Keep it powerful but organized with clear grouping.
```

---

# PART E — WORKFLOW & PRO TIPS

### Recommended run order in Figma Make
1. **Part C foundation** (design system + shell + owner dashboard) — attach this file + the PNG.
2. **D1 → D3** (login, CRM, booking/invoice) — this alone gives you a demoable product.
3. Then the service modules **D4–D11** in your business-priority order.
4. Then **D12–D13** (Finance, HR), **D14–D17** (AI/OCR/Automation/Integrations).
5. Finally **D18–D19** (portals/mobile, super admin).

### Prompting tips that materially improve output
- **Always name the user** in the prompt ("for low-literacy travel agency staff in Bangladesh"). Figma Make produces different density/typography when it knows the audience.
- **Generate one screen/flow per prompt.** If a module has many screens, split it further.
- **Iterate with short follow-ups**: "make Bangla labels the primary size and English the subtitle", "increase all button heights", "add a WhatsApp button to each card", "convert this table into cards for mobile".
- **Reuse the system**: start each new module prompt with "Using the existing TravelAgencyWeb design system and components…" so it doesn't reinvent styles.
- **Ask for both breakpoints**: "provide a desktop and a mobile version."
- **Feed real-ish content** (Bangla names, Taka amounts, Dhaka/Chittagong branches) so it doesn't fill with English lorem ipsum.

### After Figma: getting to a real product
Figma Make output is a prototype (its exported code is not production-ready). When you're happy with the designs, hand the Figma file to a developer or a Figma-to-code tool to build the actual React/Laravel app. Treat these AI designs as the fast, high-quality starting point — your judgment on flows and Bangla wording is what makes it truly usable.

### One strong recommendation
Before generating all 200 screens, generate **Phase 1 (D1–D3 + Finance overview)**, put it in front of 2-3 actual travel-agency owners in Bangladesh, and watch them use it on a phone. Their confusion points will tell you more than any spec — then refine the foundation and regenerate. This is the single highest-leverage step for a low-literacy audience.
```
```
