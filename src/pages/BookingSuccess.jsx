import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

function BookingSuccess() {
  const location = useLocation();

  const payment = location.state;

  return (
    <>
      <Confetti />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#dbeafe,#eff6ff)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            width: "500px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h1>✅ Booking Successful</h1>

          <p>Payment completed successfully.</p>

          <hr />

          <p>Payment ID:</p>

          <b>{payment?.paymentId}</b>

          <p
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Your turf booking has been confirmed successfully.
          </p>

          <br />

          <Link to="/my-bookings">
            <button
              style={{
                background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              My Bookings
            </button>
          </Link>

          <Link to="/dashboard">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                cursor: "pointer",
                background: "#fff",
              }}
            >
              Back To Dashboard
            </button>
          </Link>

          <br />
          <br />

          <Link to="/my-bookings">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#16a34a",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Download Receipt
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BookingSuccess;
