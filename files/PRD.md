# SHREE BALAJI ROLLING MILLS – PRODUCT REQUIREMENTS DOCUMENT
## Feature Specifications, User Stories & Acceptance Criteria

---

## DOCUMENT METADATA

| Field | Value |
|-------|-------|
| **Product** | Shree Balaji Rolling Mills Website v1.0 |
| **Version** | 1.0 |
| **Last Updated** | August 2026 |
| **Owner** | Product Manager |
| **Stakeholders** | Sales, Marketing, Engineering, Leadership |
| **Status** | APPROVED FOR BUILD |

---

## 1. PRODUCT VISION & GOALS

### Vision Statement
> "Position Shree Balaji Rolling Mills as a credible, growth-focused steel manufacturing platform trusted by distributors, contractors, and infrastructure projects across Northern India—serving as the institutional alternative to legacy players."

### Business Goals
1. **Lead Generation**: Capture 50+ qualified inquiries/month within first 3 months
2. **Segment Clarity**: Enable buyer self-segmentation → Reduce sales follow-up overhead by 40%
3. **Credibility Anchor**: Establish web presence as institutional-grade competitor in mid-market steel
4. **Growth Narrative Visibility**: Make FY30 ₹1,000 Cr path tangible and aspirational to partners
5. **Channel Enablement**: Create self-serve dealer onboarding pathway (reduce manual prospecting)

### Success Metrics (30-Day Post-Launch)
- [ ] 2,000+ unique monthly visitors
- [ ] 50+ inquiry form submissions
- [ ] 70%+ form completion rate
- [ ] <2.5s page load time (P75)
- [ ] 15+ distributor inquiries (qualification rate: 60%+)
- [ ] 25+ contractor/project inquiries (qualification rate: 40%+)
- [ ] 50%+ organic traffic (SEO traction by week 4)

---

## 2. TARGET USERS & PERSONAS

### Persona 1: VIKRAM (Regional Distributor)
**Profile**:
- Age 35–50, steel products distribution business (5–20 years)
- Manages regional sales team, currently supplies contractors
- **Goal**: Secure reliable, long-term supply partnerships with margin upside
- **Pain**: Dependent on 2–3 suppliers; concerned about capacity in growth phase
- **Trigger**: Searching for "TMT bar manufacturers in NCR" or "structural steel dealers Delhi"
- **Decision Timeline**: 2–4 weeks (needs to evaluate supply reliability + terms)

**Needs**:
- Proof of institutional-grade supply reliability
- Long-term partnership terms & margin structure
- Capacity commitment (confidence in ramp-up)
- Regional logistics clarity
- Direct access to supply/operations contact

**Website Behavior**:
- Lands on hero → Clicks "I'm a Distributor"
- Reviews capacity timeline + growth narrative (confidence signal)
- Downloads spec sheet + partnership terms PDF
- Fills form → Expects phone call within 24h
- May revisit to check "customer logos" section (social proof)

---

### Persona 2: PRIYA (Project Procurement Manager)
**Profile**:
- Age 28–40, works for infrastructure/construction company
- Manages bulk procurement for 1–5 active projects
- **Goal**: Secure reliable supply of high-quality steel at competitive price; minimize supply-chain risk
- **Pain**: Supplier reliability issues; quality inconsistency; poor delivery forecasting
- **Trigger**: "Bulk steel suppliers" or "TMT bar suppliers with BIS certification"
- **Decision Timeline**: 1–2 weeks (procurement cycle pressure)

**Needs**:
- Detailed technical specs (tensile strength, certifications)
- Quality certifications visible (BIS, ISO)
- Capacity confirmation for bulk volumes
- Delivery timeline clarity
- On-time delivery track record (or SLA commitment)

**Website Behavior**:
- Lands on hero → Clicks "I'm a Contractor/Project Buyer"
- Navigates to product specs section
- Scans capacity + delivery timeline (critical for project planning)
- Downloads spec sheet + technical certificates
- Fills form with project details (volume, timeline, delivery location)
- Expects email response with confirmation + SLA doc within 24h

---

### Persona 3: ARJUN (Construction Contractor)
**Profile**:
- Age 45–60, runs mid-size construction contracting business
- Buys steel for concrete reinforcement, structural work
- **Goal**: Buy quality steel at competitive pricing; minimize downtime
- **Pain**: Supply inconsistency; small order rejections; high coordination overhead
- **Trigger**: "Nearby steel suppliers" or "structural steel contractors Delhi"
- **Decision Timeline**: 1–3 days (urgent, on-site need)

**Needs**:
- Quick availability confirmation
- Quality specs (simple, practical terms)
- Delivery within 48–72h for urgent orders
- Friendly, direct contact (WhatsApp preferred)
- Flexibility on volume minimums

