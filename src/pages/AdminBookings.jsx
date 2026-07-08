import { useEffect, useState } from "react";

import { getAllBookings, cancelBooking } from "../services/adminBookingService";

import "../styles/AdminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [turfFilter, setTurfFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getAllBookings();

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelBooking(bookingId);

      alert("Booking Cancelled Successfully");

      loadBookings();
    } catch (error) {
      console.error(error);

      alert("Unable To Cancel Booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesCustomer = booking.customerName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || booking.paymentStatus === statusFilter;

    const matchesTurf = !turfFilter || booking.turfName === turfFilter;

    return matchesCustomer && matchesStatus && matchesTurf;
  });

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentBookings = filteredBookings.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredBookings.length / recordsPerPage);

  return (
    <div className="admin-bookings-page">
      {/* Header */}

      <div className="admin-bookings-header">
        <h1>📅 Booking Management</h1>

        <p>View, search and manage all customer bookings across DKSA.</p>
      </div>

      {/* Filters */}

      <div className="booking-filters">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>

          <option value="PAID">PAID</option>

          <option value="PENDING">PENDING</option>
        </select>

        <select
          value={turfFilter}
          onChange={(e) => setTurfFilter(e.target.value)}
        >
          <option value="">All Turfs</option>

          {[...new Set(bookings.map((b) => b.turfName))].map((turf) => (
            <option key={turf} value={turf}>
              {turf}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}

      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>

              <th>Customer</th>

              <th>Turf</th>

              <th>Amount</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>#{booking.bookingId}</td>

                  <td>{booking.customerName}</td>

                  <td>{booking.turfName}</td>

                  <td>₹{booking.totalAmount}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        booking.paymentStatus === "PAID" ? "paid" : "pending"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀ Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default AdminBookings;
