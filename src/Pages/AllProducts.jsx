import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Product from "../Components/Product";


const AllProducts = () => {
  const products = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-11/12 mx-auto">
      <title>InterTrade || All Products</title>

      <h1 className="text-2xl font-bold text-center text-secondary mt-4">
        All Products
      </h1>


      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-8 justify-items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No products found for "{searchTerm}" 
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
