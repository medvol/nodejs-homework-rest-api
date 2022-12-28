const { BadRequest, NotFound } = require("http-errors");
const { User } = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User no found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Please Verify Your Email",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Let's verify your email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
