import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/DietPlanPage.css";

const DietPlanPage = () => {
  const { diseaseId } = useParams();
  const [dietPlan, setDietPlan] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await axios.get(`/api/fetchDietPlan/${diseaseId}`);
        if (response.data.success) {
          setDietPlan(response.data.dietPlan);
        } else {
          setDietPlan(null);
        }
      } catch (error) {
        console.error("There was an error fetching the diet plan!", error);
      }
    };

    fetchDietPlan();
  }, [diseaseId]);

  if (!dietPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="diet-plan-page">
      <div className="diet-plan-card">
        <div className="image-placeholder">
          <img src="/petFood2.png" alt="Diet Plan" /> 
        </div>
        <p><span className="heading">Dietary Goal:</span>{dietPlan.dietaryGoal}</p>
        <p><span className="heading">Morning Meal:</span> {dietPlan.morningMeal}</p>
        <p><span className="heading">Afternoon Meal:</span> {dietPlan.afternoonMeal}</p>
        <p><span className="heading">Late Afternoon Meal:</span> {dietPlan.lateAfternoonMeal}</p>
        <p><span className="heading">Evening Meal:</span> {dietPlan.eveningMeal}</p>
        <p><span className="heading">Supplements:</span> {dietPlan.supplements}</p>
        <p><span className="heading">Additional Tips:</span> {dietPlan.additionalTips}</p>
      </div>
    </div>
  );
};

export default DietPlanPage;
