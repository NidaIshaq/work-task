import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-white">UPCOVER APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={menu.name} className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .main {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        
        }

        .layout {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 250px;
          background-color: #0d9488; /* Change background color to teal 700 */
          color: #ffffff; /* Change text color to white */
          padding-top: 20px;
        }

        .sidebar .logo {
          text-align: center;
          margin-bottom: 20px;
        }

        .sidebar .menu {
          padding-left: 20px;
        }

        .sidebar .menu-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .sidebar .menu-item.active {
          background-color: #4a9e9c;
        }

        .sidebar .menu-item a {
          color: inherit;
          text-decoration: none;
          margin-left: 10px;
        }

        .sidebar .menu-item i {
          font-size: 18px;
        }

        .content {
          flex: 1;
          padding: 20px;
          color: #0f766e; /* Change form color to teal 200 */
        }

        .header {
          background-color: #ffffff;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
        }

        .header-content i {
          font-size: 24px;
          margin-right: 10px;
        }

        .body {
          padding: 20px;
          background-color: #f7f7f7;
          min-height: calc(100vh - 80px);
        }
      `}</style>
    </>
  );
};

export default Layout;
