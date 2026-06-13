const Stripe = require("stripe");
const { Client, Databases } = require("node-appwrite");

module.exports = async ({ req, res }) => {
  try {
    console.log("Function started");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = JSON.parse(req.body);
    console.log("planId received:", body.planId);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const plan = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PLANS_COLLECTION_ID,
      body.planId,
    );
    console.log("Plan found:", plan.planname, plan.price);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.planname },
            unit_amount: Number(plan.price) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment",
    });

    console.log("Session created:", session.url);
    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("ERROR:", error.message);
    return res.json({ success: false, error: error.message });
  }
};
