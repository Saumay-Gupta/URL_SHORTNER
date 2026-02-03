import jwt from "jsonwebtoken";
import User from "../models/user.js";


export async function handleLogin(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(200).json({ msg: "Email and password are required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(200).json({ message: "Invalid credentials." });
    }

    if (user.password != password) {
      return res.status(200).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    res.cookie("token", token, {
      httpOnly: true,     // JS cannot access cookie
      secure: false,      // true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    return res.json({
      message: "Login successful.",
      token
    });
  } catch (err) {
    console.error("handleLogin error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
