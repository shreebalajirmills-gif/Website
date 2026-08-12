import React from "react";
import InquiryForm from "../components/InquiryForm";

export default function InquiryPage() {
  async function handleSubmit(data: any) {
    // This handler gets called before/after the component posts to /api/inquiry
    console.log("onSubmit prop received data:", data);
    // Example: add client-side analytics or enrichment here.
  }

  function handleSegmentChange(segment: any) {
    console.log("Segment changed:", segment);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Inquiry</h1>
      <InquiryForm onSubmit={handleSubmit} onSegmentChange={handleSegmentChange} />
    </main>
  );
}
