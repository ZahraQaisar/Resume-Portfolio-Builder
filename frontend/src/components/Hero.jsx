import React, { useContext } from "react";
import ResumeCarousel from "./ResumeCarousel";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hero() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuildResume = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <section className="pt-32 pb-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Average resumes get read.
            <br />
            <span className="text-purple-600">Yours gets you hired</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-xl">
            In a tough market, presentation is everything. Stop looking like "just another applicant"
            and look like the expensive expert they need to hire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handleBuildResume}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
              Build Your Resume
            </button>

            <button className="border border-gray-300 dark:border-gray-700 
              text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg">
              Get Your Resume Score
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end relative">
          <ResumeCarousel />
        </div>

      </div>
    </section>
  );
}
