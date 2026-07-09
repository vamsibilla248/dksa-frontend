import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const auth = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password are required");

      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      auth.login(
        response.data.token,
        response.data.role,
        response.data.username
      );

      if (response.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        ```
        <div className="left-panel">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <img src="/src/logo/dksa.png" alt="DKSA" className="left-logo" />

          <h1>DKSA</h1>

          <p>Don Bosco Kohli Sports Academy</p>

          <h3>PLAY • TRAIN • WIN</h3>
        </div>
        <div className="right-panel">
          <h2>Login</h2>

          <p className="subtitle">Welcome Back Player</p>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="register-link">
            <Link to="/register">New User? Register Here</Link>
          </p>
        </div>
      </div>
      ```
    </div>
  );
}

export default Login;
