import { FaRegClock } from "react-icons/fa";

import "../styles/SlotCard.css";

function SlotCard({ slot, selected, onSelect }) {
  const now = new Date();

  const today = now.toISOString().split("T")[0];

  const currentTime = now.toTimeString().substring(0, 5);

  const slotTime = slot.slotTime.substring(0, 5);

  const isToday = slot.bookingDate === today;

  const isBooked = slot.status === "BOOKED";

  const isExpired = isToday && slotTime <= currentTime;

  const isDisabled = isBooked || isExpired;

  const getClass = () => {
    if (selected) return "slot-card selected";

    if (isBooked) return "slot-card booked";

    if (isExpired) return "slot-card expired";

    return "slot-card available";
  };

  return (
    <button
      className={getClass()}
      disabled={isDisabled}
      onClick={() => !isDisabled && onSelect(slot)}
    >
      <div className="slot-card-time">
        <FaRegClock />
        <span>
          {slotTime} - ₹{slot.price}
        </span>
      </div>
    </button>
  );
}

export default SlotCard;
