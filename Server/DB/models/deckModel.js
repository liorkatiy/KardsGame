const mongoose = require("mongoose");
const modelHandler = require("./modelHandler");

const deckModel = mongoose.model("deck", {
  name: {
    type: String,
    unique: true,
    required: true
  },
  kards: {
    type: [{
      q1: {
        required: true,
        type: String
      },
      q2: {
        required: true,
        type: String
      },
      q3: {
        required: true,
        type: String
      },
      q4: {
        required: true,
        type: String
      },
      a: {
        required: true,
        type: String
      }
    }]
  }
});
module.exports = modelHandler(deckModel, "deck");