// pages/index.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoriesList';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner/>
      <CategoryList/>
      <ProductList />
      <Footer/>
      
    </div>
  );
};

export default HomePage;
