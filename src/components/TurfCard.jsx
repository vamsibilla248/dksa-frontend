import { FaMapMarkerAlt, FaArrowRight, FaStar, FaFutbol } from "react-icons/fa";

import "../styles/TurfCard.css";

function TurfCard({ turf, onSelect }) {
  const image =
    turf.imageUrl ||
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800";

  const price = turf.price || 150;

  return (
    <div className="turf-card">
      {/* Image */}

      <div className="turf-image-wrapper">
        <img src={image} alt={turf.turfName} className="turf-image" />

        <div className="popular-badge">
          <FaStar />
          Popular
        </div>
      </div>

      {/* Body */}

      <div className="turf-card-body">
        <h3 className="turf-title">{turf.turfName}</h3>

        <div className="turf-location">
          <FaMapMarkerAlt />
          <span>{turf.location}</span>
        </div>

        <div className="card-info">
          <span className="turf-type">
            <FaFutbol />
            {turf.turfType}
          </span>

          <span className="rating">⭐ 4.8</span>
        </div>

        <div className="price-section">
          <div>
            <span className="price-label">Starting From</span>

            <div className="price">
              ₹{price}
              <small>/slot</small>
            </div>
          </div>
        </div>

        <button className="book-btn" onClick={() => onSelect(turf.id)}>
          <span>Book Now</span>

          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default TurfCard;
