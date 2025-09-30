import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Data received!");

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: hashedPassword });
    console.log("User Created in the data base")

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("Token created for user");

    res.status(201).json({ user, token });
    console.log("Response sent");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