**Website Behavior**:
- Lands on homepage via Google → Looks for phone number/contact immediately
- May not read full specs; scans for "capacity" + "delivery time"
- Clicks WhatsApp icon or phone button (wants direct contact)
- If form required, fills quickly (3–4 fields max)
- Expects WhatsApp/call response within 2–4 hours

---

### Persona 4: DEEPAK (Investor/Partnership Analyst)
**Profile**:
- Age 30–50, works for PE firm, family office, or institutional investor
- Evaluating mid-market steel companies for growth investment
- **Goal**: Understand growth trajectory, profitability pathway, execution credibility
- **Pain**: Lack of transparent financial data; execution risk unclear
- **Trigger**: "Mid-market steel manufacturers India" or "high-growth steel companies"
- **Decision Timeline**: 4–8 weeks (due diligence)

**Needs**:
- Clear revenue trajectory (FY27–FY30 visible)
- Margin expansion narrative (scale leverage visible)
- Capacity growth justification (market opportunity clear)
- Institutional credibility (team, certifications, partnerships)
- Access to detailed financial summary or investor deck

**Website Behavior**:
- Lands on hero → Seeks "investor" or "about us" section
- Navigates to growth dashboard (FY27–FY30 metrics visible)
- Scans team/leadership section
- Downloads investor brief / summary deck PDF
- Fills form or emails directly for detailed financials
- Expects response from investor relations contact within 48h

---

## 3. FEATURE REQUIREMENTS

### FEATURE SET 1: HERO SECTION (Landing)

**Requirement**: User-segmented hero with clear value props

**User Stories**:

```
Story 1.1: Hero Display & Segment CTA Buttons
As a first-time visitor,
I want to see the company's value prop in 3 seconds,
So that I immediately understand what Shree Balaji offers.

Acceptance Criteria:
✓ Hero headline visible above-fold (desktop + mobile)
✓ Subheadline positioning explains "Regional scale + growth trajectory"
✓ Four segment CTA buttons visible: 
  - "I'm a Distributor"
  - "I'm a Contractor/Fabricator"
  - "I'm a Large Project"
  - "I'm Interested in Partnership/Investment"
✓ Buttons are at least 48px height (mobile thumb-friendly)
✓ Button colors are distinct (e.g., primary blue for distributor, secondary for others)
✓ Background image or video (steel manufacturing facility or growth chart)
✓ Page load time < 1.5s (critical: must beat competitors)
```

**Detailed Spec**:

| Element | Content | Design Note |
|---------|---------|------------|
| **Headline** | "Manufacturing Scale. Building Northern India's Future." | Bold, 48–64px, dark navy |
| **Subheadline** | "Structural Steel & TMT Bars. ₹18Cr → ₹1000Cr Growth." | 18–24px, gray-600, secondary font |
| **CTA Buttons** | See button matrix below | Primary action: "Get Started" or segment-specific button |
| **Background** | Hero image (manufacturing floor or growth chart animation) | Cloudinary CDN, auto-sized |
| **Trust Badge** | "₹203 Cr Revenue. 180,000 MT Capacity. Northern India's Trusted Partner." | Minimal, 12–14px, subtle gold accent |

**Button Matrix**:

| Button Label | Click Behavior | Target User |
|--------------|----------------|------------|
| "I'm a Distributor" | Scroll to segment form (pre-filled) OR open modal | Vikram (distributor) |
| "I'm a Contractor/Fabricator" | Scroll to product specs section | Priya (project buyer) |
| "I'm a Large Project" | Scroll to capacity section + project inquiry form | Infrastructure buyer |
| "Explore Our Growth" | Scroll to growth timeline section | Investor/curious visitor |

---

### FEATURE SET 2: PRODUCT HUB (Product Showcase)

**Requirement**: Segmented product display with downloadable specs

**User Stories**:

```
Story 2.1: Product Comparison & Spec Sheets
As a contractor evaluating suppliers,
I want to compare structural steel and TMT bars side-by-side,
So that I can understand quality, capacity, and delivery for each product.

Acceptance Criteria:
✓ Two product cards visible: "Structural Steel" + "TMT Bar"
✓ Each card shows:
  - Product name + positioning
  - Key specs (tensile strength, yield strength, certifications)
  - Capacity (TPA + monthly MT)
  - Lead time
  - Quality certifications (badges)
✓ "Download Spec Sheet" button links to PDF (via Cloudinary)
✓ Comparison table option (togglable)
✓ Tabs or accordion for detailed specs (not overwhelming)
✓ Product images + use-case photos (buildings, infrastructure projects)
✓ Related certifications linked (BIS, ISO trust signals)
```

