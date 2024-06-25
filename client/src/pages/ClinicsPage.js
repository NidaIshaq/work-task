import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function ClinicsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/v1/doctor/getAllDoctors');
        console.log("getAllDoctors working...");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = Array.isArray(doctors) ? doctors.filter((doctor) => {
    const firstName = doctor.firstName || '';
    const lastName = doctor.lastName || '';
    const clinicName = doctor.clinicName || '';
    const address = doctor.address || '';

    const nameMatch = `${firstName} ${lastName}`.toLowerCase().includes(searchName.toLowerCase()) ||
                      clinicName.toLowerCase().includes(searchName.toLowerCase());
    const locationMatch = address.toLowerCase().includes(searchLocation.toLowerCase());
    return nameMatch && locationMatch;
  }) : [];

  return (
    <div className="h-full w-full bg-teal-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Veterinary Clinics</h1>
      <h2 className="text-xl text-center mb-6">
        Welcome to our Veterinary Clinics. We provide comprehensive care for
        your pets with a team of dedicated professionals.
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Name or Clinic"
          className="px-4 py-2 border border-gray-300 rounded-md mr-4"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Location"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Registered Doctors</h3>
        <ul>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <li key={doctor._id} className="mb-4">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-lg font-large">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <p>Clinic Name: {doctor.clinicName}</p>
                  <p>Location: {doctor.address}</p>
                  <p>Specialty: {doctor.specialization}</p>
                  <p>Phone: {doctor.phone}</p>
                  <p>Fees: {doctor.feesPerCunsaltation}</p>
                  <p>Timings: {doctor.startTime} - {doctor.endTime}</p>
                  <Link to={`/applyAppointment/${doctor._id}`}>
                     <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                      Schedule an Appointment
                     </button>
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ClinicsPage;
