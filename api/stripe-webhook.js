// api/stripe-webhook.js — Updates Appwrite record when Stripe confirms payment
import Stripe from "stripe";
import { Client, Databases, Query } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(appwriteClient);

export const config = {
  api: { bodyParser: false }, // Stripe needs the raw body
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(Buffer.from(data)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Fetch payment intent to get card details
      let paymentMethod = "";
      let cardBrand = "";
      let cardLast4 = "";

      if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent,
          { expand: ["payment_method"] },
        );

        const pm = paymentIntent.payment_method;
        if (pm && pm.type) {
          paymentMethod = pm.type;
          if (pm.card) {
            cardBrand = pm.card.brand;
            cardLast4 = pm.card.last4;
          }
        }
      }

      // Find the matching record in Appwrite by stripe_session_id
      const result = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_BOOKING_HISTORY_COLLECTION_ID,
        [Query.equal("stripe_session_id", session.id)],
      );

      if (result.documents.length > 0) {
        const doc = result.documents[0];

        // ✅ Update the record with confirmed payment details
        await databases.updateDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_BOOKING_HISTORY_COLLECTION_ID,
          doc.$id,
          {
            payment_status: "completed",
            payment_method: paymentMethod,
            card_brand: cardBrand,
            card_last4: cardLast4,
          },
        );

        console.log(`✅ Payment confirmed for session: ${session.id}`);
      } else {
        console.warn(`⚠️ No Appwrite record found for session: ${session.id}`);
      }
    } catch (err) {
      console.error("Appwrite update error:", err.message);
    }
  }

  return res.status(200).json({ received: true });
}
