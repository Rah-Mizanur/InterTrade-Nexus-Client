
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";


const ImportProduct = ({products }) => {
  const {user} = use(AuthContext)
const navigate = useNavigate()
 const [data, setData] = useState(null);
 const id = products.id

//  const {product} = data
   useEffect(() => {
    fetch(`http://localhost:3000/all-product/${id}`,{
      headers :{
              authorization : `Bearer ${user.accessToken}`
            }
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);



  const handleRemove=()=>{
         fetch(`http://localhost:3000/import-product/${products._id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      navigate('/')
    })
    .catch(err=> console.log(err))
  }

  const handleDetails=()=>{
     navigate(`/product-details/${products.id}`,{state : data});
  }
  return (
    <div className="w-90 mt-4 p-4 border rounded shadow flex flex-col md:flex-row items-center gap-4">
      <img
        src={products.productImage}
        alt={products.productName}
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1">
        <h2 className="text-xl font-bold">{products.productName}</h2>
        <p>
          <strong>Price:</strong> {products.price}
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

        <div className="flex gap-2 mt-2">
          <button onClick={handleRemove} className="btn btn-red">Remove</button>

          <button onClick={handleDetails} className="btn btn-blue">See Details</button>
        </div>
      </div>
    </div>
  );
};

export default ImportProduct;
