"use client"
import { useState, useEffect } from "react"
import ProductCard from "@/components/Products/ProductCard";

export default function Category({category}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("/api/products?category=" + category)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
            })
    }, [category])

    return (
        <div className="my-3">
            {products && products.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-4">
                        {category === 'None' ? 'Others' : category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <hr className="border-2 rounded-xl border-slate-600 my-4" />
                </>
            )}
        </div>
    )
}
