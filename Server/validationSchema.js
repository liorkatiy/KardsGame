const deckName = { length: { max: 20, min: 3 } };
const password = { length: { max: 15, min: 5 } };
const userName = { length: { max: 10, min: 2 } };
const isMongo = { isMongoID: true };
const isNumeric = { isNumeric: true };
const isString = { isString: true };

module.exports = { isString, deckName, password, userName, isMongo, isNumeric };