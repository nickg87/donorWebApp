// ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ value, max }) => {
  const progress = (value / max) * 100;

  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: '#4caf50', // You can adjust this color
          borderRadius: '5px',
        }}
      />
    </div>
  );
};

export default ProgressBar;