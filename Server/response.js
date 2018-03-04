function dataSender(req, res, next) {
  res.sendData = (item) => res.json(sendData(item, res.token));
  res.sendError = (error) => res.json(sendError(error));
  next();
}

function sendData(item) {
  return {
    item
  };
}

function sendError(error) {
  error = error == null ? "error" : error;
  return {
    error
  };
}

module.exports =
  dataSender;