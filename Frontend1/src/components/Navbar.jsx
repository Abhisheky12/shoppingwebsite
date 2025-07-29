import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Close, Menu, PersonAdd, Search, ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated=false;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='fixed top-0 w-full bg-gray-800 shadow-sm z-50'>
            <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* navbar logo */}
                <div className='flex-shrink-0'>
                    <Link to="/" className="text-2xl font-bold text-blue-400 no-underline transition-colors duration-200 hover:text-blue-500">
                        ShopEasy
                    </Link>
                </div>

                {/* navbar link (Desktop & Mobile Conditional) */}
                <div className={`
                    absolute top-16 left-0 right-0 bg-gray-800 px-4 py-4 border-t border-gray-700 shadow-md
                    md:static md:flex md:flex-1 md:ml-8 md:p-0 md:border-t-0 md:shadow-none md:bg-transparent
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? 'flex flex-col' : 'hidden'}
                `}>
                    <ul className="flex list-none gap-4 m-0 p-0 md:flex-row md:gap-10">
                        <li><Link to="/" className="text-gray-200 no-underline font-medium block py-2 md:py-0 transition-colors duration-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Home</Link></li>
                        <li><Link to="/products" className="text-gray-200 no-underline font-medium block py-2 md:py-0 transition-colors duration-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Products</Link></li>
                        <li><Link to="/about-us" className="text-gray-200 no-underline font-medium block py-2 md:py-0 transition-colors duration-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">About Us</Link></li>
                        <li><Link to="/contact-us" className="text-gray-200 no-underline font-medium block py-2 md:py-0 transition-colors duration-200 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="flex items-center gap-6 w-auto sm:w-[300px] md:w-[250px]">
                    {/* search */}
                    <div className="relative flex items-center flex-1 sm:flex-none">
                        <form className="flex items-center w-full">
                            <input
                                type="text"
                                className='w-full px-3 py-1.5 rounded-md  border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none  text-sm'
                                placeholder='Search products'
                            />
                            <button type="submit" className='ml-2 text-gray-200 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                                <Search className='text-xl' focusable="false" />
                            </button>
                        </form>
                    </div>

                    {/* carticon */}
                    <div className="relative flex items-center">
                        <Link to="/cart">
                            <ShoppingCart className='text-gray-200 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' />
                            <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1'>0</span>
                        </Link>
                    </div>

                    {/* register */}
                    {/* if useris authenticated then not show this icon ,that time user photo will be shown */}
                    {!isAuthenticated && <Link to="/register" className='no-underline flex items-center'>
                        <PersonAdd className='text-gray-200 hover:text-blue-400 transition-colors duration-200 cursor-pointer text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' />
                    </Link>}

                    {/* Hamburger Icon (Mobile) */}
                    <div className="md:hidden cursor-pointer ml-4" onClick={toggleMenu}>
                        {isMenuOpen ? <Close className='text-gray-200 text-2xl' /> : <Menu className='text-gray-200 text-2xl' />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;