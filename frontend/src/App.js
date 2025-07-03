import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Navbar } from './components/Navbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
       
        <GlobalStyle />
        <Navbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
