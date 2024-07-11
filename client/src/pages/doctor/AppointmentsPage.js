import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/AdminPanel.css";
import "../../styles/AppointmentsPage.css";
import Sidebar from "../../components/Sidebar";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.user.doctor);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) return;

      try {
        const response = await axios.get(`/api/v1/doctor/fetchAppointments/${doctor._id}`);
        if (response.data.success) {
          
          setAppointments(response.data.appointments);
          console.log('Appointments fetched and filtered successfully:', response.data.appointments);
        } else {
          console.error("Failed to fetch appointments:", response.data.message);

        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctor]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.patch(`/api/v1/doctor/changeAppointmentStatus/${appointmentId}`, { status: newStatus });
      if (response.data.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === appointmentId ? { ...appointment, status: newStatus } : appointment
          )
        );
        console.log(`Appointment ${appointmentId} status changed to ${newStatus}`);
        alert(`Appointment ${appointmentId} status changed to ${newStatus}`);

      } else {
        console.error("Failed to update appointment status:", response.data.message);
        alert("Failed to update appointment status:", response.data.message);

      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar opt1="Appointments Requests" link1="/appointmentsPage" opt2="Emergency Appointments" link2="/doctorPanelEmergencyPage" opt3="Accepted Appointments" link3="/acceptedAppointments" opt4="Update Profile" link4="/updateDoctorProfile"/>
      <div className="content">
        <header className="top-nav">
          {doctor && (
            <div className="doctor-info">
              <span className="doctor-name">Dr. {doctor.firstName} {doctor.lastName}</span>
            </div>
          )}
        </header>
        <main className="main-content">
          <h1 className="main-heading">Appointments</h1>
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
                      onClick={() => handleStatusChange(appointment._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusChange(appointment._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Appointments Found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsPage;
