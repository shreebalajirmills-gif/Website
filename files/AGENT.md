# SHREE BALAJI ROLLING MILLS – WEBSITE BUILD AGENT
## Project Orchestration & Workflow Management

---

## PROJECT OBJECTIVE
Build an **institutional-grade B2B steel manufacturing website** that positions Shree Balaji as a credible, growth-focused mid-market steel player serving Northern India's construction, infrastructure, and industrial sectors.

**North Star**: Multi-buyer segmentation + growth narrative visibility → FY30 ₹1,000 Cr ambition

---

## PHASE BREAKDOWN

### PHASE 1: DISCOVERY & NARRATIVE SCAFFOLDING (Week 1)
**Owner**: Strategy/Content  
**Deliverables**:
- [ ] Competitive positioning matrix (vs. Tata, Kamdhenu, Jindal)
- [ ] Buyer persona deep-dive (Distributors, Contractors, Project Buyers, Investors)
- [ ] Messaging pyramid + value prop for each segment
- [ ] Brand voice guidelines (professional, forward-looking, technical-credible)
- [ ] Content inventory checklist (specs sheets, certifications, capacity visuals)

**Key Insight from Briefing**:
- Tata = Institutional scale, CSR, sustainability → Too heavyweight for SBMPL positioning
- Kamdhenu = Dealer focus, fraud alerts → Shows regional/channel risk (relevance)
- Jindal = Story-first (Mine to Metal) + sustainability R.I.S.E → **PLAYBOOK**: Adapt for growth narrative

---

### PHASE 2: INFORMATION ARCHITECTURE & WIREFRAMING (Week 1–2)
**Owner**: UX/Product  
**Deliverables**:
- [ ] Site map + hierarchical flow (segmented by buyer type)
- [ ] Key page wireframes:
  - **Hero** (value prop + segmented CTA buttons)
  - **Product Hub** (Structural Steel + TMT Bar comparison)
  - **Scale & Capacity** (manufacturing platform visualization)
  - **Buyer Inquiry Portal** (context-aware form routing)
  - **Growth Story** (FY28/FY29/FY30 trajectory visualization)
  - **Trust & Credibility** (certifications, customer logos, capacity facts)
- [ ] Inquiry form logic tree (Distributor → Long-term supply; Contractor → Bulk order; etc.)
- [ ] CTA microcopy per segment

**Competitive Insights**:
- **Tata playbook**: Multi-level navigation, sustainability spotlight → Adapt for "FY30 Vision" corner
- **Kamdhenu playbook**: Partnership program messaging → Adapt for "Dealer Growth Program" section
- **Jindal playbook**: Narrative storytelling (Mine to Metal) → Create "Capacity Evolution" timeline

---

### PHASE 3: COPY + CONTENT DEVELOPMENT (Week 2–3)
**Owner**: Marketing/Content  
**Deliverables**:
- [ ] **Hero copy** (institutional confidence + growth traction)
  - Target: "Manufacturing the steel that builds Northern India's infrastructure"
- [ ] **Product section**:
  - Structural Steel: specs, capacity, use cases, certifications
  - TMT Bar: market positioning, quality specs, launch narrative
- [ ] **Scale & Credibility section**:
  - Revenue trajectory (₹18 Cr → ₹203 Cr → ₹1,000 Cr path)
  - Capacity expansion story (36k TPA → 180k TPA)
  - Gross margin resilience (2.42% consistency across market contraction)
- [ ] **Buyer-segment tailored copy**:
  - Distributors: "Long-term partnership, institutional supply reliability"
  - Contractors/Fabricators: "Quality specs, delivery consistency, regional logistics"
  - Large Projects: "Bulk capacity, custom logistics, institutional-grade SLAs"
  - Investors: "Proven execution, margin expansion pathway, leverage profile"
- [ ] **Downloadable assets** (PDF specs, capacity sheets, quality certifications)
- [ ] **FAQ section** (technical, commercial, logistics)

**Content Tone Matrix**:
| Segment | Tone | Keywords |
|---------|------|----------|
| Distributors | Reliable, Growth-oriented | Supply reliability, long-term partnership, margins |
| Contractors | Technical, Practical | Specifications, delivery, quality certifications |
| Projects | Institutional | Scale, capacity, SLAs, custom solutions |
| Investors | Forward-looking, Data-driven | Growth thesis, capacity utilization, EBITDA expansion |

---

### PHASE 4: DESIGN SYSTEM + VISUAL IDENTITY (Week 2–3)
**Owner**: Design  
**Deliverables**:
- [ ] Color palette (steel-industrial base + growth accent color)
- [ ] Typography hierarchy (institutional sans + readable body)
- [ ] Component library:
  - Hero section variants (by buyer segment)
  - Product cards (specs showcase)
  - Capacity visualization component (bar chart + text overlay)
  - Inquiry form (segmented, multi-step)
  - Timeline component (FY27 → FY30 growth arc)
  - Trust badge cluster (certifications, capacities, customer count)
