import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { planName, planPrice } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: planName },
            unit_amount: Number(planPrice) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "https://oral-care-tau.vercel.app/paymentsuccess",
      cancel_url: "https://oral-care-tau.vercel.app/payment",
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
