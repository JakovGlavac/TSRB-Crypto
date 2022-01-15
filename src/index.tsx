import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';
import { ChakraProvider, Container, DarkMode } from '@chakra-ui/react'
import { theme } from "./theme"
import Navbar from './components/Navbar';


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MoralisProvider appId="LUM8fcmThkXmaERm9NuhhD0bHiZdsf3aAM9ldpxt" serverUrl="https://cbwnm505es3o.usemoralis.com:2053/server">
        <Container maxW="container.xl" minH="90vh">
          <DarkMode>
            <Navbar />
            <App />
          </DarkMode>
        </Container>
      </MoralisProvider>
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
