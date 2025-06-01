// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="text-end">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <h1 className="mt-3">Welcome to your Dashboard 🎉</h1>
      <p>You are logged in!</p>
    </div>
  );
};

export default Dashboard;
