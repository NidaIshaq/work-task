import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/AdminPanel.css"
import Sidebar from "../../components/Sidebar";

const AdminPanel = () => {
    const navigate = useNavigate();
  
    return (
        
            <div className="main-layout">
              <Sidebar/>
              <div className="content">
                <header className="top-nav">
                  <span className="user-name">RAFIA MOAZUM</span>
                  <span className="notification-icon">🔔</span>
                </header>
                <main className="main-content">
                  <h1 className="main-heading">Admin Panel</h1>
                </main>
              </div>
            </div>
          
    );
  
}

export default AdminPanel
