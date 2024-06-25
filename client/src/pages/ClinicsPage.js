import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <h3 className="text-2xl font-semibold mb-4 text-center">Registered Doctors</h3>
        <ul className="flex flex-col items-center">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <li key={doctor._id} className="mb-4 bg-teal-200 p-4 rounded-lg shadow-lg w-full max-w-md">
                <div className="pb-4">
                  <p className="text-lg font-large">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <div className="flex justify-between text-sm">
                    <p>Clinic: {doctor.clinicName}</p>
                    <p>Location: {doctor.address}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p>Specialty: {doctor.specialization}</p>
                    <p>Phone: {doctor.phone}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p>Fees: {doctor.feesPerCunsaltation}</p>
                    <p>Timings: {doctor.startTime} - {doctor.endTime}</p>
                  </div>
                  <button className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105">
                    Schedule an Appointment
                  </button>
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
