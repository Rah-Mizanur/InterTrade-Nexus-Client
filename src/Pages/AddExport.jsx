import React from "react";

const AddExport = () => {
  return (
    <div className="w-11/12 mx-auto my-10">
        <h1 className="uppercase text-accent font-bold text-3xl my-6 text-center">
            Exports your Product 
        </h1>
      <form className="max-w-md mx-auto p-4 border rounded shadow space-y-4">
        {/* a. Product Name */}
        <div>
          <label className="block font-bold">Product Name</label>
          <input
            type="text"
            name="productName"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* b. Product Image */}
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
            min="30"
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
        <button type="submit" className="btn btn-secondary w-full mt-4">
          Export Product
        </button>
      </form>
    </div>
  );
};

export default AddExport;
