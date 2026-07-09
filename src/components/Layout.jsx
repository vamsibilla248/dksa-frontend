import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Layout.css";

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
