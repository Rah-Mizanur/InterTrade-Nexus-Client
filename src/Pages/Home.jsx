import React from "react";
import { Link, useLoaderData } from "react-router";
import Product from "../Components/Product";
import Banner from "../Components/Banner";
import Services from "../Components/Services";
import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
  const products = useLoaderData();

  return (

    <div className="w-11/12 mx-auto">
      <title> InterTrade || Home</title>
      <Banner></Banner>
      <h1 className="text-2xl font-bold my-4 text-center text-secondary">
        Latest Products{" "}
      </h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-8 justify-items-center">
        {products.map((product) => (
          <Product key={products._id} product={product}></Product>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link to='/all-products' className="btn btn-accent  w-30 Capitalize"> see all</Link>
      </div>
      <Services></Services>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
