// api/checkout.js — Subscription Checkout
import Stripe from "stripe";
import { Client, Databases, ID } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(appwriteClient);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Patient data passed from the frontend (read from "patient" cookie)
    const {
      planId,
      planName,
      planPrice,
      patientId,
      patientName,
      patientEmail,
    } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: patientEmail, // ✅ Pre-fills email in Stripe checkout
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
      metadata: {
        paymentType: "subscription",
        patientId,
        patientName,
        patientEmail,
        planId,
        planName,
        planPrice: String(planPrice),
      },
      success_url: `https://oral-care-tau.vercel.app/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://oral-care-tau.vercel.app/payment",
    });

    // ✅ Save initial payment record to Appwrite bookingHistory
    const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BOOKING_HISTORY_COLLECTION_ID,
      ID.unique(),
      {
        invoice_id: invoiceId,
        stripe_session_id: session.id,
        patient_name: patientName,
        patient_email: patientEmail,
        item_name: planName,
        item_type: "subscription",
        amount: String(planPrice),
        payment_status: "pending",
        payment_method: "",
        card_brand: "",
        card_last4: "",
        interval: "one-time",
        patient_id: patientId,
      },
    );

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Checkout ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
