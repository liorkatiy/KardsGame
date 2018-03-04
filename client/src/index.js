import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { token, decks } from "./util/localData";
import { game } from "./util/dbFetch";
//import registerServiceWorker from './registerServiceWorker';

(async function init() {
  if (token.getTokenCookie()) {
    const _decks = await game.getGameDeck();
    decks.set(_decks);
  }
  ReactDOM.render(<App />, document.getElementById('root'));
})();

//registerServiceWorker();