import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import "../styles/AdminPanel.css"
import "../styles/AddDisease.css"
import Sidebar from "./Sidebar";

const AddDisease = () => {
    const navigate = useNavigate();
    const [symptomsOptions, setSymptomsOptions] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [disease, setDisease] = useState({
        name: "",
        description: "",
        animalType: "",
        treatment: "",
        symptoms: []
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDisease({ ...disease, [name]: value });
    };

    const handleSymptomsChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions);
        setDisease({ ...disease, symptoms: selectedOptions.map(option => option.value) });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/addDisease', disease);
        if (response.data.success) {
          alert('Disease Added Successfully');
         
        } else {
          alert('Error adding disease');
        }
      } catch (error) {
        console.error('There was an error adding the disease!', error);
      
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
                    <h1 className="main-heading">Add Disease</h1>
                    <form onSubmit={handleSubmit} className="disease-form">
                        <div className="form-group">
                            <label htmlFor="name">Disease Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={disease.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={disease.description}
                                onChange={handleInputChange}
                                maxLength="1000"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="animalType">Animal Type</label>
                            <Select
                                id="animalType"
                                name="animalType"
                                options={[
                                    { value: 'cat', label: 'Cat' },
                                    { value: 'dog', label: 'Dog' }
                                ]}
                                onChange={option => setDisease({ ...disease, animalType: option.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="treatment">Treatment</label>
                            <textarea
                                type="text"
                                id="treatment"
                                name="treatment"
                                value={disease.treatment}
                                onChange={handleInputChange}
                                maxLength="1500"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="symptoms">Symptoms</label>
                            <Select
                                id="symptoms"
                                name="symptoms"
                                options={symptomsOptions}
                                isMulti
                                value={selectedSymptoms}
                                onChange={handleSymptomsChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddDisease;