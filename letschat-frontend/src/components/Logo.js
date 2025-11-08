import React from 'react';

const Logo = ({ showText = true, size = 'medium', className = '' }) => {
  const sizes = {
    small: { icon: 24, text: '1rem' },
    medium: { icon: 32, text: '1.5rem' },
    large: { icon: 48, text: '2rem' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Icon */}
      <div style={{
        width: icon,
        height: icon,
        backgroundColor: '#8B5CF6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: icon * 0.6,
          height: icon * 0.4,
          backgroundColor: 'white',
          borderRadius: '25%',
          position: 'relative'
        }}>
          {/* Wave lines */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '20%',
            right: '20%',
            height: '2px',
            backgroundColor: '#8B5CF6',
            borderRadius: '1px'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '30%',
            right: '30%',
            height: '2px',
            backgroundColor: '#8B5CF6',
            borderRadius: '1px'
          }}></div>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <span style={{
          fontSize: text,
          fontWeight: 'bold',
          color: '#8B5CF6',
          fontFamily: 'Arial, sans-serif'
        }}>
          LetsChat
        </span>
      )}
    </div>
  );
};

export default Logo;