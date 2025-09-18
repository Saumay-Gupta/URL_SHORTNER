import Url from "../models/url.js";
import shortid from "shortid";

export async function handleOriginalUrl(req,res) {
    const uniqueShortID = shortid.generate();
    console.log("Request or Original URL From frontend --",req.body);
    await Url.create({
        shortID: uniqueShortID,
        redirectURL: req.body.originalURL,
        visitedHistory: [],
    }) 
    return res.json({msg: uniqueShortID});
}

export async function handleRedirectUrl(req,res){
    console.log(req.params.shortID);
    const redirectToUrl = await Url.findOne({shortID: req.params.shortID});
    console.log(redirectToUrl.redirectURL);
    return res.redirect(redirectToUrl.redirectURL);
}
