import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmergencyAppointment() {
  
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/doctor/getAllDoctors");
        console.log("getAllDoctors working...");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = Array.isArray(doctors)
    ? doctors.filter((doctor) => {
        const firstName = doctor.firstName || "";
        const lastName = doctor.lastName || "";
        const clinicName = doctor.clinicName || "";
        const address = doctor.address || "";

        const nameMatch =
          `${firstName} ${lastName}`
            .toLowerCase()
            .includes(searchName.toLowerCase()) ||
          clinicName.toLowerCase().includes(searchName.toLowerCase());
        const locationMatch = address
          .toLowerCase()
          .includes(searchLocation.toLowerCase());
        return nameMatch && locationMatch;
      })
    : [];

  const handleEmergencyAppointment = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');  // Assuming you store the JWT token in localStorage
      const response = await axios.post('/api/v1/user/emergencyAppointment', {
        doctorId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Appointment created:', response.data);
      alert('You appointmentrequest is sent to the doctor, you will get a response soon')
    } catch (error) {
      console.error('Error creating appointment:', error);
      
    }
  };

  return (
    <div className="h-full w-full bg-teal-100 p-6">
      <header className="bg-teal-500 text-white w-full py-4 text-center mt-0">
        <h1 className="text-4xl font-bold">Veterinary Clinic</h1>
      </header>
      <h2 className="text-xl text-center mb-6">
        Welcome to our Veterinary Clinics. We provide comprehensive care for
        your pets with a team of dedicated professionals.
      </h2>

      <div className="flex justify-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search by Name or Clinic"
          className="px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-teal-500"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Location"
          className="px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-teal-500"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Registered Doctors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-teal-200 p-4 rounded-lg shadow-lg"
              >
                <div className="pb-4">
                  <p className="text-lg font-semibold">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <p className="text-lg">Clinic: {doctor.clinicName}</p>
                  <p className="text-lg">Location: {doctor.address}</p>
                  <p className="text-lg">Specialty: {doctor.specialization}</p>
                  <p className="text-lg">Phone: {doctor.phone}</p>
                  <p className="text-lg">Fees: {doctor.feesPerCunsaltation}</p>
                  <p className="text-lg">
                    Timings: {doctor.startTime} - {doctor.endTime}
                  </p>
                 
                  <button
                    onClick={() => handleEmergencyAppointment(doctor._id)}
                    className="h-8 px-4 tracking-wide inline-flex items-center justify-center shadow-lg font-medium rounded-md bg-red-500 text-white hover:bg-teal-600 cursor-pointer"
                  >
                    Emergency Appointment
                  </button>
                 
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmergencyAppointment;
