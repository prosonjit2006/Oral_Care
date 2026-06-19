import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import type { InvoiceData } from "../components/InvoiceDocument";
import InvoiceDocument from "../components/InvoiceDocument";

// IMPORTANT: Import the InvoiceData type from your component file

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Strongly type the state using the interface
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>({
    invoiceId: `INV-${Math.floor(Math.random() * 100000)}`,
    date: new Date().toISOString(),
    customerName: "John Doe",
    customerEmail: "john@example.com",
    type: "subscription",
    itemName: "Premium Membership",
    interval: "Yearly",
    amount: 179.0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get the Stripe session ID from the URL (e.g., ?session_id=cs_test_123)
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      // Mocking an API call to your backend
      setTimeout(() => {
        // 2. Type the fetched payload
        const fetchedData: InvoiceData = {
          invoiceId: `INV-${Math.floor(Math.random() * 100000)}`,
          date: new Date().toISOString(),
          customerName: "John Doe",
          customerEmail: "john@example.com",
          type: "subscription",
          itemName: "Premium Membership",
          interval: "Yearly",
          amount: 179.0,
        };

        // 3. I UNCOMMENTED THIS! Without this, the PDF will crash.
        setInvoiceData(fetchedData);
        setLoading(false);
      }, 1000);
    } else {
      // If no session ID, they shouldn't be here
      // navigate("/");
    }
  }, [searchParams, navigate]);

  // Safety check: Wait until loading is done AND invoiceData actually exists
  if (loading || !invoiceData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your invoice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] py-12 px-4 flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center mb-8">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Your transaction has been securely processed.
        </p>
      </div>

      {/* Tailwind Action Buttons */}
      <div className="flex gap-4 mb-8 w-full max-w-4xl justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        {/* PDF Download Button wrapper */}
        <PDFDownloadLink
          document={<InvoiceDocument data={invoiceData} />}
          fileName={`Invoice_${invoiceData.invoiceId}.pdf`}
        >
          {/* 4. Renamed 'loading' to 'isPdfLoading' to avoid clashing with the outer state */}
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

      {/* The Live PDF Viewer */}
      <div className="w-full max-w-4xl h-[800px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <PDFViewer width="100%" height="100%" className="border-none">
          <InvoiceDocument data={invoiceData} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PaymentSuccess;
