import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home'
import Events from './pages/Events'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
