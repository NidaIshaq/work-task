import React from "react";
// import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form submit handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      // Log the values being submitted
      console.log("Form values:", values);

      // Make a POST request to login endpoint
      const res = await axios.post("/api/v1/user/login", values);

      // Log the response data for debugging
      console.log("Login API response:", res.data);

      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");

        // Log success message
        console.log("Login successful. Redirecting...");

        // Navigate to home page
        navigate("/");
      } else {
        message.error(res.data.message);
        // Log error message from API
        console.log("Login failed:", res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error during login:", error);
      message.error("Something went wrong");

      // Log the error for further investigation
      console.error(error);
    }
  };

  return (
    <div className="form-container ">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
