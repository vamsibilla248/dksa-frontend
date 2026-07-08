import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaLock,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "../styles/Navbar.css";

function Navbar() {
  const { role, logout, username } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getLinkClass = ({ isActive }) =>
    isActive ? "active-link" : "";

  return (
    <>
      {/* ==========================
          DESKTOP NAVBAR
      ========================== */}

      <nav className="navbar">
        {/* LEFT */}

        <div className="navbar-left">
          {/* LOGO */}

          <div className="navbar-brand-section">
            <img
              src="/src/logo/dksa-logo.png"
              alt="DKSA"
              className="navbar-logo"
            />

            <div className="brand-text">
              <h2>DKSA</h2>

              <span>SPORTS ARENA</span>
            </div>
          </div>

          {/* NAVIGATION */}

          <div className="navbar-links">
            {role === "CUSTOMER" && (
              <>
                <NavLink
                  to="/dashboard"
                  className={getLinkClass}
                >
                  <FaHome />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/my-bookings"
                  className={getLinkClass}
                >
                  <FaCalendarAlt />
                  My Bookings
                </NavLink>

                <NavLink
                  to="/profile"
                  className={getLinkClass}
                >
                  <FaUser />
                  Profile
                </NavLink>

                <NavLink
                  to="/change-password"
                  className={getLinkClass}
                >
                  <FaLock />
                  Change Password
                </NavLink>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className={getLinkClass}
                >
                  <FaHome />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/turfs"
                  className={getLinkClass}
                >
                  🌱 Turfs
                </NavLink>

                <NavLink
                  to="/admin/slots"
                  className={getLinkClass}
                >
                  🕒 Slots
                </NavLink>

                <NavLink
                  to="/admin/bookings"
                  className={getLinkClass}
                >
                  📖 Bookings
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className={getLinkClass}
                >
                  👥 Users
                </NavLink>

                <NavLink
                  to="/admin/calendar"
                  className={getLinkClass}
                >
                  📅 Calendar
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div className="navbar-right">
          <div
            className="user-chip"
            ref={profileRef}
          >
            <div className="user-avatar">
              {username?.charAt(0)?.toUpperCase()}
            </div>

            <div className="user-info">
              <small>Welcome</small>

              <span>{username}</span>
            </div>

            <FaChevronDown className="arrow-icon" />
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>      {/* =====================================
          MOBILE NAVBAR
      ===================================== */}

      <div className="mobile-navbar">

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        <div className="mobile-brand">

          <img
            src="/src/logo/dksa-logo.png"
            alt="DKSA"
            className="mobile-logo"
          />

          <div className="mobile-brand-text">

            <h3>DKSA</h3>

            <span>SPORTS ARENA</span>

          </div>

        </div>

        <div className="mobile-user-chip">

          {username?.charAt(0)?.toUpperCase()}

        </div>

      </div>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      {menuOpen && (

        <div className="mobile-menu">

          <div className="mobile-user-info">

            <div className="mobile-user-avatar">

              {username?.charAt(0)?.toUpperCase()}

            </div>

            <div className="mobile-user-details">

              <h4>{username}</h4>

              <p>{role}</p>

            </div>

          </div>

          {/* CUSTOMER MENU */}

          {role === "CUSTOMER" && (
            <>

              <NavLink
                to="/dashboard"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/my-bookings"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaCalendarAlt />
                <span>My Bookings</span>
              </NavLink>

              <NavLink
                to="/profile"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/change-password"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaLock />
                <span>Change Password</span>
              </NavLink>

            </>
          )}

          {/* ADMIN MENU */}

          {role === "ADMIN" && (
            <>

              <NavLink
                to="/admin/dashboard"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/admin/turfs"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                🌱
                <span>Turfs</span>
              </NavLink>

              <NavLink
                to="/admin/slots"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                🕒
                <span>Slots</span>
              </NavLink>

              <NavLink
                to="/admin/bookings"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                📖
                <span>Bookings</span>
              </NavLink>

              <NavLink
                to="/admin/users"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                👥
                <span>Users</span>
              </NavLink>

              <NavLink
                to="/admin/calendar"
                className={getLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                📅
                <span>Calendar</span>
              </NavLink>

            </>
          )}

          <button
            className="mobile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}

    </>

  );

}

export default Navbar;