import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, message } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        throw new Error(res.data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error(error.message || "Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "_id" },
    {
      title: "Name",
      dataIndex: "doctorInfo",
      render: (doctorInfo) => (
        <span>{`${doctorInfo.firstName} ${doctorInfo.lastName}`}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "doctorInfo.phone",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date, record) => (
        <span>
          {moment(date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;

