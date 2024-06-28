import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from '../redux/features/userSlice'; // Import setUser action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
  
      
      console.log("Form values:", values);
  
      
      const res = await axios.post("/api/v1/user/login", values);
    
    console.log("Login API response:", res.data);
  
    dispatch(hideLoading());

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      message.success("Login Successfully");

      
      dispatch(setUser({ user: res.data.user, token: res.data.token }));

      
      console.log("Login successful. Redirecting...");

      
      navigate("/");
    } else {
      message.error(res.data.message);
    
      console.log("Login failed:", res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.error("Error during login:", error);
    message.error("Something went wrong");

    console.error(error);
  }
};


return (
  <div className="flex justify-center items-center h-screen bg-teal-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-2xl font-bold mb-4">Login Form</h3>
        <Form layout="vertical" onFinish={onFinishHandler}>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="block text-center text-teal-500 hover:underline mb-4">
            Not a user? Register here
          </Link>
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
        </Form>
      </div>
    </div>
);
};

export default Login;



