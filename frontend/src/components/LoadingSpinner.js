import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    "💡 MindMitra uses advanced AI to understand your emotions",
    "🌟 Your conversations are completely private and secure",
    "🎯 Get personalized suggestions based on your mood",
    "🌍 Chat in multiple languages with real-time translation",
    "📊 Track your mental health journey with analytics"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="loading-overlay">
      {/* Floating Particles */}
      <div className="loading-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="loading-container">
        {/* Brain Loader */}
        <div className="brain-loader">
          <div className="brain-wave"></div>
          <div className="brain-wave"></div>
          <div className="brain-wave"></div>
          <div className="brain-icon">🧠</div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <span className="loading-message">{message}</span>
          
          {/* Loading Dots */}
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>

          {/* Loading Tips */}
          <div className="loading-tips">
            {tips.map((tip, index) => (
              <div 
                key={index} 
                className={`loading-tip ${index === currentTip ? 'active' : ''}`}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;