**Detailed Spec**:

**Product Card: Structural Steel**
```
┌─────────────────────────────────────┐
│  STRUCTURAL STEEL                   │
│                                     │
│  Grade A | 250–400 MPa Tensile     │
│  Regional Steel Standard            │
│                                     │
│  📊 Capacity: 36,000 TPA            │
│     3,000 MT / month                │
│                                     │
│  ✓ BIS:IS 2062                      │
│  ✓ ISO 9001:2015                    │
│                                     │
│  ⏱️ Lead Time: 2–4 weeks            │
│                                     │
│  [📥 Download Spec Sheet] [See More]│
└─────────────────────────────────────┘
```

**Product Card: TMT Bar (New)**
```
┌─────────────────────────────────────┐
│  TMT BAR (NEW FACILITY)              │
│  🚀 India's Fastest-Growing Steel   │
│                                     │
│  High-Strength Reinforcement        │
│  500 MPa + Ductility                │
│                                     │
│  📊 Capacity: 144,000 TPA           │
│     12,000 MT / month               │
│                                     │
│  ✓ BIS: 1786-2015                   │
│  ✓ ISO 9001:2015                    │
│  ✓ Earthquake-Resistant Certified   │
│                                     │
│  ⏱️ Lead Time: 1–3 weeks            │
│                                     │
│  [📥 Download Spec Sheet] [See More]│
└─────────────────────────────────────┘
```

**Downloadable PDFs** (Sanity CMS managed):
- Structural_Steel_Technical_Specs_v2.pdf
- TMT_Bar_Certifications_BIS_1786.pdf
- Capacity_Timelines_FY28_FY30.pdf

---

### FEATURE SET 3: SCALE & CAPACITY VISUALIZATION

**Requirement**: Growth trajectory visualization + capacity confirmation

**User Stories**:

```
Story 3.1: Growth Timeline Interactive Visualization
As an investor evaluating growth potential,
I want to see Shree Balaji's revenue and capacity roadmap (FY27–FY30),
So that I can assess execution credibility and market opportunity.

Acceptance Criteria:
✓ Interactive timeline chart visible (chart.js or Recharts)
✓ Shows three phases:
  1. "Baseline" (FY26: ₹203 Cr, sub-1% margins, stabilization)
  2. "Inflection" (FY27–28: ₹260–812 Cr, margin expansion, ramp-up)
  3. "Scale" (FY29–30: ₹903–1,006 Cr, 4.78% EBITDA margin, sustained growth)
✓ User can hover/click data points for detail (PAT, EBITDA, capacity)
✓ Annotations explain key drivers (TMT ramp-up, scale leverage)
✓ Mobile responsive (stacked bar chart on small screens)
✓ "Key Insight" box highlights profitability > revenue growth
```

**Detailed Spec**:

**Growth Dashboard Component**:

```
╔══════════════════════════════════════════════════════════════╗
║  THE PATH TO ₹1,000 CRORE: THREE PHASES OF GROWTH            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   BASELINE (FY26)       →  INFLECTION (FY27–28)  →  SCALE   ║
║                                                              ║
║   ₹203 Cr              ₹260→812 Cr          ₹1,006 Cr       ║
║   Sub-1% Margins       300% Revenue Jump    Sustained Double-║
║   Stabilization        Margin Expansion     Digit Growth    ║
║                        4.95% EBITDA         2.98% PAT Margin║
║                                                              ║
║   [Interactive Chart with hover tooltips]                    ║
║   [Lines: Revenue + EBITDA Volume + PAT Margin tracking]    ║
║                                                              ║
║   📊 Capacity Expansion:                                     ║
║   36,000 TPA → 180,000 TPA (5x growth, FY27–FY30)           ║
║                                                              ║
║   💡 Key Insight:                                            ║
║   "Profitability outpaces revenue. Fixed costs plateaued;   ║
║    every incremental rupee of sales → bottom line."         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

**Data Table (Sortable)** (Scrollable on mobile):

| Year | Revenue (₹ Cr) | EBITDA Volume (₹ Cr) | EBITDA Margin | PAT (₹ Cr) | PAT Margin | TPA Capacity |
|------|---|---|---|---|---|---|
| FY26 | 203 | 5 | 2.42% | 0.95 | 0.47% | 36,000 |
| FY27 | 260 | 12 | 4.50% | 1.21 | 0.47% | 36,000 |
| FY28 | 812 | 40 | 4.95% | 16.05 | 1.98% | 180,000 |
| FY29 | 903 | 46 | 5.10% | 20.03 | 2.22% | 180,000 |
| FY30 | 1,006 | 48 | 4.78% | 30.00 | 2.98% | 180,000 |

---

### FEATURE SET 4: INQUIRY FORM (Segmented Routing)

**Requirement**: Context-aware form with multi-step routing

**User Stories**:

```
Story 4.1: Segment-Specific Inquiry Form
As a distributor,
I want to fill a form tailored to my segment (not generic),
So that my inquiry reaches the right team with context.

