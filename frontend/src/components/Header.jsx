import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import $ from 'jquery';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img
          src="https://uploads-ssl.webflow.com/64e770dc1dea2977ae420feb/64e7d3931aa3dbe714ab9ce1_logo.svg"
          alt="Logo"
          className="logo"
        />
        <span className="logo-text">Converge Lab</span>
      </Link>
    </header>
  );
}

export default Header;
