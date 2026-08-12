# SHREE BALAJI ROLLING MILLS – TECHNICAL DESIGN REVIEW
## Architecture, Stack, and System Specification

---

## 1. EXECUTIVE SUMMARY

**Build Type**: Institutional B2B marketing website with intelligent inquiry routing and CRM integration  
**Target Load**: 5K monthly unique visitors → 100+ inquiries/month  
**Availability SLA**: 99.5% uptime  
**Geographic Focus**: India (Delhi NCR + Northern region)  
**Build Timeline**: 4 weeks (frontend-first, CMS-ready, integrations last)

---

## 2. TECHNOLOGY STACK

### Frontend
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 14+ (App Router) | Server-side rendering + static generation for SEO; institutional polish; fast builds |
| **Styling** | Tailwind CSS + custom CSS modules | Rapid prototyping; design system consistency; mobile-first; low bundle size |
| **Component Library** | Shadcn/ui + custom | Pre-built accessible components; minimal deps; customizable |
| **Forms** | React Hook Form + Zod | Lightweight, type-safe form handling; complex validation routing |
| **State Management** | Zustand | Lightweight query segment routing; minimal boilerplate |
| **Analytics** | GA4 + Plausible (privacy-friendly alt) | Buyer flow tracking; form abandonment; segment conversion |
| **Heatmap** | Hotjar (limited tier) | User behavior on inquiry forms; CTA effectiveness |

### Backend
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **API Layer** | Next.js API Routes (serverless) | No separate backend needed; integrated with frontend; Vercel deployment |
| **Form Processing** | Nodemailer (SMTP) + API route | Email delivery to sales team; automated responses |
| **CRM Integration** | Pipedrive REST API (webhook trigger) | Lead ingestion, routing, sales pipeline visibility |
| **Email Templates** | MJML library + React | Responsive, branded email sequences |
| **Database** | Supabase PostgreSQL (optional, if tracking needed) | Inquiry logs, lead history, analytics backup |

### CMS & Content
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Headless CMS** | Sanity.io or Contentful | Non-technical updates to specs, capacity data, product info; structured content |
| **Asset Management** | Cloudinary | Image optimization, CDN delivery, auto-resize for mobile |
| **Content Modeling** | Product specs, capacity timelines, buyer segments, trust assets | Decoupled from frontend; easy A/B test variation |

### Deployment & Infrastructure
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Hosting** | Vercel (Next.js native) or AWS CloudFront + S3 | Zero-config deployment, auto-scaling, India edge location |
| **DNS** | Cloudflare | DDoS protection, DNS failover, analytics |
| **SSL/TLS** | Automatic via Vercel/Cloudflare | HTTPS enforced, A+ SSL rating |
| **Monitoring** | Sentry (error tracking) + Vercel Analytics | Real-time error alerts, performance monitoring |
| **Backups** | Automated nightly (CMS snapshots + database exports) | Disaster recovery SLA |

---

## 3. SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         Next.js App (Server + Client Components)       │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │    │
│  │  │   Hero       │  │  Products    │  │   Inquiry    │ │    │
│  │  │   Section    │  │   Hub        │  │   Portal     │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │    │
│  │  │   Growth     │  │   Trust &    │  │  Footer &    │ │    │
│  │  │   Timeline   │  │   Credibility│  │  Contact     │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │    │
│  └──────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
         │                         │                        │
         ▼                         ▼                        ▼
┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Tailwind CSS     │  │  GA4 + Hotjar    │  │  Cloudinary      │
│  Shadcn/ui        │  │  Analytics       │  │  (CDN + Images)  │
│  React Hook Form  │  │                  │  │                  │
└───────────────────┘  └──────────────────┘  └──────────────────┘
         │
         ▼
    ┌────────────────────────────────────────────────────┐
    │           NEXT.JS API ROUTES (Backend)             │
    │  ┌────────────────────────────────────────────┐   │
    │  │  /api/inquiry (POST)                       │   │
    │  │  - Validate form data (Zod)                │   │
    │  │  - Route by segment (Distributor/Contactor)   │   │
    │  │  - Send email (Nodemailer)                 │   │
    │  │  - Log to CRM (Pipedrive API)              │   │
    │  └────────────────────────────────────────────┘   │
    │  ┌────────────────────────────────────────────┐   │
    │  │  /api/content (GET)                        │   │
    │  │  - Fetch product specs from CMS (Sanity)   │   │
    │  │  - Cache with ISR (Incremental Static Regen)  │   │
    │  └────────────────────────────────────────────┘   │
    └────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
    ┌──────────────────┐   ┌──────────────────────┐
    │   Nodemailer     │   │   Sanity.io CMS      │
    │   (SMTP relay)   │   │  - Product specs     │
    │                  │   │  - Capacity data     │
    │   Email Templ.   │   │  - Trust assets      │
    │   (MJML)         │   │  - Buyer segments    │
    └──────────────────┘   └──────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────────┐
    │   Pipedrive CRM (Webhook)                │
    │   - Lead ingestion                       │
    │   - Auto-routing to sales                │
    │   - Pipeline visibility                  │
    └──────────────────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────────────┐
    │   Supabase PostgreSQL (Optional)         │
    │   - Inquiry log backup                   │
    │   - Analytics data lake                  │
    │   - Lead history tracking                │
    └──────────────────────────────────────────┘
