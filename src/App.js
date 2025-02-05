// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar';  // Assuming Navbar is imported here
import AppRoutes from './Routes';  // Assuming Routes contains the routing logic

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes /> {/* Renders the correct route */}
    </Router>
  );
};

export default App;
