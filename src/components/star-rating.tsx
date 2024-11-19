"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const StarIcon: React.FC<StarProps> = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Star
    className={`w-8 h-8 cursor-pointer ${
      filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
    }`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

interface StarRatingProps {
  totalStars?: number;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  totalStars = 5,
  onChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };
 
  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="flex space-x-1"
        role="radiogroup"
        aria-label="Star rating"
      >
        {[...Array(totalStars)].map((_, index) => (
          <StarIcon
            key={index}
            filled={index < (hover || rating)}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(rating)}
          />
        ))}
      </div>
      <input name="rating" type="hidden" value={rating}/>
      <p className="text-sm text-gray-500" aria-live="polite">
        {rating > 0
          ? `You've selected ${rating} star${rating !== 1 ? "s" : ""}`
          : "Select a rating"}
      </p>
    </div>
  );
}