```

---

## 4. INQUIRY FORM ROUTING LOGIC (CORE SYSTEM)

### Form Submission Flow

```
USER SUBMITS FORM
     │
     ▼
┌─────────────────────────────────────────────┐
│  VALIDATION LAYER (Zod)                     │
│  - Email, phone format                      │
│  - Required fields by segment               │
│  - File upload limits (if specs download)   │
└─────────────────────────────────────────────┘
     │ ✓ Valid
     ▼
┌─────────────────────────────────────────────┐
│  SEGMENTATION ENGINE                        │
│  if (segment === "distributor")             │
│    ├─ Template: Partnership_Growth.html     │
│    ├─ CRM tag: channel_partner              │
│    └─ Assign to: Regional_Sales_Manager     │
│                                              │
│  else if (segment === "contractor")         │
│    ├─ Template: Bulk_Order_Specs.html       │
│    ├─ CRM tag: project_buyer                │
│    └─ Assign to: Account_Manager            │
│                                              │
│  else if (segment === "project")            │
│    ├─ Template: Institutional_Proposal.html │
│    ├─ CRM tag: infrastructure_project       │
│    └─ Assign to: Executive_Sales            │
│                                              │
│  else                                        │
│    ├─ Template: General_Inquiry.html        │
│    ├─ CRM tag: inbound_lead                 │
│    └─ Assign to: Lead_Qualifier             │
└─────────────────────────────────────────────┘
     │
     ├─────────────────┬─────────────────┬──────────────────┐
     ▼                 ▼                 ▼                  ▼
  EMAIL SEND      CRM LOG         ANALYTICS        SLACK ALERT
  (Nodemailer)    (Pipedrive)     (GA4 event)   (sales team)
  
  Auto-response   Lead created   inquiry_form   Immediate
  from template   + routing      _submitted     notification
  to customer                    + segment      to sales
                                 + buyer_id
```

### Email Template Variants

**Template: Partnership_Growth.html**
```
Subject: Your Growth Partnership with Shree Balaji Rolling Mills

Dear [Company Name],

Thank you for your interest in partnering with us as a distributor.

Attached:
- Supply Partnership Terms & Conditions
- Capacity & Delivery Timeline
- Regional Manager Contact: [Name, Phone, Email]

We'll have our Regional Manager reach out within 24 hours to discuss margin structure, volume commitments, and growth opportunities for FY28.

Best regards,
Shree Balaji Rolling Mills Sales Team
```

**Template: Bulk_Order_Specs.html**
```
Subject: Your Bulk Steel Order - Specifications & Availability

Dear [Contact Name],

Thank you for your inquiry. Here's what we can offer:

📊 Quantity Requested: [X] MT
📅 Delivery Timeline: [Y] weeks
✓ Quality Certifications: BIS, ISO
💾 Attached: Detailed Spec Sheet + Quality Certificates

Our Account Manager [Name] will contact you within 24h to confirm pricing, logistics, and delivery schedule.

Regards,
Shree Balaji Rolling Mills
```

**Template: Institutional_Proposal.html**
```
Subject: Institutional Supply Proposal - [Project Name]

Dear [Project Lead],

We're excited to support [Project Name] with our manufacturing capacity.

📋 Capacity Assessment: ✓ [X] MT / month available
🏢 Institutional SLA: 48h response time, 99% on-time delivery
📄 Attached: Capacity Confirmation + SLA Framework

Our Executive Sales Contact [Name] will schedule a call within 48h.

Regards,
Shree Balaji Rolling Mills
```

---

## 5. DATABASE SCHEMA (Optional Supabase)

### Inquiries Table
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment VARCHAR(50) NOT NULL,
  company_name VARCHAR(255),
  contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  message TEXT,
  spec_interest VARCHAR(50), -- 'structural_steel' | 'tmt_bar' | 'both'
  
  -- Routing & Status
  assigned_to VARCHAR(100),
  crm_deal_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new', -- 'new' | 'contacted' | 'qualified' | 'closed'
  
  -- Tracking
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  form_completion_time_ms INT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100)
);

CREATE INDEX idx_segment ON inquiries(segment);
CREATE INDEX idx_status ON inquiries(status);
CREATE INDEX idx_created_at ON inquiries(created_at DESC);
```

