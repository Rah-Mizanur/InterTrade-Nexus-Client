import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ImportProduct from "../Components/ImportProduct";
import { motion, AnimatePresence } from "framer-motion";

const MyImports = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://intertrade-nexus-server.vercel.app/my-imports?email=${user.email}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-accent text-lg font-semibold">Loading your imports...</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <title>InterTrade || My Imports</title>
      <h1 className="my-8 text-center text-2xl font-bold text-accent">My Imported Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No imported products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ImportProduct products={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyImports;
