import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist.",
      });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "secret", { expiresIn: "1h" });
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
