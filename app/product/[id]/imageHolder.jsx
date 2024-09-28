'use client';
import { useState, useEffect } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

export default function ImageHolder({ imagesIDs }) {
  const [disPlayImage, setDisplayImage] = useState('');

  // Update the display image when imagesIDs changes
  useEffect(() => {
    if (imagesIDs.length > 0) {
      setDisplayImage(`/api/productImage?id=${imagesIDs[0]._id}`);
    }
  }, [imagesIDs]);

  return (
    <div className="flex flex-col items-center lg:p-2 p-1">
      <div className="p-1 w-full">
        <img
          src={disPlayImage}
          alt="Display"
          className="w-full rounded-md object-cover aspect-square"
        />
      </div>
      <div className="flex overflow-x-auto space-x-2 p-1 overflow-y-hidden ">
        {imagesIDs.length > 0 ? (
          imagesIDs.map((image) => (
            <div
              key={image._id}
              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 hover:scale-105 border-2 border-gray-200 bg-gray-200 ease-in-out duration-200 "
            >
              <img
                src={`/api/productImage?id=${image._id}`}
                alt="Thumbnail"
                className="w-full h-full object-cover rounded-sm cursor-pointer"
                onClick={() => setDisplayImage(`/api/productImage?id=${image._id}`)}
              />
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
