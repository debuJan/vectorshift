import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

const NodeContainer = styled.div`
  width: 220px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #3b82f6;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NodeTitle = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #3b82f6;
  text-align: center;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: calc(100% - 10px);
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SelectField = styled.select`
  width: calc(100% - 10px);
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const BaseNode = ({ id, data, type, handles, label, children }) => {
  const [name, setName] = useState(data?.name || id);
  const [nodeType, setNodeType] = useState(data?.nodeType || 'Text');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setNodeType(e.target.value);
  };

  useEffect(() => {
    console.log("Rendering BaseNode with handles:", handles);
  }, [handles]);

  return (
    <NodeContainer>
      <NodeTitle>{label}</NodeTitle>
      {children || (
        <div>
          <InputLabel>
            Name:
            <InputField type="text" value={name} onChange={handleNameChange} />
          </InputLabel>
          {type !== 'Text' && (
            <InputLabel>
              Type:
              <SelectField value={nodeType} onChange={handleTypeChange}>
                <option value="Text">Text</option>
                <option value="File">File</option>
              </SelectField>
            </InputLabel>
          )}
        </div>
      )}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || { background: '#555' }} // Adding a default background color to make sure it's visible
        />
      ))}
    </NodeContainer>
  );
};

export default BaseNode;
