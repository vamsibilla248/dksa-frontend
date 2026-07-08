import { useState } from "react";

import { createTurf } from "../services/turfService";
import { uploadImage } from "../services/imageService";

import "../styles/AdminTurfs.css";

function AdminTurfs() {
  const [turfName, setTurfName] = useState("");
  const [location, setLocation] = useState("");
  const [turfType, setTurfType] = useState("");
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    try {
      let imageUrl = "";

      if (image) {
        const imageResponse = await uploadImage(image);
        imageUrl = imageResponse.data;
      }

      await createTurf({
        turfName,
        location,
        turfType,
        imageUrl,
      });

      alert("Turf Created Successfully");

      setTurfName("");
      setLocation("");
      setTurfType("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Unable To Create Turf");
    }
  };

  return (
    <div className="admin-turf-page">
      <div className="admin-turf-header">
        <h1>🏏 Create Turf</h1>

        <p>Add a new turf with image, location and turf type.</p>
      </div>

      <div className="admin-turf-card">
        <div className="form-group">
          <label>Turf Name</label>

          <input
            type="text"
            placeholder="Enter Turf Name"
            value={turfName}
            onChange={(e) => setTurfName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Turf Type</label>

          <input
            type="text"
            placeholder="Box Cricket / Net Cricket / Football"
            value={turfType}
            onChange={(e) => setTurfType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Turf Image</label>

          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {image && (
          <div className="preview-section">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}

        <button className="save-turf-btn" onClick={handleSave}>
          Save Turf
        </button>
      </div>
    </div>
  );
}

export default AdminTurfs;
