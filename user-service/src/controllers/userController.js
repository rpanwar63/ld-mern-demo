import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.validatePassword(password))) {
    const token = generateToken(res, {
      userId: user._id,
      username: user.username,
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const token = generateToken(res, {
      userId: user._id,
      username: user.username,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//logout
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
