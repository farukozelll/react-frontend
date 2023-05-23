import React, { useState } from 'react';
import '../style/Navbar.css';
import { Link } from "react-router-dom";
import { FaBtc } from 'react-icons/fa';
import {BiMoon,BiSun} from 'react-icons/bi';

const Navbar = () => {

  const [isMoon, setIsMoon] = useState(false);

  function toggleisMoon() {
    setIsMoon(!isMoon);
    document.body.classList.toggle('dark-mode');
  }

  return (
    <nav className="navbar">
    <Link className="title" to="/">COUNTRIES</Link>
    <div className="menu">    
      <Link to="/btc"><FaBtc /></Link>
      <Link onClick={toggleisMoon} className='moon'>{isMoon ? <BiMoon /> : <BiSun />}</Link>
    </div>
  </nav>
  );
};

export default Navbar;