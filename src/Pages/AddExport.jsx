import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddExport = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleExport = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const formData = {
      productImage: form.productImage.value.trim(),
      productName: form.productName.value.trim(),
      price: Number(form.price.value),
      originCountry: form.originCountry.value.trim(),
      rating: Number(form.rating.value),
      availableQuantity: Number(form.availableQuantity.value),
      exportedBy: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://intertrade-nexus-server.vercel.app/add-export",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to add export");

      toast.success("Product exported successfully");
      form.reset();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12">
      <div className="w-11/12 max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-base-content">
            Add <span className="text-accent">Export Product</span>
          </h1>
          <p className="mt-2 text-base-content/70">
            Provide accurate product details to list your export globally.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleExport}
          className="card bg-base-100 shadow-md rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="label font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              className="input input-bordered w-full"
              placeholder="e.g. Premium Coffee Beans"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Product Image URL</label>
            <input
              type="url"
              name="productImage"
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Price (USD)</label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                min="1"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="label font-medium">Rating</label>
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
          </div>

          <div>
            <label className="label font-medium">Origin Country</label>
            <input
              type="text"
              name="originCountry"
              className="input input-bordered w-full"
              placeholder="e.g. Brazil"
              required
            />
          </div>

          <div>
            <label className="label font-medium">Available Quantity</label>
            <input
              type="number"
              name="availableQuantity"
              className="input input-bordered w-full"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent w-full mt-4"
          >
            {loading ? "Submitting..." : "Export Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddExport;
