import React from 'react';
import { useStore } from './store'; // Assuming you have a store.js managing state with zustand
import { shallow } from 'zustand/shallow';
import styled from 'styled-components';

const SubmitButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #4316db 0%, #8743ff 100%);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(135, 67, 255, 0.4);
    background: linear-gradient(135deg, #8743ff 0%, #4316db 100%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = () => {
    fetch('http://127.0.0.1:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the pipeline. Please try again.');
      });
  };

  return (
    <SubmitButtonWrapper>
      <StyledButton type="button" onClick={handleSubmit}>Submit</StyledButton>
    </SubmitButtonWrapper>
  );
};
