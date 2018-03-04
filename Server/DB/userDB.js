const { userModel, localUserModel } = require("./models/userModel");
const deckDB = require("./deckDB");

const bcyrpt = require("bcryptjs");

async function getUser(name) {
  const opts = {
    "progress.kards": 0,
    "progress._id": 0,
    currentKard: 0,
    currentDeck: 0,
    token: 0
  };
  const query = name ? {
    name: {
      $regex: name,
      $options: "i"
    }
  } : {};
  const users = await userModel.find(query, opts);
  await userModel.populate(users, {
    path: "userData.localUserID",
    select: "userName premission _id"
  });
  return users;
}

async function createUser(name, password) {
  const t = await deckDB.getDefaults();
  const p = await hashPassword(password);

  const localUser = await localUserModel.create({
    userName: name,
    password: p
  });
  if (localUser) {
    const user = await userModel.create({
      name,
      userData: {
        localUserID: localUser.id
      },
      progress: t
    });
    if (user) {
      await userModel.populate(user,
        {
          path: "userData.localUserID",
          select: "userName premission"
        });
      localUser.userID = user.id;
      await localUser.save();
      return user;
    }
  }
  return false;
}

async function googleLogin(name, id) {
  const t = await deckDB.getDefaults();

  const newUser = await userModel.create({
    name,
    userData: {
      googleID: id
    },
    progress: t
  });
  if (!newUser) {
    const user = await userModel.findOne({ "userData.googleID": id });
    return user ? user : false;
  }
  return newUser;
}

async function makeAdmin() {
  const SA = await createUser("SA", "123456");
  if (SA) {
    const { localUserID } = SA.userData;
    localUserID.premission = 1;
    await localUserID.save();
    console.log("Admin Created");
  }
}

async function editUser(user) {
  let updated = true;
  if (user.userData.localUserID) {
    user.userData.localUserID.userName = user.name;
    updated = await editLocalUser(user.userData.localUserID);
    if (!updated) {
      return false;
    }
  }
  const result = await userModel.update({
    _id: user._id
  }, { name: user.name });
  return result || updated;
}

async function editLocalUser(user) {
  const update = {
    userName: user.userName,
    premission: user.premission
  };
  if (user.password) {
    update.password = await hashPassword(user.password);
  }
  const result = await localUserModel.update({
    _id: user._id
  }, update);
  return result;
}

async function removeUser(_id, isLocal) {
  const removed = await userModel.remove({
    _id
  });
  if (isLocal) {
    const removedLocal = await localUserModel.remove({
      userID: _id
    });
    return removed && removedLocal;
  }
  return removed;
}

async function hashPassword(password) {
  let salt = await bcyrpt.genSalt();
  let hashedPassword = await bcyrpt.hash(password, salt);
  return hashedPassword;
}

async function validateUser(name, password) {
  let localUser = await localUserModel.findOne({
    userName: name
  });
  if (localUser) {
    if (localUser && await bcyrpt.compare(password, localUser.password)) {
      return localUser;
    }
  }
  return false;
}

async function validateToken(id, currentToken, newToken) {
  let result = await userModel.update({
    _id: id,
    token: currentToken
  }, {
      token: newToken
    });
  return result;
}

async function signToken(_id, token) {
  let result = await userModel.update({
    _id,
  }, {
      token
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
  signToken,
  googleLogin
};