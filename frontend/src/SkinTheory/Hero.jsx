import React from "react";
import { Link } from "react-router-dom";
import homeBg from "../assets/home.png";
import ProductSection from "./ProductSection";
import SubmitTipSection from "./SubmitTipSection";
import TipSection from "./TipsSection";

const Hero = () => (
  <>
    <section
      className="relative min-h-[537px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          <span className="text-pink-100">SKINTHEORY:</span> Your Beauty Companion
        </h1>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white max-w-2xl">
          Discover the best in skincare, makeup, and wellness. Share your beauty wisdom and get inspired by others.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link to="/login">
            <button className="bg-white text-black font-semibold py-2 px-5 sm:px-6 rounded-full hover:bg-pink-500 hover:text-white transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/productsection">
            <button className="bg-pink-500 text-white font-semibold py-2 px-5 sm:px-6 rounded-full hover:bg-white hover:text-pink-500 transition duration-300">
              Continue as Guest
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-white text-black font-semibold py-2 px-5 sm:px-6 rounded-full hover:bg-pink-500 hover:text-white transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </section>

    {/* Product & Tips Section */}
    <section>
      <ProductSection />
      <TipSection />
    </section>

    {/* Submit Tip Section */}
    <section>
      <SubmitTipSection />
    </section>
  </>
);

export default Hero;
