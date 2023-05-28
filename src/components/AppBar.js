import React from "react";
import { useState, useEffect } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';


import FilterPopup from "./FilterPopup";

const AppBar = ({ isListView, toggleView, countries, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortActive, setSortActive] = useState(false);
  const [sortIcon, setSortIcon] = useState(<FaSortAmountDown />);
  const [toastMessage, setToastMessage] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  

  //------------------------------------------SEARCH-------------------------------------------------//
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  
    const filteredCountries = countries.filter((country) => {
      const nameMatch = country.name && country.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      const codeMatch = country.id && country.id.toLowerCase().startsWith(searchTerm.toLowerCase());
      return nameMatch || codeMatch;
    });
  
    setFilteredData(filteredCountries);
  };
  


  //------------------------------------------SORT-------------------------------------------------//

  useEffect(() => {
    const sortedCountries = [...countries].sort((a, b) =>
      sortActive ? parseInt(a.phone) - parseInt(b.phone) : parseInt(b.phone) - parseInt(a.phone)
    );
    setFilteredData(sortedCountries);
  }, [sortActive, countries]);

  function toggleSortFilter() {
    setSortActive(!sortActive);
    setSortIcon(sortOrder === 'asc' ? <FaSortAmountUpAlt /> : <FaSortAmountDown />);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  //------------------------------------------VIEW-------------------------------------------------//
  const handleViewToggle = () => {
    toggleView();
  };

  //------------------------------------------FILTER-------------------------------------------------//
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilter = (continent, currency, phoneCode) => {
    let filteredCountries = countries;

   
    if (continent) {
      filteredCountries = filteredCountries.filter(
        (country) => country.continent === continent
      );
    }

   
    if (currency) {
      filteredCountries = filteredCountries.filter(
        (country) => country.currency === currency
      );
    }

   
    if (phoneCode) {
      filteredCountries = filteredCountries.filter(
        (country) => country.phoneCode === phoneCode
      );
    }

    setFilteredCountries(filteredCountries);
    setToastMessage("Filtre uygulandı!");
  };

  return (
    <div className="appbar-bottom">
     {toastMessage && (
        <div className="toast">
          <span className="toast-message">{toastMessage}</span>
          <button className="toast-close" onClick={() => setToastMessage("")}>
            X
          </button>
        </div>
      )}

      <button onClick={handleViewToggle} className="viewToggle">
        {isListView ? <SplitscreenIcon /> : <GridViewIcon />}
      </button>
      <div className="sortIcon" onClick={toggleSortFilter}>
        {sortIcon}
      </div>

      <div className="filterIcon" onClick={toggleFilter}>
        <FilterAltIcon />
      </div>

      <div className="searchBox">
      <input
            placeholder="Arama yapınız"
            className="textBox"
            type="text"
            value={searchTerm}
            onChange={handleSearch} 
          />

        {isFilterOpen && (
          <FilterPopup isOpen={isFilterOpen} toggleFilter={toggleFilter} applyFilter={applyFilter} />
        )}

      
      {filteredCountries.map((country) => (<div key={country.id}>{country.name}</div>))}
        
      </div>
    </div>
  );
};

export default AppBar;
