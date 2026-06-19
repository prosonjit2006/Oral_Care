// api/session-details.js — Fetches Stripe session data for the success page
import Stripe from "stripe";
import { Client, Databases, Query } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(appwriteClient);

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

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent.payment_method"],
    });

    // Fetch the matching Appwrite record to get invoice_id
    let invoiceId = `INV-${Math.floor(Math.random() * 100000)}`;
    let interval = "one-time";

    try {
      const result = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_BOOKING_HISTORY_COLLECTION_ID,
        [Query.equal("stripe_session_id", session_id)],
      );

      if (result.documents.length > 0) {
        invoiceId = result.documents[0].invoice_id;
        interval = result.documents[0].interval || "one-time";
      }
    } catch (dbErr) {
      console.warn("Could not fetch Appwrite record:", dbErr.message);
    }

    // Extract card details if available
    const pi = session.payment_intent;
    const pm = pi?.payment_method;
    const cardBrand = pm?.card?.brand || "";
    const cardLast4 = pm?.card?.last4 || "";
    const paymentMethod = pm?.type || "";

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
        paymentMethod,
        cardBrand,
        cardLast4,
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
