'use client'
import { useState } from 'react'

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', { productId: product.id, quantity });
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 rounded-full border bg-white text-black border-gray-300 flex items-center justify-center hover:text-white hover:bg-black"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-full border bg-white text-black border-gray-300 flex items-center transition-colors duration-200 justify-center hover:text-white hover:bg-black"
          >
            +
          </button>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-white text-black py-3 px-6 rounded-lg border hover:bg-black hover:text-white transition-colors duration-200 mb-6"
      >
        Add to Cart
      </button>
    </div>
  );
}