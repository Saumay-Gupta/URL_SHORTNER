import express from "express";
import {handleOriginalUrl,handleRedirectUrl} from "../controllers/url.js"

const router = express.Router();

router.post("/", handleOriginalUrl)

router.get("/:shortID", handleRedirectUrl);


export default router;