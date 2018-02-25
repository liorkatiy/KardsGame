const userModel = require("./models/userModel");
const deckModel = require("./models/deckModel");

async function answer(userName, deckName, idx, kardId, answer) {
  let _answer = await validateAnswer(deckName, kardId, answer);
  if (_answer) {
    await changeScore(userName, deckName, idx, kardId, _answer);
  }
  return _answer;
}

async function validateAnswer(DeckName, kardId, answer) {
  let result = await deckModel.count({
    name: DeckName,
    kards: {
      $elemMatch: {
        _id: kardId,
        a: answer
      }
    }
  });
  return result == 1;
}

async function changeScore(userName, deckName, idx, kardID, inc) {
  inc = inc ? 1 : 0;
  let result = await userModel.update({
    name: userName,
    ["progress." + idx + ".kards"]: {
      $elemMatch: {
        _id: kardID
      }


    }
  }, {
      $inc: {
        ["progress." + idx + ".kards.$.score"]: inc
      }
    });
  return result;
}

async function getKards(userName, deckName) {
  let result = await userModel.findOne({
    name: userName,
    "progress.deck": deckName
  }, {
      progress: 1
    });
  if (result) {
    for (let i = 0; i < result.progress.length; i++) {
      if (result.progress[i].deck === deckName) {
        return {
          kards: result.progress[i].kards,
          idx: i
        };
      }
    }
    return false;
  }
}

async function setCurrent(userName, kardID) {
  let result = await userModel.update({
    name: userName
  }, {
      currentKard: kardID
    });
  return result;
}

async function isCurrent(userName, kardID) {
  let result = await userModel.count({
    name: userName,
    currentKard: kardID
  });
  return result;
}



async function getDecks(userName) {
  let result = await userModel.findOne({
    name: userName,
  }, {
      "progress.deck": 1
    });
  if (result) {
    return result.progress;
  }
}

module.exports = {
  answer,
  getKards,
  getDecks,
  setCurrent,
  isCurrent
};