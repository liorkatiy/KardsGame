const express = require("express");
const kard = require("../DB/kardDB");
const router = express.Router();
const getData = require("../validation");
const validation = require("../validationSchema");

const deckName = getData("deckName", validation.deckName);
const id = getData("id", validation.isMongo);
const kardq = getData("kard.q", validation.isString);
const karda = getData("kard.a", validation.isString);
const kardh = getData("kard.h", validation.isString);
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
  kardh(),
  async (req, res) => {
    let n = req.body.deckName;
    let q = req.body.kard.q;
    let a = req.body.kard.a;
    let h = req.body.kard.h;
    let result = await kard.createKard(n, q, a, h);
    res.sendData(result);
  });
router.put("/",
  deckName(),
  karda(),
  kardh(),
  kardq(),
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