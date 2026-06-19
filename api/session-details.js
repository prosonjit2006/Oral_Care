// api/session-details.js
import Stripe from "stripe";
import { Client, TablesDB, Query } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new TablesDB(appwriteClient);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;
  if (!session_id) {
    return res.status(400).json({ error: "session_id is required" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent.payment_method"],
    });

    let invoiceId = `INV-${Math.floor(Math.random() * 100000)}`;
    let interval = "one-time";

    try {
      const result = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID,
        tableId: "bookingHistory",
        queries: [Query.equal("stripe_session_id", session_id)],
      });

      if (result.rows.length > 0) {
        invoiceId = result.rows[0].invoice_id;
        interval = result.rows[0].interval || "one-time";
      }
    } catch (dbErr) {
      console.warn("Could not fetch Appwrite row:", dbErr.message);
    }

    const pi = session.payment_intent;
    const pm = pi?.payment_method;

    const metadata = session.metadata || {};

    return res.status(200).json({
      success: true,
      data: {
        invoiceId,
        stripeSessionId: session.id,
        customerName:
          metadata.patientName || session.customer_details?.name || "",
        customerEmail: metadata.patientEmail || session.customer_email || "",
        itemName: metadata.planName || "Service Booking Fee",
        itemType: metadata.paymentType || "service-booking",
        amount: session.amount_total / 100,
        currency: session.currency?.toUpperCase() || "INR",
        paymentStatus: session.payment_status,
        paymentMethod: pm?.type || "",
        cardBrand: pm?.card?.brand || "",
        cardLast4: pm?.card?.last4 || "",
        interval,
        date: new Date(session.created * 1000).toISOString(),
        patientId: metadata.patientId || "",
      },
    });
  } catch (error) {
    console.error("Session details ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
