// src/pages/Register.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    dob: "",
    phone_number: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:8000/register/", formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold">Register</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="block w-full p-2 mb-2 border border-gray-300"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
