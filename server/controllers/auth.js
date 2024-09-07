const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(204).json({ error: "User already exists" });
  }

  const user = await User.create({ ...req.body });
  if (user) {
    res.status(StatusCodes.CREATED).json({
      user: { name: user.name, email: user.email, _id: user?._id },
      token: user.createToken(),
    });
  }
  res.status;
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "req.body");
    if (!email || !password) {
      return res
        .status(204)
        .json({ error: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(204).json({ error: "Invalid credentials" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(204).json({ error: "Invalid email or password" });
    }
    const token = user.createToken();
    res.status(200).json({
      user: { name: user.name, email: user.email, _id: user?._id },
      token,
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the next middleware
  }
};

module.exports = { login, register };
