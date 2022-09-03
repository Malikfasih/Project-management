import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className="navbar mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>projectMgmt</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
