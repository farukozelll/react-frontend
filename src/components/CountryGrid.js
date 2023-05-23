import React from 'react';
import { Link } from "react-router-dom";
import "../style/Home.css";
import "../style/Grid.css"
import "../style/List.css"
import "../style/AppBar.css" 
import { BsFillEyeFill } from 'react-icons/bs';

function CountryGrid({ countries, onDeleteCountry }) {
  return (
 
                    <div className="gridView">
                    {countries.map(country => (
                    <div key={country.id} className="gridBox">
                        <div className="gridFlag">
                        <img
                            src={country.flag}
                            alt={country.name}
                            className="img-responsive"
                        />
                        </div>
                        <Link to={`/country/${country.id}`} className="gridText">
                        <div className="gridtitle">
                            <strong>{country.name}</strong><span>({country.id})</span>
                        </div>
                        <div className="line"></div>
                        <div className="subtitle">
                            <span>{country.phone}</span>
                        </div>
                        <button className="basketButton">
                        <BsFillEyeFill className="icon" />
                        </button>
                        </Link>
                    </div>
                    ))}
                </div>
  );
}

export default CountryGrid;
