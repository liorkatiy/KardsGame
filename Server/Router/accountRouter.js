const userDB = require("../DB/userDB");
const express = require("express");
const router = express.Router();
const jwt = require("../jwt");
const getData = require("../validation");
const validation = require("../validationSchema");
const { googleAccount } = require("./passportAccount");

const userName = getData("userName",
  validation.userName);
const password = getData("password",
  validation.password);

googleAccount(router);

router.post("/login",
  userName(),
  password(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.password;
    let verify = await userDB.validateUser(n, p);
    if (verify) {
      const token = await jwt.sign(verify.userID, verify.premission);
      await userDB.signToken(verify.userID, token);
      res.cookie("userToken", token);
    }
    const result = verify ? true : false;
    res.sendData(result);
  });

router.post("/register",
  userName(),
  password(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.password;
    let result = await userDB.createUser(n, p);
    result = result ? true : false;
    res.sendData(result);

  });

module.exports = router;