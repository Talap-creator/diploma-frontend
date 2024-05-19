// pages/products/[product_id].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Product } from '../../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { product_id } = router.query;

  useEffect(() => {
    if (product_id) {
      fetchProductDetails(product_id as string);
      fetchProductReviews(product_id as string);
    }
  }, [product_id]);

  const fetchProductDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/ecoMarket/product-list/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductReviews = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/ecoMarket/product-list/${id}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!product_id) return;

    try {
      await axiosInstance.post(`/ecoMarket/product-list/${product_id}/add-to-cart`);
      toast.success('Product added to cart successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-red-500">No product found.</div>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col lg:flex-row lg:items-start lg:space-x-6">
      <ToastContainer />
      <div className="lg:w-2/3">
        <h1 className="text-4xl font-bold mb-6 neon-text">{product.title}</h1>
        <img src={product.image} alt={product.title} className="w-full max-w-lg h-80 object-cover rounded mb-6" />
        <p className="text-lg text-gray-300 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-purple-400 mb-6">Price: {product.price}₸</p>
        <button onClick={handleAddToCart} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded neon-button">
          Add to Cart
        </button>
      </div>
      <div className="lg:w-1/3 mt-8 lg:mt-0">
        <h2 className="text-3xl font-bold mb-4 neon-text">Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{review.username}</h3>
              <p className="text-yellow-400">Rating: {review.rating} / 5</p>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
