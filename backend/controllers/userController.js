import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

const getUserDetails = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...data } = user._doc;
    return res.status(200).json({success: true, data})
  } catch {
    next(error);
  }
};

export { getUserDetails };
