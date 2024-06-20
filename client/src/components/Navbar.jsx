import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import { Link as ScrollLink } from "react-scroll";
// import emergency from "./Emergency";
export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar ${scroll ? "is-sticky" : ""} sticky top-0 bg-white `}
      id="navbar"
      bg-teal-500
     style={{backgroundColor:"white"}}
    >
      <div className="container relative flex flex-wrap items-center justify-between ">
        <Link className="navbar-brand md:me-8" to="/">
          <img src={logoDark} className="inline-block dark:hidden" alt="Logo" />
          <img
            src={logoLight}
            className="hidden dark:inline-block"
            alt="Logo"
          />
        </Link>

        <div className="nav-icons flex items-center lg_992:order-2 ms-auto md:ms-8  space-x-4">
          <ul className="list-none menu-social mb-0">
            <li className="inline">
              <Link
                to="/login"
                className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white uppercase"
              >
                Login
              </Link>
            </li>
          </ul>
          <ul className="list-none menu-social mb-0">
            <li className="inline">
              <Link
                to="/emergency"
                className="h-8 px-4 text-[12px] tracking-wider inline-flex items-center justify-center font-medium rounded-md bg-red-600 text-white uppercase"
              >
                Emergency
              </Link>
            </li>
          </ul>
          <button
            data-collapse="menu-collapse"
            type="button"
            className="collapse-btn inline-flex items-center ms-2 text-dark dark:text-white lg_992:hidden"
            onClick={() => setMenu(!menu)}
          >
            <span className="sr-only">Navigation Menu</span>
            <i className="mdi mdi-menu text-[24px]"></i>
          </button>
        </div>

        <div
          className={`navigation lg_992:order-1 lg_992:flex ms-auto ${
            menu ? "" : "hidden"
          }`}
          id="menu-collapse"
        >
          <ul
            className="navbar-nav flex flex-row space-x-4"
            id="navbar-navlist"
          >
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
