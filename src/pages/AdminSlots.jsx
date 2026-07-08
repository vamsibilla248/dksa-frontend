import { useEffect, useState } from "react";

import {
  getAllSlots,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../services/adminSlotService";

import "../styles/AdminSlots.css";

function AdminSlots() {
  // ============================
  // STATES
  // ============================

  const [slots, setSlots] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Form

  const [turfId, setTurfId] = useState("");

  const [bookingDate, setBookingDate] = useState("");

  const [slotTime, setSlotTime] = useState("");

  const [price, setPrice] = useState("");

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    try {
      const response = await getAllSlots();

      setSlots(response.data);
    } catch (error) {
      console.error(error);

      alert("Unable To Load Slots");
    }
  };

  // ============================
  // RESET FORM
  // ============================

  const clearForm = () => {
    setEditingId(null);

    setTurfId("");

    setBookingDate("");

    setSlotTime("");

    setPrice("");
  };

  // ============================
  // EDIT SLOT
  // ============================

  const handleEdit = (slot) => {
    setEditingId(slot.id);

    setTurfId(slot.turfId);

    setBookingDate(slot.bookingDate);

    setSlotTime(slot.slotTime);

    setPrice(slot.price);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // SAVE SLOT
  // ============================

  const handleSave = async () => {
    if (!turfId || !bookingDate || !slotTime || !price) {
      alert("Please fill all fields");

      return;
    }

    const slot = {
      turfId: Number(turfId),

      bookingDate,

      slotTime,

      price: Number(price),
    };

    try {
      if (editingId) {
        await updateSlot(editingId, slot);

        alert("Slot Updated Successfully");
      } else {
        await createSlot(slot);

        alert("Slot Created Successfully");
      }

      clearForm();

      loadSlots();
    } catch (error) {
      console.error(error);

      alert("Unable To Save Slot");
    }
  };

  // ============================
  // DELETE SLOT
  // ============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this slot?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteSlot(id);

      alert("Slot Deleted Successfully");

      loadSlots();
    } catch (error) {
      console.error(error);

      alert("Unable To Delete Slot");
    }
  };

  // ============================
  // FILTER SLOTS
  // ============================

  const filteredSlots = slots.filter((slot) => {
    const matchesSearch =
      slot.slotTime?.toLowerCase().includes(search.toLowerCase()) ||
      slot.turfName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "" || slot.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ============================
  // PAGINATION
  // ============================

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentSlots = filteredSlots.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredSlots.length / recordsPerPage);

  return (
    <div className="admin-slots-page">
      {/* ===========================
              PAGE HEADER
          =========================== */}

      <div className="admin-slots-header">
        <h1>🕒 Slot Management</h1>

        <p>Create, edit and manage all turf booking slots from one place.</p>
      </div>

      {/* ===========================
              SLOT FORM
          =========================== */}

      <div className="slot-form-card">
        <h2>{editingId ? "✏ Edit Slot" : "➕ Create New Slot"}</h2>

        <div className="slot-form">
          {/* Turf */}

          <div className="form-group">
            <label>Turf ID</label>

            <input
              type="number"
              placeholder="Enter Turf ID"
              value={turfId}
              onChange={(e) => setTurfId(e.target.value)}
            />
          </div>

          {/* Date */}

          <div className="form-group">
            <label>Booking Date</label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          {/* Time */}

          <div className="form-group">
            <label>Slot Time</label>

            <input
              type="time"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
            />
          </div>

          {/* Price */}

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="slot-buttons">
          <button className="save-btn" onClick={handleSave}>
            {editingId ? "Update Slot" : "Create Slot"}
          </button>

          <button className="cancel-btn" onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>

      {/* ===========================
              SEARCH & FILTER
          =========================== */}

      <div className="slot-toolbar">
        <input
          type="text"
          placeholder="Search Turf or Time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>

          <option value="OPEN">OPEN</option>

          <option value="BOOKED">BOOKED</option>

          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {/* ===========================
          SLOT TABLE
      =========================== */}

      <div className="table-container">
        <table className="slot-table">
          <thead>
            <tr>
              <th>ID</th>

              <th>Turf</th>

              <th>Date</th>

              <th>Time</th>

              <th>Price</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentSlots.length > 0 ? (
              currentSlots.map((slot) => (
                <tr key={slot.id}>
                  <td>#{slot.id}</td>

                  <td>{slot.turfName}</td>

                  <td>{slot.bookingDate}</td>

                  <td>{slot.slotTime}</td>

                  <td>₹{slot.price}</td>

                  <td>
                    <span
                      className={`status-badge ${slot.status.toLowerCase()}`}
                    >
                      {slot.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(slot)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(slot.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="empty-state">
                    <div className="empty-icon">🏏</div>

                    <h3>No Slots Available</h3>

                    <p>Create your first slot to start accepting bookings.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===========================
  PAGINATION
=========================== */}

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default AdminSlots;
