const user = require("../DB/userDB");
const prog = require("../DB/userProgressDB");
const express = require("express");
const router = express.Router();
const getData = require("../validation");
const validation = require("../validationSchema");

const _userData = getData("user.userData", validation.userData);
const _userName = getData("user.name", validation.userName);
const _userID = getData("user._id", validation.isMongo);
const userName = getData("userName", validation.userName);
const deckName = getData("deckName", validation.userName);
const password = getData("password", validation.password);
const id = getData("id", validation.isMongo);
const isString = getData("name", validation.isString);

router.get("/",
  isString(true),
  async (req, res) => {
    let n = req.query.userName;
    let result = await user.getUser(n);
    res.sendData(result);
  });

router.post("/",
  userName(),
  password(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.password;
    let result = await user.createUser(n, p);
    res.sendData(result);
  });

router.post("/add",
  userName(),
  deckName(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.deckName;
    let result = await prog.addDeck(n, p);
    res.sendData(result);
  });

router.delete("/remove",
  userName(),
  deckName(),
  async (req, res) => {
    let n = req.body.userName;
    let p = req.body.deckName;
    let result = await prog.removeDeck(n, p);
    res.sendData(result);
  });

router.put("/",
  _userID(),
  _userName(),
  _userData(),
  async (req, res) => {
    let u = req.body.user;
    let result = await user.editUser(u);
    res.sendData(result);
  });

router.delete("/",
  id(),
  async (req, res) => {
    let n = req.body.id;
    const isLocal = req.body.isLocal ? true : false;
    let result = await user.removeUser(n, isLocal);
    res.sendData(result);
  });

module.exports = router;