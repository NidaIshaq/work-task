import React, { useState } from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/images/about.jpg";

import CountUp from "react-countup";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const expandedContent = (
    <>
      We provide exceptional care and support to pets and their owners. With
      years of experience in the field of veterinary medicine and a deep
      understanding of the unique needs of dogs and cats, we are committed to
      delivering personalized, compassionate, and high-quality services that
      exceed expectations.
    </>
  );

  const collapsedContent = (
    <>
      Our mission is simple yet profound: to empower pet owners with the
      knowledge, resources, and tools they need to give their furry companions
      the happiest, healthiest lives possible. Whether it's preventive care,
      medical treatments, nutritional guidance, or behavioral support, we are
      here to guide you every step of the way...
    </>
  );

  return (
    <section className="relative md:py-24 py-16" id="about">
      <div className="container relative">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
          <div className="md:col-span-6">
            <div className="lg:me-8">
              <div className="relative">
                <img
                  src={aboutImage}
                  className="rounded-full shadow dark:shadow-gray-700"
                  alt=""
                />

                <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 mx-auto size-56 flex justify-center items-center bg-white dark:bg-slate-900 rounded-full shadow dark:shadow-gray-700">
                  <div className="text-center">
                    <span className="text-teal-500 text-2xl font-semibold mb-0 block">
                      <CountUp
                        className="counter-value text-6xl font-semibold"
                        start={0}
                        end={15}
                      />
                      +
                    </span>
                    <span className="font-semibold block mt-2">
                      Years <br /> Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="lg:ms-8">
              <h6 className="text-teal-500 text-sm font-semibold uppercase mb-2">
                Who Are We ?
              </h6>
              <h3 className="font-semibold text-2xl leading-normal mb-4">
                {isExpanded
                  ? "Pet Care Specialists and Animal Lovers"
                  : "Pet Care Specialists and Animal Lovers. "}
              </h3>

              <p className="text-slate-400 max-w-xl mb-6">
                {isExpanded ? expandedContent : collapsedContent}
              </p>

              <Link
                to="#"
                className="h-10 px-6 tracking-wide inline-flex items-center justify-center font-medium rounded-md bg-teal-500 text-white"
                onClick={toggleExpansion}
              >
                {isExpanded ? "Read Less" : "Read More"}{" "}
                <i
                  className={`mdi mdi-chevron-${
                    isExpanded ? "up" : "right"
                  } align-middle ms-0.5`}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

