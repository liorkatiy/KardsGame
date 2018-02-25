const userDB = require("../DB/userDB");
const express = require("express");
const router = express.Router();
const jwt = require("../jwt");
const getData = require("../validation");
const validation = require("../validationSchema");

const userName = getData("userName",
  validation.userName);
const password = getData("password",
  validation.password);

router.post("/login",
  userName(),
  password(),
  async (req, res) => {

    let n = req.body.userName;
    let p = req.body.password;
    let verify = await userDB.validateUser(n, p);
    if (verify.result) {
      const token = await jwt.sign(verify.user.name, verify.user.premission);
      userDB.signToken(verify.user.name, token);
      res.setToken(token);
      res.sendData(true);
    } else {
      res.sendError();
    }
  });

router.post("/register",
  userName(),
  password(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.password;
    let result = await userDB.createUser(n, p);
    if (result)
      res.sendData(result);
    else
      res.sendError();
  });

module.exports = router;