import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import "../styles/Profile.css";

import { getProfile, updateProfile } from "../services/profileService";

function Profile() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      setName(response.data.name);

      setEmail(response.data.email);

      setMobileNumber(response.data.mobileNumber);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({
        name,

        mobileNumber,
      });

      alert("Profile Updated");
    } catch (error) {
      console.error(error);

      alert("Unable To Update");
    }
  };

  return (
    <>

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {name?.charAt(0)?.toUpperCase() || "V"}
            </div>

            <h1>Hi, {name}</h1>

            <p>Welcome back to DKSA Sports Academy</p>
          </div>

          <div className="profile-body">
            {!isEditing ? (
              <>
                <div className="profile-view-card">
                  <div className="profile-detail-row">
                    <span>Full Name</span>
                    <strong>{name}</strong>
                  </div>

                  <div className="profile-detail-row">
                    <span>Email Address</span>
                    <strong>{email}</strong>
                  </div>

                  <div className="profile-detail-row">
                    <span>Mobile Number</span>
                    <strong>{mobileNumber}</strong>
                  </div>
                </div>

                <button
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>

                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                <div className="profile-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="update-profile-btn"
                    onClick={async () => {
                      await handleUpdate();

                      setIsEditing(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
