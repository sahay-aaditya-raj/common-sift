/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'

export default function ImageHolder({ imagesIDs }) {
    const [disPlayImage, setDisplayImage] = useState('')

    // Update the display image when imagesIDs changes
    useEffect(() => {
        if (imagesIDs.length > 0) {
            setDisplayImage(`/api/productImage?id=${imagesIDs[0]._id}`)
        }
    }, [imagesIDs])

    return (
        <div className="flex justify-center flex-col lg:p-2 p-1 md:w-4/5">
            <div className="p-1 w-full">
                <img src={disPlayImage} alt="DisPlay" className="w-full rounded-md aspect-square object-cover" />
            </div>
            <div className="overflow-x-auto overflow-y-hidden flex flex-row custom-scrollbar">
                {imagesIDs.length > 0 ? (
                    imagesIDs.map((image) => (
                        <div
                            key={image._id}
                            className="min-w-[15%] hover:scale-105 border-2 border-gray-200 bg-gray-200 ease-in-out duration-200"
                        >
                            <img
                                src={`/api/productImage?id=${image._id}`}
                                alt="image"
                                className="aspect-square h-20 md:h-24 object-cover rounded-sm cursor-pointer"
                                onClick={() => setDisplayImage(`/api/productImage?id=${image._id}`)}
                            />
                        </div>
                    ))
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}
