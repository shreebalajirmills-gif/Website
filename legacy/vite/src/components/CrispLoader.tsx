import React, { useEffect } from "react";

type CrispLoaderProps = {
  websiteId: string; // Crisp website ID, e.g. "abcd-1234-efgh-5678"
};

// Component to inject Crisp chat snippet. Place at top-level (e.g., in App or layout).
export default function CrispLoader({ websiteId }: CrispLoaderProps) {
  useEffect(() => {
    if (!websiteId) return;
    if (typeof window === "undefined") return;

    // If Crisp already loaded, ensure website id matches
    // @ts-ignore
    if (window.$crisp) return;

    // @ts-ignore
    window.$crisp = [];
    // @ts-ignore
    window.CRISP_WEBSITE_ID = websiteId;

    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    d.body.appendChild(s);

    return () => {
      // We do not remove the script on unmount to avoid breaking chat if other components rely on it.
    };
  }, [websiteId]);

  return null;
}
