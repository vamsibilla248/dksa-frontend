import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    fetch("https://dksa-backend.onrender.com/health")
      .then((response) => response.text())
      .then((data) => console.log("Backend status:", data))
      .catch((error) => console.error("Backend error:", error));
  }, []);

  return <AppRoutes />;
}

export default App;
