import asyncLoader from "./components/AsyncLoader.jsx";
import user from "./util/serverFetcher/userData";
import deck from "./util/serverFetcher/deckData";
import AdminDeck from "./components/Admin/AdminDeck.jsx";
import AdminUser from "./components/Admin/AdminUser.jsx";
import Game from "./components/Game/game.jsx";
import Login from "./components/Account/Login.jsx";
import Register from "./components/Account/Register.jsx";
import React from "react";

const setItem = (func, ...params) => {
  return {
    func,
    params
  };
};

class Router {
  get adminUser() {
    return asyncLoader(AdminUser, {
      users: setItem(user.getUser, ""),
      decklist: setItem(deck.getDeck, "", true)
    });
  }
  get adminDeck() {
    return asyncLoader(AdminDeck, {
      decks: setItem(deck.getDeck)
    });
  }

  game(deck) {
    return () => <Game deck={deck.name} />;
  }

  login(reload) {
    return () => <Login reload={reload} />;

  }

  get register() {
    return Register;
  }
}

export default new Router();