import React from "react";
import logo from "../logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

function Header({ loggedIn, setLoggedIn, email, linkButton }) {
  const navigate = useNavigate();

  function signOut() {
    if (loggedIn) {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      navigate("sign-in");
    }
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="место Россия" />
      <div className="header__container">
        {loggedIn && <p className="header__user-email">{email}</p>}
        <NavLink
          onClick={signOut}
          className={
            loggedIn ? "header__link header__link_active" : "header__link"
          }
          to={linkButton.link}
        >
          {linkButton.name}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
