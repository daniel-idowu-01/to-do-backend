import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  let existingUser;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Enter valid email address!"));
    }

    existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists!"));
    }

    if (!isNaN(password[0])) {
      return next(
        errorHandler(
          400,
          "Password should start with an alphabet or underscore!"
        )
      );
    }

    if (password.length < 8 || password.length > 50) {
      return next(errorHandler(400, "Password should be between 8 and 50!"));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: "User created successfully!" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    return next(errorHandler(400, "User not found!"));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(errorHandler(400, "Wrong credentials!"));
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, data: "User successfully logged in!" });
};

export { createUser, loginUser };
