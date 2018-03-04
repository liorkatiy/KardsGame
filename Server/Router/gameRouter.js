const gameDB = require("../DB/gameDB");
const kardDB = require("../DB/kardDB");
const express = require("express");
const router = express.Router();
const validateInput = require("../validation");
const validation = require("../validationSchema");

const deckName = validateInput("deckName", validation.deckName);
const kardID = validateInput("kardID", validation.isMongo);
const idx = validateInput("idx", validation.isNumeric);
const answer = validateInput("answer", validation.isString);

router.post("/deck",
  async (req, res) => {
    let result = await gameDB.getDecks(req.user.id);
    res.sendData(result);
  });

router.post("/kards",
  deckName(),
  async (req, res) => {
    let result = await gameDB.getKards(req.user.id, req.body.deckName);
    res.sendData(result);
  });

router.post("/kard",
  deckName(),
  kardID(),
  async (req, res) => {
    let result = await kardDB.getKard(req.body.deckName, req.body.kardID);
    if (result) {
      result.a = null;
      await gameDB.setCurrent(req.user.id, req.body.kardID);
      res.sendData(result);
    } else {
      res.sendError("KardNotFound");
    }
  });

router.post("/answer",
  deckName(),
  kardID(),
  idx(),
  answer(),
  async (req, res) => {
    let validate = await gameDB.isCurrent(req.user.id, req.body.kardID);
    if (validate) {
      let result = await gameDB.answer(req.user.id, req.body.deckName, req.body.idx, req.body.kardID, req.body.answer);
      res.sendData(result);
    } else {
      res.sendError("error");
    }
  });

module.exports = router;