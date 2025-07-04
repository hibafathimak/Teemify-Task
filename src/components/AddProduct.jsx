import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddProduct = ({ isOpen, modalClose, onProductAdd }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !description || !color || !price) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "https://devservice.teemify.ai/create_product",
        {
          user_id: user.user_id,
          product_name: productName,
          product_description: description,
          product_color: color,
          product_price: price,
        }
      );

      if (res.status >= 200 || res.status < 300) {
        alert("Product Added");
        onProductAdd();
        setProductName("");
        setColor("");
        setDescription("");
        setError("");
        setPrice("");
        modalClose();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add product.");
    } 
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
        <button
          onClick={modalClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        {error && <p className="text-sm  text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />

          <input
            type="number"
            placeholder="Purchase Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-700 w-full text-white py-2 rounded-md hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
