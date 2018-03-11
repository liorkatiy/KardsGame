import dbFetch from "./dbFetch";
const { url, method, getData, fetcher } = dbFetch;
const userUrl = url + "/user";

async function addUser(userName, password) {
  let r = await fetcher(userUrl, method.POST, {
    password,
    userName
  });
  return getData(r);
}

async function editUser(user) {
  if (user.userData.localUserID && !user.userData.localUserID.password.length) {
    delete user.password;
  }
  let r = await fetcher(userUrl, method.PUT, {
    user
  });
  return getData(r);
}

async function removeUser(id, isLocal) {
  let r = await fetcher(userUrl, method.DELETE, {
    id, isLocal
  });
  return getData(r);
}

async function getUser(userName) {
  let r = await fetcher(userUrl, method.GET, userName ? {
    userName
  } : {});
  return getData(r);
}

async function addProg(id, deckName) {
  let r = await fetcher(userUrl + "/add", method.POST, {
    id,
    deckName
  });
  return getData(r);
}

async function removeProg(id, deckName) {
  let r = await fetcher(userUrl + "/remove", method.DELETE, {
    id,
    deckName
  });
  return getData(r);
}

export default {
  addUser,
  removeUser,
  editUser,
  getUser,
  addProg,
  removeProg
};