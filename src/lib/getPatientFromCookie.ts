// lib/getPatientFromCookie.ts
export function getPatientFromCookie() {
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("patient="));

    if (!match) return null;

    const raw = decodeURIComponent(match.split("=").slice(1).join("="));
    const patient = JSON.parse(raw);

    if (!patient?.email) return null; // guard against partial cookie data
    return patient;
  } catch (err) {
    console.error("Failed to parse patient cookie:", err);
    return null;
  }
}
