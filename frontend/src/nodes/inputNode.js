import React from 'react';
import BaseNode from './baseNode';
import { Handle, Position } from 'reactflow';


export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Input"
      type="input"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    />
  );
};

export default InputNode;
