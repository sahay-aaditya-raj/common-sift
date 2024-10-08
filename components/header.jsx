'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const router = useRouter(); // Next.js router for navigation

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to handle search input change
    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle search button click
    const handleSearchButtonClick = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push('/'); // Redirect to homepage if input is empty
        }
    };

    // Function to handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        }
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
                                <li>
                                    <div className="relative">
                                        <input
                                            type='text'
                                            className="bg-white bg-opacity-[2%] rounded-t focus:outline-none border-b-2 border-gray-300 transition-all outline-none duration-300 ease-in-out focus:bg-opacity-[5%] px-2 pr-10" // Add right padding for button
                                            placeholder="Search ..."
                                            value={searchQuery}
                                            onChange={handleSearchInput} // Trigger search on change
                                            onKeyDown={handleKeyDown} // Handle Enter key
                                        />
                                        <button onClick={handleSearchButtonClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6M9 4a7 7 0 100 14 7 7 0 000-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                                <li><a href="/#AllProducts">All Products</a></li>
                                <li><a href="/coming">Account</a></li>
                                <li><a href="/coming">Cart</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 text-lg">
                        <li>
                            <div className="relative">
                                <input
                                    type='text'
                                    className="bg-white bg-opacity-[2%] rounded-t focus:outline-none border-b-2 border-gray-300 transition-all outline-none duration-300 ease-in-out focus:bg-opacity-[5%] px-2 pr-10" // Add right padding for button
                                    placeholder="Search ..."
                                    value={searchQuery}
                                    onChange={handleSearchInput} // Trigger search on change
                                    onKeyDown={handleKeyDown} // Handle Enter key
                                />
                                <button onClick={handleSearchButtonClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6M9 4a7 7 0 100 14 7 7 0 000-14z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li><a href="/#AllProducts" className="hover:underline">All Products</a></li>
                        <li><a href="/coming">Account</a></li>
                        <li><a href="/coming">Cart</a></li>
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
