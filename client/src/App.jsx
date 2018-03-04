import React from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { token, decks } from "./util/localData";
import router from "./routing";
import { game } from "./util/dbFetch";
import { setLoginError } from "./util/events";
import "./CSS/App.css";
import { NavBar as Nav, LiLink } from "./components/Nav.jsx";
import animatedCollapse from "./util/collapseAnimation";

class App extends React.Component {
  constructor() {
    super();
    this.reload = this.reload.bind(this);
    this.logOut = this.logOut.bind(this);
    this.collapseDropDown = this.collapseDropDown.bind(this);
    this.linkClick = this.linkClick.bind(this);
    this.deck = { name: false };
    setLoginError(this.logOut);
  }

  componentDidMount() {
    if (this.refs.decksDropDown)
      this.drp = animatedCollapse(this.refs.decksDropDown, false, 1, 60);
  }
  componentDidUpdate() {
    if (this.refs.decksDropDown)
      this.drp = animatedCollapse(this.refs.decksDropDown, false, 1, 60);
  }

  logOut() {
    token.removeToken();
    decks.set([]);
    this.deck.name = false;
    this.forceUpdate();
  }

  async reload() {
    const _decks = await game.getGameDeck();
    decks.set(_decks);
    this.forceUpdate();

  }

  collapseDropDown() {
    this.drp();
  }

  linkClick(name) {
    return () => {
      this.deck.name = name;
      this.collapseDropDown();
    };
  }

  getDecksList() {
    const d = decks.get();
    return d.length ?
      d.map(d =>
        <Link key={d.name}
          onClick={this.linkClick(d.name)}
          className="dropdown-item"
          to="/">
          {d.name}
        </Link>)
      :
      <span className="dropdown-item">
        No Decks Found Try ReLogin Or Contract An Admin
  </span>;
  }

  setLink(token) {
    return token ?
      <Nav>
        <ul className="navbar-nav mr-auto">
          {token.premission ? <LiLink to="/user" name="Users" /> : null}
          {token.premission ? <LiLink to="/deck" name="Decks" /> : null}
          <li className="nav-item dropdown dropdown-primary">
            <button className="btn btn-primary" onClick={this.collapseDropDown}>Game Decks</button>
            <div className="dropdown-menu show" ref="decksDropDown" >
              {this.getDecksList()}
            </div>
          </li>
        </ul>
        <ul className="navbar-nav" >
          <LiLink to="/" onClick={this.logOut} name="LogOut" />
        </ul>
      </Nav>
      :
      <Nav>
        <ul className="navbar-nav">
          <LiLink to="/" name="Login" />
          <LiLink to="/register" name="Register" />
        </ul>
      </Nav>;
  }

  setSwitch(token) {
    if (token) {
      return <Switch>
        {token.premission ? <Route path="/deck" component={router.adminDeck} /> : null}
        {token.premission ? <Route path="/user" component={router.adminUser} /> : null}
        <Route path="/" component={router.game(this.deck)} />
      </Switch>;
    } else {
      return <Switch>
        <Route exact path="/register" component={router.register} />
        <Route exact path="/" component={router.login(this.reload)} />
      </Switch>;
    }
  }

  render() {
    const _token = token.getToken();
    return <div >
      <BrowserRouter>
        <div>
          {this.setLink(_token)}
          <div className="container" >
            {this.setSwitch(_token)}
          </div>
        </div>
      </BrowserRouter>
    </div>;
  }
}

export default App;
