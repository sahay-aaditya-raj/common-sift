"use client"
import { useState, useEffect } from "react"
import Category from "./category"

export default function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data.data);
            })
    }, [])

    return (
        <div className="flex-grow">
            <div className="w-full flex justify-center">
                <div className="lg:w-5/6 p-2">
                    <h1 id='Category' className="text-3xl font-bold mt-6">Categories</h1>
                        {categories && categories.map((category, index) => (
                            <div key={index} className="category-item">
                                <Category category={category.name} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
