import React from "react";
//import Phone from '@mui/icons-material/Phone';
import { useState , useEffect} from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';


const AppBar = ({ isListView, toggleView, countries, setFilteredData }) => {
const [searchTerm, setSearchTerm] = useState("");
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [sortOrder, setSortOrder] = useState('asc');
const [sortActive, setSortActive] = useState(false);

//------------------------------------------SEARCH-------------------------------------------------//
const handleSearch = () => {
    const filteredCountries = countries.filter((country) => {
      const nameMatch = country.name && country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const codeMatch = country.countryCode && country.countryCode.toLowerCase().includes(searchTerm.toLowerCase());
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
  }
  
//------------------------------------------VIEW-------------------------------------------------//
const handleViewToggle = () => {
    toggleView(); // Ana bileşende görünümü değiştirmek için toggleView fonksiyonunu çağırın
  };
//------------------------------------------FILTER-------------------------------------------------//
const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };


  return (
    <div className="appbar-bottom">
      <button onClick={handleViewToggle} className="viewToggle">
        {isListView ? <SplitscreenIcon /> : <GridViewIcon />}
      </button>
      <div className="sortIcon" onClick={toggleSortFilter}>
        {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUpAlt />}
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch} className="searchButton">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default AppBar;
