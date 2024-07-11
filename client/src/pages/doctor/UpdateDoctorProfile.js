import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/AdminPanel.css";
import Sidebar from "../../components/Sidebar";

const UpdateDoctorProfile = () => {
  const navigate = useNavigate();
  const doctor = useSelector((state) => state.user.doctor);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    phone: "",
    email: "",
    clinicName: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
    startTime: "",
    endTime: ""
  });
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`api/v1/doctor/getDoctorData/${doctor._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          const doctorData = response.data;
          setDoctorId(doctorData._id);
          setFormData({
            firstName: doctorData.firstName,
            lastName: doctorData.lastName,
            cnic: doctorData.cnic,
            phone: doctorData.phone,
            email: doctorData.email,
            clinicName: doctorData.clinicName,
            address: doctorData.address,
            specialization: doctorData.specialization,
            experience: doctorData.experience,
            feesPerCunsaltation: doctorData.feesPerCunsaltation,
            startTime: doctorData.startTime,
            endTime: doctorData.endTime
          });
        }
      } catch (error) {
        console.error("There was an error fetching the doctor's details!", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.patch(`api/v1/doctor/updateDoctor/${doctor._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
    
        console.log("Profile updated successfully");
        alert("Profile updated successfully");

      }
    } catch (error) {
    
      console.error("There was an error updating the profile!", error);
      alert("There was an error updating the profile!", error);

    }
  };

  return (
    <div className="main-layout">
      <Sidebar 
        opt1="Appointments Requests" link1="/appointmentsPage" 
        opt2="Emergency Appointments" link2="/doctorPanelEmergencyPage" 
        opt3="Accepted Appointments" link3="/acceptedAppointments" 
        opt4="Update Profile" link4="/updateDoctorProfile"
      />
      <div className="content">
        <header className="top-nav">
          {formData.firstName && (
            <div className="doctor-info">
              <span className="doctor-name">Dr. {formData.firstName} {formData.lastName}</span>
            </div>
          )}
        </header>
        <main className="main-content">
          <h1 className="main-heading">Update Profile</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            ))}
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
              Update Profile
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UpdateDoctorProfile;
