// Forwards a notification to the Formspree form set in FORMSPREE_ENDPOINT
// (the same service the contact form uses), which emails it to me. Never
// throws: a failed notification must not fail the request that triggered it.
export const notifyByFormspree = async (fields: Record<string, string | number | undefined>) => {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    console.warn("FORMSPREE_ENDPOINT is not set — email notification skipped");
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) console.error(`Formspree notification failed (${res.status}): ${await res.text()}`);
  } catch (err) {
    console.error("Formspree notification failed", err);
  }
};
