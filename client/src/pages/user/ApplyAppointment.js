import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyAppointment = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token not found');
    }

    // Validate date and time
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    if (selectedDateTime <= currentDateTime) {
      setErrorMessage('Please select a future date and time.');
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios.post('/api/v1/user/applyAppointment', {
        date,
        time,
        doctorId
      }, {
        headers: { Authorization: `Bearer ${token}`},
      });

      console.log('Appointment created successfully:', res.data);
      setSuccessMessage(`Your appointment on ${new Date(date).toDateString()} at ${time} has been booked successfully.`);
      setShowAlert(true); // Show success alert
      // Optionally, you can clear the form fields after successful booking
      setDate('');
      setTime('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setErrorMessage('Error booking appointment. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-teal-100 py-6">
      {showAlert && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-md">
            <div className="flex justify-end">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAlert(false)}>X</button>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-center">Appointment Status</h2>
              <p className="text-center">{errorMessage}</p>
              <p className="text-center">{successMessage}</p>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        </div>
      )}
      <header className="bg-teal-500 text-white w-full py-4 text-center">
        <h1 className="text-4xl font-bold mt-0">Book an Appointment</h1>
      </header>
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg w-full mt-2">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md mb-4 lg:mr-8 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-1 focus:ring-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow focus:ring-1 focus:ring-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded-md shadow-lg font-medium hover:bg-teal-600"
            >
              Apply for Appointment
            </button>
          </form>
        </div>
        <div className="relative max-w-md w-full lg:w-1/2">
          <img
            src="/hero11-removebg-preview.png"
            className="relative z-10"
            alt="Hero"
            style={{
              width: "100%", // Adjust the width to fit the container
              height: "auto", // Maintain aspect ratio
            }}
          />
          <div
            className="absolute bg-white bottom-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 md:w-[500px] w-[400px] h-[400px] md:h-[500px] shadow-md shadow-teal-500/10 rounded-full"
            style={{ clipPath: "circle(50% at 50% 50%)" }}
          ></div>
        </div>
      </div>
      <div className="max-w-md w-full p-6 mt-4 text-center">
        <h2 className="text-lg font-semibold mb-2">Patient Information</h2>
        <p>Please arrive 15 minutes before your appointment time.</p>
        <p>Bring any medical records or relevant documents.</p>
        <p>Payment is due at the time of appointment.</p>
      </div>
    </div>
  );
};

export default ApplyAppointment;