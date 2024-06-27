import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-100">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 className="text-center text-2xl font-bold mb-4">Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/" className="block text-center text-teal-500 hover:underline mb-4">
          Already user? Login here
        </Link>
        <button className="btn btn-primary w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
