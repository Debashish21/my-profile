import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPortfolio from './pages/MainPortfolio';
import AlterEgoPage from './pages/AlterEgoPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio */}
        <Route path="/" element={<MainPortfolio />} />
        
        {/* Alter Ego - Direct Access */}
        <Route path="/alter-ego" element={<AlterEgoPage />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
