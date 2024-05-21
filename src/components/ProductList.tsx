import React, { useEffect, useState, useRef } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../types';
import Link from 'next/link';
import Image from 'next/image';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const tallestBoxHeightRef = useRef<number>(0);

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

  useEffect(() => {
    // Determine the height of the tallest box
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => {
      // Cast each box as an HTMLElement
      const htmlBox = box as HTMLElement;
      tallestBoxHeightRef.current = Math.max(tallestBoxHeightRef.current, htmlBox.clientHeight);
    });
    // Set the height of all boxes to the height of the tallest box
    productBoxes.forEach(box => {
      const htmlBox = box as HTMLElement;
      htmlBox.style.height = `${tallestBoxHeightRef.current}px`;
    });
  }, [products]);

  return (
    <div className="bg-white flex flex-col p-8 gap-4">
      <div className="text-2xl">Хит Продаж</div>
      <div className="min-h-screen bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.id}`}>
          <div className="product-box bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>{product.title}</h3>
            <Image src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4"/>
            <p className="text-sm" style={{ color: '#666' }}>Category: {product.category.name}</p>
            <p className="font-bold mb-1" style={{ color: '#f5a623' }}>{product.price}₽</p>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
