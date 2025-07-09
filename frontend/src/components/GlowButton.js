import React from 'react';
import './GlowButton.css';

const GlowButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  return (
    <button 
      className={`glow-button ${variant} ${className}`}
      onClick={onClick}
    >
      <span className="button-content">{children}</span>
      <div className="glow-effect"></div>
    </button>
  );
};

export default GlowButton;