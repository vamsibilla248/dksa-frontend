import "../styles/TurfCard.css";

function TurfCard({ turf, onSelect }) {
  return (
    <div className="turf-card">
      <div className="turf-image-wrapper">
        <img src={turf.imageUrl} alt={turf.turfName} className="turf-image" />

        <div className="turf-overlay">
          <h2 className="overlay-title">{turf.turfName}</h2>
        </div>
      </div>

      <div className="turf-card-body">
        <p className="turf-location">📍 {turf.location}</p>

        <span className="turf-type">{turf.turfType}</span>

        <button className="book-btn" onClick={() => onSelect(turf.id)}>
          🏏 Book Now
        </button>
      </div>
    </div>
  );
}

export default TurfCard;
