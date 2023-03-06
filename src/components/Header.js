import React from "react";

import logoHeader from '../images/header_logo.svg';

function Header() {
  return (   
    <header className="header">
      <img
        className="header__logo"
        src={logoHeader}
        alt="Место"
      />
    </header>
  );
}

export default Header;