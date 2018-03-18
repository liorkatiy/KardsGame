import React from "react";
import LiLink from "./LiLink.jsx";
import Nav from "./NavDecorator.jsx";
import DeckDropDown from "./NavDropDown.jsx";

const MainNav = (props) => {
  return props.token ? <Nav>
    <ul className="navbar-nav mr-auto">
      {props.token.premission > 1 ? <LiLink to="/user" name="Users" /> : null}
      {props.token.premission ? <LiLink to="/deck" name="Decks" /> : null}
      <DeckDropDown decks={props.decks} mainDeck={props.mainDeck} />
    </ul>
    <ul className="navbar-nav" >
      <LiLink to="/" onClick={props.logOut} name="LogOut" />
    </ul>
  </Nav>
    :
    <Nav>
      <ul className="navbar-nav">
        <LiLink to="/" name="Login" />
        <LiLink to="/register" name="Register" />
      </ul>
    </Nav>;
};

export default MainNav;