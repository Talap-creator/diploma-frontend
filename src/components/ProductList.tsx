// pages/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import Link from 'next/link';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Data is not an array', data);
          setProducts([]); // Ensure state remains an array
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-12">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.id}`}>
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
            <h3 className="text-lg font-semibold mb-2 neon-text">{product.title}</h3>
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4"/>
            <p className="text-sm text-gray-400">Category: {product.category.name}</p>
            <p className="font-bold mb-1 text-purple-400">{product.price}₸</p>
            <p className="text-gray-300 text-sm">{product.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
