export const serviceCheckout = async () => {
  try {
    const response = await fetch("/api/service-checkout", {
      method: "POST",
    });

    const data = await response.json();
    console.log("Service checkout data:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || "No URL returned");
    }
  } catch (error) {
    console.error("Service checkout failed:", error);
  }
};
