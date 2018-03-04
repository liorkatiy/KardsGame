const userDB = require("../DB/userDB");
const express = require("express");
const router = express.Router();
const jwt = require("../jwt");
const getData = require("../validation");
const validation = require("../validationSchema");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { googleID, googleSecret } = require("../config.json");
const userName = getData("userName",
  validation.userName);
const password = getData("password",
  validation.password);

passport.use(new GoogleStrategy({
  clientID: googleID,
  clientSecret: googleSecret,
  callbackURL: "http://localhost:9001/account/googleCB"
},
  async function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    const user = await userDB.googleLogin(profile.displayName, profile.id);
    return user ?
      done(null, user.id) :
      done("error", "");
  }
));

passport.serializeUser(
  (userID, done) => {
    done(null, userID);
  });

router.get('/google', (req, res, next) => {
  next();
}, passport.authenticate('google', { scope: ['profile'] }));

router.get('/googleCB',
  passport.authenticate('google', {}),
  async function (req, res) {
    const verify = await jwt.sign(req.user, 0);
    if (verify) {
      res.cookie("userToken", verify);
    }
    res.redirect("/");
  });

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
    res.sendData(result ? true : false);

  });

module.exports = router;