Acceptance Criteria:
✓ Initial field: "Who are you?" dropdown with four options
✓ Form fields dynamically change based on segment:
  
  DISTRIBUTOR fields:
  - Company name, location, current suppliers
  - Annual volumes, margin expectations
  - Interest in partnership terms
  
  CONTRACTOR fields:
  - Company name, contact, project details
  - Required volumes, delivery timeline
  - Quality spec preferences
  
  PROJECT BUYER fields:
  - Project name, scope, location, timeline
  - Total volumes needed, delivery schedule
  - SLA expectations, contact for exec approval
  
  OTHER/INVESTOR fields:
  - Name, organization, investment interest
  - Size of opportunity, timeline, contact

✓ Form shows progress indicator (2/4 steps, etc.)
✓ "Next" button only active when required fields filled
✓ Email validation before submission
✓ CAPTCHA check (Cloudflare Turnstile) for spam protection
✓ Submit button shows "Sending..." state (user feedback)
✓ Success message: "Thank you. We'll contact you within 24 hours."
✓ Redirect to thank-you page with next steps
```

**Detailed Spec**:

**Step 1: Segment Selection**
```
┌─────────────────────────────────────┐
│  WHO ARE YOU? (Required)            │
│                                     │
│  ○ I'm a Distributor/Dealer        │
│  ○ I'm a Contractor/Fabricator     │
│  ○ I'm a Large Infrastructure      │
│    Project Buyer                    │
│  ○ I'm Interested in Partnership/   │
│    Investment                       │
│                                     │
│              [Next →]               │
└─────────────────────────────────────┘
```

**Step 2–3: Segment-Specific Fields** (Example: Distributor)
```
┌─────────────────────────────────────┐
│  Tell Us About Your Business        │
│  (Step 2 of 4)                      │
│                                     │
│  Company Name *                     │
│  [________________________]          │
│                                     │
│  Business Location *                │
│  [________________________] (Delhi NCR│
│                            preference)
│                                     │
│  Current Steel Suppliers (0–3)      │
│  [Search + multi-select]            │
│                                     │
│  Annual Volumes (MT) *              │
│  [________________________]          │
│                                     │
│  Growth Aspirations (FY28) *        │
│  ○ Maintain current volume          │
│  ○ Grow 20–50%                      │
│  ○ Grow 50%+                        │
│                                     │
│     [← Back]      [Next →]          │
└─────────────────────────────────────┘
```

**Step 4: Contact & Confirmation**
```
┌─────────────────────────────────────┐
│  Let's Connect (Step 4 of 4)        │
│                                     │
│  Contact Name *                     │
│  [________________________]          │
│                                     │
│  Email *                            │
│  [________________________]          │
│                                     │
│  Phone (WhatsApp preferred) *       │
│  [________________________]          │
│                                     │
│  □ I agree to receive updates       │
│    about supply partnerships        │
│  □ I agree to the Privacy Policy    │
│                                     │
│  [Captcha: "I'm not a robot"]       │
│                                     │
│     [← Back]  [Submit Form]         │
└─────────────────────────────────────┘
```

**Post-Submission**:
```
┌─────────────────────────────────────┐
│  ✓ Thank You!                        │
│                                     │
│  Your inquiry #INQ-20260811-0001    │
│  has been submitted.                │
│                                     │
│  📧 A confirmation email has been   │
│     sent to [email@company.com]     │
│                                     │
│  📞 Our Regional Sales Manager      │
│     will contact you within 24h.    │
│                                     │
│  Meanwhile:                          │
│  • Download capacity specs →         │
│  • View product certifications →    │
│  • Read partnership terms →         │
│                                     │
│  Questions? WhatsApp us →           │
│  +91-XX-XXXX-XXXX                   │
│                                     │
│              [Back to Home]         │
└─────────────────────────────────────┘
```

---

### FEATURE SET 5: TRUST & CREDIBILITY SECTION

**Requirement**: Institutional credibility signals (certifications, capacity, customer base)

**User Stories**:

```
Story 5.1: Trust Signals Display
As a large project buyer,
I want to see Shree Balaji's certifications, capacity proof, and customer references,
So that I can trust them to deliver for a critical infrastructure project.

Acceptance Criteria:
✓ "Why Choose Shree Balaji?" section visible
✓ Certification badges displayed:
  - BIS (Indian Standards)
  - ISO 9001:2015
  - Environmental compliance
