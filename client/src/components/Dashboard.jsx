import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("/api/v1/admin/getAllDoctors", {
          withCredentials: true,
        });
        setDoctors(data.response || []); // Assuming the response contains an array of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Handle errors properly
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.firstName.toLowerCase().includes(searchName.toLowerCase()) &&
      doctor.address.toLowerCase().includes(searchLocation.toLowerCase())
    );
  });

  return (
    <div className="h-full w-full bg-teal-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        Veterinary Clinics
      </h1>
      <h2 className="text-xl text-center mb-6">
        Welcome to our Veterinary Clinics. We provide comprehensive care for
        your pets with a team of dedicated professionals.
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Name"
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
                  <p className="text-lg font-medium">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <p>Location: {doctor.address}</p>
                  <p>Specialty: {doctor.specialization}</p>
                  <p>Phone: {doctor.phone}</p>
                  <p>Email: {doctor.email}</p>
                  <p>Website: {doctor.website}</p>
                  <p>Experience: {doctor.experience}</p>
                  <p>Fees: {doctor.feesPerCunsaltation}</p>
                  <p>Timings: {doctor.timings}</p>
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

export default Dashboard;
