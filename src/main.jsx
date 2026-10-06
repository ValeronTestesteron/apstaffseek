import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/apstaffseek">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
