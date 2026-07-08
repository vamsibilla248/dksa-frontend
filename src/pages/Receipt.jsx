// src/pages/Receipt.jsx

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getReceipt } from "../services/bookingService";

import { downloadReceiptPdf } from "../services/bookingService";

import "../styles/Receipt.css";
import Navbar from "../components/Navbar";

function Receipt() {
  const { bookingId } = useParams();

  const [receipt, setReceipt] = useState(null);

  const loadReceipt = async () => {
    try {
      const response = await getReceipt(bookingId);

      setReceipt(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReceipt();
  }, []);

  if (!receipt) {
    return <h2>Loading...</h2>;
  }

  const handleDownloadPdf = async () => {
    try {
      const response = await downloadReceiptPdf(bookingId);

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `receipt-${bookingId}.pdf`);

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);

      alert("Unable to download PDF");
    }
  };

  return (
    <>
      <div className="receipt-page">
        <div className="receipt-card">
          <div className="receipt-header">
            <h1>🏏 DKSA Receipt</h1>

            <span
              className={
                receipt.paymentStatus === "PAID"
                  ? "receipt-status paid"
                  : "receipt-status pending"
              }
            >
              {receipt.paymentStatus}
            </span>
          </div>

          <p className="receipt-subtitle">Don Bosco Kohli Sports Academy</p>

          {/* Customer Details */}

          <div className="receipt-section">
            <h3>👤 Customer Details</h3>

            <div className="receipt-info-row">
              <span>Name</span>
              <strong>{receipt.customerName}</strong>
            </div>

            <div className="receipt-info-row">
              <span>Email</span>
              <strong>{receipt.customerEmail}</strong>
            </div>
          </div>

          {/* Booking Details */}

          <div className="receipt-section">
            <h3>🏟 Booking Details</h3>

            <div className="receipt-info-row">
              <span>Booking ID</span>
              <strong>#{receipt.bookingId}</strong>
            </div>

            <div className="receipt-info-row">
              <span>Turf</span>
              <strong>{receipt.turfName}</strong>
            </div>

            <div className="receipt-info-row">
              <span>Order ID</span>
              <strong>{receipt.orderId}</strong>
            </div>

            <div className="receipt-info-row">
              <span>Payment ID</span>
              <strong>{receipt.paymentId}</strong>
            </div>
          </div>

          {/* Slot Timings */}

          {receipt.slots && receipt.slots.length > 0 && (
            <div className="receipt-section">
              <h3>⏰ Slot Timings</h3>

              <div className="slot-times-container">
                {receipt.slots.map((slot, index) => (
                  <span key={index} className="slot-chip">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Amount */}

          <div className="amount-card">
            <p>Total Amount</p>

            <h2>₹{receipt.amount}</h2>
          </div>

          {/* Download */}

          <button className="download-btn" onClick={handleDownloadPdf}>
            📄 Download PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default Receipt;
