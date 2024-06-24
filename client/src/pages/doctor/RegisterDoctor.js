import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/RegisterDoctor.css';

const RegisterDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cnic: '',
    phone: '',
    email: '',
    clinicName: '',
    password: '',
    address: '',
    specialization: '',
    experience: '',
    feesPerCunsaltation: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/doctor/registerDoctor', formData);
      console.log('Form submitted successfully:', response.data);
      alert("Doctor Registered Successfully")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="docContainer">
      <h2>Apply As a Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="personal-details">
          <h3>Personal Details :</h3>
          <div className="form-group">
            <label htmlFor="firstName">First Name <span className="required">*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="lastName">Last Name <span className="required">*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="cnic">CNIC <span className="required">*</span></label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="phone">Phone No <span className="required">*</span></label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="website">Clinic Name</label>
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              className="input-field"
            />
            <label htmlFor="address">Address <span className="required">*</span></label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        <div className="professional-details">
          <h3>Professional Details :</h3>
          <div className="form-group">
            <label htmlFor="specialization">Specialization <span className="required">*</span></label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="experience">Experience <span className="required">*</span></label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="feesPerCunsaltation">Fees Per Consultation <span className="required">*</span></label>
            <input
              type="number"
              id="feesPerCunsaltation"
              name="feesPerCunsaltation"
              value={formData.feesPerCunsaltation}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time <span className="required">*</span></label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="endTime">End Time <span className="required">*</span></label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label htmlFor="password">Password <span className="required">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterDoctor;