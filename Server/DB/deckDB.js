const deckModel = require("./models/deckModel");
const {
  deckRemoved
} = require('./events');

async function createDeck(name, isDefault) {
  let deck = await deckModel.create({
    name,
    isDefault,
    kards: []
  });
  return deck;
}

async function editDeck(name, newName, isDefault) {
  let result = await deckModel.update({
    name
  }, {
      name: newName,
      isDefault
    });
  return result;
}

async function removeDeck(name) {
  let result = await deckModel.remove({
    name
  });
  await deckRemoved(name);
  return result;
}

async function getDeck(name, onlyName) {
  let opts = onlyName ? {
    name: 1
  } : {};
  const query = name ? {
    name: {
      $regex: name,
      $options: "i"
    }
  } : {};
  let deck = await deckModel.find(query, opts);
  if (deck)
    return deck;
  return false;
}

async function getKards(deckName) {
  let deck = await deckModel.findOne({
    name: deckName
  }, {
      _id: 0,
      "kards._id": 1
    });
  if (!deck)
    return false;
  return deck.kards;
}

async function getDefaults() {
  let deck = await deckModel.find({
    isDefault: true
  }, {
      _id: 0,
      name: 1,
      "kards._id": 1
    });
  return deck;
}
module.exports = {
  createDeck,
  getDeck,
  editDeck,
  removeDeck,
  getKards,
  getDefaults
};