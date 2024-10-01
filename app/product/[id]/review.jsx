/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false); // Flag to show all reviews
  const [initialReviewsLoaded, setInitialReviewsLoaded] = useState(false);

  // Fetch reviews on component mount
  useEffect(() => {
    async function getReviews(limit = 5) {
      try {
        const res = await fetch(`/api/review`, {
          headers: {
            'Limit': limit,
            'Product-Id': productId
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setReviews(data.data);
          setInitialReviewsLoaded(true);
        } else {
          console.log("Error fetching reviews");
        }
      } catch (error) {
        console.log(error);
      }
    }

    getReviews(); // Fetch 5 reviews initially
  }, [productId]);

  // Fetch all reviews
  const loadAllReviews = async () => {
    try {
      const res = await fetch(`/api/review`, {
        headers: {
          'Product-Id': productId
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setReviews(data.data); // Update with all reviews
        setShowAll(true); // Set flag to true so the button won't appear anymore
      } else {
        console.log("Error fetching all reviews");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-h-32 mx-auto p-1 mt-4 space-y-6 w-full overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-2">Product Reviews</h1>

      {/* Review List */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border-2 p-4 rounded-lg shadow-sm space-y-2 relative"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{review.name}</h2>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index + 1 <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2">{review.review}</p>
          </div>
        ))
      ) : (
        initialReviewsLoaded && <p className="text-gray-500">No reviews found.</p>
      )}

      {/* Load more button */}
      {!showAll && reviews.length >= 5 && (
        <button
          onClick={loadAllReviews}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Load more reviews
        </button>
      )}
    </div>
  );
}
