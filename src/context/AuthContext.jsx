import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [role, setRole] = useState(localStorage.getItem("role"));

  const [username, setUsername] = useState(localStorage.getItem("username"));

  const login = (jwt, userRole, userName) => {
    localStorage.setItem("token", jwt);

    localStorage.setItem("role", userRole);

    localStorage.setItem("username", userName);

    setToken(jwt);

    setRole(userRole);

    setUsername(userName);
  };

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    setToken(null);

    setRole(null);

    setUsername(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        username,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
