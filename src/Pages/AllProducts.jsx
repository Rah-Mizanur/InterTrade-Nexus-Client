import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import Product from "../Components/Product";

const AllProducts = () => {
  const products = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [minRating, setMinRating] = useState("");

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minRating) {
      result = result.filter(
        (product) => Number(product.rating) >= Number(minRating)
      );
    }

    if (sortOrder === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, minRating, sortOrder]);

  return (
    <section className="py-12">
      <div className="w-11/12 mx-auto">
        <title>InterTrade Nexus | All Products</title>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            Explore <span className="text-accent">All Products</span>
          </h1>
          <p className="mt-2 text-base-content/70">
            Browse and discover export-ready products from trusted sellers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:max-w-sm"
          />

          <div className="flex gap-3">
            <select
              className="select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>

          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-base-content/70">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
