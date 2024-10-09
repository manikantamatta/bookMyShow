const User = require("../models/user");
const Business = require("../models/business");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

async function verify_login(username, password) {
  const user = await User.findOne({ username: username }); // Assuming username field stores username
  if (!user) {
    throw new Error("Invalid username");
  }

  const isMatch = await utils.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // Generate JWT token after successful authentication
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    user: { id: user._id, username: user.username },
    token,
  };
}

async function verify_login_business(username, password) {
  const business = await Business.findOne({ username: username });
  if (!business) {
    throw new Error("Invalid username");
  }

  const isMatch = await utils.comparePassword(password, business.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // Generate JWT token after successful authentication
  const token = jwt.sign({ userId: business._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    user: { id: business._id, username: business.username,access: business.access },
    token,
  };
}

module.exports = { verify_login, verify_login_business };
