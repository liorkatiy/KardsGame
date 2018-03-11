import dbFetch from "./dbFetch";
const { url, method, getData, fetcher } = dbFetch;

const accountUrl = url + "/account";

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

export default {
  login,
  register
};