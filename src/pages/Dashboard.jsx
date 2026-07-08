import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TurfCard from "../components/TurfCard";
import Footer from "../components/Footer";

import { getActiveTurfs } from "../services/turfService";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [turfs, setTurfs] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await getActiveTurfs();

        setTurfs(response.data);
      } catch (error) {
        console.error("Error loading turfs:", error);
      }
    };

    fetchTurfs();
  }, []);

  const handleSelectTurf = (turfId) => {
    navigate(`/booking/${turfId}`);
  };

  const filteredTurfs = turfs.filter((turf) =>
    turf.turfName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      

      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Book Your Turf</h1>

          <p className="dashboard-subtitle">
            Select a turf and reserve your slot.
          </p>

          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search Turf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="turf-grid">
          {filteredTurfs.length > 0 ? (
            filteredTurfs.map((turf) => (
              <TurfCard key={turf.id} turf={turf} onSelect={handleSelectTurf} />
            ))
          ) : (
            <div className="no-turf-found">
              <div className="no-turf-icon">🏏</div>

              <h2>No Turf Found</h2>

              <p>We couldn't find any turf matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
