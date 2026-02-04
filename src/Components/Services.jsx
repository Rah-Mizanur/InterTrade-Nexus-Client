import React, { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://intertrade-nexus-server.vercel.app/service")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load services");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20">
      <div className="w-11/12 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            InterTrade Nexus provides solutions that help your business grow
            globally with confidence and efficiency.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <p className="text-center text-error font-medium">{error}</p>
        )}

        {/* Skeleton Loader */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-base-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl h-full"
              >
                <div className="card-body items-center text-center">
                  <div className="text-4xl text-accent mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-base-content">
                    {service.title}
                  </h3>
                  <p className="text-base-content/70 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
