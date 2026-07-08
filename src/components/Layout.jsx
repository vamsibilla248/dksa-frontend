import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

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
