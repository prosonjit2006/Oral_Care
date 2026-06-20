// api/checkout.js
import Stripe from "stripe";
import { Client, TablesDB, ID } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new TablesDB(appwriteClient);

console.log({
  endpoint: process.env.APPWRITE_ENDPOINT,
  projectId: process.env.APPWRITE_PROJECT_ID,
  databaseId: process.env.APPWRITE_DATABASE_ID,
  hasApiKey: !!process.env.APPWRITE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const {
      planId,
      planName,
      planPrice,
      patientId,
      patientName,
      patientEmail,
    } = req.body;

    console.log("patient email", patientEmail);

    if (!patientEmail) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Missing patientEmail — session expired",
        });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: patientEmail,
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
        patientId: patientId || "",
        patientName: patientName || "",
        patientEmail,
        planId: planId || "",
        planName,
        planPrice: String(planPrice),
      },
      success_url: `https://oral-care-tau.vercel.app/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://oral-care-tau.vercel.app/payment",
    });

    const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // ✅ Write to bookingHistory using TablesDB (matches your actual table)
    await tablesDB.createRow({
      databaseId: process.env.APPWRITE_DATABASE_ID,
      tableId: "bookingHistory",
      rowId: ID.unique(),
      data: {
        invoice_id: invoiceId,
        stripe_session_id: session.id,
        patient_name: patientName || "",
        patient_email: patientEmail,
        item_name: planName,
        item_type: "subscription",
        amount: String(planPrice),
        payment_status: "pending",
        payment_method: "",
        card_brand: "",
        card_last4: "",
        interval: "one-time",
        patient_id: patientId || "",
      },
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Checkout ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
