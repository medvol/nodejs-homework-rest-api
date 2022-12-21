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
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Unauthorized("Not authorized"));
        }

        return done(null, user);
      })
      .catch((err) => done(err));
  })
);
