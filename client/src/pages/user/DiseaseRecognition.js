import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DiseaseRecognition = () => {
  const [animalType, setAnimalType] = useState(null);
  const [symptomsOptions, setSymptomsOptions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [results, setResults] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch symptoms from the backend
    axios
      .get("/api/getAllSymptoms")
      .then((response) => {
        const options = response.data.map((symptom) => ({
          value: symptom._id,
          label: symptom.name,
        }));
        setSymptomsOptions(options);
      })
      .catch((error) => {
        console.error("There was an error fetching the symptoms!", error);
      });
  }, []);

  const handleSearch = async () => {
    if (!animalType) {
      alert("Please select an animal type.");
      return;
    }
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    try {
      const symptomIds = selectedSymptoms.map((option) => option.value);
      const response = await axios.post("/api/searchDiseases", {
        animalType: animalType.value,
        symptoms: symptomIds,
      });

      setSearchConducted(true); // Set searchConducted to true after a search
      if (response.data.success) {
        setResults(response.data.diseases);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("There was an error searching for diseases!", error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/diseaseDetails/${id}`);
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center w-full">
      <header  className="bg-teal-500 text-white w-full py-4 text-center">
        <h1 className="text-4xl font-bold ">Pet Health Finder</h1>
      </header>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl px-4 py-8 lg:py-16">
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome to <span className="text-teal-700">Pet Health Finder</span>
          </h2>
          <p className="text-lg mb-2">
            We know how much your pet means to you, and we're committed to
            helping you keep them healthy.
          </p>
          <p className="text-lg mb-2">
            By selecting the <span className="text-teal-700">pet type</span> and
            entering any <span className="text-teal-700">symptoms</span> you've
            noticed, you can discover potential health issues and find the care
            your pet needs.
          </p>
          <p className="text-lg mb-2">
            Let's ensure your pets live their best lives!
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/pet4.png"
            alt="Pet Care"
            className="w-80 h-80 ml-10 "
          />
        </div>
      </div>
      <div className="w-full max-w-4xl px-4 py-8 bg-white rounded-lg shadow-md mb-12">
        <div className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="animalType"
              className="block text-sm font-medium text-gray-700"
            >
              Animal Type
            </label>
            <Select
              id="animalType"
              options={[
                { value: "cat", label: "Cat" },
                { value: "dog", label: "Dog" },
              ]}
              onChange={setAnimalType}
              required
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-700"
            >
              Symptoms
            </label>
            <Select
              id="symptoms"
              options={symptomsOptions}
              isMulti
              value={selectedSymptoms}
              onChange={setSelectedSymptoms}
              required
              className="mt-1"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
        <p className="text-center text-sm font-semibold mb-6">
          Add 3 to 5 symptoms for better results
        </p>
        <div className="mt-6 ">
          {searchConducted && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.length > 0 ? (
                results.map((disease) => (
                  <div
                    key={disease._id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
                    onClick={() => handleCardClick(disease._id)}
                  >
                    <h3 className="text-xl font-bold mb-2">{disease.name}</h3>
                    <p className="text-gray-700">{disease.description}</p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-700">
                  No matching diseases found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseRecognition;
