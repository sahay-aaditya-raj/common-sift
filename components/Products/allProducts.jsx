'use client'
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
export default function Products(){
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("/api/products")
        .then(res => res.json())
        .then(data => {setProducts(data.data)})
    }, [])
    return(
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map(product =>{
                return <ProductCard key={product._id} product={product}/>
            })}
        </div>
    )
}