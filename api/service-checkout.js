import Stripe from "stripe";
import { Client, TablesDB, ID } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new TablesDB(appwriteClient);

const BOOKING_FEE = 500; // ₹500 flat booking confirmation fee

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { patientId, patientName, patientEmail } = req.body;

    if (!patientEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Missing patientEmail" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: patientEmail,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Service Booking Confirmation Fee" },
            unit_amount: BOOKING_FEE * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        paymentType: "service-booking",
        patientId: patientId || "",
        patientName: patientName || "",
        patientEmail,
      },
      success_url: `https://oral-care-tau.vercel.app/service-payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://oral-care-tau.vercel.app/profile",
    });

    const invoiceId = `INV-SVC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await tablesDB.createRow({
      databaseId: process.env.APPWRITE_DATABASE_ID,
      tableId: "bookingHistory",
      rowId: ID.unique(),
      data: {
        invoice_id: invoiceId,
        stripe_session_id: session.id,
        patient_name: patientName || "",
        patient_email: patientEmail,
        item_name: "Service Booking Confirmation Fee",
        item_type: "service-booking",
        amount: String(BOOKING_FEE),
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
    console.error("Service checkout ERROR:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
