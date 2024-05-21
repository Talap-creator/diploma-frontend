// pages/signin.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('ecoMarket/login/', {
                username,
                password
            });
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh)
            router.push('/');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError('Failed to login: ' + err.response.data.detail);
            } else {
                setError('Failed to login: Please try again later.');
            }
        }
    };

    return (
        <>
        <Navbar/>
                    <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-xs">
                <h1 className="mb-4 text-3xl font-semibold text-center neon-text">Sign In</h1>
                <form onSubmit={handleLogin} className="bg-orange-text shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex flex-col gap-8 items-center justify-between">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline neon-button" type="submit">
                            Login
                        </button>
                        <Link href="/sign-up" className='inline-block align-baseline font-bold text-sm text-white hover:text-purple-700'>
                           
                                Do not have an account? Sign Up

                        </Link>
                    </div>
                </form>
            </div>
        </div>
        <Footer></Footer>        
        </>
    );
};

export default SignIn;
