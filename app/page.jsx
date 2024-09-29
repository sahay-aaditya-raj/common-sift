"use client";

import CusSlider from "@/components/slider/slider";
import Products from "@/components/Products/allProducts";

import { useMediaQuery } from 'react-responsive'

export default function Home() {

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex-grow">
      <div className="w-full justify-center flex bg-primary">
        <div className="w-full lg:w-5/6 p-1 py-4 text-white">
          <CusSlider/>
        </div>
      </div>
      <div className="w-full flex justify-center">
          <div className="lg:w-5/6 p-2">
            <h1 id='AllProducts' className="text-3xl font-bold mt-6">All Products</h1>
            <Products/>
          </div>
      </div>
    </div>
  );
}


