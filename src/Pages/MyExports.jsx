import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MyExportCard from "../Components/MyExportCard";

const MyExports = () => {
  const { user } = use(AuthContext);
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
        setProducts(data), setLoading(false);
      });
  }, [user]);
  if (loading) {
    return <h1> Loading ...............</h1>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <title>InterTrade || My Export</title>
      <h1 className="my-8 text-center text-2xl"> My Exports </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {products.map((products) => (
          <MyExportCard key={products._id} products={products}>
            {" "}
          </MyExportCard>
        ))}
      </div>
    </div>
  );
};

export default MyExports;