✓ Capacity proof shown:
  - 36,000 TPA existing
  - 180,000 TPA by FY28
  - Monthly production rates (3,000 MT + 12,000 MT)
✓ Customer logos section (6–10 logos of known contractors/builders)
✓ Revenue proof: "₹203 Cr revenue in FY26 from Northern India's largest projects"
✓ Team/leadership section (if available)
✓ Awards/recognitions (if applicable)
✓ Facility images/video walkthrough (builds confidence)
```

**Detailed Spec**:

**Trust Section Layout**:

```
╔══════════════════════════════════════════════════════════════╗
║  WHY SHREE BALAJI?                                           ║
║  Trusted by Northern India's Most Demanding Projects         ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌────────────────────────────────────────────────────────┐ ║
║  │  CERTIFICATIONS & COMPLIANCE                            │ ║
║  │                                                          │ ║
║  │  [BIS Badge]  [ISO 9001]  [Environmental]  [Quality]    │ ║
║  │                                                          │ ║
║  │  "Every product certified to Indian Standards.           │ ║
║  │   Quality is non-negotiable."                           │ ║
║  └────────────────────────────────────────────────────────┘ ║
║                                                              ║
║  ┌────────────────────────────────────────────────────────┐ ║
║  │  MANUFACTURING SCALE                                    │ ║
║  │                                                          │ ║
║  │  Existing Capacity:    36,000 TPA                        │ ║
║  │  Monthly Production:   3,000 MT                          │ ║
║  │                                                          │ ║
║  │  Expansion by FY28:    144,000 TPA (TMT)                 │ ║
║  │  Total Platform:       180,000 TPA                       │ ║
║  │                                                          │ ║
║  │  "5x scale-up ensures your supply is never a constraint."║
║  └────────────────────────────────────────────────────────┘ ║
║                                                              ║
║  ┌────────────────────────────────────────────────────────┐ ║
║  │  TRUSTED BY INDIA'S LARGEST PROJECTS                   │ ║
║  │                                                          │ ║
║  │  [Logo: Major Delhi Builder]  [Logo: National Contractor]║
║  │  [Logo: State Infrastructure] [Logo: Private Developer] ║
║  │  [Logo: Engineering Firm]     [Logo: Fabricator Network]║
║  │                                                          │ ║
║  │  ₹203 Cr FY26 revenue from Northern India's biggest      │ ║
║  │  construction, infrastructure, and industrial players.   │ ║
║  └────────────────────────────────────────────────────────┘ ║
║                                                              ║
║  ┌────────────────────────────────────────────────────────┐ ║
║  │  DELIVERY & RELIABILITY                                │ ║
║  │                                                          │ ║
║  │  ✓ 2–4 week lead times (competitive)                    │ ║
║  │  ✓ On-time delivery commitment: 98%+                    │ ║
║  │  ✓ Regional logistics optimized (Delhi NCR hub)         │ ║
║  │  ✓ Bulk delivery for infrastructure projects            │ ║
║  │  ✓ Quality consistency across all production batches     │ ║
║  └────────────────────────────────────────────────────────┘ ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

**Customer Logos Section**:
```
┌──────────────────────────────────────────────────────────┐
│  TRUSTED BY THESE PARTNERS                               │
│                                                          │
│  [Logo A]  [Logo B]  [Logo C]  [Logo D]  [Logo E]        │
│  [Logo F]  [Logo G]  [Logo H]  [Logo I]  [Logo J]        │
│                                                          │
│  + 50 more projects across Northern India               │
└──────────────────────────────────────────────────────────┘
```

---

### FEATURE SET 6: CONTACT & MESSAGING OPTIONS

**Requirement**: Multiple contact methods for different urgency levels

**User Stories**:

```
Story 6.1: Multi-Channel Contact Options
As a contractor needing urgent steel delivery,
I want to contact Shree Balaji via WhatsApp (not a form),
So that I can get a same-day response.

Acceptance Criteria:
✓ Contact section shows multiple options:
  - Live Chat widget (for quick questions)
  - WhatsApp button (direct message link)
  - Phone number with business hours
  - Email form (for detailed inquiries)
✓ WhatsApp button pre-fills message template:
  "Hi Shree Balaji, I need [volume] MT of [product]. 
   Delivery needed by [date]. Can you confirm availability?"
✓ Phone number is clickable (tel: link on mobile)
✓ Chat widget appears only during business hours
✓ Email form integrates with inquiry routing logic
✓ All contact methods show expected response time:
  - Chat: 15–30 min (business hours)
  - WhatsApp: 1–2 hours
  - Phone: Immediate
  - Email: 24 hours
```

