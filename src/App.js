import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import CountryDetail from './views/CountryDetail';
import Navbar from './components/Navbar';
import CountriesPage from './components/CountriesPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="country/:countryCode" element={<CountryDetail />} />
        <Route path="countries" element={<CountriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
