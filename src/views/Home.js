import React, { useState, useEffect } from 'react';
import { getCountries, deleteCountryByCode } from '../services/countryService';
import CountryList from '../components/CountryList';
import CountryGrid from '../components/CountryGrid';
import AppBar from '../components/AppBar';
import FilterPopup from '../components/FilterPopup';

function Home() {
  const [countries, setCountries] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNoMatch, setIsNoMatch] = useState(false);




  const toggleView = () => {
    setIsListView(!isListView);
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountriesData();
  }, []);

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

  const handleDeleteCountry = async (countryCode) => {
    try {
      await deleteCountryByCode(countryCode);
      const updatedCountries = countries.filter((country) => country.countryCode !== countryCode);
      setCountries(updatedCountries);
      setFilteredData(updatedCountries);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilter = (filteredCountries) => {
    setFilteredData(filteredCountries);
    setIsFilterOpen(false);
    setIsNoMatch(filteredCountries.length === 0); // Yeni güncelleme
  };
  

  return (
    <div className="container">
      <AppBar
        isListView={isListView}
        toggleView={toggleView}
        countries={countries}
        setFilteredData={setFilteredData}
        setSearchTerm={setSearchTerm}
        toggleFilter={toggleFilter}
      />
      {isNoMatch ? (
        <div>Eşleşen ülke bulunamadı.</div>
      ) : isListView ? (
        <CountryList
          countries={filteredData.length > 0 ? filteredData : countries}
          onDeleteCountry={handleDeleteCountry}
        />
      ) : (
        <CountryGrid
          countries={filteredData.length > 0 ? filteredData : countries}
          onDeleteCountry={handleDeleteCountry}
        />
      )}
     {isFilterOpen && (
        <FilterPopup
          isOpen={isFilterOpen}
          toggleFilter={toggleFilter}
          applyFilter={applyFilter}
          setIsNoMatch={setIsNoMatch}
            />
          )}

    </div>
  );
  
}

export default Home;
