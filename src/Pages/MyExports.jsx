import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MyExportCard from "../Components/MyExportCard";
import { motion } from "framer-motion";

const MyExports = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://intertrade-nexus-server.vercel.app/my-exports?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-11/12 mx-auto py-8">
      <title>InterTrade || My Exports</title>
      <h1 className="text-2xl text-center font-bold text-accent mb-8">
        My Exports
      </h1>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-base-200 animate-pulse h-64 w-72 rounded-xl"
            ></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={cardVariants}>
              <MyExportCard products={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-base-content/70">
          No exports found.
        </p>
      )}
    </div>
  );
};

export default MyExports;
