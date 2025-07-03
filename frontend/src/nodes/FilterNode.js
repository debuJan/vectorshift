
import React from 'react';
import BaseNode from './baseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      label="Filter"
      type="filter"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    />
  );
};

export default FilterNode;
