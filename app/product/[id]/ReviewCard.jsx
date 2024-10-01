import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 150; // Max length for the truncated review

  // Function to toggle between expanded and collapsed states
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-2 p-4 rounded-lg shadow-sm my-3 relative">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{review.name}</h2>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-lg ${
                index + 1 <= review.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-2">
        {/* Show the truncated review or full review based on the `isExpanded` state */}
        {isExpanded || review.review.length <= MAX_LENGTH ? (
          review.review
        ) : (
          <>
            {review.review.substring(0, MAX_LENGTH)}...
            <button
              onClick={toggleReadMore}
              className="text-blue-500 hover:underline ml-1"
            >
              See more
            </button>
          </>
        )}
      </p>

      {/* Show "See less" when the full review is displayed */}
      {isExpanded && review.review.length > MAX_LENGTH && (
        <button
          onClick={toggleReadMore}
          className="text-blue-500 hover:underline mt-2 block"
        >
          See less
        </button>
      )}
    </div>
  );
}
