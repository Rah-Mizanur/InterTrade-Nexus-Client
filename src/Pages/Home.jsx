import React from "react";
import { Link, useLoaderData } from "react-router";
import Product from "../Components/Product";

const Home = () => {
  const products = useLoaderData();

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-bold text-center text-secondary">
        Latest Products{" "}
      </h1>
      <div className="grid grid-cols-3 gap-4 my-8">
        {products.map((product) => (
          <Product key={products._id} product={product}></Product>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link className="btn btn-accent  w-30 Capitalize"> see all</Link>
      </div>
    </div>
  );
};

export default Home;
