import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  // console.log(product)

  useEffect(() => {
    fetch(`http://localhost:3000/all-products/${id}`,{
         headers :{
              authorization : `Bearer ${user.accessToken}`
            }
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  const handleImport = (e) => {
    e.preventDefault();
    const number = e.target.number.value;
    const updatedQuantity = product.availableQuantity - number;
    const importData = {
      id : product._id ,
      productImage: product.productImage,
      productName: product.productName,
      price: product.price,
      originCountry: product.originCountry,
      rating: product.rating,
      importedQuantity: number,
      importedBy: user.email,
      importAt: new Date(),
    };

    if(updatedQuantity < 0){
        return toast('Product Not Available')
    }

    fetch("http://localhost:3000/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(importData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        fetch(`http://localhost:3000/import/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availableQuantity: updatedQuantity }),
        });

        toast("import data successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    document.getElementById("my_modal_1").close();
  };
  return (
    <div className="w-11/12 mx-auto">
      <ToastContainer></ToastContainer>
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Product Image */}
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-64 object-cover"
          />

          {/* Product Info */}
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{product.productName}</h1>

            <p className="text-green-600 font-semibold text-lg">
              Price: ${product.price}
            </p>

            <p className="text-gray-700">
              Origin Country:{" "}
              <span className="font-medium">{product.originCountry}</span>
            </p>

            <p className="text-yellow-500">
              Rating: <span className="font-medium">{product.rating} ⭐</span>
            </p>

            <p className="text-gray-700">
              Available Quantity:{" "}
              <span className="font-medium">{product.availableQuantity}</span>
            </p>

            <p className="text-gray-700">
              Exported By:{" "}
              <span className="font-medium">{product.exportedBy}</span>
            </p>

            <p className="text-gray-500 text-sm">
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </p>

            <button
              className="btn btn-secondary hover:btn-accent"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Import Now
            </button>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h1 className="text-2xl font-bold text-secondary">Quantity</h1>

                <form onSubmit={handleImport}>
                  <input
                    name="number"
                    className="mt-2 bg-accent border-2 border-red-500"
                    min="1"
                    type="number"
                    required
                  />

                  <div className="modal-action">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
