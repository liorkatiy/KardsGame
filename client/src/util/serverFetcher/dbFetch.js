import config from "../../config.json";
import {
  loginError
} from "../events";
import {
  token
} from "../localData";

const url = config.url;

const method = {
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
  const headers = {
    'Content-Type': 'application/json',
    'authorization': token.getTokenAsString(),
  };
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
      credentials: 'include',
      headers
    }).then(res => {
      return res.json();
    });
  }
  let init = {
    method: method,
    credentials: 'include',
    body: JSON.stringify(body),
    headers
  };
  return await fetch(url, init)
    .then(
      (res) => {
        return res.json();
      });
}

function getData(data) {
  if (data.error) {
    if (data.error === "login") {
      loginError();
    } else {
      throw data.error;
    }
  }
  token.getTokenCookie();
  console.log(data.item);
  return data.item;
}

export default {
  getData,
  fetcher,
  url,
  method
};