import React from "react";
import heroBG from "../assets/hero bg.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative flex items-center justify-center text-center bg-cover bg-center bg-no-repeat min-h-[70vh] px-6"
      style={{ backgroundImage: `url(${heroBG})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Always On-Demand. Always Reliable.
        </h1>

        <p className="text-base md:text-lg text-gray-200 mb-8">
          Intertrade Nexus delivers dependable, on-demand solutions to keep your
          business moving forward — anytime, anywhere.
        </p>

        <Link
          to="/all-products"
          className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
        >
          Explore Products
        </Link>
      </div>

      {/* Scroll Indicator */}
      <span className="absolute bottom-6 text-gray-300 animate-bounce">
        ↓
      </span>
    </section>
  );
};

export default Banner;
