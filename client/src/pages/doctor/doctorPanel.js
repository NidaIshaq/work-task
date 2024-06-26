import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/AdminPanel.css"
import Sidebar from "../../components/Sidebar";

const DoctorPanel = () => {
    const navigate = useNavigate();
  
    return (
        
            <div className="main-layout">
              <Sidebar opt1="Appointments"/>
              <div className="content">
                <header className="top-nav">
                  <span className="notification-icon">🔔</span>
                </header>
                <main className="main-content">
                  <h1 className="main-heading">Doctor Panel</h1>
                </main>
              </div>
            </div>
          
    );
  
}

export default DoctorPanel
