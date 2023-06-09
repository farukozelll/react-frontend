import React, { useState } from 'react';
import '../style/Navbar.css';
import { Link } from "react-router-dom";
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
    <Link to="Countries">XX</Link> 
    <div className="menu">  
     
      <Link onClick={toggleisMoon} className='moon'>{isMoon ? <BiMoon /> : <BiSun />}</Link>
    </div>
    
  </nav>
  );
};

export default Navbar;