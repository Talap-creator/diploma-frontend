import { useState, useEffect } from 'react';
import axiosInstanceWithAuth from '@/utils/axiosInstanceWithAuth'; // Adjust this path if necessary
import { Product } from '../types'; // Ensure this import points to your Product type definition
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

const Cart = () => {
    const [products, setProducts] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstanceWithAuth.get('/ecoMarket/cart/');
                const data = response.data;
                console.log('Cart data:', data);
                setProducts(data.items || []);
                calculateTotalPrice(data.items || []);
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
                // Optionally handle user notifications here
            }
        };

        fetchCart();
    }, []);

    // Function to calculate total price
    const calculateTotalPrice = (items: CartItem[]) => {
        const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleOrderClick = () => {
        router.push('/order-create');
    };

    const handleDelete = async (productId: number) => {
        try {
            await axiosInstanceWithAuth.delete(`/ecoMarket/cart/delete/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            calculateTotalPrice(updatedProducts);  // Recalculate the total price after deletion
        } catch (error) {
            console.error('Failed to delete product from cart:', error);
            // Optionally handle user notifications here
        }
    };

    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-white flex flex-col items-center p-4">
                <h1 className="text-4xl font-bold mb-6">Ваша Корзина</h1>
                {products.length > 0 ? (
                    <div className="w-full max-w-4xl">
                        <table className="w-full table-auto bg-white rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-orange-500 text-gray-900">
                                    <th className="py-2 px-4">Наименование товара</th>
                                    <th className="py-2 px-4">Количество</th>
                                    <th className="py-2 px-4">Цена за единицу</th>
                                    <th className="py-2 px-4">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={`${product.id}-${index}`} className="border-b border-orange-300">
                                        <td className="py-2 px-4">{product.product.title}</td>
                                        <td className="py-2 px-4">{product.quantity}</td>
                                        <td className="py-2 px-4">${product.product.price}</td>
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
                        <h2 className="text-2xl font-semibold mt-6 text-orange-500">Общий ценник: ₸{totalPrice}</h2>
                        <button
                            onClick={handleOrderClick}
                            className="mt-4 py-2 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition duration-300"
                        >
                            Разместить заказ
                        </button>
                    </div>
                ) : (
                    <p className="text-xl">Ваша корзина пуста</p>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default Cart;
