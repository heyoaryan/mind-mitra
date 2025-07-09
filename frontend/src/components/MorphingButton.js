import React, { useState } from 'react';
import './MorphingButton.css';

const MorphingButton = ({ children, onClick, className = '', variant = 'primary' }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (onClick) onClick();
  };

  return (
    <button 
      className={`morphing-button ${variant} ${className} ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      <span className="button-text">{children}</span>
      <div className="button-bg"></div>
      <div className="ripple-effect"></div>
    </button>
  );
};

export default MorphingButton;