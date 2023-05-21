import React from "react";
import { Link, useLocation } from "react-router-dom";
import hamburgerOpen from "../images/hamburgerOpen.svg";
import hamburgerClose from "../images/hamburgerClose.svg";

function Nav({
  loggedIn,
  userEmail,
  toggleHamburger,
  isHamburgerOpen,
  handleLogout,
}) {
  const path = useLocation();
  const isLogin = path.pathname === "/signin";
  const isRegister = path.pathname === "/signup";

  return (
    <nav className="nav">
      <ul
        className={`header__links header__links_desktop ${
          isLogin || isRegister ? "header__links_signup-login-homepage" : ""
        }`}
      >
        {isLogin && (
          <li className="header__links-item">
            <Link to="/signup" className="header__link">
              Sign up
            </Link>
          </li>
        )}
        {isRegister && (
          <li className="header__links-item">
            <Link to="/signin" className="header__link">
              Log in
            </Link>
          </li>
        )}
        {loggedIn && (
          <li className="header__links-item">
            <Link to="/signin" className="header__link" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        )}
        {loggedIn && <li className="header__link-item">{userEmail}</li>}
      </ul>
      {!isRegister && !isLogin && (
        <button
          type="button"
          className="header__dropdown-button"
          onClick={toggleHamburger}
        >
          {!isHamburgerOpen ? (
            <img
              src={hamburgerOpen}
              alt="Dropdown menu"
              className="header__hamburger-icon"
            />
          ) : (
            <img
              src={hamburgerClose}
              alt="close"
              className="header__close-icon"
            />
          )}
        </button>
      )}
    </nav>
  );
}

export default Nav;
