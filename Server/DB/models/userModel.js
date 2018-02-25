const mongoose = require("mongoose");
const modelHandler = require("./modelHandler");
const userSchema = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  progress: [{
    kards: [{
      _id: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true,
        default: 0
      }
    }],
    deck: {
      type: String,
      required: true
    }
  }],
  currentKard: {
    type: String,
    default: " ",
    required: true
  }, currentDeck: {
    type: String,
    default: " ",
    required: true
  },
  premission: {
    type: Number,
    required: true,
    default: 0
  },
  token: String
};

const userModel = mongoose.model("user", userSchema);

module.exports = modelHandler(userModel, "user");