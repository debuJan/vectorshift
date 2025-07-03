import React from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';

export const AggregateNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Aggregate"
      type="aggregate"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};

export default AggregateNode;