- [ ] Iconography (structural steel vs TMT, capacity, quality, delivery)
- [ ] Responsive breakpoints (desktop-first, optimize for mobile construction/field workers)

**Design Philosophy** (Blending Competitors):
- **Tata's polish**: Clean, professional, multi-section
- **Kamdhenu's channel focus**: Prominent dealer inquiry routing
- **Jindal's storytelling**: Timeline-driven capacity expansion narrative

---

### PHASE 5: INQUIRY FORM ARCHITECTURE & ROUTING (Week 3)
**Owner**: Product/Backend  
**Deliverables**:
- [ ] Form segmentation logic:
  ```
  "I am a..."
  ├─ Distributor → Supply partnership form + long-term terms email
  ├─ Contractor/Fabricator → Bulk order form + spec sheets + contact routing
  ├─ Large Project → Custom inquiry + logistics checklist + project contact
  └─ Other → Generic inquiry + automated response + sales routing
  ```
- [ ] Email automation sequences:
  - Distributor: "Growth partnership opportunity" + supply terms doc
  - Contractor: "Specs comparison sheet" + delivery timeline + contact intro
  - Project: "Capacity confirmation" + custom terms discussion invite
  - Other: "Thank you + quick clarification questions"
- [ ] Contact routing matrix (sales team assignments)
- [ ] CRM integration spec (lead tagging, pipeline visibility)
- [ ] Messaging integration (WhatsApp, phone contact options for field)

**Messaging Widget Strategy**:
- Live chat for instant inquiries
- WhatsApp button for quick spec requests
- Phone number with business hours
- Email fallback with guaranteed 24h response

---

### PHASE 6: FRONTEND BUILD (Week 3–4)
**Owner**: Engineering  
**Tech Stack**:
- **Framework**: Next.js / React (institutional polish + performance)
- **CMS**: Headless CMS (Sanity/Contentful) for product specs, capacity data updates
- **Form Backend**: Form submission → Email + CRM (Pipedrive/HubSpot)
- **Analytics**: GA4 + heatmap (Hotjar) for buyer segment flow analysis
- **Hosting**: Vercel or AWS CloudFront (India region, fast load)

**Components to Build**:
- [ ] Hero section (segmented CTA routing)
- [ ] Product showcase (Structural Steel vs TMT Bar tabs)
- [ ] Capacity evolution timeline (interactive, FY27–FY30)
- [ ] Inquiry form (multi-step, segmented)
- [ ] Trust section (capacity facts, certifications, customer logos)
- [ ] Growth dashboard (revenue trajectory, margin stability, scale metrics)
- [ ] Contact section (form + phone + WhatsApp)
- [ ] Footer (regulatory links, social, investor doc access)

---

### PHASE 7: TESTING & REFINEMENT (Week 4)
**Owner**: QA + Product  
**Deliverables**:
- [ ] Cross-browser testing (Chrome, Safari, Edge, mobile)
- [ ] Form submission testing (email delivery, CRM sync, automation)
- [ ] Performance audit (Lighthouse score target: 90+)
- [ ] A/B test variants:
  - Hero CTA button copy ("Get Specs" vs "Partner With Us")
  - Product comparison layout (table vs card)
  - Inquiry routing (2-step vs 4-step form)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Mobile field-worker testing (loading on 4G, thumb-friendly forms)

---

### PHASE 8: LAUNCH & MONITORING (Week 4+)
**Owner**: Marketing + DevOps  
**Deliverables**:
- [ ] Pre-launch SEO optimization (metadata, schema markup, sitemap)
- [ ] Launch announcement (internal + dealer channel + social)
- [ ] Analytics baseline (traffic, segment flow, form conversion)
- [ ] Monitoring setup (error logs, performance, uptime)
- [ ] Post-launch optimization plan (30-day sprint):
  - Heatmap analysis of buyer flow
  - Form abandonment audit
  - Lead quality assessment by segment
  - Copy refinement based on inquiries

---

## BUYER SEGMENT ROUTING LOGIC

