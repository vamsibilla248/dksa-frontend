import { useState } from "react";

import Navbar from "../components/Navbar";

import { changePassword } from "../services/profileService";

import { useNavigate } from "react-router-dom";

import "../styles/ChangePassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      alert("Password Updated Successfully");

      navigate("/dashboard");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      alert("Unable To Change Password");
    }
  };

  return (
    <>

      <div className="change-password-page">
        <div className="change-password-card">
          <div className="change-password-header">
            <div className="password-avatar">🔒</div>

            <h1>Change Password</h1>

            <p>Secure your DKSA account with a strong password</p>
          </div>

          <div className="change-password-body">
            <div className="form-group">
              <label>Current Password</label>

              <input
                type="password"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="change-password-btn"
              onClick={handleChangePassword}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
