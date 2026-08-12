import React, { useEffect, useMemo, useRef, useState } from "react";

type Segment =
  | "distributor"
  | "contractor"
  | "infrastructure"
  | "partnership";

export type FormData = {
  segment?: Segment;
  companyName?: string;
  businessLocation?: string;
  currentSuppliers?: string[];
  annualVolumes?: number | "";
  growthAspiration?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  consentUpdates?: boolean;
  consentPrivacy?: boolean;
};

type Props = {
  onSubmit?: (data: FormData) => Promise<void> | void;
  onSegmentChange?: (segment: Segment) => void;
  initialSegment?: Segment;
};

// Utility validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,15}$/; // lenient international
// Turnstile site key from Vite env (VITE_TURNSTILE_SITEKEY). Leave empty to keep demo mode.
const TURNSTILE_SITEKEY = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_TURNSTILE_SITEKEY) || "";

export default function InquiryForm({
  onSubmit,
  onSegmentChange,
  initialSegment,
}: Props) {
  const [step, setStep] = useState<number>(1);
  const [segment, setSegment] = useState<Segment | undefined>(initialSegment);
  const [form, setForm] = useState<FormData>({
    segment: initialSegment,
    companyName: "",
    businessLocation: "",
    currentSuppliers: [],
    annualVolumes: "",
    growthAspiration: "",
    contactName: "",
    email: "",
    phone: "",
    consentUpdates: false,
    consentPrivacy: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { id: string; email?: string }>(null);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const firstInvalidRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (segment) {
      setForm((s) => ({ ...s, segment }));
      onSegmentChange?.(segment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

  // Derived validation
  const validations = useMemo(() => {
    return {
      segment: !!form.segment,
      companyName: !!(form.companyName && String(form.companyName).trim().length > 1),
      businessLocation: !!(form.businessLocation && String(form.businessLocation).trim()),
      annualVolumes:
        form.annualVolumes !== "" && form.annualVolumes !== undefined && !isNaN(Number(form.annualVolumes)),
      growthAspiration: !!form.growthAspiration,
      contactName: !!(form.contactName && String(form.contactName).trim()),
      email: !!(form.email && emailRegex.test(String(form.email).trim())),
      phone: !!(form.phone && phoneRegex.test(String(form.phone).replace(/[\s\-()]/g, ""))),
      consentPrivacy: !!form.consentPrivacy,
      captcha: captchaPassed,
    };
  }, [form, captchaPassed]);

  const allValidForSubmit = useMemo(() => {
    return (
      validations.segment &&
      validations.companyName &&
      validations.businessLocation &&
      validations.annualVolumes &&
      validations.growthAspiration &&
      validations.contactName &&
      validations.email &&
      validations.phone &&
      validations.consentPrivacy &&
      validations.captcha
    );
  }, [validations]);

  // Helpers
  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setTouched((t) => ({ ...t, [String(key)]: true }));
  }

  function focusFirstInvalid() {
    // Find first invalid field and focus
    const order = [
      "segment",
      "companyName",
      "businessLocation",
      "annualVolumes",
      "growthAspiration",
      "contactName",
      "email",
      "phone",
      "consentPrivacy",
    ];
    for (const key of order) {
      // @ts-ignore
      if (!validations[key]) {
        const el = document.querySelector<HTMLElement>(`[data-field="${key}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus?.();
          return;
        }
      }
    }
  }

  // Turnstile loader (lazy, after user interaction)
  const turnstileWidgetId = useRef<number | null>(null);
  function loadTurnstile() {
    if (captchaLoaded) return;
    // append script
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      setCaptchaLoaded(true);
      // If we have a sitekey, try to render immediately
      try {
        const sitekey = TURNSTILE_SITEKEY;
        if (sitekey && (window as any).turnstile) {
          // render into #cf-turnstile
          turnstileWidgetId.current = (window as any).turnstile.render("cf-turnstile", {
            sitekey,
            callback: (token: string) => {
              // token can be sent to server for verification
              setCaptchaPassed(true);
              setCaptchaToken(token);
            },
            "error-callback": () => { setCaptchaPassed(false); setCaptchaToken(null); },
            "expired-callback": () => { setCaptchaPassed(false); setCaptchaToken(null); },
          });
        }
      } catch (err) {
        // best-effort
        console.warn("Turnstile render failed:", err);
      }
    };
    document.body.appendChild(s);
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setTouched((t) => {
      const next: Record<string, boolean> = { ...t };
      Object.keys(validations).forEach((k) => (next[k] = true));
      return next;
    });
    if (!allValidForSubmit) {
      setErrorMessage("Please fix the errors highlighted below.");
      focusFirstInvalid();
      return;
    }
    setErrorMessage(null);
    setSubmitting(true);
    try {
      // Build payload
      const payload = { ...form, captchaToken };
      // Call consumer onSubmit if provided
      if (onSubmit) {
        await onSubmit(payload);
      }
      // Also POST to /api/inquiry
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let id = `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-` + String(Math.floor(Math.random() * 9000 + 1000));
      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json && json.inquiryId) id = json.inquiryId;
      }
      setSubmitted({ id, email: String(form.email || "") });
      setStep(5); // success screen
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to submit. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  // small UI bits
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Animation classes
  const stepClass = "slide-in-up";

  return (
    <div className="inquiry-form-container" style={{ maxWidth: 760, margin: "0 auto" }}>
      <style>{`
        .liquid-glass-prominent { background: rgba(255,255,255,0.8); backdrop-filter: blur(6px); border-radius:12px; padding:18px; }
        .glass-input{ background:transparent; border:1px solid rgba(15,23,42,0.06); padding:12px 14px; border-radius:8px; width:100%; }
        .glass-select{ min-height:44px; padding:8px; border-radius:8px; border:1px solid rgba(15,23,42,0.06); }
        .glass-checkbox{ transform: translateY(2px); }
        .btn-primary{ background:#0369a1; color:white; padding:10px 16px; border-radius:8px; min-height:44px }
        .btn-secondary{ background:transparent; border:1px solid #e6eef6; padding:10px 14px; border-radius:8px; min-height:44px }
        .text-trust{ color:#059669 }
        .text-secondary{ color: #475569 }
        .glass-pill{ display:inline-block; padding:6px 10px; border-radius:999px; background: rgba(5,150,105,0.08); color:#065f46 }
        .step-indicator{ display:flex; align-items:center; gap:12px; font-weight:600; color:#0f172a }

        /* animations */
        .fade-out { animation: fadeOut 0.2s forwards }
        .slide-in-up { animation: slideInUp 0.3s forwards }
        @keyframes slideInUp { from { opacity:0; transform: translateY(12px) } to { opacity:1; transform: translateY(0) } }
        @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }

        /* validation icons */
        .valid-icon{ color: #16a34a; margin-left:8px; transform-origin:center; animation: checkScale 0.4s cubic-bezier(.34,1.56,.64,1) }
        .invalid-icon{ color: #ef4444; margin-left:8px }
        @keyframes checkScale { from { transform: scale(0) } to { transform: scale(1) } }

        .error-text{ color:#ea580c; margin-top:6px; font-size:0.95rem }

        /* mobile pill segments */
        .segment-pill{ padding:10px 12px; border-radius:999px; border:1px solid #e2e8f0; min-width:120px; text-align:center }
        .segment-pill.active{ outline:3px solid rgba(2,132,199,0.12) }

        /* focus ring for accessibility */
        button:focus, input:focus, select:focus, textarea:focus { outline:3px solid rgba(2,132,199,0.16); }

        /* small spinner */
        .spinner{ border:3px solid rgba(0,0,0,0.06); border-top-color: #0369a1; border-radius:50%; width:16px; height:16px; animation:spin 1s linear infinite; display:inline-block; vertical-align:middle; margin-right:8px }
        @keyframes spin{ to { transform: rotate(360deg) } }

      `}</style>

      <div className="liquid-glass-prominent">
        {step <= 4 && (
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="step-indicator">
              <div>Step</div>
              <div style={{ fontSize: 14 }}>{step} of 4</div>
            </div>
            <div style={{ width: 200, height: 8, background: "#e6eef6", borderRadius: 999 }}>
              <div
                style={{
                  width: `${(step / 4) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#0284c7,#059669)",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (segment) setStep(2);
              else {
                setTouched({ segment: true });
                focusFirstInvalid();
              }
            }}
            aria-labelledby="who-are-you-title"
          >
            <div className={stepClass}>
              <h3 id="who-are-you-title" style={{ color: "#0f172a", marginBottom: 12 }}>
                Who are you?
              </h3>

              {/* On mobile show pills */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {(["distributor", "contractor", "infrastructure", "partnership"] as Segment[]).map((s) => {
                  const label =
                    s === "distributor"
                      ? "I'm a Distributor/Dealer"
                      : s === "contractor"
                      ? "I'm a Contractor/Fabricator"
                      : s === "infrastructure"
                      ? "I'm a Large Infrastructure Project"
                      : "I'm Interested in Partnership/Investment";
                  const accent = s === "distributor" ? "#0284c7" : s === "contractor" ? "#d97706" : s === "infrastructure" ? "#059669" : "#b45309";
                  return (
                    <label
                      key={s}
                      data-field="segment"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        minWidth: isMobile ? undefined : 320,
                        cursor: "pointer",
                      }}
                    >
                      {isMobile ? (
                        <button
                          type="button"
                          onClick={() => setSegment(s)}
                          className={`segment-pill ${segment === s ? "active" : ""}`}
                          aria-pressed={segment === s}
                          style={{ borderColor: segment === s ? accent : undefined }}
                        >
                          {label}
                        </button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <input
                            type="radio"
                            name="segment"
                            checked={segment === s}
                            onChange={() => setSegment(s)}
                            aria-checked={segment === s}
                            style={{ accentColor: accent }}
                          />
                          <span>{label}</span>
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>

              {touched.segment && !validations.segment && (
                <div className="error-text" role="alert">
                  Please select a buyer segment
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18, gap: 8 }}>
                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={!segment}
                  aria-disabled={!segment}
                >
                  Next →
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2 & 3: Segment-specific (we'll provide Distributor example; for other segments the fields are the same structure) */}
        {(step === 2 || step === 3) && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // simple flow: move to next step
              setStep((s) => Math.min(4, s + 1));
            }}
            aria-labelledby="segment-fields-title"
          >
            <div className={stepClass}>
              <h4 id="segment-fields-title" style={{ marginBottom: 12 }}>
                {segment === "distributor" ? "Distributor / Dealer Details" : "Tell us more about your business"}
              </h4>

              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label htmlFor="companyName">Company Name *</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      id="companyName"
                      data-field="companyName"
                      className="glass-input"
                      placeholder="ABC Steel Distributors"
                      value={form.companyName as string}
                      onChange={(e) => update("companyName", e.target.value)}
                    />
                    {touched.companyName &&
                      (validations.companyName ? (
                        <span className="valid-icon" aria-hidden>✓</span>
                      ) : (
                        <span className="invalid-icon" aria-hidden>✕</span>
                      ))}
                  </div>
                  {touched.companyName && !validations.companyName && (
                    <div className="error-text" role="alert" id="companyName-error">
                      Please enter your company name
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="businessLocation">Business Location *</label>
                  <input
                    id="businessLocation"
                    data-field="businessLocation"
                    className="glass-input"
                    placeholder="Delhi NCR, Haryana, etc."
                    value={form.businessLocation as string}
                    onChange={(e) => update("businessLocation", e.target.value)}
                    list="location-suggestions"
                  />
                  <datalist id="location-suggestions">
                    <option value="Delhi NCR" />
                    <option value="Haryana" />
                    <option value="Rajasthan" />
                    <option value="Gujarat" />
                    <option value="Maharashtra" />
                  </datalist>
                  {touched.businessLocation && !validations.businessLocation && (
                    <div className="error-text" role="alert">
                      Please enter your business location
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="currentSuppliers">Current Suppliers (0-3)</label>
                  <input
                    id="currentSuppliers"
                    className="glass-input"
                    placeholder="Start typing supplier name and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && form.currentSuppliers && form.currentSuppliers.length < 3) {
                          update("currentSuppliers", [...form.currentSuppliers, val]);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                  <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(form.currentSuppliers || []).map((s, i) => (
                      <span key={i} className="glass-pill">
                        {s}
                        <button
                          aria-label={`Remove ${s}`}
                          onClick={() => update("currentSuppliers", (form.currentSuppliers || []).filter((_, idx) => idx !== i))}
                          style={{ marginLeft: 8, background: "transparent", border: "none", cursor: "pointer" }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="annualVolumes">Annual Volumes (MT) *</label>
                  <input
                    id="annualVolumes"
                    data-field="annualVolumes"
                    className="glass-input"
                    type="number"
                    placeholder="0"
                    value={form.annualVolumes as number | string}
                    onChange={(e) => update("annualVolumes", e.target.value === "" ? "" : Number(e.target.value))}
                  />
                  {touched.annualVolumes && !validations.annualVolumes && (
                    <div className="error-text" role="alert">
                      Please enter an annual volume in MT
                    </div>
                  )}
                </div>

                <fieldset>
                  <legend>Growth Aspirations (FY28) *</legend>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label>
                      <input
                        type="radio"
                        name="growth"
                        checked={form.growthAspiration === "maintain"}
                        onChange={() => update("growthAspiration", "maintain")}
                      />
                      <span style={{ marginLeft: 8 }}>Maintain current volume</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="growth"
                        checked={form.growthAspiration === "grow-20-50"}
                        onChange={() => update("growthAspiration", "grow-20-50")}
                      />
                      <span style={{ marginLeft: 8 }}>Grow 20–50%</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="growth"
                        checked={form.growthAspiration === "grow-50-plus"}
                        onChange={() => update("growthAspiration", "grow-50-plus")}
                        style={{ accentColor: "#d97706" }}
                      />
                      <span style={{ marginLeft: 8, color: "#b45309" }}>Grow 50%+</span>
                    </label>
                  </div>
                  {touched.growthAspiration && !validations.growthAspiration && (
                    <div className="error-text" role="alert">
                      Please indicate your growth aspiration
                    </div>
                  )}
                </fieldset>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                  >
                    ← Back
                  </button>

                  <button type="submit" className="btn-primary">
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* STEP 4: Contact & Confirmation */}
        {step === 4 && (
          <form
            onSubmit={async (e) => {
              await handleSubmit(e);
            }}
            aria-labelledby="contact-title"
          >
            <div className={stepClass}>
              <h4 id="contact-title" style={{ marginBottom: 12 }}>
                Contact & Confirmation
              </h4>

              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label htmlFor="contactName">Contact Name *</label>
                  <input
                    id="contactName"
                    data-field="contactName"
                    className="glass-input"
                    placeholder="Vikram Sharma"
                    value={form.contactName as string}
                    onChange={(e) => update("contactName", e.target.value)}
                  />
                  {touched.contactName && !validations.contactName && (
                    <div className="error-text" role="alert">
                      Please enter contact name
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    data-field="email"
                    className="glass-input"
                    type="email"
                    placeholder="name@company.com"
                    value={form.email as string}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    aria-describedby={touched.email && !validations.email ? "email-error" : undefined}
                  />
                  {touched.email && (validations.email ? <span className="valid-icon">✓</span> : <span className="invalid-icon">✕</span>)}
                  {touched.email && !validations.email && (
                    <div className="error-text" role="alert" id="email-error">
                      Please enter a valid email address
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="phone">Phone (WhatsApp preferred) *</label>
                  <input
                    id="phone"
                    data-field="phone"
                    className="glass-input"
                    type="tel"
                    placeholder="+91-XX-XXXX-XXXX"
                    value={form.phone as string}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                  {touched.phone && (validations.phone ? <span className="valid-icon">✓</span> : <span className="invalid-icon">✕</span>)}
                  {touched.phone && !validations.phone && (
                    <div className="error-text" role="alert">
                      Please enter a valid phone number
                    </div>
                  )}
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!form.consentUpdates}
                      onChange={(e) => update("consentUpdates", e.target.checked)}
                      className="glass-checkbox"
                    />
                    <span style={{ marginLeft: 8 }}>I agree to receive updates about supply partnerships</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!form.consentPrivacy}
                      onChange={(e) => update("consentPrivacy", e.target.checked)}
                      data-field="consentPrivacy"
                      aria-describedby={!validations.consentPrivacy ? "privacy-error" : undefined}
                    />
                    <span style={{ marginLeft: 8 }}>I agree to the Privacy Policy *</span>
                  </label>
                  {touched.consentPrivacy && !validations.consentPrivacy && (
                    <div className="error-text" role="alert" id="privacy-error">
                      You must agree to the privacy policy
                    </div>
                  )}
                </div>

                <div>
                  <label>Verification</label>
                  <div>
                    {!captchaLoaded ? (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => loadTurnstile()}
                        aria-describedby={!captchaPassed ? "captcha-error" : undefined}
                      >
                        Click to verify (Turnstile)
                      </button>
                    ) : (
                      <div>
                        <div id="cf-turnstile" style={{ marginTop: 8 }}>
                          {TURNSTILE_SITEKEY ? (
                            <em>Turnstile widget should render here.</em>
                          ) : (
                            <em>Turnstile script loaded. No site key configured — demo mode.</em>
                          )}
                        </div>
                        <div style={{ marginTop: 8 }}>
                          {!TURNSTILE_SITEKEY ? (
                            <button type="button" className="btn-primary" onClick={() => setCaptchaPassed(true)}>
                              Mark as verified (demo)
                            </button>
                          ) : (
                            <span style={{ fontSize: 13, color: '#475569' }}>Complete the verification in the widget above.</span>
                          )}
                        </div>
                      </div>
                    )}
                    {!captchaPassed && (
                      <div className="error-text" role="alert" id="captcha-error">
                        Verification required
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <button type="button" className="btn-secondary" onClick={() => setStep((s) => Math.max(2, s - 1))}>
                    ← Back
                  </button>

                  <button type="submit" className="btn-primary" disabled={!allValidForSubmit || submitting} aria-disabled={!allValidForSubmit || submitting}>
                    {submitting ? (
                      <>
                        <span className="spinner" aria-hidden /> Sending...
                      </>
                    ) : (
                      "Submit Form"
                    )}
                  </button>
                </div>

                {errorMessage && <div className="error-text" role="alert">{errorMessage}</div>}
              </div>
            </div>
          </form>
        )}

        {/* Success page */}
        {step === 5 && submitted && (
          <div className={"slide-in-up"} aria-live="polite">
            <h2 style={{ color: "#059669" }}>✓ Thank You!</h2>
            <p className="text-secondary">Your inquiry {submitted.id} has been submitted.</p>
            <p style={{ marginTop: 8 }}>
              A confirmation email has been sent to <span className="glass-pill">{submitted.email}</span>
            </p>

            <div style={{ marginTop: 16 }} className="liquid-glass-prominent">
              <p>Our Regional Sales Manager will contact you within 24h.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <a href="#" className="btn-secondary">Download capacity specs →</a>
                <a href="#" className="btn-secondary">View product certifications →</a>
                <a href="#" className="btn-secondary">Read partnership terms →</a>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <p>Questions? WhatsApp us → +91-XX-XXXX-XXXX</p>
            </div>

            <div style={{ marginTop: 12 }}>
              <button className="btn-secondary" onClick={() => (window.location.href = "/")}>Back to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
