'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/Products/ProductCard';

export default function SearchPage() {
    const searchParams = useSearchParams(); // Hook to retrieve query parameters
    const query = searchParams.get('q'); // Get the search query parameter from URL
    const [searchResults, setSearchResults] = useState([]); // State to store the fetched data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch search results from /api/search
    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    const data = await response.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchSearchResults();
        }
    }, [query]);

    if (loading) {
        return <div className="p-16 text-[20px] font-semibold">Loading search results...</div>;
    }

    if (searchResults.length === 0) {
        return <div className="p-16 text-[25px] font-semibold">No results found for <u>{query}</u></div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Search Results for {query}</h1>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
