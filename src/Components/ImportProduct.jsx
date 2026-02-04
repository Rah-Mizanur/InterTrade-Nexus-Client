import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const ImportProduct = ({ products }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const id = products.id;

  useEffect(() => {
    fetch(`https://intertrade-nexus-server.vercel.app/all-product/${id}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [id, user.accessToken]);

  const handleRemove = () => {
    fetch(
      `https://intertrade-nexus-server.vercel.app/import-product/${products._id}`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const handleDetails = () => {
    navigate(`/product-details/${products.id}`, { state: data });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md md:max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center gap-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={products.productImage}
        alt={products.productName}
        className="w-32 h-32 object-cover rounded-lg"
      />

      <div className="flex-1 text-gray-800 dark:text-gray-100 space-y-1">
        <h2 className="text-xl font-bold text-accent dark:text-secondary">
          {products.productName}
        </h2>
        <p>
          <strong>Price:</strong> ${products.price}
        </p>
        <p>
          <strong>Rating:</strong> {products.rating} ⭐
        </p>
        <p>
          <strong>Origin Country:</strong> {products.originCountry}
        </p>
        <p>
          <strong>Imported Quantity:</strong> {products.importedQuantity}
        </p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Remove
          </button>

          <button
            onClick={handleDetails}
            className="bg-accent hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImportProduct;
