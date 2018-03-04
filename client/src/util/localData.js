function setToken(token) {
  sessionStorage.setItem("token", token);
}

function getToken() {
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      let t = atob(token.split(".")[1]);
      return JSON.parse(t);
    } catch (e) {
      removeToken();
    }
  }
  return false;
}

function removeToken() {
  sessionStorage.removeItem("token");
}

function getTokenAsString() {
  const token = sessionStorage.getItem("token");
  return token;
}

function setDecks(decks) {
  const deckStr = JSON.stringify(decks);
  sessionStorage.setItem("decks", deckStr);
}

function getDecks() {
  const deckStr = sessionStorage.getItem("decks");
  return deckStr ? JSON.parse(deckStr) : [];
}

function getTokenCookie() {
  let found = false;
  document.cookie
    .split(";")
    .forEach(c => {
      const cookie = c.split("=", 2);
      if (cookie[0].trim() === "userToken" && cookie[1]) {
        found = true;
        setToken(cookie[1]);
        document.cookie = cookie[0] + "=;expires=Wed; 01 Jan 1970";
      }
    });
  return found;
}

module.exports = {
  token: {
    getToken,
    setToken,
    getTokenAsString,
    removeToken,
    getTokenCookie
  },
  decks: {
    get: getDecks,
    set: setDecks
  }
};