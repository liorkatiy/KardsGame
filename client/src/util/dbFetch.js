import config from "../config.json";
import {
  loginError
} from "./events";
import {
  token
} from "./localData";

const url = config.url;
const deckUrl = url + "/deck";
const kardUrl = url + "/kard";
const userUrl = url + "/user";
const accountUrl = url + "/account";
const gameUrl = url + "/game";

let method = {
  GET: 'GET',
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

/**
 * 
 * @param {string} url 
 * @param {string} method 
 * @param {*} body 
 */
async function fetcher(url, method, body) {
  if (method === 'GET') {
    if (body) {
      url += "?";
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          url += key + "=" + body[key] + "&";
        }
      }
      url = url.substring(0, url.length - 1);
    }
    return await fetch(url, {
      headers: {
        'authorization': token.getTokenAsString()
      }
    }).then(
      (res) => res.json());
  }
  let init = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'authorization': token.getTokenAsString()
    }
  };
  return await fetch(url, init).then((res) => res.json());
}

function getData(data) {
  if (data.error) {
    if (data.error === "login") {
      loginError();
    } else {
      throw data.error;
    }
  }
  if (data.token)
    token.setToken(data.token);
  return data.item;
}

/**
 * 
 * @param {string} name 
 * @returns {[]}
 */
async function getDeck(name, onlyName = "") {
  let r = await fetcher(deckUrl, method.GET, {
    name,
    onlyName
  });
  return getData(r);
}

/**
 * 
 * @param {string} name 
 * @param {string} newName 
 * @return {boolean}
 */
async function renameDeck(name, newName) {
  let r = await fetcher(deckUrl, method.PUT, {
    name,
    newName
  });
  return getData(r);
}

/**
 * 
 * @param {string} name 
 */
async function addDeck(name) {
  let r = await fetcher(deckUrl, method.POST, {
    name
  });
  return getData(r);
}

/**
 *  @param {string} deckName 
 * @param {{q:string,a:string,h:string}} kard 
 */
async function addKard(deckName, kard) {
  let r = await fetcher(kardUrl, method.POST, {
    deckName,
    kard
  });
  return getData(r);
}

/**
 * 
 * @param {string} deckName 
 * @param {string} id 
 */
async function removeKard(deckName, id) {
  let r = await fetcher(kardUrl, method.DELETE, {
    id,
    deckName
  });
  return getData(r);
}

async function removeDeck(name) {
  let r = await fetcher(deckUrl, method.DELETE, {
    name
  });
  return getData(r);
}

async function editKard(kard, deckName) {
  let r = await fetcher(kardUrl, method.PUT, {
    kard,
    deckName
  });
  return getData(r);
}

async function addUser(userName, password) {
  let r = await fetcher(userUrl, method.POST, {
    password,
    userName
  });
  return getData(r);
}

async function editUser(user) {
  if (!user.password.length) {
    delete user.password;
  }
  let r = await fetcher(userUrl, method.PUT, {
    user
  });
  return getData(r);
}

async function removeUser(id) {
  let r = await fetcher(userUrl, method.DELETE, {
    id
  });
  return getData(r);
}

async function getUser(userName) {
  let r = await fetcher(userUrl, method.GET, {
    userName
  });
  return getData(r);
}

async function addProg(userName, deckName) {
  let r = await fetcher(userUrl + "/add", method.POST, {
    userName,
    deckName
  });
  return getData(r);
}

async function removeProg(userName, deckName) {
  let r = await fetcher(userUrl + "/remove", method.DELETE, {
    userName,
    deckName
  });
  return getData(r);
}

async function login(userName, password) {
  let r = await fetcher(accountUrl + "/login", method.POST, {
    userName,
    password
  });
  return getData(r);
}

async function register(userName, password) {
  let r = await fetcher(accountUrl + "/register", method.POST, {
    userName,
    password
  });
  return getData(r);
}

/**
 * 
 * @returns {[]}
 */
async function getGameDeck() {
  let r = await fetcher(gameUrl + "/deck", method.POST, {});
  return getData(r);
}

async function getGameKards(deckName) {
  let r = await fetcher(gameUrl + "/kards", method.POST, {
    deckName
  });
  return getData(r);
}

async function getGameKard(deckName, kardID) {
  let r = await fetcher(gameUrl + "/kard", method.POST, {
    deckName,
    kardID
  });
  return getData(r);
}

async function getGameAnswer(deckName, idx, kardID, answer) {
  let r = await fetcher(gameUrl + "/answer", method.POST, {
    idx,
    deckName,
    kardID,
    answer
  });
  return getData(r);
}

export const user = {
  getUser,
  addUser,
  removeUser,
  editUser,
  addProg,
  removeProg,
};
export const deck = {
  getDeck,
  renameDeck,
  addDeck,
  removeDeck,
};
export const kard = {
  addKard,
  removeKard,
  editKard
};
export const account = {
  login,
  register
};
export const game = {
  getGameAnswer,
  getGameDeck,
  getGameKards,
  getGameKard
};