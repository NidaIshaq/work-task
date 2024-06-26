import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../redux/features/userSlice";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("User state:", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      dispatch(showLoading());
      await axios.post(
        "/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      // dispatch(clearAuth()); // Clear user data from Redux store
      dispatch(hideLoading());
      navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  console.log("Rendering Navbar with user:", user);

  return (
    <nav
      className={`navbar ${
        scroll ? "is-sticky" : ""
      } fixed top-0 w-full bg-white shadow-lg z-50`}
      id="navbar"
    >
      <div className="container relative flex flex-wrap items-center justify-between">
        <Link className="navbar-brand md:me-8" to="/">
          <img src={logoDark} className="inline-block dark:hidden" alt="Logo" />
          <img src={logoLight} className="hidden dark:inline-block" alt="Logo" />
        </Link>

        <div className="nav-icons flex items-center lg_992:order-2 ms-auto md:ms-8 space-x-4">
          {user ? (
            <>
              <span className="text-dark">{user.name}</span>
              {user.isAdmin && (
                <Link
                  to="/adminPanel"
                  className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-green-500 text-white uppercase"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-red-600 text-white uppercase"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white uppercase"
            >
              Login
            </Link>
          )}
            <Link
                to="/emergencyAppointment"
                className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-red-600 text-white uppercase"
              >
                Emergency
              </Link>
        </div>

        <div
          className={`navigation lg_992:order-1 lg_992:flex ms-auto ${
            menu ? "" : "hidden"
          }`}
          id="menu-collapse"
        >
          <ul className="navbar-nav flex flex-row space-x-4" id="navbar-navlist">
            <li className="nav-item ms-0">
              <ScrollLink
                className="nav-link"
                to="home"
                smooth={true}
                duration={1000}
                activeClass="active"
                spy={true}
              >
                Home
              </ScrollLink>
            </li>
            <li className="nav-item ms-0">
              <ScrollLink
                className="nav-link"
                to="about"
                smooth={true}
                duration={1000}
                activeClass="active"
                spy={true}
              >
                About
              </ScrollLink>
            </li>
            <li className="nav-item ms-0">
              <ScrollLink
                className="nav-link"
                to="services"
                smooth={true}
                duration={1000}
                activeClass="active"
                spy={true}
              >
                Services
              </ScrollLink>
            </li>
            <li className="nav-item ms-0">
              <ScrollLink
                className="nav-link"
                to="contact"
                smooth={true}
                duration={1000}
                activeClass="active"
                spy={true}
              >
                Contact Us
              </ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
