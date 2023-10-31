import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ username, password: passwordHash });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const person = await User.findOne({ username });

    if (!person) {
      return res.status(400).json({ msg: "User doesn't exist..." });
    }

    const isMatch = await bcrypt.compare(password, person.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials..." });
    }

    const token = jwt.sign(
      { id: person._id, email: person.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    );

    let user = person.username;
    let userID = person._id;

    res.status(200).json({ token, user, userID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
