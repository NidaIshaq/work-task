import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyAppointment = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token not found');
    }

    try {
      const res = await axios.post('/api/v1/user/applyAppointment', {
        date,
        time,
        doctorId
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Appointment created successfully:', res.data);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Apply for Appointment</button>
    </form>
  );
};

export default ApplyAppointment;
