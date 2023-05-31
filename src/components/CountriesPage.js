import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CountryList from './CountryList';

import '../style/CountriesPage.css';

const BASE_URL = 'http://localhost:8083/api';
const PAGE_SIZE = 5;

const CountriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);


  const containerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pages/countries?page=${currentPage}&pageSize=${PAGE_SIZE}`);
      const newData = response.data;
      setCountries(prevCountries => [...prevCountries, ...newData]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreCountries = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(`${BASE_URL}/pages/countries?page=${nextPage}&pageSize=${PAGE_SIZE}`);
      const newData = response.data;
      setCountries(prevCountries => [...prevCountries, ...newData]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error fetching more countries:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreCountries();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });



  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div>
      <h1>Ülkeler</h1>

        <CountryList countries={countries} />
        
      <div style={{ marginTop: '20px' }} ref={containerRef}>
        {currentPage > 1 && 'Sayfa yükleniyor...'}
      </div>
    </div>
  );
};

export default CountriesPage;
