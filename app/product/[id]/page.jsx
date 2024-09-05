'use client'
import {useState, useEffect} from 'react'
import ImageHolder from './imageHolder'
import Content from './content'

export default function Product({params}){
    const [proData, setProData] = useState({})
    const [imagesIDs, setImagesIDs] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch(`/api/product?id=${params.id}`)
            if(res.status === 200){
                const data = await res.json()
                setProData(data.data)
                setImagesIDs(data.imagesIDs)
                console.log(data.imagesIDs)
            } else {
                alert("Error")
            }
        }
        fetchData()
    },[params.id])
    return(
        <div className='w-full flex justify-center'>
                <div className='flex flex-wrap lg:w-5/6 p-2'>
                    <div className='md:w-1/2 w-full'><ImageHolder imagesIDs={imagesIDs}/></div>
                    <div className='md:w-1/2 w-full'><Content data={proData}/></div>
                </div>
        </div>
    )
}