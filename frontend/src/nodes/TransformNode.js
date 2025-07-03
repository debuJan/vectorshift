import React from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Transform"
      type="transform"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};

export default TransformNode;
