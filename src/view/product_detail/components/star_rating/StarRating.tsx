import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./StarRating.scss";

interface IRating {
  rating: number;
  ratingCount: number;
}

const StarRating = (ratings: IRating) => {
  const rating = ratings.rating;
  const ratingCount = ratings.ratingCount;
  const renderStars = (): React.ReactNode => {
    const stars: React.ReactNode[] = [];

    // Round the rating to the nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        // Full star
        stars.push(
          <FaStar
            key={i}
            style={{ width: "23px", height: "23px", color: "gold" }}
          />
        );
      } else if (i - 0.5 === roundedRating) {
        // Half star
        stars.push(
          <FaStarHalfAlt
            key={i}
            style={{ width: "23px", height: "23px", color: "gold" }}
          />
        );
      } else {
        // Empty star
        stars.push(
          <FaRegStar
            key={i}
            style={{ width: "23px", height: "23px", color: "lightgray" }}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="star-container">
      {renderStars()}
      <p className="rating-desc">
        {rating} ({ratingCount})
      </p>
    </div>
  );
};

export default StarRating;
