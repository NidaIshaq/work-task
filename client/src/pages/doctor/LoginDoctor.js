import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux/features/userSlice"; 
import { useNavigate } from "react-router-dom";

const LoginDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/doctor/loginDoctor", { email, password });
      console.log("Login response status:", res.status);
      console.log("Login response data:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        dispatch(setDoctor({ doctor: res.data.doctor, token: res.data.token }));
        navigate("/doctor");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-100">
      <div className="bg-white p-8 border-black rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Doctor Login Form</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">Register as a doctor</p>
        <button
          onClick={() => navigate("/registerDoctor")}
          className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 mt-2"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default LoginDoctor;
