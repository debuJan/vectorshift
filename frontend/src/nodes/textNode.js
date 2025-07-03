import React, { useState, useEffect, useCallback } from 'react';
import BaseNode from './baseNode';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

const VariableContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const VariableInput = styled.span`
  display: inline-block;
  padding: 3px 8px;
  margin-right: 5px;
  margin-left: -12px; /* Adjust position to align with the handle */
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #3b82f6;
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [handles, setHandles] = useState([{ type: 'source', position: Position.Right, id: `${id}-output` }]);
  const [variables, setVariables] = useState([]);

  const handleResize = useCallback((event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleTextChange = (event) => {
    let value = event.target.value;
    setText(value);

    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    let match;
    const newHandles = [{ type: 'source', position: Position.Right, id: `${id}-output` }];
    const newVariables = [];

    while ((match = regex.exec(value)) !== null) {
      const variable = match[1];
      newHandles.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: { top: '50%' } // Position at middle of the height
      });

      newVariables.push(variable);
      
      // Replace the variable inside the text area with a placeholder or empty space
      value = value.replace(match[0], '');
    }

    setText(value);
    setHandles(newHandles);
    setVariables(newVariables);
  };

  useEffect(() => {
    const textarea = document.getElementById(`textarea-${id}`);
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text, id]);

  return (
    <BaseNode
      id={id}
      data={{ ...data, text }}
      label="Text"
      type="text"
      handles={handles}
    >
      <TextArea
        id={`textarea-${id}`}
        value={text}
        onChange={handleTextChange}
        onInput={handleResize}
      />
      <VariableContainer>
        {variables.map((variable, index) => (
          <VariableInput key={index}>{variable}</VariableInput>
        ))}
      </VariableContainer>
    </BaseNode>
  );
};

export default TextNode;
