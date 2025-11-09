import React from "react";

const ImportProduct = ({ product }) => {
  return (
    <div className="w-90 mt-4 p-4 border rounded shadow flex flex-col md:flex-row items-center gap-4">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-32 h-32 object-cover rounded"
      />

      <div className="flex-1">
        <h2 className="text-xl font-bold">{product.productName}</h2>
        <p>
          <strong>Price:</strong> {product.price}
        </p>

        <p>
          <strong>Rating:</strong> {product.rating} ⭐
        </p>
        <p>
          <strong>Origin Country:</strong> {product.originCountry}
        </p>

        <p>
          <strong>Imported Quantity:</strong> {product.importedQuantity}
        </p>

        <div className="flex gap-2 mt-2">
          <button className="btn btn-red">Remove</button>

          <button className="btn btn-blue">See Details</button>
        </div>
      </div>
    </div>
  );
};

export default ImportProduct;