**Detailed Spec**:

**Contact Section**:

```
╔══════════════════════════════════════════════════════════════╗
║  GET IN TOUCH                                                ║
║  Multiple Ways to Reach Us                                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌────────────────────────────┬────────────────────────────┐║
║  │  💬 LIVE CHAT               │  📱 WHATSAPP               ││
║  │  Quick questions?           │  Urgent delivery needs?    ││
║  │  Response: 15–30 min        │  Response: 1–2 hours       ││
║  │                             │                            ││
║  │  [Start Chat] (9 AM–6 PM)   │  [Message us on WhatsApp]  ││
║  └────────────────────────────┴────────────────────────────┘║
║                                                              ║
║  ┌────────────────────────────┬────────────────────────────┐║
║  │  ☎️  PHONE                   │  📧 EMAIL                  ││
║  │  Speak to our team          │  Detailed inquiry?         ││
║  │  Response: Immediate        │  Response: 24 hours        ││
║  │                             │                            ││
║  │  +91 88001 06726             │  [Send Message]            ││
║  │  Ext: Sales (2) / Orders (1)│  shreebalajirmills@gmail.com││
║  └────────────────────────────┴────────────────────────────┘║
║                                                              ║
║  📍 OFFICE LOCATION                                          ║
║  Shree Balaji Rolling Mills                                  ║
║  Factory: Bhiwari, Haryana                                   ║
║  Head Office: Delhi NCR                                      ║
║  Business Hours: Mon–Sat, 9 AM–6 PM IST                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

**WhatsApp Template**:
```
[Button] "Message us on WhatsApp"
↓
Opens WhatsApp with pre-filled message:
"Hi Shree Balaji! 👋

I'm interested in:
• Product: [Structural Steel / TMT Bar / Both]
• Volume: _____ MT
• Delivery needed by: _______
• Project location: _______

Can you confirm availability and pricing?

Thanks!"
```

---

### FEATURE SET 7: NAVIGATION & FOOTER

**Requirement**: Clear, institutional navigation and resource links

**User Stories**:

```
Story 7.1: Intuitive Navigation
As a first-time visitor,
I want to find information about products, capacity, and team without getting lost,
So that I can quickly evaluate Shree Balaji.

Acceptance Criteria:
✓ Header navigation shows:
  - Home, Products, About, Capacity, Investors, Contact
  - Logo clickable (returns to home)
✓ Mobile menu (hamburger) collapses on smaller screens
✓ Sticky header remains visible while scrolling
✓ Footer contains:
  - Quick links (Products, About, Contact, Investor Docs)
  - Legal links (Privacy, Terms, Cookies)
  - Social media icons (LinkedIn, WhatsApp)
  - Copyright + company info
