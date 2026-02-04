import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://intertrade-nexus-server.vercel.app/all-products/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("Failed to fetch product details"))
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleImport = async (e) => {
    e.preventDefault();
    const number = Number(quantity);
    if (number <= 0 || number > product.availableQuantity) return;

    const updatedQuantity = product.availableQuantity - number;

    const importData = {
      id: product._id,
      productImage: product.productImage,
      productName: product.productName,
      price: product.price,
      originCountry: product.originCountry,
      rating: product.rating,
      importedQuantity: number,
      importedBy: user.email,
      importAt: new Date(),
    };

    try {
      await fetch("https://intertrade-nexus-server.vercel.app/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importData),
      });

      await fetch(
        `https://intertrade-nexus-server.vercel.app/import/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availableQuantity: updatedQuantity }),
        }
      );

      toast.success("Import successful");
      setModalOpen(false);
      navigate("/all-products");
    } catch (err) {
      toast.error("Failed to import product");
    }
  };

  if (loading || !product) {
    return (
      <div className="w-11/12 mx-auto py-12">
        <div className="animate-pulse bg-base-200 rounded-lg h-96 max-w-4xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-4xl mx-auto py-12">
      <div className="bg-base-100 shadow-lg rounded-xl overflow-hidden">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-base-content">
            {product.productName}
          </h1>
          <p className="text-base-content font-semibold text-lg">
            Price: <span className="text-accent">${product.price}</span>
          </p>
          <p className="text-base-content/70">
            Origin: <span className="font-medium">{product.originCountry}</span>
          </p>
          <p className="text-base-content/70">
            Rating: <span className="font-medium">{product.rating} ⭐</span>
          </p>
          <p className="text-base-content/70">
            Available: <span className="font-medium">{product.availableQuantity}</span>
          </p>
          <p className="text-base-content/70">
            Exported By: <span className="font-medium">{product.exportedBy}</span>
          </p>
          <p className="text-base-content/50 text-sm">
            Created At: {new Date(product.createdAt).toLocaleDateString()}
          </p>

          <button
            className="btn btn-accent w-full mt-4 hover:bg-secondary"
            onClick={() => setModalOpen(true)}
          >
            Import Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-xl p-6 w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3 text-base-content/50 hover:text-base-content"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-base-content mb-4">
              Import Quantity
            </h2>
            <form onSubmit={handleImport} className="space-y-4">
              <input
                type="number"
                min="1"
                max={product.availableQuantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="input input-bordered w-full"
                required
              />
              {Number(quantity) > product.availableQuantity && (
                <p className="text-error text-sm">
                  Quantity exceeds available stock!
                </p>
              )}
              <button
                type="submit"
                disabled={
                  !quantity ||
                  Number(quantity) <= 0 ||
                  Number(quantity) > product.availableQuantity
                }
                className="btn btn-accent w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
