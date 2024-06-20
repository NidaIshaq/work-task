import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../styles/AdminPanel.css"

const Sidebar = () => {
    const navigate = useNavigate();
  
    return (
        

              <aside className="sidebar">
                <div className="sidebar-header">DOC APP</div>
                <nav className="sidebar-nav">
                  <ul>
                    <li><Link to={`/addDisease`}>Add Disease</Link></li>
                    <li><Link to={`/addSymptoms`}>Add Symptoms</Link></li>
                    <li><Link to={`/addSymptoms`}>Add Diet Plans</Link></li>
                    <li><Link to={`/`}>Logout</Link></li>
                  </ul>
                </nav>
              </aside>
             
          
    );
  
}

export default Sidebar
