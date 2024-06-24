import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import "../styles/AdminPanel.css"
import "../styles/AddDisease.css"
import Sidebar from "./Sidebar";

const AddDietPlan = () => {
    const [diseaseOptions, setDiseaseOptions] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [dietPlan, setDietPlan] = useState({
        dietaryGoal: "",
        morningMeal: "",
        afternoonMeal: "",
        lateAfternoonMeal: "",
        eveningMeal: "",
        supplements: "",
        additionalTips: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/getAllDiseases')
            .then(response => {
                const options = response.data.map(disease => ({
                    value: disease._id,
                    label: disease.name
                }));
                setDiseaseOptions(options);
            })
            .catch(error => {
                console.error("There was an error fetching the diseases!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDietPlan({ ...dietPlan, [name]: value });
    };

    const handleDiseaseChange = (selectedOption) => {
        setSelectedDisease(selectedOption);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dietPlanData = {
            ...dietPlan,
            disease: selectedDisease.value
        };

        axios.post('/api/addDietPlan', dietPlanData)
            .then(response => {
                console.log('Diet plan added successfully', response.data);
                alert('Diet Plan added successfully!');

                // Reset the form state to clear the inputs
                setDietPlan({
                    dietaryGoal: "",
                    morningMeal: "",
                    afternoonMeal: "",
                    lateAfternoonMeal: "",
                    eveningMeal: "",
                    supplements: "",
                    additionalTips: ""
                });
                setSelectedDisease(null);
            })
            .catch(error => {
                console.error("There was an error creating the diet plan!", error);
            });
    };

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">
                <header className="top-nav">
                    <span className="user-name">RAFIA MOAZUM</span>
                    <span className="notification-icon">🔔</span>
                </header>
                <main className="main-content">
                    <h1 className="main-heading">Add Diet Plan</h1>
                    <form className="disease-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="disease">Disease Name</label>
                            <Select
                                id="disease"
                                options={diseaseOptions}
                                onChange={handleDiseaseChange}
                                placeholder="Select a disease"
                                isSearchable
                                value={selectedDisease}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dietaryGoal">Dietary Goal</label>
                            <textarea
                                id="dietaryGoal"
                                name="dietaryGoal"
                                value={dietPlan.dietaryGoal}
                                onChange={handleInputChange}
                                maxLength="1000"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="morningMeal">Morning Meal</label>
                            <input
                                id="morningMeal"
                                name="morningMeal"
                                type="text"
                                value={dietPlan.morningMeal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="afternoonMeal">Afternoon Meal</label>
                            <input
                                id="afternoonMeal"
                                name="afternoonMeal"
                                type="text"
                                value={dietPlan.afternoonMeal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lateAfternoonMeal">Late Afternoon Meal</label>
                            <input
                                id="lateAfternoonMeal"
                                name="lateAfternoonMeal"
                                type="text"
                                value={dietPlan.lateAfternoonMeal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="eveningMeal">Evening Meal</label>
                            <input
                                id="eveningMeal"
                                name="eveningMeal"
                                type="text"
                                value={dietPlan.eveningMeal}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="supplements">Supplements</label>
                            <input
                                id="supplements"
                                name="supplements"
                                type="text"
                                value={dietPlan.supplements}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="additionalTips">Additional Tips</label>
                            <textarea
                                id="additionalTips"
                                name="additionalTips"
                                value={dietPlan.additionalTips}
                                onChange={handleInputChange}
                                maxLength="1000"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-submit">Submit</button>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddDietPlan;
