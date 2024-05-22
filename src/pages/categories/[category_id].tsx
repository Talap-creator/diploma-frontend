import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Product } from '@/types/index';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface CategoryPageProps {
  products: Product[];
}

interface Category {
  id: number;
  name: string;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products }) => {
  const router = useRouter();
  const tallestBoxHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!router.isFallback && products.length) {
      const productBoxes = document.querySelectorAll('.product-box');
      productBoxes.forEach(box => {
        const htmlBox = box as HTMLElement;
        tallestBoxHeightRef.current = Math.max(tallestBoxHeightRef.current, htmlBox.clientHeight);
      });
      productBoxes.forEach(box => {
        const htmlBox = box as HTMLElement;
        htmlBox.style.height = `${tallestBoxHeightRef.current}px`;
      });
    }
  }, [products, router.isFallback]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-white p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <Link key={index} href={`/products/${product.id}`} passHref>
            <a className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
              <Image src={product.image} alt={product.title} width={500} height={300} className="w-full h-40 object-cover rounded mb-4"/>
              <p className="text-sm text-gray-600">Category: {product.category.name}</p>
              <p className="font-bold text-orange-500 mb-1">{product.price}₽</p>
            </a>
          </Link>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesResponse = await axios.get<Category[]>('https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-category-list/');
  const paths = categoriesResponse.data.map((cat: Category) => ({
    params: { category_id: String(cat.id) }
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category_id = params?.category_id;
  const apiUrl = `https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-by-category/${category_id}`;
  try {
    const response = await axios.get(apiUrl);
    return {
      props: { products: response.data || [] },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: [] },
    };
  }
};
