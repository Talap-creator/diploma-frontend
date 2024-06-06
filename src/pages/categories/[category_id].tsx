import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  image: string;
  category: { name: string };
  price: number;
}

interface CategoryPageProps {
  // No initial static props needed
}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { category_id } = router.query;

  useEffect(() => {
    if (category_id) {
      const fetchProducts = async () => {
        setLoading(true);
        console.log('Fetching products for category:', category_id);
        const apiUrl = `https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-by-category/${category_id}`;
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Products response:', response.data
          );
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products.length) {
    return <div>No products found.</div>;
  }

  return (
    <>
      <Navbar/>
      <div className="bg-white flex flex-col p-8 gap-4">
      <div className="min-h-screen bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <Link key={index} href={`/products/${product.id}`}>
          <div className="product-box bg-white border border-gray-300 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>{product.title}</h3>
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mb-4"/>
            <p className="text-sm" style={{ color: '#666' }}>Category: {product.category.name}</p>
            <p className="font-bold mb-1" style={{ color: '#f5a623' }}>{product.price}₸</p>
          </div>
        </Link>
      ))}
    </div>
    </div>
      <Footer/>
    </>
  );
};

export default CategoryPage;
