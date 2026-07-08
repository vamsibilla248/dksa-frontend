import "../styles/BookingCard.css";

function BookingCard({ booking, onReceipt }) {
  const bookingDate = new Date(booking.bookingTime);

  return (
    <div className="booking-card">
      <div className="booking-header">
        <span
          className={
            booking.paymentStatus === "PAID" ? "status-paid" : "status-pending"
          }
        >
          {booking.paymentStatus}
        </span>
      </div>

      <div className="booking-content">
        <h3 className="booking-turf-name">🏏 {booking.turfName}</h3>

        <p className="booking-id">Booking #{booking.bookingId}</p>

        <div className="booking-date-card">
          <span>📅</span>

          <span>
            {bookingDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="slot-count-card">
          <span>🎯</span>

          <span>
            {booking.slotCount} Slot
            {booking.slotCount > 1 ? "s" : ""}
          </span>
        </div>

        <div className="slot-times-container">
          {booking.slotTimes?.map((time, index) => (
            <span key={index} className="slot-chip">
              {time}
            </span>
          ))}
        </div>

        <div className="booking-amount-card">
          <p className="amount-label">Total Amount</p>

          <h2 className="amount-value">₹{booking.totalAmount}</h2>
        </div>
      </div>

      <button
        className="receipt-btn"
        onClick={() => onReceipt(booking.bookingId)}
      >
        📄 View Receipt
      </button>
    </div>
  );
}

export default BookingCard;
