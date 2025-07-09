import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="brain-loader">
          <div className="brain-wave"></div>
          <div className="brain-wave"></div>
          <div className="brain-wave"></div>
          <div className="brain-icon">🧠</div>
        </div>
        <div className="loading-text">
          <span className="loading-message">{message}</span>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;