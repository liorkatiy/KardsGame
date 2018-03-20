const mongoose = require("mongoose");

let logModel = mongoose.model("log", {
  error: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  func: {
    type: String,
    required: true
  }
});

function log(error, func) {
  new logModel({
    error,
    func
  }).save();
}
async function getLogs() {
  let logs = await logModel.find();
  return logs;
}

module.exports = {
  log,
  getLogs
};