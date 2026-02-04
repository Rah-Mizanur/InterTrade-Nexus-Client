import React from "react";
import { useNavigate } from "react-router";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    navigate(`/product-details/${product._id}`, { state: product });
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl h-full flex flex-col">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-accent">
            {product.productName}
          </h2>

          <p className="text-base-content font-bold">
            Price: <span className="text-accent">${product.price}</span>
          </p>

          <p className="text-base-content/70">Origin: {product.originCountry}</p>

          <p className="text-base-content/70">
            Rating: {product.rating} ⭐
          </p>

          <p className="text-base-content/70">
            Available: {product.availableQuantity}
          </p>
        </div>

        <button
          onClick={handleSeeDetails}
          className="btn btn-accent w-full mt-3 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors duration-200"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Product;
