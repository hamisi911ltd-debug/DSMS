import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  padding = 'p-4',
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass-card rounded-2xl 
        ${padding}
        ${hover ? 'cursor-pointer transition-all duration-300 hover:bg-white/10' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;