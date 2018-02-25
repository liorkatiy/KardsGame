const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  verify,
  premission
} = require("./jwt");
const helmet = require("helmet");
const deckRouter = require("./Router/deckRouter");
const kardRouter = require("./Router/kardRouter");
const userRouter = require("./Router/userRouter");
const gameRouter = require("./Router/gameRouter");
const accountRouter = require("./Router/accountRouter");
const responser = require("./response");
const config = require("./config.json");
const app = express();
const port = process.env.PORT || 9001;

mongoose.connect(process.env.PORT ? config.dbUrl : "mongodb://localhost:27017/kards");
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => console.log("Connected To Database"));
mongoose.connection.on("error", (err) => console.log(err));

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(responser);

app.use("/deck", verify(premission.admin), deckRouter);
app.use("/kard", verify(premission.admin), kardRouter);
app.use("/user", verify(premission.admin), userRouter);
app.use("/account", accountRouter);
app.use("/game", verify(premission.user), gameRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/tetris.html"));
});
require("./DB/userDB").makeAdmin();

app.listen(port, function () {
  console.log("listening on port: " + port);
});