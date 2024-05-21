import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Product } from '@/types/index';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products }) => {
  const router = useRouter();
  const { category_id } = router.query;
  const tallestBoxHeightRef = useRef<number>(0);

  useEffect(() => {
    // Determine the height of the tallest box
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => {
      tallestBoxHeightRef.current = Math.max(tallestBoxHeightRef.current, box.clientHeight);
    });
    // Set the height of all boxes to the height of the tallest box
    productBoxes.forEach(box => {
      box.style.height = `${tallestBoxHeightRef.current}px`;
    });
  }, [products]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-white p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-12">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.id}`}>
          <div className="product-box bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>{product.title}</h3>
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4"/>
            <p className="text-sm" style={{ color: '#666' }}>Category: {product.category.name}</p>
            <p className="font-bold mb-1" style={{ color: '#f5a623' }}>{product.price}₽</p>
          </div>
        </Link>
      ))}
    </div>
      <Footer/>
    </>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // Define the paths dynamically based on your category IDs
  const paths = [
    { params: { category_id: '1' } },
    { params: { category_id: '2' } },
    // Add more paths if needed
  ];

  return {
    paths,
    fallback: true, // Set fallback to true for incremental static regeneration
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category_id = params?.category_id;
  const apiUrl = `http://localhost:8000/ecoMarket/product-by-category/${category_id}`;
  
  try {
    const response = await axios.get(apiUrl);
    const products = response.data;
    console.log("products", products);
    return {
      props: { products },
      revalidate: 60, // Revalidate every 60 seconds for ISR
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: null },
    };
  }
};

