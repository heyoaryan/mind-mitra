import React from 'react';
import './GradientBackground.css';

const GradientBackground = ({ variant = 'default' }) => {
  return (
    <div className={`gradient-background ${variant}`}>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      <div className="gradient-mesh"></div>
    </div>
  );
};

export default GradientBackground;