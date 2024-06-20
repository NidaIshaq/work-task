import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "../../styles/DiseaseRecognition.css";
import { useNavigate } from 'react-router-dom';

const DiseaseRecognition = () => {
  const [animalType, setAnimalType] = useState(null);
  const [symptomsOptions, setSymptomsOptions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch symptoms from the backend
    axios.get('/api/getAllSymptoms')
      .then(response => {
        const options = response.data.map(symptom => ({
          value: symptom._id,
          label: symptom.name
        }));
        setSymptomsOptions(options);
      })
      .catch(error => {
        console.error('There was an error fetching the symptoms!', error);
      });
  }, []);

  const handleSearch = async () => {
    if (!animalType) {
      alert('Please select an animal type.');
      return;
    }
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom.');
      return;
    }

    try {
      const symptomIds = selectedSymptoms.map(option => option.value);
      const response = await axios.post('/api/searchDiseases', {
        animalType: animalType.value,
        symptoms: symptomIds
      });

      setSearchConducted(true); // Set searchConducted to true after a search
      if (response.data.success) {
        setResults(response.data.diseases);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('There was an error searching for diseases!', error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/diseaseDetails/${id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading'>Pet Health Finder</h1>
      </header>
      <div className="hero-section">
        <div className="hero-content">
          <h2>Welcome to <span style={{color:'#01443d'}}>Pet Health Finder</span></h2>
          <p className='page-text'>We know how much your pet means to you, and we're committed to helping you keep them healthy.</p>
          <p className='page-text'>By selecting the <span style={{color:'#01443d'}}>pet type</span> and entering any <span style={{color:'#01443d'}}>symptoms</span> you've noticed, you can discover potential health issues and find the care your pet needs.</p>
          <p className='page-text'>Let's ensure your pets live their best lives!</p>
        </div>
        <div className="hero-image">
          <img src="/pet3.jfif" alt="Pet Care" style={{width: '400px', height: '400px'}} />
        </div>
      </div>
      <div className="search-section">
        <div className="search-form">
          <div className="form-group">
            <label htmlFor="animalType">Animal Type</label>
            <Select
              id="animalType"
              options={[
                { value: 'cat', label: 'Cat' },
                { value: 'dog', label: 'Dog' }
              ]}
              onChange={setAnimalType}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms</label>
            <Select
              id="symptoms"
              options={symptomsOptions}
              isMulti
              value={selectedSymptoms}
              onChange={setSelectedSymptoms}
              required
            />
          </div>
          <button onClick={handleSearch} className="btn-submit">Search</button>
        </div>
        <p style={{fontSize:'15px', fontWeight:'bold'}}> Add 3 to 5 symptoms for better results</p>

        <div className="search-results">
          {/* <h2>Results</h2> */}
          {searchConducted && (
            <div className="results-grid">
              {results.length > 0 ? (
                results.map(disease => (
                  <div key={disease._id} className="disease-card" onClick={() => handleCardClick(disease._id)}>
                    <h3>{disease.name}</h3>
                    <p>{disease.description}</p>
                  </div>
                ))
              ) : (
                <p>No matching diseases found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiseaseRecognition;
