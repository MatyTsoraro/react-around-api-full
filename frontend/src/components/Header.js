import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import MobileDropdown from "./MobileDropdown";
import Nav from "./Nav";

function Header({ loggedIn, userEmail, handleLogout }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  useEffect(() => {
    if (!loggedIn) {
      setIsHamburgerOpen(false);
    }
  }, [loggedIn]);

  return (
    <header className="header section">
      <MobileDropdown
        isHamburgerOpen={isHamburgerOpen}
        userEmail={userEmail}
        handleLogout={handleLogout}
      />
      <div className="header__overlay">
        <img className="header__logo" src={logo} alt="Around the U.S Logo" />
        <Nav
          loggedIn={loggedIn}
          userEmail={userEmail}
          isHamburgerOpen={isHamburgerOpen}
          toggleHamburger={toggleHamburger}
          handleLogout={handleLogout}
        />
      </div>
      <div className="divider"></div>
    </header>
  );
}

export default Header;
