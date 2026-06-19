import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// 1. Define the exact shape of the data prop
export interface InvoiceData {
  invoiceId: string | number;
  date: string | Date;
  customerName: string;
  customerEmail: string;
  type: "subscription" | "service";
  itemName: string;
  amount: number;
  interval?: string; // Optional: Only needed for subscriptions
  bookingDate?: string | Date; // Optional: Only needed for services
}

interface InvoiceDocumentProps {
  data: InvoiceData;
}

// Create styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 12, color: "#333" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottom: "1px solid #eee",
    paddingBottom: 10,
  },
  headerLeft: { display: "flex", flexDirection: "column" },
  headerRight: { textAlign: "right" },
  title: { fontSize: 24, fontWeight: "bold", color: "#1a73e8" },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottom: "1px solid #f0f0f0",
  },
  bold: { fontWeight: "bold" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: 20,
    borderTop: "2px solid #333",
  },
  totalText: { fontSize: 16, fontWeight: "bold" },
});

// 2. Apply the interface to the component props
const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* <Text style={styles.title}>INVOICE</Text> */}
            <Text>INVOICE</Text>
            <Text style={styles.title}>Oral Care</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.bold}>Invoice #: {data.invoiceId}</Text>
            <Text>Date: {new Date(data.date).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Billed To */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billed To:</Text>
          <Text>{data.customerName}</Text>
          <Text>{data.customerEmail}</Text>
        </View>

        {/* Dynamic Item Details based on Payment Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {data.type === "subscription"
              ? "Subscription Details"
              : "Service Booking Details"}
          </Text>

          <View style={styles.row}>
            <Text style={styles.bold}>Description</Text>
            <Text style={styles.bold}>Amount</Text>
          </View>

          <View style={styles.row}>
            <Text>
              {data.itemName}
              {/* Show billing interval if it's a subscription */}
              {data.type === "subscription" && data.interval
                ? ` (${data.interval})`
                : ""}
            </Text>
            <Text>${data.amount.toFixed(2)}</Text>
          </View>

          {/* Optional: Show booking date if it's a service */}
          {data.type === "service" && data.bookingDate && (
            <View style={styles.row}>
              <Text>Service Date:</Text>
              <Text>{new Date(data.bookingDate).toLocaleDateString()}</Text>
            </View>
          )}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Paid</Text>
          <Text style={styles.totalText}>${data.amount.toFixed(2)}</Text>
        </View>

        <View
          style={{
            marginTop: 50,
            textAlign: "center",
            color: "#888",
            fontSize: 10,
          }}
        >
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
