import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarPlus,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";

import { getReports } from "../services/reportService";

import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await getReports();
      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!report) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-dashboard-page">
      {/* Header */}

      <div className="admin-page-title">
        <h1>📊 DKSA Admin Dashboard</h1>

        <p>
          Manage bookings, revenue, turfs and players from one place.
        </p>
      </div>

      {/* Welcome Banner */}

      <div className="admin-banner">
        <div className="admin-banner-left">
          <h2>Welcome Back Admin 👋</h2>

          <p>
            Here's today's performance of
            <strong> Don Bosco Kohli Sports Academy</strong>.
          </p>
        </div>

        <div className="admin-banner-right">
          <div className="admin-circle">🏏</div>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats-section">
        <h2 className="section-title">
          <FaChartLine />
          Dashboard Overview
        </h2>

        <div className="stats-grid">
          <StatCard
            title="Total Revenue"
            value={`₹${report.totalRevenue}`}
            icon="💰"
          />

          <StatCard
            title="Total Bookings"
            value={report.totalBookings}
            icon="📅"
          />

          <StatCard
            title="Today's Revenue"
            value={`₹${report.todayRevenue}`}
            icon="💵"
          />

          <StatCard
            title="Today's Bookings"
            value={report.todayBookings}
            icon="🎯"
          />
        </div>
      </div>

      {/* Quick Actions */}

      <div className="admin-actions">
        <h2 className="section-title">
          ⚡ Quick Actions
        </h2>

        <div className="action-grid">
          <div
            className="action-card"
            onClick={() => navigate("/admin/create-booking")}
          >
            <div className="action-icon">
              <FaCalendarPlus />
            </div>

            <h3>Create Booking</h3>

            <p>
              Book slots directly without Razorpay for walk-in customers.
            </p>

            <button className="action-btn">
              Open Booking
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}

      <div className="analytics-section">
        <div className="analytics-header">
          <h2>📊 Revenue Analytics</h2>

          <span>Monthly Revenue Report</span>
        </div>

        <RevenueChart />
      </div>
    </div>
  );
}

export default AdminDashboard;