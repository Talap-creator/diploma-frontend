// components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import { useVerifyAndRefreshToken } from '@/hooks/useVerifyAndRefreshToken';
import { logout } from '@/utils/authUtils';

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useVerifyAndRefreshToken();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsSignedIn(!!token);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-xl px-8 ">
      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-bold neon-text"><Link href='/'>TechnoTreasures</Link></h1>
        <span className="ml-6">Москва <span className=' text-gray-800 text-opacity-75'>+7 (495) 780-20-02</span></span>
      </div>
      <div className="flex items-center">
        <a href="/cart" className="flex items-center mr-6">
          <AiOutlineShoppingCart size="1.5em" />
          <span className="ml-2">Корзина</span>
        </a>
        {isSignedIn ? (
          <button onClick={handleLogout} className="flex items-center">
            <AiOutlineLogout size="1.5em" />
            <span className="ml-2">Выйти</span>
          </button>
        ) : (
          <a href="/sign-in" className="flex items-center">
            <AiOutlineLogin size="1.5em" />
            <span className="ml-2">Войти</span>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
