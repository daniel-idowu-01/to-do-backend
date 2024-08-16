import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let existingUser;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, data: "Enter valid email address!" });
  }

  existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, data: "User already exists!" });
  }

  if (!isNaN(password[0])) {
    return res.status(400).json({
      success: false,
      data: "Password should start with an alphabet or underscore!",
    });
  }

  if (password.length < 8 || password.length > 50) {
    return res
      .status(400)
      .json({ success: false, data: "Password should be between 8 and 50!" });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ success: true, data: "User created successfully!" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, data: "User not found!" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ success: false, data: "Password not correct!" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    },
    process.env.JWT_SECRET
  );

  console.log(token)

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, data: "User successfully logged in!" });
};

export { createUser, loginUser };
