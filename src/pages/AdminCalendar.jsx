import { useState } from "react";

import Navbar from "../components/Navbar";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function AdminCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>Slot Calendar</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Calendar</h3>

            <Calendar onChange={setDate} value={date} />
          </div>

          <div
            style={{
              minWidth: "300px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Selected Date</h3>

            <p>{date.toDateString()}</p>

            <hr />

            <h4>Slot Status</h4>

            <p>🟢 Available</p>

            <p>🟡 Partial</p>

            <p>🔴 Fully Booked</p>

            <hr />

            <h4>Slots</h4>

            <p>09:00 AM - Available</p>

            <p>10:00 AM - Booked</p>

            <p>11:00 AM - Available</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCalendar;
