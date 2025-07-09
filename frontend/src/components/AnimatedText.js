import React, { useState, useEffect } from 'react';
import './AnimatedText.css';

const AnimatedText = ({ text, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className={`animated-text ${className}`}>
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default AnimatedText;