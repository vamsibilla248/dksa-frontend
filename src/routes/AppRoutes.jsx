import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import BookingPage from "../pages/BookingPage";
import MyBookings from "../pages/MyBookings";
import Receipt from "../pages/Receipt";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import BookingSuccess from "../pages/BookingSuccess";

import AdminDashboard from "../pages/AdminDashboard";
import AdminBookings from "../pages/AdminBookings";
import AdminTurfs from "../pages/AdminTurfs";
import AdminUsers from "../pages/AdminUsers";
import AdminCalendar from "../pages/AdminCalendar";
import AdminSlots from "../pages/AdminSlots";
import AdminCreateBooking from "../pages/AdminCreateBooking";
// import AdminReports from "../pages/AdminReports"; // Uncomment if you have this page

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Routes */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/:turfId" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/receipt/:bookingId" element={<Receipt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Route>

        {/* Admin Routes */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/turfs" element={<AdminTurfs />} />

          <Route path="/admin/slots" element={<AdminSlots />} />

          <Route path="/admin/bookings" element={<AdminBookings />} />

          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="/admin/calendar" element={<AdminCalendar />} />

          <Route
            path="/admin/create-booking"
            element={<AdminCreateBooking />}
          />

          {/*
          Uncomment when AdminReports.jsx exists

          <Route
            path="/admin/reports"
            element={<AdminReports />}
          />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
