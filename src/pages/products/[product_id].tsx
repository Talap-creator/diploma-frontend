import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import CsrfTokenSetter from '../../components/CsrfTokenSetter';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';
import axiosInstanceWithAuth from '@/utils/axiosInstanceWithAuth';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
}

interface Review {
  id: number;
  username: string;
  review: string;
  rating: number;
}

interface ReviewForm {
  review: string;
  rating: number;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({ review: '', rating: 1 });
  const [loading, setLoading] = useState<boolean>(false);
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
      const response = await axios.get<Product>(`https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-list/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductReviews = async (id: string) => {
    try {
      const response = await axios.get<Review[]>(`https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/product-list/${id}/review-list`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching product reviews:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = async () => {
    if (!product_id) return;

    try {
      await axiosInstanceWithAuth.post(`/ecoMarket/product-list/${product_id}/add-to-cart`);
      toast.success('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please make sure you are logged in.');
    }
  };

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!product_id) return;

    try {
      await axiosInstanceWithAuth.post(`ecoMarket/product-list/${product_id}/add-review`, reviewForm);
      toast.success('Review added successfully!');
      setReviews(prev => [...prev, { ...reviewForm, id: Date.now(), username: 'Anonymous' }]);
      setReviewForm({ review: '', rating: 1 });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to add review. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="flex flex-col bg-white gap-8">
      <Navbar />
      <CsrfTokenSetter />
      <div className="container mx-auto mt-10 bg-white">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl text-orange-text font-bold mb-3">{product?.title}</h1>
          <img src={product?.image} alt={product?.title} className="w-full max-w-lg rounded-lg mb-4" />
          <p className="text-xl text-orange-500 mb-2">Price: ₸{product?.price}</p>
          <p className="mb-4">{product?.description}</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-3">Обзоры</h2>
          <form onSubmit={handleSubmitReview} className="bg-white p-4 rounded-lg shadow mt-6">
            <textarea
              name="review"
              value={reviewForm.review}
              placeholder='Write your review here...'
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-2 border-red-500 border-dashed"
              required
            />
            <input
              type="number"
              name="rating"
              value={reviewForm.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              className="w-full p-2 mb-4 border border-2 border-red-500 border-dashed"
              required
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Подтвердить обзор
            </button>
          </form>
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-4 rounded-lg  shadow mb-2">
              <p className="text-lg font-semibold">{review.username}</p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
