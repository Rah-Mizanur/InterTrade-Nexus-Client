import React from "react";
import heroBG from '../assets/hero bg.jpg'
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat py-32 px-6"
      style={{ backgroundImage: `url(${heroBG})` }}
    >

      <div className="absolute inset-0 bg-black/30"></div>

     
      <div className="relative z-10 items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
          We are proud to be always on demand
        </h1>
        <p className="text-lg md:text-xl text-secondary mx-auto mb-8">
          At Intertrade Nexus, we deliver reliable, on-demand solutions that keep your business moving forward.
        </p>
        <Link to='/all-products' className="bg-accent hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300">
          Show Products
        </Link>
      </div>
    </section>
  );
};

export default Banner;
