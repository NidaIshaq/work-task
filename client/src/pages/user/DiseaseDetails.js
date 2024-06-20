import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../../styles/DiseaseDetails.css"; // Create and import your CSS file

const DiseaseDetails = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        const response = await axios.get(`/api/diseaseDetails/${id}`);
        if (response.data.success) {
          setDisease(response.data.disease);
        } else {
          setDisease(null);
        }
      } catch (error) {
        console.error('There was an error fetching the disease details!', error);
      }
    };

    fetchDiseaseDetails();
  }, [id]);

  if (!disease) {
    return <p>Loading...</p>;
  }

  return (
    <div className="disease-details-page">
      <header className="page-header">
        <h1 style={{color:'#01443d'}}>Understand Your Pet's Problem</h1>
        {/* <p>Here you'll find detailed information about common diseases affecting your pet. Make sure to follow the recommended diet plans and schedule regular check-ups with your veterinarian to ensure your pet stays healthy.</p> */}
      </header>
      <div className="disease-details-container">
        <div className="disease-details">
          <h2>{disease.name}</h2>
          <p className='headings'>Description:</p> 
          <p>{disease.description}</p>
          {/* <p><strong>Animal Type:</strong> {disease.animalType}</p> */}
          <p className='headings'>Treatment:</p>
          <p>{disease.treatment}</p>
          <div>
            <p className='headings'>Symptoms:</p>
            <ul>
              {disease.symptoms.map(symptom => (
                <li key={symptom._id}>{symptom.name}</li>
              ))}
            </ul>
          </div>
          <div className="instruction">
            <p>For the best care of your pet, it's important to follow the recommended diet plan and consult a veterinarian if symptoms persist.</p>
          </div>
          <div className="button-row">
            <button className="btn">Diet Plan</button>
            <button className="btn">Schedule Appointment</button>
          </div>
        </div>
        <div className="disease-image">
          <img src="/cat.jpeg" alt="Disease illustration" style={{width: '500px', height: '400px'}}/>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;
