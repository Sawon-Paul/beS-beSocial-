// src/pages/Home.tsx
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Welcome to Our App</h1>
      <nav className="mt-4">
        <Link to="/login" className="text-blue-500">
          Login
        </Link>{" "}
        |{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </nav>
    </div>
  );
};

export default Home;
