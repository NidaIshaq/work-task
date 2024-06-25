import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    return <p className="text-center mt-8 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-teal-100 flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="bg-teal-500 text-white w-full py-4 text-center">
        <h1 className="text-4xl font-bold">Diet Plan</h1>
      </div>

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto rounded-lg overflow-hidden md:flex mt-5 w-full">
        {/* Data Section */}
        <div className="md:w-2/3 p-6 bg-teal-100">
          {/* Dietary Goal Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Dietary Goal:</p>
            <p className="px-4 py-2">{dietPlan.dietaryGoal}</p>
          </div>
          {/* Morning Meal Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Morning Meal:</p>
            <p className="px-4 py-2">{dietPlan.morningMeal}</p>
          </div>
          {/* Afternoon Meal Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Afternoon Meal:</p>
            <p className="px-4 py-2">{dietPlan.afternoonMeal}</p>
          </div>
          {/* Late Afternoon Meal Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Late Afternoon Meal:</p>
            <p className="px-4 py-2">{dietPlan.lateAfternoonMeal}</p>
          </div>
          {/* Evening Meal Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Evening Meal:</p>
            <p className="px-4 py-2">{dietPlan.eveningMeal}</p>
          </div>
          {/* Supplements Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Supplements:</p>
            <p className="px-4 py-2">{dietPlan.supplements}</p>
          </div>
          {/* Additional Tips Section */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
            <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4 w-full">Additional Tips:</p>
            <p className="px-4 py-2">{dietPlan.additionalTips}</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 bg-teal-100 mt-28">
          <img
            src="/petFood2.png"
            alt="Diet Plan"
            className="w-full h-auto max-w-md"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DietPlanPage;
