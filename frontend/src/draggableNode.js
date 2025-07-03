// draggableNode.js
import React from 'react';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      style={{
        padding: '5px 10px',
        backgroundColor: '#1E4C97',  /* Match with the navbar color */
        borderRadius: '4px',
        color: 'white',
        cursor: 'grab',
        fontWeight: '500',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2A69AC'}  /* Lighter shade on hover */
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E4C97'}
    >
      {label}
    </div>
  );
};
