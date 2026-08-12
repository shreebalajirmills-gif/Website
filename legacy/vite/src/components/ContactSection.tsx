import React, { useEffect, useMemo, useRef, useState } from "react";
import './ContactSection.module.css';

type Props = {
  chatEnabled?: boolean;
  whatsappNumber?: string; // in international format, e.g. "919812345678"
  phoneNumber?: string; // e.g. "+911244604500"
  email?: string;
  businessHours?: string;
};

const defaultPrefillMessage =
  "Hi Shree Balaji! 👋 I'm interested in:%0AProduct:%20___%0AVolume:%20___%0ADelivery:%20___%0ACan%20you%20confirm%20availability?";

const ContactSection: React.FC<Props> = ({
  chatEnabled = true,
  whatsappNumber = "919999999999",
  phoneNumber = "+91-124-4604-500",
  email = "inquiry@shreebalajicom",
  businessHours = "Mon–Sat, 9 AM–6 PM IST",
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState<Record<number, boolean>>({});
  const [nowAvailable, setNowAvailable] = useState<boolean>(false);

  // Determine business-hours for live chat (basic IST check)
  useEffect(() => {
    function checkBusinessHoursIST() {
      try {
        const now = new Date();
        const parts = now.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short",
        });
        const [weekdayRaw, timeRaw] = parts.split(",").map((s) => s.trim());
        const hour = Number(timeRaw.split(":")[0]);
        // Business hours: Mon–Sat 9–18 (inclusive start, exclusive end at 18:00)
        const weekday = weekdayRaw.toLowerCase();
        const isSunday = weekday === "sun";
        const withinHours = hour >= 9 && hour < 18;
        return !isSunday && withinHours;
      } catch (err) {
        return true;
      }
    }

    setNowAvailable(checkBusinessHoursIST());

    const t = setInterval(() => {
      setNowAvailable(checkBusinessHoursIST());
    }, 60_000);

    return () => clearInterval(t);
  }, []);

  // Intersection observer to add slide-in stagger
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const cards = Array.from(node.querySelectorAll<HTMLElement>(".contact-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx") || -1);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setInView((s) => ({ ...s, [idx]: true }));
            }, idx * 100);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const openChat = () => {
    if (!chatEnabled) return;
    if (typeof window !== "undefined") {
      // Crisp
      // @ts-ignore
      if (window.$crisp && Array.isArray(window.$crisp.push)) {
        // @ts-ignore
        window.$crisp.push(["do", "chat:open"]);
        return;
      }
      // Intercom fallback
      // @ts-ignore
      if (window.Intercom) {
        // @ts-ignore
        window.Intercom("show");
        return;
      }
    }
    // fallback to mail
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      "Live chat request"
    )}&body=${encodeURIComponent("Please connect me with live chat.")}`;
  };

  const whatsappHref = useMemo(() => {
    const number = whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${number}?text=${defaultPrefillMessage}`;
  }, [whatsappNumber]);

  const telHref = useMemo(() => {
    const n = phoneNumber.replace(/[^\d+]/g, "");
    return `tel:${n}`;
  }, [phoneNumber]);

  const mailHref = `mailto:${email}`;

  return (
    <section
      ref={containerRef}
      aria-labelledby="contact-section-title"
      className="contact-section"
    >
      <header style={{ marginBottom: "1.25rem" }}>
        <h2 id="contact-section-title" className="section-title">
          GET IN TOUCH
        </h2>
        <h3 className="section-subtitle">Multiple Ways to Reach Us</h3>
      </header>

      <div className="grid">
        {/* Card 1: Live Chat */}
        <article
          className={`contact-card liquid-glass-prominent data-type-chat ${inView[0] ? "in-view" : ""}`}
          data-idx={0}
          data-type="chat"
          aria-labelledby="live-chat-title"
          role="article"
        >
          <div className="card-top">
            <div className="icon">💬</div>
            <div>
              <h4 id="live-chat-title" className="card-title">
                LIVE CHAT
              </h4>
              <p className="card-desc">Quick questions?</p>
            </div>
          </div>

          <div className="card-body">
            <p className="text-muted small">Response: 15–30 min</p>
            <p className="text-dim small">(9 AM–6 PM IST)</p>

            <div className="status-row">
              <span className={`glass-pill ${nowAvailable ? "badge-success" : "badge-warning"}`}>
                {nowAvailable ? "Available now" : "Offline"}
              </span>
              <button
                className="btn btn-secondary start-chat"
                onClick={openChat}
                disabled={!chatEnabled || !nowAvailable}
                aria-disabled={!chatEnabled || !nowAvailable}
                aria-label="Start chat"
              >
                Start Chat
              </button>
            </div>
          </div>
        </article>

        {/* Card 2: WhatsApp */}
        <article
          className={`contact-card liquid-glass-prominent data-type-whatsapp ${inView[1] ? "in-view" : ""}`}
          data-idx={1}
          data-type="whatsapp"
          aria-labelledby="whatsapp-title"
          role="article"
        >
          <div className="card-top">
            <div className="icon">📱</div>
            <div>
              <h4 id="whatsapp-title" className="card-title">
                WHATSAPP
              </h4>
              <p className="card-desc">Urgent delivery needs?</p>
            </div>
          </div>

          <div className="card-body">
            <p className="text-muted small">Response: 1–2 hours</p>
            <p className="text-dim small">(Available 24/7)</p>

            <div className="status-row">
              <a
                className="btn btn-secondary whatsapp-btn"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </article>

        {/* Card 3: Phone */}
        <article
          className={`contact-card liquid-glass-prominent data-type-phone ${inView[2] ? "in-view" : ""}`}
          data-idx={2}
          data-type="phone"
          aria-labelledby="phone-title"
          role="article"
        >
          <div className="card-top">
            <div className="icon">☎️</div>
            <div>
              <h4 id="phone-title" className="card-title">
                PHONE
              </h4>
              <p className="card-desc">Speak to our team</p>
            </div>
          </div>

          <div className="card-body">
            <p className="text-muted small">Response: Immediate</p>
            <p className="text-dim small">(Mon–Sat, 9 AM–6 PM)</p>

            <div className="phone-row">
              <a className="phone-number mono" href={telHref} aria-label={`Call ${phoneNumber}`}>
                {phoneNumber}
              </a>
              <p className="small">Ext: Sales (2) / Orders (1)</p>
            </div>

            <div className="status-row">
              <a className="btn btn-secondary" href={telHref} aria-label="Call us">
                Call us
              </a>
            </div>
          </div>
        </article>

        {/* Card 4: Email */}
        <article
          className={`contact-card liquid-glass-prominent data-type-email ${inView[3] ? "in-view" : ""}`}
          data-idx={3}
          data-type="email"
          aria-labelledby="email-title"
          role="article"
        >
          <div className="card-top">
            <div className="icon">📧</div>
            <div>
              <h4 id="email-title" className="card-title">
                EMAIL
              </h4>
              <p className="card-desc">Detailed inquiry?</p>
            </div>
          </div>

          <div className="card-body">
            <p className="text-muted small">Response: 24 hours</p>
            <p className="text-dim small">(Guaranteed response)</p>

            <div className="email-row">
              <a className="email-address mono link-blue" href={mailHref}>
                {email}
              </a>
            </div>

            <div className="status-row">
              <a className="btn btn-primary-secondary" href={mailHref} aria-label="Send email">
                Send Message
              </a>
            </div>
          </div>
        </article>
      </div>

      {/* Business Info Box */}
      <aside className="business-box liquid-glass" aria-labelledby="office-location-title" role="complementary">
        <div className="biz-left">
          <div className="loc-icon">📍</div>
          <div>
            <h4 id="office-location-title" className="card-title">
              OFFICE LOCATION
            </h4>
            <div className="biz-lines">
              <div className="company strong">Shree Balaji Rolling Mills</div>
              <div className="text-secondary">Factory: Bhiwari, Haryana</div>
              <div className="text-secondary">Head Office: Delhi NCR</div>
              <div className="text-muted small">Business Hours: {businessHours}</div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default ContactSection;
