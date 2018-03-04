const jwt = require("jsonwebtoken");
const userDB = require("./DB/userDB");
const { JWTSecret } = require("./config.json");


const timeBeforeReToken = 15 * 60;
const timeBeforeReLogin = timeBeforeReToken * 2;

const premission = {
  user: 0,
  admin: 1
};

async function sign(id, premission) {
  let result = await jwt.sign({
    id,
    premission
  }, JWTSecret);
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
      let user = await jwt.verify(token, JWTSecret);
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
        const newToken = await sign(user.id, user.premission);
        const valid = await userDB.validateToken(user.id, token, newToken);
        if (valid) {
          res.cookie("userToken", newToken);
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