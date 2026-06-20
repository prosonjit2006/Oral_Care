import Stripe from "stripe";
import { Client, TablesDB, Query } from "node-appwrite";

const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const tablesDB = new TablesDB(appwriteClient);

export const config = {
  api: { bodyParser: false },
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
      let paymentMethod = "";
      let cardBrand = "";
      let cardLast4 = "";

      if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent,
          {
            expand: ["payment_method"],
          },
        );

        const pm = paymentIntent.payment_method;
        if (pm?.type) {
          paymentMethod = pm.type;
          if (pm.card) {
            cardBrand = pm.card.brand;
            cardLast4 = pm.card.last4;
          }
        }
      }

      const result = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID,
        tableId: "bookingHistory",
        queries: [Query.equal("stripe_session_id", session.id)],
      });

      if (result.rows.length > 0) {
        const row = result.rows[0];

        await tablesDB.updateRow({
          databaseId: process.env.APPWRITE_DATABASE_ID,
          tableId: "bookingHistory",
          rowId: row.$id,
          data: {
            payment_status: "completed",
            payment_method: paymentMethod,
            card_brand: cardBrand,
            card_last4: cardLast4,
          },
        });

        console.log(`✅ Payment confirmed for session: ${session.id}`);
      } else {
        console.warn(`⚠️ No Appwrite row found for session: ${session.id}`);
      }
    } catch (err) {
      console.error("Appwrite update error:", err.message);
    }
  }

  return res.status(200).json({ received: true });
}
