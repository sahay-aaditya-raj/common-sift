/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

export default function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [initialReviewsLoaded, setInitialReviewsLoaded] = useState(false);

  useEffect(() => {
    async function getReviews(limit = 5) {
      if(!productId) return;
      try {
        const res = await fetch(`/api/review`, {
          headers: {
            "Limit": limit,
            "Product-Id": productId,
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

  const loadAllReviews = async () => {
    try {
      const res = await fetch(`/api/review`, {
        headers: {
          "Product-Id": productId,
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setReviews(data.data); // Update with all reviews
        setShowAll(true);
      } else {
        console.log("Error fetching all reviews");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto p-1 mt-4 space-y-6 w-full">
      <h1 className="text-2xl font-semibold">Product Reviews</h1>
        <div className=" max-h-80 overflow-y-auto">
            {/* Review List */}
            {reviews.length > 0 ? (
                reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
                ))
            ) : (
                initialReviewsLoaded && (
                <p className="text-gray-500">No reviews found.</p>
                )
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
    </div>
  );
}
