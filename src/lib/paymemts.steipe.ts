import { account, functions } from "./Appwrite.config";

export const checkout = async (planId: string) => {
  try {
    // Ensure user session exists
    try {
      await account.get();
    } catch {
      await account.createAnonymousSession();
    }

    // 1. Trigger async execution
    const execution = await functions.createExecution(
      import.meta.env.VITE_APPWRITE_FUNCTION_ID,
      JSON.stringify({ planId }),
      true, // async
    );

    console.log("Execution started:", execution.$id);

    // 2. Poll with a max retry limit
    const MAX_RETRIES = 15;
    const INTERVAL_MS = 2000; // poll every 2 seconds

    for (let i = 0; i < MAX_RETRIES; i++) {
      await new Promise((r) => setTimeout(r, INTERVAL_MS));

      const result = await functions.getExecution(
        import.meta.env.VITE_APPWRITE_FUNCTION_ID,
        execution.$id,
      );

      console.log(`Poll ${i + 1}: status = ${result.status}`);

      if (result.status === "completed") {
        if (!result.responseBody) throw new Error("Empty response");
        const data = JSON.parse(result.responseBody);
        console.log("Checkout data:", data);
        if (data.url) {
          window.location.href = data.url; // ✅ redirect to Stripe
        } else {
          throw new Error(data.error || "No URL returned");
        }
        return;
      }

      if (result.status === "failed") {
        console.error("Function failed:", result.errors);
        throw new Error("Function execution failed");
      }
    }

    throw new Error("Checkout timed out after 30 seconds");
  } catch (error) {
    console.error("Checkout failed:", error);
  }
};
