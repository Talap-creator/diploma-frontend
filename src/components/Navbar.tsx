// components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { AiOutlineLogin, AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 shadow-2xl px-8">
      <div>
        <h1 className="text-3xl font-bold neon-text shadow-2xl">
          <Link href='/'><a>Tech Marketplace</a></Link>
        </h1>
      </div>
      <div className="flex items-center">
        {!isSignedIn && (
          <Link href="/sign-in">
            <a className="flex items-center mr-6 text-gray-300 hover:text-blue-400 transition duration-300 shadow-2xl">
              <AiOutlineLogin size="1.5em" />
              <span className="ml-2">Sign In</span>
            </a>
          </Link>
        )}
        <Link href="/cart">
          <a className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300 shadow-2xl">
            <AiOutlineShoppingCart size="1.5em" />
            <span className="ml-2">Cart</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
