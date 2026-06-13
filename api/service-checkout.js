import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Service Booking Fee" },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      metadata: { paymentType: "service-booking" },
      success_url: "https://oral-care-tau.vercel.app/service-payment-success",
      cancel_url: "https://oral-care-tau.vercel.app",
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
