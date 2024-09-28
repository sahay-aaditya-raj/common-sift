'use client';
import { useState, useEffect } from 'react';
import ImageHolder from './imageHolder';
import Content from './content';

export default function Product({ params }) {
  const [proData, setProData] = useState({});
  const [imagesIDs, setImagesIDs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/product?id=${params.id}`);
      if (res.status === 200) {
        const data = await res.json();
        setProData(data.data);
        setImagesIDs(data.imagesIDs);
      } else {
        alert('Error');
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row md:space-x-4 lg:w-5/6 p-2">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <ImageHolder imagesIDs={imagesIDs} />
        </div>
        <div className="w-full md:w-1/2">
          <Content data={proData} />
        </div>
      </div>
    </div>
  );
}
