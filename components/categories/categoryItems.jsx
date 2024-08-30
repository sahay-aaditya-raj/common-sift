'use client'
import {useState, useEffect} from 'react'
import CategoryItem from './categoryItem'

export default function CategoryItems(){

    const [data, setData] = useState({})
    useEffect(()=>{
        fetch('/api/homeCategory')
        .then(res=>res.json())
        .then(data=>{setData(data.data);console.log(data.data)})
    },[])
    return(
        <div className="w-full flex justify-center">
          <div className="lg:w-5/6 p-2">
            <h1 id='Categories' className="text-3xl font-bold mt-6">Categories</h1>
            {(Object.keys(data).length > 0)?(Object.keys(data).map((title,i)=>{
                return <CategoryItem title={title} key={i} products={data[title]}/>
            })):(<></>)}
          </div>
      </div>
    )
}