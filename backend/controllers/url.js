import Url from "../models/url.js";
import shortid from "shortid";

export async function handleOriginalUrl(req, res) {
  try {
    const { originalURL } = req.body;
    const userId = req.user.userId; // from JWT middleware

    if (!originalURL) {
      return res.status(200).json({ message: "Original URL is required" });
    }

    const uniqueShortID = shortid.generate();

    const newUrl = await Url.create({
      userID: userId, // 🔑 important
      shortID: uniqueShortID,
      redirectURL: originalURL,
      visitedHistory: [],
    });

    return res.status(201).json({
      shortID: newUrl.shortID,
    });
  } catch (error) {
    console.error("handleOriginalUrl error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function handleRedirectUrl(req, res) {
  try {
    const { shortID } = req.params;

    const url = await Url.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!url) {
      return res.status(200).json({ message: "Short URL not found" });
    }

    return res.redirect(url.redirectURL);
  } catch (error) {
    console.error("handleRedirectUrl error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}