### Entry Point: Hero Section CTAs
```
"I'm a..." → Triggers form preset + messaging tone

DISTRIBUTOR PATH:
├─ Form: Company name, location, current suppliers, volumes needed, terms preference
├─ Auto-email: "Partnership Growth Program" doc + regional supply manager contact
└─ CRM tag: channel_partner | growth_focus

CONTRACTOR PATH:
├─ Form: Project scope, steel volume, delivery date, quality specs needed
├─ Auto-email: Spec comparison sheet + delivery timeline + site contact
└─ CRM tag: project_buyer | bulk_order

PROJECT BUYER PATH:
├─ Form: Project name, scale, timeline, custom requirements, procurement contact
├─ Auto-email: "Institutional supply capability" + SLA framework + executive contact
└─ CRM tag: infrastructure_project | institutional

INVESTOR PATH:
├─ Form: Investment interest, amount, timeline
├─ Auto-link: Investor deck PDF + growth thesis dashboard
└─ CRM tag: investor_prospect | financial_interest
```

---

## CONTENT PILLARS

### Pillar 1: SCALE & EXECUTION PROOF
**Data Points to Showcase**:
- Revenue: ₹18 Cr (FY18) → ₹203 Cr (FY26) → ₹1,000 Cr (FY30)
- Capacity: 36k TPA (existing) + 144k TPA (TMT expansion) = 180k TPA total
- Margin resilience: 2.42% gross margin maintained despite -16% sales contraction
- Operational leverage visible: FY28–FY30 shows 4.95%–2.98% EBITDA margin expansion

**Where**: Growth dashboard visualization + investor section

### Pillar 2: INSTITUTIONAL CREDIBILITY
**Components**:
- Manufacturing certifications (BIS, ISO)
- Customer logos (regional contractors, infrastructure firms)
- Capacity specs (monthly production rates, quality certifications)
- Leadership background (if available, executive team intro)
- Regional presence map (Bhiwari facility + Delhi NCR reach)

**Where**: Trust section + About page

### Pillar 3: PRODUCT DIFFERENTIATION
**Structural Steel**:
- Specifications, use cases, certifications
- Comparison vs. competitor options
- Quality consistency proof

**TMT Bar** (Growth angle):
- Market positioning ("India's fastest-growing steel segment")
- Launch narrative + capacity commitment
- Quality standards + competitive advantage

**Where**: Product hub + downloadable datasheets

### Pillar 4: CHANNEL PARTNER OPPORTUNITY
**Message**:
- "Long-standing relationships with Northern India's construction ecosystem"
- Supply reliability + margin structure
- Growth co-investment: TMT ramp-up = dealer opportunity

**Where**: Distributor segment CTA + partnership program section

---

## SUCCESS METRICS (30-Day Post-Launch)

| Metric | Target | Owner |
|--------|--------|-------|
| Monthly website visitors | 2,000+ | Marketing |
| Inquiry forms submitted | 50+ | Product |
| Distributor inquiries | 15+ | Sales |
| Contractor/project inquiries | 25+ | Sales |
| Form completion rate | 70%+ | Product |
| Page load time (P75) | <2.5s | Engineering |
| Mobile traffic % | 40%+ | Analytics |
| Repeat visitor rate | 20%+ | Analytics |
| CRM sync accuracy | 100% | Engineering |

---

## STAKEHOLDER ROLES

| Role | Responsibilities | Slack Channel |
|------|------------------|---------------|
| Product Owner | Roadmap, prioritization, buyer logic | #sbmpl-website |
| Marketing Lead | Messaging, copy, buyer personas | #sbmpl-content |
| Design Lead | Visual identity, wireframes, components | #sbmpl-design |
| Engineering Lead | Frontend, backend, integrations | #sbmpl-dev |
| Sales Lead | Inquiry routing, follow-up SLAs | #sbmpl-sales |
| Analytics Lead | Tracking setup, post-launch monitoring | #sbmpl-analytics |

---

## CRITICAL SUCCESS FACTORS

1. **Institutional Polish** → Every section must feel like "we execute at scale"
2. **Buyer Clarity** → Each visitor segment sees themselves reflected in 3 seconds
3. **Growth Narrative Visibility** → FY30 ₹1,000 Cr path should be obvious (not hidden in docs)
4. **Inquiry Conversion** → Form routing/follow-up must be flawless; sales team trained on lead types
5. **Regional Relevance** → Delhi NCR, Bhiwari location, Northern India customer focus = credibility
6. **Technical Credibility** → Specs, certifications, capacity data > fluff
7. **Mobile-First Reality** → Construction buyers often on-site; forms must be thumb-friendly

---

## RED FLAGS TO AVOID
- ❌ Generic "Contact us" form (no routing = lost leads)
- ❌ Vague product sections (specs matter; copy should be downloadable)
- ❌ Missing capacity/growth metrics (institutional buyers want data)
- ❌ Slow load times (mobile construction workers won't wait)
- ❌ No regional presence emphasis (loses local credibility)
- ❌ Unclear audience segmentation (generic homepage loses all buyers)

---

**Status**: Ready for Phase 1 kickoff  
**Next**: Finalize buyer personas & messaging pyramid
