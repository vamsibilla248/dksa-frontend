import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";

import "../styles/BookingSummary.css";

function BookingSummary({ selectedSlots, onRemoveSlot }) {
  const totalAmount = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

  return (
    <div className="booking-summary">
      {/* Header */}

      <div className="summary-header">
        <div className="summary-title">
          <FaCalendarAlt />
          <h2>Booking Summary</h2>
        </div>

        <span className="summary-badge">
          {selectedSlots.length} Slot{selectedSlots.length !== 1 ? "s" : ""}
        </span>
      </div>

      {selectedSlots.length === 0 ? (
        <div className="empty-summary">
          <div className="empty-icon">
            <FaCalendarAlt />
          </div>

          <h3>No Slots Selected</h3>

          <p>Select at least 2 slots to continue booking.</p>
        </div>
      ) : (
        <>
          {/* Selected Slots */}

          <div className="selected-slot-list">
            {selectedSlots.map((slot) => (
              <div key={slot.id} className="slot-item">
                <div className="slot-left">
                  <FaClock />
                  <span>{slot.slotTime.substring(0, 5)}</span>
                </div>

                <div className="slot-right">
                  <span className="slot-price">₹{slot.price}</span>

                  <button
                    className="remove-slot-btn"
                    onClick={() => onRemoveSlot(slot.id)}
                    title="Remove Slot"
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}

          <div className="summary-total">
            <div className="total-left">
              <FaMoneyBillWave />
              <span>Total Amount</span>
            </div>

            <span className="total-price">₹{totalAmount}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default BookingSummary;
