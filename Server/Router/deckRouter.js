const deck = require("../DB/deckDB");
const express = require("express");
const router = express.Router();
const getData = require("../validation");
const validation = require("../validationSchema");

const name = getData("name", validation.deckName);
const newName = getData("newName", validation.deckName);
const isString = getData("name", validation.isString);

router.post("/",
  name(),
  async (req, res) => {
    let n = req.body.name;
    let d = req.body.isDefault ? true : false;
    let result = await deck.createDeck(n, d);
    res.sendData(result);
  });

router.get("/",
  isString(true),
  async (req, res) => {
    let n = req.query.name;
    let o = req.query.onlyName;
    let result = await deck.getDeck(n, o);
    res.sendData(result);
  });

router.put("/",
  name(),
  newName()
  , async (req, res) => {
    let n = req.body.name;
    let a = req.body.newName;
    let d = req.body.isDefault ? true : false;
    let result = await deck.editDeck(n, a, d);
    res.sendData(result);
  });

router.delete("/",
  name(),
  async (req, res) => {
    let n = req.body.name;
    let result = await deck.removeDeck(n);
    res.sendData(result);
  });

module.exports = router;