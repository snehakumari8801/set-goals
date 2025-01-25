import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //let BASE_URL = 'http://localhost:3000/api'
  let BASE_URL = "https://set-goals.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/userdetails");
    } catch (err) {
      console.error("Error signing in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md 
            hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner-border animate-spin" role="status">
                <span className="sr-only h-10">Loading...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
        <Link to='/signup'>
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </a>
          </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
