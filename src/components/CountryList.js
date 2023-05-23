import React from 'react';
import { Link } from "react-router-dom";
import "../style/Home.css";
import "../style/Grid.css"
import "../style/List.css"
import "../style/AppBar.css" 
import { FaArrowRight } from 'react-icons/fa';


function CountryList({ countries, onDeleteCountry }) {
  return (
 
          <div className="listView">
          {countries.map(country => (
            <div key={country.id} className="listBox">
              <div className="listFlag">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="img-responsive"
                />
              </div>
              <div className="listContent">
                <Link key={country.id} to={`/country/${country.id}`} className="listText">
                  <strong className="listName">{country.name}</strong>
                  <strong className="listPhone">
                    
                    {country.phone}
                  </strong>
                </Link>
                <div className="line"></div>
                <Link to={`/country/${country.id}`}>
                  <button className="listDetailsButton">
                <FaArrowRight className="icon" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
  );
}

export default CountryList;
