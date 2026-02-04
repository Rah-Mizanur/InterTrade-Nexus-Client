import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const MyExportCard = ({ products }) => {
  const navigate = useNavigate();
  const {
    productImage,
    productName,
    price,
    originCountry,
    availableQuantity,
    rating,
  } = products;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: products.productName || "",
    price: products.price || "",
    originCountry: products.originCountry || "",
    rating: products.rating || "",
    availableQuantity: products.availableQuantity || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAt = new Date();
    fetch(
      `https://intertrade-nexus-server.vercel.app/my-export-update/${products._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, updated_At: updatedAt }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Export Item Updated");
        setIsModalOpen(false);
        navigate("/my-exports");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    fetch(
      `https://intertrade-nexus-server.vercel.app/my-export/${products._id}`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Export Item Deleted");
        navigate("/my-exports");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className="w-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.03 }}
        layout
      >
        <img
          src={productImage}
          alt={productName}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-accent">{productName}</h3>

          <div className="flex justify-between text-gray-600 text-sm">
            <p>
              <span className="font-medium text-gray-700">Price:</span> ${price}
            </p>
            <p>
              <span className="font-medium text-gray-700">Origin:</span>{" "}
              {originCountry}
            </p>
          </div>

          <div className="flex justify-between items-center text-sm">
            <p>
              <span className="font-medium text-gray-700">Rating:</span> ⭐ {rating}
            </p>
            <p>
              <span className="font-medium text-gray-700">Quantity:</span>{" "}
              {availableQuantity}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-accent hover:bg-secondary text-white py-1.5 px-4 rounded-md text-sm font-medium transition"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-accent mb-4">Update Product</h2>
              <form onSubmit={handleSubmit} className="space-y-3 text-gray-700 dark:text-gray-200">
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full border px-3 py-2 rounded-md focus:outline-accent"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border px-3 py-2 rounded-md focus:outline-accent"
                />
                <input
                  type="text"
                  name="originCountry"
                  value={formData.originCountry}
                  onChange={handleChange}
                  placeholder="Origin Country"
                  className="w-full border px-3 py-2 rounded-md focus:outline-accent"
                />
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                  className="w-full border px-3 py-2 rounded-md focus:outline-accent"
                />
                <input
                  type="number"
                  name="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  placeholder="Available Quantity"
                  className="w-full border px-3 py-2 rounded-md focus:outline-accent"
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-1.5 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-accent hover:bg-secondary text-white px-4 py-1.5 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MyExportCard;
