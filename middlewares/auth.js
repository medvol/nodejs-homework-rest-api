const passport = require("passport");

const auth = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
   
    if (!user || err || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
