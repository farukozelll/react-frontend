import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import CountryDetail from './views/CountryDetail';
import Navbar from './components/Navbar';



function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
          <Route exact path="/" component={Home} element={<Home />} />   
          <Route path="country/:countryCode" component={CountryDetail} element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
