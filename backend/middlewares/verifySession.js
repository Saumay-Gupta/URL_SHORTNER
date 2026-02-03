import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    const token = req.cookies?.token;
    
  if (!token) {
    return res.status(200).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
