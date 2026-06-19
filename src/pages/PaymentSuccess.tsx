// pages/PaymentSuccess.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { CheckCircle, Download, ArrowLeft, Loader2 } from "lucide-react";
import type { InvoiceData } from "../components/InvoiceDocument";
import InvoiceDocument from "../components/InvoiceDocument";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError(
        "No session ID found. This page requires a valid payment session.",
      );
      setLoading(false);
      return;
    }

    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(
          `/api/session-details?session_id=${sessionId}`,
        );
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to load payment details");
        }

        const d = result.data;

        setInvoiceData({
          invoiceId: d.invoiceId,
          date: d.date,
          customerName: d.customerName,
          customerEmail: d.customerEmail,
          type: d.itemType,
          itemName: d.itemName,
          interval: d.interval,
          amount: d.amount,
          currency: d.currency,
          paymentMethod: d.paymentMethod,
          cardBrand: d.cardBrand,
          cardLast4: d.cardLast4,
          paymentStatus: d.paymentStatus,
        });
      } catch (err: any) {
        console.error("Failed to fetch session details:", err);
        setError(err.message || "Something went wrong loading your invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [searchParams]);

  // ── Loading State ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#f4f6f9]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-gray-600 text-lg font-medium">
          Loading your invoice...
        </p>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────
  if (error || !invoiceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f4f6f9] px-4">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <p className="text-red-500 font-semibold text-lg mb-2">
            Unable to load invoice
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {error || "Something went wrong. Please contact support."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ── Success State ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f4f6f9] py-12 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Your transaction has been securely processed.
        </p>
        {invoiceData.cardLast4 && (
          <p className="text-gray-500 text-sm mt-1">
            Paid with{" "}
            <span className="font-medium capitalize">
              {invoiceData.cardBrand}
            </span>{" "}
            ending in{" "}
            <span className="font-medium">{invoiceData.cardLast4}</span>
          </p>
        )}
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-4xl mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Invoice
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {invoiceData.invoiceId}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Patient
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {invoiceData.customerName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Plan / Service
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {invoiceData.itemName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Amount
          </p>
          <p className="text-sm font-semibold text-green-600">
            {invoiceData.currency || "INR"}{" "}
            {Number(invoiceData.amount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8 w-full max-w-4xl justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        <PDFDownloadLink
          document={<InvoiceDocument data={invoiceData} />}
          fileName={`Invoice_${invoiceData.invoiceId}.pdf`}
        >
          {({ loading: isPdfLoading }) => (
            <button
              disabled={isPdfLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition ${
                isPdfLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Download size={20} />
              {isPdfLoading ? "Generating PDF..." : "Download Invoice"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Live PDF Viewer */}
      <div className="w-full max-w-4xl h-[800px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <PDFViewer width="100%" height="100%" className="border-none">
          <InvoiceDocument data={invoiceData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PaymentSuccess;
