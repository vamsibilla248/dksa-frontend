import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        ```
        <div className="register-header">
          <div className="register-logo-wrapper">
            <img
              src="/src/logo/dksa-logo.png"
              alt="DKSA"
              className="register-logo"
            />
          </div>

          <h1>DKSA</h1>

          <p>Don Bosco Kohli Sports Academy</p>
        </div>
        <div className="register-body">
          <h2>Create Account</h2>

          <p className="register-subtitle">
            Join DKSA and start booking your turf slots
          </p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

            <p className="login-link">
              Already have an account?
              <span onClick={() => navigate("/")}>Login</span>
            </p>
          </form>
        </div>
      </div>
      ```
    </div>
  );
}

export default Register;
