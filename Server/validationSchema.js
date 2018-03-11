const validator = require("validator");

const deckName = { length: { max: 20, min: 3 } };
const password = { length: { max: 15, min: 5 } };
const userName = { length: { max: 11, min: 2 } };
const isMongo = { isMongoID: true };
const isNumeric = { isNumeric: true };
const isString = { isString: true };
const userData = {
  custom: (userdata) => {
    if (userdata.localUserID) {
      const userName = userdata.localUserID.userName.length;
      return userName > 1 &&
        userName < 11 &&
        validator.isNumeric(userdata.localUserID.premission.toString()) &&
        validator.isMongoId(userdata.localUserID._id);
    } else if (userdata.googleID) {
      return typeof userdata.googleID === "string";
    } else if (userdata.facebookID) {
      return typeof userdata.facebookID === "string";
    }
    return false;
  }
};

module.exports = { isString, deckName, password, userName, isMongo, isNumeric, userData };