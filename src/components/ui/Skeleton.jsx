import React from 'react';

const Skeleton = ({ rows = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-gov-gray-100 rounded animate-pulse" />
      ))}
    </div>
  );
};

export default Skeleton;