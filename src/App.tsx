import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import SignUp from './features/AccountManagement/SignUp';
import { theme } from '@chakra-ui/react';
import SignIn from './features/AccountManagement/SignIn';
import TeamSummary from './features/TeamSummary/TeamSummary';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TeamSummary />
    </ChakraProvider>
  );
}

export default App;
