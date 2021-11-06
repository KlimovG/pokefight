import React from "react";
import logo from './title.png';
import './style.css'

const Header = () => {

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
    </header>
  )
}

export default Header;