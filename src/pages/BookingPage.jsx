import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa";

import SlotCard from "../components/SlotCard";
import BookingSummary from "../components/BookingSummary";

import { getSlotsByDate } from "../services/slotService";

import { createOrder, verifyPayment } from "../services/paymentService";

import { FaClock, FaMoneyBillWave, FaTimesCircle } from "react-icons/fa";

import "../styles/BookingPage.css";

function BookingPage() {
  /* ==========================================
      ROUTER
  ========================================== */

  const { turfId } = useParams();

  const navigate = useNavigate();

  /* ==========================================
      DATE
  ========================================== */

  const today = new Date().toISOString().split("T")[0];

  /* ==========================================
      STATES
  ========================================== */

  const [date, setDate] = useState(today);

  const [slots, setSlots] = useState([]);

  const [selectedSlots, setSelectedSlots] = useState([]);

  const [loading, setLoading] = useState(false);

  const [paymentLoading, setPaymentLoading] = useState(false);

  /* ==========================================
      LOAD SLOTS
  ========================================== */

  useEffect(() => {
    loadSlots();
  }, [date]);

  const loadSlots = async () => {
    try {
      setLoading(true);

      const response = await getSlotsByDate(turfId, date);

      setSlots(response.data);
    } catch (error) {
      console.error("Unable to Load Slots", error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      TOTAL AMOUNT
  ========================================== */

  const totalAmount = selectedSlots.reduce(
    (sum, slot) => sum + slot.price,

    0
  );

  /* ==========================================
      SELECT / UNSELECT SLOT
  ========================================== */

  const handleSelectSlot = (slot) => {
    const exists = selectedSlots.some((selected) => selected.id === slot.id);

    if (exists) {
      setSelectedSlots(
        selectedSlots.filter((selected) => selected.id !== slot.id)
      );
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  /* ==========================================
      MINIMUM SLOT VALIDATION
  ========================================== */

  const validateSlots = () => {
    if (selectedSlots.length < 2) {
      alert("Please select minimum 2 slots.");

      return false;
    }

    return true;
  };

  /* ==========================================
      SESSION FILTERS
  ========================================== */

  const morningSlots = slots.filter((slot) => {
    const hour = Number(slot.slotTime.substring(0, 2));

    return hour >= 5 && hour < 12;
  });

  const afternoonSlots = slots.filter((slot) => {
    const hour = Number(slot.slotTime.substring(0, 2));

    return hour >= 12 && hour < 18;
  });

  const eveningSlots = slots.filter((slot) => {
    const hour = Number(slot.slotTime.substring(0, 2));

    return hour >= 18;
  });

  /* ==========================================
      COMMON SLOT GRID
  ========================================== */

  const renderSlots = (slotList) => (
    <div className="slot-grid">
      {loading ? (
        <div className="loading-slots">Loading Slots...</div>
      ) : slotList.length > 0 ? (
        slotList.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            selected={selectedSlots.some((s) => s.id === slot.id)}
            onSelect={handleSelectSlot}
          />
        ))
      ) : (
        <div className="no-slots">No Slots Available</div>
      )}
    </div>
  );
  /* ==========================================
      CONFIRM BOOKING
  ========================================== */

  const handleConfirmBooking = async () => {
    if (!validateSlots()) {
      return;
    }

    try {
      setPaymentLoading(true);

      /* -------------------------------
         CREATE ORDER
      -------------------------------- */

      const orderResponse = await createOrder(totalAmount);

      const order = orderResponse.data;

      /* -------------------------------
         RAZORPAY OPTIONS
      -------------------------------- */

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount * 100,

        currency: order.currency,

        order_id: order.orderId,

        name: "DKSA Sports Acadamy",

        description: "Turf Slot Booking",

        image: "/logo.png",

        theme: {
          color: "#0f5a55",
        },

        prefill: {
          name: "",

          email: "",

          contact: "",
        },

        notes: {
          bookingDate: date,

          turfId: turfId,
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },

        /* -------------------------------
           PAYMENT SUCCESS
        -------------------------------- */

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,

              razorpayPaymentId: response.razorpay_payment_id,

              razorpaySignature: response.razorpay_signature,

              slotIds: selectedSlots.map((slot) => slot.id),
            });

            setSelectedSlots([]);

            await loadSlots();

            navigate(
              "/booking-success",

              {
                state: {
                  paymentId: response.razorpay_payment_id,

                  amount: totalAmount,
                },
              }
            );
          } catch (error) {
            console.error(error);

            alert("Payment Verification Failed");
          } finally {
            setPaymentLoading(false);
          }
        },
      };

      /* -------------------------------
         OPEN RAZORPAY
      -------------------------------- */

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert("Unable to Create Payment");

      setPaymentLoading(false);
    }
  };

  const handleRemoveSlot = (slotId) => {
    setSelectedSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  /* ==========================================

  
  JSX
========================================== */

  return (
    <div className="booking-page">
      {/* ==========================================
      HERO SECTION
  ========================================== */}

      <section className="booking-hero">
        <div className="hero-left">
          <span className="booking-tag">🏏 DKSA Sports Acadamy</span>

          <h1>Book Your Turf Slot</h1>

          <p>
            Choose your preferred date, select your favourite slots and confirm
            your booking securely in just a few clicks.
          </p>

          <div className="hero-features">
            <div className="feature">✅ Instant Confirmation</div>

            <div className="feature">💳 Secure Payments</div>

            <div className="feature">🏏 Premium Turf</div>
          </div>
        </div>

        {/* =========================
        DATE CARD
    ========================= */}

        <div className="hero-right">
          <div className="date-card">
            <h3>Select Booking Date</h3>

            <p>Choose your preferred date to see available slots.</p>

            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="date-picker"
            />

            <div className="selected-date">
              📅
              {new Date(date).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
      AVAILABLE SLOT TITLE
  ========================================== */}

      <div className="section-title">
        <span></span>

        <h2>AVAILABLE SLOTS</h2>

        <span></span>
      </div>

      {/* ==========================================
      CONTENT
  ========================================== */}

      <div className="booking-layout">
        {/* LEFT */}

        <div className="booking-left">
          {" "}
          {/* ==========================================
              MORNING SESSION
          ========================================== */}
          <section className="session-card">
            <div className="session-header">
              <div className="session-left">
                <div className="session-icon morning">
                  <FaSun />
                </div>

                <div>
                  <h2>Morning Session</h2>

                  <p>05:00 AM - 11:30 AM</p>
                </div>
              </div>

              <span className="slot-count">{morningSlots.length} Slots</span>
            </div>

            {renderSlots(morningSlots)}
          </section>
          {/* ==========================================
              AFTERNOON SESSION
          ========================================== */}
          <section className="session-card">
            <div className="session-header">
              <div className="session-left">
                <div className="session-icon afternoon">
                  <FaCloudSun />
                </div>

                <div>
                  <h2>Afternoon Session</h2>

                  <p>12:00 PM - 05:30 PM</p>
                </div>
              </div>

              <span className="slot-count">{afternoonSlots.length} Slots</span>
            </div>

            {renderSlots(afternoonSlots)}
          </section>
          {/* ==========================================
              EVENING SESSION
          ========================================== */}
          <section className="session-card">
            <div className="session-header">
              <div className="session-left">
                <div className="session-icon evening">
                  <FaMoon />
                </div>

                <div>
                  <h2>Evening Session</h2>

                  <p>06:00 PM - 11:30 PM</p>
                </div>
              </div>

              <span className="slot-count">{eveningSlots.length} Slots</span>
            </div>

            {renderSlots(eveningSlots)}
          </section>
        </div>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <aside className="booking-right">
          {" "}
          {/* ==========================================
              BOOKING SUMMARY
          ========================================== */}
          <div className="booking-summary-wrapper">
            <BookingSummary
              selectedSlots={selectedSlots}
              totalAmount={totalAmount}
              onRemoveSlot={handleRemoveSlot}
            />

            <button
              className={`confirm-booking-btn ${
                selectedSlots.length < 2 ? "disabled" : ""
              }`}
              disabled={selectedSlots.length < 2 || paymentLoading}
              onClick={handleConfirmBooking}
            >
              {paymentLoading ? (
                "Processing Payment..."
              ) : selectedSlots.length < 2 ? (
                "Select Minimum 2 Slots"
              ) : (
                <>💳 Pay ₹{totalAmount} & Confirm Booking</>
              )}
            </button>

            <div className="secure-payment">
              🔒 100% Secure Payment powered by Razorpay
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;