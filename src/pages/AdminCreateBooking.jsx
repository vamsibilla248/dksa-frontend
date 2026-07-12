import { useEffect, useState } from "react";

import { FaSun, FaCloudSun, FaMoon, FaUser, FaFutbol } from "react-icons/fa";

import SlotCard from "../components/SlotCard";
import BookingSummary from "../components/BookingSummary";

import { getActiveTurfs, getAdminActiveTurfs } from "../services/turfService";
import { getAdminSlotsByDate, getSlotsByDate } from "../services/slotService";
import { getAllCustomers } from "../services/customerService";
import { createOfflineBooking } from "../services/adminBookingService";
import { useAuth } from "../context/AuthContext";

import "../styles/AdminCreateBooking.css";

function AdminCreateBooking() {
  /* ==========================================
      TODAY
  ========================================== */

  const today = new Date().toISOString().split("T")[0];

  /* ==========================================
      STATES
  ========================================== */

  const [bookingDate, setBookingDate] = useState(today);

  const [turfs, setTurfs] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [selectedTurf, setSelectedTurf] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [slots, setSlots] = useState([]);

  const [selectedSlots, setSelectedSlots] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const { username } = useAuth();

  /* ==========================================
      INITIAL LOAD
  ========================================== */

  useEffect(() => {
    loadTurfs();
    loadCustomers();
  }, []);

  useEffect(() => {
    if (selectedTurf) {
      loadSlots();
    }
  }, [selectedTurf, bookingDate]);

  /* ==========================================
      LOAD TURFS
  ========================================== */

  const loadTurfs = async () => {
    try {
      const response = await getAdminActiveTurfs();

      console.log("Turfs Response:", response.data);

      const turfList = response.data;

      setTurfs(turfList);

      if (turfList.length > 0) {
        setSelectedTurf(turfList[0].id);
      }
    } catch (error) {
      console.error("Load Turfs Error:", error);
    }
  };

  /* ==========================================
      LOAD CUSTOMERS
  ========================================== */

  const loadCustomers = async () => {
    try {
      const response = await getAllCustomers();

      const customerList = response.data;

      setCustomers(customerList);

      // Select first customer by default
      if (customerList.length > 0) {
        setSelectedCustomer(customerList[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================================
      LOAD SLOTS
  ========================================== */

  const loadSlots = async () => {
    try {
      setLoading(true);

      const response = await getAdminSlotsByDate(selectedTurf, bookingDate);

      setSlots(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      SLOT SELECT
  ========================================== */

  const handleSelectSlot = (slot) => {
    const exists = selectedSlots.some((s) => s.id === slot.id);

    if (exists) {
      setSelectedSlots(selectedSlots.filter((s) => s.id !== slot.id));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  /* ==========================================
      REMOVE SLOT
  ========================================== */

  const handleRemoveSlot = (slotId) => {
    setSelectedSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  /* ==========================================
      TOTAL
  ========================================== */

  const totalAmount = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

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
      SLOT GRID
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
    if (!selectedCustomer) {
      alert("Please select customer.");
      return;
    }

    if (selectedSlots.length < 2) {
      alert("Please select minimum 2 slots.");
      return;
    }

    try {
      setSaving(true);

      await createOfflineBooking({
        customerId: selectedCustomer,

        turfId: selectedTurf,

        bookingDate,

        slotIds: selectedSlots.map((slot) => slot.id),
      });

      alert("Booking Created Successfully");

      setSelectedSlots([]);

      loadSlots();
    } catch (error) {
      console.error(error);

      alert("Unable to Create Booking");
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================
      JSX
  ========================================== */

  return (
    <div className="admin-create-booking-page">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="admin-booking-header">
        <div>
          <h1>🏏 Create Offline Booking</h1>

          <p>
            Select a turf, customer, booking date and slots to create an offline
            booking.
          </p>
        </div>
      </div>

      {/* ==========================================
          TOP SECTION
      ========================================== */}

      <div className="booking-top-section">
        {/* Turf */}

        <div className="top-card">
          <div className="top-card-title">
            <FaFutbol />
            <span>Select Turf</span>
          </div>

          <select
            value={selectedTurf}
            onChange={(e) => setSelectedTurf(e.target.value)}
          >
            <option value="">Choose Turf</option>

            {turfs.map((turf) => (
              <option key={turf.id} value={turf.id}>
                {turf.turfName}
              </option>
            ))}
          </select>
        </div>

        {/* Customer */}

        <div className="top-card">
          <div className="top-card-title">
            <FaUser />
            <span>Select Customer</span>
          </div>

          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}

        <div className="top-card">
          <div className="top-card-title">
            📅
            <span>Select Date</span>
          </div>

          <input
            type="date"
            value={bookingDate}
            min={today}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
      </div>

      {/* ==========================================
          AVAILABLE SLOT TITLE
      ========================================== */}

      <div className="section-title">
        <span></span>

        <h2>AVAILABLE SLOTS</h2>

        <span></span>
      </div>

      {/* ==========================================
          MAIN LAYOUT
      ========================================== */}

      <div className="booking-layout">
        {/* LEFT */}

        <div className="booking-left">
          {/* Morning */}

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

          {/* Afternoon */}

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

          {/* Evening */}

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
          <div className="booking-summary-wrapper">
            <BookingSummary
              selectedSlots={selectedSlots}
              totalAmount={totalAmount}
              onRemoveSlot={handleRemoveSlot}
            />

            <button
              className={`confirm-booking-btn ${
                selectedSlots.length < 2 ||
                saving ||
                !selectedCustomer ||
                !selectedTurf
                  ? "disabled"
                  : ""
              }`}
              disabled={
                selectedSlots.length < 2 ||
                saving ||
                !selectedCustomer ||
                !selectedTurf
              }
              onClick={handleConfirmBooking}
            >
              {saving ? (
                "Creating Booking..."
              ) : selectedSlots.length < 2 ? (
                "Select Minimum 2 Slots"
              ) : !selectedCustomer ? (
                "Select Customer"
              ) : !selectedTurf ? (
                "Select Turf"
              ) : (
                <>✅ Confirm Booking</>
              )}
            </button>

            <div className="offline-note">
              <h4>Offline Booking</h4>

              <p>
                This booking will be created directly by the administrator. No
                Razorpay payment is required.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AdminCreateBooking;
