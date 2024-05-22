import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Product } from '@/types/index';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from './CategoryPage.module.css';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ products }) => {
  const router = useRouter();
  const tallestBoxHeightRef = useRef<number>(0);

  useEffect(() => {
    // Check if it's not in fallback and products are loaded
    if (!router.isFallback && products) {
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
  }, [products]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-white p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-12">
        {products.map((product, index) => (
          <Link key={index} href={`/products/${product.id}`} passHref>
            <a className={styles.productBox}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <Image src={product.image} alt={product.title} width={500} height={300} className={styles.productImage}/>
              <p className={styles.productCategory}>Category: {product.category.name}</p>
              <p className={styles.productPrice}>{product.price}₽</p>
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
  const categoriesResponse = await axios.get('https://your-api/categories');
  const paths = categoriesResponse.data.map(cat => ({ params: { category_id: String(cat.id) } }));

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
