import React from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';

export const JoinNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Join"
      type="join"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input1` },
        { type: 'target', position: Position.Left, id: `${id}-input2` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};

export default JoinNode;