### Analytics View
```sql
CREATE VIEW daily_inquiry_metrics AS
SELECT
  DATE(created_at) as inquiry_date,
  segment,
  COUNT(*) as total_inquiries,
  AVG(form_completion_time_ms) as avg_form_time,
  COUNT(CASE WHEN responded_at IS NOT NULL THEN 1 END) as responded_count
FROM inquiries
GROUP BY DATE(created_at), segment;
```

---

## 6. API SPECIFICATION

### POST /api/inquiry

**Request Body**:
```json
{
  "segment": "distributor|contractor|project|other",
  "companyName": "string",
  "contactName": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "specInterest": "structural_steel|tmt_bar|both",
  "volumeNeeded": "string (optional)",
  "deliveryDate": "string (ISO 8601, optional)",
  "projectScope": "string (optional)"
}
```

**Validation (Zod)**:
```javascript
const inquirySchema = z.object({
  segment: z.enum(['distributor', 'contractor', 'project', 'other']),
  companyName: z.string().min(2).max(255),
  contactName: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
  message: z.string().min(10).max(2000),
  specInterest: z.enum(['structural_steel', 'tmt_bar', 'both']),
});
```

**Response (Success)**:
```json
{
  "status": "success",
  "inquiryId": "uuid-string",
  "message": "Thank you. We'll contact you within 24 hours.",
  "segment": "distributor",
  "assignedTo": "Regional Sales Manager - Delhi",
  "followUpEmail": "expected within 24h"
}
```

**Response (Error)**:
```json
{
  "status": "error",
  "field": "email",
  "message": "Invalid email format"
}
```

---

### GET /api/content/products

**Query Params**:
- `type`: "structural_steel" | "tmt_bar" | "all"
- `format`: "full" | "summary"

**Response**:
```json
{
  "products": [
    {
      "id": "structural-steel-001",
      "name": "Structural Steel Grade A",
      "specifications": {
        "tensileStrength": "250-400 MPa",
        "yieldStrength": "150-250 MPa",
        "certifications": ["BIS:IS 2062", "ISO 9001:2015"]
      },
      "capacityMT": 3000,
      "leadTime": "2-4 weeks",
      "imageUrl": "cloudinary-cdn-url"
    }
  ]
}
```

---

## 7. PERFORMANCE TARGETS

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse, Web Vitals |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Lighthouse Score (Mobile) | 90+ | Lighthouse |
| API response time (/api/inquiry) | < 500ms | CloudWatch/Vercel Analytics |
| Email delivery time | < 2min | Nodemailer logs |
| Form load time (on 4G) | < 3s | Lighthouse mobile simulation |
| Bundle size (JS) | < 150KB (gzipped) | Webpack Bundle Analyzer |
| Time to First Byte (TTFB) | < 200ms | Cloudflare Analytics |

### Optimization Strategy
- **Static Generation (SSG)**: Product specs, capacity pages (revalidate hourly)
- **Image Optimization**: Cloudinary auto-resize, WebP conversion, lazy loading
- **Code Splitting**: Form, timeline components load on-demand
- **Caching**: CDN cache-control headers, browser cache 1-year for assets
- **Minification**: Automated via Next.js build
- **Critical CSS**: Inline above-fold styles

---

## 8. SECURITY & COMPLIANCE

| Concern | Mitigation |
|---------|-----------|
| **Form Spam** | CAPTCHA (Cloudflare Turnstile, free tier) on inquiry form |
| **CSRF Attacks** | Next.js built-in CSRF protection via secure cookies |
| **Data Validation** | Zod schema validation on all inputs |
| **Email Security** | SPF, DKIM, DMARC records for nodemailer SMTP relay |
| **PII Protection** | Inquiry data encrypted in Supabase; encrypted at-rest |
| **GDPR/India Compliance** | Privacy policy + consent checkboxes; data retention 24-month policy |
| **SSL/TLS** | A+ SSL rating via Cloudflare; HTTPS enforced |
| **Rate Limiting** | 10 inquiries/minute per IP via Vercel middleware |
| **DDoS Protection** | Cloudflare DDoS shield (standard tier) |

---

## 9. DEPLOYMENT PIPELINE

### Local Development
```bash
# Setup
git clone [repo]
npm install
cp .env.example .env.local

# Configure (SMTP, Sanity, Pipedrive keys)
# Edit .env.local

# Run
npm run dev
# http://localhost:3000
```

