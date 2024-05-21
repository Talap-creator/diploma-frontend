// pages/signup.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('ecoMarket/register/', {
                username,
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });
            router.push('/sign-in');  // Redirect to the sign-in page after successful registration
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError('Failed to sign up: ' + err.response.data.detail);
            } else {
                setError('Failed to sign up: Please try again later.');
            }
        }
    };

    return (
            <>
            <Navbar/>
                    <div className="flex justify-center items-center min-h-screen bg-white p-6">
            <div className="w-full max-w-md bg-orange-text p-8 rounded-lg shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-center text-white">Sign Up</h1>
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 bg-white text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block text-white text-sm font-bold mb-2">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 bg-white text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-white text-sm font-bold mb-2">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 bg-white text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-white text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-white text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline neon-button" type="submit">
                            Sign Up
                        </button>
                        <Link href="/signin" className='inline-block align-baseline font-bold text-sm text-white hover:text-purple-700'>
                                Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
            </>
    );
};

export default SignUp;
