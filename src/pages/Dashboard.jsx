import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import TurfCard from "../components/TurfCard";
import { getActiveTurfs } from "../services/turfService";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTurfs();
  }, []);

  const loadTurfs = async () => {
    try {
      const response = await getActiveTurfs();
      setTurfs(response.data || []);
    } catch (error) {
      console.error("Error loading turfs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTurf = (id) => {
    navigate(`/booking/${id}`);
  };

  const filteredTurfs = useMemo(() => {
    return turfs.filter((turf) =>
      turf.turfName.toLowerCase().includes(search.toLowerCase())
    );
  }, [turfs, search]);

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <h1 className="dashboard-title">Book Your Turf</h1>

        <p className="dashboard-subtitle">
          Choose your favourite turf and reserve your slot instantly.
        </p>

        <div className="search-wrapper">
          <div className="search-input">
            <FaSearch />

            <input
              type="text"
              placeholder="Search Turf..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ================= AVAILABLE HEADER ================= */}

      {/*<div className="available-header">
        <h2>
          Available Turfs
          <span className="count-badge">{filteredTurfs.length}</span>
        </h2>
      </div>*/}

      {/* ================= TURF GRID ================= */}

      {loading ? (
        <div className="no-turf">
          <h2>Loading...</h2>
        </div>
      ) : filteredTurfs.length === 0 ? (
        <div className="no-turf">
          <div className="no-turf-icon">🏏</div>

          <h2>No Turf Found</h2>

          <p>No turf matches your search.</p>
        </div>
      ) : (
        <div className="turf-grid">
          {filteredTurfs.map((turf) => (
            <TurfCard key={turf.id} turf={turf} onSelect={handleSelectTurf} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
