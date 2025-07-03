// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #0a0a0a; /* Darker background */
    color: #e0e0e0; /* Light grey text */
  }

  .App {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;
