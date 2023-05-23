import axios from 'axios';

const BASE_URL = 'http://localhost:8083/api';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const deleteCountryByCode = async (countryCode) => {
  try {
    const response = await axios.delete(`${BASE_URL}/countries/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting country:', error);
    throw error;
  }
};

export const getCountryByCode = async (countryCode) => {
    try {
      const response = await axios.get(`${BASE_URL}/code/${countryCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching country:', error);
      throw error;
    }
  };