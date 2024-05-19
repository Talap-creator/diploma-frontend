// pages/Order.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCsrfToken } from '../utils/getCsrfToken';

const Order = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [referencePoint, setReferencePoint] = useState('');
    const [comments, setComments] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || !address) {
            setError('Phone number and address are required.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/ecoMarket/order-create/', {
                phone_number: phoneNumber,
                address: address,
                reference_point: referencePoint,
                comments: comments,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken() || '',
                    'Authorization': `Bearer ${token}`,
                }
            });
            router.push('/order-success'); // Redirect to a success page
        } catch (err) {
            console.error(err);
            setError('Failed to create order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6 neon-text">Create Order</h1>
            <form onSubmit={handleSubmit} className="max-w-xl w-full">
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-400 text-sm font-bold mb-2">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-400 text-sm font-bold mb-2">Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="referencePoint" className="block text-gray-400 text-sm font-bold mb-2">Reference Point:</label>
                    <input type="text" id="referencePoint" value={referencePoint} onChange={(e) => setReferencePoint(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="comments" className="block text-gray-400 text-sm font-bold mb-2">Comments:</label>
                    <textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline neon-button">Submit Order</button>
            </form>
        </div>
    );
};

export default Order;
