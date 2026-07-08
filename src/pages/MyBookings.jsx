import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";
import "../styles/MyBookings.css";

import {
  getMyBookings,
  downloadBookingHistory,
} from "../services/bookingService";

import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getMyBookings();

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReceipt = (bookingId) => {
    navigate(`/receipt/${bookingId}`);
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await downloadBookingHistory();

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = "booking-history.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Unable to download PDF");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.turfName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || booking.paymentStatus === statusFilter;

    const matchesDate =
      !dateFilter || booking.bookingTime.startsWith(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <>
      

      <div className="my-bookings-page">
        {/* Header */}

        <div className="my-bookings-header">
          <h1>🏏 My Bookings</h1>

          <p className="header-subtitle">
            Track your matches, payments and booking history
          </p>

          <div className="booking-stats">
            <div className="stat-card">
              <span className="stat-number">{filteredBookings.length}</span>

              <span className="stat-label">Total Bookings</span>
            </div>

            <div className="stat-card paid">
              <span className="stat-number">
                {
                  filteredBookings.filter(
                    (booking) => booking.paymentStatus === "PAID"
                  ).length
                }
              </span>

              <span className="stat-label">Paid</span>
            </div>

            <div className="stat-card pending">
              <span className="stat-number">
                {
                  filteredBookings.filter(
                    (booking) => booking.paymentStatus === "PENDING"
                  ).length
                }
              </span>

              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="filter-card">
          <input
            className="filter-input"
            type="text"
            placeholder="🔍 Search Turf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
          </select>

          <input
            className="filter-date"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <button
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setDateFilter("");
            }}
          >
            🔄 Clear Filters
          </button>

          <button className="download-btn" onClick={handleDownloadPdf}>
            📄 Download PDF
          </button>
        </div>

        {/* Bookings Grid */}

        {filteredBookings.length > 0 ? (
          <div className="booking-list">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                onReceipt={handleReceipt}
              />
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <div className="no-bookings-icon">🏏</div>

            <h3>No Bookings Found</h3>

            <p>No booking history matches your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MyBookings;
