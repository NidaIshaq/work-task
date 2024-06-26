import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section id="services" className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-teal-200 shadow-lg rounded-lg p-2">
          <h1 className="font-semibold text-lg mb-2">
            Identify your pet's disease
          </h1>
          <img
            src="/service_1-removebg-preview.png" // Ensure the path is correct
            alt="Image 1"
            className="w-full h-auto rounded-lg mb-2"
          />
          <div className="mt-2 mb-1">
            <Link
              to="/diseaseRecognition"
              className="h-8 px-4 tracking-wide inline-flex items-center justify-center shadow-lg font-medium rounded-md bg-teal-500 text-black hover:bg-teal-600 cursor-pointer"
            >
              Disease Recognition
              <i className="mdi mdi-chevron-right ms-1"></i>
            </Link>
          </div>
        </div>
        <div className="bg-teal-200 shadow-lg rounded-lg p-2">
          <h1 className="font-semibold text-lg mb-2">Schedule Appointment</h1>
          <img
            src="/ser2.png" // Ensure the path is correct
            alt="Image 2"
            className="w-full h-auto mt-20 rounded-lg mb-2"
          />
          <div className="mt-20 mb-1">
            <Link
              to="/clinicsPage"
              className="h-8 px-4 tracking-wide inline-flex items-center justify-center shadow-lg font-medium rounded-md bg-teal-500 text-black hover:bg-teal-600 cursor-pointer"
            >
              Book an appointment
              <i className="mdi mdi-chevron-right ms-1"></i>
            </Link>
          </div>
        </div>
        <div className="bg-teal-200 shadow-lg rounded-lg p-2">
          <h1 className="font-semibold text-lg mb-2">Community Forum</h1>
          <img
            src="/service3.png" // Ensure the path is correct
            alt="Image 3"
            className="w-full h-auto rounded-lg mb-2"
          />
          <div className="mt-8">
            <Link
              to="/communityForum"
              className="h-8 px-4 tracking-wide inline-flex items-center justify-center shadow-lg font-medium rounded-md bg-teal-500 text-black hover:bg-teal-600 cursor-pointer"
            >
              Community Forum
              <i className="mdi mdi-chevron-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
