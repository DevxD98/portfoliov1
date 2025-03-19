import React from 'react';

const Circle = ({ size, delay, color, position, title, content, onHover, onLeave }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    background: 'linear-gradient(45deg, rgba(31, 31, 31, 1), rgba(255, 255, 255, 0.3))',
    position: 'absolute',
    left: position.x,
    top: position.y,
    borderRadius: '50%',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transformOrigin: 'center center',
    overflow: 'hidden',
    padding: '20px',
    zIndex: '10',
  };

  return (
    <div
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.opacity = '1';
        e.currentTarget.querySelector('.circle-content').style.opacity = '1';
        onHover();
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.querySelector('.circle-content').style.opacity = '0';
        onLeave();
      }}
    >
      <div 
        className="circle-content text-white text-center"
        style={{ 
          opacity: 0, 
          transition: 'opacity 0.3s ease',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: `clamp(${size * 0.015}px, ${size * 0.02}px, ${size * 0.025}px)`,
          padding: `${size * 0.03}px`
        }} 
      >
        {title && content && (
          <>
            <span style={{ fontSize: '1.2em', maxWidth: '100%' }} className="font-medium truncate w-full">{title}</span>
            <span style={{ fontSize: '0.9em', maxWidth: '100%', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }} className="opacity-80">{content}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Circle;