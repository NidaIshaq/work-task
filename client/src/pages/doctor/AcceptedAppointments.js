import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/AdminPanel.css";
import "../../styles/AppointmentsPage.css"
import Sidebar from "../../components/Sidebar";

const AcceptedAppointments = () => {
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.user.doctor);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) return;

      try {
        const response = await axios.get(`/api/v1/doctor/acceptedAppointments/${doctor._id}`);
        if (response.data.success) {
          setAppointments(response.data.appointments);
          console.log('Accepted appointments fetched successfully:', response.data.appointments);
        } else {
          console.error("Failed to fetch accepted appointments:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching accepted appointments:", error);
      }
    };

    fetchAppointments();
  }, [appointments]);

  const handleDone = async (appointmentId) => {
    try {
      const response = await axios.patch(`/api/v1/doctor/changeAppointmentStatusToDone/${appointmentId}`);
      if (response.data.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === appointmentId ? { ...appointment, status: 'done' } : appointment
          )
        );
        console.log(`Appointment ${appointmentId} status changed to done`);
        alert(`Appointment ${appointmentId} status changed to done`);

      } else {
        console.error("Failed to update appointment status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating appointment status to done:", error);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar opt1="Appointments Requests" link1="/appointmentsPage" opt2="Emergency Appointments" link2="/doctorPanelEmergencyPage" opt3="Accepted Appointments" link3="/acceptedAppointments"/>
      <div className="content">
        <header className="top-nav">
          {doctor && (
            <div className="doctor-info">
              <span className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</span>
            </div>
          )}
        </header>
        <main className="main-content">
          <h1 className="main-heading">Accepted Appointments</h1>
          <div className="appointments-list">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment._id} className="appointment-card">
                  <div><strong>User Name:</strong> {appointment.user.name}</div>
                  <div><strong>Email:</strong> {appointment.user.email}</div>
                  <div><strong>Date:</strong> {appointment.date}</div>
                  <div><strong>Time:</strong> {appointment.time}</div>
                  <div><strong>Status:</strong> {appointment.status}</div>
                  <div className="button-group">
                    <button
                      className="accept-button"
                      onClick={() => handleDone(appointment._id)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No accepted appointments found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AcceptedAppointments;
