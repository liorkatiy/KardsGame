const userModel = require("./models/userModel");
const bcyrpt = require("bcryptjs");

async function getUser(name) {
  const opts = {
    password: 0,
    "progress.kards": 0,
    "progress._id": 0,
    currentKard: 0,
    token: 0
  };
  const query = name ? {
    name: {
      $regex: name,
      $options: "i"
    }
  } : {};
  let user = await userModel.find(query, opts);
  return user;
}

async function createUser(name, password) {
  let p = await hashPassword(password);
  let user = await userModel.create({
    name,
    password: p,
    progress: []
  });
  if (user) {
    user.password = null;
    return user;
  }
  return false;
}

async function makeAdmin() {
  let p = await hashPassword("123456");
  const u = await userModel.create({
    name: "SA",
    password: p,
    progress: [],
    premission: 1
  });
  if (u) {
    console.log("created admin!");
  }
}

async function editUser(user) {
  let update = {};
  update.name = user.name;
  update.premission = user.premission;
  if (user.password) {
    update.password = await hashPassword(user.password);
  }
  let result = await userModel.update({
    _id: user._id
  }, update);
  return result;
}

async function removeUser(_id) {
  let user = await userModel.remove({
    _id
  });
  return user;
}

async function hashPassword(password) {
  let salt = await bcyrpt.genSalt();
  let hashedPassword = await bcyrpt.hash(password, salt);
  return hashedPassword;
}

async function validateUser(name, password) {
  let result = false;
  let user = await userModel.findOne({
    name
  });
  if (user) {
    result = await bcyrpt.compare(password, user.password);
  }
  return {
    result,
    user
  };
}

async function validateToken(userName, currentToken, newToken) {
  let result = await userModel.update({
    name: userName,
    token: currentToken
  }, {
      token: newToken
    });
  return result;
}

async function signToken(userName, token) {
  let result = await userModel.update({
    name: userName,
  }, {
      token: token
    });
  return result;
}

module.exports = {
  createUser,
  validateUser,
  editUser,
  getUser,
  removeUser,
  makeAdmin,
  validateToken,
  signToken
};