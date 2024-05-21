import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';  // Ensure the path to axiosInstance is correct
import { Product } from '../types';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

const Cart = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get('/ecoMarket/cart/');
                const data = response.data;
                console.log('Cart data:', data.cart);
                setProducts(data.cart || []);
                setTotalPrice(data.total_price || 0);
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        fetchCart();
    }, []);

    const handleOrderClick = () => {
        router.push('/order-create');
    };

    const handleDelete = async (productId: number) => {
        try {
            await axiosInstance.delete(`https://sea-lion-app-vsdn6.ondigitalocean.app/ecoMarket/cart/delete/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken') || ''
                }
            });
            const updatedProducts = products.filter(product => product.id !== productId);
            const deletedProduct = products.find(product => product.id === productId);
            const updatedTotalPrice = deletedProduct ? totalPrice - deletedProduct.price : totalPrice;
            setProducts(updatedProducts);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Failed to delete product from cart:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6">Your Shopping Cart</h1>
            {products.length > 0 ? (
                <div className="w-full max-w-4xl">
                    <table className="w-full table-auto bg-white rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-orange-500 text-gray-900">
                                <th className="py-2 px-4">Product Name</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4">Price per Unit</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={`${product.id}-${index}`} className="border-b border-orange-300">
                                    <td className="py-2 px-4">{product.title}</td>
                                    <td className="py-2 px-4">{product.quantity}</td>
                                    <td className="py-2 px-4">${product.price}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-700 font-bold text-gray-900 py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="text-2xl font-semibold mt-6 text-orange-500">Total: ${totalPrice}</h2>
                    <button
                        onClick={handleOrderClick}
                        className="mt-4 py-2 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition duration-300"
                    >
                        Place Order
                    </button>
                </div>
            ) : (
                <p className="text-xl">Your cart is empty.</p>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default Cart;