✓ Breadcrumbs shown on nested pages
✓ Search functionality (optional, powered by Sanity CMS)
```

**Header Navigation**:
```
┌──────────────────────────────────────────────────────────┐
│  [LOGO] Shree Balaji  Home | Products | Scale | Contact │
│                           [≡ Menu on mobile]             │
└──────────────────────────────────────────────────────────┘
```

**Footer**:
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  SHREE BALAJI ROLLING MILLS PVT. LTD.                    │
│                                                          │
│  Products        |  Company      |  Support             │
│  • Structural    |  • About      |  • Contact Us        │
│    Steel         |  • Team       |  • FAQ               │
│  • TMT Bar       |  • Careers    |  • Certifications    │
│                  |               |                       │
│  Investors       |  Legal        |  Follow Us           │
│  • Financials    |  • Privacy    |  [LinkedIn] [Twitter]│
│  • Growth Path   |  • Terms      |  [WhatsApp]          │
│  • Investor Deck |  • Cookies    |  [Instagram]         │
│                  |               |                       │
│  © 2026 Shree Balaji Rolling Mills. All rights reserved.│
│  Registered office: Delhi NCR | Factory: Bhiwari, Haryana│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 4. NON-FUNCTIONAL REQUIREMENTS

### Performance
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Lighthouse Score: 90+ on all pages
- [ ] API response time: < 500ms
- [ ] Form submission email delivery: < 2 min

### Availability & Reliability
- [ ] 99.5% uptime SLA (2 hours downtime/month acceptable)
- [ ] Automated daily backups (CMS, database)
- [ ] Failover DNS via Cloudflare
- [ ] Error monitoring via Sentry (alerting on critical issues)
- [ ] Email delivery retry logic (exponential backoff)

### Security
- [ ] SSL/TLS A+ rating (HTTPS enforced)
- [ ] CAPTCHA on all inquiry forms (Cloudflare Turnstile)
- [ ] Rate limiting: 10 inquiries/minute per IP
- [ ] Input validation via Zod (no XSS vulnerabilities)
- [ ] CSRF protection (Next.js default)
- [ ] PII encryption in database (Supabase at-rest encryption)
- [ ] Email deliverability: SPF, DKIM, DMARC records configured

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation supported (Tab, Enter, Escape)
- [ ] Screen reader compatible (semantic HTML, ARIA labels)
- [ ] Color contrast: 4.5:1 (WCAG AA standard)
- [ ] Alt text for all images
- [ ] Form labels associated with inputs

### SEO
- [ ] Meta tags optimized (title, description, og: tags)
- [ ] Schema markup (Organization, LocalBusiness, Product)
- [ ] Sitemap generated + submitted to Google Search Console
- [ ] Mobile-first indexing friendly
- [ ] Structured data for local business (address, phone, hours)
- [ ] Open Graph tags for social sharing

### Mobile Responsiveness
- [ ] Tested on viewport sizes: 320px, 640px, 768px, 1024px, 1440px
- [ ] Touch targets: minimum 48px
- [ ] Form inputs: 16px font size (prevents auto-zoom on iOS)
- [ ] Images: responsive, scaled for device

---

## 5. CONSTRAINTS & ASSUMPTIONS

### Technical Constraints
- **Timeline**: 4-week build (hard stop for launch)
- **Budget**: Cost-optimized stack (Vercel free tier where possible)
- **Team**: Small team (1 PM, 1 designer, 2 engineers)
- **CMS**: Headless (non-technical content updates requirement)

### Business Constraints
- **Segment Priority**: Distributors > Projects > Contractors (lead quality ranking)
- **Language**: English only (v1); Hindi/Regional languages = v2
- **Geography**: Northern India focus initially (Delhi NCR, Haryana); pan-India = expansion phase
- **Form Compliance**: India GDPR (requires consent for email follow-up)

### Data Assumptions
- **Customer Logo Accuracy**: Assume 5–10 logos available for trust section
- **Financial Data**: Assume FY28–FY30 projections are accurate (per investor deck)
- **Capacity Specs**: Assume all product specs verified + certified before launch
- **Contact Availability**: Assume sales team trained on inquiry routing + 24h SLA commitment

---

## 6. PHASED ROLLOUT & ITERATIONS

### MVP (v1.0) – Launch (Week 4)
**Core features only**:
- [ ] Hero with segment CTAs
- [ ] Product showcase (specs + downloadable PDFs)
- [ ] Growth timeline visualization
- [ ] Inquiry form with basic routing
- [ ] Contact section (phone, email, form)
- [ ] Footer with legal links

**Metrics to track**:
- Visitor count, form submission rate, conversion by segment

### v1.1 (Week 6, Post-Launch)
**Optimizations based on data**:
- [ ] WhatsApp button integration (if demand)
- [ ] Live chat widget (if budget allows)
- [ ] Customer testimonials section (if logos provided)
- [ ] Investor brief PDF (if available)
- [ ] Search functionality (if content grows)

### v2.0 (Q2 FY28, Expansion)
**Feature expansion**:
- [ ] Dealer onboarding portal (self-serve partnership applications)
- [ ] Multi-language support (Hindi, regional)
- [ ] Email marketing automation (lead nurture sequences)
- [ ] CRM dashboard (sales team visibility)
- [ ] Product ordering system (B2B e-commerce, if applicable)

---

## 7. SUCCESS METRICS & KPIs

### Awareness Metrics
- [ ] Monthly unique visitors: Target 2,000+ by month 3
- [ ] Organic traffic (SEO): Target 40%+ of total by month 3
- [ ] Social referral traffic: Target 10%+
- [ ] Brand search volume (Google Trends): Track quarterly

### Engagement Metrics
- [ ] Average session duration: Target 2+ min
- [ ] Pages per session: Target 2.5+
- [ ] Bounce rate: Target < 40%
- [ ] Scroll depth: Target 60%+ of users scroll below fold
- [ ] Spec sheet downloads: Target 50+ per month

### Conversion Metrics
- [ ] Form completion rate: Target 70%+
- [ ] Inquiry form submissions: Target 50+/month
- [ ] Conversion by segment:
  - Distributors: 15+ inquiries, 60% qualification rate
  - Contractors: 25+ inquiries, 40% qualification rate
  - Projects: 10+ inquiries, 70% qualification rate
- [ ] Cost per lead (CAC): Track for budget optimization

### Post-Inquiry Metrics
- [ ] Sales follow-up time: Target < 2 hours
- [ ] CRM sync accuracy: Target 100%
- [ ] Deal closure rate by inquiry type: Target tracking (baseline at month 6)
- [ ] Customer acquisition cost (CAC): Track vs. traditional channels

### Business Metrics
- [ ] Revenue from inquiries (attributable): Track quarterly
- [ ] Partnership deals closed: Target 5+ distributors by Q2
- [ ] Project supply contracts: Target 3+ institutional projects

---

## 8. ACCEPTANCE CRITERIA SUMMARY

**Before Launch Sign-Off**:

### Technical
- [ ] All pages load < 2.5s (P75)
- [ ] Lighthouse score 90+
- [ ] Form submission → Email delivery verified (test for all segments)
- [ ] CRM sync validated (leads appear in Pipedrive)
- [ ] Mobile responsiveness tested (iOS + Android, latest versions)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Security scan cleared (no XSS, CSRF, injection vulnerabilities)
- [ ] SSL certificate valid (A+ rating)

### Product
- [ ] All segment CTAs functional and route correctly
- [ ] All product specs downloadable and error-free
- [ ] Growth timeline chart interactive and data-accurate
- [ ] Trust section displays all certifications + logos
- [ ] Inquiry form validates correctly + shows helpful error messages
- [ ] Thank-you page displays after submission
- [ ] Navigation intuitive (no dead links)

### Content
- [ ] All copy proofread (no typos, grammatically correct)
- [ ] Tone consistent (institutional, confident, regional)
- [ ] All contact information accurate + live
- [ ] Legal pages (Privacy, Terms) in place
- [ ] Meta tags optimized for all pages
- [ ] Open Graph tags for social sharing

### Sales Readiness
- [ ] Sales team trained on inquiry routing (who receives which segment)
- [ ] Email templates tested + branded
- [ ] CRM integration live (leads auto-populate)
- [ ] Response SLA documented (24h commitment)
- [ ] Follow-up playbook prepared (by segment)

---

## 9. APPENDICES

### Appendix A: Competitive Feature Comparison

| Feature | Tata Steel | Kamdhenu | Jindal Steel | SBMPL (Target) |
|---------|-----------|----------|------------|---|
| Hero clarity | Dense (institutional) | Fraud alert priority | Modern, clean | **Segment-focused** |
| Product specs | Comprehensive | Basic | Moderate | **Technical + downloadable** |
| Growth narrative | Sustainability focus | Channel focus | Mine-to-Metal story | **FY27–30 roadmap** |
| Investor section | Heavy docs | None | Investor page | **Growth dashboard** |
| Inquiry form | Generic contact | Dealer application | Contact form | **Multi-segment routing** |
| Trust signals | CSR focus | Fraud warning | Awards | **Capacity + certifications** |
| Mobile UX | Desktop-first | Basic mobile | Mobile-friendly | **Mobile-first** |

---

### Appendix B: Glossary

| Term | Definition |
|------|-----------|
| **Segment** | Buyer type: Distributor, Contractor, Project Buyer, Investor |
| **TPA** | Tons Per Annum (annual production capacity) |
| **MT** | Metric Tons (unit of measurement) |
| **EBITDA** | Earnings Before Interest, Tax, Depreciation, Amortization |
| **PAT** | Profit After Tax (net profit) |
| **BIS** | Bureau of Indian Standards (certification body) |
| **TMT Bar** | Thermo-Mechanically Treated reinforcement steel bar |
| **CRM** | Customer Relationship Management system |
| **ISR** | Incremental Static Regeneration (Next.js caching) |
| **SEO** | Search Engine Optimization |
| **CAC** | Customer Acquisition Cost |
| **SLA** | Service Level Agreement |

---

### Appendix C: Competitive Reference Links

- Tata Steel: https://www.tatasteel.com/
- Kamdhenu Limited: https://www.kamdhenulimited.com/
- Jindal Steel: https://www.jindalsteel.in/

**Creative Differentiation Insights**:
- **Tata**: Institutional + sustainability = Too heavyweight for SBMPL, but structure valuable
- **Kamdhenu**: Channel/dealer focus clear + fraud alert = Relevant warning; dealer messaging useful
- **Jindal**: Storytelling (Mine-to-Metal) + modern design = Playbook for growth narrative positioning

---

## DOCUMENT APPROVAL

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Product Owner** | [PM] | _____ | _____ |
| **Sales Lead** | [Sales] | _____ | _____ |
| **Engineering Lead** | [CTO] | _____ | _____ |
| **Design Lead** | [Designer] | _____ | _____ |
| **Executive Sponsor** | [Leadership] | _____ | _____ |

---

**Status**: READY FOR BUILD  
**Next Step**: Finalize design system → Begin frontend development (Week 1)  
**Questions?** Refer to AGENT.md (workflow) or TDR.md (technical architecture)
