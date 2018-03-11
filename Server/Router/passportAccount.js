const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { googleID, googleSecret, googleCB, googleLocalCB } = require("../config.json");
const userDB = require("../DB/userDB");
const jwt = require("../jwt");

passport.use(new GoogleStrategy({
  clientID: googleID,
  clientSecret: googleSecret,
  callbackURL: process.env.PORT ? googleCB : googleLocalCB
},
  async function (accessToken, refreshToken, profile, done) {
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

function googleAccount(router) {

  router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

  router.get('/googleCB',
    passport.authenticate('google', {}),
    async function (req, res) {
      const verify = await jwt.sign(req.user, jwt.premission.user);
      if (verify) {
        res.cookie("userToken", verify);
      }
      res.redirect("/");
    });

}

module.exports = {
  googleAccount
};