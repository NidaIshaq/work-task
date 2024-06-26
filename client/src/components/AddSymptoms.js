import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/AdminPanel.css"
import "../styles/AddSymptoms.css"
import Sidebar from "./Sidebar";

const AddSymptoms = () => {
  const navigate = useNavigate();
  const [symptom, setSymptom] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/api/add-symptom', {
              name: symptom
          });

          const data = response.data;

          if (data.success) {
              setMessage(data.message);
              setSymptom(""); // Clear the input field
          } else {
              setMessage(data.message || 'Error adding symptom');
          }
      } catch (error) {
          console.error("Error:", error);
          setMessage("Server error");
      }
  };
  
    return (
        
            <div className="main-layout">
              <Sidebar opt1="Add Symptoms" link1="/addSymptoms" opt2="Add Diseases" link2="/addDisease" opt3="Add Diet Plan" link3="/addDietPlan"/>
              <div className="content">
                <header className="top-nav">
                  <span className="user-name">RAFIA MOAZUM</span>
                  <span className="notification-icon">🔔</span>
                </header>
                <main className="main-content">
                  <h1 className="main-heading">Add Symptoms</h1>
                  <form onSubmit={handleSubmit} className="symptom-form">
                        <label htmlFor="symptomInput" className="form-label">
                            Enter the Symptom:
                        </label>
                        <input
                            type="text"
                            id="symptomInput"
                            className="form-input"
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-submit">
                            Add
                        </button>
                    </form>
                    {message && <p>{message}</p>}
                </main>
              </div>
            </div>
          
    );
  
}

export default AddSymptoms
