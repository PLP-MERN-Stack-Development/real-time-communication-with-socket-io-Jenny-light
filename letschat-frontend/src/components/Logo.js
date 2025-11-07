import React from 'react';

const Logo = ({ size = 40, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="45" fill="#8B5CF6" />
      
      {/* Speech Bubble Shape */}
      <path 
        d="M30,30 Q50,20 70,30 Q80,40 70,50 L50,65 L30,50 Q20,40 30,30 Z" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Wave inside speech bubble */}
      <path 
        d="M35,40 Q45,35 55,45 Q65,55 65,45" 
        fill="none" 
        stroke="#8B5CF6" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path 
        d="M40,50 Q50,45 60,55" 
        fill="none" 
        stroke="#8B5CF6" 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Sparkle/dot */}
      <circle cx="60" cy="35" r="3" fill="#10B981" />
    </svg>
  );
};

export default Logo;