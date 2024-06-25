import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DiseaseDetails = () => {
  const { id } = useParams();
  const [disease, setDisease] = useState(null);
  const navigate = useNavigate();

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
        console.error(
          "There was an error fetching the disease details!",
          error
        );
      }
    };

    fetchDiseaseDetails();
  }, [id]);

  if (!disease) {
    return <p className="text-center mt-8 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center">
      <header className="bg-teal-500 text-white w-full py-4 text-center">
        <h1 className="text-4xl font-bold">Understand Your Pet's Problem</h1>
      </header>
      <div className="container mx-auto py-8 px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="lg:w-2/3 lg:mr-8">
            <h2 className="text-3xl font-bold my-4">{disease.name}</h2>
            
            {/* Description Section */}
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
              <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4">Description</p>
              <p className="px-4 py-2">{disease.description}</p>
            </div>

            {/* Treatment Section */}
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
              <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4">Treatment</p>
              <p className="px-4 py-2">{disease.treatment}</p>
            </div>

            {/* Symptoms Section */}
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg bg-white">
              <p className="text-lg font-semibold bg-teal-500 text-white py-2 px-4 rounded-full mx-auto mb-4">Symptoms</p>
              <ul className="list-disc list-inside px-4 py-2">
                {disease.symptoms.map((symptom) => (
                  <li key={symptom._id}>{symptom.name}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-lg">
                For the best care of your pet, it's important to follow the
                recommended diet plan and consult a veterinarian if symptoms
                persist.
              </p>
            </div>

            {/* Action Buttons Section */}
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/dietPlanPage/${id}`)}
                className="btn bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Diet Plan
              </button>
              <button
                onClick={() => navigate(`/clinicsPage`)}
                className="btn bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Schedule Appointment
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/3 mt-4 lg:mt-0">
            <img
              src="/dog2.png"
              alt="Disease illustration"
              className="w-full h-auto"
              style={{ maxWidth: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;