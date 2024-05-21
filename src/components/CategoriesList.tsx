import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  image: string;
  // Add more properties if needed
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-category-list/');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="flex flex-col p-8 bg-white gap-4">
    <div className="bg-white text-2xl">Популярные категории</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white">
      {categories.map(category => (
        <Link href={`/categories/${category.id}`} key={category.id}>
            <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
              <p className="text-lg font-semibold" style={{ color: '#333' }}>{category.name}</p>
              <Image src={category.image} alt={category.name} className="w-full h-40 object-cover rounded mt-2"/>
              <div className="text-sm" style={{ color: '#666' }}>Explore Now</div>
            </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default CategoryList;
