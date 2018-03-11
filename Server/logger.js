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

/*const logUsers = mongoose.model("logUsers", {
  ip: {
    type: String,
    required: true,
    unique: true
  },
  lastLog: {
    type: Date,
    default: Date.now
  },
  times: {
    type: Number,
    required: true,
    default: 1
  }
});*/

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

/*function logIP(ip) {
  logUsers.count({ ip }).then(n => {
    if (n) {
      logUsers.update({ ip }, { $inc: { times: 1 } }).then(c => {
        console.log("IP: " + ip + " UpDated: " + c.nModified ? true : false);
      });
    }
    else {
      new logUsers({
        ip
      }).save();
    }
  }
  );
}*/

module.exports = {
  log,
  getLogs
};