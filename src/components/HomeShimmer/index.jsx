import React from "react";
import "./index.css";

const HomeShimmer = () => {
  return (
    <div className="shimmer-container">
      {[1, 2, 3, 4].map((_, index) => (
        <div className="shimmer-card" key={index}>
          {/* Image Shimmer */}
          <div className="shimmer-image">
            <div className="shimmer"></div>
          </div>

          {/* Content Shimmer */}
          <div className="shimmer-content">
            {/* Title */}
            <div className="shimmer-title">
              <div className="shimmer"></div>
            </div>

            {/* Description */}
            <div className="shimmer-desc">
              <div className="shimmer-line">
                <div className="shimmer"></div>
              </div>
              <div className="shimmer-line short">
                <div className="shimmer"></div>
              </div>
            </div>

            {/* Price */}
            <div className="shimmer-price">
              <div className="shimmer"></div>
            </div>

            {/* Button */}
            <div className="shimmer-button">
              <div className="shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeShimmer;