### Staging (Pre-launch testing)
```
GitHub Push → Vercel Auto-Deploy → Staging URL
├─ Build test (5min)
├─ Smoke test automation (form, email, CRM)
├─ Manual QA (all segments, mobile)
└─ Performance audit (Lighthouse, Web Vitals)
```

### Production (Live)
```
Merge to main → Vercel Production Deploy → CDN Propagate
├─ Zero-downtime deployment (automatic)
├─ Monitoring activated (Sentry, GA4)
├─ Slack alert to sales team (launch confirmation)
└─ Traffic monitoring (first 6 hours)
```

---

## 10. MONITORING & OBSERVABILITY

### Sentry Configuration
```javascript
// Error tracking + performance monitoring
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of traffic
  release: process.env.VERCEL_GIT_COMMIT_SHA,
});
```

### GA4 Events
```javascript
// Custom event tracking
gtag('event', 'inquiry_form_submitted', {
  segment: 'distributor',
  form_completion_time: 120,
  num_fields: 8,
  error_count: 0,
});

gtag('event', 'product_spec_download', {
  product_type: 'tmt_bar',
  buyer_segment: 'contractor',
});
```

### Alerting Rules
- ❌ Form submission failure rate > 10% → Slack alert
- ❌ CRM sync failure → Immediate Slack + on-call
- ❌ Email delivery failure → Slack + retry queue
- ⚠️ API response time > 1s (P95) → Daily digest
- ⚠️ Lighthouse score drop < 85 → Weekly review

---

## 11. TESTING STRATEGY

### Unit Tests (Zod schemas, utilities)
```bash
npm run test:unit
# Files: api/inquiry.test.js, lib/validators.test.js
```

### Integration Tests (API + CRM + Email)
```bash
npm run test:integration
# Covers: form submission → email → CRM routing
```

### E2E Tests (Cypress)
```bash
npm run test:e2e
# Test scenarios:
# 1. Distributor inquiry flow
# 2. Contractor form + download spec sheet
# 3. Mobile form submission (4G simulation)
```

### Performance Benchmarks
```bash
npm run lighthouse
# Target: 90+ score on all pages
```

---

## 12. MAINTENANCE & UPDATES

### Weekly
- [ ] Sentry error review (fix critical issues)
- [ ] GA4 segment flow analysis (form abandonment hotspots)
- [ ] CRM sync verification (100% lead ingestion)

### Monthly
- [ ] Hotjar heatmap review (update CTA copy if <30% click rate)
- [ ] Lighthouse audit (maintain 90+ score)
- [ ] Email delivery report (bounce rates, spam filtering)
- [ ] Database cleanup (archive old inquiries, backup)

### Quarterly
- [ ] Security audit (dependencies, SSL cert renewal)
- [ ] Content refresh (capacity updates, new products, pricing changes)
- [ ] A/B test results analysis (deploy winning variants)
- [ ] Infrastructure scaling (if traffic exceeds 10K/month)

---

## 13. SCALABILITY ROADMAP

**Phase 1 (Current)**: Vercel serverless + CMS + Supabase (supports 10K requests/month)  
**Phase 2 (Q2 FY28)**: If 50K+ inquiries/month → Dedicated CRM + marketing automation platform (HubSpot)  
**Phase 3 (Q4 FY28)**: If 100K+ inquiries/month → On-premise server + redundancy setup

---

## 14. COST BREAKDOWN (Estimated Annual)

| Component | Tier | Cost/Year |
|-----------|------|----------|
| Vercel (Next.js hosting) | Pro | $20/month = $240 |
| Sanity CMS | Starter | Free–$99/month = $1,188 |
| Cloudinary (images) | Free | $0 |
| Supabase (database) | Free | $0–$25/month = $300 |
| Cloudflare DNS | Free | $0 |
| Sentry monitoring | Startup | $29/month = $348 |
| GA4 + Hotjar | Free + $39/month | $468 |
| SMTP (Nodemailer relay) | SendGrid Free tier | $0 (free up to 100 emails/day; paid after) |
| Pipedrive CRM | Starter | $12/month = $144 |
| SSL/TLS | Auto via Vercel | $0 |
| **Total** | | **~$2,688/year** |

---

## 15. TIMELINE

| Week | Milestone | Deliverables |
|------|-----------|--------------|
| 1 | Design + CMS Setup | Wireframes approved, Sanity data model finalized |
| 2 | Frontend Build Phase 1 | Hero, products, timeline components |
| 3 | Frontend Build Phase 2 + Testing | Inquiry form, integrations, mobile responsive |
| 4 | QA + Launch Prep | Performance audit, security review, monitoring setup |
| 5+ | Post-Launch Ops | Monitoring, optimization, continuous deployment |

---

**TDR Approval**: [Pending Engineering Lead Review]  
**Next Step**: Finalize environment configs → Begin Phase 1 development
