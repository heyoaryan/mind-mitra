import React from 'react';
import './WaveAnimation.css';

const WaveAnimation = ({ className = '' }) => {
  return (
    <div className={`wave-container ${className}`}>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
    </div>
  );
};

export default WaveAnimation;