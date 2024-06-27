import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../../styles/AdminPanel.css";
import Sidebar from "../../components/Sidebar";

const DoctorPanel = () => {
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.user.doctor);

  return (
    <div className="main-layout">
      <Sidebar opt1="Appointments Requests" link1="/appointmentsPage" opt2="Emergency Appointments" link2="" opt3="Accepted Appointments" link3=""/>
      <div className="content">
        <header className="top-nav">
          {/* <span className="notification-icon">🔔</span> */}
          {doctor && (
            <div className="doctor-info">
              <span className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</span>
              {/* <span className="doctor-id">ID: {doctor._id}</span> */}
            </div>
          )}
        </header>
        <main className="main-content">
          <h1 className="main-heading">Doctor Panel</h1>
        </main>
      </div>
    </div>
  );
}

export default DoctorPanel;
