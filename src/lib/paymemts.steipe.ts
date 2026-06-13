export const checkout = async (
  planId: string,
  planName: string,
  planPrice: number,
) => {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, planName, planPrice }),
    });

    const data = await response.json();
    console.log("Checkout data:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "No URL returned");
    }
  } catch (error) {
    console.error("Checkout failed:", error);
  }
};
