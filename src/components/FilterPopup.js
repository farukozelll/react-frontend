import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import '../style/Filter.css';

const FilterPopup = ({ isOpen, toggleFilter, applyFilter }) => {
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [isNoMatch, setNoMatch] = useState(false);


  const handleApplyFilter = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/filter', {
        params: {
          currency: selectedCurrencies[0],
          phone: phoneCode,
          continent: selectedContinents[0]
        }
      });
  
      const filteredCountries = response.data;
      applyFilter(filteredCountries);
  
      if (filteredCountries.length === 0) {
        setNoMatch(true);
      } else {
        setNoMatch(false);
      }
    } catch (error) {
      console.error('Error filtering countries:', error);
    }
  
    toggleFilter();
  };
  

  const continents = [
    { value: 'null', label: 'Select' },
    { value: 'AF', label: 'Africa' },
    { value: 'AS', label: 'Asia' },
    { value: 'EU', label: 'Europe' },
    { value: 'NA', label: 'North America' },
    { value: 'OC', label: 'Oceania' },
    { value: 'SA', label: 'South America' },
    { value: 'AN', label: 'Antarctica' },
  ];

  const currencies = [
    { value: 'null', label: 'Select' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'CAD', label: 'CAD' },
    { value: 'GBP', label: 'GBP' },
    { value: 'JPY', label: 'JPY' },
    { value: 'AUD', label: 'AUD' },
    { value: 'CHF', label: 'CHF' },
    { value: 'CNY', label: 'CNY' },
    { value: 'RUB', label: 'RUB' },
    { value: 'TRY', label: 'TRY' },
  ];

  const handleContinentChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedContinents(selectedValues);
  };

  const handleCurrencyChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCurrencies(selectedValues);
  };

  const handlePhoneCodeChange = (event) => {
    const { value } = event.target;
    setPhoneCode(value);
  };

  const handleFilterClose = () => {
    toggleFilter();
  };

  return (
    <div className={`filter-popup ${isOpen ? 'open' : ''}`}>
      <div className="filter-content">
      <button className="filter-close" onClick={handleFilterClose}>
        <AiOutlineCloseCircle />
      </button>
        <div className="filter-field">
          <span className="filter-icon">🌎</span> Continent🗺️<span className="filter-icon"></span>
          <select multiple value={selectedContinents} onChange={handleContinentChange} className="filter-select">
            {continents.map((continent) => (
              <option key={continent.value} value={continent.value}>
                {continent.label}
              </option>
            ))}
          </select>
          <hr/>
       
          <span className="filter-icon">💱</span>Currency<span className="filter-icon">💵</span>
          <select multiple value={selectedCurrencies} onChange={handleCurrencyChange} className="filter-select">
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
          <hr/>
          <span className="filter-icon">☎️</span> Phone Code📞 <span className="filter-icon"></span>
          <input type="text" value={phoneCode} onChange={handlePhoneCodeChange} className="filter-input" />
        </div>
           <div className="filter-actions">
                <button onClick={handleApplyFilter}>Filtrele</button>
           </div>
        </div>
     
    
     
    </div>
  );
};

export default FilterPopup;
