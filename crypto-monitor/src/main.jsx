import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './components/navbar.jsx';
import CoinDetails from './components/CoinDetails.jsx'; // Component for the coin details page
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} /> {/* Main component */}
      <Route path="/coin/:id" element={<CoinDetails />} /> {/* Dynamic coin details route */}
    </Routes>
  </BrowserRouter>
);
