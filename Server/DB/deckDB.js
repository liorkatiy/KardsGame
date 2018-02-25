const deckModel = require("./models/deckModel");
const {
  deckRemoved
} = require('./events');

async function createDeck(name) {
  let deck = await deckModel.create({
    name,
    kards: []
  });
  return deck;
}

async function editDeck(name, newName) {
  let result = await deckModel.update({
    name
  }, {
    name: newName
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
  let deck = name ? await deckModel.findOne({
    name
  }, opts) : await deckModel.find({}, opts);
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

module.exports = {
  createDeck,
  getDeck,
  editDeck,
  removeDeck,
  getKards
};