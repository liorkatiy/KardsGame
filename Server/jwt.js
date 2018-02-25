const jwt = require("jsonwebtoken");
const userDB = require("./DB/userDB");
const secret = "secret";


const timeBeforeReToken = 15 * 50;
const timeBeforeReLogin = timeBeforeReToken * 2;

const premission = {
  user: 0,
  admin: 1
};

async function sign(userName, premission) {
  let result = await jwt.sign({
    name: userName,
    premission
  }, secret);
  return result;
}

function verify(premission) {
  /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  return async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      res.sendError("login");
      return;
    }
    try {
      let user = await jwt.verify(token, secret);
      if (premission > user.premission) {
        res.sendError("auth");
        return;
      }

      const timeSinceLogin = new Date().getTime() / 1000 - user.iat;
      if (timeSinceLogin > timeBeforeReLogin) {
        res.sendError("login");
        return;
      }

      if (timeSinceLogin > timeBeforeReToken) {
        const newToken = await sign(user.name, user.premission);
        const valid = await userDB.validateToken(user.name, token, newToken);
        if (valid) {
          res.setToken(newToken);
        } else {
          res.sendError("login");
          return;
        }
      }
      req.user = user;
      next();
    } catch (e) {
      res.sendError("auth");
    }
  };
}



module.exports = {
  verify,
  sign,
  premission
};