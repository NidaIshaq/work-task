import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPanel.css";
import Sidebar from "../../components/Sidebar";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="main-layout">
      <Sidebar
        opt1="Add Symptoms"
        link1="/addSymptoms"
        opt2="Add Diseases"
        link2="/addDisease"
        opt3="Add Diet Plan"
        link3="/addDietPlan"
      />
      <div className="content">
        <header className="top-nav">
        </header>
        <main className="main-content">
          <h1 className="main-heading">Admin Panel</h1>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
