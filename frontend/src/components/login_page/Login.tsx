// src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email_or_username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login/",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold">Login</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="email_or_username"
          value={credentials.email_or_username}
          onChange={handleChange}
          placeholder="Email or Username"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
