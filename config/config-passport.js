const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/user");

const secret = process.env.SECRET_KEY;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async function (payload, done) {
    try {
      const user = await User.find({ _id: payload.id });
      if (!user) {
        return done(new Unauthorized("Not authorized"));
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
