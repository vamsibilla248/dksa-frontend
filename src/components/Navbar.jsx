import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaLock,
  FaUsers,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import logo from "../logo/dksa.png";

import "../styles/Navbar.css";

function Navbar() {
  const { role, username, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const activeClass = ({ isActive }) => (isActive ? "active-link" : "");

  return (
    <>
      {/* Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
      {/* ==========================
          DESKTOP NAVBAR
      ========================== */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-brand-section">
            <img src={logo} alt="DKSA" className="navbar-logo" />

            <div className="brand-text">
              <h2>DKSA</h2>

              <span>SPORTS ACADAMY</span>
            </div>
          </div>

          <div className="navbar-links">
            {role === "CUSTOMER" && (
              <>
                <NavLink to="/dashboard" className={activeClass}>
                  <FaHome />
                  Dashboard
                </NavLink>

                <NavLink to="/my-bookings" className={activeClass}>
                  <FaCalendarAlt />
                  My Bookings
                </NavLink>

                <NavLink to="/profile" className={activeClass}>
                  <FaUser />
                  Profile
                </NavLink>

                <NavLink to="/change-password" className={activeClass}>
                  <FaLock />
                  Change Password
                </NavLink>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <NavLink to="/admin/dashboard" className={activeClass}>
                  <FaHome />
                  Dashboard
                </NavLink>

                <NavLink to="/admin/users" className={activeClass}>
                  <FaUsers />
                  Users
                </NavLink>

                <NavLink to="/admin/bookings" className={activeClass}>
                  <FaCalendarAlt />
                  Bookings
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-chip">
            <div className="user-avatar">
              {username?.charAt(0)?.toUpperCase()}
            </div>

            <div className="user-info">
              <small>Welcome</small>

              <span>{username}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      {/* ==========================
          MOBILE NAVBAR
      ========================== */}
      <div className="mobile-navbar">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>

        <div className="mobile-brand">
          <img src={logo} alt="DKSA" className="mobile-logo" />

          <div className="mobile-brand-text">
            <h3>DKSA</h3>

            <span>SPORTS ACADAMY</span>
          </div>
        </div>

        <div className="mobile-user-chip">
          {username?.charAt(0)?.toUpperCase()}
        </div>
      </div>
      {/* ==========================
  MOBILE MENU
========================== */}
      {menuOpen && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-user-info">
            <div className="mobile-user-avatar">
              {username?.charAt(0)?.toUpperCase()}
            </div>

            <div className="mobile-user-details">
              <h4>{username}</h4>

              <p>{role}</p>
            </div>

            <button
              className="menu-btn"
              onClick={closeMenu}
              style={{
                marginLeft: "auto",
                width: "40px",
                height: "40px",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {role === "CUSTOMER" && (
            <>
              <NavLink
                to="/dashboard"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/my-bookings"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaCalendarAlt />
                <span>My Bookings</span>
              </NavLink>

              <NavLink
                to="/profile"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaUser />
                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/change-password"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaLock />
                <span>Change Password</span>
              </NavLink>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <NavLink
                to="/admin/dashboard"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/admin/users"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaUsers />
                <span>Users</span>
              </NavLink>

              <NavLink
                to="/admin/bookings"
                className={activeClass}
                onClick={closeMenu}
              >
                <FaCalendarAlt />
                <span>Bookings</span>
              </NavLink>
            </>
          )}

          <button className="mobile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}{" "}
    </>
  );
}

export default Navbar;
