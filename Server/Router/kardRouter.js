const express = require("express");
const kard = require("../DB/kardDB");
const router = express.Router();
const getData = require("../validation");
const validation = require("../validationSchema");

const deckName = getData("deckName", validation.deckName);
const id = getData("id", validation.isMongo);
const karda = getData("kard.a", validation.isString);
const kardq = getData("kard.q", validation.isString);
const kardq1 = getData("kard.q1", validation.isString);
const kardq2 = getData("kard.q2", validation.isString);
const kardq3 = getData("kard.q3", validation.isString);
const kardq4 = getData("kard.q4", validation.isString);
const kardid = getData("kard._id", validation.isMongo);

router.get("/",
  deckName(),
  id(),
  async (req, res) => {
    let n = req.query.deckName;
    let id = req.query.id;
    let result = await kard.getKard(n, id);
    res.sendData(result);
  });

router.post("/",
  deckName(),
  karda(),
  kardq(),
  kardq1(),
  kardq2(),
  kardq3(),
  kardq4(),
  async (req, res) => {
    let n = req.body.deckName;
    let q = req.body.kard.q;
    let q1 = req.body.kard.q1;
    let q2 = req.body.kard.q2;
    let q3 = req.body.kard.q3;
    let q4 = req.body.kard.q4;
    let a = req.body.kard.a;
    let result = await kard.createKard(n, q, q1, q2, q3, q4, a);
    res.sendData(result);
  });
router.put("/",
  deckName(),
  kardq(),
  karda(),
  kardq1(),
  kardq2(),
  kardq3(),
  kardq4(),
  kardid(),
  async (req, res) => {
    let n = req.body.deckName;
    let k = req.body.kard;
    let result = await kard.editKard(n, k);
    res.sendData(result);
  });
router.delete("/",
  deckName(),
  id(),
  async (req, res) => {
    let n = req.body.deckName;
    let id = req.body.id;
    let result = await kard.removeKard(n, id);
    res.sendData(result);
  });

module.exports = router;