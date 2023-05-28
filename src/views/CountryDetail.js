import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode , deleteCountryByCode } from '../services/countryService';
import '../style/DetailPage.css';

function CountryDetail() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountryData();
  }, [countryCode]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Ülkeyi silmek istediğinize emin misiniz?');
    if (confirmed) {
      setIsDeleting(true);
      try {
        await deleteCountryByCode(countryCode);
        navigate('/');
      } catch (error) {
        console.error('Silme işlemi sırasında bir hata oluştu:', error);
        setIsDeleting(false);
      }
    }
  };

  if (!country) {
    return <div>Ülke bulunamadı.</div>;
  }

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="country">
        <div className="country-flag">
          <img src={country.flag} alt={country.name} className="flag-image" />
        </div>
        <div className="country-info">
          <h1>{country.name}</h1>
          <div className="country-info-row">
            <span className="info-label">Country Kodu:</span>
            <span className="info-value">{country.id}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Native:</span>
            <span className="info-value">{country.nativeName}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{country.phone}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Continent:</span>
            <span className="info-value">{country.continent}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Capital:</span>
            <span className="info-value">{country.capital}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Currency:</span>
            <span className="info-value">{country.currency}</span>
          </div>
          <div className="country-info-row">
            <span className="info-label">Languages:</span>
            <span className="info-value">{country.languages}</span>
          </div>
        </div>
      </div>

     
      <button className="goBackButton" onClick={handleGoBack}>
        Geri
      </button>
   
      <button className="deleteButton"onClick={() => handleDelete(countryCode)}> {isDeleting ? 'Siliniyor...' : 'Sil'}</button>

    </div>
  );
}

export default CountryDetail;
