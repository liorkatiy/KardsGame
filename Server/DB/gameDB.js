const { userModel } = require("./models/userModel");
const deckModel = require("./models/deckModel");

async function answer(id, deckName, idx, kardId, answer) {
  let _answer = await validateAnswer(deckName, kardId, answer);
  if (_answer) {
    await changeScore(id, deckName, idx, kardId, _answer);
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

async function changeScore(id, deckName, idx, kardID, inc) {
  inc = inc ? 1 : -1;
  let result = await userModel.update({
    _id: id,
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

async function getKards(id, deckName) {
  let result = await userModel.findOne({
    _id: id,
    "progress.name": deckName
  }, {
      progress: 1
    });
  if (result) {
    for (let i = 0; i < result.progress.length; i++) {
      if (result.progress[i].name === deckName) {
        return {
          kards: result.progress[i].kards,
          idx: i
        };
      }
    }
    return false;
  }
}

async function setCurrent(id, kardID) {
  let result = await userModel.update({
    _id: id
  }, {
      currentKard: kardID
    });
  return result;
}

async function isCurrent(id, kardID) {
  let result = await userModel.count({
    _id: id,
    currentKard: kardID
  });
  return result;
}

async function getDecks(_id) {
  let result = await userModel.findOne({
    _id,
  }, {
      "progress.name": 1
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