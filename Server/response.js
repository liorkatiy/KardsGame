function dataSender(req, res, next) {
  res.sendData = (item) => res.json(sendData(item, res.token));
  res.sendError = (error) => res.json(sendError(error));
  res.setToken = (token) => res.token = token;
  next();
}

function sendData(item, token) {
  if (token)
    return {
      item,
      token
    };
  return {
    item
  };
}

function sendError(error) {
  error = error == null ? true : error;
  return {
    error
  };
}

module.exports =
  dataSender;