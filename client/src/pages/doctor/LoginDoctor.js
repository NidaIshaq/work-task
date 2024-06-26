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
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginDoctor;
