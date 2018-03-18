import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { token, decks } from "./util/localData";
import game from "./util/serverFetcher/gameData";
//import registerServiceWorker from './registerServiceWorker';

(async () => {
  if (token.getTokenCookie()) {
    const _decks = await game.getGameDeck();
    decks.set(_decks);
  }
  ReactDOM.render(<App />, document.getElementById('root'));
})();

//registerServiceWorker();