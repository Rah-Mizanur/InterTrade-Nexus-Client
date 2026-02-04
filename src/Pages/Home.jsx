import React from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import Product from "../Components/Product";
import Banner from "../Components/Banner";
import Services from "../Components/Services";
import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
  const products = useLoaderData();

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-11/12 mx-auto">
      <title>InterTrade || Home</title>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Banner />
      </motion.div>

      {/* Latest Products */}
      <motion.h1
        className="text-2xl font-bold my-4 text-center text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Latest Products
      </motion.h1>

      <motion.div
        className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 my-8 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div key={product._id} variants={cardVariants}>
            <Product product={product} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          to="/all-products"
          className="btn btn-accent w-32 capitalize"
        >
          See All
        </Link>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Services />
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WhyChooseUs />
      </motion.div>
    </div>
  );
};

export default Home;
