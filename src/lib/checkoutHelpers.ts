// lib/checkoutHelpers.ts
// Reads the "patient" cookie, builds the payload, and calls the checkout APIs

/**
 * Parses the "patient" cookie and returns patient data.
 * Cookie is expected to be a JSON string.
 */
export function getPatientFromCookie(): {
  patient_id: string;
  name: string;
  email: string;
} | null {
  try {
    const cookies = document.cookie.split(";").reduce(
      (acc, cookie) => {
        const [key, val] = cookie.trim().split("=");
        acc[key] = decodeURIComponent(val);
        return acc;
      },
      {} as Record<string, string>,
    );

    if (!cookies["patient"]) return null;

    const patient = JSON.parse(cookies["patient"]);
    return patient;
  } catch (err) {
    console.error("Failed to parse patient cookie:", err);
    return null;
  }
}

// ─────────────────────────────────────────────
// ✅ SUBSCRIPTION CHECKOUT
// ─────────────────────────────────────────────
export const SubscriptionCheckout = async (
  planId: string,
  planName: string,
  planPrice: number,
  patientId: string,
  patientName: string,
  patientEmail: string,
) => {
  if (!patientEmail) {
    console.error("No patient session found. Cannot proceed to checkout.");
    alert("Your session has expired. Please log in again.");
    return;
  }

  const payload = {
    planId,
    planName,
    planPrice,
    patientId,
    patientName,
    patientEmail,
  };

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Subscription checkout data:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "No URL returned from checkout");
    }
  } catch (error) {
    console.error("Subscription checkout failed:", error);
    alert("Something went wrong. Please try again.");
  }
};

// ─────────────────────────────────────────────
// ✅ SERVICE BOOKING CHECKOUT
// ─────────────────────────────────────────────
export const ServiceCheckout = async (
  patientName: string,
  patientEmail: string,
  patientId?: string,
) => {
  if (!patientEmail) {
    console.error("No patient email provided. Cannot proceed to checkout.");
    alert("Something went wrong. Please make sure you're logged in.");
    return;
  }

  const payload = {
    patientId: patientId || "",
    patientName,
    patientEmail,
  };

  try {
    const response = await fetch("/api/service-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Service checkout data:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "No URL returned from checkout");
    }
  } catch (error) {
    console.error("Service checkout failed:", error);
    alert("Something went wrong. Please try again.");
  }
};