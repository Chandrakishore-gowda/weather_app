// src/Routes.js
import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'; // Navigate is used for redirecting
import Link1 from './page1.js'; // Import the Link1 component (this file should be named `page1.js`)
import Map from './MyMap.js'; // Your map component for /link2
import OverlayMapPage from './page2.js';  // New page with overlay map
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Default route to redirect to Link 1 (page1) */}
        <Route path="/" element={<Navigate to="/MyMap" />} />  {/* Redirects root to /page1 */}
        {/* Define routes */}
        <Route path="/MyMap" element={<Map />} /> {/* Route for MyMap */}
        <Route path="/page1" element={<Link1 />} /> {/* Route for Link 1 */}
        <Route path="/page2" element={<OverlayMapPage />} /> {/* Route for Link 1 */}
        {/* You can add more routes for other pages */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
