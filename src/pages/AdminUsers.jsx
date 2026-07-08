import { useEffect, useState } from "react";

import { getAllUsers, toggleUser } from "../services/adminUserService";

import "../styles/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getAllUsers();

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (userId, active) => {
    try {
      await toggleUser(userId, active);

      loadUsers();
    } catch (error) {
      console.error(error);

      alert("Unable To Update User");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users-page">
      {/* Header */}

      <div className="admin-users-header">
        <h1>👥 User Management</h1>

        <p>Manage customers, monitor account status and control user access.</p>
      </div>

      {/* Search */}

      <div className="user-search-card">
        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role-chip">{user.role}</span>
                  </td>

                  <td>
                    <span
                      className={`status-chip ${
                        user.active ? "active" : "inactive"
                      }`}
                    >
                      {user.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td>
                    {user.active ? (
                      <button
                        className="deactivate-btn"
                        onClick={() => handleToggle(user.id, false)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="activate-btn"
                        onClick={() => handleToggle(user.id, true)}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
