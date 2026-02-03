import URL from "../models/url.js";

export const getAllUrls = async (req, res) => {
  try {
    const userId = req.user.userId; // from middleware

    const urls = await URL.find({ userID: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: urls.length,
      urls,
    });
  } catch (error) {
    console.error("getUserUrls error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
