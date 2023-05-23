import React, { useState, useEffect } from 'react';
import { getCountries, deleteCountryByCode } from '../services/countryService';
import CountryList from '../components/CountryList';
import CountryGrid from '../components/CountryGrid';
import AppBar from '../components/AppBar';

function Home() {
  const [countries, setCountries] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNoMatch, setIsNoMatch] = useState(false);

// ---------------------------view-------------------------------------------------------------------------------------------------------------   
  const toggleView = () => {
    setIsListView(!isListView);
  };
// ---------------------------data-------------------------------------------------------------------------------------------------------------   

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  // ---------------------------search-------------------------------------------------------------------------------------------------------------   

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, countries]);

  const handleSearch = (searchTerm) => {
    if (!countries) return;
    const filteredCountries = countries.filter((country) => {
      const nameMatch = country.name && country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const codeMatch = country.countryCode && country.countryCode.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || codeMatch;
    });
    setFilteredData(filteredCountries);
    setIsNoMatch(filteredCountries.length === 0);
  };
    // ---------------------------delete-------------------------------------------------------------------------------------------------------------   

  const handleDeleteCountry = async (countryCode) => {
    try {
      await deleteCountryByCode(countryCode);
      const updatedCountries = countries.filter((country) => country.countryCode !== countryCode);
      setCountries(updatedCountries);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className="container">
      <AppBar isListView={isListView} toggleView={toggleView}  countries={countries}  
      setFilteredData={setFilteredData}  setSearchTerm={setSearchTerm}  />
      {isNoMatch ? (
        <div>Eşleşen ülke bulunamadı.</div>
      ) : (
        isListView ? (
          <CountryList  countries={filteredData.length > 0 ? filteredData : countries} onDeleteCountry={handleDeleteCountry}  />
        ) : (
          <CountryGrid countries={filteredData.length > 0 ? filteredData : countries} onDeleteCountry={handleDeleteCountry} />
        )
      )}
    </div>
  );
}

export default Home;
