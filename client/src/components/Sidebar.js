import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../styles/AdminPanel.css"

const Sidebar = (props) => {
    const navigate = useNavigate();
  
    return (
        

              <aside className="sidebar">
                <div className="sidebar-header">DOC APP</div>
                <nav className="sidebar-nav">
                  <ul>
                    <li><Link to={props.link1}>{props.opt1}</Link></li>
                    <li><Link to={props.link2}>{props.opt2}</Link></li>
                    <li><Link to={props.link3}>{props.opt3}</Link></li>
                    {/* <li><Link to={`/`}>Logout</Link></li> */}
                  </ul>
                </nav>
              </aside>
             
          
    );
  
}
export default Sidebar
