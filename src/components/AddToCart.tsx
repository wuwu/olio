// components/AddToCart.tsx
import React, { useState, useEffect } from "react";
import { fetchProducts, Product } from "../services/productsService";
import { addToBasket } from "../stores/basket";

const AddToCart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPid, setSelectedPid] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
        if (productData.length > 0) {
          setSelectedPid(productData[0].pid);
          setPrice(productData[0].pricePerLiter * productData[0].size);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  const handlePidChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pid = e.target.value;
    const product = products.find((p) => p.pid === pid);
    if (product) {
      setSelectedPid(pid);
      setPrice(product.pricePerLiter * product.size * quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    const product = products.find((p) => p.pid === selectedPid);
    if (product) {
      setPrice(product.pricePerLiter * product.size * newQuantity);
    }
  };

  const handleAddToBasket = () => {
    const product = products.find((p) => p.pid === selectedPid);
    if (product) {
      addToBasket({
        pid: product.pid,
        size: product.size,
        quantity,
        price,
      });
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-80">
      <h2 className="text-xl font-bold mb-4">Add to Cart</h2>

      {/* Select Bottle Size */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Bottle Size</label>
        <select
          value={selectedPid}
          title="Flaschen Volumen"
          onChange={handlePidChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-lime-500"
        >
          {products.map((product) => (
            <option key={product.pid} value={product.pid}>
              {product.size}L
            </option>
          ))}
        </select>
      </div>

      {/* Select Quantity */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Quantity</label>
        <select
          value={quantity}
          title="Anzahl Flaschen"
          onChange={handleQuantityChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-lime-500"
        >
          {Array.from({ length: 5 }, (_, i) => i + 1).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      {/* Total Price */}
      <div className="mb-4 text-lg font-semibold">
        Total Price: <span className="text-green-600">{price.toFixed(2)} €</span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToBasket}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
