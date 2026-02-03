import jwt from "jsonwebtoken";
import User from '../models/user.js'


export async function handleSignUP(req, res) {
  try {
    console.log(req.body);
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(200).json({ msg: "Name, email, and password are required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(200).json({ message: "User already exist" });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: password,
    });


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });


    res.cookie("token", token, {
      httpOnly: true,     // JS cannot access cookie
      secure: false,      // true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });


    return res.status(201).json({
      message: "Signup successful.",
      token
    });
  } catch (err) {
    console.error("handleSignUP error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
