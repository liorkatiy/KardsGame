const deckModel = require("./models/deckModel");
const {
  kardAdded,
  kardRemoved
} = require("./events");

async function createKard(deckName, q, q1, q2, q3, q4, a) {
  let k = {
    q,
    q1,
    a,
    q2, q3, q4
  };
  let result = await deckModel.findOneAndUpdate({
    name: deckName
  }, {
      $push: {
        kards: k
      }
    }, {
      runValidators: true,
      new: true,
      fields: {
        _id: 0,
        name: 0,
        kards: {
          $slice: -1
        }
      }
    });
  if (result) {
    await kardAdded(result.kards[0], deckName);
    return result.kards[0];
  }
  return false;
}

async function removeKard(deckName, id) {
  let result = await deckModel.update({
    name: deckName
  }, {
      $pull: {
        kards: {
          _id: id
        }
      }
    });
  if (result) {
    kardRemoved(id, deckName);
  }
  return result;
}

async function editKard(deckName, kard) {
  let result = await deckModel.update({
    name: deckName,
    "kards._id": kard._id
  }, {
      "kards.$": kard
    });
  return result;
}

async function getKard(deckName, id) {
  let result = await deckModel.findOne({
    name: deckName
  }, {
      kards: {
        $elemMatch: {
          _id: id
        }
      }
    });
  if (result)
    return result.kards[0];
  return false;
}

module.exports = {
  createKard,
  removeKard,
  getKard,
  editKard
};