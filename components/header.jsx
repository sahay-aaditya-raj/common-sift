'use client'
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-primary text-white py-4 md:p-4 p-2">
            <nav className="flex justify-center">
                <div className="flex w-full lg:w-5/6 justify-between items-center">
                    {/* Logo and mobile menu */}
                    <div className="flex flex-col">
                        <a href="/" className="font-semibold text-3xl md:text-4xl">Common Sift</a>
                        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <ul className="flex flex-col mt-2 space-y-2 text-lg">
                                <li><a href="/#AllProducts">All Products</a></li>
                                <li><a href="/#Categories">Categories</a></li>
                                <li>Account</li>
                                <li>Cart</li>
                            </ul>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 text-lg">
                        <li><a href="/#AllProducts" className="hover:underline">All Products</a></li>
                        <li><a href="/#Categories" className="hover:underline">Categories</a></li>
                        <li>Account</li>
                        <li>Cart</li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}
