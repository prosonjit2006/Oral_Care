import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface InvoiceData {
  invoiceId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  type: string; // "subscription" | "service-booking"
  itemName: string;
  interval: string; // "one-time", "monthly", "yearly"
  amount: number;
  currency?: string; // "INR" | "USD"
  paymentMethod?: string; // "card", "upi"
  cardBrand?: string; // "visa", "mastercard"
  cardLast4?: string; // "4242"
  paymentStatus?: string; // "paid" | "pending"
}

interface InvoiceDocumentProps {
  data: InvoiceData;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1a1a2e",
    backgroundColor: "#ffffff",
  },

  // ── Header ─────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 36,
    paddingBottom: 20,
    borderBottom: "2px solid #1a73e8",
  },
  brandLabel: {
    fontSize: 10,
    color: "#888",
    marginBottom: 4,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  brandName: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#1a73e8",
  },
  headerRight: {
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    marginBottom: 6,
  },
  headerMeta: {
    fontSize: 10,
    color: "#555",
    marginTop: 3,
  },

  // ── Status Badge ────────────────────────────────────────────
  badgeRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 28,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  badgePaid: {
    backgroundColor: "#e6f4ea",
    color: "#1e7e34",
  },
  badgePending: {
    backgroundColor: "#fff3cd",
    color: "#856404",
  },

  // ── Two Column Info ─────────────────────────────────────────
  twoCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  col: {
    width: "48%",
  },
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a73e8",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 11,
    color: "#1a1a2e",
    marginBottom: 3,
  },
  infoTextLight: {
    fontSize: 10,
    color: "#666",
    marginBottom: 3,
  },

  // ── Items Table ─────────────────────────────────────────────
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f4ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a73e8",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: "1px solid #f0f0f0",
  },
  colDescription: { flex: 3 },
  colType: { flex: 1.5, textAlign: "center" },
  colAmount: { flex: 1, textAlign: "right" },

  // ── Total ───────────────────────────────────────────────────
  totalBlock: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1a73e8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    width: 240,
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  totalAmount: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },

  // ── Payment Method ──────────────────────────────────────────
  paymentSection: {
    marginTop: 24,
    padding: 14,
    backgroundColor: "#f8f9ff",
    borderRadius: 6,
    borderLeft: "3px solid #1a73e8",
  },

  // ── Footer ─────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 36,
    left: 48,
    right: 48,
    borderTop: "1px solid #eee",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 9,
    color: "#aaa",
  },
  footerBrand: {
    fontSize: 9,
    color: "#1a73e8",
    fontFamily: "Helvetica-Bold",
  },
});

// ── Currency symbol helper ───────────────────────────────────
function getCurrencySymbol(currency?: string): string {
  switch ((currency || "INR").toUpperCase()) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "INR":
      return "₹";
    default:
      return currency + " ";
  }
}

// ── Capitalize helper ────────────────────────────────────────
function capitalize(str?: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Component ────────────────────────────────────────────────
const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ data }) => {
  const symbol = getCurrencySymbol(data.currency);
  const isPaid =
    data.paymentStatus === "paid" || data.paymentStatus === "completed";
  const isSubscription = data.type === "subscription";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandLabel}>Invoice From</Text>
            <Text style={styles.brandName}>Oral Care</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.headerMeta}># {data.invoiceId}</Text>
            <Text style={styles.headerMeta}>
              Date:{" "}
              {new Date(data.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* ── Payment Status Badge ── */}
        <View style={styles.badgeRow}>
          <Text
            style={[
              styles.badge,
              isPaid ? styles.badgePaid : styles.badgePending,
            ]}
          >
            {isPaid ? "✓  Paid" : "⏳  Pending"}
          </Text>
        </View>

        {/* ── Billed To + Payment Type ── */}
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Billed To</Text>
            <Text style={styles.infoText}>{data.customerName}</Text>
            <Text style={styles.infoTextLight}>{data.customerEmail}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Payment Type</Text>
            <Text style={styles.infoText}>
              {isSubscription ? "Subscription Plan" : "Service Booking"}
            </Text>
            {data.interval && data.interval !== "one-time" && (
              <Text style={styles.infoTextLight}>
                Billing: {capitalize(data.interval)}
              </Text>
            )}
          </View>
        </View>

        {/* ── Items Table ── */}
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.sectionLabel}>
            {isSubscription ? "Subscription Details" : "Service Details"}
          </Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colDescription]}>
            Description
          </Text>
          <Text style={[styles.tableHeaderText, styles.colType]}>Type</Text>
          <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
        </View>

        <View style={styles.tableRow}>
          <Text
            style={[{ fontSize: 11, color: "#1a1a2e" }, styles.colDescription]}
          >
            {data.itemName}
            {isSubscription && data.interval && data.interval !== "one-time"
              ? `  (${capitalize(data.interval)})`
              : ""}
          </Text>
          <Text
            style={[
              { fontSize: 10, color: "#666", textAlign: "center" },
              styles.colType,
            ]}
          >
            {isSubscription ? "Subscription" : "Service"}
          </Text>
          <Text
            style={[
              { fontSize: 11, color: "#1a1a2e", textAlign: "right" },
              styles.colAmount,
            ]}
          >
            {symbol}
            {data.amount.toFixed(2)}
          </Text>
        </View>

        {/* ── Total ── */}
        <View style={styles.totalBlock}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalAmount}>
              {symbol}
              {data.amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* ── Payment Method (only if card details exist) ── */}
        {(data.paymentMethod || data.cardLast4) && (
          <View style={styles.paymentSection}>
            <Text style={styles.sectionLabel}>Payment Method</Text>
            {data.cardBrand && data.cardLast4 ? (
              <Text style={styles.infoText}>
                {capitalize(data.cardBrand)} •••• {data.cardLast4}
              </Text>
            ) : (
              <Text style={styles.infoText}>
                {capitalize(data.paymentMethod)}
              </Text>
            )}
            {data.currency && (
              <Text style={styles.infoTextLight}>
                Currency: {data.currency.toUpperCase()}
              </Text>
            )}
          </View>
        )}

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This is a system-generated invoice and requires no signature.
          </Text>
          <Text style={styles.footerBrand}>Oral Care</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
