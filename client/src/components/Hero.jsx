import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import About from "./About";
import Footer from "./Footer";
import Switcher from "../components/switcher";
import Services from "./Services";

// Ensure the path to your image is correct
import heroImage from "../assets/images/hero1.jpg"; // Adjust the path according to your project structure

function Hero() {
  return (
    <>
      <Navbar />
      <section
        className="relative overflow-hidden  mt-0 md:py-48 py-40 bg-teal-500/5 dark:bg-teal-500/20"
        id="home"
      >
        <div className="container relative mt-0"> 
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center">
          <div>
              <h1 className="font-semibold lg:leading-normal leading-normal tracking-wide text-4xl lg:text-5xl mb-5">
                Comprehensive Health Solutions for Your Beloved Dogs and Cats
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">
                Welcome to Upcover, where we are dedicated to ensuring the
                health and well-being of your cherished canine and feline
                companions. With a deep understanding of the special bond
                between pets and their owners, we strive to offer unparalleled
                health solutions designed to keep your furry friends happy,
                healthy, and thriving.
              </p>

              <div className="mt-6">
                <Link
                  to="/apply-doctor"
                  className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white"
                >
  
                  Register as doctor{" "}
                  <i className="mdi mdi-chevron-right ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="lg:ms-8">
              <div className="relative">
                <img
                  src={heroImage}
                  className="relative top-6 z-10" // Adjusted top-14 to top-6
                  alt="Hero"
                  style={{
                    width: "400px", // Adjust the width here
                    height: "400px", // Adjust the height here
                  }}
                />
                <div
                  className="absolute md:w-[500px] w-[400px] h-[400px] md:h-[500px] bg-white bottom-1/2 translate-y-1/2 md:left-0 left-1/2 ltr:md:translate-x-0 ltr:-translate-x-1/2 rtl:md:translate-x-0 rtl:translate-x-1/2 -z-10 shadow-md shadow-teal-500/10 rounded-full"
                  style={{ clipPath: "circle(50% at 50% 50%)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About />
        <Services />
        <Footer />
        <Switcher />
      </>
    );
  }
  
  export default Hero;