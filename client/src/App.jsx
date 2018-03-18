import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { token, decks } from "./util/localData";
import router from "./routing";
import game from "./util/serverFetcher/gameData";
import { setLoginError } from "./util/events";
import "./CSS/App.css";
import MainNav from "./components/Nav/Nav.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.reload = this.reload.bind(this);
    this.logOut = this.logOut.bind(this);
    this.deck = { name: false };
    setLoginError(this.logOut);
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

  setSwitch(token) {
    if (token) {
      return <Switch>
        {token.premission ? <Route path="/deck" component={router.adminDeck} /> : null}
        {token.premission > 1 ? <Route path="/user" component={router.adminUser} /> : null}
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
    const _decks = decks.get();
    return <div >
      <BrowserRouter>
        <div>
          <MainNav
            token={_token}
            decks={_decks}
            mainDeck={this.deck}
            logOut={this.logOut} />
          <div className="container" >
            {this.setSwitch(_token)}
          </div>
        </div>
      </BrowserRouter>
    </div>;
  }
}

export default App;
