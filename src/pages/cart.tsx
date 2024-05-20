import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';  // Ensure the path to axiosInstance is correct
import { Product } from '../types';
import { useRouter } from 'next/router';
import { getCsrfToken } from '../utils/getCsrfToken';
import Navbar from '../components/Navbar';

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
            await axiosInstance.delete(`http://localhost:8000/ecoMarket/cart/delete/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken() || ''
                }
            });
            console.log('csfr:', getCsrfToken());
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
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6 neon-text">Your Shopping Cart</h1>
            {products.length > 0 ? (
                <div className="w-full max-w-4xl">
                    <table className="w-full table-auto bg-gray-800 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="py-2 px-4">Product Name</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4">Price per Unit</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={`${product.id}-${index}`} className="border-b border-gray-700">
                                    <td className="py-2 px-4">{product.title}</td>
                                    <td className="py-2 px-4">{product.quantity}</td>
                                    <td className="py-2 px-4">${product.price}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="text-2xl font-semibold mt-6">Total: ${totalPrice}</h2>
                    <button
                        onClick={handleOrderClick}
                        className="mt-4 py-2 px-6 bg-pink-600 text-white font-bold rounded-lg shadow-md hover:bg-pink-700 transition duration-300 neon-button"
                    >
                        заказать
                    </button>
                </div>
            ) : (
                <p className="text-xl">Your cart is empty.</p>
            )}
        </div>
        </>
    );
};

export default Cart;
