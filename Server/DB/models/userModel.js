const mongoose = require("mongoose");
const modelHandler = require("./modelHandler");
const userSchema = {
  userData: {
    localUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "localUser",
      index: {
        unique: true,
        partialFilterExpression: {
          "userData.localUserID": {
            $exists: true
          }
        }
      }
    },
    googleID: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {
          "userData.googleID": {
            $exists: true
          }
        }
      }
    },
    facebookID: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {
          "userData.facebookID": {
            $exists: true
          }
        }
      }
    }
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  token: String,
  currentKard: {
    type: String,
    default: " ",
    required: true
  },
  currentDeck: {
    type: String,
    default: " ",
    required: true
  },
  progress: [{
    name: String,
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
  }],
};

const localUserSchema = {
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  premission: {
    type: Number,
    default: 0
  },
  userID: {
    type: String,
    index: true
  },
};

const userModel = mongoose.model("user", userSchema);
const localUserModel = mongoose.model("localUser", localUserSchema);
userModel.schema.post('remove', function (next) {
  console.log(this);
  next();
});

userModel.schema.pre('save', function (next) {
  console.log(this);
  next();
});
module.exports = {
  userModel: modelHandler(userModel, "user"),
  localUserModel: modelHandler(localUserModel, "user")
};