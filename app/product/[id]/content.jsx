import { useEffect, useState } from 'react';
import Review from './review';
import { FaStar } from "react-icons/fa";

export default function Content({ data }) {
  const [url, setUrl] = useState('');
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    starCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    totalReviews: 0,
  });

  const discount = Number(data?.s_price);
  let price = Number(data?.price);
  if (discount > 0) {
    price = price - (price * discount / 100);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = `https://wa.me/918092811097?text=Order%20${window.location.href}`;
      setUrl(u);
    }

    // Fetch review stats (average rating and star distribution)
    async function fetchReviewStats() {
      if(data?._id === undefined) return;
      try {
        const res = await fetch(`/api/review`, {
          headers: {
            'Product-Id': data?._id,
          },
        });
        const result = await res.json();
        if (res.status === 200) {
          setReviewStats(result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviewStats();
  }, [data?._id]);
  

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-lg ${index < fullStars ? "text-yellow-500" : index === fullStars && halfStar ? "text-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-2">
      <div className="flex lg:flex-row flex-col justify-between">
        <div className="w-full lg:w-3/5">
          <h1 className="font-bold text-2xl capitalize">{data?.name}</h1>
          <div className="mt-2">
            <div className="text-lg text-gray-600">
              Price: ₹ {discount ? (
                <>
                  <span className="diagonal-text relative inline">{data?.price}</span>
                  <span className='ms-2 inline font-bold'>{price}</span>
                  <div className='font-bold text-red-600'>{discount}% off</div>
                </>
              ) : `${data.price}`}
            </div>
            <p className="text-lg text-gray-600">Category: {data?.category}</p>
            <p className="text-lg text-gray-600">Description: {data?.desc}</p>
          </div>
          <div className="mt-4">
            To place an order <a className="underline rounded font-extrabold text-green-600" target="_blank" rel="noopener noreferrer" href={url}>click here</a> or share the current Product URL to: {'696969696969'}
          </div>
        </div>

        {/* Review Average */}
        <div className="w-full lg:w-2/5 lg:mt-0 mt-4">
          <h2 className="font-bold text-xl">Rating: {reviewStats.averageRating}</h2>
          {renderStars(reviewStats.averageRating)}
          {/* Star distribution with progress bars */}
          <div className="flex flex-col-reverse">
          {Object.keys(reviewStats.starCounts).map(star => {
            const percentage = (reviewStats.starCounts[star] / reviewStats.totalReviews) * 100;
            return (
              <div key={star} className="mt-2">
                <div className="flex justify-between">
                  <span>{star} Stars</span>
                  <span>{reviewStats.starCounts[star]} reviews</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-lg">
                  <div className="bg-yellow-500 h-2 rounded-lg" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Render the review component */}
      <Review productId={data?._id} />
    </div>
  );
}
