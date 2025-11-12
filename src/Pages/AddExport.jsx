import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const AddExport = () => {
const {user} = use(AuthContext)
const navigate = useNavigate()
const handleExport =(e)=>{
  
  e.preventDefault();
  const formData = {
    productImage : e.target.productImage.value,
    productName : e.target.productName.value,
    price : e.target.price.value,
    originCountry : e.target.originCountry.value,
    rating : e.target.rating.value ,
    availableQuantity : e.target.availableQuantity.value,
    exportedBy : user.email ,
    createdAt :new Date(),
  }

  console.log(formData)

  fetch("http://localhost:3000/add-export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("add model succesfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
}

  return (
    <div className="w-11/12 mx-auto my-10">
      <title>Export Your Product || InterTrade</title>
      <ToastContainer></ToastContainer>
      <h1 className="uppercase text-accent font-bold text-3xl my-6 text-center">
        Exports your Product
      </h1>
      <form onSubmit={handleExport} className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
        <div>
          <label className="block font-bold">Product Name</label>
          <input
            type="text"
            name="productName"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-bold">Product Image URL</label>
          <input
            type="text"
            name="productImage"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-bold">Price</label>
          <input
            type="number"
            name="price"
            className="input input-bordered w-full"
            min="10"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block font-bold">Origin Country</label>
          <input
            type="text"
            name="originCountry"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-bold">Rating</label>
          <input
            type="number"
            name="rating"
            className="input input-bordered w-full"
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Available Quantity</label>
          <input
            type="number"
            name="availableQuantity"
            className="input input-bordered w-full"
            min="0"
            required
          />
        </div>
        <button  type="submit" className="btn btn-secondary w-full mt-4">
          Export Product
        </button>
      </form>
    </div>
  );
};

export default AddExport;
