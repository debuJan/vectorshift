import React from 'react';
import BaseNode from './baseNode';
import { Handle, Position } from 'reactflow';


export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Output"
      type="output"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
    />
  );
};

export default OutputNode;
