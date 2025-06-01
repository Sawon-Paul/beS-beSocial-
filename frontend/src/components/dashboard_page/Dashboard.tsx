// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  dob: string;
  phone_number: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/")
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    // Remove token (if used), or reset session (based on your auth logic)
    localStorage.removeItem("token"); // if you stored a token
    navigate("/login"); // redirect to login page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>User Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            background: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
